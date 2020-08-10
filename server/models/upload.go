package models

import "log"

func InsertData(sqlString string) {
	sql := sqlString
	if _, err := db.Exec(sql); err != nil {
		log.Fatal(err.Error())
	}
}