import { 
  users, type User, type InsertUser,
  quizAnswers, type QuizAnswer, type InsertQuizAnswer,
  reports, type Report, type InsertReport,
  payments, type Payment, type InsertPayment,
  blogPosts, type BlogPost, type InsertBlogPost
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Interface for all storage operations
export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User operations - now uses string IDs for UUID compatibility
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, userData: Partial<InsertUser>): Promise<User>;
  setVerificationToken(userId: string, token: string, expiry: Date): Promise<User>;
  verifyUser(userId: string): Promise<User>;
  
  // OTP operations
  setOTP(userId: string, otp: string, expiry: Date): Promise<User>;
  
  // Quiz operations
  getQuizAnswers(userId: string): Promise<QuizAnswer | undefined>;
  createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer>;
  updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer>;
  
  // Report operations
  getReport(id: number): Promise<Report | undefined>;
  getReportByUserId(userId: string): Promise<Report | undefined>;
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
  
  // Utility
  close(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizAnswers: Map<number, QuizAnswer>;
  private reports: Map<number, Report>;
  private payments: Map<number, Payment>;
  private blogPosts: Map<number, BlogPost>;
  
  private currentQuizId: number;
  private currentReportId: number;
  private currentPaymentId: number;
  private currentBlogPostId: number;
  
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.quizAnswers = new Map();
    this.reports = new Map();
    this.payments = new Map();
    this.blogPosts = new Map();
    
    this.currentQuizId = 1;
    this.currentReportId = 1;
    this.currentPaymentId = 1;
    this.currentBlogPostId = 1;
    
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
  
  async setOTP(userId: number, otp: string, expiry: Date): Promise<User> {
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
    const id = this.currentUserId++;
    const createdAt = new Date();
    // Ensure all fields are properly initialized with null rather than undefined
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      password: insertUser.password || '',
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
      otpExpiry: null
    };
    this.users.set(id, user);
    return user;
  }
  
  // Removed updateUserByClerkId - no longer needed
  
  // Removed linkUserToClerk - no longer needed
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
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
  
  async setVerificationToken(userId: number, token: string, expiry: Date): Promise<User> {
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
  
  async verifyUser(userId: number): Promise<User> {
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
  async getQuizAnswers(userId: number): Promise<QuizAnswer | undefined> {
    return Array.from(this.quizAnswers.values()).find(
      (quiz) => quiz.userId === userId,
    );
  }
  
  async createQuizAnswers(insertQuizAnswer: InsertQuizAnswer): Promise<QuizAnswer> {
    const id = this.currentQuizId++;
    const startedAt = new Date();
    const quizAnswer: QuizAnswer = { 
      userId: insertQuizAnswer.userId,
      answers: insertQuizAnswer.answers,
      completed: insertQuizAnswer.completed || false,
      id, 
      startedAt,
      completedAt: insertQuizAnswer.completed ? new Date() : null 
    };
    this.quizAnswers.set(id, quizAnswer);
    return quizAnswer;
  }
  
  async updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer> {
    const quiz = this.quizAnswers.get(id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    const updatedQuiz: QuizAnswer = { 
      ...quiz, 
      answers, 
      completed,
      completedAt: completed ? new Date() : (quiz.completedAt || null)
    };
    
    this.quizAnswers.set(id, updatedQuiz);
    return updatedQuiz;
  }
  
  // Report operations
  async getReport(id: number): Promise<Report | undefined> {
    return this.reports.get(id);
  }
  
  async getReportByUserId(userId: number): Promise<Report | undefined> {
    return Array.from(this.reports.values()).find(
      (report) => report.userId === userId
    );
  }
  
  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.currentReportId++;
    const createdAt = new Date();
    const report: Report = { 
      userId: insertReport.userId,
      quizId: insertReport.quizId,
      report: insertReport.report,
      compatibilityColor: insertReport.compatibilityColor,
      isPaid: insertReport.isPaid || false,
      id, 
      createdAt
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
    const payment: Payment = { 
      userId: insertPayment.userId,
      reportId: insertPayment.reportId,
      amount: insertPayment.amount,
      status: insertPayment.status,
      razorpayPaymentId: insertPayment.razorpayPaymentId || null,
      id, 
      createdAt 
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
        const aTime = a.publishedAt ? a.publishedAt.getTime() : 0;
        const bTime = b.publishedAt ? b.publishedAt.getTime() : 0;
        return bTime - aTime;
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
    const publishedAt = new Date();
    const blogPost: BlogPost = { 
      title: insertBlogPost.title,
      slug: insertBlogPost.slug,
      excerpt: insertBlogPost.excerpt,
      content: insertBlogPost.content,
      category: insertBlogPost.category,
      imageUrl: insertBlogPost.imageUrl || null,
      id, 
      publishedAt
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
        excerpt: "Learn how your early life experiences shape your adult relationships and how to work with different attachment styles.",
        content: "# Understanding Attachment Styles\n\nAttachment theory, developed by John Bowlby and expanded by Mary Ainsworth, suggests that the bonds we form with our primary caregivers in infancy create a template for how we form relationships throughout life...",
        imageUrl: "https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Attachment+Styles",
        category: "Relationship Psychology"
      },
      {
        title: "Navigating Family Expectations in Modern Indian Relationships",
        slug: "navigating-family-expectations",
        excerpt: "Balancing personal choice with family values can be challenging. Here's how to find harmony without sacrificing your happiness.",
        content: "# Navigating Family Expectations in Modern Indian Relationships\n\nIn Indian culture, relationships often extend beyond the couple to include both families. While this can provide a strong support system, it can also create unique challenges...",
        imageUrl: "https://via.placeholder.com/600x400/4ecdc4/ffffff?text=Family+Expectations",
        category: "Cultural Insights"
      },
      {
        title: "Green, Yellow, Red: Understanding Your Compatibility Profile",
        slug: "understanding-compatibility-profile",
        excerpt: "What does your compatibility color mean? Discover the strengths and challenges of each profile and how to use this knowledge in your dating life.",
        content: "# Green, Yellow, Red: Understanding Your Compatibility Profile\n\nAt MyDate, we classify compatibility profiles into three categories: Green, Yellow, and Red. Each represents different relationship dynamics and compatibility levels...",
        imageUrl: "https://via.placeholder.com/600x400/ff9f1c/ffffff?text=Compatibility+Profiles",
        category: "Compatibility Guide"
      },
      {
        title: "Building Emotional Intelligence for Healthier Relationships",
        slug: "emotional-intelligence-relationships",
        excerpt: "Discover how developing your emotional intelligence can lead to deeper connections and fewer conflicts.",
        content: "# Building Emotional Intelligence for Healthier Relationships\n\nEmotional intelligence (EQ) is the ability to understand, use, and manage your emotions in positive ways to relieve stress, communicate effectively, empathize with others, overcome challenges, and defuse conflict...",
        imageUrl: "https://via.placeholder.com/600x400/9c6644/ffffff?text=Emotional+Intelligence",
        category: "Relationship Skills"
      },
      {
        title: "Dating in the Digital Age: Navigating Apps With Authenticity",
        slug: "dating-apps-authenticity",
        excerpt: "How to stay true to yourself while using dating apps in India, and still find meaningful connections.",
        content: "# Dating in the Digital Age: Navigating Apps With Authenticity\n\nDating apps have transformed how young Indians meet potential partners. While they offer unprecedented access to new connections, they also present challenges to maintaining authenticity...",
        imageUrl: "https://via.placeholder.com/600x400/f9c74f/ffffff?text=Digital+Dating",
        category: "Modern Dating"
      },
      {
        title: "The Science Behind Why Opposites Don't Actually Attract",
        slug: "science-opposites-attract-myth",
        excerpt: "Research shows that similarity, not opposition, predicts relationship success. Learn what science has to say about compatibility.",
        content: "# The Science Behind Why Opposites Don't Actually Attract\n\nContrary to popular belief, psychological research consistently shows that we are attracted to people who share our values, beliefs, and personality traits...",
        imageUrl: "https://via.placeholder.com/600x400/43aa8b/ffffff?text=Attraction+Science",
        category: "Relationship Science"
      }
    ];
    
    samplePosts.forEach(post => {
      const id = this.currentBlogPostId++;
      const publishedAt = new Date();
      const blogPost: BlogPost = { 
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        imageUrl: post.imageUrl || null,
        id,
        publishedAt
      };
      this.blogPosts.set(id, blogPost);
    });
  }
}

export const storage = new MemStorage();
