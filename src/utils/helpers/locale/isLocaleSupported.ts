import { AppRoutes } from '~/config';
import { LOCALES } from '~/i18n/locales';

/**
 * Checks if a given locale is supported by the application.
 * @param locale - The locale string to check
 * @param isPartialMatch - Whether to allow partial matches (e.g., 'en' matches 'en-US')
 * @returns A boolean indicating whether the locale is supported
 */
export const isLocaleSupported = (
  locale: string | undefined | null,
  isPartialMatch = false,
): boolean => {
  if (!locale) {
    return false;
  }

  const normalizedLocale = locale.trim().toLowerCase();

  // Check if the locale is an app route (app routes are not considered locales)
  const isAppRoute = AppRoutes.some(
    (route) => route.toLowerCase() === normalizedLocale,
  );

  if (isAppRoute) {
    return false;
  }

  return isPartialMatch
    ? LOCALES.some((l) => normalizedLocale.startsWith(l.toLowerCase()))
    : LOCALES.some((l) => l.toLowerCase() === normalizedLocale);
};
