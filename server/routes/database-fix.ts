/**
 * Database fix routes
 * Server endpoints for fixing database schema issues
 */
import express, { Router, Request, Response } from 'express';
import { log } from '../vite';
import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

export const setupDatabaseFixRoutes = (app: express.Application, router: Router) => {
  console.log('Setting up database fix routes...');
  
  // GET endpoint to check if updated_at column exists
  router.get('/check-updated-at', async (req: Request, res: Response) => {
    try {
      // Get database connection
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      
      // Check if the column exists
      const result = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'updated_at'
      `);
      
      // Return result
      res.json({
        success: true,
        hasUpdatedAt: result.rows.length > 0,
        columnDetails: result.rows[0] || null
      });
      
      // Close the pool
      await pool.end();
    } catch (error) {
      console.error('Error checking for updated_at column:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // POST endpoint to add updated_at column
  router.post('/add-updated-at', async (req: Request, res: Response) => {
    try {
      // Get database connection
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      
      // SQL to add the column if it doesn't exist
      const addColumnSQL = `
        DO $$
        BEGIN
            -- Check if the updated_at column exists
            IF NOT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'users'
                AND column_name = 'updated_at'
            ) THEN
                -- Add the updated_at column with a default value of current timestamp
                EXECUTE 'ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()';
                
                -- Add a trigger to automatically update the updated_at column
                EXECUTE '
                CREATE OR REPLACE FUNCTION update_modified_column()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = NOW();
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
                ';
                
                EXECUTE '
                CREATE TRIGGER update_users_updated_at
                BEFORE UPDATE ON users
                FOR EACH ROW
                EXECUTE FUNCTION update_modified_column();
                ';
                
                RAISE NOTICE 'Successfully added updated_at column to users table with auto-update trigger';
            ELSE
                RAISE NOTICE 'The updated_at column already exists in the users table';
            END IF;
        END
        $$;
      `;
      
      // Execute SQL
      await pool.query(addColumnSQL);
      
      // Verify it was added
      const verifyResult = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'updated_at'
      `);
      
      // Close the pool
      await pool.end();
      
      // Return success
      res.json({
        success: true,
        columnAdded: verifyResult.rows.length > 0,
        columnDetails: verifyResult.rows[0] || null,
        message: verifyResult.rows.length > 0 
          ? 'Successfully added or confirmed updated_at column in users table' 
          : 'Failed to add updated_at column to users table'
      });
    } catch (error) {
      console.error('Error adding updated_at column:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
};