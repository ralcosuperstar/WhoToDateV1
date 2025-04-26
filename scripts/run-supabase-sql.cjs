// Direct SQL runner for Supabase Database
// This script uses the CommonJS format to avoid ESM issues
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Pull in database connection info from environment variables
const host = 'db.truulijpablpqxipindo.supabase.co';
const port = 5432;
const database = 'postgres';
const user = 'postgres';
const password = process.env.SUPABASE_DB_PASSWORD;

// Create a connection pool
const pool = new Pool({
  host,
  port,
  database,
  user,
  password,
  ssl: {
    rejectUnauthorized: false
  }
});

// SQL to add updated_at column to tables
const sql = `
-- Add updated_at column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger function to automatically update the timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_users_timestamp ON users;
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add updated_at column to quiz_answers table if it doesn't exist
ALTER TABLE quiz_answers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_quiz_answers_timestamp ON quiz_answers;
CREATE TRIGGER update_quiz_answers_timestamp
BEFORE UPDATE ON quiz_answers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Add updated_at column to reports table if it doesn't exist
ALTER TABLE reports ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_reports_timestamp ON reports;
CREATE TRIGGER update_reports_timestamp
BEFORE UPDATE ON reports
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
`;

// Function to run SQL statements
async function runSQL() {
  console.log('Connecting to Supabase database...');
  
  try {
    // Test the connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('Connected successfully. Database time:', testResult.rows[0].current_time);
    
    // Split SQL into individual statements
    const statements = sql.split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      process.stdout.write(`Executing statement ${i + 1}/${statements.length}... `);
      
      try {
        await pool.query(statement);
        console.log('Success!');
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log('Already exists, skipping.');
        } else {
          console.error('Failed!');
          console.error(`Error: ${error.message}`);
        }
      }
    }
    
    console.log('All SQL statements executed');
    
    // Check if updated_at column exists in users table
    const checkResult = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'updated_at'
    `);
    
    if (checkResult.rows.length > 0) {
      console.log('Verified: updated_at column exists in users table');
    } else {
      console.log('Warning: updated_at column was not found in users table');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Close the connection pool
    await pool.end();
    console.log('Database connection closed');
  }
}

// Run the SQL
runSQL().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});