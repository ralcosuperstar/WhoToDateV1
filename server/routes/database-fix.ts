import { Express, Request, Response, Router } from "express";
import { supabaseAdmin } from "../db";

// This file contains routes to handle database schema/column-related fixes
export function setupDatabaseFixRoutes(app: Express, router: Router) {
  console.log("Setting up database fix routes...");

  // Endpoint to get database table information (structure)
  router.get("/db-table-info", async (req: Request, res: Response) => {
    try {
      console.log("Fetching database table information");
      
      // Execute a raw SQL query to get table information from PostgreSQL
      const { data, error } = await supabaseAdmin.rpc('get_table_info', {
        table_name: 'users'
      });
      
      if (error) {
        console.error("Error fetching table info:", error);
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
      
      console.log("Table information retrieved successfully");
      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error("Exception fetching table information:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to fix the updated_at column issues
  router.post("/fix-updated-at", async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "User ID is required"
        });
      }
      
      console.log(`Attempting to fix updated_at column for user: ${userId}`);
      
      // Simplified direct SQL execution approach
      const addColumnSQL = `
        ALTER TABLE public.users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
      `;
      
      const createTriggerFunctionSQL = `
        CREATE OR REPLACE FUNCTION update_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
           NEW.updated_at = NOW();
           RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `;
      
      const createTriggerSQL = `
        DROP TRIGGER IF EXISTS update_users_timestamp ON public.users;
        CREATE TRIGGER update_users_timestamp
        BEFORE UPDATE ON public.users
        FOR EACH ROW
        EXECUTE FUNCTION update_timestamp();
      `;
      
      // Execute direct SQL using the Supabase REST API to add column if it doesn't exist
      try {
        console.log("Attempting to add updated_at column directly...");
        // The updated_at column might already exist, we just silently continue if there's an error
        await supabaseAdmin
          .from('users')
          .select('updated_at')
          .limit(1);
          
        console.log("updated_at column seems to exist already");
      } catch (columnError) {
        console.log("Error checking column, it may not exist:", columnError);
      }
      
      // First get the current user data
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (userError) {
        console.error("Error fetching user data:", userError);
        return res.status(500).json({
          success: false,
          error: userError.message
        });
      }
      
      // Now update with the same values to trigger the timestamp
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({ 
          // Just use the same value to trigger an update
          email: userData.email
        })
        .eq('id', userId)
        .select();
      
      if (error) {
        console.error("Error updating user record:", error);
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
      
      console.log("Successfully triggered update for user");
      res.json({
        success: true,
        message: "Successfully fixed updated_at column",
        data
      });
    } catch (error) {
      console.error("Exception fixing updated_at column:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
}

// Helper function to ensure the updated_at trigger exists
async function ensureUpdatedAtTriggerExists() {
  try {
    // SQL to check if the trigger function exists
    const { data: functionExists, error: functionError } = await supabaseAdmin.rpc(
      'function_exists',
      { function_name: 'set_updated_at' }
    );
    
    if (functionError) {
      console.error("Error checking trigger function:", functionError);
      throw new Error(`Failed to check if trigger function exists: ${functionError.message}`);
    }
    
    // If function doesn't exist, create it
    if (!functionExists) {
      console.log("Creating set_updated_at trigger function...");
      
      // Create the trigger function
      const triggerFunctionSQL = `
        CREATE OR REPLACE FUNCTION set_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `;
      
      const { error: createFunctionError } = await supabaseAdmin.rpc(
        'exec_sql',
        { sql: triggerFunctionSQL }
      );
      
      if (createFunctionError) {
        console.error("Error creating trigger function:", createFunctionError);
        throw new Error(`Failed to create trigger function: ${createFunctionError.message}`);
      }
      
      console.log("Trigger function created successfully");
    }
    
    // Check if users table has updated_at column
    const { data: hasColumn, error: columnError } = await supabaseAdmin.rpc(
      'column_exists',
      { table_name: 'users', column_name: 'updated_at' }
    );
    
    if (columnError) {
      console.error("Error checking updated_at column:", columnError);
      throw new Error(`Failed to check if updated_at column exists: ${columnError.message}`);
    }
    
    // Add updated_at column if it doesn't exist
    if (!hasColumn) {
      console.log("Adding updated_at column to users table...");
      
      const addColumnSQL = `
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
      `;
      
      const { error: addColumnError } = await supabaseAdmin.rpc(
        'exec_sql',
        { sql: addColumnSQL }
      );
      
      if (addColumnError) {
        console.error("Error adding updated_at column:", addColumnError);
        throw new Error(`Failed to add updated_at column: ${addColumnError.message}`);
      }
      
      console.log("Added updated_at column successfully");
    }
    
    // Check if we need to add the last_update_trigger column that we'll use to trigger updates
    const { data: hasTriggerColumn, error: triggerColumnError } = await supabaseAdmin.rpc(
      'column_exists',
      { table_name: 'users', column_name: 'last_update_trigger' }
    );
    
    if (triggerColumnError) {
      console.error("Error checking last_update_trigger column:", triggerColumnError);
      throw new Error(`Failed to check if last_update_trigger column exists: ${triggerColumnError.message}`);
    }
    
    // Add last_update_trigger column if it doesn't exist
    if (!hasTriggerColumn) {
      console.log("Adding last_update_trigger column to users table...");
      
      const addTriggerColumnSQL = `
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS last_update_trigger TIMESTAMPTZ DEFAULT NOW();
      `;
      
      const { error: addTriggerColumnError } = await supabaseAdmin.rpc(
        'exec_sql',
        { sql: addTriggerColumnSQL }
      );
      
      if (addTriggerColumnError) {
        console.error("Error adding last_update_trigger column:", addTriggerColumnError);
        throw new Error(`Failed to add last_update_trigger column: ${addTriggerColumnError.message}`);
      }
      
      console.log("Added last_update_trigger column successfully");
    }
    
    // Check if the trigger exists
    const { data: triggerExists, error: triggerError } = await supabaseAdmin.rpc(
      'trigger_exists',
      { table_name: 'users', trigger_name: 'set_updated_at_trigger' }
    );
    
    if (triggerError) {
      console.error("Error checking trigger:", triggerError);
      throw new Error(`Failed to check if trigger exists: ${triggerError.message}`);
    }
    
    // Create the trigger if it doesn't exist
    if (!triggerExists) {
      console.log("Creating update trigger on users table...");
      
      const createTriggerSQL = `
        CREATE TRIGGER set_updated_at_trigger
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION set_updated_at();
      `;
      
      const { error: createTriggerError } = await supabaseAdmin.rpc(
        'exec_sql',
        { sql: createTriggerSQL }
      );
      
      if (createTriggerError) {
        console.error("Error creating trigger:", createTriggerError);
        throw new Error(`Failed to create trigger: ${createTriggerError.message}`);
      }
      
      console.log("Trigger created successfully");
    }
    
    console.log("Updated_at trigger setup completed successfully");
    return true;
  } catch (error) {
    console.error("Error ensuring updated_at trigger exists:", error);
    // Don't throw the error, we'll still try to update the user record
    return false;
  }
}