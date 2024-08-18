package entity

import "time"

type Flight struct {
	Entity
	Airline
	DepartureTime    time.Time
	ArrivalTime      time.Time
	DepartureAirport Airport
	ArrivalAirport   Airport
	Seats            int
}
