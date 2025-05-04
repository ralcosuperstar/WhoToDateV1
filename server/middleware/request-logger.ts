import { Request, Response, NextFunction } from 'express';
import { logRequest } from '../utils/logging';

/**
 * Middleware to log request details and measure response time
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Record start time
  const start = Date.now();
  
  // Store original end function
  const originalEnd = res.end;
  
  // Override end function to capture timing
  res.end = function(chunk?: any, encoding?: any, callback?: any) {
    // Calculate request duration
    const duration = Date.now() - start;
    
    // Log the request
    logRequest(req.method, req.originalUrl || req.url, duration, res.statusCode);
    
    // Call the original end function
    return originalEnd.call(this, chunk, encoding, callback);
  } as any;
  
  next();
};
