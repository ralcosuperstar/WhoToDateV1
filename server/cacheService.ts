import NodeCache from 'node-cache';

// Create a global cache instance with 5 minute TTL default
export const appCache = new NodeCache({ stdTTL: 300 });

// Helper functions for common cache operations
export function getCached<T>(key: string): T | undefined {
  return appCache.get<T>(key);
}

export function setCached<T>(key: string, value: T, ttl?: number): boolean {
  return appCache.set(key, value, ttl || undefined);
}

export function deleteCached(key: string): number {
  return appCache.del(key);
}

export function flushCache(): void {
  appCache.flushAll();
}

// Invalidate cache for specific patterns (e.g., all user data)
export function invalidatePattern(pattern: string): void {
  const keys = appCache.keys();
  const matchingKeys = keys.filter(key => key.includes(pattern));
  if (matchingKeys.length > 0) {
    appCache.del(matchingKeys);
    console.log(`Invalidated ${matchingKeys.length} cache entries matching '${pattern}'`);
  }
}
