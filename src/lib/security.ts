// import { BLOWFISH_SECRET, HttpHeaderName } from '~/constants';
// import { logger } from '~/utils/logger';

// /**
//  * Security utilities and validations
//  */

// // Validate that required security environment variables are set
// export function validateSecurityConfig() {
//   const requiredVars = [
//     'AUTH_SECRET',
//     'AUTH_KEYCLOAK_SECRET',
//     'AUTH_KEYCLOAK_ID',
//     'AUTH_KEYCLOAK_ISSUER',
//   ];

//   const missingVars = requiredVars.filter(
//     (varName) => !env[varName as keyof typeof env],
//   );

//   if (missingVars.length > 0) {
//     logger.error(
//       {
//         missing: missingVars,
//       },
//       'Missing required security environment variables',
//     );
//     throw new Error(
//       `Missing required security environment variables: ${missingVars.join(', ')}`,
//     );
//   }

//   // Validate AUTH_SECRET strength
//   const authSecret = env.AUTH_SECRET;
//   if (authSecret && authSecret.length < 32) {
//     logger.warn('AUTH_SECRET is too short, should be at least 32 characters');
//   }

//   logger.info('Security configuration validated successfully');
// }

// // Sanitize sensitive data for logging
// export function sanitizeForLogging(data: unknown): unknown {
//   if (typeof data !== 'object' || data === null) {
//     return data;
//   }

//   const sensitiveKeys = [
//     'password',
//     'secret',
//     'token',
//     'key',
//     'auth',
//     'session',
//     'cookie',
//     'credential',
//     'access_token',
//     'refresh_token',
//     'authorization',
//   ];

//   const sanitized = { ...(data as Record<string, unknown>) };

//   for (const key in sanitized) {
//     if (
//       sensitiveKeys.some((sensitiveKey) =>
//         key.toLowerCase().includes(sensitiveKey.toLowerCase()),
//       )
//     ) {
//       sanitized[key] = '***REDACTED***';
//     } else if (typeof sanitized[key] === 'object') {
//       sanitized[key] = sanitizeForLogging(sanitized[key]);
//     }
//   }

//   return sanitized;
// }

// // Generate secure random string
// export async function generateSecureRandom(length = 32): Promise<string> {
//   const chars = BLOWFISH_SECRET;
//   let result = '';

//   if (typeof window !== 'undefined' && window.crypto) {
//     // Browser environment
//     const array = new Uint8Array(length);
//     window.crypto.getRandomValues(array);
//     for (let i = 0; i < length; i++) {
//       result += chars[array[i] % chars.length];
//     }
//   } else {
//     // Node.js environment
//     const crypto = await import('crypto');
//     const randomBytes = crypto.randomBytes(length);
//     for (let i = 0; i < length; i++) {
//       result += chars[randomBytes[i] % chars.length];
//     }
//   }

//   return result;
// }

// // Validate JWT token structure (basic validation)
// export function isValidJWTStructure(token: string): boolean {
//   if (!token || typeof token !== 'string') {
//     return false;
//   }

//   const parts = token.split('.');
//   if (parts.length !== 3) {
//     return false;
//   }

//   try {
//     // Check if header and payload are valid base64
//     JSON.parse(atob(parts[0]));
//     JSON.parse(atob(parts[1]));
//     return true;
//   } catch {
//     return false;
//   }
// }

// // Check if request is from a trusted source
// export function isTrustedOrigin(origin: string, allowedOrigins: string[]): boolean {
//   if (!origin) return false;

//   return allowedOrigins.some((allowedOrigin) => {
//     if (allowedOrigin.includes('*')) {
//       const pattern = allowedOrigin.replace(/\*/g, '.*');
//       return new RegExp(`^${pattern}$`).test(origin);
//     }
//     return origin === allowedOrigin;
//   });
// }

// // Security headers for API responses
// export const SECURITY_HEADERS = {
//   [HttpHeaderName.XContentTypeOptions]: 'nosniff',
//   [HttpHeaderName.XFrameOptions]: 'DENY',
//   [HttpHeaderName.XssProtection]: '1; mode=block',
//   [HttpHeaderName.ReferrerPolicy]: 'strict-origin-when-cross-origin',
//   [HttpHeaderName.PermissionsPolicy]: 'camera=(), microphone=(), geolocation=()',
//   [HttpHeaderName.StrictTransportSecurity]:
//     'max-age=63072000; includeSubDomains; preload',
// } as const;

// // Apply security headers to response
// export function applySecurityHeaders(response: Response): Response {
//   Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
//     response.headers.set(key, value);
//   });
//   return response;
// }
