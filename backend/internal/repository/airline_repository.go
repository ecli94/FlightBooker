package repository

import (
	"context"
	"reflect"

	"github.com/ecli94/FlightBooker/cmd/utils"
	"github.com/ecli94/FlightBooker/internal/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AirlineRepository interface {
	Get(ctx context.Context, id primitive.ObjectID) (*entity.Airline, error)
	Query(ctx context.Context, query string) ([]*entity.Airline, error)
	GetAll(ctx context.Context) ([]*entity.Airline, error)
	Create(ctx context.Context, airline entity.Airline) (primitive.ObjectID, error)
	Update(ctx context.Context, id primitive.ObjectID, airline entity.Airline) (int64, error)
	Delete(ctx context.Context, id primitive.ObjectID) (int64, error)
}

type airlineRepository struct {
	client *mongo.Client
	config *utils.Configuration
}

func NewAirlineRepository(client *mongo.Client, config *utils.Configuration) AirlineRepository {
	return &airlineRepository{client, config}
}

func (r *airlineRepository) Get(ctx context.Context, id primitive.ObjectID) (*entity.Airline, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airline")
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	var airline *entity.Airline
	collection.FindOne(ctx, filter).Decode(&airline)
	return airline, nil
}

func (r *airlineRepository) Query(ctx context.Context, query string) ([]*entity.Airline, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airline")

	cursor, err := collection.Find(ctx, bson.D{{Key: "name",
		Value: bson.D{{Key: "$regex", Value: "^" + query}}}})
	if err != nil {
		return nil, err
	}

	var airlines []*entity.Airline
	for cursor.Next(ctx) {
		var elem entity.Airline
		if err := cursor.Decode(&elem); err != nil {
			return nil, err
		}

		airlines = append(airlines, &elem)
	}

	cursor.Close(ctx)
	return airlines, nil
}

func (r *airlineRepository) GetAll(ctx context.Context) ([]*entity.Airline, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airline")

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	var airlines []*entity.Airline
	for cursor.Next(ctx) {
		var elem entity.Airline
		if err := cursor.Decode(&elem); err != nil {
			return nil, err
		}

		airlines = append(airlines, &elem)
	}

	cursor.Close(ctx)
	return airlines, nil
}

func (r *airlineRepository) Create(ctx context.Context, airline entity.Airline) (primitive.ObjectID, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airline")

	insertResult, err := collection.InsertOne(ctx, airline)

	if err != mongo.ErrNilCursor {
		return primitive.NilObjectID, err
	}

	if idResult, ok := insertResult.InsertedID.(primitive.ObjectID); ok {
		return idResult, nil
	} else {
		return primitive.NilObjectID, err
	}
}

func (r *airlineRepository) Update(ctx context.Context, id primitive.ObjectID, airline entity.Airline) (int64, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airline")
	updates := bson.D{}

	typeData := reflect.TypeOf(airline)
	values := reflect.ValueOf(airline)
	for i := 1; i < typeData.NumField(); i++ {
		field := typeData.Field(i)
		val := values.Field(i)
		tag := field.Tag.Get("json")

		if !isZeroType(val) {
			update := bson.E{Key: tag, Value: val.Interface()}
			updates = append(updates, update)
		}
	}

	filter := bson.D{{Key: "_id", Value: id}}
	updateFilter := bson.D{{Key: "$set", Value: updates}}
	updateResult, err := collection.UpdateOne(ctx, filter, updateFilter)

	if err != nil {
		return 0, err
	}
	return updateResult.ModifiedCount, nil
}

func (r *airlineRepository) Delete(ctx context.Context, id primitive.ObjectID) (int64, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airline")
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	result, err := collection.DeleteOne(ctx, filter)

	if err != nil {
		return 0, bson.ErrDecodeToNil
	}
	return result.DeletedCount, nil
}
