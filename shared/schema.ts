import { pgTable, text, serial, integer, boolean, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - matches actual database structure
export const users = pgTable("users", {
  id: text("id").primaryKey(), // UUID from Supabase Auth as primary key
  username: text("username"), // Username can be null initially
  password: text("password"), // Password may be null for social auth
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").unique(), // Phone number for SMS verification
  firstName: text("first_name"),
  lastName: text("last_name"),
  fullName: text("full_name"), // Legacy field
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  imageUrl: text("image_url"), // Profile image
  isVerified: boolean("is_verified").default(false), // Whether user has been verified
  verificationMethod: text("verification_method"), // "email" or "sms"
  verificationToken: text("verification_token"), // Token for email verification
  verificationTokenExpiry: timestamp("verification_token_expiry", { withTimezone: false }), // Expiry for verification token
  otpCode: text("otp_code"), // OTP code for SMS verification
  otpExpiry: timestamp("otp_expiry", { withTimezone: false }), // Expiry time for OTP code
  clerkId: text("clerk_id"), // Legacy field - kept for backward compatibility
  createdAt: timestamp("created_at", { withTimezone: false }).defaultNow(),
  // removed updatedAt as it doesn't exist in the database
});

// Quiz answers - storing user responses
export const quizAnswers = pgTable("quiz_answers", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Supabase Auth UUID (string)
  answers: jsonb("answers").notNull().default('{}'), // JSON object of user answers
  completed: boolean("completed").default(false),
  startedAt: timestamp("started_at", { withTimezone: false }), // When the quiz was started
  completedAt: timestamp("completed_at", { withTimezone: false }), // When the quiz was completed
});

// Compatibility reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Supabase Auth UUID (string)
  quizId: integer("quiz_id"), // References quiz_answers.id
  report: jsonb("report").notNull().default('{}'), // Full report data as JSON
  isPaid: boolean("is_paid").default(false),
  compatibilityColor: text("compatibility_color"), // Color code for compatibility level
  createdAt: timestamp("created_at", { withTimezone: false }).defaultNow(),
});

// Payments tracking
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Supabase Auth UUID (string)
  reportId: integer("report_id").notNull(), // References reports.id
  amount: integer("amount").notNull(), // Amount in cents/paise
  status: text("status").default('pending'), // success, failed, pending
  razorpayPaymentId: text("razorpay_payment_id"), // Payment gateway transaction ID
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"), // Short summary of the post
  imageUrl: text("image_url"),
  category: text("category"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
});

// Counselors table
export const counselors = pgTable("counselors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(), // e.g., "Relationship Counselor"
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  specialties: jsonb("specialties").default('[]'), // Array of specialties as JSON
  experience: text("experience"), // e.g., "10+ years"
  isFeatured: boolean("is_featured").default(false),
  isVerified: boolean("is_verified").default(false),
  availability: jsonb("availability").default('[]'), // JSON array of available time slots
  contactType: text("contact_type"), // "whatsapp", "calendar", etc.
  contactUrl: text("contact_url"), // WhatsApp number or calendar booking URL
  price: text("price"), // Price information (could be range or specific amount)
  rating: text("rating"), // Rating out of 5 stored as text
  testimonials: jsonb("testimonials").default('[]'), // Array of testimonials as JSON
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

// Schemas for inserts
export const insertUserSchema = createInsertSchema(users).pick({
  id: true, // UUID from Supabase Auth
  username: true,
  password: true,
  email: true,
  phoneNumber: true,
  firstName: true,
  lastName: true,
  fullName: true, 
  dateOfBirth: true,
  gender: true,
  imageUrl: true,
  isVerified: true,
  verificationMethod: true,
  clerkId: true,
});

export const insertQuizAnswerSchema = createInsertSchema(quizAnswers).pick({
  userId: true,
  answers: true,
  completed: true,
});

export const insertReportSchema = createInsertSchema(reports).pick({
  userId: true,
  quizId: true,
  report: true,
  isPaid: true,
  compatibilityColor: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  userId: true,
  reportId: true,
  amount: true,
  status: true,
  razorpayPaymentId: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  imageUrl: true,
  category: true,
  publishedAt: true,
});

export const insertCounselorSchema = createInsertSchema(counselors).pick({
  name: true,
  title: true,
  description: true,
  imageUrl: true,
  specialties: true,
  experience: true,
  isFeatured: true,
  isVerified: true,
  availability: true,
  contactType: true,
  contactUrl: true,
  price: true,
  rating: true,
  testimonials: true,
});

// Types for frontend/backend usage
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect & {
  // Non-persisted fields that may be sent from the API but are not in the database
  authToken?: string;
  emailVerificationSent?: boolean;
  updatedAt?: Date | null; // Added for backward compatibility since it was removed from the schema
};

export type InsertQuizAnswer = z.infer<typeof insertQuizAnswerSchema>;
export type QuizAnswer = typeof quizAnswers.$inferSelect;

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect & {
  // Non-persisted fields for backward compatibility
  updatedAt?: Date | null; // Added for backward compatibility since it was removed from the schema
  created_at?: Date | null; // Added for backward compatibility with older database schema
  createdAt?: Date | null; // Added for camelCase compatibility
  publishedAt?: Date | null; // Added for compatibility with blog publishing date
};

export type InsertCounselor = z.infer<typeof insertCounselorSchema>;
export type Counselor = typeof counselors.$inferSelect;
