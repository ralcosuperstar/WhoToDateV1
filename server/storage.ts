import { 
  users, type User, type InsertUser,
  quizAnswers, type QuizAnswer, type InsertQuizAnswer,
  reports, type Report, type InsertReport,
  payments, type Payment, type InsertPayment,
  blogPosts, type BlogPost, type InsertBlogPost
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz operations
  getQuizAnswers(userId: number): Promise<QuizAnswer | undefined>;
  createQuizAnswers(quizAnswer: InsertQuizAnswer): Promise<QuizAnswer>;
  updateQuizAnswers(id: number, answers: any, completed: boolean): Promise<QuizAnswer>;
  
  // Report operations
  getReport(id: number): Promise<Report | undefined>;
  getReportByUserId(userId: number): Promise<Report | undefined>;
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizAnswers: Map<number, QuizAnswer>;
  private reports: Map<number, Report>;
  private payments: Map<number, Payment>;
  private blogPosts: Map<number, BlogPost>;
  
  private currentUserId: number;
  private currentQuizId: number;
  private currentReportId: number;
  private currentPaymentId: number;
  private currentBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.quizAnswers = new Map();
    this.reports = new Map();
    this.payments = new Map();
    this.blogPosts = new Map();
    
    this.currentUserId = 1;
    this.currentQuizId = 1;
    this.currentReportId = 1;
    this.currentPaymentId = 1;
    this.currentBlogPostId = 1;
    
    // Add some sample blog posts
    this.initializeBlogPosts();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
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
      ...insertQuizAnswer, 
      id, 
      startedAt,
      completedAt: insertQuizAnswer.completed ? new Date() : undefined 
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
      completedAt: completed ? new Date() : quiz.completedAt
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
    const report: Report = { ...insertReport, id, createdAt };
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
    const payment: Payment = { ...insertPayment, id, createdAt };
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
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
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
    const blogPost: BlogPost = { ...insertBlogPost, id, publishedAt };
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
        imageUrl: "https://images.unsplash.com/photo-1622175469717-b8b0c95a9053?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "Relationship Psychology"
      },
      {
        title: "Navigating Family Expectations in Modern Indian Relationships",
        slug: "navigating-family-expectations",
        excerpt: "Balancing personal choice with family values can be challenging. Here's how to find harmony without sacrificing your happiness.",
        content: "# Navigating Family Expectations in Modern Indian Relationships\n\nIn Indian culture, relationships often extend beyond the couple to include both families. While this can provide a strong support system, it can also create unique challenges...",
        imageUrl: "https://images.unsplash.com/photo-1499568509606-0fde7674dceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "Cultural Insights"
      },
      {
        title: "Green, Yellow, Red: Understanding Your Compatibility Profile",
        slug: "understanding-compatibility-profile",
        excerpt: "What does your compatibility color mean? Discover the strengths and challenges of each profile and how to use this knowledge in your dating life.",
        content: "# Green, Yellow, Red: Understanding Your Compatibility Profile\n\nAt MyDate, we classify compatibility profiles into three categories: Green, Yellow, and Red. Each represents different relationship dynamics and compatibility levels...",
        imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "Compatibility Guide"
      }
    ];
    
    samplePosts.forEach(post => {
      const id = this.currentBlogPostId++;
      const publishedAt = new Date();
      const blogPost: BlogPost = { ...post, id, publishedAt };
      this.blogPosts.set(id, blogPost);
    });
  }
}

export const storage = new MemStorage();
