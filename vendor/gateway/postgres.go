package gateway

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	host     = getEnvVar("HOST")
	port     = getEnvVar("PORT")
	user     = getEnvVar("USER")
	password = getEnvVar("PASSWORD")
	dbname   = getEnvVar("DATABASE")
)

var PSQLINFO = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require", host, port, user, password, dbname)

func Connect() (*sql.DB, error) {
	db, err := sql.Open("postgres", PSQLINFO)
	if err != nil {
		panic(err)
	}
	return db, err
}

func getEnvVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}
