package api

import (
	"encoding/json"
	"managers"
	"net/http"
	"structs"
)

/*Login checks if a member is logged in and returns a token if they are*/
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var m structs.Member
	json.NewDecoder(r.Body).Decode(&m)
	jwt, loginError := managers.Login(m.Email, m.Password)

	var jsonString string

	if loginError != nil {
		jsonString = "{\"error\": \"No such user exists\"}"
	} else {
		jsonString = "{\"jwt\": \"" + jwt + "\"}"
	}

	w.Write([]byte(jsonString))

}
