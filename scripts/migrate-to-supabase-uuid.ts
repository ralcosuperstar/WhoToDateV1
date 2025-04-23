// Script to migrate database schema to use Supabase UUIDs

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import * as schema from '../shared/schema';

// Load environment variables
dotenv.config();

async function migrate() {
  try {
    console.log('Starting migration to Supabase UUID...');

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables must be set');
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Read and execute the migration SQL file
    const sqlPath = path.join(__dirname, '../sql/supabase_uuid_migration.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing SQL migration in Supabase...');
    
    // Split by semicolon to execute multiple statements
    const statements = sql.split(';').filter(s => s.trim());
    
    for(const statement of statements) {
      if (statement.trim()) {
        // Use Supabase's SQL execution capabilities
        const { error } = await supabase.rpc('pg_query', { query: statement });
        
        if (error) {
          throw new Error(`Error executing statement: ${error.message}`);
        }
        
        console.log('Executed statement successfully');
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrate();