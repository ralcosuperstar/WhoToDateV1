import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth-middleware';
import { asyncHandler } from '../utils/error-handler';
import { successResponse, errorResponse } from '../utils/response-formatter';
import { QuizService } from '../services/quiz.service';
import { z } from 'zod';
import { validateRequest } from '../utils/validation';
import { logInfo } from '../utils/logging';

/**
 * Initialize quiz routes
 * @param quizService Quiz service instance
 * @returns Router with quiz routes
 */
export function initQuizRoutes(quizService: QuizService) {
  const router = Router();

  // Get quiz answers for authenticated user
  router.get('/quiz', isAuthenticated, asyncHandler(async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json(errorResponse('Unauthorized', 401));
    }

    const quizAnswers = await quizService.getQuizAnswers(req.user.id);
    if (!quizAnswers) {
      return res.json(successResponse(null, 'No quiz answers found'));
    }

    res.json(successResponse(quizAnswers));
  }));

  // Schema for quiz submission
  const quizSubmissionSchema = z.object({
    answers: z.any(),
    completed: z.boolean().optional().default(false)
  });

  // Submit quiz answers
  router.post('/quiz', 
    isAuthenticated,
    validateRequest(quizSubmissionSchema),
    asyncHandler(async (req: Request, res: Response) => {
      logInfo('Quiz submission received');
      
      if (!req.user?.id) {
        return res.status(401).json(errorResponse('Unauthorized', 401));
      }

      const { answers, completed } = req.body;
      
      const quizAnswers = await quizService.saveQuizAnswers({
        userId: req.user.id,
        answers,
        completed
      });

      res.json(successResponse(quizAnswers, 'Quiz answers saved successfully'));
    })
  );

  return router;
}
