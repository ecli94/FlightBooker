package server

import (
	"fmt"

	"github.com/ecli94/FlightBooker/cmd/utils"
	"github.com/ecli94/FlightBooker/internal/dbcontext"
	"github.com/ecli94/FlightBooker/internal/handler"
	"github.com/ecli94/FlightBooker/internal/repository"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func InitAirportApi(config utils.Configuration) {
	client, err := dbcontext.Connect(config.Database.Url)

	if err != nil {
		logrus.Fatal(err)
	}

	airportRepository := repository.NewAirportRepository(client, &config)
	airportHandler := handler.NewAirportHandler(client, airportRepository, config)

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	airportRouter := gin.Default()

	api := airportRouter.Group("api/v1")
	{
		api.GET("/airline/get/:id", airportHandler.Get)
		api.GET("/airline/search/:query", airportHandler.Query)
		api.GET("/airline/getall", airportHandler.GetAll)
		api.POST("/airline/create", airportHandler.Create)
		api.PUT("/airline/update/:id", airportHandler.Update)
		api.DELETE("/airline/delete/:id", airportHandler.Delete)
	}

	// PORT environment variable was defined.
	formattedUrl := fmt.Sprintf(":%s", config.Server.Port)

	airportRouter.Run(formattedUrl)
}
