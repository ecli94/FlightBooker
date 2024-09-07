package entity

type Airport struct {
	Id        int     `bson:"id" json:"id"`
	Name      string  `bson:"name" json:"name"`
	City      string  `bson:"city" json:"city"`
	Country   string  `bson:"country" json:"country"`
	IATA      string  `bson:"iata" json:"iata"`
	ICAO      string  `bson:"icao" json:"icao"`
	Longitude float64 `bson:"longitude" json:"longitude"`
	Latitude  float64 `bson:"latitude" json:"latitude"`
	Altitude  int     `bson:"altitude" json:"altitude"`
}
