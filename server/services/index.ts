import { IStorage } from '../storage';
import { cacheService } from './cache.service';
import { UserService } from './user.service';
import { QuizService } from './quiz.service';
import { ReportService } from './report.service';
import { BlogService } from './blog.service';

/**
 * Initialize all services with the provided database connection
 * @param db Database storage instance
 * @returns Object containing all initialized services
 */
export function initServices(db: IStorage) {
  return {
    cacheService,
    userService: new UserService(db),
    quizService: new QuizService(db),
    reportService: new ReportService(db),
    blogService: new BlogService(db)
  };
}

// Re-export all services
export { cacheService } from './cache.service';
export { UserService } from './user.service';
export { QuizService } from './quiz.service';
export { ReportService } from './report.service';
export { BlogService } from './blog.service';
