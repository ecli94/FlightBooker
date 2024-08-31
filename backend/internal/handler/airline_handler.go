package handler

import (
	"context"
	"net/http"
	"time"

	"github.com/ecli94/FlightBooker/cmd/utils"
	"github.com/ecli94/FlightBooker/internal/entity"
	"github.com/ecli94/FlightBooker/internal/model"
	"github.com/ecli94/FlightBooker/internal/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type AirlineHandler interface {
	Get(*gin.Context)
	Query(*gin.Context)
	GetAll(*gin.Context)
	Create(*gin.Context)
	Update(*gin.Context)
	Delete(*gin.Context)
}

type airlineHandler struct {
	client      *mongo.Client
	airlineRepo repository.AirlineRepository
	config      utils.Configuration
}

func NewAirlineHandler(client *mongo.Client, repo repository.AirlineRepository,
	config utils.Configuration) AirlineHandler {
	return &airlineHandler{client, repo, config}
}

func (h *airlineHandler) Get(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(),
		time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse airline ID to retrieve", err, map[string]interface{}{"Data": id})
	}

	result, err := h.airlineRepo.Get(ctx, oId)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Airline_Handler_Get method", err, map[string]interface{}{"Data": id})
	}
	if result == nil {
		utils.NotFoundRequestError("Airline_Handler_Get method", err, map[string]interface{}{"Data": id})
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airline_Handler_Get method",
		map[string]interface{}{"Data": result}))
}

func (h *airlineHandler) Query(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	queryParam := c.Param("query")

	var airlineModelList []*model.Airline
	result, err := h.airlineRepo.Query(ctx, queryParam)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Airline_Handler_Query method", err, map[string]interface{}{"Data": ""})
	}

	for _, item := range result {
		airlineModelList = append(airlineModelList, (*model.Airline)(item))
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airline_Handler_Query method",
		map[string]interface{}{"Data": airlineModelList}))
}

func (h *airlineHandler) GetAll(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	var airlineModelList []*model.Airline
	result, err := h.airlineRepo.GetAll(ctx)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Airline_Handler_Get_All method", err, map[string]interface{}{"Data": ""})
	}

	for _, item := range result {
		airlineModelList = append(airlineModelList, (*model.Airline)(item))
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airline_Handler_Get_All method",
		map[string]interface{}{"Data": airlineModelList}))
}

func (h *airlineHandler) Create(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	var airlineEntity = &entity.Airline{
		Name:       c.Param("name"),
		IATA:       c.Param("iata"),
		ICAO:       c.Param("icao"),
		CreatedAt:  time.Now(),
		ModifiedAt: time.Now(),
	}

	entity := entity.Airline(*airlineEntity)
	oId, err := h.airlineRepo.Create(ctx, entity)
	if err != nil {
		utils.BadRequestError("Airline_Handler_Create method", err, map[string]interface{}{"Data": entity})
	}

	c.IndentedJSON(http.StatusCreated, utils.Response("Airline_Handler_Create method",
		map[string]interface{}{"Data": oId}))
}

func (h *airlineHandler) Update(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse airline ID to update", err, map[string]interface{}{"Data": id})
	}

	var airlineEntity = &entity.Airline{
		Name:       c.Param("name"),
		IATA:       c.Param("iata"),
		ICAO:       c.Param("icao"),
		ModifiedAt: time.Now(),
	}

	entity := entity.Airline(*airlineEntity)
	uId, err := h.airlineRepo.Update(ctx, oId, entity)
	if err != nil {
		utils.BadRequestError("Airline_Handler_Update method", err, map[string]interface{}{"Data": entity})
	}

	c.IndentedJSON(http.StatusCreated, utils.Response("Airline_Handler_Update method",
		map[string]interface{}{"Data": uId}))
}

func (h *airlineHandler) Delete(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse airline ID to delete", err, map[string]interface{}{"Data": id})
	}

	result, err := h.airlineRepo.Delete(ctx, oId)
	if err != nil {
		utils.BadRequestError("Airline_Handler_Delete method", err, map[string]interface{}{"Data": id})
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airline_Handler_Delete method",
		map[string]interface{}{"Data": result}))
}
