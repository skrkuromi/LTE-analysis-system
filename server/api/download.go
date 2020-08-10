package api

import (
	"encoding/csv"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"server/models"
	"strconv"
)

var progress = 0

func GetDownLoadProcess(c *gin.Context) {
	c.JSON(200, gin.H{"msg": progress})
}

func Download(c *gin.Context) {
	filePath := c.PostForm("filePath")
	fileName := c.PostForm("fileName")
	
	go func() {
		// f, err := os.OpenFile("/Users/ddrid/Downloads/xxx/test.csv", os.O_RDWR|os.O_CREATE, 0766)
		f, err := os.OpenFile(filePath + "/" + fileName + ".csv", os.O_RDWR|os.O_CREATE, 0766)

		if err != nil {
			fmt.Println(err)
			return
		}
		defer f.Close()

		f.WriteString("\xEF\xBB\xBF")
		w := csv.NewWriter(f)
		TableName := "tbMRO"

		tbMROs := models.DownloadFile(TableName)
		var data = make([][]string, len(tbMROs)+1)
		data[0] = []string{"TimeStamp", "ServingSector", "InterferingSector",
			"LteScRSRP", "LteNcRSRP", "LteNcEarfcn", "LteNcPci"}

		length := len(tbMROs)
		count := 0
		for i, mro := range tbMROs {
			count++
			progress = count / length * 100
			data[i+1] = []string{
				mro.TimeStamp,
				mro.ServingSector,
				mro.InterferingSector,
				strconv.Itoa(mro.LteScRSRP),
				strconv.Itoa(mro.LteNcRSRP),
				strconv.Itoa(mro.LteNcEarfcn),
				strconv.Itoa(mro.LteNcPci)}
		}

		w.WriteAll(data)
		w.Flush()
	}()
	c.JSON(200, gin.H{"msg": "success"})
}
