import { users, type User, type InsertUser, quizAnswers, reports, payments, blogPosts, type QuizAnswer, type InsertQuizAnswer, type Report, type InsertReport, type Payment, type InsertPayment, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { db, pool } from "./db";
import { eq, desc } from "drizzle-orm";
import { IStorage } from "./storage";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'sessions'
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user || undefined;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async setOTP(userId: string, otp: string, expiry: Date): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        otpCode: otp,
        otpExpiry: expiry,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async setVerificationToken(userId: string, token: string, expiry: Date): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        verificationToken: token,
        verificationTokenExpiry: expiry,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async verifyUser(userId: string): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
        otpCode: null,
        otpExpiry: null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Quiz operations
  async getQuizAnswers(userId: string): Promise<QuizAnswer | undefined> {
    const [quizAnswer] = await db
      .select()
      .from(quizAnswers)
      .where(eq(quizAnswers.userId, userId));
    return quizAnswer || undefined;
  }

  async createQuizAnswers(insertQuizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    const [quizAnswer] = await db
      .insert(quizAnswers)
      .values(insertQuizAnswer)
      .returning();
    return quizAnswer;
  }

  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    const [updatedQuizAnswer] = await db
      .update(quizAnswers)
      .set({
        answers,
        completed,
        updatedAt: new Date()
      })
      .where(eq(quizAnswers.id, id))
      .returning();
    return updatedQuizAnswer;
  }

  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    const [report] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, id));
    return report || undefined;
  }

  async getReportByUserId(userId: string): Promise<Report | undefined> {
    const [report] = await db
      .select()
      .from(reports)
      .where(eq(reports.userId, userId));
    return report || undefined;
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const [report] = await db
      .insert(reports)
      .values(insertReport)
      .returning();
    return report;
  }

  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    const [updatedReport] = await db
      .update(reports)
      .set({
        isPaid,
        updatedAt: new Date()
      })
      .where(eq(reports.id, id))
      .returning();
    return updatedReport;
  }

  // Payment operations
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.reportId, reportId));
    return payment || undefined;
  }

  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    const [updatedPayment] = await db
      .update(payments)
      .set({
        status,
        updatedAt: new Date()
      })
      .where(eq(payments.id, id))
      .returning();
    return updatedPayment;
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return blogPost;
  }

  async close(): Promise<void> {
    try {
      await pool.end();
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }
}

export const dbStorage = new DatabaseStorage();