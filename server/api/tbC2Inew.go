package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func Init_tbC2Inew(c *gin.Context) {

	temp := models.GetC2I_MeanStd()

	c.JSON(200, gin.H{"msg": temp})
}