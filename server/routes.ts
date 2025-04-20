import express, { type Express, type Router, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { supabaseStorage } from "./supabaseStorage";
import { setupVite, serveStatic, log } from "./vite";
import { generateVerificationToken, generateTokenExpiry, logAllVerificationLinks } from "./emailService";
import { generateOTP, generateOTPExpiry } from "./twilioService";
import { createClient } from '@supabase/supabase-js';
import { IStorage } from "./storage";
import { User } from '@shared/schema';
import { setupSupabaseRoutes } from "./routes/supabase";
import { setupDatabaseTestRoutes } from "./routes/database-test";

// Use Supabase storage
const db: IStorage = supabaseStorage;

// Session data interface
declare module "express-session" {
  interface SessionData {
    userId?: string;
    email?: string;
    supabaseToken?: string;
    supabaseAuthenticated?: boolean;
  }
}

// Add user property to Request interface
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function registerRoutes(app: Express, apiRouter?: Router): Promise<Server> {
  // Define the router to use - either the provided apiRouter or the main app
  const router = apiRouter || app;
  
  // Set up session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: db.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  }));

  // Middleware to check if user is authenticated via Supabase JWT
  const isAuthenticated = async (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers.authorization;
    
    // Check for JWT token in header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const supabase = createClient(
          process.env.SUPABASE_URL || '',
          process.env.SUPABASE_ANON_KEY || ''
        );
        
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error || !user) {
          console.log("JWT authentication failed:", error?.message);
          return res.status(401).json({ message: "Invalid token" });
        }
        
        // Add user ID to request
        req.user = await db.getUser(user.id);
        return next();
      } catch (error) {
        console.error("Error verifying JWT token:", error);
        return res.status(500).json({ message: "Authentication error" });
      }
    }
    
    // Check for session-based auth (fallback)
    if (req.session.userId) {
      try {
        const user = await db.getUser(req.session.userId);
        if (user) {
          req.user = user;
          return next();
        }
      } catch (error) {
        console.error("Error fetching user from session:", error);
      }
    }
    
    // Development mode fallback for testing
    if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_DEV_AUTH === 'true') {
      console.warn("⚠️ Using development authentication bypass");
      req.user = {
        id: 'dev-user-id-1',
        email: 'dev@example.com',
        username: 'devuser',
        phoneNumber: null,
        firstName: 'Dev',
        lastName: 'User',
        fullName: 'Dev User',
        dateOfBirth: null,
        gender: null,
        imageUrl: null,
        isVerified: true,
        verificationMethod: null,
        verificationToken: null,
        verificationTokenExpiry: null,
        otpCode: null,
        otpExpiry: null,
        clerkId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return next();
    }
    
    console.log("Authentication failed: No valid token or session");
    res.status(401).json({ message: "Unauthorized" });
  };

  // Set up dedicated Supabase routes
  setupSupabaseRoutes(app, router);
  
  // Set up database test routes
  setupDatabaseTestRoutes(app, router);
  
  // Add a health check endpoint that bypasses auth
  router.get("/health", (req: Request, res: Response) => {
    console.log("Health check endpoint hit");
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      server: 'main',
      version: '1.0.0',
      apiStatus: true
    });
  });
  
  // Ensure user exists in public.users table (bypassing Supabase RLS)
  router.post("/ensure-user", async (req: Request, res: Response) => {
    try {
      const { id, email, username, isVerified } = req.body;
      
      if (!id || !email) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required user data" 
        });
      }
      
      // Check if user already exists
      const existingUsers = await db.getUserByEmail(email);
      
      if (existingUsers) {
        return res.json({ 
          success: true, 
          message: "User already exists", 
          exists: true 
        });
      }
      
      // Create new user with UUID as id
      await db.createUser({
        id,
        email,
        username: username || email.split('@')[0],
        isVerified: isVerified || false,
      });
      
      res.json({ 
        success: true, 
        message: "User created successfully", 
        exists: false 
      });
    } catch (error) {
      console.error("Error in ensure-user API:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to ensure user exists" 
      });
    }
  });

  // Protected routes that require authentication
  router.get("/user", isAuthenticated, (req: Request, res: Response) => {
    res.json(req.user);
  });

  router.get("/report", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const report = await db.getReportByUserId(userId);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      res.json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  // Quiz API
  router.get("/quiz", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const quizAnswers = await db.getQuizAnswers(userId);
      if (!quizAnswers) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quizAnswers);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  router.post("/quiz", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { answers, completed } = req.body;
      if (!answers) {
        return res.status(400).json({ message: "Missing quiz answers" });
      }

      // Check if user already has quiz answers
      const existingAnswers = await db.getQuizAnswers(userId);
      
      let quizAnswers;
      if (existingAnswers) {
        // Update existing answers
        quizAnswers = await db.updateQuizAnswers(
          existingAnswers.id,
          answers,
          completed || false
        );
      } else {
        // Create new answers
        quizAnswers = await db.createQuizAnswers({
          userId,
          answers,
          completed: completed || false
        });
      }

      res.json(quizAnswers);
    } catch (error) {
      console.error("Error saving quiz:", error);
      res.status(500).json({ message: "Failed to save quiz" });
    }
  });

  // API routes for blog posts
  router.get("/blog-posts", async (req: Request, res: Response) => {
    try {
      const blogPosts = await db.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  router.get("/blog-posts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const blogPost = await db.getBlogPostById(id);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  router.get("/blog-posts/slug/:slug", async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const blogPost = await db.getBlogPostBySlug(slug);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post by slug:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Create HTTP server
  const server = createServer(app);

  // Development helpers
  if (process.env.NODE_ENV !== "production") {
    // Enable verification link logging if needed
    // await logAllVerificationLinks(db);
    
    // Log that we're in development mode
    console.log("⚠️ Running in development mode");
  }

  return server;
}