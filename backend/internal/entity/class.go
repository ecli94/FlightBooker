package entity

import "time"

type TravelClass struct {
	Name            string    `bson:"name" json:"name"`
	Description     string    `bson:"description" json:"description"`
	PriceMultiplier float64   `bson:"price_multiplier" json:"price_multiplier"`
	CreatedAt       time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt      time.Time `bson:"modified_at" json:"modified_at"`
}
