import { DEFAULT_LOCALE } from '~/i18n';

/**
 * Parses cookie string into an object
 * @param cookieString - The cookie string from the request header
 * @returns Object with cookie key-value pairs
 */
export function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieString.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name && rest.length > 0) {
      cookies[name] = rest.join('=');
    }
  });

  return cookies;
}

export function getLocaleFromHeaderCookies(cookieHeader?: string): AppLocale {
  if (!cookieHeader) return DEFAULT_LOCALE;
  const localeMatch = /locale=([^;]*)/.exec(cookieHeader);
  return (localeMatch ? localeMatch[1] : DEFAULT_LOCALE) as AppLocale;
}
