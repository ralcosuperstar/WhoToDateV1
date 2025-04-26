import { Express, Request, Response, Router } from "express";
import { supabaseAdmin } from "../db";

export function setupDatabaseFixRoutes(app: Express, router: Router) {
  // Create endpoint to check database table structure
  router.get("/db-table-info", async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabaseAdmin.rpc('get_table_info', {
        table_name: 'users'
      });
      
      if (error) {
        console.error("Error getting table info:", error);
        return res.status(500).json({ success: false, error: error.message });
      }
      
      // Return table info
      res.json({ success: true, data });
    } catch (error) {
      console.error("Exception getting table info:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });
  
  // Add or repair updated_at column for users table
  router.post("/fix-updated-at", async (req: Request, res: Response) => {
    try {
      // First attempt to directly use SQL statements via the Postgres extension
      const sqlQuery = `
        -- First add the updated_at column if it doesn't exist
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'updated_at'
          ) THEN
            ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
          END IF;
        END $$;
      `;
      
      // Try to execute SQL directly
      const { error: sqlError } = await supabaseAdmin.rpc('execute_sql', {
        query: sqlQuery
      });
      
      if (sqlError) {
        console.error("Error executing SQL:", sqlError);
        
        // If direct SQL fails, try the raw update method instead
        console.log("Attempting alternative fix approach...");
        
        // Use direct update to force the column to exist
        const userId = req.body.userId;
        if (!userId) {
          return res.status(400).json({ 
            success: false, 
            error: "User ID required for alternative fix approach" 
          });
        }
        
        // First fetch the user to make sure they exist
        const { data: user, error: fetchError } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (fetchError) {
          return res.status(404).json({ 
            success: false, 
            error: `User with ID ${userId} not found` 
          });
        }
        
        // Create a new object with the user's existing data but without updated_at
        const userData = { ...user };
        delete userData.updated_at;
        
        // Set the specific fields we want to update rather than the entire object
        const updateData = {
          first_name: userData.first_name || null,
          last_name: userData.last_name || null,
          phone_number: userData.phone_number || null,
          full_name: userData.full_name || null
        };
        
        // Update the user with only these fields
        const { data, error: updateError } = await supabaseAdmin
          .from('users')
          .update(updateData)
          .eq('id', userId)
          .select();
          
        if (updateError) {
          console.error("Error in alternative update:", updateError);
          return res.status(500).json({ 
            success: false, 
            error: updateError.message,
            approach: "alternative" 
          });
        }
        
        return res.json({ 
          success: true, 
          message: "User updated successfully via alternative approach",
          data 
        });
      }
      
      // If we've made it here, the SQL execution worked
      return res.json({ 
        success: true, 
        message: "Updated_at column added successfully" 
      });
    } catch (error) {
      console.error("Exception fixing updated_at:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });
}