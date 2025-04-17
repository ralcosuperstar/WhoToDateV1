import express, { type Express, Request, Response, NextFunction } from "express";
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
import { log } from "./vite";
import { setupAuth } from "./auth";
import { logAllVerificationLinks } from "./emailService";

// Select appropriate storage implementation
// Use PostgreSQL if DATABASE_URL is available and connection is successful, otherwise fallback to memory storage
// We're using IStorage to ensure both implementations are compatible
import { IStorage } from "./storage";
let db: IStorage = storage;

// Only use pgStorage if we have a database connection
if (process.env.DATABASE_URL && dbConnection) {
  try {
    // Add the session store from storage to pgStorage
    (pgStorage as any).sessionStore = storage.sessionStore;
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
  // Set up authentication with Passport
  setupAuth(app, db);

  // Authentication middleware with improved type safety
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    log(`isAuthenticated check: ${req.isAuthenticated()}`);
    
    if (req.isAuthenticated() && req.user) {
      log(`User is authenticated: ${req.user.id}`);
      return next();
    }
    
    log(`Authentication failed, not authenticated`);
    res.status(401).json({ message: "Unauthorized" });
  };

  // API routes - prefixed with /api
  const apiRouter = express.Router();
  app.use("/api", apiRouter);
  
  // Supabase configuration endpoint
  apiRouter.get("/supabase-config", (req, res) => {
    res.json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
  });
  
  // User endpoint - get the current authenticated user
  apiRouter.get("/user", (req, res) => {
    // req.isAuthenticated is added by passport
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // req.user is populated by passport when authenticated
    const user = req.user;
    
    // Don't send the password back to the client
    const { password, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
  });
  
  // Supabase integration - convert Supabase auth to Express session
  apiRouter.post("/supabase-sync", async (req, res) => {
    try {
      const { email, user_id } = req.body;
      
      if (!email || !user_id) {
        return res.status(400).json({ 
          error: "Bad request", 
          message: "Email and user_id are required" 
        });
      }
      
      log(`Attempting to sync Supabase user: ${email} (${user_id})`);
      
      // Look up user by email
      let user = await db.getUserByEmail(email);
      
      if (!user) {
        // If user doesn't exist, create a new one
        log(`User ${email} not found, creating new user record`);
        
        // Generate a random username based on email
        const username = `user_${Math.random().toString(36).substring(2, 10)}`;
        
        // Create the user
        user = await db.createUser({
          email,
          username,
          password: Math.random().toString(36).substring(2, 15), // Temporary password, not used for Supabase login
          fullName: email.split('@')[0], // Temporary name from email
          clerkId: user_id // Store Supabase ID in clerkId field for now
        });
        
        // Mark the user as verified
        user = await db.verifyUser(user.id);
      } else {
        // If user exists, update if needed
        log(`Found existing user: ${user.id} (${user.email})`);
        
        // Update the user with Supabase ID if needed
        if (!user.clerkId) {
          log(`Updating user ${user.id} with Supabase ID: ${user_id}`);
          user = await db.updateUser(user.id, { 
            clerkId: user_id
          });
          
          // Also verify the user if they're not already verified
          if (!user.isVerified) {
            user = await db.verifyUser(user.id);
          }
        }
      }
      
      // Establish the session
      if (req.session) {
        req.session.userId = user.id;
        log(`Session established for user ${user.id}`);
      }
      
      // Return the user without sensitive fields
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
      
    } catch (error) {
      console.error("Error syncing Supabase user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Update user profile endpoint
  apiRouter.put("/user/profile", isAuthenticated, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const { fullName, email } = req.body;
      
      // Validate input
      if (email && !email.includes('@')) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      
      // Update user with provided fields
      const updatedUser = await db.updateUser(req.user.id, { 
        fullName: fullName || undefined,
        email: email || undefined
      });
      
      // Don't send the password back to the client
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Quiz and report routes - access to these requires authentication
  apiRouter.post("/quiz", isAuthenticated, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const quizData = insertQuizAnswerSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      try {
        // Check if user already has quiz answers
        const existingQuiz = await db.getQuizAnswers(req.user.id);
        
        if (existingQuiz) {
          // Update existing quiz
          const updatedQuiz = await db.updateQuizAnswers(
            existingQuiz.id,
            quizData.answers,
            quizData.completed || false
          );
          return res.json(updatedQuiz);
        }
        
        // Create new quiz
        const quiz = await db.createQuizAnswers(quizData);
        res.status(201).json(quiz);
      } catch (dbError) {
        log(`Database error during quiz save: ${dbError}`);
        throw dbError;
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
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const quiz = await db.getQuizAnswers(req.user.id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Quiz fetch error:", error);
      res.status(500).json({ message: "Failed to get quiz" });
    }
  });

  apiRouter.post("/report", isAuthenticated, async (req, res) => {
    try {
      console.log("==== POST /api/report - START ====");
      if (!req.user) {
        console.log("No authenticated user found");
        return res.status(401).json({ message: "Authentication required" });
      }
      
      log(`Creating report for user: ${req.user.id}`);
      
      // Log what we received in the request body for debugging
      console.log("Received report request body:", JSON.stringify(req.body, null, 2));
      
      // Validate required fields - we need a quizId at minimum
      if (!req.body.quizId) {
        return res.status(400).json({ 
          message: "Missing required field: quizId is required"
        });
      }
      
      // Also make sure there's some kind of profile data
      if (!req.body.compatibilityProfile && !req.body.report) {
        return res.status(400).json({
          message: "Missing required profile data"
        });
      }
      
      // First check if the quiz exists and belongs to this user
      console.log("Checking if quiz exists for user:", req.user.id);
      const quiz = await db.getQuizAnswers(req.user.id);
      console.log("Quiz found:", !!quiz, quiz ? JSON.stringify(quiz, null, 2) : "null");
      
      if (!quiz) {
        console.log("Quiz not found for user", req.user.id);
        return res.status(404).json({ 
          message: "Quiz not found. Please complete the quiz before generating a report."
        });
      }
      
      // Ensure the quiz is actually completed
      console.log("Checking if quiz is completed:", quiz.completed);
      if (!quiz.completed) {
        console.log("Quiz is not completed for user", req.user.id);
        return res.status(400).json({
          message: "Quiz is not complete. Please answer all questions before generating a report."
        });
      }
      
      // Prepare the report data with values for required fields
      console.log("Preparing report data with Zod schema");
      try {
        // Simplify by accepting existing fields but ensuring all required fields are present
        const reportData = insertReportSchema.parse({
          userId: req.user.id,
          quizId: quiz.id, // Use the verified quiz ID from the database
          
          // Use directly provided report or compatibilityProfile
          report: req.body.report || req.body.compatibilityProfile || {},
          
          // Use the provided compatibilityColor or extract from profile
          compatibilityColor: req.body.compatibilityColor || 
            (req.body.compatibilityProfile && req.body.compatibilityProfile.overallColor) || 
            (req.body.report && req.body.report.overallColor) || 
            'green',
            
          isPaid: true // All reports are free
        });
        
        console.log("Report data valid:", JSON.stringify({
          userId: reportData.userId,
          quizId: reportData.quizId,
          hasReportData: !!reportData.report,
          compatibilityColor: reportData.compatibilityColor,
          isPaid: reportData.isPaid
        }));
        
        // Check if a report already exists for this user
        console.log("Checking for existing report for user:", req.user.id);
        const existingReport = await db.getReportByUserId(req.user.id);
        console.log("Existing report found:", !!existingReport);
        
        if (existingReport) {
          log(`Report already exists for user: ${req.user.id}, returning existing report`);
          console.log("==== POST /api/report - RETURNING EXISTING REPORT ====");
          return res.status(200).json(existingReport);
        }
        
        // Create a new report - all reports are free now
        log(`Creating new report for user: ${req.user.id}`);
        console.log("Creating report with data:", JSON.stringify({
          userId: reportData.userId,
          quizId: reportData.quizId,
          hasReportData: !!reportData.report,
          compatibilityColor: reportData.compatibilityColor,
          isPaid: true
        }));
        
        const report = await db.createReport({
          ...reportData,
          isPaid: true // Mark all reports as paid 
        });
        
        log(`Report created successfully: ${report.id}`);
        console.log("==== POST /api/report - SUCCESS ====");
        res.status(201).json(report);
      } catch (parseError) {
        console.error("Error parsing report data:", parseError);
        if (parseError instanceof z.ZodError) {
          console.log("Zod validation errors:", JSON.stringify(parseError.errors));
          return res.status(400).json({ message: "Invalid report data", errors: parseError.errors });
        }
        throw parseError; // Re-throw if it's not a ZodError
      }
    } catch (error) {
      console.log("==== POST /api/report - ERROR CAUGHT ====");
      console.error("Error details:", error);
      
      if (error instanceof z.ZodError) {
        log(`Validation error creating report: ${JSON.stringify(error.errors)}`);
        console.log("Zod validation errors:", JSON.stringify(error.errors, null, 2));
        return res.status(400).json({ message: "Invalid report data", errors: error.errors });
      }
      
      // Log stack trace for other errors
      if (error instanceof Error && error.stack) {
        console.error("Error stack trace:", error.stack);
      }
      
      log(`Error creating report: ${error instanceof Error ? error.message : String(error)}`);
      console.error("Error creating report:", error instanceof Error ? error.message : String(error));
      res.status(500).json({ 
        message: "Failed to create report. Please try again.",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  apiRouter.get("/report", isAuthenticated, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const report = await db.getReportByUserId(req.user.id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to get report" });
    }
  });

  // Blog posts - no authentication required
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

  // Email verification endpoint
  apiRouter.get("/verify", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: "Invalid verification token" });
      }
      
      // Find user with this token
      const user = await db.getUserByVerificationToken(token);
      
      if (!user) {
        return res.status(404).json({ message: "Invalid or expired verification token" });
      }
      
      // Check if token has expired
      if (user.verificationTokenExpiry) {
        const now = new Date();
        const expiry = new Date(user.verificationTokenExpiry);
        
        if (now > expiry) {
          return res.status(400).json({ message: "Verification token has expired" });
        }
      }
      
      // Verify the user
      await db.verifyUser(user.id);
      
      // Redirect to login page with success message
      res.redirect(`/?verified=true`);
    } catch (error) {
      log(`Error verifying email: ${error instanceof Error ? error.message : String(error)}`);
      res.status(500).json({ message: "Failed to verify email" });
    }
  });
  
  // Debug endpoint to view all unverified users and their verification links
  // Only available in development environment
  apiRouter.get("/debug/verification-links", async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ message: "Not found" });
    }
    
    try {
      // Log all verification links to console
      await logAllVerificationLinks(db);
      
      // Return success message
      res.json({ message: "Verification links have been logged to the console. Check server logs." });
    } catch (error) {
      res.status(500).json({ message: "Failed to log verification links" });
    }
  });
  
  
  // Check environment variables - development only
  apiRouter.get("/debug/check-env", async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ message: "Not found" });
    }
    
    try {
      // Only check if the keys exist, not their values
      const resendAvailable = !!process.env.RESEND_API_KEY;
      const mailgunAvailable = !!(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN);
      
      res.json({
        env: process.env.NODE_ENV || "development",
        resend_available: resendAvailable,
        mailgun_available: mailgunAvailable
      });
    } catch (error) {
      log(`Error checking env vars: ${error instanceof Error ? error.message : String(error)}`);
      res.status(500).json({ message: "Failed to check environment variables" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}