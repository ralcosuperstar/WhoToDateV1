import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from 'dotenv';

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

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try multiple ports until one works - try port 5000 first for Replit compatibility
  const tryPorts = [5000, 3000, 3001, 3002, 3003, 5001, 8080, 8000, 8888, 9000];
  
  const startServer = async () => {
    let serverStarted = false;
    
    for (const port of tryPorts) {
      // Skip this iteration if server already started
      if (serverStarted) break;
      
      try {
        console.log(`Attempting to start server on port ${port}...`);
        
        // Create a promise that resolves when the server starts or rejects on error
        await new Promise<boolean>((resolve, reject) => {
          let timeout: NodeJS.Timeout;
          
          // Set up error handler first to catch EADDRINUSE
          const errorHandler = (err: any) => {
            clearTimeout(timeout);
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} already in use, trying next port...`);
              server.removeListener('error', errorHandler);
              resolve(false); // Signal to try next port
            } else {
              server.removeListener('error', errorHandler);
              reject(err); // Actual error
            }
          };
          
          server.once('error', errorHandler);
          
          // Set timeout to avoid hanging
          timeout = setTimeout(() => {
            server.removeListener('error', errorHandler);
            console.log(`Timeout waiting for port ${port}, trying next port...`);
            resolve(false);
          }, 3000); // 3 second timeout
          
          // Try to start listening
          server.listen({
            port,
            host: "0.0.0.0",
          }, () => {
            clearTimeout(timeout);
            server.removeListener('error', errorHandler);
            log(`Server running successfully on port ${port}`);
            serverStarted = true;
            resolve(true); // Success!
          });
        });
        
        // If we get here with no errors and server started, we're done
        if (serverStarted) return;
        
      } catch (error) {
        console.error(`Error starting server on port ${port}:`, error);
        // Continue to next port
      }
    }
    
    // If we reach here, all ports failed
    console.error('Failed to start server on any port. Exiting.');
    process.exit(1);
  };
  
  startServer();
})();
