package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func QueryAllKPIInfo(c *gin.Context) {
	info := models.GetAllKPIInfo()
	c.JSON(200, gin.H{"msg": info})
}

func QueryKPIAttByEnodebName(c *gin.Context){
	en := c.Query("网元名称")
	info := models.GetKPIAttByEnodebName(en)
	c.JSON(200, gin.H{"msg": info})
}