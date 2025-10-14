import {
  CookieSerializeOptions,
  deleteCookie as deleteCookieHttp,
  getCookie as getCookieHttp,
  setCookie as setCookieHttp,
} from 'vinxi/http';

import { logger } from '~/utils/logger';

// Security constants
const MAX_COOKIE_NAME_LENGTH = 4096;
const MAX_COOKIE_VALUE_LENGTH = 4096;
const SAFE_COOKIE_NAME_REGEX = /^[a-zA-Z0-9._-]+$/;
const SAFE_COOKIE_VALUE_REGEX = /^[a-zA-Z0-9._~!$&'()*+,;=:@/?-]*$/;

// Secure default options
const SECURE_DEFAULT_OPTIONS: CookieSerializeOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
};

/**
 * Validates and sanitizes cookie name
 * @param name The cookie name to validate
 * @returns Sanitized cookie name or null if invalid
 */
const validateCookieName = (name: string): string | null => {
  if (!name || typeof name !== 'string') {
    return null;
  }

  const trimmedName = name.trim();

  if (trimmedName.length === 0 || trimmedName.length > MAX_COOKIE_NAME_LENGTH) {
    return null;
  }

  if (!SAFE_COOKIE_NAME_REGEX.test(trimmedName)) {
    return null;
  }

  return trimmedName;
};

/**
 * Validates and sanitizes cookie value
 * @param value The cookie value to validate
 * @returns Sanitized cookie value or null if invalid
 */
const validateCookieValue = (value: string): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const stringValue = String(value);

  if (stringValue.length > MAX_COOKIE_VALUE_LENGTH) {
    return null;
  }

  if (!SAFE_COOKIE_VALUE_REGEX.test(stringValue)) {
    return null;
  }

  return stringValue;
};

/**
 * Retrieves the value of a cookie by its name.
 * @param name The name of the cookie to retrieve.
 * @returns The value of the cookie if found, or null if not found.
 */
export const getCookie = (name: string): string | null => {
  const validatedName = validateCookieName(name);
  if (!validatedName) {
    logger.warn({ name }, 'getCookie: Invalid cookie name');
    return null;
  }

  const value = getCookieHttp(validatedName);
  if (value) {
    return decodeURIComponent(value);
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
  options?: CookieSerializeOptions,
): void => {
  const validatedName = validateCookieName(name);
  const validatedValue = validateCookieValue(value);

  if (!validatedName || !validatedValue) {
    logger.warn(
      { name, value, options },
      'setCookie: Invalid cookie name or value',
    );
    return;
  }

  // Merge with secure defaults, allowing overrides
  const secureOptions: CookieSerializeOptions = {
    ...SECURE_DEFAULT_OPTIONS,
    ...options,
  };

  setCookieHttp(validatedName, validatedValue, secureOptions);
};

/**
 * Deletes a cookie by setting its expiration date to the past.
 * @param name The name of the cookie to delete.
 * @param options Additional options for the cookie (optional).
 */
export const deleteCookie = (
  name: string,
  options?: CookieSerializeOptions,
): void => {
  const validatedName = validateCookieName(name);
  if (!validatedName) {
    logger.warn({ name, options }, 'deleteCookie: Invalid cookie name');
    return;
  }

  deleteCookieHttp(validatedName, options);
};

/**
 * Clears all cookies accessible from the current page.
 */
export const clearCookies = (): void => {
  try {
    if (typeof document === 'undefined') {
      logger.warn('clearCookies: document is not available (server-side)');
      return;
    }

    const cookies = document.cookie.split(';');
    let clearedCount = 0;

    for (const cookie of cookies) {
      try {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie) {
          const name = trimmedCookie.split('=')[0].trim();
          if (name && validateCookieName(name)) {
            deleteCookie(name);
            clearedCount += 1;
          }
        }
      } catch (error) {
        logger.warn({ cookie, error }, 'Failed to clear malformed cookie');
      }
    }

    logger.info({ action: 'cleared', count: clearedCount }, 'cookies');
  } catch (error) {
    logger.error({ error }, 'Failed to clear cookies');
  }
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
