import {
  DEFAULT_COOKIE_OPTIONS,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
} from '~/i18n/config';
import { CookieUtil } from '~/lib/storage';
import { isSSR } from '~/utils/env';
import { logger } from '~/utils/logger';

import { isLocaleSupported } from './isLocaleSupported';

/**
 * Retrieves the client-side locale from the browser's cookies.
 *
 * This function attempts to find the locale setting stored in the browser's cookies.
 * If a valid locale is found and supported, it returns that locale. Otherwise, it
 * returns the default locale.
 *
 * @returns {AppLocale} The current locale as an AppLocale type.
 *
 * @remarks
 * - If called in a server-side environment, it always returns the DEFAULT_LOCALE.
 * - In a client-side environment, it searches for a cookie named LOCALE_COOKIE_NAME.
 * - The function checks if the found locale is supported using isLocaleSupported().
 * - If no valid locale is found in the cookie or the found locale is not supported,
 *   it falls back to the DEFAULT_LOCALE.
 *
 * @example
 * ```
 * const currentLocale = getUserLocale();
 * console.log(currentLocale); // Outputs: 'en' or another supported locale
 * ```
 *
 * @see AppLocale - The type definition for valid locales.
 * @see LOCALE_COOKIE_NAME - The name of the cookie storing the locale.
 * @see DEFAULT_LOCALE - The fallback locale used when no valid locale is found.
 * @see isLocaleSupported - Function to check if a locale is supported.
 * @see isServer - Boolean flag indicating if the code is running on the server.
 */
export function getUserLocale(calledFrom?: string): AppLocale {
  if (isSSR) return DEFAULT_LOCALE;

  const localeFromCookie = CookieUtil.get(LOCALE_COOKIE_NAME);

  logger.info(
    `getUserLocale: cookie locale '${localeFromCookie}' ${localeFromCookie ? 'is' : 'is not'} a supported locale. ${calledFrom ? `(called from ${calledFrom})` : ''}`,
  );

  return (
    isLocaleSupported(localeFromCookie, false, 'getUserLocale')
      ? localeFromCookie
      : DEFAULT_LOCALE
  ) as AppLocale;
}

/**
 * Sets the client-side locale by storing it in a browser cookie.
 *
 * This function is designed to be used in browser environments to persist
 * the user's locale preference. It sets a cookie with the specified locale,
 * which can be used to maintain the user's language choice across page reloads
 * or subsequent visits.
 *
 * @param locale - The locale to be set. Must be a valid AppLocale type.
 *
 * @remarks
 * - This function only executes in browser environments (client-side).
 * - The cookie is set with a path of '/' to make it available across the entire site.
 * - The cookie's expiration is determined by LOCALE_COOKIE_TTL (Time To Live).
 * - If called in a non-browser environment, this function will have no effect.
 *
 * @example
 * ```
 * // Set the locale to 'en'
 * setUserLocaleClient('en');
 * ```
 *
 * @see AppLocale - The type definition for valid locales.
 * @see LOCALE_COOKIE_NAME - The name used for the locale cookie.
 * @see DEFAULT_COOKIE_OPTIONS - The cookie options.
 * @see isBrowser - A boolean indicating whether the current environment is a browser.
 */
export const setUserLocaleClient = (locale: string) => {
  if (isSSR) return;
  if (!isLocaleSupported(locale, false, 'setUserLocaleClient')) return;

  try {
    CookieUtil.set(LOCALE_COOKIE_NAME, locale, DEFAULT_COOKIE_OPTIONS);
    logger.info(`setUserLocaleClient: Locale cookie set successfully: ${locale}`);
  } catch (err) {
    logger.error({ err }, 'setUserLocaleClient: Failed to set locale cookie:');
  }
};
