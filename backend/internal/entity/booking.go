package entity

import "time"

type Booking struct {
	Flight      `bson:"flight" json:"flight"`
	TravelClass `bson:"travel_class" json:"travel_class"`
	Seat        string    `bson:"seat" json:"seat"`
	Notes       string    `bson:"notes" json:"notes"`
	CreatedAt   time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt  time.Time `bson:"modified_at" json:"modified_at"`
}
