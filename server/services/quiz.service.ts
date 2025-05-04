import { IStorage } from '../storage';
import { QuizAnswer, InsertQuizAnswer } from '@shared/schema';
import { logInfo, logError } from '../utils/logging';
import { cacheService } from './cache.service';

/**
 * Service for quiz-related operations
 */
export class QuizService {
  private db: IStorage;
  private readonly CACHE_PREFIX = 'quiz';
  private readonly TTL_QUIZ = 300; // 5 minutes

  constructor(db: IStorage) {
    this.db = db;
  }

  /**
   * Get quiz answers for a user
   * @param userId User ID
   * @returns Quiz answers or undefined
   */
  async getQuizAnswers(userId: string | number): Promise<QuizAnswer | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-${userId}`;
    
    // Try to get from cache first
    const cachedAnswers = cacheService.get<QuizAnswer>(cacheKey);
    if (cachedAnswers) {
      return cachedAnswers;
    }
    
    try {
      const answers = await this.db.getQuizAnswers(userId);
      if (answers) {
        // Cache the answers
        cacheService.set(cacheKey, answers, this.TTL_QUIZ);
      }
      return answers;
    } catch (error) {
      logError(`Error getting quiz answers for user ${userId}`, error);
      return undefined;
    }
  }

  /**
   * Save quiz answers for a user
   * @param quizData Quiz data
   * @returns Created or updated quiz answers
   */
  async saveQuizAnswers(quizData: InsertQuizAnswer & { completed?: boolean }): Promise<QuizAnswer> {
    try {
      // Check if user already has quiz answers
      const existingAnswers = await this.db.getQuizAnswers(quizData.userId);
      
      let savedAnswers: QuizAnswer;
      if (existingAnswers) {
        // Update existing answers
        savedAnswers = await this.db.updateQuizAnswers(
          existingAnswers.id,
          quizData.answers,
          quizData.completed || false
        );
        logInfo(`Updated quiz answers for user: ${quizData.userId}`);
      } else {
        // Create new answers
        savedAnswers = await this.db.createQuizAnswers({
          userId: quizData.userId,
          answers: quizData.answers,
          completed: quizData.completed || false
        });
        logInfo(`Created new quiz answers for user: ${quizData.userId}`);
      }
      
      // Invalidate cache
      this.invalidateQuizCache(quizData.userId);
      
      return savedAnswers;
    } catch (error) {
      logError(`Error saving quiz answers for user ${quizData.userId}`, error);
      throw error;
    }
  }

  /**
   * Invalidate quiz cache for a user
   * @param userId User ID
   */
  invalidateQuizCache(userId: string | number): void {
    cacheService.del(`${this.CACHE_PREFIX}-${userId}`);
    // Also invalidate user profile cache since it contains quiz data
    cacheService.del(`user-profile-${userId}`);
  }
}
