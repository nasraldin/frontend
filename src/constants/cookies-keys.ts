/*-----------------------------------------------*
 *                                               *
 *           App Cookies Keys Constants          *
 *                                               *
 ------------------------------------------------*/

export const LOG_UUID_COOKIE_KEY = 'logUuid';
export const LOG_UUID_COOKIE_TTL = 60 * 60 * 24 * 365 * 1000;
export const NONCE_COOKIE_KEY = 'nonce';

export const CookieSameSite = {
  Strict: 'strict',
  Lax: 'lax',
  None: 'none',
} as const;
