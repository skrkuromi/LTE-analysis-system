package models

import (
	"log"
)

type User struct {
	UserName string `db:"username"`
	Password string `db:"password"`
}

func GetPassByUserName(username string) (password string) {
	sqlString := "select password from user where username = ?"
	if err := db.Get(&password, sqlString, username); err != nil {
		log.Fatal(err.Error())
	}
	return
}

func InsertNewUser(user User) {
	sqlString := "insert into user(username, password) values(?, ?)"
	if _, err := db.Exec(sqlString, user.UserName, user.Password); err != nil {
		log.Fatal(err.Error())
	}
}
