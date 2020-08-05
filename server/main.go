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
		tbKPI.GET("/QueryAllKPISector", api.QueryAllKPISector)
		tbKPI.GET("/QueryAllKPIAtt", api.QueryAllKPIAtt)
		tbKPI.GET("/Query_KPIAtt_bySector", api.QueryKPIAttBySectorName)
	}
	tbPRB := r.Group("/tbPRB")
	{
		tbPRB.GET("/Init_tbPRBnew", api.Init_tbPRB_new)
	}
	tbPRBnew := r.Group("/tbPRBnew")
	{
		tbPRBnew.GET("/PRBInfo_by_enodeb_name", api.QueryPRBInfoByEnodeName)
		tbPRBnew.GET("/QueryAllPRBnewSector", api.QueryAllPRBnewSector)
		tbPRBnew.GET("/QueryAllPRBnewAtt", api.QueryAllPRBnewAtt)
		tbPRBnew.GET("/Query_PRBnew_bySector", api.QueryPRBnewAttBySectorName)
	}
	tbC2Inew := r.Group("/tbC2Inew")
	{
		tbC2Inew.GET("/Init_tbC2Inew", api.Init_tbC2Inew)
		tbC2Inew.GET("/query_tripleSector", api.GetTripleSector)
	}
	if err := r.Run(fmt.Sprintf(":%d", setting.HttpPort)); err != nil {
		log.Fatal(err.Error())
	}
}
