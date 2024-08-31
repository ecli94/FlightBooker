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

func InitClassApi(config utils.Configuration) {
	client, err := dbcontext.Connect(config.Database.Url)

	if err != nil {
		logrus.Fatal(err)
	}

	classRepository := repository.NewClassRepository(client, &config)
	classHandler := handler.NewClassHandler(client, classRepository, config)

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	classRouter := gin.Default()

	api := classRouter.Group("api/v1")
	{
		api.GET("/class/get/:id", classHandler.Get)
		api.GET("/class/getall", classHandler.GetAll)
	}

	// PORT environment variable was defined.
	formattedUrl := fmt.Sprintf(":%s", config.Server.Port)

	classRouter.Run(formattedUrl)
}
