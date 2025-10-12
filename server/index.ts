import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from 'dotenv';
import compression from 'compression';
import { cacheService as appCache } from './services';

// Load environment variables
dotenv.config();

// Check for required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SESSION_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Environment variable ${envVar} is required but not set.`);
    process.exit(1);
  }
}

// If we're missing the service key (which is needed for admin operations), warn
if (!process.env.SUPABASE_SERVICE_KEY) {
  console.warn("Warning: SUPABASE_SERVICE_KEY is not set. Some admin operations may fail.");
}

const app = express();
// Enable compression for all responses
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      // Flag slow API requests for monitoring
      if (duration > 500) {
        console.warn(`⚠️ SLOW REQUEST: ${req.method} ${path} took ${duration}ms`);
      }

      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // No need to initialize database tables - Supabase handles this
  console.log('✅ Connecting to Supabase...');

  // Safety middleware to prevent server crashes - apply to all requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    const originalNext = next;
    
    // Replace next with a safety-wrapped version
    const safeNext: NextFunction = (err?: any) => {
      try {
        originalNext(err);
      } catch (error) {
        console.error(`CRASH PREVENTED: Error in middleware after ${req.method} ${req.url}:`, error);
        const typedError = error as Error;
        console.error("Stack trace:", typedError.stack);
        
        // Only send response if headers not sent yet
        if (!res.headersSent) {
          res.status(500).json({
            message: "Internal server error prevented by safety middleware",
            path: req.url,
            error: process.env.NODE_ENV !== "production" ? typedError.message : undefined
          });
        }
      }
    };
    
    try {
      // Process the next middleware with our safe wrapper
      originalNext();
    } catch (error) {
      console.error(`CRASH PREVENTED: Error in initial middleware for ${req.method} ${req.url}:`, error);
      const typedError = error as Error;
      console.error("Stack trace:", typedError.stack);
      
      if (!res.headersSent) {
        res.status(500).json({
          message: "Internal server error prevented by safety middleware",
          path: req.url,
          error: process.env.NODE_ENV !== "production" ? typedError.message : undefined
        });
      }
    }
  });
  
  // Create a separate router for API routes to ensure proper middleware order
  const apiRouter = express.Router();
  
  // Debug middleware to help identify if API routes are being processed
  apiRouter.use((req, res, next) => {
    console.log('🔍 API Route accessed:', req.method, req.originalUrl);
    // Continue to the actual route handler
    next();
  });

  // Add a specific health check endpoint
  apiRouter.get('/health', (req, res) => {
    console.log('💖 Health check endpoint hit');
    return res.json({ status: 'ok', time: new Date().toISOString() });
  });
  
  // Configure Express to use the API router for all /api routes
  app.use('/api', apiRouter);
  
  // Register all API routes using the apiRouter
  const server = await registerRoutes(app, apiRouter);

  // Enhanced error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Create standardized error response
    const errorResponse = {
      success: false,
      message: message,
      // Only include details in development mode
      error: process.env.NODE_ENV !== 'production' ? {
        stack: err.stack,
        details: err.details || err.data || undefined
      } : undefined,
      timestamp: new Date().toISOString()
    };

    res.status(status).json(errorResponse);
    console.error('Error in request:', err);
  });
  
  // Add a fallback route that explicitly returns a proper API 404 for API routes
  // This must come AFTER all other API routes but BEFORE Vite setup
  apiRouter.use('*', (req, res) => {
    console.log('⚠️ API route not found:', req.originalUrl);
    return res.status(404).json({ error: 'API endpoint not found' });
  });
  
  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Replit expects the server to bind to port 5000
  const PORT = 5000;
  const HOST = "0.0.0.0";
  
  server.listen(PORT, HOST, () => {
    log(`Server running on port ${PORT}`);
  });
  
  // Handle server errors
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Error: Port ${PORT} is already in use.`);
      console.error('Please stop any other processes using this port and try again.');
      process.exit(1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
})();
