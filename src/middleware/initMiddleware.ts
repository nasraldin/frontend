import type { FetchEvent } from '@solidjs/start/server';

import { logger } from '~/utils/logger';

import type { SolidMiddleware } from './types';

export function initMiddleware(middleware: SolidMiddleware): SolidMiddleware {
  return async (event: FetchEvent) => {
    // Perform whatever logic the first middleware needs to do
    const { url, method } = event.request;
    const userAgent = event.request.headers.get('user-agent') || '';

    logger.info(
      {
        url,
        method,
        userAgent: userAgent.substring(0, 100), // Truncate for logging
      },
      'Middleware::initMiddleware',
    );

    // Call the next middleware
    await middleware(event);
  };
}
