import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from '~/i18n/config';
import { LOCALES } from '~/i18n/locales';
import { logger } from '~/utils/logger';

/**
 * Determines the most suitable locale based on the client's request headers.
 *
 * @param {Request} request - The client request object.
 * @returns {string} - The determined locale, falling back to a default if no suitable locale is found.
 */
export function getLocaleFromRequest(request: Request): string {
  // Check for custom locale header
  const customLocale = request.headers.get(LOCALE_COOKIE_NAME) as AppLocale;
  const requestHaveValidLocale = customLocale && LOCALES.includes(customLocale);

  logger.info(
    {
      requestHaveValidLocale,
      customLocale,
    },
    'getLocaleFromRequest',
  );

  if (requestHaveValidLocale) {
    return customLocale;
  }

  const negotiatorHeaders: Record<string, string> = Object.fromEntries(
    request.headers,
  );
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = languages.includes('*') ? [DEFAULT_LOCALE] : languages;

  logger.info({ negotiatorHeaders, languages, locales }, 'getLocaleFromRequest');

  return matchLocale(locales, LOCALES, DEFAULT_LOCALE);
}
