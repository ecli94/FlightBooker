package model

import "time"

type Airport struct {
	Name       string    `json:"name"`
	IATA       string    `json:"iata"`
	ICAO       string    `json:"icao"`
	City       string    `json:"city"`
	Country    string    `json:"country"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}
