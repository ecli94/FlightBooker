package config

import (
	"os"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/qiangxue/go-env"
	"github.com/qiangxue/go-rest-api/pkg/log"
	"gopkg.in/yaml.v2"
)

const (
	defaultServerUrl          = "localhost"
	defaultServerPort         = 8080
	defaultJWTExpirationHours = 72
)

type Config struct {
	ServerPort    int    `yaml:"server_port" env:"SERVER_PORT"`
	DSN           string `yaml:"dsn" env:"DSN,secret"`
	JWTSigningKey string `yaml:"jwt_signing_key" env:"JWT_SIGNING_KEY,secret"`
	JWTExpiration int    `yaml:"jwt_expiration" env:"JWT_EXPIRATION"`
}

// Validate validates the application configuration.
func (c Config) Validate() error {
	return validation.ValidateStruct(&c,
		validation.Field(&c.DSN, validation.Required),
		validation.Field(&c.JWTSigningKey, validation.Required),
	)
}

// Load returns an application configuration which is populated from the given configuration file and environment variables.
func Load(file string, logger log.Logger) (*Config, error) {
	// default config
	c := Config{
		ServerPort:    defaultServerPort,
		JWTExpiration: defaultJWTExpirationHours,
	}

	// load from YAML config file
	bytes, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}
	if err = yaml.Unmarshal(bytes, &c); err != nil {
		return nil, err
	}

	// load from environment variables prefixed with "APP_"
	if err = env.New("APP_", logger.Infof).Load(&c); err != nil {
		return nil, err
	}

	// validation
	if err = c.Validate(); err != nil {
		return nil, err
	}

	return &c, err
}
