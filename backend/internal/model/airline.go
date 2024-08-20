package model

import "time"

type Airline struct {
	Name       string    `json:"name"`
	IATA       string    `json:"iata"`
	ICAO       string    `json:"icao"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}
