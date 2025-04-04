import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pgStorage } from "./pgStorage";
import { db as dbConnection } from "./db"; // Import to check if connection is available
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
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "mydate-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 }, // 24 hours
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Authentication middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session.userId) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // API routes - prefixed with /api
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

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
        
        // Set session
        req.session.userId = user.id;
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
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
        
        // Set session
        req.session.userId = user.id;
        
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
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
      res.json({ message: "Logged out successfully" });
    });
  });

  apiRouter.get("/me", isAuthenticated, async (req, res) => {
    try {
      const user = await db.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
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
      
      // Check if user with this Clerk ID already exists
      const existingUser = await db.getUserByClerkId(clerkId);
      
      if (existingUser) {
        // Update existing user with the latest Clerk data
        const updatedUser = await db.updateUserByClerkId(clerkId, {
          email: email || existingUser.email,
          username: username || existingUser.username,
          fullName: fullName || existingUser.fullName,
          imageUrl: imageUrl || existingUser.imageUrl
        });
        
        // Set user session
        req.session.userId = updatedUser.id;
        
        const { password, ...userWithoutPassword } = updatedUser;
        return res.json(userWithoutPassword);
      }
      
      // Check if user exists with the same email but without clerk ID (existing app users)
      if (email) {
        const userByEmail = await db.getUserByEmail(email);
        
        if (userByEmail && !userByEmail.clerkId) {
          // Link existing account to Clerk
          const linkedUser = await db.linkUserToClerk(userByEmail.id, clerkId);
          
          // Update user profile data from Clerk
          const updatedUser = await db.updateUserByClerkId(clerkId, {
            username: username || userByEmail.username,
            fullName: fullName || userByEmail.fullName,
            imageUrl: imageUrl || userByEmail.imageUrl
          });
          
          // Set user session
          req.session.userId = updatedUser.id;
          
          const { password, ...userWithoutPassword } = updatedUser;
          return res.json(userWithoutPassword);
        }
      }
      
      // Create new user if none exists
      const newUser = await db.createUser({
        clerkId,
        email: email || `user_${clerkId}@placeholder.com`,
        username: username || `user_${clerkId}`,
        password: null, // Password is managed by Clerk
        fullName: fullName || null,
        imageUrl: imageUrl || null
      });
      
      // Set user session
      req.session.userId = newUser.id;
      
      const { password, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
      
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
      
      // Set user session
      req.session.userId = linkedUser.id;
      
      const { password, ...userWithoutPassword } = linkedUser;
      res.json(userWithoutPassword);
      
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
