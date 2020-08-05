package models

import "log"

type tbPRBnew struct {
	StartTime   string `db:"StartTime"`
	Cicle       int    `db:"周期"`
	EnodebName  string `db:"网元名称"`
	PRBAtt      string `db:"小区"`
	SECTOR_NAME string `db:"小区名"`
	PRB0        float32    `db:"第0个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB1        float32    `db:"第1个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB2        float32    `db:"第2个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB3        float32    `db:"第3个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB4        float32    `db:"第4个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB5        float32    `db:"第5个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB6        float32    `db:"第6个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB7        float32    `db:"第7个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB8        float32    `db:"第8个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB9        float32    `db:"第9个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB10        float32    `db:"第10个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB11       float32    `db:"第11个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB12        float32    `db:"第12个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB13       float32    `db:"第13个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB14       float32    `db:"第14个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB15        float32    `db:"第15个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB16        float32    `db:"第16个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB17        float32    `db:"第17个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB18        float32    `db:"第18个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB19        float32    `db:"第19个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB20        float32    `db:"第20个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB21        float32    `db:"第21个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB22        float32    `db:"第22个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB23       float32    `db:"第23个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB24        float32    `db:"第24个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB25        float32    `db:"第25个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB26        float32    `db:"第26个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB27        float32    `db:"第27个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB28        float32    `db:"第28个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB29        float32    `db:"第29个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB30        float32    `db:"第30个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB31        float32    `db:"第31个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB32        float32    `db:"第32个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB33        float32    `db:"第33个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB34        float32    `db:"第34个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB35        float32    `db:"第35个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB36        float32    `db:"第36个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB37        float32    `db:"第37个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB38        float32    `db:"第38个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB39        float32    `db:"第39个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB40        float32    `db:"第40个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB41        float32    `db:"第41个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB42        float32    `db:"第42个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB43        float32    `db:"第43个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB44        float32    `db:"第44个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB45        float32    `db:"第45个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB46        float32    `db:"第46个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB47        float32    `db:"第47个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB48        float32    `db:"第48个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB49        float32    `db:"第49个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB50        float32    `db:"第50个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB51        float32    `db:"第51个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB52        float32    `db:"第52个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB53        float32    `db:"第53个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB54        float32    `db:"第54个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB55        float32    `db:"第55个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB56        float32    `db:"第56个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB57        float32    `db:"第57个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB58        float32    `db:"第58个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB59        float32    `db:"第59个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB60        float32    `db:"第60个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB61        float32    `db:"第61个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB62        float32    `db:"第62个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB63        float32    `db:"第63个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB64        float32    `db:"第64个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB65        float32    `db:"第65个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB66        float32    `db:"第66个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB67        float32    `db:"第67个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB68        float32    `db:"第68个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB69        float32    `db:"第69个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB70        float32    `db:"第70个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB71        float32    `db:"第71个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB72        float32    `db:"第72个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB73        float32    `db:"第73个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB74        float32    `db:"第74个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB75        float32    `db:"第75个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB76        float32    `db:"第76个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB77        float32    `db:"第77个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB78        float32    `db:"第78个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB79        float32    `db:"第79个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB80        float32    `db:"第80个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB81        float32    `db:"第81个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB82        float32    `db:"第82个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB83        float32    `db:"第83个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB84        float32    `db:"第84个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB85        float32    `db:"第85个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB86        float32    `db:"第86个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB87        float32    `db:"第87个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB88        float32    `db:"第88个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB89        float32    `db:"第89个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB90        float32    `db:"第90个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB91        float32    `db:"第91个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB92        float32    `db:"第92个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB93        float32    `db:"第93个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB94        float32    `db:"第94个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB95        float32    `db:"第95个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB96        float32    `db:"第96个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB97        float32    `db:"第97个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB98        float32    `db:"第98个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
	PRB99        float32    `db:"第99个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)"`
}

func GetPRBInfoByEnodebName(enodebName string)(info []tbPRBnew){
	sqlString := "select * from tbPRBnew where 网元名称 = ?"
	if err := db.Select(&info, sqlString, enodebName); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}


func GetPRBnewAttBySectorName(sectorName, StartTime, EndTime string)(info []tbKPI){
	sqlString := "select * from tbPRBnew where 小区名 = ? and UNIX_TIMESTAMP(?) <= UNIX_TIMESTAMP(起始时间)  and UNIX_TIMESTAMP(?) >= UNIX_TIMESTAMP(起始时间)"
	if err := db.Select(&info, sqlString, sectorName, StartTime, EndTime); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetAllPRBnewSector()(sectors []string){
	sqlString := "select distinct `小区名` from tbPRBnew"
	if err := db.Select(&sectors, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}

func GetAllPRBnewAtt()(Att []string){
	sqlString := "select column_name from `information_schema`.columns where table_name='tbPRBnew'"
	if err := db.Select(&Att, sqlString); err != nil {
		log.Fatal(err.Error())
		return
	}
	return
}