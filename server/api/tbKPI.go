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
	en := c.Query("enodeb_name")
	info := models.GetKPIAttByEnodebName(en)
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