import { AppRoutes } from '~/config';
import { LOCALES } from '~/i18n/locales';
import { logger } from '~/utils/logger';

/**
 * Checks if a given locale is supported by the application.
 *
 * @param locale - The locale string to check. Can be undefined.
 * @param isPartialMatch - Optional. A boolean flag like 'en-US', 'en-', or 'en'
 *                         to determine if partial matches are allowed.
 * Note: This parameter is always false in the current implementation.
 * @param calledFrom - Optional. A string indicating where this function was called from.
 *                     Used for logging purposes.
 * @returns A boolean indicating whether the locale is supported.
 *
 * @description
 * This function performs the following checks:
 * 1. Validates if the locale is not undefined or empty.
 * 2. Normalizes the locale string (trims and converts to lowercase).
 * 3. Checks if the locale is actually an app route (which are not considered locales).
 * 4. Determines if the locale is supported based on the LOCALES array.
 *
 * The function logs various information and warnings during its execution:
 * - Warns if called with an undefined or empty locale.
 * - Logs if the provided string is an app route.
 * - Informs whether the locale is supported or not.
 * - Warns if an unsupported locale is provided.
 *
 * @example
 * isLocaleSupported('en', false, 'HomePage');
 * // Returns: true (assuming 'en' is in the LOCALES array)
 *
 * @example
 * isLocaleSupported('ar', false, 'SettingsPage');
 * // Returns: false (assuming 'ar' is not in the LOCALES array)
 *
 * @example
 * isLocaleSupported('en-US', true, 'LoginPage');
 * // Returns: true (assuming 'en' is in the LOCALES array)
 *
 * @example
 * isLocaleSupported(undefined, false, 'LoginPage');
 * // Returns: false (and logs a warning)
 */

export const isLocaleSupported = (
  locale: string | undefined | null,
  isPartialMatch?: false,
  calledFrom?: string,
): boolean => {
  if (!locale) {
    logger.warn(
      `isLocaleSupported: called with locale '${locale}' ${calledFrom ? `(called from ${calledFrom})` : ''}`,
    );
    return false;
  }

  const normalizedLocale = locale?.trim()?.toLowerCase();

  // Check if the locale is an app route
  const isAppRoute = AppRoutes.some(
    (route) => route.toLowerCase() === normalizedLocale,
  );

  if (isAppRoute) {
    logger.info(
      `isLocaleSupported: '${normalizedLocale}' is an app route, not a locale ${calledFrom ? `(called from ${calledFrom})` : ''}`,
    );
    // App routes are not considered locales
    return false;
  }

  const isSupported = isPartialMatch
    ? LOCALES.some((l) => normalizedLocale.startsWith(l.toLowerCase()))
    : LOCALES.some((l) => l.toLowerCase() === normalizedLocale);

  logger.info(
    `isLocaleSupported: '${normalizedLocale}' ${isSupported ? 'is' : 'is not'} a supported locale ${calledFrom ? `(called from ${calledFrom})` : ''}`,
  );

  if (!isSupported) {
    logger.warn(
      `isLocaleSupported: Unsupported locale: ${locale} ${calledFrom ? `(called from ${calledFrom})` : ''}`,
    );
  }

  return isSupported;
};
