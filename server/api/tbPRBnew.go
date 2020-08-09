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

func QueryPRBnewAttBySectorName(c *gin.Context){
	SectorName := c.Query("SectorName")
	StartTime := c.Query("StartTime")
	EndTime := c.Query("EndTime")
	info := models.GetPRBnewAttBySectorName(SectorName, StartTime, EndTime)
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllPRBnewSector(c *gin.Context){
	info := models.GetAllPRBnewSector()
	c.JSON(200, gin.H{"msg": info})
}

func QueryAllPRBnewAtt(c *gin.Context){
	info := models.GetAllPRBnewAtt()
	c.JSON(200, gin.H{"msg": info})
}

