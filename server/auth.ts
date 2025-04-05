import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { IStorage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { generateVerificationToken, generateTokenExpiry, sendVerificationEmail, sendWelcomeEmail } from "./emailService";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express, db: IStorage) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'default-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: db.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username: string, password: string, done: (error: any, user?: any, options?: any) => void) => {
      try {
        const user = await db.getUserByUsername(username);
        // Check if user exists and if the password is valid
        if (!user || !user.password || !(await comparePasswords(password, user.password || ''))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user: Express.User, done: (err: any, id?: number) => void) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await db.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if username or email already exists
      const existingUsername = await db.getUserByUsername(req.body.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const existingEmail = await db.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create new user with verification fields set by default (not verified)
      const user = await db.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
        clerkId: null
      });

      // Generate verification token and expiry
      const verificationToken = generateVerificationToken();
      const tokenExpiry = generateTokenExpiry();
      
      // Update user with verification token and expiry
      const updatedUser = await db.setVerificationToken(user.id, verificationToken, tokenExpiry);
      
      // Send verification email
      const emailSent = await sendVerificationEmail(updatedUser, verificationToken);
      
      // Log in the user, but note they're unverified
      req.login(updatedUser, (err) => {
        if (err) return next(err);
        res.status(201).json({
          ...updatedUser,
          emailVerificationSent: emailSent
        });
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      
      // Check if user's email is verified
      if (!user.isVerified) {
        return res.status(403).json({ 
          error: "Email not verified", 
          message: "Please verify your email before logging in."
        });
      }
      
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Not authenticated" });
    res.json(req.user);
  });

  // Simple endpoint to check auth status
  app.get("/api/me", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Not authenticated" });
    res.json(req.user);
  });
  
  // API endpoint to verify email using token
  app.get("/api/verify", async (req, res, next) => {
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: "Invalid verification token" });
      }
      
      // Find user with this verification token
      const user = await db.getUserByVerificationToken(token);
      
      if (!user) {
        return res.status(400).json({ 
          error: "Invalid or expired verification token",
          message: "The verification link is invalid or has expired. Please request a new verification email."
        });
      }
      
      // Verify the user
      await db.verifyUser(user.id);
      
      // Send welcome email
      await sendWelcomeEmail(user);
      
      // If user is already logged in, update their session
      if (req.isAuthenticated() && req.user.id === user.id) {
        const verifiedUser = await db.getUser(user.id);
        if (verifiedUser) {
          req.login(verifiedUser, (err) => {
            if (err) return next(err);
          });
        }
      }
      
      // Return success and redirect to login page
      return res.redirect('/auth?verified=true');
    } catch (error) {
      next(error);
    }
  });
  
  // API endpoint to resend verification email
  app.post("/api/resend-verification", async (req, res, next) => {
    try {
      // Must be authenticated
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const user = req.user;
      
      // Check if already verified
      if (user.isVerified) {
        return res.status(400).json({ 
          error: "Already verified",
          message: "Your email is already verified."
        });
      }
      
      // Generate new verification token and expiry
      const verificationToken = generateVerificationToken();
      const tokenExpiry = generateTokenExpiry();
      
      // Update user with new verification token and expiry
      const updatedUser = await db.setVerificationToken(user.id, verificationToken, tokenExpiry);
      
      // Send verification email
      const emailSent = await sendVerificationEmail(updatedUser, verificationToken);
      
      // Return success
      return res.status(200).json({ 
        success: true,
        emailSent,
        message: "Verification email sent successfully."
      });
    } catch (error) {
      next(error);
    }
  });
}