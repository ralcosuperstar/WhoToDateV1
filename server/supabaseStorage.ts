import { createClient, SupabaseClient } from '@supabase/supabase-js';
import session from "express-session";
import { IStorage } from './storage';
import { User, QuizAnswer, Report, Payment, BlogPost, InsertUser, InsertQuizAnswer, InsertReport, InsertPayment, InsertBlogPost } from '@shared/schema';
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create MemoryStore for development mode
const MemoryStore = createMemoryStore(session);

// Supabase storage implementation
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient | null = null;
  public sessionStore: session.Store;
  private devMode: boolean = false;

  constructor() {
    // Check if environment variables are set - no longer forcing development mode
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.warn('⚠️ Running in DEVELOPMENT MODE with mock data');
      console.log('ℹ️ This is intentional during the Supabase migration phase');
      
      this.devMode = true;
      
      // Set up in-memory session store for development
      this.sessionStore = new MemoryStore({
        checkPeriod: 86400000 // Prune expired entries every 24h
      });
    } else {
      // Initialize Supabase with service key for admin privileges
      try {
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
        
        // Log a connection attempt message - we'll test the connection on first use
        console.log('✅ Connecting to Supabase...'); 
        console.log('✅ Supabase client initialized successfully');
        
        // Set up session store with PostgreSQL if possible, otherwise use memory store
        if (process.env.DATABASE_URL) {
          const PostgresSessionStore = connectPg(session);
          this.sessionStore = new PostgresSessionStore({
            conString: process.env.DATABASE_URL,
            createTableIfMissing: true
          });
        } else {
          console.warn('⚠️ No DATABASE_URL found. Using in-memory session store.');
          this.sessionStore = new MemoryStore({
            checkPeriod: 86400000 // Prune expired entries every 24h
          });
        }
      } catch (error) {
        console.error('❌ Failed to connect to Supabase:', error);
        console.warn('⚠️ Falling back to development mode');
        
        this.devMode = true;
        
        // Use in-memory session store for fallback
        this.sessionStore = new MemoryStore({
          checkPeriod: 86400000 // Prune expired entries every 24h
        });
      }
    }
  }

  // Test the connection to Supabase
  private async testConnection() {
    if (this.devMode || !this.client) {
      return false;
    }
    
    try {
      // Test connection by fetching a dummy record
      const { error: testError } = await this.client
        .from('users')
        .select('count')
        .limit(1);
        
      if (testError) {
        console.error('❌ Failed to connect to Supabase database:', testError.message);
        this.devMode = true;
        return false;
      }
      
      console.log('✅ Supabase connection verified successfully');
      return true;
    } catch (error) {
      console.error('❌ Error testing Supabase connection:', error);
      this.devMode = true;
      return false;
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Returning mock user data');
      return {
        id,
        email: 'demo@example.com',
        username: 'demouser',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: 'Demo',
        lastName: 'User',
        phoneNumber: '+919876543210'
      } as User;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    // Test connection on first use
    await this.testConnection();
    
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Checking username:', username);
      if (username === 'demouser' || username === 'testuser') {
        return {
          id: 'dev-user-id-' + Math.random().toString(36).substring(2, 10),
          email: username + '@example.com',
          username,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          firstName: username === 'demouser' ? 'Demo' : 'Test',
          lastName: 'User',
          phoneNumber: '+919876543210'
        } as User;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Returning mock user data for email:', email);
      // Only return a user for a few test emails
      if (email === 'demo@example.com' || email === 'test@example.com') {
        return {
          id: 'dev-user-id-' + Math.random().toString(36).substring(2, 10),
          email,
          username: email.split('@')[0],
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          firstName: 'Demo',
          lastName: 'User',
          phoneNumber: '+919876543210'
        } as User;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Looking up verification token (mock data)');
      // Mock for token verification
      if (token === 'mock-valid-token') {
        return {
          id: 'dev-user-id-' + Math.random().toString(36).substring(2, 10),
          email: 'verify@example.com',
          username: 'verifyuser',
          isVerified: false,  // Not yet verified
          createdAt: new Date(),
          updatedAt: new Date(),
          firstName: 'Verify',
          lastName: 'User',
          phoneNumber: '+919876543210'
        } as User;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('verification_token', token)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Looking up by phone number (mock data)');
      // Only mock a specific test phone number
      if (phoneNumber === '+919876543210') {
        return {
          id: 'dev-user-id-' + Math.random().toString(36).substring(2, 10),
          email: 'phone@example.com',
          username: 'phoneuser',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          firstName: 'Phone',
          lastName: 'User',
          phoneNumber: phoneNumber
        } as User;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as User;
  }

  async getAllUsers(): Promise<User[]> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Returning mock users list');
      // Return a small set of mock users
      return [
        {
          id: 'dev-user-id-1',
          email: 'demo@example.com',
          username: 'demouser',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          firstName: 'Demo',
          lastName: 'User',
          phoneNumber: '+919876543210'
        },
        {
          id: 'dev-user-id-2',
          email: 'test@example.com',
          username: 'testuser',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          firstName: 'Test',
          lastName: 'User',
          phoneNumber: '+919876543211'
        }
      ] as User[];
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('users')
      .select('*');

    if (error) throw error;
    return data as User[];
  }

  async createUser(user: InsertUser): Promise<User> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Creating mock user', user.email);
      // Create a mock user with a random ID
      const newUser: User = {
        id: 'dev-user-id-' + Math.random().toString(36).substring(2, 10),
        email: user.email,
        username: user.username || user.email?.split('@')[0] || 'newuser',
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      } as User;
      
      return newUser;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
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
    if (this.devMode) {
      console.log('⚠️ Development mode: Updating mock user', id);
      // Simulate updating a user by creating a new mock object
      return {
        id,
        email: userData.email || 'updated@example.com',
        username: userData.username || 'updateduser',
        phoneNumber: userData.phoneNumber,
        firstName: userData.firstName || 'Updated',
        lastName: userData.lastName || 'User',
        isVerified: userData.isVerified || false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData
      } as User;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
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
    if (this.devMode) {
      console.log('⚠️ Development mode: Getting quiz answers for user', userId);
      // Return mock quiz answers for a specific test user
      if (userId === 'dev-user-id-1' || userId === 'dev-user-id-2') {
        return {
          id: 1,
          userId: userId,
          answers: {
            personality: 'analytical',
            communicationStyle: 'direct',
            relationshipPreferences: {
              longTerm: true,
              shortTerm: false
            },
            interests: ['travel', 'reading', 'fitness'],
          },
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as QuizAnswer;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('quiz_answers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as QuizAnswer;
  }

  async createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Creating quiz answers');
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        userId: quizAnswer.userId,
        answers: quizAnswer.answers || {},
        completed: quizAnswer.completed || false,
        createdAt: new Date(),
        updatedAt: new Date()
      } as QuizAnswer;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('quiz_answers')
      .insert(quizAnswer)
      .select()
      .single();

    if (error) throw error;
    return data as QuizAnswer;
  }

  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Updating quiz answers', id);
      return {
        id: id,
        userId: 'dev-user-id-1', // Mock user ID
        answers: answers,
        completed: completed,
        createdAt: new Date(),
        updatedAt: new Date()
      } as QuizAnswer;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
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
    if (this.devMode) {
      console.log('⚠️ Development mode: Getting report by ID', id);
      if (id === 1) {
        return {
          id: 1,
          userId: 'dev-user-id-1',
          quizId: 1,
          compatibilityProfile: {
            personalityType: 'analytical',
            communicationStyle: 'direct',
            relationshipValues: ['trust', 'independence', 'growth'],
            compatibilityScore: 85,
            strengths: ['problem-solving', 'honesty', 'loyalty'],
            growthAreas: ['emotional expression', 'patience'],
            recommendedPartnerTraits: ['empathetic', 'patient', 'expressive']
          },
          isPaid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as Report;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('reports')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as Report;
  }

  async getReportByUserId(userId: string): Promise<Report | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Getting report for user', userId);
      if (userId === 'dev-user-id-1' || userId === 'dev-user-id-2') {
        return {
          id: 1,
          userId: userId,
          quizId: 1,
          compatibilityProfile: {
            personalityType: 'analytical',
            communicationStyle: 'direct',
            relationshipValues: ['trust', 'independence', 'growth'],
            compatibilityScore: 85,
            strengths: ['problem-solving', 'honesty', 'loyalty'],
            growthAreas: ['emotional expression', 'patience'],
            recommendedPartnerTraits: ['empathetic', 'patient', 'expressive']
          },
          isPaid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as Report;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as Report;
  }

  async createReport(report: InsertReport): Promise<Report> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Creating report for user', report.userId);
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        userId: report.userId,
        quizId: report.quizId || 1,
        compatibilityProfile: report.compatibilityProfile || {
          personalityType: 'analytical',
          communicationStyle: 'direct',
          relationshipValues: ['trust', 'independence', 'growth'],
          compatibilityScore: 85
        },
        isPaid: report.isPaid || false,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Report;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('reports')
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return data as Report;
  }

  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Updating report payment status', id, isPaid);
      return {
        id: id,
        userId: 'dev-user-id-1',
        quizId: 1,
        compatibilityProfile: {
          personalityType: 'analytical',
          communicationStyle: 'direct',
          relationshipValues: ['trust', 'independence', 'growth'],
          compatibilityScore: 85
        },
        isPaid: isPaid,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Report;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
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
    if (this.devMode) {
      console.log('⚠️ Development mode: Creating payment record');
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        userId: payment.userId,
        reportId: payment.reportId,
        amount: payment.amount,
        currency: payment.currency || 'INR',
        paymentMethod: payment.paymentMethod || 'card',
        transactionId: 'dev-tx-' + Math.random().toString(36).substring(2, 10),
        status: payment.status || 'success',
        createdAt: new Date(),
        updatedAt: new Date()
      } as Payment;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('payments')
      .insert(payment)
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  }

  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Getting payment for report', reportId);
      if (reportId === 1) {
        return {
          id: 1,
          userId: 'dev-user-id-1',
          reportId: reportId,
          amount: 999,
          currency: 'INR',
          paymentMethod: 'card',
          transactionId: 'dev-tx-123456',
          status: 'success',
          createdAt: new Date(),
          updatedAt: new Date()
        } as Payment;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('report_id', reportId)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as Payment;
  }

  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Updating payment status', id, status);
      return {
        id: id,
        userId: 'dev-user-id-1',
        reportId: 1,
        amount: 999,
        currency: 'INR',
        paymentMethod: 'card',
        transactionId: 'dev-tx-123456',
        status: status,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Payment;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
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
    if (this.devMode) {
      console.log('⚠️ Development mode: Returning mock blog posts');
      return [
        {
          id: 1,
          title: 'Understanding Relationship Compatibility',
          slug: 'understanding-relationship-compatibility',
          content: 'Relationships are complex, and compatibility is multifaceted...',
          summary: 'Learn the science behind relationship compatibility and how to use it to find better matches.',
          imageUrl: 'https://example.com/blog/compatibility.jpg',
          author: 'Dr. Sharma',
          category: 'Relationship Science',
          published: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: 'Communication Styles in Modern Dating',
          slug: 'communication-styles-modern-dating',
          content: 'Good communication is the foundation of any healthy relationship...',
          summary: 'Discover the different communication styles and how they impact your relationships.',
          imageUrl: 'https://example.com/blog/communication.jpg',
          author: 'Priya Patel',
          category: 'Dating Tips',
          published: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as BlogPost[];
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as BlogPost[];
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Getting blog post by ID', id);
      if (id === 1) {
        return {
          id: 1,
          title: 'Understanding Relationship Compatibility',
          slug: 'understanding-relationship-compatibility',
          content: 'Relationships are complex, and compatibility is multifaceted...',
          summary: 'Learn the science behind relationship compatibility and how to use it to find better matches.',
          imageUrl: 'https://example.com/blog/compatibility.jpg',
          author: 'Dr. Sharma',
          category: 'Relationship Science',
          published: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as BlogPost;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as BlogPost;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Getting blog post by slug', slug);
      if (slug === 'understanding-relationship-compatibility') {
        return {
          id: 1,
          title: 'Understanding Relationship Compatibility',
          slug: slug,
          content: 'Relationships are complex, and compatibility is multifaceted...',
          summary: 'Learn the science behind relationship compatibility and how to use it to find better matches.',
          imageUrl: 'https://example.com/blog/compatibility.jpg',
          author: 'Dr. Sharma',
          category: 'Relationship Science',
          published: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as BlogPost;
      }
      return undefined;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await this.client
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) return undefined;
    return data as BlogPost;
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    if (this.devMode) {
      console.log('⚠️ Development mode: Creating blog post', blogPost.title);
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        title: blogPost.title,
        slug: blogPost.slug,
        content: blogPost.content,
        summary: blogPost.summary || 'A blog post about relationships and compatibility.',
        imageUrl: blogPost.imageUrl || 'https://example.com/blog/default.jpg',
        author: blogPost.author || 'Admin',
        category: blogPost.category || 'General',
        published: blogPost.published ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as BlogPost;
    }
    
    if (!this.client) {
      throw new Error('Supabase client not initialized');
    }
    
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
    if (this.client) {
      try {
        // Close the Supabase connection if needed
        console.log('Closing Supabase connection...');
        // There's no explicit 'close' method for Supabase, so we just nullify the client
        this.client = null;
      } catch (error) {
        console.error('Error closing Supabase connection:', error);
      }
    }
  }
}

// Export an instance for global use
export const supabaseStorage = new SupabaseStorage();