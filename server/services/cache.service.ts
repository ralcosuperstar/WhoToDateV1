import NodeCache from 'node-cache';
import { logInfo, logDebug } from '../utils/logging';

/**
 * Application-wide caching service
 * Provides methods for storing and retrieving cached data
 */
class CacheService {
  private cache: NodeCache;
  
  constructor(stdTTL: number = 300) {
    this.cache = new NodeCache({ stdTTL: stdTTL }); // Default TTL: 5 minutes
    logInfo('Cache service initialized with default TTL: ' + stdTTL + 's');
  }

  /**
   * Get a value from the cache
   * @param key Cache key
   * @returns Cached value or undefined if not found
   */
  get<T>(key: string): T | undefined {
    const value = this.cache.get<T>(key);
    if (value !== undefined) {
      logDebug(`Cache hit for key: ${key}`);
    } else {
      logDebug(`Cache miss for key: ${key}`);
    }
    return value;
  }

  /**
   * Set a value in the cache
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in seconds (optional)
   * @returns true if successfully stored
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    logDebug(`Caching value for key: ${key}${ttl ? ' with TTL: ' + ttl + 's' : ''}`);
    return this.cache.set(key, value, ttl);
  }

  /**
   * Delete a value from the cache
   * @param key Cache key
   * @returns Number of deleted entries (0 or 1)
   */
  del(key: string): number {
    logDebug(`Deleting cache for key: ${key}`);
    return this.cache.del(key);
  }

  /**
   * Clear all cached entries
   */
  flush(): void {
    logInfo('Flushing entire cache');
    this.cache.flushAll();
  }

  /**
   * Invalidate all cache entries matching a pattern
   * @param pattern String pattern to match against keys
   */
  invalidatePattern(pattern: string): void {
    const keys = this.cache.keys();
    const matchingKeys = keys.filter(key => key.includes(pattern));
    
    if (matchingKeys.length > 0) {
      logInfo(`Invalidating ${matchingKeys.length} cache entries matching pattern: ${pattern}`);
      matchingKeys.forEach(key => this.cache.del(key));
    }
  }

  /**
   * Generate a cache key for a user and action
   * @param userId User ID
   * @param action Action name
   * @returns Formatted cache key
   */
  userCacheKey(userId: string | number, action: string): string {
    return `user-${userId}-${action}`;
  }
}

// Export a singleton instance
export const cacheService = new CacheService();
