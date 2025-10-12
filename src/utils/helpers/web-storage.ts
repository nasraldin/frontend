import { isBrowser } from '~/utils/env';

/**
 * Checks if the browser's localStorage is available and functioning.
 *
 * This function attempts to write to and read from localStorage to ensure
 * it's not only present but also operational. It handles various edge cases,
 * including browsers in private/incognito mode where localStorage might be present
 * but not functional.
 *
 * The result is memoized, so subsequent calls will return the cached result
 * without re-checking, improving performance for frequent calls.
 *
 * @returns boolean True if localStorage is available and functioning, false otherwise.
 *
 * @example
 * if (isLocalStorageAvailable()) {
 *   // Safe to use localStorage
 *   localStorage.setItem('key', 'value');
 * } else {
 *   console.log('localStorage is not available');
 * }
 *
 * @performance This function performs a write and delete operation on localStorage
 * only on the first call. Subsequent calls return the memoized result.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage}
 */

/**
 * Helper to detect quota-exceeded-like DOM exceptions without using the
 * deprecated DOMException.code property directly.
 */
const isQuotaExceededError = (e: unknown): boolean => {
  if (!(e instanceof DOMException)) return false;

  // Preferred checks by name
  if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
    return true;
  }

  // Fallback for older browsers that expose numeric codes.
  // Cast to a DOMException augmented with an optional `code` property
  // to avoid using `any` while still checking legacy numeric codes.
  const legacy = e as DOMException & { code?: number };
  return (
    typeof legacy.code === 'number' && (legacy.code === 22 || legacy.code === 1014)
  );
};

export const isLocalStorageAvailable = () => {
  let result: boolean | null = null;

  return (): boolean => {
    if (result !== null) {
      return result;
    }

    if (!isBrowser) {
      result = false;
      return result;
    }

    const testKey = '__storage_test__';
    try {
      const storage = window.localStorage;
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      result = true;
    } catch (e) {
      result =
        // use helper instead of direct `code` checks
        isQuotaExceededError(e) &&
        // acknowledge QuotaExceededError only if there's something already stored
        window.localStorage &&
        window.localStorage.length !== 0;
    }

    return result;
  };
};

/**
 * Checks if IndexedDB is available in the current browser.
 *
 * This function attempts to access the IndexedDB API and returns a boolean
 * indicating whether IndexedDB is supported and available for use. It is
 * useful for determining if the application can utilize IndexedDB for
 * storage purposes.
 *
 * @returns boolean - Returns true if IndexedDB is available, false otherwise.
 */
export const isIndexedDBAvailable = () => {
  let result = false;

  return (): boolean => {
    if (result !== false) {
      return result;
    }

    if (!isBrowser) {
      return false;
    }

    const testDbName = '__indexeddb_test__';
    const testStoreName = '__test_store__';

    try {
      const request = indexedDB.open(testDbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore(testStoreName, { keyPath: 'id' });
        store.put({ id: 1, value: 'test' });
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(testStoreName, 'readwrite');
        const store = transaction.objectStore(testStoreName);
        store.delete(1);
        db.close();
        indexedDB.deleteDatabase(testDbName);
        result = true;
      };

      request.onerror = () => {
        result = false;
      };
    } catch (e) {
      result = false;
    }

    return result;
  };
};

/**
 * Checks if the browser's sessionStorage is available and functioning.
 *
 * This function attempts to write to and read from sessionStorage to ensure
 * it's not only present but also operational. It handles various edge cases,
 * including browsers in private/incognito mode where sessionStorage might be present
 * but not functional.
 *
 * The result is memoized, so subsequent calls will return the cached result
 * without re-checking, improving performance for frequent calls.
 *
 * @returns True if sessionStorage is available and functioning, false otherwise.
 *
 * @example
 * if (isSessionStorageAvailable()) {
 *   // Safe to use sessionStorage
 *   sessionStorage.setItem('key', 'value');
 * } else {
 *   console.log('sessionStorage is not available');
 * }
 *
 * @performance This function performs a write and delete operation on sessionStorage
 * only on the first call. Subsequent calls return the memoized result.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_sessionStorage}
 */
export const isSessionStorageAvailable = () => {
  let result: boolean | null = null;

  return (): boolean => {
    if (result !== null) {
      return result;
    }

    if (!isBrowser) {
      result = false;
      return result;
    }

    const testKey = '__session_storage_test__';
    try {
      const storage = window.sessionStorage;
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      result = true;
    } catch (e) {
      result =
        // use helper instead of direct `code` checks
        isQuotaExceededError(e) &&
        // acknowledge QuotaExceededError only if there's something already stored
        window.sessionStorage &&
        window.sessionStorage.length !== 0;
    }

    return result;
  };
};

/**
 * Checks if cookies are available and enabled in the browser.
 *
 * This function attempts to write and read a test cookie to ensure that
 * cookies are not only present but also functional. It handles various
 * edge cases, including browsers with cookie support disabled.
 *
 * The result is memoized, so subsequent calls will return the cached result
 * without re-checking, improving performance for frequent calls.
 *
 * @returns True if cookies are available and enabled, false otherwise.
 *
 * @example
 * if (isCookiesAvailable()) {
 *   // Safe to use cookies
 *   document.cookie = 'key=value';
 * } else {
 *   console.log('Cookies are not available');
 * }
 *
 * @performance This function performs a write and delete operation on cookies
 * only on the first call. Subsequent calls return the memoized result.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie}
 */
export const isCookiesAvailable = () => {
  let result: boolean | null = null;

  return (): boolean => {
    if (result !== null) {
      return result;
    }

    if (!isBrowser) {
      result = false;
      return result;
    }

    const testKey = '__cookie_test__';
    try {
      document.cookie = `${testKey}=1`;
      const cookiesEnabled = document.cookie.indexOf(`${testKey}=`) !== -1;
      document.cookie = `${testKey}=1; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      result = cookiesEnabled;
    } catch (e) {
      result = false;
    }

    return result;
  };
};
