import { type FetchEvent } from '@solidjs/start/server';
import { customAlphabet } from 'nanoid';
import { getCookie, setCookie } from 'vinxi/http';

import {
  HttpHeaderName,
  LOG_UUID_COOKIE_KEY,
  LOG_UUID_COOKIE_TTL,
} from '~/constants';
import { env } from '~/env';
import { isProd } from '~/utils/env';
import { createRequestLogger } from '~/utils/logger';

const generateLogUuid = customAlphabet(env.BLOWFISH_SECRET, 10);

/**
 * Creates a logging middleware that generates and tracks unique request IDs
 * @param event FetchEvent
 */
export function withLogUuid(event: FetchEvent) {
  const logger = createRequestLogger('middleware');

  try {
    const logUuid =
      getCookie(event.nativeEvent, LOG_UUID_COOKIE_KEY) || generateLogUuid();

    // Set LOG_UUID cookie if not present
    if (!getCookie(event.nativeEvent, LOG_UUID_COOKIE_KEY)) {
      const baseCookie = {
        maxAge: Math.floor(LOG_UUID_COOKIE_TTL / 1000),
        path: '/',
        secure: isProd,
        sameSite: 'lax' as const,
        httpOnly: false,
      } as const;

      // Setting a secure session cookie with expiration
      setCookie(event.nativeEvent, LOG_UUID_COOKIE_KEY, logUuid, {
        ...baseCookie,
        // Use leading dot for all subdomains in prod
        domain: isProd ? `.${env.APP_DOMAIN}` : undefined,
      });

      event.response.headers.set(HttpHeaderName.LogUuid, logUuid);

      logger.info(
        {
          logUuid,
        },
        'Set logUuid in cookie and header',
      );
    }
  } catch (error) {
    logger.warn(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: event.request.url,
      },
      'Failed to set logUuid cookies',
    );
  }
}
