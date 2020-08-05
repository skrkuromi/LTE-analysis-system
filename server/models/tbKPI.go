package models

import (
	"log"
)

type tbKPI struct {
	StartTime  string `db:"起始时间"`
	Circle     int    `db:"周期"`
	KPIAtt     string `db:"小区"`
	SectorName string `db:"小区1"`
	EnodebName string `db:"网元名称"`
	RRC_SUC    int    `db:"RRC连接建立完成次数 (无)"`
	RRC_TRY int `db:"RRC连接请求次数（包括重发） (无)"`
	RRC_SUCrate float32 `db:"RRC建立成功率qf (%)"`
	ERAB_SUC int `db:"E-RAB建立成功总次数 (无)"`
	ERAB_TRY int `db:"E-RAB建立尝试总次数 (无)"`
	ERAB_SUCrate float32 `db:"E-RAB建立成功率2 (%)"`
	EnodebERABrls int `db:"eNodeB触发的E-RAB异常释放总次数 (无)"`
	SectorERABrls int `db:"小区切换出E-RAB异常释放总次数 (无)"`
	ERABdisconnectRate float32 `db:"E-RAB掉线率(新) (%)"`
	Ay float32 `db:"无线接通率ay (%)"`
	EnodebS1RESET int `db:"eNodeB发起的S1 RESET导致的UE Context释放次数 (无)"`
	UEContextrls int `db:"UE Context异常释放次数 (无)"`
	UEContextSUC int `db:"UE Context建立成功总次数 (无)"`
	Al float32 `db:"无线掉线率 (%)"`
	EnodebInAsySUC int `db:"eNodeB内异频切换出成功次数 (无)"`
	EnodebInAsyTRY int `db:"eNodeB内异频切换出尝试次数 (无)"`
	EnodebInSynSUC int `db:"eNodeB内同频切换出成功次数 (无)"`
	EnodebInSnyTRY int `db:"eNodeB内同频切换出尝试次数 (无)"`
	EnodebBetAsySUC int `db:"eNodeB间异频切换出成功次数 (无)"`
	EnodebBetAsyTRY int `db:"eNodeB间异频切换出尝试次数 (无)"`
	EnodebBetSnySUC int `db:"eNodeB间同频切换出成功次数 (无)"`
	EnodebBetSnyTRY int `db:"eNodeB间同频切换出尝试次数 (无)"`
	EnInSUCrate float32 `db:"eNB内切换成功率 (%)"`
	EnBetSUCrate float32 `db:"eNB间切换成功率 (%)"`
	InSUCrate float32 `db:"同频切换成功率zsp (%)"`
	BetSUCrate float32 `db:"异频切换成功率zsp (%)"`
	SUCrate float32 `db:"切换成功率 (%)"`
	PDCPupload string `db:"小区PDCP层所接收到的上行数据的总吞吐量 (比特)"`
	PDCPdownload string `db:"小区PDCP层所发送的下行数据的总吞吐量 (比特)"`
	RRCReconstruct int `db:"RRC重建请求次数 (无)"`
	RRCReconstructRate float32 `db:"RRC连接重建比率 (%)"`
	ReconstructBetSyn int `db:"通过重建回源小区的eNodeB间同频切换出执行成功次数 (无)"`
	ReconstructBetAsy int `db:"通过重建回源小区的eNodeB间异频切换出执行成功次数 (无)"`
	ReconstructInSyn int `db:"通过重建回源小区的eNodeB内同频切换出执行成功次数 (无)"`
	ReconstructInAsy int `db:"通过重建回源小区的eNodeB内异频切换出执行成功次数 (无)"`
	EnInSUC int `db:"eNB内切换出成功次数 (次)"`
	EnInTRY int `db:"eNB内切换出请求次数 (次)"`
}

func GetAllKPIInfo()(ids []string){
	sqlString := "select distinct 网元名称 from tbKPI "
	if err := db.Select(&ids, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetKPIAttBySectorName(sectorName, Att, StartTime, EndTime string)(info []tbKPI){
	sqlString := ""
	if err := db.Select(&info, sqlString, enodebName); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetAllKPISector()(enodebs []string){
	sqlString := "select distinct `小区1` from tbKPI"
	if err := db.Select(&enodebs, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetAllKPIAtt()(Att []string){
	sqlString := "select column_name from `information_schema`.columns where table_name='tbKPI'"
	if err := db.Select(&Att, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}