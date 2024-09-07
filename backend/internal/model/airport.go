package model

type Airport struct {
	Id        int     `json:"id"`
	Name      string  `json:"name"`
	City      string  `json:"city"`
	Country   string  `json:"country"`
	IATA      string  `json:"iata"`
	ICAO      string  `json:"icao"`
	Longitude float64 `json:"longitude"`
	Latitude  float64 `json:"latitude"`
	Altitude  int     `json:"altitude"`
}
