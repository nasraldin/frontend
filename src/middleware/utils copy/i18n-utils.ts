import type { FetchEvent } from '@solidjs/start/server';

import { AppRoutes } from '~/config';
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from '~/i18n/config';
import { getLocaleFromRequest } from '~/utils/helpers/locale/getLocaleFromRequest';
import { logger } from '~/utils/logger';

// Helper function to check if the request is an app route
export function checkIfAppRoute(pathname: string): boolean {
  return AppRoutes.some(
    (route: string) =>
      pathname === `/${route}` || pathname.startsWith(`/${route}/`),
  );
}

// Helper function to get the final locale based on path, cookie, or default locale
export function getFinalLocale(
  localeFromPathname: string | undefined,
  localeFromCookie: string | undefined,
  event: FetchEvent,
): AppLocale {
  logger.info({ localeFromPathname, localeFromCookie }, 'getFinalLocale');
  return (localeFromPathname ||
    localeFromCookie ||
    getLocaleFromRequest(event.request)) as AppLocale;
}

// Helper function to check if the locale is missing in the pathname
export function isLocaleMissingInPathname(
  localeFromPathname: string | undefined,
  isAppRoute: boolean,
): boolean {
  return !localeFromPathname && !isAppRoute;
}

// Handle locale redirection when missing from the pathname for SolidJS Start
export function handleLocaleRedirect(
  event: FetchEvent,
  locale: AppLocale,
  pathname: string,
): Response | null {
  // Handle root path for both default and non-default locales
  if (pathname === '/') {
    const localePrefix = `/${locale}`;

    if (locale === DEFAULT_LOCALE) {
      logger.info(
        {
          pathname,
          DEFAULT_LOCALE,
          test: new URL(localePrefix, event.request.url),
        },
        'handleLocaleRedirect',
      );

      // For SolidJS Start, we need to rewrite the URL
      // This is handled differently than Next.js - we'll set headers to indicate rewrite
      event.request.headers.set('x-rewrite-url', localePrefix);
      return null; // Continue processing
    } else {
      logger.info(
        {
          pathname,
          if: 'else',
          test: new URL(event.request.url),
        },
        'handleLocaleRedirect',
      );

      // For non-default locale, redirect to /ar (or other locale)
      const url = new URL(event.request.url);
      url.pathname = localePrefix;
      return Response.redirect(url, 307); // 307 to ensure proper redirection
    }
  }

  // Handle non-root paths
  if (locale === DEFAULT_LOCALE) {
    logger.info(
      {
        pathname,
        if: 'non-root',
        test1: `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        test: new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          event.request.url,
        ),
      },
      'handleLocaleRedirect',
    );

    // Set rewrite header for SolidJS Start
    const rewritePath = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    event.request.headers.set('x-rewrite-url', rewritePath);
    return null; // Continue processing
  }

  const newPathname = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
  const url = new URL(event.request.url);
  url.pathname = newPathname;
  logger.info(
    {
      pathname,
      test: url,
    },
    'handleLocaleRedirect',
  );

  return Response.redirect(url, 307);
}

// Set the locale in both the request and response headers
export function setLocaleHeaders(event: FetchEvent, locale: AppLocale) {
  event.request.headers.set(LOCALE_COOKIE_NAME, locale);
  event.response.headers.set(LOCALE_COOKIE_NAME, locale);
}

// Dummy function to simulate login check (can be implemented later)
export function checkIfUserIsLoggedIn(event: FetchEvent): boolean {
  // Replace with actual login check logic
  // For now, check if there's a session cookie
  const sessionCookie = event.request.headers.get('cookie')?.includes('session');
  return !!sessionCookie;
}

// Helper function to get locale from pathname
export function getLocaleFromPathname(pathname: string): string | undefined {
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // Check if the first segment is a valid locale
  const supportedLocales = ['en', 'ar']; // Add your supported locales
  if (supportedLocales.includes(firstSegment)) {
    return firstSegment;
  }

  return undefined;
}

// Helper function to get locale from cookie
export function getLocaleFromCookie(event: FetchEvent): string | undefined {
  const cookieHeader = event.request.headers.get('cookie');
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[LOCALE_COOKIE_NAME];
}
