package entity

import "time"

type Entity struct {
	ID         string    `json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	ModifiedAt time.Time `json:"modified_at"`
}

func (e Entity) GetID() string {
	return e.ID
}

func (e Entity) GetCreatedAt() time.Time {
	return e.CreatedAt
}

func (e Entity) GetModifiedAt() time.Time {
	return e.ModifiedAt
}
