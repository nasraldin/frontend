import type { FetchEvent } from '@solidjs/start/server';

import { HttpHeaderName } from '~/constants';
import { DEFAULT_COOKIE_OPTIONS, LOCALE_COOKIE_NAME } from '~/i18n';
import { getLocaleFromPathname } from '~/utils/helpers';
import { logger } from '~/utils/logger';

import { getRequestContextValueTyped, setRequestContext } from './context';
import type { I18nConfig, SolidMiddleware } from './types';
import {
  checkIfAppRoute,
  checkIfUserIsLoggedIn,
  getFinalLocale,
  getLocaleFromCookie,
  handleLocaleRedirect,
  isLocaleMissingInPathname,
  setLocaleHeaders,
} from './utils/i18n-utils';

/**
 * Creates an i18n middleware for SolidJS Start
 * @param config I18n configuration
 * @returns SolidJS Start middleware function
 */
export function createI18nMiddleware(config?: I18nConfig): SolidMiddleware {
  const defaultConfig: I18nConfig = {
    defaultLocale: 'en',
    supportedLocales: ['en', 'ar'],
    cookieName: LOCALE_COOKIE_NAME,
    ...config,
  };

  return async (event: FetchEvent) => {
    const pathname = new URL(event.request.url).pathname;
    const localeFromPathname = getLocaleFromPathname(pathname);
    const localeFromCookie = getLocaleFromCookie(event);
    const isLoggedIn = checkIfUserIsLoggedIn(event);

    // Determine if it's an app route and the base locale
    const isAppRoute = checkIfAppRoute(pathname);

    // Determine the final locale to use
    const locale = getFinalLocale(localeFromPathname, localeFromCookie, event);

    // First time check: If no cookie exists, set default locale
    if (!localeFromCookie) {
      setLocaleCookie(event, locale, defaultConfig.cookieName);
    }

    // Update cookie if:
    // 1. There's a locale in pathname
    // 2. Not an app route
    // 3. User is not logged in
    // 4. Pathname locale is different from cookie locale
    if (
      localeFromPathname &&
      !isAppRoute &&
      !isLoggedIn &&
      localeFromPathname !== localeFromCookie
    ) {
      setLocaleCookie(event, localeFromPathname, defaultConfig.cookieName);
    }

    // Set locale headers for this request
    setLocaleHeaders(event, locale);

    // Add app route hint if needed
    if (isAppRoute) {
      event.request.headers.set(HttpHeaderName.XAppRoute, 'true');
    }

    // Log the details of the request for debugging
    logger.info(
      {
        isLoggedIn,
        pathname,
        isAppRoute,
        localeFromPathname,
        localeFromCookie,
        locale,
      },
      'Middleware::i18nMiddleware',
    );

    // Check for locale redirect first
    if (isLocaleMissingInPathname(localeFromPathname, isAppRoute)) {
      const redirectResponse = handleLocaleRedirect(event, locale, pathname);

      if (redirectResponse) {
        // If we have a redirect response, use it
        event.response = redirectResponse;
        // Mark that we've set a response to prevent further processing
        setRequestContext(event, 'responseSet', true);
        return;
      }
    }

    // Store locale in request context for other middleware to access
    setRequestContext(event, 'locale', locale);
    setRequestContext(event, 'localeFromPathname', localeFromPathname);
    setRequestContext(event, 'isAppRoute', isAppRoute);
  };
}

/**
 * Sets the locale cookie
 */
function setLocaleCookie(
  event: FetchEvent,
  locale: string,
  cookieName: string,
): void {
  try {
    const cookieValue = `${cookieName}=${locale}; Path=/; Max-Age=${DEFAULT_COOKIE_OPTIONS.maxAge}; SameSite=${DEFAULT_COOKIE_OPTIONS.sameSite}; ${DEFAULT_COOKIE_OPTIONS.secure ? 'Secure' : ''}`;
    event.response.headers.append('Set-Cookie', cookieValue);
  } catch (error) {
    logger.warn(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: event.request.url,
      },
      'Failed to set locale cookie (headers may be immutable)',
    );
  }
}

/**
 * Gets the current locale from the request context
 */
export function getCurrentLocale(event: FetchEvent): string | undefined {
  return getRequestContextValueTyped(event, 'locale', undefined);
}

/**
 * Gets the locale from pathname from the request context
 */
export function getLocaleFromPathnameContext(
  event: FetchEvent,
): string | undefined {
  return getRequestContextValueTyped(event, 'localeFromPathname', undefined);
}

/**
 * Checks if the current route is an app route
 */
export function isAppRouteContext(event: FetchEvent): boolean {
  return getRequestContextValueTyped(event, 'isAppRoute', false);
}

/**
 * Creates a conditional i18n middleware that only runs for non-API routes
 * @param config I18n configuration
 * @returns SolidJS Start middleware function
 */
export function createConditionalI18nMiddleware(
  config?: I18nConfig,
): SolidMiddleware {
  const i18nMiddleware = createI18nMiddleware(config);

  return async (event: FetchEvent) => {
    const { pathname } = new URL(event.request.url);

    // Skip i18n for API routes
    if (pathname.startsWith('/api/')) {
      return;
    }

    await i18nMiddleware(event);
  };
}
