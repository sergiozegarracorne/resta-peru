package controllers

import (
	"go-login/models"
	"net/http"
	"time"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// POST /login
func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	user, hash, err := models.GetUserByEmail(input.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario o contraseña incorrectos"})
		return
	}

	// Verificar contraseña
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario o contraseña incorrectos"})
		return
	}

	// Crear token de sesión
	token := uuid.New().String()
	expires := time.Now().Add(2 * time.Hour) // duración 2h
	err = models.CreateSession(user.ID, token, expires)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear la sesión"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}


// GET /holaMundo
func HolaMundo(c *gin.Context) {
	// Texto que quieres hashear (por ejemplo "123456")
	password := "123456"

	// Generar hash bcrypt
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "No se pudo generar el hash"})
		return
	}

	fmt.Println("🔐 Hash generado:", string(hash))

	// Devolver JSON con hash y mensaje
	c.JSON(200, gin.H{
		"mensaje": "Hola Mundo desde Go + Gin",
		"hash":    string(hash),
		"time":    time.Now().Format("2006-01-02 15:04:05"),
	})
}

// GET /me  → verificar sesión y devolver info
func Me(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token requerido"})
		return
	}

	userID, valid := models.ValidateSession(token)
	if !valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesión no válida o expirada"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sesión válida", "user_id": userID})
}

// POST /logout
func Logout(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token requerido"})
		return
	}

	err := models.DeleteSession(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo cerrar sesión"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sesión cerrada"})
}
