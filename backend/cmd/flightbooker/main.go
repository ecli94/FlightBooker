package main

import (
	"flag"
	// "github.com/ecli94/FlightBooker/backend/pkg/mhttp"
	// "github.com/ecli94/FlightBooker/backend/configs/configs"
)

var useHandlerFunctions bool

func main() {
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
