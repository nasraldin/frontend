import type { FetchEvent } from '@solidjs/start/server';

import { ContentType, HttpHeaderName } from '~/constants';
import { logger } from '~/utils/logger';

import { setRequestContext } from './context';
import type { SolidMiddleware } from './types';
import {
  createCORSErrorResponse,
  createPreflightResponse,
  getOriginFromRequest,
  isOriginAllowed,
  isPreflightRequest,
  setCORSHeaders,
} from './utils/headers-utils';

/**
 * Creates a headers middleware for SolidJS Start
 * @param config CORS configuration
 * @returns SolidJS Start middleware function
 */
export function createHeadersMiddleware(): SolidMiddleware {
  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);
    const origin = getOriginFromRequest(event);
    const apiRegex = new RegExp(/\/api\//); // Match API routes

    logger.info(
      {
        origin,
        pathname,
        method: event.request.method,
      },
      'Middleware::withHeaders::Request Info',
    );

    // Handle OPTIONS request (preflight request)
    if (isPreflightRequest(event)) {
      logger.info('Middleware::OPTIONS request received');

      // Check if the origin is allowed before responding to OPTIONS request
      if (origin && isOriginAllowed(origin)) {
        event.response = createPreflightResponse(event, origin);
        // Mark that we've set a response to prevent further processing
        setRequestContext(event, 'responseSet', true);
        return;
      } else {
        logger.error(
          {
            isMiddleware: true,
          },
          `CORS error::OPTIONS:: Origin ${origin} is not allowed`,
        );
        event.response = createCORSErrorResponse('Not allowed by CORS');
        // Mark that we've set a response to prevent further processing
        setRequestContext(event, 'responseSet', true);
        return;
      }
    }

    // Set CORS headers based on whitelist
    if (origin && isOriginAllowed(origin)) {
      setCORSHeaders(event, origin);
    } else {
      logger.error(
        {
          isMiddleware: true,
        },
        `CORS error: Origin ${origin} is not allowed`,
      );
      event.response = createCORSErrorResponse('Not allowed by CORS');
      // Mark that we've set a response to prevent further processing
      setRequestContext(event, 'responseSet', true);
      return;
    }

    // If the request is to an API endpoint, set the Content-Type to JSON
    if (apiRegex.test(pathname)) {
      try {
        event.response.headers.set(
          HttpHeaderName.ContentType,
          ContentType.JSON_UTF8,
        );
      } catch (error) {
        logger.warn(
          {
            error: error instanceof Error ? error.message : 'Unknown error',
            url: event.request.url,
          },
          'Failed to set Content-Type header (headers may be immutable)',
        );
      }
    }

    // Add the Vary header for caching based on origin
    try {
      event.response.headers.append('Vary', 'Origin');
    } catch (error) {
      logger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: event.request.url,
        },
        'Failed to set Vary header (headers may be immutable)',
      );
    }
  };
}

/**
 * Creates a conditional headers middleware that only runs for API routes
 * @param config CORS configuration
 * @returns SolidJS Start middleware function
 */
export function createConditionalHeadersMiddleware(): SolidMiddleware {
  const headersMiddleware = createHeadersMiddleware();

  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);

    // Only apply headers middleware to API routes or when CORS is needed
    if (pathname.startsWith('/api/') || isPreflightRequest(event)) {
      await headersMiddleware(event);
    }
  };
}

/**
 * Creates a CORS-only middleware for API routes
 * @param config CORS configuration
 * @returns SolidJS Start middleware function
 */
export function createCORSMiddleware(): SolidMiddleware {
  return async (event: FetchEvent) => {
    const origin = getOriginFromRequest(event);

    // Handle OPTIONS request (preflight request)
    if (isPreflightRequest(event)) {
      if (origin && isOriginAllowed(origin)) {
        event.response = createPreflightResponse(event, origin);
        return;
      } else {
        event.response = createCORSErrorResponse('Not allowed by CORS');
        return;
      }
    }

    // Set CORS headers for regular requests
    if (origin && isOriginAllowed(origin)) {
      setCORSHeaders(event, origin);
    } else {
      event.response = createCORSErrorResponse('Not allowed by CORS');
      return;
    }
  };
}

/**
 * Creates a security headers middleware
 * @returns SolidJS Start middleware function
 */
export function createSecurityHeadersMiddleware(): SolidMiddleware {
  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);

    // Skip security headers for well-known paths
    if (pathname.startsWith('/.well-known/')) {
      return;
    }

    // Set security headers with error handling
    try {
      event.response.headers.set('X-Content-Type-Options', 'nosniff');
      event.response.headers.set('X-Frame-Options', 'DENY');
      event.response.headers.set('X-XSS-Protection', '1; mode=block');
      event.response.headers.set(
        'Referrer-Policy',
        'strict-origin-when-cross-origin',
      );
      event.response.headers.set(
        'Permissions-Policy',
        'geolocation=(), microphone=(), camera=()',
      );
    } catch (error) {
      logger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: event.request.url,
        },
        'Failed to set security headers (headers may be immutable)',
      );
    }
  };
}

/**
 * Creates a cache control middleware
 * @param maxAge Cache max age in seconds
 * @returns SolidJS Start middleware function
 */
export function createCacheControlMiddleware(maxAge = 3600): SolidMiddleware {
  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);

    // Skip cache control for well-known paths
    if (pathname.startsWith('/.well-known/')) {
      return;
    }

    try {
      // Set cache control based on route type
      if (pathname.startsWith('/api/')) {
        // API routes should not be cached
        event.response.headers.set(
          'Cache-Control',
          'no-cache, no-store, must-revalidate',
        );
        event.response.headers.set('Pragma', 'no-cache');
        event.response.headers.set('Expires', '0');
      } else if (
        pathname.startsWith('/static/') ||
        pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/)
      ) {
        // Static assets can be cached
        event.response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
      } else {
        // Other routes use default caching
        event.response.headers.set('Cache-Control', 'public, max-age=300');
      }
    } catch (error) {
      logger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: event.request.url,
        },
        'Failed to set cache control headers (headers may be immutable)',
      );
    }
  };
}
