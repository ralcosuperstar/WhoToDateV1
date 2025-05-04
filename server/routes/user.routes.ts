import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth-middleware';
import { asyncHandler } from '../utils/error-handler';
import { successResponse } from '../utils/response-formatter';
import { UserService } from '../services/user.service';
import { z } from 'zod';
import { validateRequest } from '../utils/validation';

/**
 * Initialize user routes
 * @param userService User service instance
 * @returns Router with user routes
 */
export function initUserRoutes(userService: UserService) {
  const router = Router();

  // Get user based on session
  router.get('/user', isAuthenticated, asyncHandler(async (req: Request, res: Response) => {
    res.json(successResponse(req.user));
  }));

  // Get complete user profile with related data
  router.get('/user-profile', isAuthenticated, asyncHandler(async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const profile = await userService.getUserProfile(req.user.id);
    res.json(successResponse(profile));
  }));

  // Schema for email existence check
  const emailCheckSchema = z.object({
    email: z.string().email()
  });

  // Check if email exists
  router.post('/check-email-exists', 
    validateRequest(emailCheckSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const { email } = req.body;
      const user = await userService.getUserByEmail(email);
      res.json(successResponse({
        exists: !!user
      }));
    })
  );

  // Schema for ensuring user exists
  const ensureUserSchema = z.object({
    email: z.string().email(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z.string().optional()
  });

  // Ensure user exists (create if not)
  router.post('/ensure-user', 
    validateRequest(ensureUserSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const userData = req.body;
      
      // Check if user exists
      let user = await userService.getUserByEmail(userData.email);
      
      if (!user) {
        // Create new user
        user = await userService.createUser(userData);
        res.status(201).json(successResponse(user, 'User created'));
      } else {
        // Update existing user with any new fields
        const fieldsToUpdate = {};
        for (const field of ['first_name', 'last_name', 'phone_number']) {
          if (userData[field] && (!user[field] || user[field] !== userData[field])) {
            fieldsToUpdate[field] = userData[field];
          }
        }
        
        if (Object.keys(fieldsToUpdate).length > 0) {
          user = await userService.updateUser(user.id, fieldsToUpdate);
        }
        
        res.json(successResponse(user, 'User found'));
      }
    })
  );

  return router;
}
