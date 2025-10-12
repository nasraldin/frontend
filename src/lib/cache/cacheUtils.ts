import { logger } from '~/utils/logger';

import { CacheAdapter } from './adapters';
import { CachedData } from './cachedData';

interface CacheOptions {
  ttl: number;
}

export async function getCachedData<T>(
  cacheAdapter: CacheAdapter,
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions,
): Promise<T> {
  const cachedResult = await cacheAdapter.get<T>(key);

  if (cachedResult && Date.now() - cachedResult.timestamp < options.ttl * 1000) {
    return cachedResult.data;
  }

  try {
    const freshData = await fetchFn();

    if (
      !cachedResult ||
      JSON.stringify(freshData) !== JSON.stringify(cachedResult.data)
    ) {
      const newCachedData: CachedData<T> = {
        data: freshData,
        timestamp: Date.now(),
      };
      await cacheAdapter.set(key, newCachedData, options.ttl);
    }

    return freshData;
  } catch (err) {
    logger.error({ err }, `Error fetching fresh data for key ${key}:`);
    if (cachedResult) {
      return cachedResult.data;
    }
    throw err;
  }
}
