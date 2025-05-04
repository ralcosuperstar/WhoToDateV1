import { IStorage } from '../storage';
import { BlogPost, InsertBlogPost } from '@shared/schema';
import { logInfo, logError } from '../utils/logging';
import { cacheService } from './cache.service';

/**
 * Service for blog-related operations
 */
export class BlogService {
  private db: IStorage;
  private readonly CACHE_PREFIX = 'blog';
  private readonly TTL_BLOG_POST = 3600; // 1 hour
  private readonly TTL_BLOG_LIST = 600; // 10 minutes

  constructor(db: IStorage) {
    this.db = db;
  }

  /**
   * Get all blog posts with pagination
   * @param page Page number
   * @param limit Items per page
   * @returns Paginated blog posts with metadata
   */
  async getAllBlogPosts(page: number = 1, limit: number = 10): Promise<any> {
    const cacheKey = `${this.CACHE_PREFIX}-posts-${page}-${limit}`;
    
    // Try to get from cache first
    const cachedPosts = cacheService.get<any>(cacheKey);
    if (cachedPosts) {
      return cachedPosts;
    }
    
    try {
      // Fetch all posts (we'll paginate manually)
      const allPosts = await this.db.getAllBlogPosts();
      
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Get total count
      const total = allPosts.length;
      
      // Paginate posts
      const paginatedPosts = allPosts.slice(offset, offset + limit);
      
      // Prepare response
      const response = {
        posts: paginatedPosts,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
      
      // Cache the result
      cacheService.set(cacheKey, response, this.TTL_BLOG_LIST);
      
      return response;
    } catch (error) {
      logError('Error fetching blog posts', error);
      throw error;
    }
  }

  /**
   * Get a blog post by ID
   * @param id Blog post ID
   * @returns Blog post or undefined
   */
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-post-id-${id}`;
    
    // Try to get from cache first
    const cachedPost = cacheService.get<BlogPost>(cacheKey);
    if (cachedPost) {
      return cachedPost;
    }
    
    try {
      const post = await this.db.getBlogPostById(id);
      if (post) {
        // Cache the post
        cacheService.set(cacheKey, post, this.TTL_BLOG_POST);
      }
      return post;
    } catch (error) {
      logError(`Error getting blog post with ID ${id}`, error);
      return undefined;
    }
  }

  /**
   * Get a blog post by slug
   * @param slug Blog post slug
   * @returns Blog post or undefined
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-post-slug-${slug}`;
    
    // Try to get from cache first
    const cachedPost = cacheService.get<BlogPost>(cacheKey);
    if (cachedPost) {
      return cachedPost;
    }
    
    try {
      const post = await this.db.getBlogPostBySlug(slug);
      if (post) {
        // Cache the post
        cacheService.set(cacheKey, post, this.TTL_BLOG_POST);
        // Also cache by ID for future lookups
        cacheService.set(`${this.CACHE_PREFIX}-post-id-${post.id}`, post, this.TTL_BLOG_POST);
      }
      return post;
    } catch (error) {
      logError(`Error getting blog post with slug ${slug}`, error);
      return undefined;
    }
  }

  /**
   * Create a new blog post
   * @param postData Blog post data
   * @returns Created blog post
   */
  async createBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    try {
      const post = await this.db.createBlogPost(postData);
      logInfo(`Created new blog post with ID: ${post.id}`);
      
      // Invalidate blog list cache as the post list has changed
      this.invalidateBlogListCache();
      
      return post;
    } catch (error) {
      logError('Error creating blog post', error);
      throw error;
    }
  }

  /**
   * Invalidate all blog list cache entries
   */
  invalidateBlogListCache(): void {
    cacheService.invalidatePattern(`${this.CACHE_PREFIX}-posts-`);
  }

  /**
   * Invalidate cache for a specific blog post
   * @param postId Post ID
   * @param slug Post slug
   */
  invalidateBlogPostCache(postId: number, slug?: string): void {
    cacheService.del(`${this.CACHE_PREFIX}-post-id-${postId}`);
    if (slug) {
      cacheService.del(`${this.CACHE_PREFIX}-post-slug-${slug}`);
    }
  }
}
