package model

import "time"

type Customer struct {
	FirstName   string    `json:"first_name"`
	MiddleName  string    `json:"middle_name"`
	LastName    string    `json:"last_name"`
	Email       string    `json:"email"`
	PhoneNumber string    `json:"phone_number"`
	Bookings    []Booking `json:"bookings"`
	CreatedAt   time.Time `json:"created_at"`
	ModifiedAt  time.Time `json:"modified_at"`
}
