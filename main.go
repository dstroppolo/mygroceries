package main

import (
	"api"
	"log"
	"middleware"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

func main() {

	r := mux.NewRouter()

	secured := r.PathPrefix("/api").Subrouter()
	secured.Use(middleware.Authorize)

	secured.HandleFunc("/products/id/{uuid}", api.GetProductByID)
	secured.HandleFunc("/products/barcode/{barcode}", api.GetProductByBarcode)
	secured.HandleFunc("/products", api.GetProducts)
	secured.HandleFunc("/products/sale", api.GetProductsOnSale)
	secured.HandleFunc("/categories", api.GetMainCategories)
	secured.HandleFunc("/categories/{main}", api.GetSubCategoriesByMain)

	r.HandleFunc("/login", api.Login).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", r))
}
