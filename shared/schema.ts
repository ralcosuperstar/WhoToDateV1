import { pgTable, text, serial, integer, boolean, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - extends Supabase auth.users
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // References auth.users(id) in Supabase
  username: text("username").unique(),
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
  verificationTokenExpiry: timestamp("verification_token_expiry", { withTimezone: true }), // Expiry for verification token
  otpCode: text("otp_code"), // OTP code for SMS verification
  otpExpiry: timestamp("otp_expiry", { withTimezone: true }), // Expiry time for OTP code
  clerkId: text("clerk_id").unique(), // Legacy field for Clerk integration
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Quiz answers - storing user responses
export const quizAnswers = pgTable("quiz_answers", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(), // References users.id
  answers: jsonb("answers").notNull().default('{}'), // JSON object of user answers
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Compatibility reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(), // References users.id
  quizId: integer("quiz_id"), // References quiz_answers.id
  compatibilityProfile: jsonb("compatibility_profile").notNull().default('{}'), // Detailed profile JSON
  isPaid: boolean("is_paid").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Payments tracking
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull(), // References users.id
  reportId: integer("report_id").notNull(), // References reports.id
  amount: integer("amount").notNull(), // Amount in cents/paise
  currency: text("currency").default('INR'),
  paymentMethod: text("payment_method"),
  transactionId: text("transaction_id"),
  status: text("status").default('pending'), // success, failed, pending
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  summary: text("summary"),
  author: text("author"),
  imageUrl: text("image_url"),
  category: text("category"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Schemas for inserts
export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  username: true,
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
  compatibilityProfile: true,
  isPaid: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  userId: true,
  reportId: true,
  amount: true,
  currency: true,
  paymentMethod: true,
  transactionId: true,
  status: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  summary: true,
  author: true,
  imageUrl: true,
  category: true,
  published: true,
});

// Types for frontend/backend usage
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect & {
  // Non-persisted fields that may be sent from the API but are not in the database
  authToken?: string;
  emailVerificationSent?: boolean;
};

export type InsertQuizAnswer = z.infer<typeof insertQuizAnswerSchema>;
export type QuizAnswer = typeof quizAnswers.$inferSelect;

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
