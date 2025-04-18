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

  // Try to use port 5000 first, then fall back to alternatives
  const preferredPort = 5000;
  const fallbackPorts = [3000, 8080, 8000, 4000];
  
  // Function to try listening on a port
  const tryListen = (port: number) => {
    try {
      server.listen({
        port,
        host: "0.0.0.0",
        reusePort: true,
      }, () => {
        log(`serving on port ${port}`);
      });
      
      // Add error handler to try fallback ports
      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE' && fallbackPorts.length > 0) {
          log(`Port ${port} already in use, trying fallback port`);
          const nextPort = fallbackPorts.shift()!;
          tryListen(nextPort);
        } else {
          console.error('Server error:', err);
        }
      });
    } catch (error) {
      console.error(`Failed to start server on port ${port}:`, error);
      if (fallbackPorts.length > 0) {
        const nextPort = fallbackPorts.shift()!;
        log(`Trying fallback port ${nextPort}`);
        tryListen(nextPort);
      } else {
        console.error('All ports are in use. Cannot start server.');
        process.exit(1);
      }
    }
  };
  
  // Start trying to listen on the preferred port
  tryListen(preferredPort);
})();
