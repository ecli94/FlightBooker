package server

import (
	"github.com/ecli94/FlightBooker/cmd/utils"
	"github.com/sirupsen/logrus"
)

func Initialize(config utils.Configuration) {
	var log = logrus.New()

	log.WithFields(logrus.Fields{
		"mongo_url":   config.Database.Url,
		"server_port": config.Server.Port,
		"db_name":     config.Database.DbName,
		"timeout":     config.App.Timeout,
	}).Info("\nConfiguration information\n")

	logrus.Infof("Application Name %s is starting...", config.App.Name)
}
