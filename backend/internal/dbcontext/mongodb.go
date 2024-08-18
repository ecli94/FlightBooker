package dbcontext

import (
	"context"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority"

func connect() (c *mongo.Client, e error) {
	var connectOnce sync.Once
	var client *mongo.Client
	var err error
	connectOnce.Do(func() {
		client, err = connectToMongoDB()
	})

	return client, err
}

func connectToMongoDB() (*mongo.Client, error) {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	if err := client.Ping(context.TODO(), nil); err != nil {
		return nil, err
	}

	return client, nil
}
