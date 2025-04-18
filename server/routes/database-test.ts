import { type Express } from "express";
import { supabaseStorage } from "../supabaseStorage";
import { dbStorage } from "../dbStorage";
import * as crypto from "crypto";

// Test routes for database functionality
export function setupDatabaseTestRoutes(app: Express) {
  // Endpoint to test the database connection
  app.get('/api/db-test', async (req, res) => {
    try {
      // Get both implementations for comparison
      const supabaseUsers = await supabaseStorage.getAllUsers();
      const drizzleUsers = await dbStorage.getAllUsers();
      
      res.json({
        success: true,
        message: "Database connection successful",
        storage: {
          type: "supabase",
          userCount: supabaseUsers.length
        },
        drizzle: {
          userCount: drizzleUsers.length
        },
        test: "getFirstBlogPost",
        testResult: await testGetFirstBlogPost()
      });
    } catch (error) {
      console.error("Database test failed:", error);
      res.status(500).json({
        success: false,
        message: "Database test failed",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Endpoint to create a test user
  app.post('/api/db-test/user', async (req, res) => {
    try {
      // Generate a test email to avoid conflicts
      const timestamp = new Date().getTime();
      const testEmail = `test-user-${timestamp}@example.com`;
      
      // Create a test user with the Supabase storage
      const user = await supabaseStorage.createUser({
        id: crypto.randomUUID(), // Add UUID for the user
        email: testEmail,
        firstName: "Test",
        lastName: "User",
        phoneNumber: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      });
      
      res.json({
        success: true,
        message: "Test user created successfully",
        user
      });
    } catch (error) {
      console.error("Creating test user failed:", error);
      res.status(500).json({
        success: false,
        message: "Creating test user failed",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Endpoint to create a test blog post
  app.post('/api/db-test/blog', async (req, res) => {
    try {
      // Generate a test slug to avoid conflicts
      const timestamp = new Date().getTime();
      const testSlug = `test-post-${timestamp}`;
      
      // Create a test blog post with the Supabase storage
      const blogPost = await supabaseStorage.createBlogPost({
        title: "Test Blog Post",
        slug: testSlug,
        content: "This is a test blog post content.",
        summary: "This is a test blog post summary.",
        author: "Test Author",
        category: "Test"
      });
      
      res.json({
        success: true,
        message: "Test blog post created successfully",
        blogPost
      });
    } catch (error) {
      console.error("Creating test blog post failed:", error);
      res.status(500).json({
        success: false,
        message: "Creating test blog post failed",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
}

// Test function to get the first blog post
async function testGetFirstBlogPost() {
  try {
    const blogPosts = await supabaseStorage.getAllBlogPosts();
    if (blogPosts.length > 0) {
      return {
        success: true,
        firstPost: {
          title: blogPosts[0].title,
          slug: blogPosts[0].slug
        }
      };
    } else {
      return {
        success: false,
        message: "No blog posts found"
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}