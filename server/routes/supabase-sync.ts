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
      
      // Store authentication info in the session
      // @ts-ignore - Session may not have these properties, but we're adding them
      req.session.userId = user_id;
      // @ts-ignore
      req.session.email = email;
      // @ts-ignore
      req.session.supabaseAuthenticated = true;
      
      // Save the session
      req.session.save(async (err) => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ success: false, message: 'Failed to save session' });
        }
        
        try {
          // Check if the user exists in our database
          let user;
          try {
            user = await db.getUserByEmail(email);
          } catch (e) {
            console.log('Error fetching user, might be type mismatch or user not found:', e);
            // Continue without user data 
          }
          
          // Return success
          res.json({ 
            success: true, 
            message: 'Session synced successfully', 
            userExists: !!user 
          });
        } catch (dbError) {
          console.error('Database error during sync:', dbError);
          res.status(500).json({ success: false, message: 'Database error during sync' });
        }
      });
    } catch (error) {
      console.error('Error syncing session:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  /**
   * Check if session is authenticated with Supabase
   */
  router.get('/auth-status', (req: Request, res: Response) => {
    // @ts-ignore - We added these properties to the session
    const isAuthenticated = req.session.supabaseAuthenticated === true;
    
    res.json({
      authenticated: isAuthenticated,
      // @ts-ignore
      userId: isAuthenticated ? req.session.userId : null,
      // @ts-ignore
      email: isAuthenticated ? req.session.email : null
    });
  });
}