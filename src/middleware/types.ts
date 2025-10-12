import type { FetchEvent } from '@solidjs/start/server';

/**
 * SolidJS Start middleware function type
 * Each middleware function receives a FetchEvent and can modify the request/response
 */
export type SolidMiddleware = (event: FetchEvent) => void | Promise<void>;

/**
 * Middleware factory function that creates a middleware
 * This allows for dependency injection and configuration
 */
export type MiddlewareFactory = (config?: unknown) => SolidMiddleware;

/**
 * Enhanced middleware that can return a response to short-circuit the chain
 */
export type SolidMiddlewareWithResponse = (
  event: FetchEvent,
) => Response | undefined | Promise<Response | undefined>;

/**
 * Middleware configuration for chaining
 */
export interface MiddlewareConfig {
  onRequest?: SolidMiddleware | SolidMiddleware[];
  onBeforeResponse?: SolidMiddleware | SolidMiddleware[];
}

/**
 * Request context that can be passed between middleware
 */
export interface RequestContext extends Record<string, unknown> {}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message: string;
}

/**
 * CORS configuration
 */
export interface CORSConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  allowCredentials: boolean;
}

/**
 * CSP configuration
 */
export interface CSPConfig {
  reportOnly: boolean;
  reportUri?: string;
  nonce?: string;
}

/**
 * I18n configuration
 */
export interface I18nConfig {
  defaultLocale: string;
  supportedLocales: string[];
  cookieName: string;
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  protectedRoutes: string[];
  signInRoute: string;
  sessionCookieName: string;
}
