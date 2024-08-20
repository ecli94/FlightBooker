package entity

import "time"

type Airline struct {
	Name       string    `bson:"name" json:"name"`
	IATA       string    `bson:"iata" json:"iata"`
	ICAO       string    `bson:"icao" json:"icao"`
	CreatedAt  time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt time.Time `bson:"modified_at" json:"modified_at"`
}
