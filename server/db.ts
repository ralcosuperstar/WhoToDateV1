import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Check for required Supabase environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_KEY must be set for database operations."
  );
}

// Create a Supabase client with the service role key for database operations
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Export for compatibility with existing code
export const db = supabaseAdmin;

// PostgreSQL pool connection using session pooler (for direct queries)
// Only initialize if the database password is available
export let pgPool: Pool | null = null;
export let drizzleDb: ReturnType<typeof drizzle> | null = null;

// Session pooler configuration (IPv4)
const POOLER_HOST = 'aws-0-ap-south-1.pooler.supabase.com';
const POOLER_PORT = 5432;
const POOLER_DATABASE = 'postgres';
const POOLER_USER = 'postgres.truulijpablpqxipindo';

if (process.env.SUPABASE_DB_PASSWORD) {
  try {
    // Initialize the PostgreSQL connection pool
    pgPool = new Pool({
      host: POOLER_HOST,
      port: POOLER_PORT,
      database: POOLER_DATABASE,
      user: POOLER_USER,
      password: process.env.SUPABASE_DB_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      },
      // Enhanced connection pool configuration
      max: 20, // Increased maximum number of clients for better concurrency
      min: 2, // Maintain at least 2 idle connections
      idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 5000, // Connection timeout
      statement_timeout: 10000, // Query timeout (10 seconds)
      query_timeout: 10000 // Query timeout (10 seconds)
    });

    // Initialize Drizzle ORM with the connection pool
    drizzleDb = drizzle(pgPool, { schema });
    
    console.log('✅ PostgreSQL pool initialized with session pooler');
  } catch (error) {
    console.error('❌ Failed to initialize PostgreSQL pool:', error);
  }
} else {
  console.warn('⚠️ SUPABASE_DB_PASSWORD not set, direct PostgreSQL access will be unavailable');
}
