package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"server/controller"
	"server/dao"
)
func main() {
	_ = dao.InitDB()
	r := gin.Default()
	r.POST("/login", controller.Login)
	r.POST("/register", controller.Register)
	r.Run(":8080")
}
