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
	info := models.GetTriplePerfect()
	c.JSON(200, gin.H{"msg": info})
}

func QueryProcess(c *gin.Context){
	info := models.GetAllPRBnewAtt()
	c.JSON(200, gin.H{"msg": info})
}
