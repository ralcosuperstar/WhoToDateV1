import { appCache } from '../cacheService';
import { IStorage } from '../storage';
import { Counselor, InsertCounselor } from '@shared/schema';

export class CounselorService {
  private db: IStorage;
  private cacheKeyPrefix = 'counselor:';

  constructor(storage: IStorage) {
    this.db = storage;
  }

  // Get all counselors
  async getAllCounselors(): Promise<Counselor[]> {
    const cacheKey = `${this.cacheKeyPrefix}all`;
    const cached = appCache.get<Counselor[]>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const counselors = await this.db.getAllCounselors();
    appCache.set(cacheKey, counselors, 3600); // Cache for 1 hour
    return counselors;
  }

  // Get featured counselors
  async getFeaturedCounselors(): Promise<Counselor[]> {
    const cacheKey = `${this.cacheKeyPrefix}featured`;
    const cached = appCache.get<Counselor[]>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const counselors = await this.db.getFeaturedCounselors();
    appCache.set(cacheKey, counselors, 3600); // Cache for 1 hour
    return counselors;
  }

  // Get counselor by ID
  async getCounselorById(id: number): Promise<Counselor | undefined> {
    const cacheKey = `${this.cacheKeyPrefix}${id}`;
    const cached = appCache.get<Counselor>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const counselor = await this.db.getCounselorById(id);
    if (counselor) {
      appCache.set(cacheKey, counselor, 3600); // Cache for 1 hour
    }
    return counselor;
  }

  // Create a new counselor
  async createCounselor(counselorData: InsertCounselor): Promise<Counselor> {
    const counselor = await this.db.createCounselor(counselorData);
    this.invalidateCounselorCache();
    return counselor;
  }

  // Update a counselor
  async updateCounselor(id: number, counselorData: Partial<InsertCounselor>): Promise<Counselor> {
    const counselor = await this.db.updateCounselor(id, counselorData);
    this.invalidateCounselorCache();
    return counselor;
  }

  // Delete a counselor
  async deleteCounselor(id: number): Promise<boolean> {
    const result = await this.db.deleteCounselor(id);
    if (result) {
      this.invalidateCounselorCache();
    }
    return result;
  }

  // Invalidate cache when counselors are modified
  private invalidateCounselorCache(): void {
    appCache.keys().forEach(key => {
      if (key.startsWith(this.cacheKeyPrefix)) {
        appCache.del(key);
      }
    });
  }
}
