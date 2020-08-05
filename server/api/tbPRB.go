package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func Init_tbPRB_new(c *gin.Context){
	info := models.Init_PRBnew()
	c.JSON(200, gin.H{"msg": info})
}