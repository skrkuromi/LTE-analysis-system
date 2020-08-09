package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func Init_tbC2Inew(c *gin.Context) {
	info := models.GetC2I_MeanStd()
	c.JSON(200, gin.H{"msg": info})
}

func GetTripleSector(c *gin.Context){
	per := c.Query("percent")
	info := models.GetTriplePerfect(per)
	c.JSON(200, gin.H{"msg": info})
}

func QueryProcess(c *gin.Context){
	info := models.GetProcess()
	c.JSON(200, gin.H{"msg": info})
}
