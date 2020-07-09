package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func Register(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	success := false
	msg := ""
	if models.GetPassByUserName(username) != "" {
		msg = "该用户名已被注册"
	} else {
		models.InsertNewUser(models.User{UserName: username, Password: password})
		msg = "注册成功"
		success = true
	}
	c.JSON(200, gin.H{"success": success, "msg": msg})
}
