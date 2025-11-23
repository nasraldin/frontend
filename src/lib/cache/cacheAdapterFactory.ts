import { CacheAdapter, UpstashRedisAdapter } from './adapters';
import { CacheAdapterProvider } from './cacheAdapterProvider';

const CACHE_ADAPTER = import.meta.env.CACHE_ADAPTER;
const UPSTASH_REDIS_REST_URL = import.meta.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

export function getCacheAdapter(): CacheAdapter {
  if (CACHE_ADAPTER === CacheAdapterProvider.Upstash) {
    return new UpstashRedisAdapter(
      UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN,
    );
  }
  return null as unknown as CacheAdapter;
}
