package structs

type Product struct {
	Uuid         string `json:"uuid"`
	Name         string `json:"name"`
	Brand        string `json:"brand"`
	Url          string `json:"url"`
	MainCategory string `json:"main_category"`
	SubCategory  string `json:"sub_category"`
	Weight       string `json:"weight"`
	Barcode      int64  `json:"barcode"`
	Image        string `json:"image"`
	Unit         string `json:"unit"`
	RegularPrice string `json:"regular_price"`
	SalePrice    string `json:"sale_price"`
}

type Products []Product
