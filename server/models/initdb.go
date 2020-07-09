package models

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"log"
	"server/setting"
)

var db *sqlx.DB

// 注意要先开启校内vpn
func init() {
	section, err := setting.Cfg.GetSection("database")
	if err != nil {
		log.Fatalf("no section [database]:%v", err)
	}
	user := section.Key("USER")
	password := section.Key("PASSWORD")
	host := section.Key("HOST")
	dbName := section.Key("NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", user, password, host, dbName)

	if db, err = sqlx.Connect("mysql", dsn); err != nil {
		log.Fatal(err.Error())
	}
	log.Println("connect successfully")
	db.SetMaxOpenConns(200)
	db.SetMaxIdleConns(10)
	return
}
