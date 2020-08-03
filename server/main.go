package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"server/api"
	"server/setting"
)

func main() {
	r := gin.Default()
	r.POST("/login", api.Login)
	r.POST("/register", api.Register)
	r.POST("/upload", api.Upload)
	tbcell := r.Group("/tbcell")
	{
		tbcell.GET("/sector_id", api.QueryAllSectorId)
		tbcell.GET("/sector_name", api.QueryAllSectorName)
		tbcell.GET("/enodeb_id", api.QueryAllEnodebId)
		tbcell.GET("/enodeb_name", api.QueryAllEnodebName)
		tbcell.GET("/query_by_sector_id", api.QueryInfoBySectorId)
		tbcell.GET("/query_by_sector_name", api.QueryInfoBySectorName)
		tbcell.GET("/query_by_enodeb_id", api.QueryInfoByEnodebId)
		tbcell.GET("/query_by_enodeb_name", api.QueryInfoByEnodebName)
	}
    tbKPI := r.Group("/tbKPI")
	{
		tbKPI.GET("/allKPIInfo", api.QueryAllKPIInfo)
		tbKPI.GET("/KPIAtt_by_enodeb_id", api.QueryKPIAttByEnodebName)
	}
	tbPRBnew := r.Group("/tbPRBnew")
	{
		tbPRBnew.GET("/PRBInfo_by_enodeb_name", api.QueryPRBInfoByEnodeName)
	}
	if err := r.Run(fmt.Sprintf(":%d", setting.HttpPort)); err != nil {
		log.Fatal(err.Error())
	}
}
