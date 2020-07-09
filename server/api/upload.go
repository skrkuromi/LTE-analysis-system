package api

import (
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gin-gonic/gin"
	"log"
)

// TODO
func Upload(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		log.Fatal(err.Error())
	}
	f, err := excelize.OpenReader(file)

	rows := f.GetRows("Sheet1")
	for _, row := range rows {
		//for _, colCell := range row {
		//	fmt.Print(colCell, "\t")
		//}
		fmt.Println(row)
	}

}
