package main

import (
	"fmt"
	"gateway"
	"structs"

	_ "github.com/lib/pq"
)

func main() {
	p := structs.Product{Uuid: "abc", Name: "prod", Brand: "brand", Url: "url", MainCategory: "main"}

	db, err := gateway.Connect()
	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}

	defer db.Close()

	stmt := "SELECT * FROM products LIMIT 2"

	res, err := db.Query(stmt)
	if err != nil {
		fmt.Println("Error querying: " + err.Error())
	}

	for res.Next() {
		fmt.Println(res.Columns())
	}

	fmt.Println(p.Uuid)

}
