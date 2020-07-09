package models

import (
	"log"
)

type User struct {
	Id int 			`db:"id"`
	UserName string `db:"username"`
	Password string `db:"password"`
}

func GetPassByUserName(username string) (password string) {
	sql := "select password from user where username = ?"
	if err := db.Get(&password, sql, username); err != nil {
		log.Fatal(err.Error())
	}
	return
}

func InsertNewUser(user User) {
	sql := "insert into user(username, password) values(?, ?)"
	if _, err := db.Exec(sql, user.UserName, user.Password); err != nil {
		log.Fatal(err.Error())
	}
}


