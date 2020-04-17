package structs

import (
	"database/sql"
	"fmt"
)

/*Category is a store Category*/
type Category struct {
	MainCategory string `json:"main_category"`
	SubCategory  string `json:"sub_category"`
}

/*Categories is an slice of Category*/
type Categories []Category

/*CreateCategoryFromQuery will return a Category from an sql query*/
func CreateCategoryFromQuery(row *sql.Row) Category {
	p := Category{}
	err := row.Scan(&p.MainCategory, &p.SubCategory)
	if err != nil {
		fmt.Println(err)
	}
	return p
}

/*CreateCategoriesFromQuery will return a Category slice from an sql query*/
func CreateCategoriesFromQuery(rows *sql.Rows) Categories {
	ps := Categories{}
	for rows.Next() {
		p := Category{}
		err := rows.Scan(&p.MainCategory, &p.SubCategory)
		if err != nil {
			rows.Scan(&p.MainCategory)
		}
		ps = append(ps, p)
	}
	return ps
}
