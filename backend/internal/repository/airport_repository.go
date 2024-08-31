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

type AirportRepository interface {
	Get(ctx context.Context, id primitive.ObjectID) (*entity.Airport, error)
	Query(ctx context.Context, query string) ([]*entity.Airport, error)
	GetAll(ctx context.Context) ([]*entity.Airport, error)
	Create(ctx context.Context, airport entity.Airport) (primitive.ObjectID, error)
	Update(ctx context.Context, id primitive.ObjectID, airport entity.Airport) (int64, error)
	Delete(ctx context.Context, id primitive.ObjectID) (int64, error)
}

type airportRepository struct {
	client *mongo.Client
	config *utils.Configuration
}

func NewAirportRepository(client *mongo.Client, config *utils.Configuration) AirportRepository {
	return &airportRepository{client, config}
}

func (r *airportRepository) Get(ctx context.Context, id primitive.ObjectID) (*entity.Airport, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airport")
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	var airport *entity.Airport
	collection.FindOne(ctx, filter).Decode(&airport)
	return airport, nil
}

func (r *airportRepository) Query(ctx context.Context, query string) ([]*entity.Airport, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airport")

	cursor, err := collection.Find(ctx, bson.D{{Key: "name",
		Value: bson.D{{Key: "$regex", Value: "^" + query}}}})
	if err != nil {
		return nil, err
	}

	var airports []*entity.Airport
	for cursor.Next(ctx) {
		var elem entity.Airport
		if err := cursor.Decode(&elem); err != nil {
			return nil, err
		}

		airports = append(airports, &elem)
	}

	cursor.Close(ctx)
	return airports, nil
}

func (r *airportRepository) GetAll(ctx context.Context) ([]*entity.Airport, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airport")

	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	var airports []*entity.Airport
	for cursor.Next(ctx) {
		var elem entity.Airport
		if err := cursor.Decode(&elem); err != nil {
			return nil, err
		}

		airports = append(airports, &elem)
	}

	cursor.Close(ctx)
	return airports, nil
}

func (r *airportRepository) Create(ctx context.Context, airport entity.Airport) (primitive.ObjectID, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airport")

	insertResult, err := collection.InsertOne(ctx, airport)

	if err != mongo.ErrNilCursor {
		return primitive.NilObjectID, err
	}

	if idResult, ok := insertResult.InsertedID.(primitive.ObjectID); ok {
		return idResult, nil
	} else {
		return primitive.NilObjectID, err
	}
}

func (r *airportRepository) Update(ctx context.Context, id primitive.ObjectID, airport entity.Airport) (int64, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airport")
	updates := bson.D{}

	typeData := reflect.TypeOf(airport)
	values := reflect.ValueOf(airport)
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

func (r *airportRepository) Delete(ctx context.Context, id primitive.ObjectID) (int64, error) {
	collection := r.client.Database(r.config.Database.DbName).Collection("Airport")
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	result, err := collection.DeleteOne(ctx, filter)

	if err != nil {
		return 0, bson.ErrDecodeToNil
	}
	return result.DeletedCount, nil
}
