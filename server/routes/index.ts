import { Router } from 'express';
import { initUserRoutes } from './user.routes';
import { initBlogRoutes } from './blog.routes';
import { initQuizRoutes } from './quiz.routes';
import { initReportRoutes } from './report.routes';
import { UserService, BlogService, QuizService, ReportService } from '../services';

/**
 * Initialize all API routes
 * @param services Object containing all service instances
 * @returns Router with all API routes
 */
export function initAPIRoutes(services: {
  userService: UserService;
  blogService: BlogService;
  quizService: QuizService;
  reportService: ReportService;
}) {
  const router = Router();

  // Register health check route
  router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Register all route modules
  router.use(initUserRoutes(services.userService));
  router.use(initBlogRoutes(services.blogService));
  router.use(initQuizRoutes(services.quizService));
  router.use(initReportRoutes(services.reportService));

  return router;
}
