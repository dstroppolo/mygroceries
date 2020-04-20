package managers

import (
	"errors"
	"fmt"
	"gateway"
	"os"
	"structs"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func Login(email string, password string) (string, error) {
	db, err := gateway.Connect()
	defer db.Close()

	if err != nil {
		fmt.Println("Error connecting to database: " + err.Error())
	}

	stmt := "SELECT email, password, uuid FROM users WHERE email='" + email + "'"
	res := db.QueryRow(stmt)
	if err != nil {
		//TODO return error
	}
	m := structs.CreateMemberFromQuery(res)

	errf := bcrypt.CompareHashAndPassword([]byte(m.Password), []byte(password))

	if errf != nil && errf == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
		return "", errors.New("No such user")
	} else {

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"email": m.Email,
			"uuid":  m.UUID,
		})

		secretKey := os.Getenv("SECRET_KEY")
		tokenString, err := token.SignedString([]byte(secretKey))
		return tokenString, err
	}

}
