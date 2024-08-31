package handler

import (
	"context"
	"net/http"
	"time"

	"github.com/ecli94/FlightBooker/cmd/utils"
	"github.com/ecli94/FlightBooker/internal/model"
	"github.com/ecli94/FlightBooker/internal/repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ClassHandler interface {
	Get(*gin.Context)
	GetAll(*gin.Context)
}

type classHandler struct {
	client    *mongo.Client
	classRepo repository.ClassRepository
	config    utils.Configuration
}

func NewClassHandler(client *mongo.Client, repo repository.ClassRepository,
	config utils.Configuration) ClassHandler {
	return &classHandler{client, repo, config}
}

func (h *classHandler) Get(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(),
		time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	id := c.Param("id")

	oId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		utils.BadRequestError("Unable to parse travel class ID to retrieve", err, map[string]interface{}{"Data": id})
	}

	result, err := h.classRepo.Get(ctx, oId)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Class_Handler_Get method", err, map[string]interface{}{"Data": id})
	}
	if result == nil {
		utils.NotFoundRequestError("Class_Handler_Get method", err, map[string]interface{}{"Data": id})
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Class_Handler_Get method",
		map[string]interface{}{"Data": result}))
}

func (h *classHandler) GetAll(c *gin.Context) {
	ctx, ctxErr := context.WithTimeout(c.Request.Context(), time.Duration(h.config.App.Timeout)*time.Second)
	defer ctxErr()

	var classModelList []*model.TravelClass
	result, err := h.classRepo.GetAll(ctx)
	if err != mongo.ErrNilCursor {
		utils.BadRequestError("Class_Handler_Get_All method", err, map[string]interface{}{"Data": ""})
	}

	for _, item := range result {
		classModelList = append(classModelList, (*model.TravelClass)(item))
	}

	c.IndentedJSON(http.StatusOK, utils.Response("Class_Handler_Get_All method",
		map[string]interface{}{"Data": classModelList}))
}
