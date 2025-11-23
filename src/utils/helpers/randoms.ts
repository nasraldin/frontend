import { toBase64URL } from './converts';

/**
 * Generates a random 16-byte string encoded in base64 format.
 *
 * This function uses the Web Crypto API to generate cryptographically secure
 * random values. It creates a 16-byte (128-bit) random array and converts it
 * to a base64 string.
 *
 * @returns {string} A base64 encoded string representing 16 random bytes
 *
 * @throws {Error} If the Web Crypto API is not supported in the environment
 * @throws {Error} If random value generation fails
 *
 * @example
 * try {
 *   const randomString = random16Bytes();
 *   console.log(randomString); // Outputs something like: "1234abcd..."
 * } catch (error) {
 *   console.error('Random generation failed:', error);
 * }
 *
 * @security This function uses cryptographically secure random number generation
 * via crypto.getRandomValues() rather than Math.random()
 */
export const random16Bytes = (): string => {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Crypto.getRandomValues is not supported');
  }

  try {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCodePoint(...array));
  } catch (error) {
    throw new Error(`Failed to generate nonce: ${JSON.stringify(error)}`);
  }
};

/**
 * Generates a random number within a specified range.
 *
 * This function generates a random number between min and max (inclusive),
 * optionally using a seed value to influence the randomness.
 *
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (inclusive).
 * @param seed - An optional seed value to influence the random number generation.
 *               If provided, it should be a positive number.
 * @returns A random integer between min and max (inclusive).
 * @throws Will throw an error if min is greater than max or if seed is not a positive number.
 *
 * @example
 * console.log(randomNumber(1, 10));        // Output: A random number between 1 and 10
 * console.log(randomNumber(1, 10, 2));     // Output: A random number between 1 and 10, influenced by seed 2
 * console.log(randomNumber(-5, 5));        // Output: A random number between -5 and 5
 */
export const randomNumber = (min: number, max: number, seed?: number): number => {
  if (min > max) {
    throw new Error('Minimum value must be less than or equal to maximum value');
  }

  if (seed !== undefined && (typeof seed !== 'number' || seed <= 0)) {
    throw new Error('Seed must be a positive number');
  }

  let random = Math.random();
  if (seed !== undefined) {
    // Simple seeding mechanism
    random = (Math.sin(seed) * 10000) % 1;
  }

  return Math.floor(random * (max - min + 1)) + min;
};

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
