package dao

type User struct {
	UserName string `db:"username"`
	Password string `db:"password"`
}

func GetPassByUserName(username string) (password string) {
	sqlString := "select password from user where username = ?"
	_ = DB.Get(&password, sqlString, username)
	return
}

func InsertNewUser(user User){
	sqlString := "insert into user(username, password) values(?, ?)"
	_, _ = DB.Exec(sqlString, user.UserName, user.Password)
}
