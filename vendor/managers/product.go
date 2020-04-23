package managers

import (
	"fmt"
	"gateway"
	"strconv"
	"structs"
)

const selectQ = `SELECT uuid, name, brand, url, main_category, 
	sub_category, weight, barcode, image, unit, 
	regular_price, sale_price FROM products WHERE `

/*GetByID gets a single product by it's internal ID*/
func GetByID(uuid string) structs.Product {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}
	stmt := selectQ + "uuid = '" + uuid + "'"

	res := db.QueryRow(stmt)
	p := structs.CreateProductFromQuery(res)
	return p
}

/*GetByBarcode gets a single product by it's barcode id*/
func GetByBarcode(barcode int) structs.Product {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}
	stmt := selectQ + "barcode = '" + strconv.Itoa(barcode) + "'"

	res := db.QueryRow(stmt)
	p := structs.CreateProductFromQuery(res)
	return p
}

/*GetByOnSale gets all products that are on sale*/
func GetByOnSale(byCategory string, limit string, offset string) structs.Products {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}
	stmt := selectQ + "sale_price <> ''"

	if byCategory != "" {
		stmt += getByCategory(byCategory)
	}

	if limit != "" {
		stmt += returnWithOffsetLimit(limit, offset)
	}

	res, _ := db.Query(stmt)
	p := structs.CreateProductsFromQuery(res)
	return p
}

/*GetProducts gets all products*/
func GetProducts(byCategory string, limit string, offset string) structs.Products {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}
	stmt := selectQ + "id > 0"

	if byCategory != "" {
		stmt += getByCategory(byCategory)
	}

	if limit != "" {
		stmt += returnWithOffsetLimit(limit, offset)
	}

	res, _ := db.Query(stmt)
	p := structs.CreateProductsFromQuery(res)
	return p
}

func getByCategory(category string) string {
	return " AND (main_category='" + category + "' OR sub_category='" + category + "')"
}

func returnWithOffsetLimit(limit string, offset string) string {
	q := " "
	if limit != "" {
		q += "LIMIT " + limit
	}
	if offset != "" {
		q += " OFFSET " + offset
	}
	return q
}
