package api

import (
	"encoding/csv"
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"os"
)

// TODO
func Upload(c *gin.Context) {
	//fileName := c.Query("fileName")
	//fileType := c.Query("fileType")
	fileName := "/Users/ddrid/Downloads/xxx/tbATUData.csv"
	fileType := "csv"
	if (fileType == "csv") {
		fs, err := os.Open(fileName)
		if err != nil {
			log.Fatal(err.Error())
		}
		defer fs.Close()

		r := csv.NewReader(fs)

		// 统计行数
		count := 0
		for {
			_, err := r.Read()
			if err != nil && err != io.EOF {
				log.Fatalf("can not read, err is %+v", err)
			}
			if err == io.EOF {
				break
			}
			count++
		}

		fmt.Println(count)
		
		// 按行读取
		r = csv.NewReader(fs)
		for {
			row, err := r.Read()
			if err != nil && err != io.EOF {
				log.Fatalf("can not read, err is %+v", err)
			}
			if err == io.EOF {
				break
			}
			// TODO  handle row...
		}


	} else {
		count := 0
		file, _, err := c.Request.FormFile("file")
		if err != nil {
			log.Fatal(err.Error())
		}
		f, err := excelize.OpenReader(file)

		rows := f.GetRows("Sheet1")
		for _, _ = range rows {
			//for _, colCell := range row {
			//	fmt.Print(colCell, "\t")
			//}
			count++
			//fmt.Println(row)
		}
		fmt.Println(count)
	}

}
