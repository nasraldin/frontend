import type { FetchEvent } from '@solidjs/start/server';
import { customAlphabet } from 'nanoid';

import {
  BLOWFISH_SECRET,
  LOG_UUID_COOKIE_KEY,
  LOG_UUID_COOKIE_TTL,
} from '~/constants';
import { isProd } from '~/utils/env';
import { logger } from '~/utils/logger';

import { getRequestContextValueTyped, setRequestContext } from './context';
import type { SolidMiddleware } from './types';

const generateLogUuid = customAlphabet(BLOWFISH_SECRET, 10);

/**
 * Creates a logging middleware that generates and tracks unique request IDs
 * @param config Optional configuration
 * @returns SolidJS Start middleware function
 */
export function createLogUuidMiddleware(config?: {
  cookieName?: string;
  cookieTtl?: number;
  domain?: string;
}): SolidMiddleware {
  const cookieName = config?.cookieName || LOG_UUID_COOKIE_KEY;
  const cookieTtl = config?.cookieTtl || LOG_UUID_COOKIE_TTL;
  const domain = config?.domain || import.meta.env.VITE_APP_DOMAIN;

  return async (event: FetchEvent) => {
    const logUuid = getLogUuidFromCookie(event, cookieName) || generateLogUuid();

    // Set LOG_UUID cookie if not present
    if (!hasLogUuidCookie(event, cookieName)) {
      setLogUuidCookie(event, logUuid, cookieName, cookieTtl, domain);
    }

    // Set response header (with error handling for immutable headers)
    try {
      event.response.headers.set(cookieName, logUuid);
    } catch (error) {
      logger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: event.request.url,
        },
        'Failed to set log UUID header (headers may be immutable)',
      );
    }

    // Store in request context for other middleware to access
    setRequestContext(event, 'logUuid', logUuid);

    logger.info({ logUuid }, 'Middleware::withLogUuid');
  };
}

/**
 * Gets the log UUID from the request cookie
 */
function getLogUuidFromCookie(
  event: FetchEvent,
  cookieName: string,
): string | null {
  const cookieHeader = event.request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[cookieName] || null;
}

/**
 * Checks if the log UUID cookie exists
 */
function hasLogUuidCookie(event: FetchEvent, cookieName: string): boolean {
  return getLogUuidFromCookie(event, cookieName) !== null;
}

/**
 * Sets the log UUID cookie
 */
function setLogUuidCookie(
  event: FetchEvent,
  logUuid: string,
  cookieName: string,
  cookieTtl: number,
  domain: string,
): void {
  try {
    // Only set domain in production; in dev omit domain to allow localhost
    if (isProd) {
      event.response.headers.append(
        'Set-Cookie',
        `${cookieName}=${logUuid}; Max-Age=${Math.floor(cookieTtl / 1000)}; Path=/; Secure; SameSite=Lax; Domain=.${domain}`,
      );
    } else {
      // No domain for localhost/dev
      event.response.headers.append(
        'Set-Cookie',
        `${cookieName}=${logUuid}; Max-Age=${Math.floor(cookieTtl / 1000)}; Path=/; SameSite=Lax`,
      );
    }
  } catch (error) {
    logger.warn(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: event.request.url,
      },
      'Failed to set log UUID cookie (headers may be immutable)',
    );
  }
}

/**
 * Gets the log UUID from the request context
 */
export function getLogUuid(event: FetchEvent): string | undefined {
  return getRequestContextValueTyped(event, 'logUuid', undefined);
}
