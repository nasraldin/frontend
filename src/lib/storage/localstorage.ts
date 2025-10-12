import { isLocalStorageAvailable } from '~/utils/helpers';

/**
 * Helper function to check if the key is a valid string.
 * @param key The key to check
 * @returns true if the key is a valid string
 */
const isValidKey = (key: unknown): key is string => typeof key === 'string';

/**
 * Helper function to serialize values
 * @param value The value to serialize
 * @returns The serialized string value
 */
const serializeValue = (value: unknown): string => {
  if (value === null || typeof value === 'boolean' || typeof value === 'number') {
    return String(value); // Primitives (null, boolean, number) just convert to string
  }

  if (typeof value === 'object' || Array.isArray(value)) {
    return JSON.stringify(value); // Objects and arrays need to be stringified
  }

  return String(value); // Any other value (string or unknown type) is converted to string
};

/**
 * Store into localStorage
 * @param key localStorage key
 * @param value The value to store in localStorage
 */
export const setLS = (key: string, value: unknown): void => {
  if (!isLocalStorageAvailable() || !isValidKey(key)) return;

  try {
    const serializedValue = serializeValue(value);
    localStorage.setItem(key, serializedValue);
  } catch {
    // Handle localStorage errors silently (e.g., quota exceeded)
  }
};

/**
 * Reading the localStorage item by key
 * @param key localStorage key
 * @returns The parsed value from localStorage or null if not found
 */
export const getLS = <T = unknown>(key: string): T | null => {
  if (!isLocalStorageAvailable() || !isValidKey(key)) return null;

  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;

    return JSON.parse(storedValue) as T; // Attempt to parse as JSON if it's an object/array
  } catch {
    // Handle localStorage errors silently (e.g., quota exceeded, JSON parse errors)
    return null;
  }
};

/**
 * Removing the localStorage item by key
 * @param key localStorage key
 */
export const removeLS = (key: string): void => {
  if (!isLocalStorageAvailable() || !isValidKey(key)) return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Handle localStorage errors silently
  }
};

/**
 * Check if a localStorage key exists
 * @param key localStorage key
 * @returns true if the key exists, false otherwise
 */
export const checkLS = (key: string): boolean => {
  if (!isLocalStorageAvailable() || !isValidKey(key)) return false;

  try {
    return localStorage.getItem(key) !== null;
  } catch {
    // Handle localStorage errors silently
    return false;
  }
};

/**
 * Removing all the localStorage keys
 */
export const clearLS = (): void => {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.clear();
  } catch {
    // Handle localStorage errors silently
  }
};

/**
 * Access localStorage through a unified API
 */
export const LocalStorageUtil = {
  set: setLS,
  get: getLS,
  remove: removeLS,
  check: checkLS,
  clear: clearLS,
};
