import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/error-handler';
import { successResponse, errorResponse } from '../utils/response-formatter';
import { BlogService } from '../services/blog.service';

/**
 * Initialize blog routes
 * @param blogService Blog service instance
 * @returns Router with blog routes
 */
export function initBlogRoutes(blogService: BlogService) {
  const router = Router();

  // Get all blog posts with pagination
  const getBlogPostsHandler = asyncHandler(async (req: Request, res: Response) => {
    // Set cache header for blog content (10 minutes)
    res.set('Cache-Control', 'public, max-age=600');
    
    // Parse pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const response = await blogService.getAllBlogPosts(page, limit);
    res.json(successResponse(response));
  });

  // Register both routes for the same handler (for backward compatibility)
  router.get('/blog', getBlogPostsHandler);
  router.get('/blog-posts', getBlogPostsHandler);

  // Get blog post by ID
  router.get('/blog-posts/:id', asyncHandler(async (req: Request, res: Response) => {
    // Set cache header for blog content (1 hour)
    res.set('Cache-Control', 'public, max-age=3600');
    
    const id = parseInt(req.params.id);
    const blogPost = await blogService.getBlogPostById(id);
    
    if (!blogPost) {
      return res.status(404).json(errorResponse('Blog post not found', 404));
    }
    
    // Generate ETag for client-side caching
    const etag = `"${id}-${blogPost.updatedAt || blogPost.createdAt || Date.now()}"`;
    res.set('ETag', etag);
    
    // Check If-None-Match header for client cache validation
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end(); // Not Modified
    }
    
    res.json(successResponse(blogPost));
  }));

  // Shared handler for fetching post by slug
  const getBlogPostBySlugHandler = asyncHandler(async (req: Request, res: Response) => {
    // Set cache header for blog content (1 hour)
    res.set('Cache-Control', 'public, max-age=3600');
    
    const slug = req.params.slug;
    const post = await blogService.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json(errorResponse('Blog post not found', 404));
    }
    
    // Generate ETag for client-side caching
    const etag = `"${slug}-${post.updatedAt || post.createdAt || Date.now()}"`;
    res.set('ETag', etag);
    
    // Check If-None-Match header for client cache validation
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end(); // Not Modified
    }
    
    res.json(successResponse(post));
  });

  // Register both routes for the same handler (for backward compatibility)
  router.get('/blog-posts/slug/:slug', getBlogPostBySlugHandler);
  router.get('/blog/:slug', getBlogPostBySlugHandler);

  return router;
}
