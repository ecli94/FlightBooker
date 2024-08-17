package airline

import (
	"context"

	"github.com/ecli94/FlightBooker/internal/dbcontext"
	"github.com/ecli94/FlightBooker/internal/entity"
	"github.com/ecli94/FlightBooker/pkg/log"
)

type Repository interface {
	Get(ctx context.Context, id string) (*entity.Airline, error)
	Query(ctx context.Context, query string) ([]*entity.Airline, error)
	GetAll(ctx context.Context) ([]*entity.Airline, error)
	Create(ctx context.Context, airline entity.Airline) error
	Update(ctx context.Context, airline entity.Airline) error
	Delete(ctx context.Context, id string) error
}

type repository struct {
	store  *dbcontext.MongoDataStore
	logger log.Logger
}

func NewRepository(store *dbcontext.MongoDataStore, logger log.Logger) Repository {
	return &repository{store: store, logger: logger}
}

func (r *repository) Get(ctx context.Context, id string) (*entity.Airline, error) {

}

func (r *repository) Query(ctx context.Context, query string) ([]*entity.Airline, error) {

}

func (r *repository) GetAll(ctx context.Context) ([]*entity.Airline, error) {

}

func (r *repository) Create(ctx context.Context, airline entity.Airline) error {

}

func (r *repository) Update(ctx context.Context, airline entity.Airline) error {

}

func (r *repository) Delete(ctx context.Context, id string) error {

}
