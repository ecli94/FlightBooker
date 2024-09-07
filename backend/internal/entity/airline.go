package entity

type Airline struct {
	Id       int    `bson:"id" json:"id"`
	Name     string `bson:"name" json:"name"`
	Alias    string `bson:"alias" json:"alias"`
	IATA     string `bson:"iata" json:"iata"`
	ICAO     string `bson:"icao" json:"icao"`
	Callsign string `bson:"callsign" json:"callsign"`
	Country  string `bson:"country" json:"country"`
}
