import { Express } from 'express';
import { supabaseStorage } from '../supabaseStorage';
import { createClient } from '@supabase/supabase-js';

// API routes for Supabase integration
export function setupSupabaseRoutes(app: Express) {
  // Direct test endpoint for Supabase connection
  app.get('/api/supabase-direct-test', async (req, res) => {
    try {
      // Check environment variables
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
      const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
      
      const envCheck = {
        supabaseUrl: !!supabaseUrl,
        supabaseServiceKey: !!supabaseServiceKey,
        supabaseAnonKey: !!supabaseAnonKey
      };
      
      console.log('Supabase environment check:', envCheck);
      
      // Verify supabase client initialization
      if (!supabaseUrl || !supabaseServiceKey) {
        return res.status(500).json({
          success: false,
          message: 'Supabase credentials missing',
          envCheck
        });
      }
      
      // Test with supabaseStorage directly
      let storageTestResult;
      try {
        const startTime = Date.now();
        const allUsers = await supabaseStorage.getAllUsers();
        const endTime = Date.now();
        
        storageTestResult = {
          success: true,
          userCount: allUsers.length,
          responseTime: endTime - startTime + 'ms'
        };
      } catch (storageError) {
        console.error('Error testing supabaseStorage:', storageError);
        storageTestResult = {
          success: false,
          error: storageError instanceof Error ? storageError.message : String(storageError)
        };
      }
      
      // Create a fresh client for direct test
      let directClientTestResult;
      try {
        const startTime = Date.now();
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data, error } = await supabase.from('users').select('*').limit(5);
        const endTime = Date.now();
        
        directClientTestResult = {
          success: !error,
          recordCount: data?.length || 0,
          error: error?.message,
          responseTime: endTime - startTime + 'ms'
        };
      } catch (directError) {
        console.error('Error with direct Supabase client:', directError);
        directClientTestResult = {
          success: false,
          error: directError instanceof Error ? directError.message : String(directError)
        };
      }
      
      res.json({
        success: true,
        envCheck,
        storageTest: storageTestResult,
        directTest: directClientTestResult
      });
    } catch (error) {
      console.error('Supabase direct test failed:', error);
      res.status(500).json({
        success: false,
        message: 'Supabase test failed',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
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