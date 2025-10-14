import {
  DEFAULT_COOKIE_OPTIONS,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
} from '~/i18n/config';
import { isSSR } from '~/utils/env';

import { isLocaleSupported } from './isLocaleSupported';

/**
 * Retrieves the client-side locale from the browser's cookies.
 * @returns The current locale, falling back to default if not found or unsupported
 */
export function getUserLocale(): AppLocale {
  if (isSSR) return DEFAULT_LOCALE;

  // Use browser's document.cookie directly to avoid server-side dependencies
  const cookies = document.cookie.split(';');
  let localeFromCookie: string | null = null;

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === LOCALE_COOKIE_NAME) {
      localeFromCookie = value;
      break;
    }
  }

  return (
    isLocaleSupported(localeFromCookie) ? localeFromCookie : DEFAULT_LOCALE
  ) as AppLocale;
}

/**
 * Sets the client-side locale by storing it in a browser cookie.
 * @param locale - The locale to be set
 */
export const updateLocale = (locale: string) => {
  if (isSSR) return;
  if (!isLocaleSupported(locale)) return;

  try {
    // Use browser's document.cookie directly to avoid server-side dependencies
    const cookieString = `${LOCALE_COOKIE_NAME}=${locale}; path=${DEFAULT_COOKIE_OPTIONS.path}; max-age=${DEFAULT_COOKIE_OPTIONS.maxAge || 31536000}; ${DEFAULT_COOKIE_OPTIONS.secure ? 'secure; ' : ''}${DEFAULT_COOKIE_OPTIONS.sameSite || 'strict'}`;
    document.cookie = cookieString;
  } catch (err) {
    // Silently handle cookie setting errors
  }
};
