package api

import (
	"encoding/json"
	"managers"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

/*GetProductByID gets a product by its internal id*/
func GetProductByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := mux.Vars(r)["uuid"]
	p := managers.GetByID(id)
	jsonData, err := json.Marshal(p)
	if err != nil {
		//todo: throw error
	}
	w.Write(jsonData)
}

/*GetProductByBarcode gets a product by its Barcode*/
func GetProductByBarcode(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	barcodeStr := mux.Vars(r)["barcode"]
	barcode, _ := strconv.Atoi(barcodeStr)
	p := managers.GetByBarcode(barcode)
	jsonData, err := json.Marshal(p)
	if err != nil {
		//todo: throw error
	}
	w.Write(jsonData)
}

/*GetProductsOnSale gets all products that are on sale*/
func GetProductsOnSale(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	byCategory := r.URL.Query().Get("category")

	limit := r.URL.Query().Get("limit")
	offset := r.URL.Query().Get("offset")

	_, limitErr := strconv.Atoi(limit)
	_, offsetErr := strconv.Atoi(offset)

	if limitErr != nil {
		//throw error
	}

	if offsetErr != nil {
		//throw error
	}

	p := managers.GetByOnSale(byCategory, limit, offset)
	jsonData, err := json.Marshal(p)
	if err != nil {
		//todo: throw error
	}
	w.Write(jsonData)
}

/*GetProducts gets all products*/
func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	byCategory := r.URL.Query().Get("category")

	limit := r.URL.Query().Get("limit")
	offset := r.URL.Query().Get("offset")

	_, limitErr := strconv.Atoi(limit)
	_, offsetErr := strconv.Atoi(offset)

	if limitErr != nil {
		//throw error
	}

	if offsetErr != nil {
		//throw error
	}

	p := managers.GetProducts(byCategory, limit, offset)
	jsonData, err := json.Marshal(p)
	if err != nil {
		//todo: throw error
	}
	w.Write(jsonData)
}
