package main

import (
	"api"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/products/id/{uuid}", api.GetProductByID)
	r.HandleFunc("/products/barcode/{barcode}", api.GetProductByBarcode)
	r.HandleFunc("/products", api.GetProducts)
	r.HandleFunc("/products/sale", api.GetProductsOnSale)
	r.HandleFunc("/categories", api.GetMainCategories)
	r.HandleFunc("/categories/{main}", api.GetSubCategoriesByMain)
	log.Fatal(http.ListenAndServe(":8080", r))
}
