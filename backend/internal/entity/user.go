package entity

type Preference struct {
	Language string
	Currency string
}

type User struct {
	Entity
	UserName string
	Password string
	Locked   bool
	Preference
	Customer
}
