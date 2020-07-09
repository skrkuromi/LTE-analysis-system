package api

import (
	"github.com/gin-gonic/gin"
	"server/models"
)

func QueryAllSectorId(c *gin.Context) {
	ids := models.GetAllSectorID()
	c.JSON(200, gin.H{"msg": ids})
}
func QueryAllSectorName(c *gin.Context) {
	names := models.GetAllSectorName()
	c.JSON(200, gin.H{"msg": names})
}
func QueryAllEnodebId(c *gin.Context) {
	ids := models.GetAllEnodebID()
	c.JSON(200, gin.H{"msg": ids})
}
func QueryAllEnodebName(c *gin.Context) {
	names := models.GetAllEnodebName()
	c.JSON(200, gin.H{"msg": names})
}

func QueryInfoBySectorId(c *gin.Context){
	id := c.Query("sector_id")
	info := models.GetInfoBySectorId(id)
	c.JSON(200, gin.H{"msg": info})
}
func QueryInfoBySectorName(c *gin.Context){
	name := c.Query("sector_name")
	info := models.GetInfoBySectorName(name)
	c.JSON(200, gin.H{"msg": info})
}
func QueryInfoByEnodebId(c *gin.Context){
	id := c.Query("enodeb_id")
	info := models.GetInfoByEnodebId(id)
	c.JSON(200, gin.H{"msg": info})
}
func QueryInfoByEnodebName(c *gin.Context){
	name := c.Query("enodeb_name")
	info := models.GetInfoByEnodebName(name)
	c.JSON(200, gin.H{"msg": info})
}
