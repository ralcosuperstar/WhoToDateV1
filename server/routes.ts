import express, { type Express, type Router, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import compression from "compression";
import { supabaseStorage } from "./supabaseStorage";
import { setupVite, serveStatic, log } from "./vite";
import { createClient } from '@supabase/supabase-js';
import { IStorage } from "./storage";
import { User } from '@shared/schema';

// Import utilities and middleware
import { errorMiddleware } from "./utils/error-handler";
import { requestLogger } from "./middleware/request-logger";

// Import services
import { initServices, cacheService as appCache } from "./services";

// Import route modules
import { initAPIRoutes } from "./routes/index";
import { setupSupabaseRoutes } from "./routes/supabase";
import { registerSupabaseSyncRoutes } from "./routes/supabase-sync";
import { setupDatabaseFixRoutes } from "./routes/database-fix";

// Use Supabase storage
const db: IStorage = supabaseStorage;

// Initialize services
const services = initServices(db);

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
  // Initialize all services
  const services = initServices(db);
  // Define the router to use - either the provided apiRouter or the main app
  const router = apiRouter || app;
  
  // Enable request compression
  app.use(compression());
  
  // Add request logging middleware
  app.use(requestLogger);
  
  // Add global error handling middleware
  app.use(errorMiddleware);

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

    // Check for Supabase session-based auth
    if (req.session.supabaseAuthenticated && req.session.userId) {
      try {
        console.log(`Authenticated via Supabase session for user ID: ${req.session.userId}`);

        // Try to get user by email first (more reliable with Supabase)
        if (req.session.email) {
          const user = await db.getUserByEmail(req.session.email);
          if (user) {
            req.user = user;
            return next();
          }
        }

        // Fall back to userId if email lookup fails
        try {
          const user = await db.getUser(req.session.userId);
          if (user) {
            req.user = user;
            return next();
          }
        } catch (idError) {
          console.error("Error fetching user by ID from session:", idError);
        }
      } catch (error) {
        console.error("Error in Supabase session authentication:", error);
      }
    }

    // Development mode fallback for testing
    if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_DEV_AUTH === 'true') {
      console.warn("⚠️ Using development authentication bypass");
      req.user = {
        id: 1, // Use numeric ID to match schema
        email: 'dev@example.com',
        username: 'devuser',
        password: 'hashed-password',
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

  // Database test routes removed

  // Set up Supabase sync routes
  registerSupabaseSyncRoutes(router, db);

  // Set up database fix routes
  setupDatabaseFixRoutes(app, router);

  // Register API feature routes using our modular approach
  const featureRoutes = initAPIRoutes({
    userService: services.userService,
    blogService: services.blogService,
    quizService: services.quizService,
    reportService: services.reportService,
    counselorService: services.counselorService,
    storage: db
  });
  router.use(featureRoutes);

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

  // Check if an email already exists in the system
  router.post("/check-email-exists", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: "Email is required" 
        });
      }

      // Check if user already exists in the database
      const existingUser = await db.getUserByEmail(email);

      // Return the result
      return res.json({ 
        success: true, 
        exists: !!existingUser,
        message: existingUser ? "Email already exists" : "Email is available" 
      });
    } catch (error) {
      console.error("Error in check-email-exists API:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check if email exists" 
      });
    }
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
    // Optionally support field selection
    const fields = req.query.fields?.toString()?.split(',') || null;
    
    if (fields) {
      // Return only requested fields
      const filteredUser: Record<string, any> = {};
      fields.forEach(field => {
        if (req.user && field in req.user) {
          filteredUser[field] = (req.user as Record<string, any>)[field];
        }
      });
      return res.json(filteredUser);
    }
    
    // Return full user object if no fields specified
    res.json(req.user);
  });
  
  // New combined profile endpoint that returns user, quiz, and report data in a single request
  router.get("/user-profile", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      
      // Set response cache header (short lived for authenticated data)
      res.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute
      
      // Use the appCache from the global cache instance to avoid redundant requests
      const cacheKey = `user-profile-${userId}`;
      const cachedData = appCache.get(cacheKey);
      
      if (cachedData) {
        console.log(`Cache hit for user profile: ${userId}`);
        return res.json(cachedData);
      }
      
      // Fetch all user data in parallel
      const [userQuiz, userReport] = await Promise.all([
        db.getQuizAnswers(userId).catch(err => {
          console.error(`Error fetching quiz answers for ${userId}:`, err);
          return null;
        }),
        db.getReportByUserId(userId).catch(err => {
          console.error(`Error fetching report for ${userId}:`, err);
          return null;
        })
      ]);
      
      // Build comprehensive profile object
      const profile = {
        user: req.user,
        quiz: userQuiz,
        report: userReport
      };
      
      // Cache the result
      appCache.set(cacheKey, profile);
      
      res.json(profile);
    } catch (error) {
      console.error("Error in user-profile endpoint:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch user profile" 
      });
    }
  });

  router.get("/report", isAuthenticated, async (req: Request, res: Response) => {
    console.log("========== REPORT ENDPOINT ACCESSED ==========");
    console.log("Request user:", req.user);

    try {
      const userId = req.user?.id;
      console.log("User ID extracted:", userId, "with type:", typeof userId);

      if (!userId) {
        console.log("No user ID found, returning 401");
        return res.status(401).json({ message: "Unauthorized" });
      }

      console.log("Fetching report for user ID:", userId, "with type:", typeof userId);
      console.log("Is development mode?", process.env.NODE_ENV !== 'production');
      console.log("ALLOW_DEV_AUTH:", process.env.ALLOW_DEV_AUTH);

      try {
        // In development mode, we can return a mock report for easier testing
        if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_DEV_AUTH === 'true') {
          console.log("⚠️ Using development report for testing");

          const mockReport = {
            id: 1,
            createdAt: new Date(),
            userId: userId,
            quizId: 1,
            report: {
              summary: "This is a development mode report for testing purposes.",
              strengths: ["Communication", "Empathy", "Patience"],
              challenges: ["Adaptability", "Conflict Resolution"],
              recommendations: ["Practice active listening", "Learn to manage expectations"]
            },
            isPaid: true,
            compatibilityColor: "green"
          };

          console.log("Returning mock report:", mockReport);
          console.log("========== REPORT ENDPOINT COMPLETED ==========");
          return res.json(mockReport);
        }

        // For normal operation
        console.log("Attempting to get report from database...");
        console.log("Storage object type:", typeof db, "with getReportByUserId:", typeof db.getReportByUserId);

        // Let's safely try to call getReportByUserId
        try {
          console.log("About to call db.getReportByUserId with userId:", userId);
          // CRITICAL CRASH DEBUG - Wrap everything in multiple try-catch blocks
          console.log("CRITICAL DEBUG: About to process report request");

          // Try to convert userId with safe error handling
          let userIdForQuery;
          try {
            console.log("CRITICAL DEBUG: Converting userId", userId, "type:", typeof userId);

            // This handles both string and number userId formats, maintaining type compatibility
            userIdForQuery = typeof userId === 'string' && !isNaN(Number(userId)) 
              ? Number(userId) 
              : userId;

            console.log("CRITICAL DEBUG: Converted to userIdForQuery:", userIdForQuery, "with type:", typeof userIdForQuery);
          } catch (conversionError) {
            console.error("CRITICAL ISSUE: Error converting userId:", conversionError);
            console.error("Using original userId without conversion");
            userIdForQuery = userId;
          }

          console.log("CRITICAL DEBUG: About to call db.getReportByUserId with:", userIdForQuery);

          // Use a fake report object to prevent crashes in development
          let report;

          // Try to call the database method safely
          try {
            console.log("CRITICAL DEBUG: Calling getReportByUserId, db object:", typeof db, "function type:", typeof db.getReportByUserId);
            report = await db.getReportByUserId(userIdForQuery);
            console.log("CRITICAL DEBUG: Report returned successfully:", report);
          } catch (dbMethodError) {
            console.error("CRITICAL ERROR in getReportByUserId call:", dbMethodError);
            console.error("Stack trace:", (dbMethodError as Error).stack);

            if (process.env.NODE_ENV !== 'production') {
              console.log("CRITICAL DEBUG: Using emergency fallback report for development");
              report = {
                id: 1,
                createdAt: new Date(),
                userId: userIdForQuery,
                quizId: 1,
                report: {
                  summary: "EMERGENCY FALLBACK REPORT - Database error occurred",
                  strengths: ["Database error recovery", "Error resilience"],
                  challenges: ["Database connectivity", "Type safety"],
                  recommendations: ["Check server logs for details"]
                },
                isPaid: true,
                compatibilityColor: "yellow"
              };
            } else {
              throw dbMethodError; // In production, we want to see the real error
            }
          }
          console.log("Got report result:", report);

          if (!report) {
            console.log("No report found, returning 404");
            return res.status(404).json({ message: "Report not found" });
          }

          console.log("Report found, returning:", report);
          console.log("========== REPORT ENDPOINT COMPLETED ==========");
          res.json(report);
        } catch (callError) {
          console.error("Error calling getReportByUserId:", callError);
          const typedError = callError as Error;
          console.error("Error message:", typedError.message);
          console.error("Error stack:", typedError.stack);
          throw callError; // Re-throw to be caught by the outer catch
        }
      } catch (dbError) {
        console.error("Database error when fetching report:", dbError);
        const typedDbError = dbError as Error;
        console.error("Error message:", typedDbError.message);
        console.error("Error stack:", typedDbError.stack);
        res.status(500).json({ message: "Database error fetching report" });
      }
    } catch (error) {
      console.error("Error in report endpoint:", error);
      const typedError = error as Error;
      console.error("Error message:", typedError.message);
      console.error("Error stack:", typedError.stack);
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  // Quiz API
  router.get("/quiz", isAuthenticated, async (req: Request, res: Response) => {
    console.log("========== QUIZ ENDPOINT ACCESSED ==========");
    console.log("Request user:", req.user);

    try {
      const userId = req.user?.id;
      console.log("User ID extracted:", userId, "with type:", typeof userId);

      if (!userId) {
        console.log("No user ID found, returning 401");
        return res.status(401).json({ message: "Unauthorized" });
      }

      console.log("Fetching quiz for user ID:", userId, "with type:", typeof userId);
      console.log("Is development mode?", process.env.NODE_ENV !== 'production');
      console.log("ALLOW_DEV_AUTH:", process.env.ALLOW_DEV_AUTH);

      // In development mode, we can return a mock quiz for easier testing
      if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_DEV_AUTH === 'true') {
        console.log("⚠️ Using development quiz for testing");
        const mockQuiz = {
          id: 1,
          userId: userId,
          answers: {
            personality: ["extroverted", "intuitive", "thinking", "judging"],
            values: ["honesty", "loyalty", "respect"],
            communication: ["direct", "thoughtful"]
          },
          completed: true,
          startedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          completedAt: new Date()
        };
        console.log("Returning mock quiz:", mockQuiz);
        console.log("========== QUIZ ENDPOINT COMPLETED ==========");
        return res.json(mockQuiz);
      }

      try {
        console.log("Attempting to get quiz from database...");
        console.log("Storage object type:", typeof db, "with getQuizAnswers:", typeof db.getQuizAnswers);

        // CRITICAL CRASH DEBUG - Wrap everything in multiple try-catch blocks
        console.log("CRITICAL DEBUG: About to process quiz request");

        // Try to convert userId with safe error handling
        let userIdForQuery;
        try {
          console.log("CRITICAL DEBUG: Converting userId", userId, "type:", typeof userId);

          // This handles both string and number userId formats, maintaining type compatibility
          userIdForQuery = typeof userId === 'string' && !isNaN(Number(userId)) 
            ? Number(userId) 
            : userId;

          console.log("CRITICAL DEBUG: Converted to userIdForQuery:", userIdForQuery, "with type:", typeof userIdForQuery);
        } catch (conversionError) {
          console.error("CRITICAL ISSUE: Error converting userId:", conversionError);
          console.error("Using original userId without conversion");
          userIdForQuery = userId;
        }

        console.log("CRITICAL DEBUG: About to call db.getQuizAnswers with:", userIdForQuery);

        // Use a fake quiz object to prevent crashes in development
        let quizAnswers;

        // Try to call the database method safely
        try {
          console.log("CRITICAL DEBUG: Calling getQuizAnswers, db object:", typeof db, "function type:", typeof db.getQuizAnswers);
          quizAnswers = await db.getQuizAnswers(userIdForQuery);
          console.log("CRITICAL DEBUG: Quiz answers returned successfully:", quizAnswers);
        } catch (dbMethodError) {
          console.error("CRITICAL ERROR in getQuizAnswers call:", dbMethodError);
          console.error("Stack trace:", (dbMethodError as Error).stack);

          if (process.env.NODE_ENV !== 'production') {
            console.log("CRITICAL DEBUG: Using emergency fallback quiz for development");
            quizAnswers = {
              id: 1,
              userId: userIdForQuery,
              answers: {
                personality: ["Error recovery detected", "Technical resilience"],
                values: ["Stability", "Reliability"],
                communication: ["Error handled gracefully"]
              },
              completed: true,
              startedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
              completedAt: new Date()
            };
          } else {
            throw dbMethodError; // In production, we want to see the real error
          }
        }
        console.log("Got quiz result:", quizAnswers);

        if (!quizAnswers) {
          console.log("No quiz found, returning 404");
          return res.status(404).json({ message: "Quiz not found" });
        }

        console.log("Quiz found, returning:", quizAnswers);
        console.log("========== QUIZ ENDPOINT COMPLETED ==========");
        res.json(quizAnswers);
      } catch (dbError) {
        console.error("Database error when fetching quiz:", dbError);
        const typedDbError = dbError as Error;
        console.error("Error message:", typedDbError.message);
        console.error("Error stack:", typedDbError.stack);
        res.status(500).json({ message: "Database error fetching quiz" });
      }
    } catch (error) {
      console.error("Error in quiz endpoint:", error);
      const typedError = error as Error;
      console.error("Error message:", typedError.message);
      console.error("Error stack:", typedError.stack);
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  // Helper function to invalidate user-related cache entries when data is updated
  const invalidateUserCache = (userId: string | number) => {
    // Invalidate user profile cache
    appCache.del(`user-profile-${userId}`);
    console.log(`Invalidated cache for user profile: ${userId}`);
  };
  
  router.post("/quiz", isAuthenticated, async (req: Request, res: Response) => {
    console.log("========== POST QUIZ ENDPOINT ACCESSED ==========");
    console.log("Request user:", req.user);

    try {
      const userId = req.user?.id;
      console.log("User ID extracted:", userId, "with type:", typeof userId);

      if (!userId) {
        console.log("No user ID found, returning 401");
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { answers, completed } = req.body;
      console.log("Received quiz data:", { answersReceived: !!answers, completed });

      if (!answers) {
        console.log("Missing quiz answers, returning 400");
        return res.status(400).json({ message: "Missing quiz answers" });
      }

      // CRITICAL CRASH DEBUG - Wrap everything in multiple try-catch blocks
      console.log("CRITICAL DEBUG: About to process POST quiz request");

      // Try to convert userId with safe error handling
      let userIdForQuery;
      try {
        console.log("CRITICAL DEBUG: Converting userId", userId, "type:", typeof userId);

        // This handles both string and number userId formats, maintaining type compatibility
        userIdForQuery = typeof userId === 'string' && !isNaN(Number(userId)) 
          ? Number(userId) 
          : userId;

        console.log("CRITICAL DEBUG: Converted to userIdForQuery:", userIdForQuery, "with type:", typeof userIdForQuery);
      } catch (conversionError) {
        console.error("CRITICAL ISSUE: Error converting userId:", conversionError);
        console.error("Using original userId without conversion");
        userIdForQuery = userId;
      }

      console.log("Using userIdForQuery:", userIdForQuery, "with type:", typeof userIdForQuery);

      try {
        // Check if user already has quiz answers
        console.log("CRITICAL DEBUG: About to call db.getQuizAnswers to check for existing answers");
        console.log("Checking for existing quiz answers...");

        let existingAnswers;
        try {
          existingAnswers = await db.getQuizAnswers(userIdForQuery);
          console.log("CRITICAL DEBUG: Successfully got existing answers:", existingAnswers);
        } catch (getError) {
          console.error("CRITICAL ERROR getting existing quiz answers:", getError);
          console.error("Stack trace:", (getError as Error).stack);
          console.log("Proceeding as if no existing answers were found");
          existingAnswers = null;
        }

        console.log("Existing answers:", existingAnswers);

        let quizAnswers;
        if (existingAnswers) {
          console.log("Updating existing answers with ID:", existingAnswers.id);
          // Update existing answers
          try {
            console.log("CRITICAL DEBUG: About to update quiz answers with ID:", existingAnswers.id);
            quizAnswers = await db.updateQuizAnswers(
              existingAnswers.id,
              answers,
              completed || false
            );
            console.log("CRITICAL DEBUG: Successfully updated quiz answers:", quizAnswers);
          } catch (updateError) {
            console.error("CRITICAL ERROR updating quiz answers:", updateError);
            console.error("Stack trace:", (updateError as Error).stack);

            if (process.env.NODE_ENV !== 'production') {
              console.log("CRITICAL DEBUG: Using emergency fallback for updated quiz in development");
              quizAnswers = {
                id: existingAnswers.id,
                userId: userIdForQuery,
                answers: answers,
                completed: completed || false,
                startedAt: existingAnswers.startedAt || new Date(),
                completedAt: completed ? new Date() : null
              };
            } else {
              throw updateError; // In production, we want to see the real error
            }
          }
        } else {
          console.log("Creating new quiz answers for user");
          // Create new answers
          try {
            console.log("CRITICAL DEBUG: About to create new quiz answers");
            quizAnswers = await db.createQuizAnswers({
              userId: userIdForQuery,
              answers,
              completed: completed || false
            });
            console.log("CRITICAL DEBUG: Successfully created quiz answers:", quizAnswers);
          } catch (createError) {
            console.error("CRITICAL ERROR creating quiz answers:", createError);
            console.error("Stack trace:", (createError as Error).stack);

            if (process.env.NODE_ENV !== 'production') {
              console.log("CRITICAL DEBUG: Using emergency fallback for created quiz in development");
              quizAnswers = {
                id: 999, // Temporary ID for development
                userId: userIdForQuery,
                answers: answers,
                completed: completed || false,
                startedAt: new Date(),
                completedAt: completed ? new Date() : null
              };
            } else {
              throw createError; // In production, we want to see the real error
            }
          }
        }

        // Invalidate relevant cache entries
        invalidateUserCache(userIdForQuery);
        
        console.log("Quiz saved successfully:", quizAnswers);
        console.log("========== POST QUIZ ENDPOINT COMPLETED ==========");
        res.json(quizAnswers);
      } catch (dbError) {
        console.error("Database error when saving quiz:", dbError);
        const typedDbError = dbError as Error;
        console.error("Error message:", typedDbError.message);
        console.error("Error stack:", typedDbError.stack);
        res.status(500).json({ message: "Database error saving quiz" });
      }
    } catch (error) {
      console.error("Error in quiz save endpoint:", error);
      const typedError = error as Error;
      console.error("Error message:", typedError.message);
      console.error("Error stack:", typedError.stack);
      res.status(500).json({ message: "Failed to save quiz" });
    }
  });

  // Optimized blog posts endpoint with pagination, filtering, and caching
  const getBlogPosts = async (req: Request, res: Response) => {
    try {
      // Set cache header for blog content (10 minutes)
      res.set('Cache-Control', 'public, max-age=600'); 
      
      // Parse pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;
      
      // Generate cache key based on query parameters
      const cacheKey = `blog-posts-${page}-${limit}`;
      const cachedData = appCache.get(cacheKey);
      
      if (cachedData) {
        console.log(`Cache hit for blog posts: page ${page}, limit ${limit}`);
        return res.json(cachedData);
      }
      
      // Fetch all posts for now (we'll paginate in memory since storage API doesn't support it directly)
      const allPosts = await db.getAllBlogPosts();
      
      // Get total count
      const total = allPosts.length;
      
      // Manual pagination
      const paginatedPosts = allPosts.slice(offset, offset + limit);
      
      // Prepare response with pagination metadata
      const response = {
        posts: paginatedPosts,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
      
      // Cache the result
      appCache.set(cacheKey, response);
      
      res.json(response);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  };
  
  // Primary blog endpoint
  router.get("/blog", getBlogPosts);
  
  // Legacy blog-posts endpoint (redirects to primary endpoint)
  router.get("/blog-posts", getBlogPosts);

  // Optimized blog post by ID endpoint with caching
  router.get("/blog-posts/:id", async (req: Request, res: Response) => {
    try {
      // Set strong cache for blog content (1 hour)
      res.set('Cache-Control', 'public, max-age=3600'); 
      
      const id = parseInt(req.params.id);
      
      // Generate cache key
      const cacheKey = `blog-post-id-${id}`;
      const cachedPost = appCache.get(cacheKey);
      
      if (cachedPost) {
        console.log(`Cache hit for blog post ID: ${id}`);
        return res.json(cachedPost);
      }
      
      const blogPost = await db.getBlogPostById(id);
      if (!blogPost) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }
      
      // Cache the result
      appCache.set(cacheKey, blogPost, 3600); // Cache for 1 hour
      
      // Generate ETag for client-side caching
      const etag = `"${id}-${blogPost.updatedAt || blogPost.createdAt || Date.now()}"`;
      res.set('ETag', etag);
      
      // Check If-None-Match header for client cache validation
      if (req.headers['if-none-match'] === etag) {
        return res.status(304).end(); // Not Modified
      }
      
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog post" 
      });
    }
  });

  // Shared function for fetching post by slug to avoid duplicate code
  const getBlogPostBySlug = async (req: Request, res: Response) => {
    try {
      // Set strong cache for blog content (1 hour)
      res.set('Cache-Control', 'public, max-age=3600');
      
      const slug = req.params.slug;
      
      // Generate cache key
      const cacheKey = `blog-post-slug-${slug}`;
      const cachedPost = appCache.get(cacheKey);
      
      if (cachedPost) {
        console.log(`Cache hit for blog post slug: ${slug}`);
        return res.json(cachedPost);
      }
      
      console.log(`Fetching blog post with slug: ${slug}`);
      const post = await db.getBlogPostBySlug(slug);
      
      if (!post) {
        console.log(`Blog post with slug ${slug} not found`);
        return res.status(404).json({ 
          success: false, 
          message: 'Blog post not found' 
        });
      }
      
      // Cache the result
      appCache.set(cacheKey, post, 3600); // Cache for 1 hour
      
      // Generate ETag for client-side caching
      const etag = `"${slug}-${post.updatedAt || post.createdAt || Date.now()}"`;
      res.set('ETag', etag);
      
      // Check If-None-Match header for client cache validation
      if (req.headers['if-none-match'] === etag) {
        return res.status(304).end(); // Not Modified
      }
      
      console.log(`Blog post found: ${post.title}`);
      res.json(post);
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch blog post' 
      });
    }
  };
  
  // Two identical routes for fetching by slug - one legacy, one current
  router.get("/blog-posts/slug/:slug", getBlogPostBySlug);
  router.get('/blog/:slug', getBlogPostBySlug);


  // Create HTTP server
  const server = createServer(app);

  // Development helpers
  if (process.env.NODE_ENV !== "production") {
    // Enable verification link logging if needed
    // await logAllVerificationLinks(db);

    // Log that we're in development mode
    console.log("⚠️ Running in development mode");
  }

  // API routes already registered above

  return server;
}