package entity

type Airline struct {
	Entity
	Name string `json:"name"`
	IATA string `json:"iata"`
	ICAO string `json:"icao"`
}
