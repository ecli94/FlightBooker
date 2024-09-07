package entity

import "time"

type Booking struct {
	TravelClass `bson:"travel_class" json:"travel_class"`
	Flights     []Flight  `bson:"flight" json:"flight"`
	Seat        string    `bson:"seat" json:"seat"`
	Notes       string    `bson:"notes" json:"notes"`
	CreatedAt   time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt  time.Time `bson:"modified_at" json:"modified_at"`
}
