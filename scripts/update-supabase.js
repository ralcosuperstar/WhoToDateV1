// CommonJS version of the direct database update script
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get database connection details
const databaseUrl = process.env.DATABASE_URL;

// Output environment details (not showing sensitive data)
console.log('Environment variables loaded:');
console.log('- DATABASE_URL:', databaseUrl ? 'Available' : 'Not available');
console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? 'Available' : 'Not available');
console.log('- PGHOST:', process.env.PGHOST ? 'Available' : 'Not available');
console.log('- PGPORT:', process.env.PGPORT ? 'Available' : 'Not available');
console.log('- PGUSER:', process.env.PGUSER ? 'Available' : 'Not available');
console.log('- PGDATABASE:', process.env.PGDATABASE ? 'Available' : 'Not available');
console.log('- PGPASSWORD:', process.env.PGPASSWORD ? 'Available (hidden)' : 'Not available');

// Direct connection using DATABASE_URL
async function directConnect() {
  console.log('\nAttempting direct database connection using connection string...');
  
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
    
    if (!fs.existsSync(sqlFilePath)) {
      console.error(`SQL file not found: ${sqlFilePath}`);
      return false;
    }
    
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
}

// Connection using individual PostgreSQL parameters
async function componentConnect() {
  console.log('\nAttempting database connection using component parameters...');
  
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
    
    if (!fs.existsSync(sqlFilePath)) {
      console.error(`SQL file not found: ${sqlFilePath}`);
      return false;
    }
    
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
}

// Run both connection methods
async function main() {
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
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});