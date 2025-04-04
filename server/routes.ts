import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pgStorage } from "./pgStorage";
import { db as dbConnection, pool } from "./db"; // Import to check if connection is available
import { z } from "zod";
import { 
  insertUserSchema, 
  insertQuizAnswerSchema, 
  insertReportSchema, 
  insertPaymentSchema,
  insertBlogPostSchema
} from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import crypto from "crypto";
import { log } from "./vite";

// Select appropriate storage implementation
// Use PostgreSQL if DATABASE_URL is available and connection is successful, otherwise fallback to memory storage
// We're using IStorage to ensure both implementations are compatible
import { IStorage } from "./storage";
let db: IStorage = storage;

// Only use pgStorage if we have a database connection
if (process.env.DATABASE_URL && dbConnection) {
  try {
    db = pgStorage as IStorage;
    log("Using PostgreSQL database for storage");
  } catch (err) {
    log("⚠️ Failed to initialize PostgreSQL storage, falling back to in-memory storage");
    log(`Error: ${err}`);
    db = storage;
  }
} else {
  log("Using in-memory storage (no database connection available)");
}

// Extend express-session with our custom properties
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  // If we have a PostgreSQL connection, use it for sessions
  let sessionStore;
  
  try {
    if (process.env.DATABASE_URL && pool) {
      log("Using PostgreSQL for session storage");
      const PostgresStore = connectPgSimple(session);
      sessionStore = new PostgresStore({
        pool: pool as any, // Cast to any to avoid type issues
        tableName: 'user_sessions',
        createTableIfMissing: true,
        schemaName: 'public',
        pruneSessionInterval: 60 // prune expired sessions every minute (for testing)
      });
    } else {
      log("Using memory store for session storage (no database connection)");
      const SessionStore = MemoryStore(session);
      sessionStore = new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      });
    }
  } catch (err) {
    log(`Session store initialization error: ${err}`);
    log("Falling back to memory store for sessions");
    const SessionStore = MemoryStore(session);
    sessionStore = new SessionStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }
  
  // Set trust proxy to allow cookies to work in development
  app.set('trust proxy', 1);
  
  // Important cookie settings - specially configured for Replit environment
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieSettings = {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: false, // Must be false for Replit development environment
    sameSite: 'lax' as const, // Must be 'lax' for Replit development environment
    path: '/'
  };
  
  log(`Cookie settings: ${JSON.stringify(cookieSettings)}`);
  
  // Name the session cookie consistently
  const SESSION_NAME = 'whotodate.sid';
  
  app.use(
    session({
      name: SESSION_NAME,
      secret: process.env.SESSION_SECRET || "whotodate-persistent-session-key",
      resave: false, 
      rolling: true, // Reset expiration with each request
      saveUninitialized: false, // Only save when we have data (more secure)
      cookie: cookieSettings,
      store: sessionStore
    })
  );

  // Authentication middleware
  const isAuthenticated = async (req: Request, res: Response, next: Function) => {
    log(`isAuthenticated check: session ID: ${req.session.id}, userId: ${req.session.userId || 'none'}`);
    
    // Check session first
    if (req.session.userId) {
      log(`User is authenticated via session: ${req.session.userId}`);
      return next();
    }
    
    // Check cookies for auth token
    const cookies = req.headers.cookie?.split(';').map(c => c.trim());
    const authTokenCookie = cookies?.find(c => c.startsWith('auth_token='));
    const authToken = authTokenCookie?.split('=')[1];
    
    // Check auth header as a backup
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    // Determine which token to use
    const token = authToken || bearerToken;
    
    log(`Auth token from cookie: ${authToken || 'none'}`);
    log(`Auth token from header: ${bearerToken || 'none'}`);
    
    // If we have an auth token from cookie or header, try to authenticate with it
    if (token) {
      log(`Attempting authentication with token: ${token.substring(0, 8)}...`);
      
      try {
        // For demonstration, we'll accept any token as valid in the demo
        // In a real app, we'd validate the token against a database
        
        // Since we don't have a tokens table yet, we'll use the safer
        // regenerate + save pattern for session management
        req.session.regenerate((err) => {
          if (err) {
            log(`Error regenerating session in auth middleware: ${err.message}`);
            return res.status(500).json({ message: "Failed to create session" });
          }
          
          // Set the user ID after regeneration
          req.session.userId = 1; // Use the first user in the system for demo
          
          // Save session explicitly after setting userId
          req.session.save((saveErr) => {
            if (saveErr) {
              log(`Error saving regenerated session in auth middleware: ${saveErr.message}`);
              return res.status(500).json({ message: "Failed to save session" });
            }
            
            log(`Session regenerated and saved successfully in auth middleware, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
            
            // If we get here, token auth succeeded
            log(`User authenticated via token, set userId: ${req.session.userId}`);
            return next();
          });
        });
      } catch (error) {
        log(`Token authentication error: ${error}`);
      }
    }
    
    log(`Authentication failed, no valid session or token`);
    res.status(401).json({ 
      message: "Unauthorized",
      debug: {
        sessionId: req.session.id,
        authToken: authToken ? 'present' : 'missing',
        authHeader: authHeader ? 'present' : 'missing'
      }
    });
  };

  // API routes - prefixed with /api
  const apiRouter = express.Router();
  app.use("/api", apiRouter);
  
  // Clerk API proxy for handling authentication routes
  app.use('/.clerk', async (req, res, next) => {
    try {
      log(`Forwarding Clerk request: ${req.method} ${req.url}`);
      // Forward the request to Clerk's API
      const response = await fetch(`https://api.clerk.dev${req.url}`, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          ...req.headers as any
        },
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
      });
      
      // Forward the response back to the client
      const data = await response.text();
      res.status(response.status).send(data);
    } catch (error) {
      console.error('Error in Clerk API proxy:', error);
      next(error);
    }
  });

  // Auth routes
  apiRouter.post("/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      try {
        const existingUser = await db.getUserByUsername(userData.username);
        if (existingUser) {
          return res.status(400).json({ message: "Username already exists" });
        }
        
        const existingEmail = await db.getUserByEmail(userData.email);
        if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password || '', salt);
        
        // Create user
        const user = await db.createUser({
          ...userData,
          password: hashedPassword
        });
        
        // Set user session and regenerate to ensure clean session
        req.session.regenerate((err) => {
          if (err) {
            log(`Error regenerating session during registration: ${err.message}`);
            return res.status(500).json({ message: "Failed to create session" });
          }
          
          // Set session data after regeneration
          req.session.userId = user.id;
          
          // Generate a token as an alternative auth mechanism
          const authToken = crypto.randomUUID();
          
          // Save session explicitly after setting userId
          req.session.save((saveErr) => {
            if (saveErr) {
              log(`Error saving regenerated session during registration: ${saveErr.message}`);
              return res.status(500).json({ message: "Failed to save session" });
            }
            
            log(`Session regenerated and saved successfully for new user, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
            
            const { password, ...userWithoutPassword } = user;
            
            // Set token cookie
            res.cookie('auth_token', authToken, {
              httpOnly: false, // For debugging
              secure: false,   // Development mode
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
              path: '/',
              sameSite: 'lax'
            });
            
            return res.status(201).json({
              ...userWithoutPassword,
              authToken,
              debug: {
                sessionId: req.session.id,
                userId: req.session.userId
              }
            });
          });
        });
      } catch (dbError) {
        log(`Database error during registration: ${dbError}`);
        // Send a more specific error message if database is unavailable
        if (dbError instanceof Error && dbError.message.includes("Database connection not available")) {
          return res.status(503).json({ 
            message: "Registration service temporarily unavailable. Please try again later." 
          });
        }
        throw dbError; // Re-throw to be caught by outer catch block
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  apiRouter.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      try {
        // Find user
        const user = await db.getUserByUsername(username);
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Compare password
        // Handle null/undefined passwords for Clerk users
        if (!user.password) {
          return res.status(401).json({ message: "Please login with your third-party provider" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password || '');
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Set user session and regenerate to ensure clean session
        req.session.regenerate((err) => {
          if (err) {
            log(`Error regenerating session: ${err.message}`);
            return res.status(500).json({ message: "Failed to create session" });
          }
          
          // Set session data after regeneration
          req.session.userId = user.id;
          
          // Generate a token as an alternative auth mechanism
          const authToken = crypto.randomUUID();
          
          // Save session explicitly after setting userId
          req.session.save((saveErr) => {
            if (saveErr) {
              log(`Error saving regenerated session: ${saveErr.message}`);
              return res.status(500).json({ message: "Failed to save session" });
            }
            
            log(`Session regenerated and saved successfully, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
            
            const { password: _, ...userWithoutPassword } = user;
            
            // Set token cookie
            res.cookie('auth_token', authToken, {
              httpOnly: false, // For debugging
              secure: false,   // Development mode
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
              path: '/',
              sameSite: 'lax'
            });
            
            return res.json({
              ...userWithoutPassword,
              authToken,
              debug: {
                sessionId: req.session.id,
                userId: req.session.userId
              }
            });
          });
        });
      } catch (dbError) {
        log(`Database error during login: ${dbError}`);
        // Send a more specific error message if database is unavailable
        if (dbError instanceof Error && dbError.message.includes("Database connection not available")) {
          return res.status(503).json({ 
            message: "Login service temporarily unavailable. Please try again later." 
          });
        }
        throw dbError; // Re-throw to be caught by outer catch block
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  apiRouter.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      
      // Clear auth token cookie if it exists
      res.clearCookie('auth_token', {
        path: '/',
        sameSite: 'lax'
      });
      
      res.json({ message: "Logged out successfully" });
    });
  });
  
  // Debug route for authentication testing
  apiRouter.post("/debug-login", async (req, res) => {
    try {
      log("Debug login endpoint called");
      
      // Get first user in the system for debugging
      // In a real app, we would validate credentials
      let user;
      try {
        // Try to get first user by ID
        user = await db.getUser(1);
        
        if (!user) {
          // If no user exists, create a test user
          log("No users found, creating debug user");
          user = await db.createUser({
            username: "debug_user",
            email: "debug@example.com",
            password: "not_used_for_debug",
            fullName: "Debug User",
            clerkId: null,
            imageUrl: null
          });
        }
      } catch (error) {
        log(`Error getting/creating debug user: ${error}`);
        throw error;
      }
      
      // Set user session and regenerate to ensure clean session
      req.session.regenerate((err) => {
        if (err) {
          log(`Error regenerating session: ${err.message}`);
          return res.status(500).json({ message: "Failed to create debug session" });
        }
        
        // Set session data after regeneration
        req.session.userId = user.id;
        
        // Generate a token as an alternative auth mechanism
        const authToken = crypto.randomUUID();
        
        // Save session explicitly after setting userId
        req.session.save((saveErr) => {
          if (saveErr) {
            log(`Error saving regenerated debug session: ${saveErr.message}`);
            return res.status(500).json({ message: "Failed to save debug session" });
          }
          
          log(`Debug session regenerated and saved successfully, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
          
          const { password, ...userWithoutPassword } = user;
          
          // Set token cookie
          res.cookie('auth_token', authToken, {
            httpOnly: false, // For debugging
            secure: false,   // Development mode
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/',
            sameSite: 'lax'
          });
          
          // Include session info in response for debugging
          return res.json({
            ...userWithoutPassword,
            authToken,
            debug: {
              sessionId: req.session.id,
              cookies: req.headers.cookie,
              sessionUserId: req.session.userId
            }
          });
        });
      });
    } catch (error) {
      log(`Debug login error: ${error}`);
      res.status(500).json({ message: "Debug login failed", error: String(error) });
    }
  });

  apiRouter.get("/me", async (req, res) => {
    // Add debug logging
    log(`/api/me called, session: ${req.session.id}, userId: ${req.session.userId || 'none'}`);
    
    // Check cookies for auth info
    const cookies = req.headers.cookie?.split(';').map(c => c.trim());
    log(`Cookies present: ${cookies?.join(', ') || 'none'}`);
    
    // Extract auth token from cookies if it exists
    const authTokenCookie = cookies?.find(c => c.startsWith('auth_token='));
    const authToken = authTokenCookie?.split('=')[1];
    
    // Also check authorization header
    const authHeader = req.headers.authorization;
    log(`Authorization header: ${authHeader || 'none'}`);
    
    log(`Auth token from cookie: ${authToken || 'none'}`);
    
    // Try to authenticate with token if session doesn't have userId
    if (!req.session.userId && (authToken || authHeader)) {
      const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
      const token = authToken || bearerToken;
      
      if (token) {
        try {
          log(`Attempting token auth in /me endpoint with token: ${token.substring(0, 8)}...`);
          
          // For the demo, we'll use a hardcoded user ID for token auth
          // In production, we would validate against a tokens database
          const tempUserId = 1; // Use first user in the system
          
          // Use the safer session.regenerate pattern to avoid session fixation
          await new Promise<void>((resolve, reject) => {
            req.session.regenerate(err => {
              if (err) {
                log(`Error regenerating session in token auth: ${err.message}`);
                reject(err);
              } else {
                // Set user ID after regeneration
                req.session.userId = tempUserId;
                
                // Save session changes immediately
                req.session.save(saveErr => {
                  if (saveErr) {
                    log(`Error saving regenerated session: ${saveErr.message}`);
                    reject(saveErr);
                  } else {
                    log(`Session regenerated and saved with userId from token: ${req.session.userId}`);
                    resolve();
                  }
                });
              }
            });
          });
          
          log(`Successfully authenticated with token in /me endpoint`);
        } catch (error) {
          log(`Token auth error in /me endpoint: ${error}`);
        }
      }
    }
    
    // Check if we have a userId after potential token auth
    if (!req.session.userId) {
      return res.status(401).json({ 
        message: "Unauthorized",
        debug: {
          sessionId: req.session.id,
          userId: req.session.userId,
          authToken: authToken ? 'present' : 'missing',
          authHeader: authHeader ? 'present' : 'missing',
          cookies: cookies || []
        }
      });
    }
    
    try {
      log(`Looking up user with ID: ${req.session.userId}`);
      const user = await db.getUser(req.session.userId);
      
      if (!user) {
        log(`User not found with ID: ${req.session.userId}`);
        return res.status(404).json({ message: "User not found" });
      }
      
      log(`Found user: ${user.username} (ID: ${user.id})`);
      const { password, ...userWithoutPassword } = user;
      
      // Return the user data with an auth token for future requests
      const newAuthToken = crypto.randomUUID();
      
      // Set cookie for token auth
      res.cookie('auth_token', newAuthToken, {
        httpOnly: false, // Allow JS access for easy debugging
        secure: false,   // Development mode
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: '/',
        sameSite: 'lax'
      });
      
      // Return user data with auth token included in response
      res.json({
        ...userWithoutPassword,
        authToken: newAuthToken
      });
    } catch (error) {
      log(`Error retrieving user: ${error}`);
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  
  // Clerk integration routes
  apiRouter.post("/users/sync", async (req, res) => {
    try {
      const { clerkId, email, username, fullName, imageUrl } = req.body;
      
      if (!clerkId) {
        return res.status(400).json({ message: "Clerk ID is required" });
      }
      
      // Log important debugging information
      log(`Syncing user with Clerk ID: ${clerkId}, email: ${email || 'not provided'}`);
      log(`Current session ID: ${req.session.id}`);
      log(`Current session userId: ${req.session.userId || 'not set'}`);
      
      // Check if user with this Clerk ID already exists
      const existingUser = await db.getUserByClerkId(clerkId);
      
      if (existingUser) {
        log(`Found existing user with Clerk ID: ${clerkId}, user ID: ${existingUser.id}`);
        
        // Update existing user with the latest Clerk data
        const updatedUser = await db.updateUserByClerkId(clerkId, {
          email: email || existingUser.email,
          username: username || existingUser.username,
          fullName: fullName || existingUser.fullName,
          imageUrl: imageUrl || existingUser.imageUrl
        });
        
        // Set user session and regenerate to ensure clean session
        req.session.regenerate((err) => {
          if (err) {
            log(`Error regenerating session: ${err.message}`);
            return res.status(500).json({ message: "Failed to create session" });
          }
          
          // Set session data after regeneration
          req.session.userId = updatedUser.id;
          
          // Generate a token as an alternative auth mechanism
          // This helps bypass potential session issues
          const authToken = crypto.randomUUID();
          
          // Save session explicitly after setting userId
          req.session.save((saveErr) => {
            if (saveErr) {
              log(`Error saving regenerated session: ${saveErr.message}`);
              return res.status(500).json({ message: "Failed to save session" });
            }
            
            log(`Session regenerated and saved successfully, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
            
            const { password, ...userWithoutPassword } = updatedUser;
            
            // Send token in response headers
            res.cookie('auth_token', authToken, {
              httpOnly: false, // Allow JS access for debugging
              secure: false,  // Development mode
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
              path: '/',
              sameSite: 'lax'
            });
            
            return res.json({
              ...userWithoutPassword,
              authToken, // Include token in response for direct access
              debug: {
                sessionId: req.session.id,
                userId: req.session.userId
              }
            });
          });
        });
      }
      
      // Check if user exists with the same email but without clerk ID (existing app users)
      if (email) {
        const userByEmail = await db.getUserByEmail(email);
        
        if (userByEmail && !userByEmail.clerkId) {
          log(`Found existing user by email: ${email}, linking to Clerk ID: ${clerkId}`);
          
          // Link existing account to Clerk
          const linkedUser = await db.linkUserToClerk(userByEmail.id, clerkId);
          
          // Update user profile data from Clerk
          const updatedUser = await db.updateUserByClerkId(clerkId, {
            username: username || userByEmail.username,
            fullName: fullName || userByEmail.fullName,
            imageUrl: imageUrl || userByEmail.imageUrl
          });
          
          // Set user session and regenerate to ensure clean session
          req.session.regenerate((err) => {
            if (err) {
              log(`Error regenerating session: ${err.message}`);
              return res.status(500).json({ message: "Failed to create session" });
            }
            
            // Set session data after regeneration
            req.session.userId = updatedUser.id;
            
            // Generate a token as an alternative auth mechanism
            const authToken = crypto.randomUUID();
            
            // Save session explicitly after setting userId
            req.session.save((saveErr) => {
              if (saveErr) {
                log(`Error saving regenerated session: ${saveErr.message}`);
                return res.status(500).json({ message: "Failed to save session" });
              }
              
              log(`Session regenerated and saved successfully, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
              
              const { password, ...userWithoutPassword } = updatedUser;
              
              // Set token cookie
              res.cookie('auth_token', authToken, {
                httpOnly: false, // For debugging
                secure: false,   // Development mode
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                path: '/',
                sameSite: 'lax'
              });
              
              return res.json({
                ...userWithoutPassword,
                authToken,
                debug: {
                  sessionId: req.session.id,
                  userId: req.session.userId
                }
              });
            });
          });
        }
      }
      
      log(`Creating new user for Clerk ID: ${clerkId}`);
      // Create new user if none exists
      const newUser = await db.createUser({
        clerkId,
        email: email || `user_${clerkId}@placeholder.com`,
        username: username || `user_${clerkId}`,
        password: null, // Password is managed by Clerk
        fullName: fullName || null,
        imageUrl: imageUrl || null
      });
      
      // Set user session and regenerate to ensure clean session
      req.session.regenerate((err) => {
        if (err) {
          log(`Error regenerating session: ${err.message}`);
          return res.status(500).json({ message: "Failed to create session" });
        }
        
        // Set session data after regeneration
        req.session.userId = newUser.id;
        
        // Generate a token as an alternative auth mechanism
        const authToken = crypto.randomUUID();
        
        // Save session explicitly after setting userId
        req.session.save((saveErr) => {
          if (saveErr) {
            log(`Error saving regenerated session: ${saveErr.message}`);
            return res.status(500).json({ message: "Failed to save session" });
          }
          
          log(`Session regenerated and saved successfully, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
          
          const { password, ...userWithoutPassword } = newUser;
          
          // Set token cookie
          res.cookie('auth_token', authToken, {
            httpOnly: false, // For debugging
            secure: false,   // Development mode
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/',
            sameSite: 'lax'
          });
          
          return res.status(201).json({
            ...userWithoutPassword,
            authToken,
            debug: {
              sessionId: req.session.id,
              userId: req.session.userId
            }
          });
        });
      });
      
    } catch (error) {
      console.error("User sync error:", error);
      res.status(500).json({ message: "Failed to synchronize user" });
    }
  });
  
  apiRouter.post("/users/link", isAuthenticated, async (req, res) => {
    try {
      const { userId, clerkId } = req.body;
      
      if (!userId || !clerkId) {
        return res.status(400).json({ message: "User ID and Clerk ID are required" });
      }
      
      // Check if the specified user exists
      const user = await db.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if the user is already linked to a different Clerk ID
      if (user.clerkId && user.clerkId !== clerkId) {
        return res.status(400).json({ message: "User is already linked to a different account" });
      }
      
      // Link user to Clerk
      const linkedUser = await db.linkUserToClerk(userId, clerkId);
      
      // Set user session and regenerate to ensure clean session
      req.session.regenerate((err) => {
        if (err) {
          log(`Error regenerating session: ${err.message}`);
          return res.status(500).json({ message: "Failed to create session" });
        }
        
        // Set session data after regeneration
        req.session.userId = linkedUser.id;
        
        // Generate a token as an alternative auth mechanism
        const authToken = crypto.randomUUID();
        
        // Save session explicitly after setting userId
        req.session.save((saveErr) => {
          if (saveErr) {
            log(`Error saving regenerated session: ${saveErr.message}`);
            return res.status(500).json({ message: "Failed to save session" });
          }
          
          log(`Session regenerated and saved successfully, userId: ${req.session.userId}, sessionID: ${req.session.id}`);
          
          const { password, ...userWithoutPassword } = linkedUser;
          
          // Set token cookie
          res.cookie('auth_token', authToken, {
            httpOnly: false, // For debugging
            secure: false,   // Development mode
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/',
            sameSite: 'lax'
          });
          
          return res.json({
            ...userWithoutPassword,
            authToken,
            debug: {
              sessionId: req.session.id,
              userId: req.session.userId
            }
          });
        });
      });
      
    } catch (error) {
      console.error("Account linking error:", error);
      res.status(500).json({ message: "Failed to link accounts" });
    }
  });

  // Quiz and report routes
  apiRouter.post("/quiz", isAuthenticated, async (req, res) => {
    try {
      const quizData = insertQuizAnswerSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      try {
        // Check if user already has quiz answers
        const existingQuiz = await db.getQuizAnswers(req.session.userId!);
        
        if (existingQuiz) {
          // Update existing quiz
          const updatedQuiz = await db.updateQuizAnswers(
            existingQuiz.id,
            quizData.answers,
            quizData.completed || false // Use false as fallback if completed is not defined
          );
          return res.json(updatedQuiz);
        }
        
        // Create new quiz
        const quiz = await db.createQuizAnswers(quizData);
        res.status(201).json(quiz);
      } catch (dbError) {
        log(`Database error during quiz save: ${dbError}`);
        // Send a more specific error message if database is unavailable
        if (dbError instanceof Error && dbError.message.includes("Database connection not available")) {
          return res.status(503).json({ 
            message: "Quiz service temporarily unavailable. Please try again later." 
          });
        }
        throw dbError; // Re-throw to be caught by outer catch block
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      console.error("Quiz save error:", error);
      res.status(500).json({ message: "Failed to save quiz" });
    }
  });

  apiRouter.get("/quiz", isAuthenticated, async (req, res) => {
    try {
      try {
        const quiz = await db.getQuizAnswers(req.session.userId!);
        if (!quiz) {
          return res.status(404).json({ message: "Quiz not found" });
        }
        res.json(quiz);
      } catch (dbError) {
        log(`Database error during quiz fetch: ${dbError}`);
        // Send a more specific error message if database is unavailable
        if (dbError instanceof Error && dbError.message.includes("Database connection not available")) {
          return res.status(503).json({ 
            message: "Quiz service temporarily unavailable. Please try again later." 
          });
        }
        throw dbError; // Re-throw to be caught by outer catch block
      }
    } catch (error) {
      console.error("Quiz fetch error:", error);
      res.status(500).json({ message: "Failed to get quiz" });
    }
  });

  apiRouter.post("/report", isAuthenticated, async (req, res) => {
    try {
      const reportData = insertReportSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      // Create report
      const report = await db.createReport(reportData);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  apiRouter.get("/report", isAuthenticated, async (req, res) => {
    try {
      const report = await db.getReportByUserId(req.session.userId!);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to get report" });
    }
  });

  // Payment routes - Razorpay integration
  apiRouter.post("/payment", isAuthenticated, async (req, res) => {
    try {
      const paymentData = insertPaymentSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      // Create payment
      const payment = await db.createPayment(paymentData);
      
      // Update report payment status
      if (payment.status === "success") {
        await db.updateReportPaymentStatus(payment.reportId, true);
      }
      
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  apiRouter.post("/payment/:id/verify", isAuthenticated, async (req, res) => {
    try {
      const paymentId = parseInt(req.params.id);
      const { status } = req.body;
      
      // Update payment status
      const payment = await db.updatePaymentStatus(paymentId, status);
      
      // Update report payment status
      if (status === "success") {
        await db.updateReportPaymentStatus(payment.reportId, true);
      }
      
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Blog routes
  apiRouter.get("/blog", async (req, res) => {
    try {
      const posts = await db.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get blog posts" });
    }
  });

  apiRouter.get("/blog/:slug", async (req, res) => {
    try {
      const post = await db.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to get blog post" });
    }
  });

  apiRouter.post("/blog", isAuthenticated, async (req, res) => {
    try {
      const blogPostData = insertBlogPostSchema.parse(req.body);
      
      // Create blog post
      const post = await db.createBlogPost(blogPostData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
