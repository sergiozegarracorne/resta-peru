package config

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() {
	dsn := "go:123456@tcp(1.2.1.42:3306)/go?parseTime=true"
	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("❌ Error al abrir conexión:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("❌ Error al conectar a MySQL:", err)
	}

	fmt.Println("✅ Conectado a MySQL correctamente")
}
