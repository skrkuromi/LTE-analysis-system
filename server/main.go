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
	if err := r.Run(fmt.Sprintf(":%d", setting.HttpPort)); err != nil {
		log.Fatal(err.Error())
	}
}
