// CommonJS script to update schema using session pooler
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Connection parameters for session pooler (IPv4)
const host = 'aws-0-ap-south-1.pooler.supabase.com';
const port = 5432;
const database = 'postgres';
const user = 'postgres.truulijpablpqxipindo';
const password = process.env.SUPABASE_DB_PASSWORD;

if (!password) {
  console.error('SUPABASE_DB_PASSWORD environment variable is required');
  process.exit(1);
}

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

// SQL to add updated_at column to users table
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
`;

// Function to execute the SQL
async function updateSchema() {
  console.log('Connecting to Supabase database via session pooler...');
  
  try {
    // Test the connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('Connected successfully. Database time:', testResult.rows[0].current_time);
    
    // Check if users table has updated_at column
    console.log('Checking if users table has updated_at column...');
    
    const columnCheckQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'updated_at'
    `;
    
    const columnResult = await pool.query(columnCheckQuery);
    
    if (columnResult.rows.length > 0) {
      console.log('updated_at column already exists in users table');
    } else {
      console.log('updated_at column does not exist in users table, adding it...');
      
      // Execute the SQL to add the column and trigger
      await pool.query(sql);
      console.log('Successfully added updated_at column and trigger to users table');
      
      // Verify it was added
      const verifyResult = await pool.query(columnCheckQuery);
      
      if (verifyResult.rows.length > 0) {
        console.log('Verified: updated_at column now exists in users table');
      } else {
        console.log('Warning: updated_at column was not found after adding it');
      }
    }
    
    // Check if triggers are set up correctly
    console.log('\nChecking database triggers...');
    
    const triggerQuery = `
      SELECT trigger_name
      FROM information_schema.triggers
      WHERE event_object_table = 'users'
    `;
    
    const triggerResult = await pool.query(triggerQuery);
    
    if (triggerResult.rows.length > 0) {
      console.log('Triggers found on users table:');
      triggerResult.rows.forEach(row => {
        console.log(`- ${row.trigger_name}`);
      });
    } else {
      console.log('No triggers found on users table');
    }
    
    // Close the database connection
    await pool.end();
    console.log('\nDatabase connection closed');
    
    return true;
  } catch (error) {
    console.error('Error:', error.message);
    
    // Close the connection pool on error
    try {
      await pool.end();
      console.log('Database connection closed after error');
    } catch (closeError) {
      console.error('Error closing database connection:', closeError.message);
    }
    
    return false;
  }
}

// Execute the function
updateSchema()
  .then(success => {
    console.log('Schema update process completed with result:', success ? 'SUCCESS' : 'FAILURE');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });