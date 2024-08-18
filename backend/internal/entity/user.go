package entity

import "time"

type User struct {
	Customer   `json:"customer"`
	UserName   string    `json:"username"`
	Password   string    `json:"password"`
	Locked     bool      `json:"locked"`
	Language   string    `json:"language"`
	Currency   string    `json:"currency"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}
