# MY GROCERIES

## CATEGORIES

---

### GET MAIN CATEGORIES

Get a list of all main categories available.

**URL** : `/api/categories`

**Method** : `GET`

**Auth required** : YES

### Success Response

**Code** : `200 OK`

### Content examples


```json
[
  {
    "main_category": "frozen",
    "sub_category": ""
  },
  {
    "main_category": "dairy-eggs",
    "sub_category": ""
  },
]
```

## Notes

* Categories do not regularly change in the system.

---

### GET SUB CATEGORIES

Get a list of all subcategories for a given main category.

**URL** : `/api/categories/{category-name}`

**Method** : `GET`

**Auth required** : YES

### Success Response

**Code** : `200 OK`

### Content examples


```json
[
  {
    "main_category": "frozen",
    "sub_category": "appetizers-snacks"
  },
  {
    "main_category": "frozen",
    "sub_category": "fish-seafood"
  }
]
```

### Error Response

**Code** : `404 NOT FOUND`

### Content examples


```json
{"error": "No such category exists"}
```

## Notes

* Categories do not regularly change in the system. 

---

## PRODUCTS

---

### GET PRODUCT BY ID

Get a product's information given it's UUID.

**URL** : `/api/products/id/{uuid}`

**Method** : `GET`

**Auth required** : YES

### Success Response

**Code** : `200 OK`

### Content examples


```json
{
    "uuid": "8cefae7e-7f81-11ea-b1ba-22000ab3a3ba",
    "name": "12 grains sliced bread",
    "brand": "Dempster's",
    "url": "https://www.metro.ca/en/online-grocery/aisles/bread-bakery-products/packaged-bread/whole-wheat-grain/12-grains-sliced-bread/p/068721722342",
    "main_category": "bread-bakery-products",
    "sub_category": "packaged-bread",
    "weight": "600 g",
    "barcode": 68721722342,
    "image": "https://product-images.metro.ca/images/h92/hfe/9398179430430.jpg",
    "unit": "ea.",
    "regular_price": "3.79",
    "sale_price": "2/5.00"
}
```

### Error Response

**Code** : `404 NOT FOUND`

### Content examples


```json
{"error": "No such product exists"}
```

---

### GET PRODUCT BY BARCODE

Get a product's information given it's barcode.

**URL** : `/api/products/barcode/{barcode}`

**Method** : `GET`

**Auth required** : YES

### Success Response

**Code** : `200 OK`

### Content examples


```json
{
    "uuid": "8cefae7e-7f81-11ea-b1ba-22000ab3a3ba",
    "name": "12 grains sliced bread",
    "brand": "Dempster's",
    "url": "https://www.metro.ca/en/online-grocery/aisles/bread-bakery-products/packaged-bread/whole-wheat-grain/12-grains-sliced-bread/p/068721722342",
    "main_category": "bread-bakery-products",
    "sub_category": "packaged-bread",
    "weight": "600 g",
    "barcode": 68721722342,
    "image": "https://product-images.metro.ca/images/h92/hfe/9398179430430.jpg",
    "unit": "ea.",
    "regular_price": "3.79",
    "sale_price": "2/5.00"
}
```

### Error Response

**Code** : `404 NOT FOUND`

### Content examples


```json
{"error": "No such product exists"}
```

----

### GET PRODUCTS

Get a list of products

**URL** : `/api/products`

**QUERY PARAMS**:

* **category**: category of products to retrieve
* **limit**: max number of items to retrieve
* **offset**: offset for pagination
* `/api/products?category=frozen&limit=12&offset=24`

**Method** : `GET`

**Auth required** : YES

### Success Response

**Code** : `200 OK`

### Content examples


```json
[
  {
    "uuid": "8cefae7e-7f81-11ea-b1ba-22000ab3a3ba",
    "name": "12 grains sliced bread",
    "brand": "Dempster's",
    "url": "https://www.metro.ca/en/online-grocery/aisles/bread-bakery-products/packaged-bread/whole-wheat-grain/12-grains-sliced-bread/p/068721722342",
    "main_category": "bread-bakery-products",
    "sub_category": "packaged-bread",
    "weight": "600 g",
    "barcode": 68721722342,
    "image": "https://product-images.metro.ca/images/h92/hfe/9398179430430.jpg",
    "unit": "ea.",
    "regular_price": "3.79",
    "sale_price": "2/5.00"
  },
  {
    ...
  },
  ...
]
```

### Error Response

**Code** : `403 FORBIDDEN`

### Content examples


```json
{
    "error": "You must be authorized to view this."
}
```
---

### GET PRODUCTS ON SALE

Get a list of products

**URL** : `/api/products/sale`

**QUERY PARAMS**:

* **category**: category of products to retrieve
* **limit**: max number of items to retrieve
* **offset**: offset for pagination
* `/api/products?category=frozen&limit=12&offset=24`

**Method** : `GET`

**Auth required** : YES

### Success Response

**Code** : `200 OK`

### Content examples


```json
[
  {
    "uuid": "8cefae7e-7f81-11ea-b1ba-22000ab3a3ba",
    "name": "12 grains sliced bread",
    "brand": "Dempster's",
    "url": "https://www.metro.ca/en/online-grocery/aisles/bread-bakery-products/packaged-bread/whole-wheat-grain/12-grains-sliced-bread/p/068721722342",
    "main_category": "bread-bakery-products",
    "sub_category": "packaged-bread",
    "weight": "600 g",
    "barcode": 68721722342,
    "image": "https://product-images.metro.ca/images/h92/hfe/9398179430430.jpg",
    "unit": "ea.",
    "regular_price": "3.79",
    "sale_price": "2/5.00"
  },
  {
    ...
  },
  ...
]
```

### Error Response

**Code** : `403 FORBIDDEN`

### Content examples


```json
{
    "error": "You must be authorized to view this."
}
```
---

## AUTHORIZATION

---

### LOGIN

Login with a user to retrieve a JWT.

**URL** : `/login`

**Method** : `POST`

**Auth required** : NO

### Success Response

**Code** : `200 OK`

### Content examples


```json
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRkZEBkZGQuY29tIiwidXVpZCI6IjllMmM0NzA2LTgzMzctMTFlYS04Zjg2LTIyMDAwYTg4ODhjOCJ9.4SHOvwJA-CwhWSlH59lsRks9ywOwKJhVyt2_RRjaj8EyJw"
}
```

### Error Response

**Code** : `403 FORBIDDEN`

### Content examples


```json
{
    "error": "No such user exists"
}
```

