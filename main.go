package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Product struct {
	Name  string `json:"name"`
	Price string `json:"price"`
}

var products []Product

func init() {
	products = append(products, Product{
		Name:  "A本",
		Price: "3000",
	})
	products = append(products, Product{
		Name:  "B本",
		Price: "1000",
	})
	products = append(products, Product{
		Name:  "C本",
		Price: "2000",
	})
}

func main() {
	r := gin.Default()

	// static file setting
	r.Static("/js", "./public/js")

	r.LoadHTMLGlob("view/*")

	// routing
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	r.GET("/api/products", func(c *gin.Context) {
		c.JSON(http.StatusOK, products)
	})
	r.POST("/api/products", func(c *gin.Context) {
		var payload Product
		err := c.BindJSON(&payload)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		products = append(products, payload)
		c.AbortWithStatus(http.StatusCreated)
	})

	r.Run(":4000")
}
