import { Express } from 'express';

// API routes for Supabase integration
export function setupSupabaseRoutes(app: Express) {
  // Endpoint to provide Supabase configuration to the client
  app.get('/api/supabase-config', (req, res) => {
    // Only provide the public anon key, never the service key
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('⚠️ Supabase configuration missing, providing development fallbacks');
      // For development only - these are just for the UI to connect but won't enable actual Supabase usage
      return res.json({
        supabaseUrl: 'https://truulijpablpqxipindo.supabase.co',
        supabaseAnonKey: 'public-anon-key-not-found-in-dev-mode'
      });
    }
    
    res.json({
      supabaseUrl,
      supabaseAnonKey
    });
  });
  
  // Endpoint to sync Supabase auth state with server session
  app.post('/api/supabase-sync', (req, res) => {
    const { email, user_id } = req.body;
    
    if (!email || !user_id) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
    // Set session data
    if (req.session) {
      req.session.userId = user_id;
      req.session.email = email;
      req.session.supabaseAuthenticated = true;
    }
    
    res.json({ 
      success: true,
      message: 'Session synchronized with Supabase' 
    });
  });
  
  // Endpoint to check session status
  app.get('/api/session', (req, res) => {
    if (req.session && req.session.userId) {
      res.json({
        authenticated: true,
        userId: req.session.userId,
        email: req.session.email
      });
    } else {
      res.json({
        authenticated: false
      });
    }
  });
}