import { isSessionStorageAvailable } from '~/utils/helpers';

// Helper function to validate that the key is a string
const isValidKey = (key: unknown): key is string => typeof key === 'string';

// Helper function to handle non-string values (serializable only)
const serializeValue = <T = unknown>(value: T): string => {
  if (value && (typeof value === 'object' || Array.isArray(value))) {
    return JSON.stringify(value);
  }
  return String(value);
};

/**
 * Store into sessionStorage
 * @param key sessionStorage key
 * @param value Allow any key
 */
export const setSession = <T = unknown>(key: string, value: T): void => {
  if (!isSessionStorageAvailable() || !isValidKey(key)) return;
  const serializedValue = serializeValue(value);
  sessionStorage.setItem(key, serializedValue);
};

/**
 * Reading the sessionStorage item by key
 * @returns return value
 */
export const getSession = <T = unknown>(key: string): T | null => {
  if (!isSessionStorageAvailable() || !isValidKey(key)) return null;

  const storedValue = sessionStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      // In case JSON parsing fails, return the string value
      return storedValue as unknown as T;
    }
  }
  return null;
};

/**
 * Removing the sessionStorage item by key
 */
export const removeSession = (key: string): void => {
  if (!isSessionStorageAvailable() || !isValidKey(key)) return;
  sessionStorage.removeItem(key);
};

/**
 * Check sessionStorage key exists
 * @returns return true
 */
export const checkSession = (key: string): boolean => {
  if (!isSessionStorageAvailable() || !isValidKey(key)) return false;
  return sessionStorage.getItem(key) !== null;
};

/**
 * Removing all the sessionStorage keys
 */
export const clearSession = (): void => {
  if (!isSessionStorageAvailable()) return;
  sessionStorage.clear();
};

/**
 * Access sessionStorage with a unified API
 */
export const SessionUtil = {
  set: setSession,
  get: getSession,
  remove: removeSession,
  check: checkSession,
  clear: clearSession,
};
