package model

import "time"

type TravelClass struct {
	Name            string    `json:"name"`
	Description     string    `json:"description"`
	PriceMultiplier float64   `json:"price_multiplier"`
	CreatedAt       time.Time `json:"created_at"`
	ModifiedAt      time.Time `json:"modified_at"`
}
