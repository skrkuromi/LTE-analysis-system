package dao

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func InitDB() (err error) {
	dsn := "root:123456@tcp(10.105.222.90:3306)/lte"
	DB, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		fmt.Printf("connect server failed, err:%v\n", err)
		return
	}
	fmt.Println("success")
	DB.SetMaxOpenConns(200)
	DB.SetMaxIdleConns(10)
	return
}
