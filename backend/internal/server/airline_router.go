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

func InitAirlineApi(config utils.Configuration) {
	client, err := dbcontext.Connect(config.Database.Url)

	if err != nil {
		logrus.Fatal(err)
	}

	airlineRepository := repository.NewAirlineRepository(client, &config)
	airlineHandler := handler.NewAirlineHandler(client, airlineRepository, config)

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	airlineRouter := gin.Default()

	api := airlineRouter.Group("api/v1")
	{
		api.GET("/airline/get/:id", airlineHandler.Get)
		api.GET("/airline/search/:query", airlineHandler.Query)
		api.GET("/airline/getall", airlineHandler.GetAll)
		api.POST("/airline/create", airlineHandler.Create)
		api.PUT("/airline/update/:id", airlineHandler.Update)
		api.DELETE("/airline/delete/:id", airlineHandler.Delete)
	}

	// PORT environment variable was defined.
	formattedUrl := fmt.Sprintf(":%s", config.Server.Port)

	airlineRouter.Run(formattedUrl)
}
