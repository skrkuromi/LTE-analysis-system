package api

import (
	"encoding/csv"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
)

func Download(c *gin.Context) {

	f, err := os.OpenFile("/Users/ddrid/Downloads/xxx/test.csv", os.O_RDWR|os.O_CREATE, 0766)
	if err != nil{
		fmt.Println(err)
		return
	}
	defer f.Close()
	var data = make([][]string, 3)
	data[0] = []string{"名称1", "名称2", "名称3"}
	data[1] = []string{"222", "sdf", "2008"}
	data[2] = []string{"333", "opo", "665"}

	f.WriteString("\xEF\xBB\xBF")

	w := csv.NewWriter(f)
	w.WriteAll(data)
	//w.Flush()
	data[0] = []string{"xxx", "aaa", "2000"}
	data[1] = []string{"yyy", "bbb", "3000"}
	w.WriteAll(data)
	w.Flush()
}