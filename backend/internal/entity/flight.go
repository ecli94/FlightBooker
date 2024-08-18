package entity

import "time"

type Flight struct {
	Airline          `json:"airline"`
	DepartureTime    time.Time `json:"departure_time"`
	ArrivalTime      time.Time `json:"arrival_time"`
	DepartureAirport Airport   `json:"departure_airport"`
	ArrivalAirport   Airport   `json:"arrival_airport"`
	Seats            int       `json:"seats"`
	CreatedAt        time.Time `json:"created_at"`
	ModifiedAt       time.Time `json:"modified_at"`
}
