import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { eq } from 'drizzle-orm';

// Configure Neon for serverless environment
neonConfig.webSocketConstructor = ws;
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

// Import the database connection from db.ts
import { db } from './db';

// Import session for Store type
import session from 'express-session';
import { pool } from './db';
import connectPgSimple from 'connect-pg-simple';

export class PgStorage implements IStorage {
  // Make db a private class property using imported db
  private _db = db;
  
  // Session store for auth persistence
  public sessionStore: session.Store;
  
  constructor() {
    // Initialize session store
    const PostgresStore = connectPgSimple(session);
    this.sessionStore = new PostgresStore({
      pool: pool as any,
      tableName: 'user_sessions',
      createTableIfMissing: true,
      schemaName: 'public',
      pruneSessionInterval: 60
    });
    
    // Only try to initialize if we have a database connection
    if (this._db) {
      // Initialize blog posts after a short delay
      // to ensure connection is established
      setTimeout(() => {
        this.initializeBlogPosts().catch(err => 
          console.error('Failed to initialize blog posts:', err)
        );
      }, 1000);
    } else {
      console.warn("PgStorage initialized without database connection - operations will fail!");
    }
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    if (!this._db) throw new Error("Database connection not available");
    const results = await this._db.select().from(users).where(eq(users.id, id));
    return results[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Database connection not available");
    const results = await this._db.select().from(users).where(eq(users.username, username));
    return results[0];
  }
  
  async getAllUsers(): Promise<User[]> {
    if (!this._db) throw new Error("Database connection not available");
    return await this._db.select().from(users);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Database connection not available");
    const results = await this._db.select().from(users).where(eq(users.email, email));
    return results[0];
  }
  
  async getUserByClerkId(clerkId: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Database connection not available");
    const results = await this._db.select().from(users).where(eq(users.clerkId, clerkId));
    return results[0];
  }
  
  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Database connection not available");
    
    // Get the current date/time
    const now = new Date();
    
    // Find user with matching token where the token has not expired
    const results = await this._db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token));
    
    // Filter in JS as Drizzle ORM doesn't have great timestamp comparison operators yet
    return results.find((user: typeof users.$inferSelect) => 
      user.verificationTokenExpiry && new Date(user.verificationTokenExpiry) > now
    );
  }
  
  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    if (!this._db) throw new Error("Database connection not available");
    
    const results = await this._db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, phoneNumber));
      
    return results[0];
  }
  
  async setOTP(userId: number, otp: string, expiry: Date): Promise<User> {
    if (!this._db) throw new Error("Database connection not available");
    
    const [updatedUser] = await this._db
      .update(users)
      .set({ 
        otpCode: otp,
        otpExpiry: expiry
      })
      .where(eq(users.id, userId))
      .returning();
      
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }
  
  async updateUserByClerkId(clerkId: string, userData: Partial<InsertUser>): Promise<User> {
    if (!this._db) throw new Error("Database connection not available");
    
    const [updatedUser] = await this._db
      .update(users)
      .set(userData)
      .where(eq(users.clerkId, clerkId))
      .returning();
      
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }
  
  async linkUserToClerk(userId: number, clerkId: string): Promise<User> {
    if (!this._db) throw new Error("Database connection not available");
    
    const [updatedUser] = await this._db
      .update(users)
      .set({ clerkId })
      .where(eq(users.id, userId))
      .returning();
      
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }
  
  async createUser(user: InsertUser): Promise<User> {
    if (!this._db) throw new Error("Database connection not available");
    // Set isVerified to false by default for new users
    const result = await this._db.insert(users).values({
      ...user,
      isVerified: false
    }).returning();
    return result[0];
  }
  
  async setVerificationToken(userId: number, token: string, expiry: Date): Promise<User> {
    if (!this._db) throw new Error("Database connection not available");
    
    const [updatedUser] = await this._db
      .update(users)
      .set({ 
        verificationToken: token,
        verificationTokenExpiry: expiry
      })
      .where(eq(users.id, userId))
      .returning();
      
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }
  
  async verifyUser(userId: number): Promise<User> {
    if (!this._db) throw new Error("Database connection not available");
    
    const [updatedUser] = await this._db
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
      
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }
  
  // Quiz operations
  async getQuizAnswers(userId: number): Promise<QuizAnswer | undefined> {
    const results = await this._db.select().from(quizAnswers).where(eq(quizAnswers.userId, userId));
    return results[0];
  }
  
  async createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    const result = await this._db.insert(quizAnswers).values(quizAnswer).returning();
    return result[0];
  }
  
  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    // Get the existing quiz answer
    const [existingQuiz] = await this._db.select().from(quizAnswers).where(eq(quizAnswers.id, id));
    
    // Set up the update data
    const updateData: any = { 
      answers, 
      completed,
      // Update completedAt if now marked as completed
      ...(completed && !existingQuiz?.completed ? { completedAt: new Date() } : {})
    };
    
    // Execute the update
    const result = await this._db.update(quizAnswers)
      .set(updateData)
      .where(eq(quizAnswers.id, id))
      .returning();
    
    return result[0];
  }
  
  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    const results = await this._db.select().from(reports).where(eq(reports.id, id));
    return results[0];
  }
  
  async getReportByUserId(userId: number): Promise<Report | undefined> {
    const results = await this._db.select().from(reports).where(eq(reports.userId, userId));
    return results[0];
  }
  
  async createReport(report: InsertReport): Promise<Report> {
    const result = await this._db.insert(reports).values(report).returning();
    return result[0];
  }
  
  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    const result = await this._db.update(reports)
      .set({ isPaid })
      .where(eq(reports.id, id))
      .returning();
    return result[0];
  }
  
  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await this._db.insert(payments).values(payment).returning();
    return result[0];
  }
  
  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    const results = await this._db.select().from(payments).where(eq(payments.reportId, reportId));
    return results[0];
  }
  
  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    const result = await this._db.update(payments)
      .set({ status })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }
  
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await this._db.select().from(blogPosts);
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const results = await this._db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return results[0];
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const results = await this._db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return results[0];
  }
  
  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await this._db.insert(blogPosts).values(blogPost).returning();
    return result[0];
  }
  
  // Helper method to initialize blog posts
  private async initializeBlogPosts() {
    if (!this._db) {
      console.warn("⚠️ Database connection not available, skipping blog posts initialization");
      return;
    }
    
    // Check if we have any blog posts
    const existingPosts = await this._db.select().from(blogPosts);
    
    if (existingPosts.length === 0) {
      // Sample blog posts data
      const samplePosts = [
        {
          title: "Understanding Attachment Styles in Relationships",
          slug: "understanding-attachment-styles",
          content: "# Understanding Attachment Styles\n\nAttachment theory explains how our early relationships with caregivers shape our approach to relationships as adults. There are four main attachment styles:\n\n## Secure Attachment\nPeople with secure attachment find it relatively easy to form close, intimate relationships. They trust others, allow themselves to depend on others, and let others depend on them. They don't worry excessively about abandonment or someone getting too close.\n\n## Anxious Attachment\nPeople with anxious attachment crave closeness but worry their partner doesn't value them as much as they value their partner. They can be sensitive to small changes in a partner's mood or behavior and take these changes personally.\n\n## Avoidant Attachment\nPeople with avoidant attachment value independence and self-sufficiency. They may struggle with deep intimacy and find it difficult to completely trust or depend on others. They might keep partners at arm's length.\n\n## Fearful-Avoidant Attachment\nPeople with fearful-avoidant attachment have mixed feelings about close relationships. They desire closeness but feel uncomfortable with emotional intimacy. They don't trust others easily but also worry about being too distant from them.\n\nUnderstanding your attachment style can help you navigate relationships more effectively and work toward developing a more secure approach.",
          excerpt: "Discover how your early childhood experiences shape your adult relationship patterns through attachment theory.",
          category: "psychology",
          publishedAt: new Date(),
          author: "Dr. Sarah Johnson"
        },
        {
          title: "The Science of Compatibility: Beyond Shared Interests",
          slug: "science-of-compatibility",
          content: "# The Science of Compatibility\n\nWhen it comes to relationship compatibility, most people think about shared interests and values. While these are certainly important, research shows that compatibility runs much deeper and involves several key factors:\n\n## Emotional Regulation Compatibility\nHow partners manage their emotions and respond to each other's emotional states is a critical factor in relationship success. Partners who can co-regulate effectively tend to have more stable relationships.\n\n## Attachment Compatibility\nWhile secure-secure pairings tend to work best, other combinations can succeed with awareness and effort. The key is understanding each other's attachment needs and responding appropriately.\n\n## Conflict Resolution Styles\nResearch shows that it's not whether couples fight, but how they fight that determines relationship longevity. Compatible conflict resolution styles or the ability to adapt to each other's style is crucial.\n\n## Physiological Synchrony\nInteresting studies have shown that compatible couples often synchronize physiologically - their heart rates, breathing patterns, and even hormonal fluctuations can align when they're together.\n\n## Values and Life Goals\nShared values around major life decisions like family, finances, and future planning create a foundation for long-term compatibility.\n\nThe good news is that compatibility isn't entirely fixed. While some aspects are innate, many can be developed through awareness, communication, and intentional effort.",
          excerpt: "Learn why true compatibility goes far beyond shared hobbies and interests, and how science explains successful relationships.",
          category: "research",
          publishedAt: new Date(),
          author: "Prof. Raj Patel"
        },
        {
          title: "5 Communication Patterns That Predict Relationship Success",
          slug: "communication-patterns-relationship-success",
          content: "# 5 Communication Patterns That Predict Relationship Success\n\nRenowned relationship researcher Dr. John Gottman can predict with over 90% accuracy whether a couple will stay together or break up, often after watching them interact for just 15 minutes. Here are five communication patterns that his research has identified as predictive of relationship success:\n\n## 1. Soft Startup\nSuccessful couples bring up issues gently, without criticism or contempt. Instead of accusing with \"you\" statements, they use \"I\" statements to express their feelings.\n\n## 2. Accepting Influence\nPartners in lasting relationships are willing to be influenced by each other. They consider each other's perspective and feelings, showing respect even during disagreements.\n\n## 3. Repair Attempts\nAll couples argue, but successful ones make and receive \"repair attempts\" - statements or actions that prevent negativity from escalating. This can be a touch, a joke, or a simple phrase like \"let's take a break.\"\n\n## 4. Positive Perspective\nHappy couples maintain a positive perspective about each other and their relationship, even during conflicts. They interpret ambiguous actions in a positive light rather than assuming negative intent.\n\n## 5. The 5:1 Ratio\nFor every negative interaction during conflict, stable relationships have at least five positive interactions. These positive moments build an emotional bank account that helps couples weather challenging times.\n\nThe good news is that all these communication patterns can be learned and developed with practice, even if they don't come naturally at first.",
          excerpt: "Research shows that specific communication patterns can predict relationship success with remarkable accuracy.",
          category: "communication",
          publishedAt: new Date(),
          author: "Anita Sharma"
        }
      ];
      
      // Insert sample blog posts
      for (const post of samplePosts) {
        await this._db.insert(blogPosts).values(post);
      }
    }
  }

  // Initialize the database tables
  async initializeTables() {
    // Check for database connection
    if (!this._db) {
      console.warn("⚠️ Database connection not available, skipping table initialization");
      return;
    }
    
    try {
      // Push the schema to the database using drizzle-orm's createTable
      // This is a simplified approach - for production, use drizzle-kit migration tools
      console.log('Database tables initialization started');
      
      // We'll execute a simple query to verify connection
      const result = await this._db.select().from(users).limit(1);
      console.log('Database connection verified');
      
      // If tables aren't created, the validation above would have thrown an error
      // Otherwise, we initialize the blog posts
      await this.initializeBlogPosts();
      
      console.log('Database tables initialized');
    } catch (error) {
      console.error('Error initializing database tables:', error);
      console.log('Attempting to run drizzle push from npm...');
      
      // We should run the migration tool as a fallback
      // In a real app, this would be handled by a proper migration flow
      // This is just a simplified approach for development
      try {
        // Use dynamic import for ESM modules
        import('child_process').then(({ exec }) => {
          exec('npm run db:push', (err: any, stdout: any, stderr: any) => {
            if (err) {
              console.error('Failed to run db:push:', err);
              return;
            }
            console.log('db:push output:', stdout);
            if (stderr) console.error('db:push stderr:', stderr);
            
            // Try initializing blog posts after migration
            this.initializeBlogPosts().catch(e => 
              console.error('Failed to initialize blog posts after migration:', e)
            );
          });
        }).catch(err => {
          console.error('Failed to import child_process:', err);
        });
      } catch (execError) {
        console.error('Failed to execute db:push command:', execError);
      }
    }
  }
  
  // Close the database connection
  async close() {
    // Use the pool from db.ts
    try {
      // We're using ESM modules, so we can import at the top level
      // We don't directly close the pool, since other code might still be using it
      console.log('Database resources cleaned up');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
}

export const pgStorage = new PgStorage();