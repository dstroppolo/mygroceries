package middleware

import (
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

/*Authorize a user's JWT*/
func Authorize(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var bearer = r.Header.Get("Authorization")

		json.NewEncoder(w).Encode(r)
		bearer = strings.TrimSpace(bearer)

		if bearer != "" {

			secretKey := os.Getenv("SECRET_KEY")

			token, tokenError := jwt.Parse(bearer, func(token *jwt.Token) (interface{}, error) {
				return []byte(secretKey), nil
			})

			if tokenError != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusForbidden)
				w.Write([]byte("{\"error\":\"You must be authorized to view this.\"}"))
				return
			}

			if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				//everything is ok
				next.ServeHTTP(w, r)
			} else {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusForbidden)
				w.Write([]byte("{\"error\":\"You must be authorized to view this.\"}"))
				return
			}
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusForbidden)
			w.Write([]byte("{\"error\":\"You must be authorized to view this.\"}"))
			return
		}
	})
}
