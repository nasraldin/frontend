import { isBrowser } from '~/utils/env';
import { logger } from '~/utils/logger';

export type SameSiteType = true | false | 'lax' | 'strict' | 'none' | undefined;

/**
 * Retrieves the value of a cookie by its name.
 * @param name The name of the cookie to retrieve.
 * @returns The value of the cookie if found, or null if not found.
 */
export const getCookie = (name: string): string | null => {
  if (!isBrowser) return null;

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

/**
 * Sets a cookie with the given name, value, and options.
 * @param name The name of the cookie to set.
 * @param value The value of the cookie.
 * @param options Additional options for the cookie (optional).
 */
export const setCookie = (
  name: string,
  value: string,
  options: {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: SameSiteType;
    httpOnly?: boolean;
  } = {},
): void => {
  if (!isBrowser) return;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires instanceof Date) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
  logger.info({ cookieString }, 'cookies'); // Log the cookie set action (useful for debugging)
};

/**
 * Deletes a cookie by setting its expiration date to the past.
 * @param name The name of the cookie to delete.
 * @param options Additional options for the cookie (optional).
 */
export const deleteCookie = (
  name: string,
  options: { path?: string; domain?: string } = {},
): void => {
  if (!isBrowser) return;

  const deletedOptions = { ...options, expires: new Date(0) };
  setCookie(name, '', deletedOptions);
  logger.info({ action: 'deleted', cookie: name }, 'cookies');
};

/**
 * Clears all cookies accessible from the current page.
 */
export const clearCookies = (): void => {
  if (!isBrowser) return;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const name = cookie.split('=')[0].trim();
    deleteCookie(name); // Delete each cookie by name
  }
  logger.info({ action: 'cleared' }, 'cookies');
};

/**
 * Access cookies through a unified API
 */
export const CookieUtil = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
  clear: clearCookies,
};
