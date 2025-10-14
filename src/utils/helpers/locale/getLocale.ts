import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from '~/i18n/config';
import { LOCALES } from '~/i18n/locales';

import { isLocaleSupported } from './isLocaleSupported';

/**
 * Extracts the locale from a URL pathname and checks if it is a supported locale.
 * @param pathname - The URL pathname to extract the locale from
 * @returns The extracted and validated locale, or undefined if not found or unsupported
 */
export const getLocaleFromPathname = (pathname: string): string | undefined => {
  if (!pathname || typeof pathname !== 'string') {
    return undefined;
  }

  const parts = pathname.trim().toLowerCase().split('/').filter(Boolean);
  const potentialLocale = parts[0];

  if (!potentialLocale) return undefined;

  return isLocaleSupported(potentialLocale) ? potentialLocale : undefined;
};

/**
 * Determines the most suitable locale based on the client's request headers.
 * @param request - The client request object
 * @returns The determined locale, falling back to default if no suitable locale is found
 */
export function getLocaleFromRequest(request: Request): string {
  const customLocale = request.headers.get(LOCALE_COOKIE_NAME) as AppLocale;
  const requestHaveValidLocale = customLocale && LOCALES.includes(customLocale);

  if (requestHaveValidLocale) {
    return customLocale;
  }

  const negotiatorHeaders: Record<string, string> = Object.fromEntries(
    request.headers,
  );
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = languages.includes('*') ? [DEFAULT_LOCALE] : languages;

  return matchLocale(locales, LOCALES, DEFAULT_LOCALE);
}
