// Script to apply schema changes directly to Supabase
// This script uses the SUPABASE_URL and SUPABASE_SERVICE_KEY to connect 
// and applies SQL commands from the update_supabase_schema.sql file

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const sqlFilePath = path.join(process.cwd(), 'update_supabase_schema.sql');

// Validate required environment variables
if (!supabaseUrl) {
  console.error('SUPABASE_URL environment variable is required');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('SUPABASE_SERVICE_KEY environment variable is required');
  process.exit(1);
}

// Initialize Supabase client
console.log('Initializing Supabase client...');
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Read SQL file
console.log(`Reading SQL file: ${sqlFilePath}`);
const sql = fs.readFileSync(sqlFilePath, 'utf8');

// Split SQL into individual statements
const statements = sql.split(';')
  .map(statement => statement.trim())
  .filter(statement => statement.length > 0);

// Execute SQL statements one by one
async function executeStatements() {
  console.log(`Found ${statements.length} SQL statements to execute`);
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    console.log(`\nExecuting statement ${i + 1} of ${statements.length}:`);
    console.log(statement.substring(0, 100) + (statement.length > 100 ? '...' : ''));
    
    try {
      // Execute each SQL statement using Supabase's rpc function
      // We're using a special stored procedure that runs arbitrary SQL
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: statement + ';'
      });
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
        // Continue to the next statement even if this one fails
      } else {
        console.log(`Statement ${i + 1} executed successfully`);
      }
    } catch (error) {
      console.error(`Exception executing statement ${i + 1}:`, error.message);
      // Try using REST SQL endpoint if RPC fails
      try {
        const { data, error } = await supabase
          .from('_sql')
          .select('*')
          .eq('query', statement + ';')
          .single();
          
        if (error) {
          console.error(`Error executing statement ${i + 1} via REST:`, error);
        } else {
          console.log(`Statement ${i + 1} executed successfully via REST`);
        }
      } catch (restError) {
        console.error(`Failed to execute via both methods:`, restError.message);
      }
    }
  }
  
  console.log('\nSQL execution completed');
}

// Execute the statements
executeStatements()
  .then(() => {
    console.log('Schema update process completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error in schema update process:', error);
    process.exit(1);
  });