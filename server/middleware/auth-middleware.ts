import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response-formatter';
import { logWarning } from '../utils/logging';
import { User } from '@shared/schema';

// Declare the session data interface
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * Middleware to check if user is authenticated
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    logWarning(`Unauthorized access attempt: ${req.originalUrl}`);
    return res.status(401).json(errorResponse('Unauthorized', 401));
  }
  
  // User is authenticated
  next();
};

/**
 * Middleware to check if user is verified
 */
export const isVerified = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json(errorResponse('Unauthorized', 401));
  }
  
  if (!req.user.isVerified) {
    return res.status(403).json(errorResponse('Email not verified', 403));
  }
  
  next();
};

/**
 * Middleware to check if user has admin role
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json(errorResponse('Unauthorized', 401));
  }
  
  // Check if user has admin role (adapt this logic based on your User schema)
  const isUserAdmin = req.user.role === 'admin';
  if (!isUserAdmin) {
    logWarning(`Admin access attempt by non-admin user: ${req.user.id}`);
    return res.status(403).json(errorResponse('Forbidden', 403));
  }
  
  next();
};
