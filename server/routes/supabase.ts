import { Express, Request, Response, Router } from "express";

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
}