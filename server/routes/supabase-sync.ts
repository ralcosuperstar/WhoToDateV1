import { Router, Request, Response } from 'express';
import { db } from '../db';
import type { IStorage } from '../storage';

export function registerSupabaseSyncRoutes(router: Router, db: IStorage) {
  /**
   * API endpoint to sync Supabase authentication with our server session
   * This is called when a user signs in via Supabase Auth
   */
  router.post('/supabase-sync', async (req: Request, res: Response) => {
    try {
      const { email, user_id } = req.body;
      
      if (!email || !user_id) {
        return res.status(400).json({ error: 'Email and user_id are required' });
      }
      
      // Set authenticated user in session
      if (req.session) {
        req.session.userId = user_id;
        req.session.email = email;
        req.session.supabaseAuthenticated = true;
      }
      
      // Success response
      return res.status(200).json({ 
        success: true, 
        message: 'Session synchronized with Supabase Auth'
      });
    } catch (error) {
      console.error('Error in supabase-sync endpoint:', error);
      return res.status(500).json({ 
        error: 'Failed to sync session with Supabase Auth'
      });
    }
  });

  /**
   * Check if session is authenticated with Supabase
   */
  router.get('/auth-status', (req: Request, res: Response) => {
    try {
      const isAuthenticated = !!(req.session && req.session.supabaseAuthenticated);
      
      return res.status(200).json({
        authenticated: isAuthenticated,
        userId: req.session?.userId || null,
        email: req.session?.email || null
      });
    } catch (error) {
      console.error('Error in auth-status endpoint:', error);
      return res.status(500).json({ error: 'Failed to check authentication status' });
    }
  });
}