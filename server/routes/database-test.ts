import { Express, Request, Response, Router } from "express";
import { db } from "../db";
import { users, blogPosts } from "@shared/schema";
import { count } from "drizzle-orm";

export function setupDatabaseTestRoutes(app: Express, router: Router) {
  // Database connection test endpoint
  router.get("/db-health", async (req: Request, res: Response) => {
    try {
      // Execute a simple query to check database connection
      const result = await db.execute(
        "SELECT now() as current_time"
      );
      
      // Handle the result safely
      const current_time = result instanceof Array && result.length > 0 ? 
        (result[0] as any)?.current_time : new Date();
      
      res.json({
        status: "ok",
        connection: true,
        time: current_time,
        message: "Database connection successful"
      });
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({
        status: "error",
        connection: false,
        message: error instanceof Error ? error.message : "Unknown database error"
      });
    }
  });

  // Test endpoint to get blog posts (public, no auth required)
  router.get("/test-blog-posts", async (req: Request, res: Response) => {
    try {
      const posts = await db.select().from(blogPosts).limit(5);
      res.json({
        success: true,
        count: posts.length,
        posts
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Test endpoint to get users count (public, no auth required)
  router.get("/test-users-count", async (req: Request, res: Response) => {
    try {
      const usersCount = await db.select({ count: count() }).from(users);
      res.json({
        success: true,
        count: usersCount[0]?.count || 0
      });
    } catch (error) {
      console.error("Error counting users:", error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
}