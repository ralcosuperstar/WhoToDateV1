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
      const { firstName, lastName, email, phoneNumber, username, password } = req.body;
      
      // Validate required fields
      if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ 
          error: "Missing required fields",
          message: "Please provide all required fields: first name, last name, email, username, and password."
        });
      }

      // Check if username or email already exists
      const existingUsername = await db.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const existingEmail = await db.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Check for duplicate phone number if provided
      if (phoneNumber) {
        const existingPhone = await db.getUserByPhoneNumber(phoneNumber);
        if (existingPhone) {
          return res.status(400).json({ error: "Phone number already exists" });
        }
      }

      // Create new user directly
      const user = await db.createUser({
        username,
        password: await hashPassword(password),
        email,
        phoneNumber,
        firstName,
        lastName,
        verificationMethod: 'email'
      });
      
      // Mark user as verified immediately
      await db.verifyUser(user.id);
      
      // Log in the user automatically after registration
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      
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
}