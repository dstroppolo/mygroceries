package structs

import (
	"database/sql"
	"fmt"
)

/*Product is a store product*/
type Product struct {
	UUID         string `json:"uuid"`
	Name         string `json:"name"`
	Brand        string `json:"brand"`
	URL          string `json:"url"`
	MainCategory string `json:"main_category"`
	SubCategory  string `json:"sub_category"`
	Weight       string `json:"weight"`
	Barcode      int64  `json:"barcode"`
	Image        string `json:"image"`
	Unit         string `json:"unit"`
	RegularPrice string `json:"regular_price"`
	SalePrice    string `json:"sale_price"`
}

/*Products is an slice of Product*/
type Products []Product

/*CreateProductFromQuery will return a product from an sql query*/
func CreateProductFromQuery(row *sql.Row) Product {
	p := Product{}
	err := row.Scan(
		&p.UUID, &p.Name, &p.Brand, &p.URL, &p.MainCategory,
		&p.SubCategory, &p.Weight, &p.Barcode,
		&p.Image, &p.Unit, &p.RegularPrice, &p.SalePrice)
	if err != nil {
		fmt.Println(err)
	}

	return p
}

/*CreateProductsFromQuery will return a product slice from an sql query*/
func CreateProductsFromQuery(rows *sql.Rows) Products {

	ps := Products{}

	for rows.Next() {
		p := Product{}
		err := rows.Scan(
			&p.UUID, &p.Name, &p.Brand, &p.URL, &p.MainCategory,
			&p.SubCategory, &p.Weight, &p.Barcode,
			&p.Image, &p.Unit, &p.RegularPrice, &p.SalePrice)
		if err != nil {
			fmt.Println(err)
		}
		ps = append(ps, p)
	}
	return ps
}
