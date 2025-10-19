package models

import (
	"go-login/config"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// Buscar usuario por email
func GetUserByEmail(email string) (User, string, error) {
	var u User
	var passwordHash string
	err := config.DB.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", email).
		Scan(&u.ID, &u.Name, &u.Email, &passwordHash)
	return u, passwordHash, err
}
