import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure neon for websocket support
neonConfig.webSocketConstructor = ws;

// Database connection setup with fallback handling
let dbPool: Pool | null = null;
let dbClient: any = null;

try {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.warn("⚠️ DATABASE_URL not set. Using in-memory storage fallback.");
  } else {
    console.log("✅ Connecting to PostgreSQL database...");
    dbPool = new Pool({ 
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 5000
    });
    dbClient = drizzle({ client: dbPool, schema });
  }
} catch (error) {
  console.error("❌ Database connection error:", error);
  console.warn("⚠️ Falling back to in-memory storage for development/testing.");
}

// Export for use in other modules
export const pool = dbPool;
export const db = dbClient;
