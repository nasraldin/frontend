import { CacheAdapter, UpstashRedisAdapter } from './adapters';
import { CacheAdapterProvider } from './cacheAdapterProvider';

const CACHE_ADAPTER = import.meta.env.CACHE_ADAPTER;
const UPSTASH_REDIS_REST_URL = import.meta.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

export function getCacheAdapter(): CacheAdapter {
  switch (CACHE_ADAPTER) {
    case CacheAdapterProvider.Upstash:
      return new UpstashRedisAdapter(
        UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN,
      );
    default:
      return null as unknown as CacheAdapter;
  }
}
