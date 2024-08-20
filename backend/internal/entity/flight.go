package entity

import "time"

type Flight struct {
	Airline          `bson:"airline" json:"airline"`
	DepartureTime    time.Time `bson:"departure_time" json:"departure_time"`
	ArrivalTime      time.Time `bson:"arrival_time" json:"arrival_time"`
	DepartureAirport Airport   `bson:"departure_airport" json:"departure_airport"`
	ArrivalAirport   Airport   `bson:"arrival_airport" json:"arrival_airport"`
	TotalSeats       int       `bson:"total_seats" json:"total_seats"`
	Price            float64   `bson:"price" json:"price"`
	CreatedAt        time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt       time.Time `bson:"modified_at" json:"modified_at"`
}
