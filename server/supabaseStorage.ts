import { createClient, SupabaseClient } from '@supabase/supabase-js';
import session from "express-session";
import { IStorage } from './storage';
import { User, QuizAnswer, Report, Payment, BlogPost, InsertUser, InsertQuizAnswer, InsertReport, InsertPayment, InsertBlogPost } from '@shared/schema';
import connectPg from "connect-pg-simple";

// Supabase storage implementation
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;
  public sessionStore: session.Store;

  constructor() {
    // Make sure environment variables are set
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      throw new Error('Missing required Supabase environment variables (SUPABASE_URL, SUPABASE_SERVICE_KEY)');
    }

    // Initialize Supabase with service key for admin privileges
    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        }
      }
    );

    // Set up session store
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('verification_token', token)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await this.client
      .from('users')
      .select('*');

    if (error) throw error;
    return data as User[];
  }

  async createUser(user: InsertUser): Promise<User> {
    // Ensure we don't try to insert with auto-generated fields
    const { data, error } = await this.client
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  }

  async setVerificationToken(userId: string, token: string, expiry: Date): Promise<User> {
    return this.updateUser(userId, {
      // Field names matching the database schema
      verification_token: token,
      verification_token_expiry: expiry.toISOString()
    } as any);
  }

  async verifyUser(userId: string): Promise<User> {
    return this.updateUser(userId, {
      // Field names matching the database schema
      is_verified: true,
      verification_token: null,
      verification_token_expiry: null
    } as any);
  }

  // OTP operations
  async setOTP(userId: string, otp: string, expiry: Date): Promise<User> {
    return this.updateUser(userId, {
      // Field names matching the database schema
      otp_code: otp,
      otp_expiry: expiry.toISOString()
    } as any);
  }

  // Quiz operations
  async getQuizAnswers(userId: string): Promise<QuizAnswer | undefined> {
    const { data, error } = await this.client
      .from('quiz_answers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as QuizAnswer;
  }

  async createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    const { data, error } = await this.client
      .from('quiz_answers')
      .insert(quizAnswer)
      .select()
      .single();

    if (error) throw error;
    return data as QuizAnswer;
  }

  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    const { data, error } = await this.client
      .from('quiz_answers')
      .update({ answers, completed, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as QuizAnswer;
  }

  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    const { data, error } = await this.client
      .from('reports')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as Report;
  }

  async getReportByUserId(userId: string): Promise<Report | undefined> {
    const { data, error } = await this.client
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as Report;
  }

  async createReport(report: InsertReport): Promise<Report> {
    const { data, error } = await this.client
      .from('reports')
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return data as Report;
  }

  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    const { data, error } = await this.client
      .from('reports')
      .update({ isPaid, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Report;
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .insert(payment)
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  }

  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('report_id', reportId)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as Payment;
  }

  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .update({ status, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await this.client
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as BlogPost[];
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const { data, error } = await this.client
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as BlogPost;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const { data, error } = await this.client
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as BlogPost;
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const { data, error } = await this.client
      .from('blog_posts')
      .insert(blogPost)
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  }

  // Utility to close any connections
  async close() {
    // No specific cleanup needed for Supabase
  }
}

// Export an instance for global use
export const supabaseStorage = new SupabaseStorage();