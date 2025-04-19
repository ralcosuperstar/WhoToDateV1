import express, { Express } from 'express';
import { supabaseStorage } from './supabaseStorage';
import dotenv from 'dotenv';
import { pool, db } from './db';
import { sql } from 'drizzle-orm';

// Load environment variables
dotenv.config();

console.log('✅ Starting API test server...');

// Create a dedicated API test server without Vite
const app = express();
app.use(express.json());

// Simple health check endpoint
app.get('/health', (req, res) => {
  console.log('🩺 Health check endpoint hit');
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Direct Postgres connection test
app.get('/db-postgres-test', async (req, res) => {
  try {
    console.log("🧪 Testing direct Postgres connection...");
    
    // Try a simple query using the direct pool connection
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT current_timestamp as time');
      console.log("✅ Postgres connection successful:", result.rows[0]);
      
      return res.json({
        success: true, 
        message: "Direct Postgres connection successful",
        data: result.rows[0]
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("❌ Error in postgres test:", error);
    return res.status(500).json({
      success: false,
      message: "Postgres connection test failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Drizzle ORM test
app.get('/db-drizzle-test', async (req, res) => {
  try {
    console.log("🧪 Testing Drizzle ORM query...");
    
    // Try a simple query using Drizzle
    const result = await db.execute(sql`SELECT current_timestamp as time`);
    console.log("✅ Drizzle query successful:", result);
    
    return res.json({
      success: true,
      message: "Drizzle ORM query successful",
      data: result
    });
  } catch (error) {
    console.error("❌ Error in Drizzle test:", error);
    return res.status(500).json({
      success: false,
      message: "Drizzle ORM query failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Test database connection with minimal query
app.get('/db-test/simple', async (req, res) => {
  try {
    console.log("🧪 Running very simple DB test");
    
    if (!supabaseStorage.client) {
      return res.status(500).json({
        success: false,
        message: "Supabase client not initialized",
        error: "No database client available"
      });
    }
    
    // Execute a very simple query with no joins or complex logic
    const { data, error } = await supabaseStorage.client
      .from('users')
      .select('id') // Just select id to minimize issues
      .limit(1);
      
    if (error) {
      console.error("❌ Error in simple query:", error);
      return res.status(500).json({
        success: false,
        message: "Simple database query failed",
        error: error.message
      });
    }
    
    return res.json({
      success: true,
      message: "Simple database query succeeded",
      count: data ? data.length : 0
    });
  } catch (error) {
    console.error("❌ Error in simple DB test:", error);
    return res.status(500).json({
      success: false,
      message: "Simple database test failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Check current database tables
app.get('/db-list-tables', async (req, res) => {
  try {
    console.log("🧪 Listing database tables...");
    
    const client = await pool.connect();
    try {
      const result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      
      console.log("✅ Tables list successful:", result.rows);
      
      return res.json({
        success: true,
        message: `Found ${result.rowCount} tables`,
        tables: result.rows.map(row => row.table_name)
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("❌ Error listing tables:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to list database tables",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Test endpoint to check session store
app.get('/session-test', async (req, res) => {
  try {
    console.log("🧪 Testing session store...");
    
    // Just report success if we got here - this confirms the session store is at least initialized
    res.json({
      success: true,
      message: "Session store initialized successfully",
      storeType: supabaseStorage.sessionStore.constructor.name
    });
  } catch (error) {
    console.error("❌ Error testing session store:", error);
    res.status(500).json({
      success: false,
      message: "Session store test failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Export the app for testing
export { app };

// Start the server if this file is run directly
// In ESM, we need to check import.meta.url against process.argv[1]
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = 4000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log("✅ API test server running on port " + PORT);
  });
}