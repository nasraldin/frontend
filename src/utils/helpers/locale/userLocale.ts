import {
  DEFAULT_COOKIE_OPTIONS,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
} from '~/i18n/config';
import { CookieUtil } from '~/lib/storage';
import { isSSR } from '~/utils/env';

import { isLocaleSupported } from './isLocaleSupported';

/**
 * Retrieves the client-side locale from the browser's cookies.
 * @returns The current locale, falling back to default if not found or unsupported
 */
export function getUserLocale(): AppLocale {
  if (isSSR) return DEFAULT_LOCALE;

  const localeFromCookie = CookieUtil.get(LOCALE_COOKIE_NAME);

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
    CookieUtil.set(LOCALE_COOKIE_NAME, locale, DEFAULT_COOKIE_OPTIONS);
  } catch (err) {
    // Silently handle cookie setting errors
  }
};
