package managers

import (
	"fmt"
	"gateway"
	"structs"
)

/*GetMainCategories gets a list of all categories*/
func GetMainCategories() structs.Categories {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}

	stmt := "SELECT main_category FROM categories GROUP BY main_category"

	res, qErr := db.Query(stmt)
	if qErr != nil {
		//TODO return error
	}
	p := structs.CreateCategoriesFromQuery(res)
	return p
}

/*GetSubCategoriesByMain gets a list of all subcategories for a given main category*/
func GetSubCategoriesByMain(main string) structs.Categories {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}

	stmt := "SELECT main_category, sub_category FROM categories WHERE main_category = '" + main + "' GROUP BY main_category, sub_category"

	res, qErr := db.Query(stmt)
	if qErr != nil {
		//TODO return error
	}
	p := structs.CreateCategoriesFromQuery(res)
	return p
}
