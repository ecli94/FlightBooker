package entity

type Customer struct {
	Entity
	FirstName   string
	MiddleName  string
	LastName    string
	Email       string
	PhoneNumber string
	Bookings    []Booking
}
