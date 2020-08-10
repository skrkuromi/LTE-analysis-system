package api

import (
	"encoding/csv"
	"fmt"
	"github.com/gin-gonic/gin"
	"server/models"
	"os"
	"strconv"
)

func Download(c *gin.Context) {

	// f, err := os.OpenFile("/Users/ddrid/Downloads/xxx/test.csv", os.O_RDWR|os.O_CREATE, 0766)
	f, err := os.OpenFile("F:/test.csv", os.O_RDWR|os.O_CREATE, 0766)

	if err != nil{
		fmt.Println(err)
		return
	}
	defer f.Close()

	f.WriteString("\xEF\xBB\xBF")
	w := csv.NewWriter(f)
	fileName := "tbMRO"

	tbMROs := models.DownloadFile(fileName)
	var data = make([][]string, len(tbMROs)+1)
	data[0] = []string{"TimeStamp", "ServingSector", "InterferingSector", 
	"LteScRSRP", "LteNcRSRP", "LteNcEarfcn", "LteNcPci"}

	for i, mro := range tbMROs {
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
}