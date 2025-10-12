/**
 * Environment Variables Manager
 *
 * Provides a unified interface for accessing environment variables
 * that automatically uses the correct source:
 * - Client-side: import.meta.env
 * - Server-side: process.env
 */

import { isBrowser } from '~/utils/env';
import { isBoolean } from '~/utils/helpers';

/**
 * Get environment variable with fallback
 */
function getEnvVar(key: string, fallback = ''): string {
  if (isBrowser) {
    // Client-side: use import.meta.env
    return import.meta.env[key] || fallback;
  } else {
    // Server-side: use process.env
    return process.env[key] || fallback;
  }
}

/**
 * Get environment variable as number
 */
function getEnvNumber(key: string, fallback = 0): number {
  const value = getEnvVar(key);
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Get environment variable as boolean
 */
function getEnvBoolean(key: string, fallback = false): boolean {
  const value = getEnvVar(key);
  if (!value) return fallback;
  return isBoolean(value);
}

/**
 * Environment constants for client-side use
 */
export const clientEnv = {
  // App
  LOG_LEVEL: getEnvVar('VITE_LOG_LEVEL', 'info'),
  APP_URL: getEnvVar('VITE_APP_URL'),
  API_URL: getEnvVar('VITE_API_URL'),
  APP_DOMAIN: getEnvVar('VITE_APP_DOMAIN'),

  // Auth
  AUTH_KEYCLOAK_CLIENT_ID: getEnvVar('VITE_AUTH_KEYCLOAK_CLIENT_ID'),
  AUTH_KEYCLOAK_ISSUER: getEnvVar('VITE_AUTH_KEYCLOAK_ISSUER'),
  KEYCLOAK_URL: getEnvVar('VITE_KEYCLOAK_URL'),

  // Backend
  BACKEND_URL: getEnvVar('VITE_BACKEND_URL'),
  X_API_KEY_NAME: getEnvVar('VITE_X_API_KEY_NAME'),
  API_TIMEOUT: getEnvNumber('VITE_API_TIMEOUT', 30000),

  // Google Maps
  GOOGLE_MAPS_API_KEY: getEnvVar('VITE_GOOGLE_MAPS_API_KEY'),
  GOOGLE_MAP_ID: getEnvVar('VITE_GOOGLE_MAP_ID'),

  // Rate limits
  RATE_LIMIT_TOKENS: getEnvNumber('VITE_RATE_LIMIT_TOKENS', 100),
  RATE_LIMIT_DURATION: getEnvVar('VITE_RATE_LIMIT_DURATION', '1h'),

  // Analytics
  ANALYTICS_ID: getEnvVar('VITE_ANALYTICS_ID'),
  GTM_ID: getEnvVar('VITE_GTM_ID'),
  GTM_AUTH: getEnvVar('VITE_GTM_AUTH'),
  GTM_PREVIEW: getEnvVar('VITE_GTM_PREVIEW'),

  // PWA
  VAPID_PUBLIC_KEY: getEnvVar('VITE_VAPID_PUBLIC_KEY'),
} as const;

/**
 * Environment constants for server-side use
 */
export const serverEnv = {
  NODE_ENV: getEnvVar('NODE_ENV', 'production') as
    | 'development'
    | 'production'
    | 'test'
    | 'staging'
    | 'uat',
  HOST: getEnvVar('HOST', '0.0.0.0'),
  PORT: getEnvNumber('PORT', 3000),

  // Auth
  AUTH_URL: getEnvVar('AUTH_URL'),
  AUTH_SECRET: getEnvVar('AUTH_SECRET'),
  AUTH_KEYCLOAK_REALM: getEnvVar('AUTH_KEYCLOAK_REALM'),
  AUTH_KEYCLOAK_CLIENT_SECRET: getEnvVar('AUTH_KEYCLOAK_CLIENT_SECRET'),
  AUTH_KEYCLOAK_ADMIN_CLIENT_ID: getEnvVar('AUTH_KEYCLOAK_ADMIN_CLIENT_ID'),
  AUTH_KEYCLOAK_ADMIN_CLIENT_SECRET: getEnvVar('AUTH_KEYCLOAK_ADMIN_CLIENT_SECRET'),
  AUTH_KEYCLOAK_SCOPE: getEnvVar('AUTH_KEYCLOAK_SCOPE'),
  AUTH_TRUST_HOST: getEnvBoolean('AUTH_TRUST_HOST', false),
  AUTH_DEBUG: getEnvBoolean('AUTH_DEBUG', false),

  // Backend
  X_API_KEY: getEnvVar('X_API_KEY'),

  // Cache
  CACHE_ADAPTER: getEnvVar('CACHE_ADAPTER', 'memory'),
  UPSTASH_REDIS_REST_URL: getEnvVar('UPSTASH_REDIS_REST_URL'),
  UPSTASH_REDIS_REST_TOKEN: getEnvVar('UPSTASH_REDIS_REST_TOKEN'),

  // Email
  SMTP_HOST: getEnvVar('SMTP_HOST'),
  SMTP_PORT: getEnvNumber('SMTP_PORT', 587),
  SMTP_USERNAME: getEnvVar('SMTP_USERNAME'),
  SMTP_PASSWORD: getEnvVar('SMTP_PASSWORD'),
  EMAIL_FROM: getEnvVar('EMAIL_FROM'),
  EMAIL_REPLY_TO: getEnvVar('EMAIL_REPLY_TO'),
  RESEND_API_KEY: getEnvVar('RESEND_API_KEY'),

  // Body limits
  JSON_BODY_LIMIT: getEnvVar('JSON_BODY_LIMIT', '1mb'),
  FORM_BODY_LIMIT: getEnvVar('FORM_BODY_LIMIT', '1mb'),
  TEXT_BODY_LIMIT: getEnvVar('TEXT_BODY_LIMIT', '1mb'),

  // CORS
  CORS_WHITELIST: getEnvVar('CORS_WHITELIST'),
  ALLOWED_DOMAINS: getEnvVar('ALLOWED_DOMAINS'),
  ALLOWED_METHODS: getEnvVar('ALLOWED_METHODS', 'GET,POST,PUT,DELETE,OPTIONS'),
  ALLOWED_HEADERS: getEnvVar('ALLOWED_HEADERS', 'Content-Type,Authorization'),

  // PWA
  VAPID_PRIVATE_KEY: getEnvVar('VAPID_PRIVATE_KEY'),

  // CSP
  CSP_REPORT_URI: getEnvVar('CSP_REPORT_URI'),
  ENABLE_CSP_REPORTING: getEnvBoolean('ENABLE_CSP_REPORTING', false),
  ALLOW_ANALYTICS: getEnvBoolean('ALLOW_ANALYTICS', true),
  STRICT_CSP: getEnvBoolean('STRICT_CSP', false),

  // Miscellaneous
  MINIFY_DICTIONARY: getEnvBoolean('MINIFY_DICTIONARY', false),
  COMMITS_CHECK_URL: getEnvVar('COMMITS_CHECK_URL'),
  COMMITS_CHECK_ACCESS_TOKEN: getEnvVar('COMMITS_CHECK_ACCESS_TOKEN'),
} as const;

/**
 * Combined environment constants (use with caution - some vars may not be available on client)
 */
export const env = {
  ...clientEnv,
  ...serverEnv,
} as const;
