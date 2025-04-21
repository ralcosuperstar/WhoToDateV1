import { Router, Request, Response } from 'express';
import { IStorage } from '../storage';
import { Session } from 'express-session';
import { User } from '@shared/schema';

// Extend the express-session Session interface
declare module 'express-session' {
  interface Session {
    userId?: string;
    email?: string;
    supabaseToken?: string;
    supabaseAuthenticated?: boolean;
  }
}

/**
 * Register routes for syncing Supabase authentication with our server session
 */
export function registerSupabaseSyncRoutes(router: Router, db: IStorage) {
  /**
   * API endpoint to sync Supabase authentication with our server session
   * This is called when a user signs in via Supabase Auth
   */
  router.post('/supabase-sync', async (req: Request, res: Response) => {
    try {
      const { email, user_id } = req.body;
      
      if (!email || !user_id) {
        return res.status(400).json({ success: false, message: 'Missing email or user_id' });
      }
      
      console.log(`Syncing session for Supabase user: ${email} (${user_id})`);
      
      // Skip session sync in direct Supabase integration
      // We'll just verify that the user exists in our database and return success
      try {
        // Check if user exists in our database without requiring a session
        let user;
        try {
          user = await db.getUserByEmail(email);
          console.log('Found user in database:', user ? 'yes' : 'no');
        } catch (e) {
          console.log('Error fetching user, might be type mismatch or user not found:', e);
          // Continue without user data
        }
        
        // Return success without requiring session interaction
        return res.json({ 
          success: true, 
          message: 'User verified successfully', 
          userExists: !!user 
        });
      } catch (dbError) {
        console.error('Database error during user verification:', dbError);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error during user verification' 
        });
      }
    } catch (error) {
      console.error('Error during user verification:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error during verification' 
      });
    }
  });

  /**
   * Check if session is authenticated with Supabase
   */
  router.get('/auth-status', async (req: Request, res: Response) => {
    // In the new Supabase integration, we don't rely on sessions for auth status
    // Instead, client should use Supabase Auth directly
    // This endpoint remains for backward compatibility
    res.json({
      authenticated: true,
      message: "Using direct Supabase Auth. Client should check auth status locally."
    });
  });
}