import type { FetchEvent } from '@solidjs/start/server';

import { logger } from '~/utils/logger';

import { getRequestContextValueTyped, setRequestContext } from './context';
import type { RateLimitConfig, SolidMiddleware } from './types';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Cleanup expired entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  },
  5 * 60 * 1000,
);

const authRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later.',
};

const apiRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per window
  message: 'Too many requests, please try again later.',
};

/**
 * Gets the appropriate rate limit configuration based on the pathname
 */
function getRateLimitConfig(pathname: string): RateLimitConfig | null {
  // Auth endpoints
  if (pathname.startsWith('/api/auth/')) {
    return authRateLimit;
  }

  // API endpoints
  if (pathname.startsWith('/api/')) {
    return apiRateLimit;
  }

  return null;
}

/**
 * Checks if the request is within rate limits
 */
function checkRateLimit(ip: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const key = `${ip}:${config.windowMs}`;
  const current = rateLimitMap.get(key);

  if (!current || now > current.resetTime) {
    // Reset or create new entry
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return true;
  }

  if (current.count >= config.maxRequests) {
    return false;
  }

  current.count += 1;
  return true;
}

/**
 * Gets the client IP address from the request
 */
function getClientIP(event: FetchEvent): string {
  return (
    event.request.headers.get('x-forwarded-for')?.split(',')[0] ||
    event.request.headers.get('x-real-ip') ||
    event.request.headers.get('x-client-ip') ||
    'unknown'
  );
}

/**
 * Creates a rate limiting middleware for SolidJS Start
 * @param config Optional rate limit configuration
 * @returns SolidJS Start middleware function
 */
export function createRateLimitMiddleware(): SolidMiddleware {
  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);
    const rateLimitConfig = getRateLimitConfig(pathname);

    if (!rateLimitConfig) {
      return; // No rate limiting for this route
    }

    // Get client IP
    const ip = getClientIP(event);
    const isAllowed = checkRateLimit(ip, rateLimitConfig);

    if (!isAllowed) {
      logger.error(
        {
          ip,
          pathname,
          config: rateLimitConfig,
          isMiddleware: true,
        },
        'Rate limit exceeded',
      );

      // Create rate limit exceeded response
      const responseBody = JSON.stringify({
        error: 'Rate limit exceeded',
        message: rateLimitConfig.message,
        retryAfter: Math.ceil(rateLimitConfig.windowMs / 1000),
      });

      event.response = new Response(responseBody, {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(rateLimitConfig.windowMs / 1000).toString(),
          'X-RateLimit-Limit': rateLimitConfig.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(
            Date.now() + rateLimitConfig.windowMs,
          ).toISOString(),
        },
      });
      // Mark that we've set a response to prevent further processing
      setRequestContext(event, 'responseSet', true);
      return;
    }

    logger.info(
      {
        ip,
        pathname,
        config: rateLimitConfig,
      },
      'Rate limit check passed',
    );

    // Store rate limit info in context
    setRequestContext(event, 'rateLimitPassed', true);
    setRequestContext(event, 'clientIP', ip);
  };
}

/**
 * Creates a conditional rate limiting middleware that only runs for API routes
 * @param config Optional rate limit configuration
 * @returns SolidJS Start middleware function
 */
export function createConditionalRateLimitMiddleware(): SolidMiddleware {
  const rateLimitMiddleware = createRateLimitMiddleware();

  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);

    // Only apply rate limiting to API routes
    if (pathname.startsWith('/api/')) {
      await rateLimitMiddleware(event);
    }
  };
}

/**
 * Creates a custom rate limiting middleware with specific configuration
 * @param customConfig Custom rate limit configuration
 * @returns SolidJS Start middleware function
 */
export function createCustomRateLimitMiddleware(
  customConfig: RateLimitConfig,
): SolidMiddleware {
  return async (event: FetchEvent) => {
    const ip = getClientIP(event);
    const isAllowed = checkRateLimit(ip, customConfig);

    if (!isAllowed) {
      logger.error(
        {
          ip,
          config: customConfig,
          isMiddleware: true,
        },
        'Custom rate limit exceeded',
      );

      const responseBody = JSON.stringify({
        error: 'Rate limit exceeded',
        message: customConfig.message,
        retryAfter: Math.ceil(customConfig.windowMs / 1000),
      });

      event.response = new Response(responseBody, {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(customConfig.windowMs / 1000).toString(),
          'X-RateLimit-Limit': customConfig.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(
            Date.now() + customConfig.windowMs,
          ).toISOString(),
        },
      });
      // Mark that we've set a response to prevent further processing
      setRequestContext(event, 'responseSet', true);
      return;
    }

    logger.info(
      {
        ip,
        config: customConfig,
      },
      'Custom rate limit check passed',
    );
  };
}

/**
 * Gets the client IP from the request context
 */
export function getClientIPFromContext(event: FetchEvent): string | undefined {
  return getRequestContextValueTyped(event, 'clientIP', undefined);
}

/**
 * Checks if rate limiting passed
 */
export function hasRateLimitPassed(event: FetchEvent): boolean {
  return getRequestContextValueTyped(event, 'rateLimitPassed', false);
}
