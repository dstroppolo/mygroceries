package structs

import (
	"database/sql"
	"fmt"
)

/*Member is a member*/
type Member struct {
	UUID     string `json:"uuid"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

/*CreateMemberFromQuery will return a Category from an sql query*/
func CreateMemberFromQuery(row *sql.Row) Member {
	m := Member{}
	err := row.Scan(&m.Email, &m.Password, &m.UUID)
	if err != nil {
		fmt.Println(err.Error())
	}
	return m
}
