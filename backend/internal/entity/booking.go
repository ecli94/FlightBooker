package entity

import "time"

type Booking struct {
	Flight      `json:"flight"`
	TravelClass `json:"travel_class"`
	Seat        string    `json:"seat"`
	CreatedAt   time.Time `json:"created_at"`
	ModifiedAt  time.Time `json:"modified_at"`
}
