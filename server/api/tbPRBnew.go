package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func QueryPRBInfoByEnodeName(c *gin.Context) {
	en := c.Query("网元名称")
	info := models.GetPRBInfoByEnodebName(en)
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllKPIEnodeb(c *gin.Context){
	info := models.GetAllKPIEnodeb()
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllKPIAtt(c *gin.Context){
	info := models.GetAllKPIAtt()
	c.JSON(200, gin.H{"msg": info})
}