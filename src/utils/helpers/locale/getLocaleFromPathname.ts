import { logger } from '~/utils/logger';

import { isLocaleSupported } from './isLocaleSupported';

/**
 * Extracts the locale from a URL pathname and checks if it is a supported locale.
 *
 * @param {string} pathname - The URL pathname to extract the locale from.
 * @returns {string | undefined} - The extracted and validated locale, or undefined if not found or unsupported.
 */

export const getLocaleFromPathname = (pathname: string): string | undefined => {
  if (!pathname || typeof pathname !== 'string') {
    return undefined;
  }

  const parts = pathname.trim().toLowerCase().split('/').filter(Boolean);
  const potentialLocale = parts[0];

  if (!potentialLocale) return undefined;

  logger.info({ pathname, parts, potentialLocale }, 'getLocaleFromPathname');

  return isLocaleSupported(potentialLocale, false, 'getLocaleFromPathname')
    ? potentialLocale
    : undefined;
};
