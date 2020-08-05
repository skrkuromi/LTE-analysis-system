package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func QueryAllKPIInfo(c *gin.Context) {
	info := models.GetAllKPIInfo()
	c.JSON(200, gin.H{"msg": info})
}

func QueryKPIAttBySectorName(c *gin.Context){
	SectorName := c.Query("SectorName")
	Att := c.Query("Attribute")
	StartTime := c.Query("StartTime")
	EndTime := c.Query("EndTime")
	info := models.GetKPIAttBySectorName(SectorName, Att, StartTime, EndTime)
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllKPISector(c *gin.Context){
	info := models.GetAllKPISector()
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllKPIAtt(c *gin.Context){
	info := models.GetAllKPIAtt()
	c.JSON(200, gin.H{"msg": info})
}