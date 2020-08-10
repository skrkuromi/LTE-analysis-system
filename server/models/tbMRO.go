package models

type tbMRO struct {
	TimeStamp string `db:"TimeStamp"`
	ServingSector string `db:"ServingSector"`
	InterferingSector string `db:"InterferingSector"`
	LteScRSRP int `db:"LteScRSRP"`
	LteNcRSRP int `db:"LteNcRSRP"`
	LteNcEarfcn int `db:"LteNcEarfcn"`
	LteNcPci int `db:"LteNcPci"`
}