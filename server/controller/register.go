package controller

import (
	"github.com/gin-gonic/gin"
	"server/dao"
)

func Register(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	success := false
	msg := ""
	if dao.GetPassByUserName(username) != "" {
		msg = "该用户名已被注册"
	} else {
		dao.InsertNewUser(dao.User{UserName: username, Password: password})
		msg = "注册成功"
		success = true
	}
	c.JSON(200, gin.H{"success": success, "msg": msg})
}
