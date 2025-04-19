import { type Express } from "express";
import { supabaseStorage } from "../supabaseStorage";
import { dbStorage } from "../dbStorage";
import * as crypto from "crypto";
import { InsertUser } from "@shared/schema";

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
      
      console.log(`Creating test user with email: ${testEmail}`);
      
      // Prepare the user object to match insertUserSchema
      const newUserData = {
        username: `testuser${timestamp}`,
        password: "TestPassword123",
        email: testEmail,
        phoneNumber: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        firstName: "Test",
        lastName: "User",
        fullName: "Test User",
        isVerified: false,
        verificationMethod: "email"
      };
      
      console.log('User data being sent to Supabase:', JSON.stringify(newUserData, null, 2));
      
      // Create a test user with the Supabase storage
      const user = await supabaseStorage.createUser(newUserData);
      
      console.log('User created successfully:', user);
      
      res.json({
        success: true,
        message: "Test user created successfully",
        user
      });
    } catch (error) {
      console.error("Creating test user failed:", error);
      
      // Log detailed error properties
      if (error && typeof error === 'object') {
        console.error('Error object properties:');
        for (const key in error) {
          try {
            console.error(`- ${key}:`, (error as Record<string, unknown>)[key]);
          } catch (e) {
            console.error(`- ${key}: [Unable to access property]`);
          }
        }
        
        // Check for PostgreSQL error format from Supabase
        if ('code' in error && 'message' in error && 'details' in error) {
          const pgError = error as Record<string, unknown>;
          console.error('PostgreSQL error details:', {
            code: pgError.code,
            message: pgError.message,
            details: pgError.details,
            hint: pgError.hint || '[No hint]'
          });
        }
      }
      
      // Try various methods to stringify the error
      let errorDetails = 'Unknown error';
      try {
        if (error instanceof Error) {
          errorDetails = `${error.name}: ${error.message}`;
          if ('stack' in error) console.error('Stack:', error.stack);
        } else if (error && typeof error === 'object') {
          try {
            errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
          } catch (e) {
            console.error('Failed to stringify error:', e);
            errorDetails = 'Error object could not be serialized';
          }
        } else {
          errorDetails = String(error);
        }
      } catch (e) {
        console.error('Error while processing error object:', e);
      }
      
      // Return the full error details for debugging
      console.log('Final error details to return to client:', errorDetails);
      
      res.status(500).json({
        success: false,
        message: "Creating test user failed",
        error: typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails)
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