package entity

import "time"

type Airport struct {
	Name       string    `json:"name"`
	IATA       string    `json:"iata"`
	ICAO       string    `json:"icao"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}
