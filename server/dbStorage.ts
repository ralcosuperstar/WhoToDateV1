import { users, quizAnswers, reports, payments, blogPosts } from "@shared/schema";
import { User, InsertUser, QuizAnswer, InsertQuizAnswer, Report, InsertReport, Payment, InsertPayment, BlogPost, InsertBlogPost } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Create a session store with the pool
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true,
      // Fix for createTableIfMissing not expecting updated_at column
      tableName: 'session'
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error in getUser:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Error in getUserByUsername:", error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user;
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      return undefined;
    }
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
      return user;
    } catch (error) {
      console.error("Error in getUserByVerificationToken:", error);
      return undefined;
    }
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    try {
      if (!phoneNumber) return undefined;
      const [user] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
      return user;
    } catch (error) {
      console.error("Error in getUserByPhoneNumber:", error);
      return undefined;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      return [];
    }
  }

  async createUser(user: Partial<InsertUser>): Promise<User> {
    try {
      const [newUser] = await db.insert(users).values(user).returning();
      return newUser;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  }

  async setOTP(userId: number, otp: string, expiry: Date): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          otpCode: otp,
          otpExpiry: expiry
        })
        .where(eq(users.id, userId))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error("Error in setOTP:", error);
      throw error;
    }
  }

  async setVerificationToken(userId: number, token: string, expiry: Date): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          verificationToken: token,
          verificationTokenExpiry: expiry
        })
        .where(eq(users.id, userId))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error("Error in setVerificationToken:", error);
      throw error;
    }
  }

  async verifyUser(userId: number): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          isVerified: true,
          verificationToken: null,
          verificationTokenExpiry: null,
          otpCode: null,
          otpExpiry: null
        })
        .where(eq(users.id, userId))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error("Error in verifyUser:", error);
      throw error;
    }
  }

  // Quiz operations 
  // Note: userId is a string in the interface but the schema uses uuid  
  // We'll need to update the schema or convert types
  async getQuizAnswers(userId: string): Promise<QuizAnswer | undefined> {
    try {
      const [quizAnswer] = await db
        .select()
        .from(quizAnswers)
        .where(eq(quizAnswers.userId, userId));
      return quizAnswer;
    } catch (error) {
      console.error("Error in getQuizAnswers:", error);
      return undefined;
    }
  }

  async createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    try {
      const [newQuizAnswer] = await db
        .insert(quizAnswers)
        .values(quizAnswer)
        .returning();
      return newQuizAnswer;
    } catch (error) {
      console.error("Error in createQuizAnswers:", error);
      throw error;
    }
  }

  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    try {
      const [updatedQuizAnswer] = await db
        .update(quizAnswers)
        .set({
          answers,
          completed
        })
        .where(eq(quizAnswers.id, id))
        .returning();
      return updatedQuizAnswer;
    } catch (error) {
      console.error("Error in updateQuizAnswers:", error);
      throw error;
    }
  }

  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    try {
      const [report] = await db
        .select()
        .from(reports)
        .where(eq(reports.id, id));
      return report;
    } catch (error) {
      console.error("Error in getReport:", error);
      return undefined;
    }
  }

  async getReportByUserId(userId: string): Promise<Report | undefined> {
    try {
      const [report] = await db
        .select()
        .from(reports)
        .where(eq(reports.userId, userId));
      return report;
    } catch (error) {
      console.error("Error in getReportByUserId:", error);
      return undefined;
    }
  }

  async createReport(report: InsertReport): Promise<Report> {
    try {
      const [newReport] = await db
        .insert(reports)
        .values(report)
        .returning();
      return newReport;
    } catch (error) {
      console.error("Error in createReport:", error);
      throw error;
    }
  }

  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    try {
      const [updatedReport] = await db
        .update(reports)
        .set({ isPaid })
        .where(eq(reports.id, id))
        .returning();
      return updatedReport;
    } catch (error) {
      console.error("Error in updateReportPaymentStatus:", error);
      throw error;
    }
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    try {
      const [newPayment] = await db
        .insert(payments)
        .values(payment)
        .returning();
      return newPayment;
    } catch (error) {
      console.error("Error in createPayment:", error);
      throw error;
    }
  }

  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    try {
      const [payment] = await db
        .select()
        .from(payments)
        .where(eq(payments.reportId, reportId));
      return payment;
    } catch (error) {
      console.error("Error in getPaymentByReportId:", error);
      return undefined;
    }
  }

  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    try {
      const [updatedPayment] = await db
        .update(payments)
        .set({ status })
        .where(eq(payments.id, id))
        .returning();
      return updatedPayment;
    } catch (error) {
      console.error("Error in updatePaymentStatus:", error);
      throw error;
    }
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      return await db.select().from(blogPosts);
    } catch (error) {
      console.error("Error in getAllBlogPosts:", error);
      return [];
    }
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    try {
      const [blogPost] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, id));
      return blogPost;
    } catch (error) {
      console.error("Error in getBlogPostById:", error);
      return undefined;
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const [blogPost] = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug));
      return blogPost;
    } catch (error) {
      console.error("Error in getBlogPostBySlug:", error);
      return undefined;
    }
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    try {
      const [newBlogPost] = await db
        .insert(blogPosts)
        .values(blogPost)
        .returning();
      return newBlogPost;
    } catch (error) {
      console.error("Error in createBlogPost:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    // No action needed, pool will be closed elsewhere
  }
}

export const dbStorage = new DatabaseStorage();