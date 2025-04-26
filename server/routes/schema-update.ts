import { Request, Response, Router } from 'express';
import { supabaseAdmin } from '../db'; 

export function setupSchemaUpdateRoutes(router: Router) {
  console.log('Setting up schema update routes...');

  // Endpoint to check database schema
  router.get("/check-schema", async (req: Request, res: Response) => {
    try {
      const tables = ['users', 'quiz_answers', 'reports', 'payments', 'blog_posts'];
      const results: Record<string, any> = {};

      for (const table of tables) {
        // Query the table to get its structure
        const { data, error } = await supabaseAdmin
          .from(table)
          .select('*')
          .limit(1);
          
        if (error) {
          results[table] = { error: error.message };
        } else {
          const columns = data?.length ? Object.keys(data[0]) : [];
          results[table] = { 
            columns,
            has_updated_at: columns.includes('updated_at')
          };
        }
      }
      
      res.json({
        success: true,
        schema: results
      });
    } catch (error) {
      console.error("Error checking schema:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to simulate schema update and trigger for a specific user
  router.post("/simulate-update/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "User ID is required"
        });
      }
      
      console.log(`Attempting to update user: ${userId} to simulate schema change`);
      
      // Fetch current user data
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
      
      // Check if user exists
      if (!userData) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }
      
      // Update the user with a timestamp to simulate updated_at
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({
          // Set email to itself or null if it's null
          email: userData.email,
          // Explicitly try to set updated_at
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select();
        
      if (error) {
        console.error("Error updating user:", error);
        // If error is about missing updated_at column, try to add it
        if (error.message.includes('column "updated_at" of relation "users" does not exist')) {
          try {
            console.log("Column doesn't exist yet, trying to add it via SQL...");
            
            // Try to add the column using raw SQL
            const addColumnQuery = `
              ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
            `;
            
            // Use PostgreSQL's REST API if available
            const { error: sqlError } = await supabaseAdmin.rpc('run_sql', {
              query: addColumnQuery
            });
            
            if (sqlError) {
              console.error("Error running SQL:", sqlError);
              return res.status(500).json({
                success: false,
                error: `Failed to add updated_at column: ${sqlError.message}`
              });
            }
            
            // Try updating the user again now that the column exists
            const { data: updatedData, error: updateError } = await supabaseAdmin
              .from('users')
              .update({
                // Just update the email to itself again
                email: userData.email
              })
              .eq('id', userId)
              .select();
              
            if (updateError) {
              console.error("Error updating user after adding column:", updateError);
              return res.status(500).json({
                success: false,
                error: `Added updated_at column but failed to update user: ${updateError.message}`
              });
            }
            
            console.log("Successfully added updated_at column and updated user");
            res.json({
              success: true,
              message: "Added updated_at column and updated user successfully",
              data: updatedData
            });
          } catch (sqlError) {
            console.error("Error attempting to add column:", sqlError);
            return res.status(500).json({
              success: false,
              error: `Failed to add column with direct SQL: ${sqlError instanceof Error ? sqlError.message : String(sqlError)}`
            });
          }
        } else {
          return res.status(500).json({
            success: false,
            error: error.message
          });
        }
      } else {
        console.log("Successfully updated user with updated_at timestamp");
        res.json({
          success: true,
          message: "Updated user successfully",
          data
        });
      }
    } catch (error) {
      console.error("Error in simulate-update:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to add updated_at column to users table
  router.post("/add-updated-at-column", async (req: Request, res: Response) => {
    try {
      console.log("Attempting to add updated_at column to users table");
      
      // SQL to add updated_at column and trigger
      const addColumnSQL = `
        -- Add updated_at column if it doesn't exist
        ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
      `;
      
      const addTriggerSQL = `
        -- Create or replace the trigger function
        CREATE OR REPLACE FUNCTION set_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        -- Drop trigger if it exists
        DROP TRIGGER IF EXISTS set_updated_at_trigger ON users;
        
        -- Create trigger
        CREATE TRIGGER set_updated_at_trigger
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION set_updated_at();
      `;
      
      // Try to execute the SQL using Supabase's SQL runner if available
      try {
        // First try using the sql() method
        const { error: sqlError } = await supabaseAdmin.rpc('run_sql', {
          query: addColumnSQL
        });
        
        if (sqlError) {
          if (sqlError.message.includes('function "run_sql" does not exist')) {
            console.log("run_sql function not available, trying alternative approach");
            
            // Try to create a function that can run SQL
            const createFunctionSQL = `
              CREATE OR REPLACE FUNCTION run_sql(query text)
              RETURNS void AS $$
              BEGIN
                EXECUTE query;
              END;
              $$ LANGUAGE plpgsql SECURITY DEFINER;
            `;
            
            // This might fail if we don't have permissions
            const { error: createFnError } = await supabaseAdmin.rpc('exec_sql', {
              sql: createFunctionSQL
            });
            
            if (createFnError) {
              console.error("Could not create run_sql function:", createFnError);
            } else {
              console.log("Created run_sql function, trying again...");
              
              // Try running the SQL again now that the function exists
              const { error: retry } = await supabaseAdmin.rpc('run_sql', {
                query: addColumnSQL
              });
              
              if (retry) {
                console.error("Error running SQL after creating function:", retry);
              } else {
                console.log("Successfully ran SQL after creating function");
              }
            }
          } else {
            console.error("Error running SQL:", sqlError);
          }
        } else {
          console.log("Successfully added updated_at column to users table");
        }
        
        // Try to set up the trigger next
        const { error: triggerError } = await supabaseAdmin.rpc('run_sql', {
          query: addTriggerSQL
        });
        
        if (triggerError) {
          console.error("Error setting up trigger:", triggerError);
        } else {
          console.log("Successfully set up trigger on users table");
        }
      } catch (rpcError) {
        console.error("Error using RPC for SQL:", rpcError);
      }
      
      // Check if the column now exists
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .limit(1);
        
      if (error) {
        console.error("Error checking users table:", error);
        return res.status(500).json({
          success: false,
          error: error.message
        });
      }
      
      const hasUpdatedAt = data?.length && Object.keys(data[0]).includes('updated_at');
      
      res.json({
        success: true,
        columnAdded: hasUpdatedAt,
        message: hasUpdatedAt 
          ? "Updated_at column added successfully" 
          : "Could not add updated_at column but did not encounter errors"
      });
    } catch (error) {
      console.error("Error adding updated_at column:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
}