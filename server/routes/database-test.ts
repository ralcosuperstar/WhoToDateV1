import { type Express } from "express";
import { supabaseStorage } from "../supabaseStorage";
import { dbStorage } from "../dbStorage";
import * as crypto from "crypto";
import { InsertUser } from "@shared/schema";
// Database schema information for testing
const COLUMN_MAP = {
  users: ['id', 'username', 'password', 'email', 'phone_number', 'first_name', 'last_name', 'full_name', 'date_of_birth', 'gender', 'image_url', 'is_verified', 'verification_method', 'verification_token', 'verification_token_expiry', 'otp_code', 'otp_expiry', 'clerk_id', 'created_at'],
  blog_posts: ['id', 'title', 'slug', 'content', 'excerpt', 'image_url', 'category', 'published_at'],
  reports: ['id', 'user_id', 'quiz_id', 'report', 'is_paid', 'compatibility_color', 'created_at'],
  payments: ['id', 'user_id', 'report_id', 'amount', 'razorpay_payment_id', 'status', 'created_at'],
  quiz_answers: ['id', 'user_id', 'answers', 'completed', 'started_at', 'completed_at']
};

// Test routes for database functionality
export function setupDatabaseTestRoutes(app: Express) {
  // Endpoint to test the database connection
  app.get('/api/db-test', async (req, res) => {
    try {
      console.log("🧪 Testing direct database connection...");
      
      // Log the location before and after each step to track where error occurs
      console.log("🐛 Step 1: Starting database test");
      
      // DIRECT APPROACH: Skip ORM layers, use RPC call to avoid updated_at issues
      console.log("🔄 Testing connection with safer stored procedure");
      
      if (!supabaseStorage.client) {
        return res.status(500).json({
          success: false,
          message: "Supabase client not initialized",
          error: "No database client available"
        });
      }
      
      console.log("🐛 Step 2: Client initialized, preparing to run queries");
      
      // SKIP THE PROBLEMATIC QUERIES
      // Log Supabase URL and the fact we're using a valid token (don't log the actual token)
      console.log("🔧 Using Supabase URL:", process.env.SUPABASE_URL);
      console.log("🔧 Authentication:", process.env.SUPABASE_SERVICE_KEY ? "Using valid service key" : "No service key available");
      
      // Try our safer stored procedure
      try {
        console.log("🔄 Trying test_db_connection stored procedure");
        const procResult = await supabaseStorage.client.rpc('test_db_connection');
        
        if (procResult.error) {
          console.error("🔴 Stored procedure call failed:", procResult.error);
          throw procResult.error;
        }
        
        console.log("🟢 Stored procedure call successful");
        return res.json({
          success: true,
          message: "Database connection successful with stored procedure",
          method: "stored-procedure",
          tables: procResult.data
        });
      } catch (procError) {
        console.error("🔴 Stored procedure error:", procError);
      }
      
      // If all direct attempts failed, throw a general error
      throw new Error("All database connection attempts failed");
      
    } catch (error) {
      console.error("⚠️ All database tests failed:", error);
      
      // Log more details for debugging
      if (error && typeof error === 'object') {
        try {
          console.error('Error details:', JSON.stringify(error, null, 2));
        } catch (e) {
          console.error('Could not stringify error:', Object.keys(error));
        }
      }
      
      res.status(500).json({
        success: false,
        message: "Database connection test failed",
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
        phone_number: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Using direct field name
        first_name: "Test", // Using snake_case fields directly
        last_name: "User",
        full_name: "Test User",
        is_verified: false,
        verification_method: "email"
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
      
      // Create a test blog post using direct Supabase query
      const result = await supabaseStorage.client?.from('blog_posts').insert([{
        title: "Test Blog Post",
        slug: testSlug,
        content: "This is a test blog post content.",
        excerpt: "This is a test blog post excerpt.",
        category: "Test",
        image_url: "https://example.com/placeholder.jpg",
        published_at: new Date().toISOString()
      }]).select();
      
      if (result?.error) {
        throw new Error(`Failed to create blog post: ${result.error.message}`);
      }
      
      res.json({
        success: true,
        message: "Test blog post created successfully",
        blogPost: result?.data?.[0] || null
      });
    } catch (error) {
      console.error("Creating test blog post failed:", error);
      
      // Log error details
      if (error && typeof error === 'object') {
        try {
          console.error(JSON.stringify(error, null, 2));
        } catch (e) {
          console.error('Could not stringify error:', e);
          console.error(Object.keys(error));
        }
      }
      
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
    console.log("🧪 Testing direct query for blog posts with specific fields");
    
    // Use only the columns we know exist in the database from our COLUMN_MAP
    const selectColumns = COLUMN_MAP.blog_posts.join(', ');
    console.log(`Selecting columns: ${selectColumns}`);
    
    // Run a direct query with our safe column list
    const result = await supabaseStorage.client?.from('blog_posts')
      .select(selectColumns)
      .limit(1);
    
    if (result?.error) {
      console.error("🔴 Direct query failed:", result.error);
      return {
        success: false,
        message: "Direct query failed",
        error: result.error.message
      };
    }
    
    if (result?.data && result.data.length > 0) {
      const post = result.data[0];
      console.log("🟢 Direct query successful:", post);
      return {
        success: true,
        message: "Direct query successful",
        firstPost: {
          id: post.id,
          title: post.title,
          slug: post.slug
        }
      };
    } else {
      console.log("🟡 Direct query successful, but no blog posts found");
      // Try to create a simple test post
      try {
        console.log("🧪 Attempting to create a test blog post");
        
        // Create insert object with only valid columns
        const insertData = {
          title: "Test Blog Post",
          slug: `test-post-${Date.now()}`,
          content: "This is a test blog post content.",
          excerpt: "This is a test blog post excerpt.",
          category: "Test",
          published_at: new Date().toISOString()
        };
        
        const insertResult = await supabaseStorage.client?.from('blog_posts')
          .insert([insertData])
          .select('id, title, slug');
        
        if (insertResult?.error) {
          console.error("🔴 Failed to create test blog post:", insertResult.error);
          return {
            success: false,
            message: "Failed to create test blog post",
            error: insertResult.error.message
          };
        }
        
        if (insertResult?.data && insertResult.data.length > 0) {
          console.log("🟢 Test blog post created successfully:", insertResult.data[0]);
          return {
            success: true,
            message: "Test blog post created successfully",
            firstPost: insertResult.data[0]
          };
        }
      } catch (insertError) {
        console.error("🔴 Error creating test blog post:", insertError);
      }
      
      return {
        success: false,
        message: "No blog posts found in direct query"
      };
    }
  } catch (error) {
    console.error("🔴 Unexpected error in testGetFirstBlogPost:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}