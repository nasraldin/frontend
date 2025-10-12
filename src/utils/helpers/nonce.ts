import { HttpHeaderName, NONCE_COOKIE_KEY } from '~/constants';
import { logger } from '~/utils/logger';

import { toBase64URL } from './converts';
import { parseCookies } from './cookies';
import { random16Bytes } from './randoms';

/**
 * Generates a cryptographically secure random nonce string for use in CSP headers
 * Uses Web Crypto API to generate 16 bytes (128 bits) of random data
 * Returns a base64url encoded string prefixed with 'nonce-'
 *
 * @returns {string} A CSP-compatible nonce string
 * @throws {Error} If crypto.getRandomValues is not available
 */
export const generateNonce = (): string => {
  return `nonce-${toBase64URL(random16Bytes())}`;
};

/**
 * Retrieves the nonce value from cookies or headers.
 * This function is designed for server-side components in SolidJS Start.
 *
 * @param request - The request object from SolidJS Start middleware or route context
 * @returns The nonce value if found, or null if not found
 */
export function getNonce(request?: Request): string | null {
  try {
    if (!request) {
      logger.warn('getNonce: No request object provided');
      return null;
    }

    // First try to get nonce from cookies
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const cookies = parseCookies(cookieHeader);
      const nonceCookie = cookies[NONCE_COOKIE_KEY];

      if (nonceCookie) {
        return nonceCookie;
      }
    }

    // Fallback to headers if cookie is not available
    const nonceHeader = request.headers.get(HttpHeaderName.Nonce);
    if (nonceHeader) {
      return nonceHeader;
    }

    return null;
  } catch (error) {
    // In case of any error, return null to avoid breaking the app
    logger.warn({ error }, 'Failed to retrieve nonce');
    return null;
  }
}

/**
 * Helper function to get nonce from SolidJS Start middleware event
 * @param event - The middleware event from SolidJS Start
 * @returns The nonce value if found, or null if not found
 */
export function getNonceFromEvent(event: { request: Request }): string | null {
  return getNonce(event.request);
}
