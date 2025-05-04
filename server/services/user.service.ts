import { IStorage } from '../storage';
import { User, InsertUser } from '@shared/schema';
import { logInfo, logError } from '../utils/logging';
import { cacheService } from './cache.service';

/**
 * Service for user-related operations
 */
export class UserService {
  private db: IStorage;
  private readonly CACHE_PREFIX = 'user';
  private readonly TTL_USER = 300; // 5 minutes

  constructor(db: IStorage) {
    this.db = db;
  }

  /**
   * Get a user by ID
   * @param id User ID
   * @returns User object or undefined
   */
  async getUserById(id: string | number): Promise<User | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-${id}`;
    
    // Try to get from cache first
    const cachedUser = cacheService.get<User>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }
    
    try {
      const user = await this.db.getUser(id);
      if (user) {
        // Cache the user
        cacheService.set(cacheKey, user, this.TTL_USER);
      }
      return user;
    } catch (error) {
      logError(`Error getting user with ID ${id}`, error);
      return undefined;
    }
  }

  /**
   * Get a user by email
   * @param email User email
   * @returns User object or undefined
   */
  async getUserByEmail(email: string): Promise<User | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-email-${email}`;
    
    // Try to get from cache first
    const cachedUser = cacheService.get<User>(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }
    
    try {
      const user = await this.db.getUserByEmail(email);
      if (user) {
        // Cache the user
        cacheService.set(cacheKey, user, this.TTL_USER);
        // Also cache by ID for future lookups
        cacheService.set(`${this.CACHE_PREFIX}-${user.id}`, user, this.TTL_USER);
      }
      return user;
    } catch (error) {
      logError(`Error getting user with email ${email}`, error);
      return undefined;
    }
  }

  /**
   * Create a new user
   * @param userData User data
   * @returns Created user
   */
  async createUser(userData: Partial<InsertUser>): Promise<User> {
    try {
      const user = await this.db.createUser(userData);
      logInfo(`Created new user with ID: ${user.id}`);
      
      // Invalidate any existing cache for this user
      this.invalidateUserCache(user.id);
      
      return user;
    } catch (error) {
      logError('Error creating user', error);
      throw error;
    }
  }

  /**
   * Update a user
   * @param id User ID
   * @param userData Updated user data
   * @returns Updated user
   */
  async updateUser(id: string | number, userData: Partial<InsertUser>): Promise<User> {
    try {
      const user = await this.db.updateUser(id, userData);
      logInfo(`Updated user with ID: ${user.id}`);
      
      // Invalidate any existing cache for this user
      this.invalidateUserCache(user.id);
      
      return user;
    } catch (error) {
      logError(`Error updating user with ID ${id}`, error);
      throw error;
    }
  }

  /**
   * Get user profile with related data
   * @param userId User ID
   * @returns User profile with quiz answers and report
   */
  async getUserProfile(userId: string | number): Promise<any> {
    const cacheKey = `user-profile-${userId}`;
    
    // Try to get from cache first
    const cachedProfile = cacheService.get<any>(cacheKey);
    if (cachedProfile) {
      return cachedProfile;
    }
    
    try {
      // Fetch user, quiz answers, and report in parallel
      const [user, quizAnswers, report] = await Promise.all([
        this.getUserById(userId),
        this.db.getQuizAnswers(userId),
        this.db.getReportByUserId(userId)
      ]);
      
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      // Construct the profile
      const profile = {
        user,
        quizAnswers,
        report
      };
      
      // Cache the profile
      cacheService.set(cacheKey, profile, this.TTL_USER);
      
      return profile;
    } catch (error) {
      logError(`Error getting profile for user with ID ${userId}`, error);
      throw error;
    }
  }

  /**
   * Invalidate all cache entries for a user
   * @param userId User ID
   */
  invalidateUserCache(userId: string | number): void {
    cacheService.del(`${this.CACHE_PREFIX}-${userId}`);
    cacheService.del(`user-profile-${userId}`);
  }
}
