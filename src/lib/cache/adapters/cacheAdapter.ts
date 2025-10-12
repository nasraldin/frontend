import { CachedData } from '../cachedData';

export interface CacheAdapter {
  get<T>(key: string): Promise<CachedData<T> | null>;
  set<T>(key: string, value: CachedData<T>, ttl?: number): Promise<void>;
}
