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
      if (!req.user) {
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
      const quiz = await db.getQuizAnswers(req.user.id);
      if (!quiz) {
        return res.status(404).json({ 
          message: "Quiz not found. Please complete the quiz before generating a report."
        });
      }
      
      // Ensure the quiz is actually completed
      if (!quiz.completed) {
        return res.status(400).json({
          message: "Quiz is not complete. Please answer all questions before generating a report."
        });
      }
      
      // Prepare the report data with values for required fields
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
      
      // Check if a report already exists for this user
      const existingReport = await db.getReportByUserId(req.user.id);
      if (existingReport) {
        log(`Report already exists for user: ${req.user.id}, returning existing report`);
        return res.status(200).json(existingReport);
      }
      
      // Create a new report - all reports are free now
      log(`Creating new report for user: ${req.user.id}`);
      const report = await db.createReport({
        ...reportData,
        isPaid: true // Mark all reports as paid 
      });
      
      log(`Report created successfully: ${report.id}`);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        log(`Validation error creating report: ${JSON.stringify(error.errors)}`);
        return res.status(400).json({ message: "Invalid report data", errors: error.errors });
      }
      
      log(`Error creating report: ${error instanceof Error ? error.message : String(error)}`);
      res.status(500).json({ message: "Failed to create report. Please try again." });
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

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}