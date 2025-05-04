import { Request, Response, NextFunction } from 'express';

/**
 * Async handler to wrap route handlers and standardize error handling
 * @param fn The async route handler function
 */
export const asyncHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.error(`Error in ${req.method} ${req.path}:`, err);
      res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
        error: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
        timestamp: new Date().toISOString()
      });
    });
  };

/**
 * Error middleware for Express
 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  // Create standardized error response
  const errorResponse = {
    success: false,
    message: message,
    // Only include details in development mode
    error: process.env.NODE_ENV !== 'production' ? {
      stack: err.stack,
      details: err.details || err.data || undefined
    } : undefined,
    timestamp: new Date().toISOString()
  };

  res.status(status).json(errorResponse);
  console.error('Error in request:', err);
};
