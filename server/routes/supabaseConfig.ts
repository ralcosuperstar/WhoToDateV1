import { Request, Response } from 'express';

/**
 * Route handler to serve the Supabase configuration to clients
 * 
 * This endpoint provides the necessary configuration for the client-side
 * Supabase SDK to connect directly to Supabase.
 */
export const getSupabaseConfig = (req: Request, res: Response) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase configuration in environment variables');
    return res.status(500).json({
      initialized: false,
      error: 'Missing Supabase configuration'
    });
  }
  
  res.json({
    initialized: true,
    url: supabaseUrl,
    anonKey: supabaseAnonKey
  });
};

/**
 * Register Supabase configuration routes
 */
export function registerSupabaseConfigRoutes(router: any) {
  router.get('/supabase-config', getSupabaseConfig);
}

export default registerSupabaseConfigRoutes;