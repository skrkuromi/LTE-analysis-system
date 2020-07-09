package setting

import (
	"github.com/go-ini/ini"
	"log"
)

var (
	Cfg *ini.File
	HttpPort int
)

// 读取配置文件信息
func init() {
	var err error
	if Cfg, err = ini.Load("conf/app.ini"); err != nil {
		log.Fatalf("Fail to parse app.ini: %v", err)
	}
	section, err := Cfg.GetSection("server")
	if err != nil {
		log.Fatalf("no section [server]: %v", err)
	}
	HttpPort = section.Key("HTTP_PORT").MustInt(8080)
}

