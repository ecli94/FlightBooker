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

type AirportHandler interface {
	Get(*gin.Context)
	Query(*gin.Context)
	GetAll(*gin.Context)
	Create(*gin.Context)
	Update(*gin.Context)
	Delete(*gin.Context)
}

type airportHandler struct {
	client      *mongo.Client
	airportRepo repository.AirportRepository
	config      utils.Configuration
}

func NewAirportHandler(client *mongo.Client, repo repository.AirportRepository,
	config utils.Configuration) AirportHandler {
	return &airportHandler{client, repo, config}
}

func (h *airportHandler) Get(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(),
		time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse airport ID to retrieve", err, map[string]interface{}{"Data": id})
	}

	result, err := h.airportRepo.Get(ctx, oId)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Airport_Handler_Get method", err, map[string]interface{}{"Data": id})
	}
	if result == nil {
		utils.NotFoundRequestError("Airport_Handler_Get method", err, map[string]interface{}{"Data": id})
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airport_Handler_Get method",
		map[string]interface{}{"Data": result}))
}

func (h *airportHandler) Query(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	queryParam := c.Param("query")

	var airportModelList []*model.Airport
	result, err := h.airportRepo.Query(ctx, queryParam)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Airport_Handler_Query method", err, map[string]interface{}{"Data": ""})
	}

	for _, item := range result {
		airportModelList = append(airportModelList, (*model.Airport)(item))
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airport_Handler_Query method",
		map[string]interface{}{"Data": airportModelList}))
}

func (h *airportHandler) GetAll(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	var airportModelList []*model.Airport
	result, err := h.airportRepo.GetAll(ctx)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Airport_Handler_Get_All method", err, map[string]interface{}{"Data": ""})
	}

	for _, item := range result {
		airportModelList = append(airportModelList, (*model.Airport)(item))
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airport_Handler_Get_All method",
		map[string]interface{}{"Data": airportModelList}))
}

func (h *airportHandler) Create(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	var airportEntity = &entity.Airport{
		Name:       c.Param("name"),
		IATA:       c.Param("iata"),
		ICAO:       c.Param("icao"),
		City:       c.Param("city"),
		Country:    c.Param("country"),
		CreatedAt:  time.Now(),
		ModifiedAt: time.Now(),
	}

	entity := entity.Airport(*airportEntity)
	oId, err := h.airportRepo.Create(ctx, entity)
	if err != nil {
		utils.BadRequestError("Airport_Handler_Create method", err, map[string]interface{}{"Data": entity})
	}

	c.IndentedJSON(http.StatusCreated, utils.Response("Airport_Handler_Create method",
		map[string]interface{}{"Data": oId}))
}

func (h *airportHandler) Update(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse airport ID to update", err, map[string]interface{}{"Data": id})
	}

	var airportEntity = &entity.Airport{
		Name:       c.Param("name"),
		IATA:       c.Param("iata"),
		ICAO:       c.Param("icao"),
		City:       c.Param("city"),
		Country:    c.Param("country"),
		ModifiedAt: time.Now(),
	}

	entity := entity.Airport(*airportEntity)
	uId, err := h.airportRepo.Update(ctx, oId, entity)
	if err != nil {
		utils.BadRequestError("Airport_Handler_Update method", err, map[string]interface{}{"Data": entity})
	}

	c.IndentedJSON(http.StatusCreated, utils.Response("Airport_Handler_Update method",
		map[string]interface{}{"Data": uId}))
}

func (h *airportHandler) Delete(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse airport ID to delete", err, map[string]interface{}{"Data": id})
	}

	result, err := h.airportRepo.Delete(ctx, oId)
	if err != nil {
		utils.BadRequestError("Airport_Handler_Delete method", err, map[string]interface{}{"Data": id})
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Airport_Handler_Delete method",
		map[string]interface{}{"Data": result}))
}
