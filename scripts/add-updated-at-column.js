/**
 * Script to add the missing updated_at column to the users table
 * This ensures compatibility with code that expects this column to exist
 */

import fs from 'fs';
import path from 'path';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ws from 'ws';
import { dirname } from 'path';

// Initialize dotenv
dotenv.config();

// Set up WebSocket for Neon database
neonConfig.webSocketConstructor = ws;

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function addUpdatedAtColumn() {
  console.log('🔧 Starting script to add updated_at column to users table...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }
  
  // Create a connection pool using the DATABASE_URL from environment
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  
  try {
    console.log('📊 Connected to PostgreSQL database');
    
    // Read the SQL script file
    const sqlFilePath = path.join(__dirname, '..', 'sql', 'add_updated_at_column.sql');
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('📄 SQL script loaded, executing query...');
    
    // Execute the SQL script
    const result = await pool.query(sqlQuery);
    
    console.log('✅ SQL script executed successfully!');
    console.log('📋 Result:', result.rows);
    
    // Now verify the column exists
    const verifyResult = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name = 'updated_at'
    `);
    
    if (verifyResult.rows.length > 0) {
      console.log('✅ Verification successful! Column details:', verifyResult.rows[0]);
    } else {
      console.log('❌ Verification failed: updated_at column not found after execution');
    }
    
  } catch (error) {
    console.error('❌ Error executing SQL script:', error);
  } finally {
    // Close the pool
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Run the function
addUpdatedAtColumn()
  .then(() => console.log('✨ Script completed'))
  .catch(err => console.error('❌ Script failed:', err));