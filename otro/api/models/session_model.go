package models

import (
	"go-login/config"
	"time"
)

type Session struct {
	Token     string
	UserID    int
	ExpiresAt time.Time
}

// Crear nueva sesión
func CreateSession(userID int, token string, expires time.Time) error {
	_, err := config.DB.Exec(
		"INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
		userID, token, expires,
	)
	return err
}

// Validar sesión por token
func ValidateSession(token string) (int, bool) {
	var userID int
	var expires time.Time
	err := config.DB.QueryRow(
		"SELECT user_id, expires_at FROM sessions WHERE token = ?", token,
	).Scan(&userID, &expires)

	if err != nil {
		return 0, false
	}
	if time.Now().After(expires) {
		return 0, false
	}
	return userID, true
}

// Eliminar sesión (logout)
func DeleteSession(token string) error {
	_, err := config.DB.Exec("DELETE FROM sessions WHERE token = ?", token)
	return err
}
