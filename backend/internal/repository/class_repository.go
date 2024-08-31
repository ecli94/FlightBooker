package repository

import (
	"context"

	"github.com/ecli94/FlightBooker/cmd/utils"
	"github.com/ecli94/FlightBooker/internal/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClassRepository interface {
	Get(ctx context.Context, id primitive.ObjectID) (*entity.TravelClass, error)
	GetAll(ctx context.Context) ([]*entity.TravelClass, error)
}

type classRepository struct {
	client *mongo.Client
	config *utils.Configuration
}

func NewClassRepository(client *mongo.Client, config *utils.Configuration) ClassRepository {
	return &classRepository{client, config}
}

func (r *classRepository) Get(ctx context.Context, id primitive.ObjectID) (*entity.TravelClass, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("TravelClass")
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	var class *entity.TravelClass
	collection.FindOne(ctx, filter).Decode(&class)
	return class, nil
}

func (r *classRepository) GetAll(ctx context.Context) ([]*entity.TravelClass, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("TravelClass")

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	var classes []*entity.TravelClass
	for cursor.Next(ctx) {
		var elem entity.TravelClass
		if err := cursor.Decode(&elem); err != nil {
			return nil, err
		}

		classes = append(classes, &elem)
	}

	cursor.Close(ctx)
	return classes, nil
}
