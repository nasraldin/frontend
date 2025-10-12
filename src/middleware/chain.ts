import type { FetchEvent } from '@solidjs/start/server';

import { logger } from '~/utils/logger';

import { getRequestContextValueTyped, setRequestContext } from './context';
import type { MiddlewareFactory, SolidMiddleware } from './types';

/**
 * Creates a middleware chain that executes multiple middleware functions in sequence
 * @param middlewares Array of middleware functions to execute
 * @returns A single middleware function that executes all middleware in sequence
 */
export function createMiddlewareChain(
  middlewares: SolidMiddleware[],
): SolidMiddleware {
  return async (event: FetchEvent) => {
    // Initialize request context for sharing data between middleware
    // Store context in the event for middleware to access
    setRequestContext(event, '__initialized__', true);

    for (let i = 0; i < middlewares.length; i++) {
      const middleware = middlewares[i];

      // Check if a response has already been set by previous middleware
      if (getRequestContextValueTyped(event, 'responseSet', false)) {
        logger.info(
          {
            current: i,
            name: middleware.name || 'anonymous',
            total: middlewares.length,
            url: event.request.url,
            method: event.request.method,
            responseSet: true,
          },
          'Middleware::chain: Skipping middleware - response already set',
        );
        break;
      }

      try {
        // Only log in development to avoid performance impact
        if (import.meta.env.DEV) {
          logger.info(
            {
              current: i,
              name: middleware.name || 'anonymous',
              total: middlewares.length,
              url: event.request.url,
              method: event.request.method,
            },
            `Middleware::chain`,
          );
        }

        await middleware(event);
      } catch (err) {
        logger.error(
          {
            err,
            url: event.request.url,
            method: event.request.method,
          },
          `Middleware::chain: Error at index ${i} in middleware ${middleware.name}`,
        );
        throw err;
      }
    }
  };
}

/**
 * Creates a middleware factory that can be configured
 * @param factory Function that creates middleware with configuration
 * @returns Middleware factory function
 */
export function createMiddlewareFactory(
  factory: MiddlewareFactory,
): MiddlewareFactory {
  return factory;
}

/**
 * Creates a conditional middleware that only executes if a condition is met
 * @param condition Function that determines if middleware should run
 * @param middleware The middleware to conditionally execute
 * @returns Conditional middleware
 */
export function createConditionalMiddleware(
  condition: (event: FetchEvent) => boolean,
  middleware: SolidMiddleware,
): SolidMiddleware {
  return async (event: FetchEvent) => {
    logger.info(
      {
        url: event.request.url,
        method: event.request.method,
      },
      'Middleware::conditional',
    );

    if (condition(event)) {
      logger.info('Middleware::conditional: condition met, executing middleware');
      await middleware(event);
    } else {
      logger.info(
        'Middleware::conditional: condition not met, skipping middleware',
      );
    }
  };
}

/**
 * Creates a middleware that can break the chain early
 * @param condition Function that determines if the chain should break
 * @returns Middleware that can break the chain
 */
export function createChainBreaker(
  condition: (event: FetchEvent) => boolean,
): SolidMiddleware {
  return async (event: FetchEvent) => {
    logger.info(
      {
        url: event.request.url,
        method: event.request.method,
      },
      'Middleware::chainBreaker',
    );

    if (condition(event)) {
      logger.info('Middleware::chainBreaker: breaking chain');
      // In SolidJS Start, we can't directly break the chain like in Next.js
      // Instead, we can set a flag in the context to indicate early termination
      setRequestContext(event, 'chainBroken', true);
      return;
    }
  };
}

/**
 * Creates a middleware that handles errors gracefully
 * @param middleware The middleware to wrap
 * @param errorHandler Optional error handler
 * @returns Error-handling middleware
 */
export function createErrorHandlingMiddleware(
  middleware: SolidMiddleware,
  errorHandler?: (error: Error, event: FetchEvent) => void,
): SolidMiddleware {
  return async (event: FetchEvent) => {
    try {
      await middleware(event);
    } catch (err) {
      logger.error(
        {
          err,
          url: event.request.url,
          method: event.request.method,
        },
        `Middleware::errorHandling: Error in ${middleware.name}`,
      );

      if (errorHandler) {
        errorHandler(err as Error, event);
      } else {
        // Default error handling - log and continue
        logger.error({ err }, 'Middleware error');
      }
    }
  };
}

/**
 * Creates a middleware that measures execution time
 * @param middleware The middleware to measure
 * @returns Performance-measuring middleware
 */
export function createPerformanceMiddleware(
  middleware: SolidMiddleware,
): SolidMiddleware {
  return async (event: FetchEvent) => {
    const start = performance.now();

    try {
      await middleware(event);
    } finally {
      const duration = performance.now() - start;
      logger.info(
        {
          duration: `${duration.toFixed(2)}ms`,
          url: event.request.url,
          method: event.request.method,
        },
        `Middleware::performance: ${middleware.name || 'anonymous'}`,
      );
    }
  };
}
