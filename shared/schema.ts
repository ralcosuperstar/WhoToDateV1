import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - for authentication and profiles
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").unique(), // Clerk user ID for authentication
  username: text("username").notNull().unique(),
  password: text("password"), // Optional now as Clerk handles auth
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  imageUrl: text("image_url"), // Profile image from Clerk
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz answers - storing user responses
export const quizAnswers = pgTable("quiz_answers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  answers: jsonb("answers").notNull(), // JSON array of user answers
  completed: boolean("completed").default(false),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Compatibility reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  quizId: integer("quiz_id").notNull(),
  report: jsonb("report").notNull(), // Detailed report JSON
  compatibilityColor: text("compatibility_color").notNull(), // green, yellow, red
  isPaid: boolean("is_paid").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payments tracking
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  reportId: integer("report_id").notNull(),
  amount: integer("amount").notNull(), // Amount in paise
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull(), // success, failed, pending
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
});

// Schemas for inserts
export const insertUserSchema = createInsertSchema(users).pick({
  clerkId: true,
  username: true,
  password: true,
  email: true,
  fullName: true,
  imageUrl: true,
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
  compatibilityColor: true,
  isPaid: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  userId: true,
  reportId: true,
  amount: true,
  razorpayPaymentId: true,
  status: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  imageUrl: true,
  category: true,
});

// Types for frontend/backend usage
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuizAnswer = z.infer<typeof insertQuizAnswerSchema>;
export type QuizAnswer = typeof quizAnswers.$inferSelect;

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
