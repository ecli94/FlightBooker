package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"

	// "github.com/ecli94/FlightBooker/backend/pkg/mhttp"
	// "github.com/ecli94/FlightBooker/backend/configs/configs"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var useHandlerFunctions bool

func main() {
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

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("").Collection("")
	value := ""

	var result bson.M
	err = coll.FindOne(context.TODO(), bson.D{{Key: "key", Value: value}}).
		Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Printf("No document was found with the title %s\n", value)
		return
	}
	if err != nil {
		panic(err)
	}

	jsonData, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", jsonData)

	flag.BoolVar(&useHandlerFunctions, "use-handler-functions", true, "Runs the Web Browser with handler functions, use false to run it in FileServer mode.")
	flag.Parse()

	// server := mhttp.NewServer(configs.SERVER_STATIC_DIRECTORY, configs.SERVER_URL, configs.SERVER_PORT)
	// var err2 error

	// if useHandlerFunctions {
	// 	err2 = server.InitializeHandlerFunctions()
	// } else {
	// 	err2 = server.InitializeFileServer()
	// }

	// if err2 != nil {
	// 	log.Fatal(err2)
	// }
	// server.ListenAndServe()
}
