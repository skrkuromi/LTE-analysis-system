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

func GetC2I_MeanStd()(info []tbC2Inew){
	sqlString := "select ServingSector as SCELL, InterferingSector as NCELL," +
		"avg(LteScRSRP-LteNcRSRP) as C2I_Mean, STD(LteScRSRP-LteNcRSRP) as STD, " +
		"0.0 as Prb9,0.0 as PrbABS6 " +
		"from tbMRO group by ServingSector, InterferingSector\n"
	if err := db.Select(&info, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}

	CalPrb(info)
	return
}

func CalPrb(info []tbC2Inew){
	for i:=0; i < len(info); i++{
		mean := float64(info[i].C2I_Mean)
		std := float64(info[i].STD)
		per9 := 0.0
		if std < 0.01{
			if mean < 9{
				per9 = 1.0
			}else{
				per9 = 0.0
			}
		}else{
			for j:=-30.0; j < 9.0; j= j+0.01{
				per9 = per9 + 0.1*(1/(math.Sqrt(6.28)*std)*math.Exp(-(math.Pow(j-mean, 2))/(2*math.Pow(std, 2))))
			}
		}

		info[i].Prb9 = float32(per9)
		fmt.Println(info[i])
	}

	return
}