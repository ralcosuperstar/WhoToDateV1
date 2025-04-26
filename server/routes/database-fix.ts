import { Express, Request, Response, Router } from "express";
import { supabaseAdmin } from "../db";
import { fixUpdatedAtColumn, getTableInfo, updateUserProfileDirect } from "../directDbConnection";

// This file contains routes to handle database schema/column-related fixes
export function setupDatabaseFixRoutes(app: Express, router: Router) {
  console.log("Setting up database fix routes...");

  // Endpoint to get database table information (structure)
  router.get("/db-table-info", async (req: Request, res: Response) => {
    try {
      console.log("Fetching database table information");
      
      // Use direct database connection to get table info
      const result = await getTableInfo('users');
      
      if (!result.success) {
        console.error("Error fetching table info:", result.error);
        return res.status(500).json({
          success: false,
          error: result.error
        });
      }
      
      console.log("Table information retrieved successfully");
      res.json({
        success: true,
        data: result.data
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
      
      console.log("Fixing updated_at columns and triggers...");
      
      // Use the direct database connection to fix columns and triggers
      const result = await fixUpdatedAtColumn();
      
      if (!result.success) {
        console.error("Failed to fix updated_at column:", result.error);
        return res.status(500).json({
          success: false,
          error: result.error
        });
      }
      
      console.log("Successfully fixed updated_at column");
      res.json({
        success: true,
        message: "Successfully fixed updated_at column and trigger",
        data: result
      });
    } catch (error) {
      console.error("Exception fixing updated_at column:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Endpoint to update user profile directly (when Supabase API fails)
  router.post("/direct-user-update", async (req: Request, res: Response) => {
    try {
      const { userId, userData } = req.body;
      
      if (!userId || !userData) {
        return res.status(400).json({
          success: false,
          error: "User ID and user data are required"
        });
      }
      
      console.log(`Updating user profile directly for user: ${userId}`);
      console.log("Update data:", userData);
      
      // Use direct connection to update the user profile
      const result = await updateUserProfileDirect(userId, userData);
      
      if (!result.success) {
        console.error("Error updating user profile directly:", result.error);
        return res.status(500).json({
          success: false,
          error: result.error
        });
      }
      
      console.log("User profile updated successfully via direct connection");
      res.json({
        success: true,
        message: "User profile updated successfully via direct connection",
        user: result.user
      });
    } catch (error) {
      console.error("Exception updating user profile directly:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
}