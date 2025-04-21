// Script to migrate database schema to use Supabase UUIDs

import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import fs from 'fs';
import path from 'path';
import * as schema from '../shared/schema';

// Configure Neon connection
dotenv.config();
neonConfig.webSocketConstructor = ws;

async function migrate() {
  try {
    console.log('Starting migration to Supabase UUID...');

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle({ client: pool, schema });

    // Read and execute the migration SQL file
    const sqlPath = path.join(__dirname, '../sql/supabase_uuid_migration.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing SQL migration...');
    
    // Split by semicolon to execute multiple statements
    const statements = sql.split(';').filter(s => s.trim());
    
    for(const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
        console.log('Executed statement successfully');
      }
    }

    console.log('Migration completed successfully!');
    
    // Close the connection
    await pool.end();
    
    console.log('Database connection closed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrate();