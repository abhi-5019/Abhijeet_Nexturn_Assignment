package main

import (
	"assignment_blog_system/config"
	"assignment_blog_system/handlers"
	"assignment_blog_system/middlewares"
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()

	r := gin.Default()
	r.Use(middlewares.LogRequest)
	r.POST("/blog", handlers.CreateBlog)
	r.GET("/blog/:id", handlers.GetBlog)
	r.GET("/blogs", handlers.GetBlogs)
	r.PUT("/blog/:id", handlers.UpdateBlog)
	r.DELETE("/blog/:id", handlers.DeleteBlog)
	fmt.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
