package api

import (
	"encoding/json"
	"managers"
	"net/http"

	"github.com/gorilla/mux"
)

/*GetMainCategories gets a product by its internal id*/
func GetMainCategories(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	p := managers.GetMainCategories()
	jsonData, err := json.Marshal(p)
	if err != nil {
		//todo: throw error
	}
	w.Write(jsonData)
}

/*GetSubCategoriesByMain gets a list of all subcategories for a given main category*/
func GetSubCategoriesByMain(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	main := mux.Vars(r)["main"]
	p := managers.GetSubCategoriesByMain(main)
	jsonData, err := json.Marshal(p)
	if err != nil {
		//todo: throw error
	}
	w.Write(jsonData)
}
