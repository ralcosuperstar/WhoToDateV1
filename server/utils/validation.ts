import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './response-formatter';

/**
 * Middleware to validate request body against a Zod schema
 * @param schema The Zod schema to validate against
 */
export const validateRequest = (schema: z.ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json(errorResponse(
          "Validation error", 
          400, 
          { errors: result.error.format() }
        ));
      }
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };

/**
 * Middleware to validate request query parameters against a Zod schema
 * @param schema The Zod schema to validate against
 */
export const validateQuery = (schema: z.ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json(errorResponse(
          "Query validation error", 
          400, 
          { errors: result.error.format() }
        ));
      }
      req.query = result.data as any;
      next();
    } catch (error) {
      next(error);
    }
  };

/**
 * Middleware to validate request parameters against a Zod schema
 * @param schema The Zod schema to validate against
 */
export const validateParams = (schema: z.ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json(errorResponse(
          "Parameter validation error", 
          400, 
          { errors: result.error.format() }
        ));
      }
      req.params = result.data as any;
      next();
    } catch (error) {
      next(error);
    }
  };
