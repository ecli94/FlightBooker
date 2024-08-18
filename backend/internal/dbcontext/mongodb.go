package dbcontext

import (
	"context"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connect(uri string) (*mongo.Client, error) {
	var connectOnce sync.Once
	var client *mongo.Client
	var err error
	connectOnce.Do(func() {
		client, err = connectToMongoDB(uri)
	})

	return client, err
}

func connectToMongoDB(uri string) (*mongo.Client, error) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	if err := client.Ping(context.TODO(), nil); err != nil {
		return nil, err
	}

	return client, nil
}
