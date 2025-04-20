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
      
      // Check if session exists
      if (!req.session) {
        console.error('Session object is undefined - possible session middleware configuration issue');
        return res.status(500).json({ 
          success: false, 
          message: 'Session not available',
          error: 'session_undefined'
        });
      }
      
      // Store authentication info in the session
      req.session.userId = user_id;
      req.session.email = email;
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
    // Check if session exists
    if (!req.session) {
      return res.json({
        authenticated: false,
        userId: null,
        email: null,
        error: 'session_undefined'
      });
    }
    
    const isAuthenticated = req.session.supabaseAuthenticated === true;
    
    res.json({
      authenticated: isAuthenticated,
      userId: isAuthenticated ? req.session.userId : null,
      email: isAuthenticated ? req.session.email : null
    });
  });
}