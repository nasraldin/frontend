import type { FetchEvent } from '@solidjs/start/server';

import { isProd } from '~/utils/env';
import { logger } from '~/utils/logger';

import type { SolidMiddleware } from './types';

/**
 * Creates a CSP (Content Security Policy) middleware for SolidJS Start
 * Based on production-proven CSP configuration
 * @returns SolidJS Start middleware function
 */
export function createCSPMiddleware(): SolidMiddleware {
  return async (event: FetchEvent) => {
    try {
      // Notes:
      // 1. SolidStart uses `eval` for data serialization, which may require you to include the 'unsafe-eval' directive in your CSP.
      //    For more information, see: https://github.com/solidjs/solid-start/issues/1825
      // 2. In development, Vite inlines small CSS files to improve performance, so you'll need to include the 'unsafe-inline' directive in development.
      // 3. During the build process, Vite inlines small assets as data URLs.
      //    Therefore, it's necessary to add `data:` to the relevant directives (e.g., img-src, font-src, etc.).
      //    For more details, see: https://vite.dev/config/build-options.html#build-assetsinlinelimit
      const csp = `
        default-src 'self';
        script-src ${
          isProd
            ? // Allow self for built JS files and unsafe-inline for inline scripts
              `'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com`
            : "'self' 'unsafe-inline' 'unsafe-eval' https: http:"
        };
        style-src ${isProd ? `'self' 'unsafe-inline'` : "'self' 'unsafe-inline'"};
        style-src-attr ${isProd ? `'unsafe-inline'` : "'unsafe-inline'"};
        img-src 'self' data: https:;
        connect-src ${isProd ? "'self' https:" : "'self' ws: wss: localhost:*"};
        object-src 'none';
        base-uri 'none';
        frame-ancestors 'none';
        form-action 'self';
      `.replace(/\s+/g, ' ');

      event.response.headers.set('Content-Security-Policy', csp);

      logger.info(
        {
          csp: csp.substring(0, 100) + '...',
          isProd,
        },
        'Set Content-Security-Policy header',
      );
    } catch (error) {
      logger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: event.request.url,
        },
        'Failed to set Content-Security-Policy header (headers may be immutable)',
      );
    }
  };
}

/**
 * Creates a conditional CSP middleware that only runs for non-API routes
 * @returns SolidJS Start middleware function
 */
export function createConditionalCSPMiddleware(): SolidMiddleware {
  const cspMiddleware = createCSPMiddleware();

  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);

    // Skip CSP for API routes and well-known paths
    if (pathname.startsWith('/api/') || pathname.startsWith('/.well-known/')) {
      return;
    }

    await cspMiddleware(event);
  };
}
