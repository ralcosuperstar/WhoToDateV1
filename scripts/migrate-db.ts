import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { db, pool } from '../server/db';
import * as schema from '../shared/schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Starting database schema synchronization...');

// Auto-migration function that creates or updates tables based on schema
async function migrateSchema() {
  try {
    console.log('Pushing schema to database...');
    
    // Create tables if they don't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT NOT NULL UNIQUE,
        phone_number TEXT UNIQUE,
        first_name TEXT,
        last_name TEXT,
        full_name TEXT,
        date_of_birth TEXT,
        gender TEXT,
        image_url TEXT,
        is_verified BOOLEAN DEFAULT FALSE,
        verification_method TEXT,
        verification_token TEXT,
        verification_token_expiry TIMESTAMPTZ,
        otp_code TEXT,
        otp_expiry TIMESTAMPTZ,
        clerk_id TEXT UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS quiz_answers (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        answers JSONB NOT NULL DEFAULT '{}',
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        quiz_id INTEGER,
        compatibility_profile JSONB NOT NULL DEFAULT '{}',
        is_paid BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        report_id INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        currency TEXT DEFAULT 'INR',
        payment_method TEXT,
        transaction_id TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        summary TEXT,
        author TEXT,
        image_url TEXT,
        category TEXT,
        published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log('Schema migration completed successfully!');
  } catch (error) {
    console.error('Schema migration failed:', error);
    throw error;
  }
}

// Execute the migration
migrateSchema()
  .then(() => {
    console.log('Database setup completed');
    pool.end();
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    pool.end();
    process.exit(1);
  });