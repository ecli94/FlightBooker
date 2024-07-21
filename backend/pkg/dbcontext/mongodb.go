package dbcontext

import (
	"context"
	"fmt"
	"log"
	"os"

	// "github.com/ecli94/FlightBooker/backend/configs/configs"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func initClient() *mongo.Client {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().
		ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
	return client
}

func disconnectClient(client mongo.Client) {
	if err := client.Disconnect(context.TODO()); err != nil {
		panic(err)
	} else {
		fmt.Println("Disconnected from MongoDB!")
	}
}
