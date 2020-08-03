package models

import (
	"database/sql"
	"log"
)

type tbcell struct{
	CITY			string			`db:"CITY"`
	SECTOR_ID		string			`db:"SECTOR_ID"`
	SECTOR_NAME		string			`db:"SECTOR_NAME"`
	ENODEBID		int				`db:"ENODEBID"`
	ENODEB_NAME		string			`db:"ENODEB_NAME"`
	EARFCN			int				`db:"EARFCN"`
	PCI				int				`db:"PCI"`
	PSS				int				`db:"PSS"`
	SSS				int				`db:"SSS"`
	TAC				int				`db:"TAC"`
	VENDOR			string			`db:"VENDOR"`
	LONGITUDE		float32			`db:"LONGITUDE"`
	LATITUDE		float32			`db:"LATITUDE"`
	STYLE			string			`db:"STYLE"`
	AZIMUTH			float32			`db:"AZIMUTH"`
	HEIGHT			sql.NullFloat64	`db:"HEIGHT"`
	ELECTTILT		sql.NullFloat64	`db:"ELECTTILT"`
	MECHTILT		sql.NullFloat64	`db:"MECHTILT"`
	TOTLETILT		sql.NullFloat64	`db:"TOTLETILT"`
}

func GetAllSector(tp string)(info []string){
	sqlString := "select distinct SECTOR_ID from tbcell"
	if(tp == "NAME") {
		sqlString = "select distinct SECTOR_NAME from tbcell"
	}
	if err := db.Select(&info, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetAllEnodebID()(ids []string){
	sqlString := "select distinct ENODEBID from tbcell"
	if err := db.Select(&ids, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetAllEnodebName()(names []string){
	sqlString := "select distinct ENODEB_NAME from tbcell"
	if err := db.Select(&names, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetInfoBySectorId(sectorId string)(info []tbcell){
	sqlString := "select * from tbcell where SECTOR_ID = ?"
	if err := db.Select(&info, sqlString, sectorId); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}
func GetInfoBySectorName(sectorName string)(info []tbcell){
	sqlString := "select * from tbcell where SECTOR_NAME = ?"
	if err := db.Select(&info, sqlString, sectorName); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}
func GetInfoByEnodebId(enodebId string)(info []tbcell){
	sqlString := "select * from tbcell where ENODEBID = ?"
	if err := db.Select(&info, sqlString, enodebId); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}
func GetInfoByEnodebName(enodebName string)(info []tbcell){
	sqlString := "select * from tbcell where ENODEB_NAME = ?"
	if err := db.Select(&info, sqlString, enodebName); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}
