import { eq } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js';

// Import the IStorage interface for implementation
import { IStorage } from './storage';
// Import all necessary types and tables from schema
import {
  InsertUser,
  User,
  InsertQuizAnswer,
  QuizAnswer,
  InsertReport,
  Report,
  InsertPayment,
  Payment,
  InsertBlogPost,
  BlogPost,
  users,
  quizAnswers,
  reports,
  payments,
  blogPosts
} from '../shared/schema';

// Import the Supabase client from db.ts
import { supabaseAdmin as db } from './db';

// Import session for Store type
import session from 'express-session';
import createMemoryStore from 'memorystore';

export class PgStorage implements IStorage {
  // Make db a private class property using imported db
  private _db = db;
  
  // Session store for auth persistence
  public sessionStore: session.Store;
  
  constructor() {
    // Use memory store for session storage with Supabase
    // This is because we're now using Supabase Auth directly and don't need PostgreSQL session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
    });
    
    console.log('✅ Connecting to Supabase...');
    
    // Check if we have a valid Supabase connection
    if (this._db) {
      // Verify Supabase connection 
      this._db.from('users').select('*', { count: 'exact', head: true })
        .then(({ error }) => {
          if (error) {
            console.error('❌ Failed to connect to Supabase:', error.message);
          } else {
            console.log('✅ Supabase client initialized successfully');
            
            // Initialize blog posts after connection is verified
            setTimeout(() => {
              this.initializeBlogPosts().catch(err => 
                console.error('Failed to initialize blog posts:', err)
              );
            }, 1000);
          }
        })
        .catch(err => {
          console.error('❌ Error checking Supabase connection:', err);
        });
    } else {
      console.warn("❌ PgStorage initialized without Supabase connection - operations will fail!");
    }
  }
  
  // User operations - adapted for Supabase API
  async getUser(id: number): Promise<User | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    const { data, error } = await this._db.from('users').select('*').eq('id', id).single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    
    return data as unknown as User;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    const { data, error } = await this._db.from('users').select('*').eq('username', username).single();
    
    if (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
    
    return data as unknown as User;
  }
  
  async getAllUsers(): Promise<User[]> {
    if (!this._db) throw new Error("Supabase connection not available");
    const { data, error } = await this._db.from('users').select('*');
    
    if (error) {
      console.error('Error fetching all users:', error);
      return [];
    }
    
    return data as unknown as User[];
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    const { data, error } = await this._db.from('users').select('*').eq('email', email).single();
    
    if (error) {
      console.error('Error fetching user by email:', error);
      return undefined;
    }
    
    return data as unknown as User;
  }
  
  async getUserByClerkId(clerkId: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    const { data, error } = await this._db.from('users').select('*').eq('clerk_id', clerkId).single();
    
    if (error) {
      console.error('Error fetching user by clerk ID:', error);
      return undefined;
    }
    
    return data as unknown as User;
  }
  
  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Get the current date/time
    const now = new Date();
    
    // Find user with matching token
    const { data, error } = await this._db
      .from('users')
      .select('*')
      .eq('verification_token', token);
    
    if (error) {
      console.error('Error fetching user by verification token:', error);
      return undefined;
    }
    
    // Filter in JS to check the expiry date - similar to previous implementation
    return data?.find((user: any) => 
      user.verification_token_expiry && new Date(user.verification_token_expiry) > now
    ) as unknown as User;
  }
  
  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .single();
    
    if (error) {
      console.error('Error fetching user by phone number:', error);
      return undefined;
    }
    
    return data as unknown as User;
  }
  
  async setOTP(userId: number, otp: string, expiry: Date): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('users')
      .update({ 
        otp_code: otp,
        otp_expiry: expiry.toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error setting OTP:', error);
      throw new Error('Failed to set OTP: ' + error.message);
    }
    
    if (!data) {
      throw new Error('User not found');
    }
    
    return data as unknown as User;
  }
  
  async updateUserByClerkId(clerkId: string, userData: Partial<InsertUser>): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(userData).forEach(([key, value]) => {
      // Simple camelCase to snake_case conversion
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      snakeCaseData[snakeKey] = value;
    });
    
    const { data, error } = await this._db
      .from('users')
      .update(snakeCaseData)
      .eq('clerk_id', clerkId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user by Clerk ID:', error);
      throw new Error('Failed to update user: ' + error.message);
    }
    
    if (!data) {
      throw new Error('User not found');
    }
    
    return data as unknown as User;
  }
  
  async linkUserToClerk(userId: number, clerkId: string): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('users')
      .update({ clerk_id: clerkId })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error linking user to Clerk:', error);
      throw new Error('Failed to link user to Clerk: ' + error.message);
    }
    
    if (!data) {
      throw new Error('User not found');
    }
    
    return data as unknown as User;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(userData).forEach(([key, value]) => {
      // Simple camelCase to snake_case conversion
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      snakeCaseData[snakeKey] = value;
    });
    
    const { data, error } = await this._db
      .from('users')
      .update(snakeCaseData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user: ' + error.message);
    }
    
    if (!data) {
      throw new Error('User not found');
    }
    
    return data as unknown as User;
  }
  
  async createUser(user: InsertUser): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(user).forEach(([key, value]) => {
      // Simple camelCase to snake_case conversion
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      snakeCaseData[snakeKey] = value;
    });
    
    // Set isVerified to false by default for new users
    snakeCaseData.is_verified = false;
    
    const { data, error } = await this._db
      .from('users')
      .insert(snakeCaseData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user: ' + error.message);
    }
    
    return data as unknown as User;
  }
  
  async setVerificationToken(userId: number, token: string, expiry: Date): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('users')
      .update({ 
        verification_token: token,
        verification_token_expiry: expiry.toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error setting verification token:', error);
      throw new Error('Failed to set verification token: ' + error.message);
    }
    
    if (!data) {
      throw new Error('User not found');
    }
    
    return data as unknown as User;
  }
  
  async verifyUser(userId: number): Promise<User> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('users')
      .update({ 
        is_verified: true,
        verification_token: null,
        verification_token_expiry: null,
        otp_code: null,
        otp_expiry: null
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error verifying user:', error);
      throw new Error('Failed to verify user: ' + error.message);
    }
    
    if (!data) {
      throw new Error('User not found');
    }
    
    return data as unknown as User;
  }
  
  // Quiz operations
  async getQuizAnswers(userId: number): Promise<QuizAnswer | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('quiz_answers')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error getting quiz answers:', error);
      return undefined;
    }
    
    return data as unknown as QuizAnswer;
  }
  
  async createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(quizAnswer).forEach(([key, value]) => {
      // Special case for userId
      if (key === 'userId') {
        snakeCaseData['user_id'] = value;
      } else {
        // Simple camelCase to snake_case conversion for other fields
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        snakeCaseData[snakeKey] = value;
      }
    });
    
    const { data, error } = await this._db
      .from('quiz_answers')
      .insert(snakeCaseData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating quiz answers:', error);
      throw new Error('Failed to create quiz answers: ' + error.message);
    }
    
    return data as unknown as QuizAnswer;
  }
  
  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Get the existing quiz answer first to check completion status
    const { data: existingQuiz, error: fetchError } = await this._db
      .from('quiz_answers')
      .select('*')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      console.error('Error fetching existing quiz:', fetchError);
      throw new Error('Failed to fetch existing quiz: ' + fetchError.message);
    }
    
    // Set up the update data
    const updateData: any = { 
      answers, 
      completed
    };
    
    // Update completedAt if now marked as completed
    if (completed && !existingQuiz?.completed) {
      updateData.completed_at = new Date().toISOString();
    }
    
    // Execute the update
    const { data, error } = await this._db
      .from('quiz_answers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating quiz answers:', error);
      throw new Error('Failed to update quiz answers: ' + error.message);
    }
    
    return data as unknown as QuizAnswer;
  }
  
  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error getting report:', error);
      return undefined;
    }
    
    return data as unknown as Report;
  }
  
  async getReportByUserId(userId: number): Promise<Report | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error getting report by user ID:', error);
      return undefined;
    }
    
    return data as unknown as Report;
  }
  
  async createReport(report: InsertReport): Promise<Report> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(report).forEach(([key, value]) => {
      // Special case for userId and quizId
      if (key === 'userId') {
        snakeCaseData['user_id'] = value;
      } else if (key === 'quizId') {
        snakeCaseData['quiz_id'] = value;
      } else if (key === 'isPaid') {
        snakeCaseData['is_paid'] = value;
      } else if (key === 'compatibilityColor') {
        snakeCaseData['compatibility_color'] = value;
      } else {
        // Simple camelCase to snake_case conversion for other fields
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        snakeCaseData[snakeKey] = value;
      }
    });
    
    const { data, error } = await this._db
      .from('reports')
      .insert(snakeCaseData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating report:', error);
      throw new Error('Failed to create report: ' + error.message);
    }
    
    return data as unknown as Report;
  }
  
  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('reports')
      .update({ is_paid: isPaid })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating report payment status:', error);
      throw new Error('Failed to update report payment status: ' + error.message);
    }
    
    return data as unknown as Report;
  }
  
  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(payment).forEach(([key, value]) => {
      // Special case for reportId
      if (key === 'reportId') {
        snakeCaseData['report_id'] = value;
      } else {
        // Simple camelCase to snake_case conversion for other fields
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        snakeCaseData[snakeKey] = value;
      }
    });
    
    const { data, error } = await this._db
      .from('payments')
      .insert(snakeCaseData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating payment:', error);
      throw new Error('Failed to create payment: ' + error.message);
    }
    
    return data as unknown as Payment;
  }
  
  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('payments')
      .select('*')
      .eq('report_id', reportId)
      .single();
      
    if (error) {
      console.error('Error getting payment by report ID:', error);
      return undefined;
    }
    
    return data as unknown as Payment;
  }
  
  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('payments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status: ' + error.message);
    }
    
    return data as unknown as Payment;
  }
  
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
      
    if (error) {
      console.error('Error getting all blog posts:', error);
      return [];
    }
    
    return data as unknown as BlogPost[];
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error getting blog post by ID:', error);
      return undefined;
    }
    
    return data as unknown as BlogPost;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    const { data, error } = await this._db
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error getting blog post by slug:', error);
      return undefined;
    }
    
    return data as unknown as BlogPost;
  }
  
  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    if (!this._db) throw new Error("Supabase connection not available");
    
    // Convert camelCase to snake_case for Supabase
    const snakeCaseData: Record<string, any> = {};
    Object.entries(blogPost).forEach(([key, value]) => {
      // Special case for publishedAt
      if (key === 'publishedAt') {
        snakeCaseData['published_at'] = value instanceof Date ? value.toISOString() : value;
      } else {
        // Simple camelCase to snake_case conversion for other fields
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        snakeCaseData[snakeKey] = value;
      }
    });
    
    const { data, error } = await this._db
      .from('blog_posts')
      .insert(snakeCaseData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post: ' + error.message);
    }
    
    return data as unknown as BlogPost;
  }
  
  // Helper method to initialize blog posts
  private async initializeBlogPosts() {
    if (!this._db) {
      console.warn("⚠️ Supabase connection not available, skipping blog posts initialization");
      return;
    }
    
    // Check if we have any blog posts
    const { data: existingPosts, error: countError } = await this._db
      .from('blog_posts')
      .select('*');
      
    if (countError) {
      console.error('Error checking for existing blog posts:', countError);
      return;
    }
    
    if (!existingPosts || existingPosts.length === 0) {
      // Sample blog posts data
      const samplePosts = [
        {
          title: "Understanding Attachment Styles in Relationships",
          slug: "understanding-attachment-styles",
          content: "# Understanding Attachment Styles\n\nAttachment theory explains how our early relationships with caregivers shape our approach to relationships as adults. There are four main attachment styles:\n\n## Secure Attachment\nPeople with secure attachment find it relatively easy to form close, intimate relationships. They trust others, allow themselves to depend on others, and let others depend on them. They don't worry excessively about abandonment or someone getting too close.\n\n## Anxious Attachment\nPeople with anxious attachment crave closeness but worry their partner doesn't value them as much as they value their partner. They can be sensitive to small changes in a partner's mood or behavior and take these changes personally.\n\n## Avoidant Attachment\nPeople with avoidant attachment value independence and self-sufficiency. They may struggle with deep intimacy and find it difficult to completely trust or depend on others. They might keep partners at arm's length.\n\n## Fearful-Avoidant Attachment\nPeople with fearful-avoidant attachment have mixed feelings about close relationships. They desire closeness but feel uncomfortable with emotional intimacy. They don't trust others easily but also worry about being too distant from them.\n\nUnderstanding your attachment style can help you navigate relationships more effectively and work toward developing a more secure approach.",
          excerpt: "Discover how your early childhood experiences shape your adult relationship patterns through attachment theory.",
          category: "psychology",
          published_at: new Date().toISOString(),
          author: "Dr. Sarah Johnson"
        },
        {
          title: "The Science of Compatibility: Beyond Shared Interests",
          slug: "science-of-compatibility",
          content: "# The Science of Compatibility\n\nWhen it comes to relationship compatibility, most people think about shared interests and values. While these are certainly important, research shows that compatibility runs much deeper and involves several key factors:\n\n## Emotional Regulation Compatibility\nHow partners manage their emotions and respond to each other's emotional states is a critical factor in relationship success. Partners who can co-regulate effectively tend to have more stable relationships.\n\n## Attachment Compatibility\nWhile secure-secure pairings tend to work best, other combinations can succeed with awareness and effort. The key is understanding each other's attachment needs and responding appropriately.\n\n## Conflict Resolution Styles\nResearch shows that it's not whether couples fight, but how they fight that determines relationship longevity. Compatible conflict resolution styles or the ability to adapt to each other's style is crucial.\n\n## Physiological Synchrony\nInteresting studies have shown that compatible couples often synchronize physiologically - their heart rates, breathing patterns, and even hormonal fluctuations can align when they're together.\n\n## Values and Life Goals\nShared values around major life decisions like family, finances, and future planning create a foundation for long-term compatibility.\n\nThe good news is that compatibility isn't entirely fixed. While some aspects are innate, many can be developed through awareness, communication, and intentional effort.",
          excerpt: "Learn why true compatibility goes far beyond shared hobbies and interests, and how science explains successful relationships.",
          category: "research",
          published_at: new Date().toISOString(),
          author: "Prof. Raj Patel"
        },
        {
          title: "5 Communication Patterns That Predict Relationship Success",
          slug: "communication-patterns-relationship-success",
          content: "# 5 Communication Patterns That Predict Relationship Success\n\nRenowned relationship researcher Dr. John Gottman can predict with over 90% accuracy whether a couple will stay together or break up, often after watching them interact for just 15 minutes. Here are five communication patterns that his research has identified as predictive of relationship success:\n\n## 1. Soft Startup\nSuccessful couples bring up issues gently, without criticism or contempt. Instead of accusing with \"you\" statements, they use \"I\" statements to express their feelings.\n\n## 2. Accepting Influence\nPartners in lasting relationships are willing to be influenced by each other. They consider each other's perspective and feelings, showing respect even during disagreements.\n\n## 3. Repair Attempts\nAll couples argue, but successful ones make and receive \"repair attempts\" - statements or actions that prevent negativity from escalating. This can be a touch, a joke, or a simple phrase like \"let's take a break.\"\n\n## 4. Positive Perspective\nHappy couples maintain a positive perspective about each other and their relationship, even during conflicts. They interpret ambiguous actions in a positive light rather than assuming negative intent.\n\n## 5. The 5:1 Ratio\nFor every negative interaction during conflict, stable relationships have at least five positive interactions. These positive moments build an emotional bank account that helps couples weather challenging times.\n\nThe good news is that all these communication patterns can be learned and developed with practice, even if they don't come naturally at first.",
          excerpt: "Research shows that specific communication patterns can predict relationship success with remarkable accuracy.",
          category: "communication",
          published_at: new Date().toISOString(),
          author: "Anita Sharma"
        }
      ];
      
      // Insert sample blog posts
      console.log('Initializing sample blog posts...');
      for (const post of samplePosts) {
        const { error: insertError } = await this._db
          .from('blog_posts')
          .insert(post);
          
        if (insertError) {
          console.error('Error inserting sample blog post:', insertError);
        }
      }
      console.log('Sample blog posts initialized successfully');
    } else {
      console.log(`Found ${existingPosts.length} existing blog posts, skipping initialization`);
    }
  }

  // Initialize the database tables
  async initializeTables() {
    // Check for database connection
    if (!this._db) {
      console.warn("⚠️ Supabase connection not available, skipping table initialization");
      return;
    }
    
    try {
      console.log('🔍 Verifying Supabase schema and connection...');
      
      // Run checks to verify all expected tables exist in Supabase
      const tables = ['users', 'quiz_answers', 'reports', 'payments', 'blog_posts'];
      let allTablesExist = true;
      
      for (const table of tables) {
        try {
          const { error } = await this._db
            .from(table)
            .select('*', { count: 'exact', head: true });
            
          if (error) {
            console.warn(`⚠️ Table check for '${table}' failed: ${error.message}`);
            allTablesExist = false;
          } else {
            console.log(`✅ Table '${table}' exists and is accessible`);
          }
        } catch (err) {
          console.error(`❌ Error checking table '${table}':`, err);
          allTablesExist = false;
        }
      }
      
      if (allTablesExist) {
        console.log('✅ All required Supabase tables are ready');
      } else {
        console.warn('⚠️ Some required tables may be missing in Supabase');
        console.log('Note: Use Supabase dashboard to create missing tables or run migrations');
      }
      
      // Initialize blog posts if needed
      await this.initializeBlogPosts();
      
      console.log('✅ Supabase database initialization complete');
    } catch (error) {
      console.error('❌ Error during Supabase initialization:', error);
      
      // For Supabase we don't need to run db:push as tables are managed differently
      console.log('ℹ️ Note: To create tables in Supabase, use the Supabase dashboard or migration tools');
    }
  }
  
  // Close the database connection
  async close() {
    try {
      // With Supabase, we don't need to explicitly close connections
      // as it manages them automatically through REST API calls
      
      // We could potentially clear any caches or state if needed in the future
      
      console.log('✅ Supabase resources released');
    } catch (error) {
      console.error('❌ Error releasing Supabase resources:', error);
    }
  }
}

export const pgStorage = new PgStorage();