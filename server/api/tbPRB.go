package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func Init_tbPRB_new(c *gin.Context){
	info := models.Init_PRBnew()
	c.JSON(200, gin.H{"msg": info})
}

func QueryPRBAttBySectorName(c *gin.Context){
	SectorName := c.Query("SectorName")
	StartTime := c.Query("StartTime")
	EndTime := c.Query("EndTime")
	info := models.GetPRBAttBySectorName(SectorName, StartTime, EndTime)
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllPRBSector(c *gin.Context){
	info := models.GetAllPRBSector()
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllPRBAtt(c *gin.Context){
	info := models.GetAllPRBAtt()
	c.JSON(200, gin.H{"msg": info})
}