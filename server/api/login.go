package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func Login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	success := false
	if password == models.GetPassByUserName(username) {
		success = true
	}
	c.JSON(200, gin.H{"success": success})
}
