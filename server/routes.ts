import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { supabaseStorage } from "./supabaseStorage";
import { setupVite, serveStatic, log } from "./vite";
import { generateVerificationToken, generateTokenExpiry, logAllVerificationLinks } from "./emailService";
import { generateOTP, generateOTPExpiry } from "./twilioService";
import { createClient } from '@supabase/supabase-js';
import { IStorage } from "./storage";

// Use Supabase storage
const db: IStorage = supabaseStorage;

// Session data interface
declare module "express-session" {
  interface SessionData {
    userId?: string;
    supabaseToken?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: db.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }
  }));

  // Middleware to check if user is authenticated via Supabase JWT
  const isAuthenticated = async (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers.authorization;
    
    // Check for JWT token in header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
      );
      
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        console.log("JWT authentication failed:", error?.message);
        return res.status(401).json({ message: "Invalid token" });
      }
      
      // Add user ID to request
      req.user = await db.getUser(user.id);
      return next();
    }
    
    // Check for session-based auth (fallback)
    if (req.session.userId) {
      const user = await db.getUser(req.session.userId);
      if (user) {
        req.user = user;
        return next();
      }
    }
    
    console.log("Authentication failed: No valid token or session");
    res.status(401).json({ message: "Unauthorized" });
  };

  // Public routes that don't require authentication

  // Get Supabase config
  app.get("/api/supabase-config", (req, res) => {
    res.json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
  });
  
  // Ensure user exists in public.users table (bypassing Supabase RLS)
  app.post("/api/ensure-user", async (req, res) => {
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
  app.get("/api/user", isAuthenticated, (req, res) => {
    res.json(req.user);
  });

  app.get("/api/report", isAuthenticated, async (req, res) => {
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

  // API routes for blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const blogPosts = await db.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
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

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
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

  // Log all verification links in development
  if (process.env.NODE_ENV !== "production") {
    // await logAllVerificationLinks(db);
  }

  return server;
}