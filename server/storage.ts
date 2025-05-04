import * as crypto from "crypto";
import { 
  users, type User, type InsertUser,
  quizAnswers, type QuizAnswer, type InsertQuizAnswer,
  reports, type Report, type InsertReport,
  payments, type Payment, type InsertPayment,
  blogPosts, type BlogPost, type InsertBlogPost,
  counselors, type Counselor, type InsertCounselor
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Interface for all storage operations
export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User operations - now uses number IDs for integer primary keys in production,
  // but supports string IDs for development mode
  getUser(id: number | string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: Partial<InsertUser>): Promise<User>;
  updateUser(id: number | string, userData: Partial<InsertUser>): Promise<User>;
  setVerificationToken(userId: number | string, token: string, expiry: Date): Promise<User>;
  verifyUser(userId: number | string): Promise<User>;
  
  // OTP operations
  setOTP(userId: number | string, otp: string, expiry: Date): Promise<User>;
  
  // Quiz operations
  getQuizAnswers(userId: number | string): Promise<QuizAnswer | undefined>;
  createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer>;
  updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer>;
  
  // Report operations
  getReport(id: number): Promise<Report | undefined>;
  getReportByUserId(userId: number | string): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentByReportId(reportId: number): Promise<Payment | undefined>;
  updatePaymentStatus(id: number, status: string): Promise<Payment>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Counselor operations
  getAllCounselors(): Promise<Counselor[]>;
  getCounselorById(id: number): Promise<Counselor | undefined>;
  createCounselor(counselor: InsertCounselor): Promise<Counselor>;
  updateCounselor(id: number, counselorData: Partial<InsertCounselor>): Promise<Counselor>;
  deleteCounselor(id: number): Promise<boolean>;
  getFeaturedCounselors(): Promise<Counselor[]>;
  
  // Utility
  close(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizAnswers: Map<number, QuizAnswer>;
  private reports: Map<number, Report>;
  private payments: Map<number, Payment>;
  private blogPosts: Map<number, BlogPost>;
  private counselors: Map<number, Counselor>;
  
  private currentQuizId: number;
  private currentReportId: number;
  private currentPaymentId: number;
  private currentBlogPostId: number;
  private currentCounselorId: number;
  
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.quizAnswers = new Map();
    this.reports = new Map();
    this.payments = new Map();
    this.blogPosts = new Map();
    this.counselors = new Map();
    
    this.currentQuizId = 1;
    this.currentReportId = 1;
    this.currentPaymentId = 1;
    this.currentBlogPostId = 1;
    this.currentCounselorId = 1;
    
    // Initialize session store
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Add some sample blog posts
    this.initializeBlogPosts();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }
  
  // Removed getUserByClerkId - no longer needed
  
  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.verificationToken === token && 
                user.verificationTokenExpiry && 
                new Date(user.verificationTokenExpiry) > new Date()
    );
  }
  
  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.phoneNumber === phoneNumber
    );
  }
  
  async setOTP(userId: string, otp: string, expiry: Date): Promise<User> {
    const user = await this.getUser(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = { 
      ...user, 
      otpCode: otp,
      otpExpiry: expiry
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Generate a UUID for the user
    const id = insertUser.id || crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    // Ensure all fields are properly initialized with null rather than undefined
    const user: User = { 
      id, 
      createdAt,
      updatedAt,
      username: insertUser.username || null,
      email: insertUser.email,
      phoneNumber: insertUser.phoneNumber || null,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      fullName: insertUser.fullName || null,
      dateOfBirth: insertUser.dateOfBirth || null,
      gender: insertUser.gender || null,
      imageUrl: insertUser.imageUrl || null,
      isVerified: false,
      verificationMethod: insertUser.verificationMethod || 'sms', // Default to SMS verification
      verificationToken: null,
      verificationTokenExpiry: null,
      otpCode: null,
      otpExpiry: null,
      clerkId: insertUser.clerkId || null
    };
    this.users.set(id, user);
    return user;
  }
  
  // Removed updateUserByClerkId - no longer needed
  
  // Removed linkUserToClerk - no longer needed
  
  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User> {
    const user = await this.getUser(id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = { 
      ...user,
      ...userData
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async setVerificationToken(userId: string, token: string, expiry: Date): Promise<User> {
    const user = await this.getUser(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = { 
      ...user, 
      verificationToken: token,
      verificationTokenExpiry: expiry
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  async verifyUser(userId: string): Promise<User> {
    const user = await this.getUser(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = { 
      ...user, 
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
      otpCode: null,
      otpExpiry: null
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Quiz operations
  async getQuizAnswers(userId: string): Promise<QuizAnswer | undefined> {
    return Array.from(this.quizAnswers.values()).find(
      (quiz) => quiz.userId === userId,
    );
  }
  
  async createQuizAnswers(insertQuizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    const id = this.currentQuizId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    
    const quizAnswer: QuizAnswer = { 
      userId: insertQuizAnswer.userId,
      answers: insertQuizAnswer.answers,
      completed: insertQuizAnswer.completed || false,
      id, 
      createdAt,
      updatedAt
    };
    this.quizAnswers.set(id, quizAnswer);
    return quizAnswer;
  }
  
  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    const quiz = this.quizAnswers.get(id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    const updatedAt = new Date();
    
    const updatedQuiz: QuizAnswer = { 
      ...quiz, 
      answers, 
      completed,
      updatedAt
    };
    
    this.quizAnswers.set(id, updatedQuiz);
    return updatedQuiz;
  }
  
  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    return this.reports.get(id);
  }
  
  async getReportByUserId(userId: string): Promise<Report | undefined> {
    return Array.from(this.reports.values()).find(
      (report) => report.userId === userId
    );
  }
  
  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.currentReportId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const report: Report = { 
      userId: insertReport.userId,
      quizId: insertReport.quizId || null,
      compatibilityProfile: insertReport.compatibilityProfile || {},
      isPaid: insertReport.isPaid || false,
      id, 
      createdAt,
      updatedAt
    };
    this.reports.set(id, report);
    return report;
  }
  
  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    const report = this.reports.get(id);
    if (!report) {
      throw new Error('Report not found');
    }
    
    const updatedReport: Report = { ...report, isPaid };
    this.reports.set(id, updatedReport);
    return updatedReport;
  }
  
  // Payment operations
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = this.currentPaymentId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const payment: Payment = { 
      userId: insertPayment.userId,
      reportId: insertPayment.reportId,
      amount: insertPayment.amount,
      status: insertPayment.status || 'pending',
      currency: insertPayment.currency || 'INR',
      paymentMethod: insertPayment.paymentMethod || null,
      transactionId: insertPayment.transactionId || null,
      id, 
      createdAt,
      updatedAt
    };
    this.payments.set(id, payment);
    return payment;
  }
  
  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(
      (payment) => payment.reportId === reportId
    );
  }
  
  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    const payment = this.payments.get(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    
    const updatedPayment: Payment = { ...payment, status };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }
  
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => {
        const aTime = a.createdAt ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt ? b.createdAt.getTime() : 0;
        return bTime - aTime; // Sort newest first
      }
    );
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    
    const blogPost: BlogPost = { 
      title: insertBlogPost.title,
      slug: insertBlogPost.slug,
      summary: insertBlogPost.summary || null,
      content: insertBlogPost.content,
      author: insertBlogPost.author || null,
      category: insertBlogPost.category || null,
      imageUrl: insertBlogPost.imageUrl || null,
      published: insertBlogPost.published || true,
      id, 
      createdAt,
      updatedAt
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  // Initialize with sample blog posts
  private initializeBlogPosts() {
    const samplePosts: InsertBlogPost[] = [
      {
        title: "Understanding Attachment Styles: The Key to Better Relationships",
        slug: "understanding-attachment-styles",
        summary: "Learn how your early life experiences shape your adult relationships and how to work with different attachment styles.",
        content: "# Understanding Attachment Styles\n\nAttachment theory, developed by John Bowlby and expanded by Mary Ainsworth, suggests that the bonds we form with our primary caregivers in infancy create a template for how we form relationships throughout life...",
        imageUrl: "https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Attachment+Styles",
        category: "Relationship Psychology",
        author: "Dr. Relationship Expert"
      },
      {
        title: "Navigating Family Expectations in Modern Indian Relationships",
        slug: "navigating-family-expectations",
        summary: "Balancing personal choice with family values can be challenging. Here's how to find harmony without sacrificing your happiness.",
        content: "# Navigating Family Expectations in Modern Indian Relationships\n\nIn Indian culture, relationships often extend beyond the couple to include both families. While this can provide a strong support system, it can also create unique challenges...",
        imageUrl: "https://via.placeholder.com/600x400/4ecdc4/ffffff?text=Family+Expectations",
        category: "Cultural Insights",
        author: "Family Counselor"
      },
      {
        title: "Green, Yellow, Red: Understanding Your Compatibility Profile",
        slug: "understanding-compatibility-profile",
        summary: "What does your compatibility color mean? Discover the strengths and challenges of each profile and how to use this knowledge in your dating life.",
        content: "# Green, Yellow, Red: Understanding Your Compatibility Profile\n\nAt MyDate, we classify compatibility profiles into three categories: Green, Yellow, and Red. Each represents different relationship dynamics and compatibility levels...",
        imageUrl: "https://via.placeholder.com/600x400/ff9f1c/ffffff?text=Compatibility+Profiles",
        category: "Compatibility Guide",
        author: "Dating Coach"
      },
      {
        title: "Building Emotional Intelligence for Healthier Relationships",
        slug: "emotional-intelligence-relationships",
        summary: "Discover how developing your emotional intelligence can lead to deeper connections and fewer conflicts.",
        content: "# Building Emotional Intelligence for Healthier Relationships\n\nEmotional intelligence (EQ) is the ability to understand, use, and manage your emotions in positive ways to relieve stress, communicate effectively, empathize with others, overcome challenges, and defuse conflict...",
        imageUrl: "https://via.placeholder.com/600x400/9c6644/ffffff?text=Emotional+Intelligence",
        category: "Relationship Skills",
        author: "Psychology Expert"
      },
      {
        title: "Dating in the Digital Age: Navigating Apps With Authenticity",
        slug: "dating-apps-authenticity",
        summary: "How to stay true to yourself while using dating apps in India, and still find meaningful connections.",
        content: "# Dating in the Digital Age: Navigating Apps With Authenticity\n\nDating apps have transformed how young Indians meet potential partners. While they offer unprecedented access to new connections, they also present challenges to maintaining authenticity...",
        imageUrl: "https://via.placeholder.com/600x400/f9c74f/ffffff?text=Digital+Dating",
        category: "Modern Dating",
        author: "Tech Relationship Specialist"
      },
      {
        title: "The Science Behind Why Opposites Don't Actually Attract",
        slug: "science-opposites-attract-myth",
        summary: "Research shows that similarity, not opposition, predicts relationship success. Learn what science has to say about compatibility.",
        content: "# The Science Behind Why Opposites Don't Actually Attract\n\nContrary to popular belief, psychological research consistently shows that we are attracted to people who share our values, beliefs, and personality traits...",
        imageUrl: "https://via.placeholder.com/600x400/43aa8b/ffffff?text=Attraction+Science",
        category: "Relationship Science",
        author: "Research Psychologist"
      }
    ];
    
    samplePosts.forEach(post => {
      const id = this.currentBlogPostId++;
      const createdAt = new Date();
      const updatedAt = new Date();
      
      const blogPost: BlogPost = { 
        title: post.title,
        slug: post.slug,
        summary: post.summary || null,
        content: post.content,
        author: post.author || null,
        category: post.category || null,
        imageUrl: post.imageUrl || null,
        published: true,
        id,
        createdAt,
        updatedAt
      };
      this.blogPosts.set(id, blogPost);
    });
  }
  
  // Counselor operations
  async getAllCounselors(): Promise<Counselor[]> {
    return Array.from(this.counselors.values()).sort(
      (a, b) => {
        // Sort featured counselors first, then by name
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.name.localeCompare(b.name);
      }
    );
  }

  async getFeaturedCounselors(): Promise<Counselor[]> {
    return Array.from(this.counselors.values())
      .filter(counselor => counselor.isFeatured)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCounselorById(id: number): Promise<Counselor | undefined> {
    return this.counselors.get(id);
  }

  async createCounselor(insertCounselor: InsertCounselor): Promise<Counselor> {
    const id = this.currentCounselorId++;
    const createdAt = new Date();
    
    const counselor: Counselor = {
      id,
      name: insertCounselor.name,
      title: insertCounselor.title,
      description: insertCounselor.description,
      imageUrl: insertCounselor.imageUrl || null,
      specialties: insertCounselor.specialties || [],
      experience: insertCounselor.experience || null,
      isFeatured: insertCounselor.isFeatured || false,
      isVerified: insertCounselor.isVerified || false,
      availability: insertCounselor.availability || [],
      contactType: insertCounselor.contactType || null,
      contactUrl: insertCounselor.contactUrl || null,
      price: insertCounselor.price || null,
      rating: insertCounselor.rating || null,
      testimonials: insertCounselor.testimonials || [],
      createdAt,
      updatedAt: null
    };
    
    this.counselors.set(id, counselor);
    return counselor;
  }

  async updateCounselor(id: number, counselorData: Partial<InsertCounselor>): Promise<Counselor> {
    const counselor = this.counselors.get(id);
    if (!counselor) {
      throw new Error('Counselor not found');
    }
    
    const updatedAt = new Date();
    const updatedCounselor: Counselor = {
      ...counselor,
      ...counselorData,
      updatedAt
    };
    
    this.counselors.set(id, updatedCounselor);
    return updatedCounselor;
  }

  async deleteCounselor(id: number): Promise<boolean> {
    if (!this.counselors.has(id)) {
      return false;
    }
    
    this.counselors.delete(id);
    return true;
  }

  async close(): Promise<void> {
    // No resources to clean up for in-memory storage
    console.log("MemStorage.close() called - no resources to clean up");
    return Promise.resolve();
  }
}

export const storage = new MemStorage();
