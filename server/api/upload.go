package api

import (
	"encoding/csv"
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"os"
	"server/models"
)

var proc = 0

func GetLoadProcess(c *gin.Context)  {
	c.JSON(200, gin.H{"msg": proc})
}


func Upload(c *gin.Context) {
	fileName := c.PostForm("filePath")
	// fileName := "F:/tbMROData.csv"
	//fileType := c.PostForm("fileType")
	go func() {
		proc = 0
		partition := 5000
		// fileName := "/Users/jaylon_ho/Downloads/tbMROData.csv"
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

			fs, err = os.Open(fileName)
			// 按行读取
			r = csv.NewReader(fs)
			row_count := 0

			row, err := r.Read()
			if err != nil && err != io.EOF {
				log.Fatalf("can not read, err is %+v", err)
			}
			if err == io.EOF {
				return
			}
			temp := "("
			for i, j := range row {
				if len(j) <= 0 {
					temp += ""
				} else {
					temp += j;
				}
				if i < (len(row) - 1) {
					temp += ","
				}
			}
			temp += ") values"

			startString := "insert into tbMRO"
			startString += temp
			sqlString := ""
			sqlString += startString
			for {
				row, err := r.Read()
				if err != nil && err != io.EOF {
					log.Fatalf("can not read, err is %+v", err)
				}
				if err == io.EOF {
					proc = 100
					fmt.Println("complete")
					models.InsertData(sqlString)
					break
				}
				row_count = row_count + 1
				temp := ""
				if row_count % partition != 1 {
					temp += ",("
				} else {
					temp += "("
				}

				for i, j := range row {
					if len(j) <= 0 {
						temp += ""
					} else {
						if i <= 2 {
							temp += "'"
						}
						temp += j
						if i <= 2 {
							temp += "'"
						}
					}
					if i < (len(row) - 1) {
						temp += ","
					}
				}
				temp += ")"
				sqlString += temp

				if row_count % partition == 0 {
					tem := int((float64(row_count)/float64(count))*100)
					proc = tem
					models.InsertData(sqlString)
					sqlString = ""
					sqlString += startString
				}
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
				count++
			}
		}
	}()
	c.JSON(200, gin.H{"msg": "success"})
}
