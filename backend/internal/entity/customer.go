package entity

import "time"

type Customer struct {
	FirstName   string    `bson:"first_name" json:"first_name"`
	MiddleName  string    `bson:"middle_name" json:"middle_name"`
	LastName    string    `bson:"last_name" json:"last_name"`
	Email       string    `bson:"email" json:"email"`
	PhoneNumber string    `bson:"phone_number" json:"phone_number"`
	Bookings    []Booking `bson:"bookings" json:"bookings"`
	CreatedAt   time.Time `bson:"created_at" json:"created_at"`
	ModifiedAt  time.Time `bson:"modified_at" json:"modified_at"`
}
