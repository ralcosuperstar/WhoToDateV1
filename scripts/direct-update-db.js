// Script to directly update the Supabase database using the connection parameters
// To use this script, run: node scripts/direct-update-db.js

import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the database URL from the SUPABASE_URL environment variable
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const databaseUrl = process.env.DATABASE_URL;

// Option 1: Direct connection string mode
const directConnect = async () => {
  console.log('Attempting direct database connection using connection string...');
  
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set in environment variables');
    return false;
  }

  try {
    // Create a connection pool
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    console.log('Testing connection...');
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful, server time:', res.rows[0].now);
    
    // Load SQL commands
    const sqlFilePath = path.join(process.cwd(), 'update_supabase_schema.sql');
    console.log(`Reading SQL file: ${sqlFilePath}`);
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sql.split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\nExecuting statement ${i + 1} of ${statements.length}:`);
      console.log(statement.substring(0, 100) + (statement.length > 100 ? '...' : ''));
      
      try {
        await pool.query(statement);
        console.log(`Statement ${i + 1} executed successfully`);
      } catch (error) {
        console.error(`Error executing statement ${i + 1}:`, error.message);
        // Continue to next statement
      }
    }
    
    // Close the connection pool
    await pool.end();
    console.log('Pool has ended');
    
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    return false;
  }
};

// Option 2: Component connection parameters mode
const componentConnect = async () => {
  console.log('Attempting database connection using component parameters...');
  
  // Extract connection parameters from environment variables
  const pgHost = process.env.PGHOST;
  const pgPort = process.env.PGPORT;
  const pgUser = process.env.PGUSER;
  const pgPassword = process.env.PGPASSWORD;
  const pgDatabase = process.env.PGDATABASE;
  
  if (!pgHost || !pgPort || !pgUser || !pgPassword || !pgDatabase) {
    console.error('One or more PostgreSQL connection parameters are missing from environment variables');
    console.log('Required: PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE');
    return false;
  }
  
  try {
    // Create a connection pool
    const pool = new Pool({
      host: pgHost,
      port: pgPort,
      user: pgUser,
      password: pgPassword,
      database: pgDatabase,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    console.log('Testing connection...');
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful, server time:', res.rows[0].now);
    
    // Load SQL commands
    const sqlFilePath = path.join(process.cwd(), 'update_supabase_schema.sql');
    console.log(`Reading SQL file: ${sqlFilePath}`);
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sql.split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\nExecuting statement ${i + 1} of ${statements.length}:`);
      console.log(statement.substring(0, 100) + (statement.length > 100 ? '...' : ''));
      
      try {
        await pool.query(statement);
        console.log(`Statement ${i + 1} executed successfully`);
      } catch (error) {
        console.error(`Error executing statement ${i + 1}:`, error.message);
        // Continue to next statement
      }
    }
    
    // Close the connection pool
    await pool.end();
    console.log('Pool has ended');
    
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    return false;
  }
};

// Run both connection methods
const main = async () => {
  console.log('Starting database update process...');
  
  // Try direct connection string first
  let success = await directConnect();
  
  // If direct connection failed, try component parameters
  if (!success) {
    console.log('\nDirect connection failed, trying component parameters...');
    success = await componentConnect();
  }
  
  if (success) {
    console.log('\nDatabase update process completed successfully');
  } else {
    console.error('\nDatabase update process failed');
    process.exit(1);
  }
};

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});