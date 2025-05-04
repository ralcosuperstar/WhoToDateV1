import { Request, Response, Router } from 'express';
import { CounselorService } from '../services/counselor.service';
import { IStorage } from '../storage';
import { z } from 'zod';
import { insertCounselorSchema } from '@shared/schema';

export function registerCounselorRoutes(router: Router, db: IStorage): void {
  const counselorService = new CounselorService(db);
  
  // Admin authentication middleware
  const requireAdmin = (req: Request, res: Response, next: Function) => {
    // Check if user is logged in and has admin role
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // In a real app, this would check a user role/flag
    // For now, we'll assume the currently logged in user is an admin
    next();
  };

  // Get all counselors (public route)
  router.get('/api/counselors', async (_req: Request, res: Response) => {
    try {
      const counselors = await counselorService.getAllCounselors();
      return res.json(counselors);
    } catch (error) {
      console.error('Error fetching counselors:', error);
      return res.status(500).json({ error: 'Failed to fetch counselors' });
    }
  });

  // Get featured counselors (public route)
  router.get('/api/counselors/featured', async (_req: Request, res: Response) => {
    try {
      const counselors = await counselorService.getFeaturedCounselors();
      return res.json(counselors);
    } catch (error) {
      console.error('Error fetching featured counselors:', error);
      return res.status(500).json({ error: 'Failed to fetch featured counselors' });
    }
  });

  // Get counselor by ID (public route)
  router.get('/api/counselors/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid counselor ID' });
      }
      
      const counselor = await counselorService.getCounselorById(id);
      if (!counselor) {
        return res.status(404).json({ error: 'Counselor not found' });
      }
      
      return res.json(counselor);
    } catch (error) {
      console.error('Error fetching counselor:', error);
      return res.status(500).json({ error: 'Failed to fetch counselor' });
    }
  });

  // Admin routes
  // Create counselor (admin only)
  router.post('/api/admin/counselors', requireAdmin, async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertCounselorSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: 'Invalid counselor data', details: validatedData.error.errors });
      }
      
      const counselor = await counselorService.createCounselor(validatedData.data);
      return res.status(201).json(counselor);
    } catch (error) {
      console.error('Error creating counselor:', error);
      return res.status(500).json({ error: 'Failed to create counselor' });
    }
  });

  // Update counselor (admin only)
  router.put('/api/admin/counselors/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid counselor ID' });
      }
      
      // Validate request body
      const updateSchema = insertCounselorSchema.partial();
      const validatedData = updateSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ error: 'Invalid counselor data', details: validatedData.error.errors });
      }
      
      const counselor = await counselorService.updateCounselor(id, validatedData.data);
      return res.json(counselor);
    } catch (error) {
      console.error('Error updating counselor:', error);
      return res.status(500).json({ error: 'Failed to update counselor' });
    }
  });

  // Delete counselor (admin only)
  router.delete('/api/admin/counselors/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid counselor ID' });
      }
      
      const result = await counselorService.deleteCounselor(id);
      if (!result) {
        return res.status(404).json({ error: 'Counselor not found' });
      }
      
      return res.json({ success: true });
    } catch (error) {
      console.error('Error deleting counselor:', error);
      return res.status(500).json({ error: 'Failed to delete counselor' });
    }
  });
}
