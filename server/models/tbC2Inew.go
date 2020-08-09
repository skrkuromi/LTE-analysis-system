package models

import (
	"fmt"
	"log"
	"math"
)

type tbC2Inew struct {
	SCELL string `db:"SCELL"`
	NCELL string `db:"NCELL"`
	C2I_Mean float32 `db:"C2I_Mean"`
	STD float32 `db:"STD"`
	Prb9 float32 `db:"Prb9"`
	PrbABS6 float32 `db:"PrbABS6"`
}
type tripleSector struct {
	SCELl string
	SCELL2 string
	NCELL string
}

type cellList struct {
	SCELL string `db:"SCELL"`
}

var pro = 0

func GetC2I_MeanStd()(info []tbC2Inew){
	pro = 0

	sqlString := "select ServingSector as SCELL, InterferingSector as NCELL," +
		"avg(LteScRSRP-LteNcRSRP) as C2I_Mean, STD(LteScRSRP-LteNcRSRP) as STD, " +
		"0.0 as Prb9,0.0 as PrbABS6 " +
		"from tbMRO group by ServingSector, InterferingSector\n"
	if err := db.Select(&info, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}

	CalPrb(info)
	fmt.Println(len(info))
	sql := "insert into tbC2Inew(SCELL, NCELL, C2I_Mean, STD, Prb9, PrbABS6) values(?, ?, ?, ?, ?, ?)"
	for i:=0; i < len(info); i++{
		db.Exec(sql, info[i].SCELL, info[i].NCELL, info[i].C2I_Mean, info[i].STD, info[i].Prb9, info[i].PrbABS6)
		temp := int((float64(i)/float64(len(info)))*100)
		pro = temp
		fmt.Println("--------------")
		fmt.Println(i)
		fmt.Println(len(info))
		fmt.Println(pro)
	}
	pro = 100

	return
}

func GetProcess() int{
	return pro
}

func CalPrb(info []tbC2Inew){
	for i:=0; i < len(info); i++{
		mean := float64(info[i].C2I_Mean)
		std := float64(info[i].STD)
		per9 := 0.0
		per6 := 0.0
		if std < 0.01{
			if mean < 9{
				per9 = 1.0
			}else{
				per9 = 0.0
			}
			if (mean < 6) && (mean > -6){
				per6 = 1.0
			}else{
				per6 = 0.0
			}
		}else{
			for j:=-30.0; j < 9.0; j= j+0.01{
				per9 = per9 + 0.01*(1/(math.Sqrt(2*math.Pi)*std)*math.Exp(-(math.Pow(j-mean, 2))/(2*math.Pow(std, 2))))
			}
			for j:=-6.0; j < 6.0; j= j+0.01 {
				per6 = per6 + 0.01*(1/(math.Sqrt(2*math.Pi)*std)*math.Exp(-(math.Pow(j-mean, 2))/(2*math.Pow(std, 2))))
			}
		}

		info[i].Prb9 = float32(per9)
		info[i].PrbABS6 = float32(per6)
	}
	return
}

func GetTriplePerfect(percent string)(res []tripleSector){
	var info []tbC2Inew
	sqlString := "select * from tbC2Inew where PrbABS6 > ?"

	if err := db.Select(&info, sqlString, percent); err != nil {
		log.Fatal(err.Error())
		return
	}

	var CELLlist []cellList
	sqlString = "select distinct SCELL from tbC2Inew"
	if err := db.Select(&CELLlist, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}

	for i:=0; i < len(CELLlist); i++{
		S1 := CELLlist[i].SCELL
		for j:=0; j < len(info); j++{
			if info[j].SCELL == S1{
				for k:=0; k < len(CELLlist); k++{
					if CELLlist[k].SCELL == info[j].NCELL{
						S2 := CELLlist[k].SCELL

						for m:=0; m < len(info); m++{
							if info[m].SCELL == S2{
								N:= info[m].NCELL
								for p:=0; p < len(info); p++{
									if (info[p].SCELL == S1) && (info[p].NCELL == N) {
										res = append(res, tripleSector{SCELl: S1,SCELL2: S2,NCELL: N})
									}
								}
							}
						}

					}
				}
			}
		}
		CELLlist[i].SCELL = "-1"
	}

	return
}
