package dbcontext

import (
	"context"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority"

type MongoDataStore struct {
	db     *mongo.Database
	client *mongo.Client
	ctx    context.Context
	cancel context.CancelFunc
}

func NewDataStore() *MongoDataStore {
	db, client, ctx, cancel := connect()
	if db != nil && client != nil {
		mongoDataStore := new(MongoDataStore)
		mongoDataStore.db = db
		mongoDataStore.client = client
		mongoDataStore.ctx = ctx
		mongoDataStore.cancel = cancel
		return mongoDataStore
	}

	return nil
}

func connect() (a *mongo.Database, b *mongo.Client, c context.Context, d context.CancelFunc) {
	var connectOnce sync.Once
	var db *mongo.Database
	var client *mongo.Client
	var ctx context.Context
	var cancel context.CancelFunc
	connectOnce.Do(func() {
		db, client, ctx, cancel = connectToMongo()
	})

	return db, client, ctx, cancel
}

func connectToMongo() (a *mongo.Database, b *mongo.Client, c context.Context, d context.CancelFunc) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	db := client.Database("FlightBooker")

	return db, client, ctx, cancel
}

func disconnect(client *mongo.Client, ctx context.Context, cancel context.CancelFunc) {
	defer cancel()

	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
}

func ping(client *mongo.Client, ctx context.Context) error {
	// mongo.Client has Ping to ping mongoDB, deadline of
	// the Ping method will be determined by cxt
	// Ping method return error if any occurred, then
	// the error can be handled.
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return err
	}
	return nil
}
