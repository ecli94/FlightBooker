package entity

import "time"

type User struct {
	UserName   string `bson:"username" json:"username"`
	Password   string `bson:"password" json:"password"`
	Language   string `bson:"language" json:"language"`
	Currency   string `bson:"currency" json:"currency"`
	Customer   `bson:"customer" json:"customer"`
	CreatedAt  time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt time.Time `bson:"modified_at" json:"modified_at"`
}
