import { createMiddleware } from '@solidjs/start/middleware';
import type { FetchEvent } from '@solidjs/start/server';

import { logger } from '~/utils/logger';

import {
  createChainBreaker,
  createErrorHandlingMiddleware,
  createMiddlewareChain,
  createPerformanceMiddleware,
} from './chain';
import { setRequestContext } from './context';
// import { createConditionalAuthMiddleware } from './withAuth';
import { createConditionalCSPMiddleware } from './withCSP';
import {
  createCacheControlMiddleware,
  createConditionalHeadersMiddleware,
  createSecurityHeadersMiddleware,
} from './withHeaders';
import { createConditionalI18nMiddleware } from './withI18n';
import { createLogUuidMiddleware } from './withLogUuid';
import { createConditionalRateLimitMiddleware } from './withRateLimit';

/**
 * Initialize middleware - sets up basic request information
 */
const initMiddleware = async (event: FetchEvent) => {
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

  // Store basic request info in context
  setRequestContext(event, 'startTime', Date.now());
  setRequestContext(event, 'requestId', Math.random().toString(36).substring(7));
};

/**
 * Skip middleware if the 'skip-middleware' header is set to 'true'
 * or if the request is for well-known paths that should be excluded
 */
const skipMiddlewareCondition = (event: FetchEvent) => {
  const { pathname } = new URL(event.request.url);

  // Skip middleware for well-known paths and development tools
  const skipPaths = [
    '/.well-known/',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
  ];

  if (skipPaths.some((path) => pathname.startsWith(path))) {
    return true;
  }

  // Skip middleware if the 'skip-middleware' header is set to 'true'
  return event.request.headers.get('skip-middleware') === 'true';
};

/**
 * Create the main middleware chain
 */
const createMainMiddlewareChain = () => {
  const middlewares = [
    // Break the chain early if the 'skip-middleware' header is set to 'true'
    createChainBreaker(skipMiddlewareCondition),

    // Initialize setup or configuration
    initMiddleware,

    // Add logging and UUID tracking (early for request tracing)
    createLogUuidMiddleware(),

    // SECURITY: Rate limiting for API and auth endpoints (early security check)
    createConditionalRateLimitMiddleware(),

    // Handle internationalization and locale detection (after security checks)
    createConditionalI18nMiddleware(),

    // Handle authentication for private and protected routes
    // createConditionalAuthMiddleware(),

    // Handle content security policy (SECURITY: Enable CSP)
    createConditionalCSPMiddleware(),

    // Finalize by setting response headers (CORS, security, cache control)
    createConditionalHeadersMiddleware(),
    createSecurityHeadersMiddleware(),
    createCacheControlMiddleware(),
  ];

  // Wrap the middleware chain with performance monitoring in development
  const middlewareChain = createMiddlewareChain(middlewares);

  if (import.meta.env.DEV) {
    return createPerformanceMiddleware(middlewareChain);
  }

  return middlewareChain;
};

/**
 * Create error handling wrapper for the main middleware
 */
const createErrorHandledMiddleware = () => {
  const mainMiddleware = createMainMiddlewareChain();

  return createErrorHandlingMiddleware(mainMiddleware, (error, event) => {
    const isDev = import.meta.env.DEV;

    logger.error(
      {
        error: error.message,
        stack: error.stack,
        url: event.request.url,
        method: event.request.method,
        userAgent: event.request.headers.get('user-agent'),
      },
      'Middleware error:',
    );

    // Set error response with appropriate detail level
    const errorResponse = {
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request',
      ...(isDev && {
        details: error.message,
        stack: error.stack,
      }),
    };

    event.response = new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    // Mark that we've set a response to prevent further processing
    setRequestContext(event, 'responseSet', true);
  });
};

/**
 * Export the SolidJS Start middleware configuration
 */
export default createMiddleware({
  onRequest: createErrorHandledMiddleware(),
  onBeforeResponse: (_event) => {
    // Handle any final response modifications here if needed
    // This runs after the route handler but before sending the response
  },
});
