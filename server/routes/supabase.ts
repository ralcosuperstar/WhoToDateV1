import { Express, Request, Response, Router } from "express";
import { createClient } from '@supabase/supabase-js';

export function setupSupabaseRoutes(app: Express, router: Router) {
  // Configuration endpoint for Supabase client
  router.get("/supabase-config", (req: Request, res: Response) => {
    // Return the configuration needed for the Supabase client
    // We only expose the public anon key, never the service key
    res.json({
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || '',
      initialized: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
    });
  });
  
  // Temporary endpoint to fix updated_at columns and triggers
  router.post("/fix-updated-at", async (req: Request, res: Response) => {
    try {
      console.log("Fixing updated_at columns and triggers...");
      
      const supabase = createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_KEY || ''
      );
      
      // First try to add the updated_at column if it doesn't exist
      const { error: columnError } = await supabase.rpc('pg_add_column', { 
        table_name: 'users', 
        column_name: 'updated_at', 
        column_type: 'timestamp with time zone', 
        column_default: 'now()' 
      });
      
      if (columnError) {
        console.error("Failed to add updated_at column:", columnError);
        return res.status(500).json({ success: false, error: columnError.message });
      }
      
      // Return success response
      res.json({ 
        success: true, 
        message: "Updated_at column added successfully. Manual fix implemented." 
      });
    } catch (error) {
      console.error("Exception fixing updated_at column:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });
}