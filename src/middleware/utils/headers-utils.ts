import type { FetchEvent } from '@solidjs/start/server';

import { isDev } from '~/utils/env';
import { logger } from '~/utils/logger';

// Create regex patterns from the CORS whitelist with better wildcard handling
export function createWhitelistRegex(whitelist: string): RegExp[] {
  return whitelist.split(',').map((raw) => {
    const domain = raw.trim();
    // Support subdomain wildcard while allowing apex too, e.g., '*.example.com'
    if (domain.startsWith('*.')) {
      const base = domain.slice(2).replace(/\./g, '\\.');
      const pattern = `^https?://([a-z0-9-]+\\.)?${base}$`;
      logger.info({ domain, pattern }, 'Middleware::createWhitelistRegex');
      return new RegExp(pattern);
    }
    // Exact host match
    const escaped = domain.replace(/\./g, '\\.');
    const pattern = `^https?://${escaped}$`;
    logger.info({ domain, pattern }, 'Middleware::createWhitelistRegex');
    return new RegExp(pattern);
  });
}

// Define your whitelist of allowed origins
const whitelist = createWhitelistRegex(
  import.meta.env.VITE_CORS_WHITELIST || 'https://*.ajrly.com',
);

// Generate regex patterns for ALLOWED_DOMAINS
const allowedDomains = createWhitelistRegex(
  import.meta.env.VITE_ALLOWED_DOMAINS || '*.ajrly.com,storage.googleapis.com',
);

// Check if an origin is allowed by the whitelist
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;

  // Check if the origin matches any of the whitelist regex patterns
  const isWhitelisted = whitelist.some((regex) => regex.test(origin));
  const isAllowedDomain = allowedDomains.some((regex) => regex.test(origin));

  if (isWhitelisted || isAllowedDomain) return true;

  // Allow localhost during development
  return isDev && /^https?:\/\/localhost(:\d+)?$/.test(origin);
}

// Helper function to set common CORS headers for SolidJS Start
export function setCORSHeaders(event: FetchEvent, origin: string | null) {
  const response = event.response;

  // Allowed methods and headers for CORS
  const allowedMethods =
    import.meta.env.VITE_ALLOWED_METHODS || 'GET, POST, PUT, DELETE, OPTIONS';
  const allowedHeaders =
    import.meta.env.VITE_ALLOWED_HEADERS ||
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-Api-Key, X-Auth-Token, Locale, LogUuid, Origin, X-Request-Id, X-Session-Id, X-User-Id, X-CORS-Error';

  response.headers.set('Access-Control-Allow-Origin', origin || '*');
  response.headers.set('Access-Control-Allow-Methods', allowedMethods);
  response.headers.set('Access-Control-Allow-Headers', allowedHeaders);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
}

// Helper function to get the origin from the request
export function getOriginFromRequest(event: FetchEvent): string | null {
  return event.request.headers.get('origin');
}

// Helper function to check if the request is a preflight request
export function isPreflightRequest(event: FetchEvent): boolean {
  return event.request.method === 'OPTIONS';
}

// Helper function to create a CORS error response
export function createCORSErrorResponse(message = 'Not allowed by CORS'): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 403,
    headers: {
      'Content-Type': 'application/json',
      'X-CORS-Error': message,
    },
  });
}

// Helper function to create a preflight response
export function createPreflightResponse(
  event: FetchEvent,
  origin: string,
): Response {
  const response = new Response(null, { status: 204 });
  setCORSHeaders({ ...event, response }, origin);
  return response;
}
