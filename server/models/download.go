package models

import (
	"log"
)

func DownloadFile(TableName string)(data []tbMRO){
	sqlString := "select * from tbMRO"
	if err := db.Select(&data, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}
