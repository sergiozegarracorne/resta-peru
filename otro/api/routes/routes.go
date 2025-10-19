package routes

import (
	"go-login/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// 🌐 Middleware CORS global
	r.Use(cors.Default())

	r.GET("/", controllers.HolaMundo)
	r.POST("/login", controllers.Login)
	r.GET("/me", controllers.Me)
	r.POST("/logout", controllers.Logout)

	r.POST("/auth/login", controllers.Login)

	return r
}
