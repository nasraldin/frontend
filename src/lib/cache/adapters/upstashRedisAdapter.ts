import { Redis } from '@upstash/redis';

import { CachedData } from '../cachedData';
import { CacheAdapter } from './cacheAdapter';

export class UpstashRedisAdapter implements CacheAdapter {
  private client: Redis;

  constructor(url: string, token: string) {
    this.client = new Redis({
      url,
      token,
    });
  }

  async get<T>(key: string): Promise<CachedData<T> | null> {
    const value = await this.client.get(key);
    return value as CachedData<T> | null;
  }

  async set<T>(key: string, value: CachedData<T>, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, { ex: ttl });
    } else {
      await this.client.set(key, value);
    }
  }
}
