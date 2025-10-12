import { isBrowser } from '~/utils/env';
import { logger } from '~/utils/logger';

import { CookieUtil } from './cookies';
import { IndexedDBUtil } from './indexedDB';
import { LocalStorageUtil } from './localstorage';
import { SessionUtil } from './sessionStorage';

/**
 * Resets all app-related storage (cookies, sessionStorage, localStorage, IndexedDB)
 * to their default state, and seeds them with default values.
 */
export const resetAppStorage = async () => {
  if (!isBrowser) return;

  try {
    // 1. Clear all cookies
    CookieUtil.clear();
    logger.info('Cookies cleared successfully.');

    // 2. Clear all sessionStorage
    SessionUtil.clear();
    logger.info('Session Storage cleared successfully.');

    // 3. Clear all localStorage
    LocalStorageUtil.clear();
    logger.info('Local Storage cleared successfully.');

    // 4. Clear IndexedDB (you can specify your database name and version here)
    const dbName = 'appDatabase'; // Replace with your actual database name
    const dbVersion = 1; // Replace with your database version
    const storeName = 'appStore'; // Replace with your object store name
    await IndexedDBUtil.clearStore(dbName, dbVersion, storeName); // Clear specific store
    logger.info('IndexedDB store cleared successfully.');

    // Optionally, clear entire database:
    // await IndexedDBUtil.clearDatabaseInIDB(dbName, dbVersion);
    // info('IndexedDB database cleared successfully.');

    // 5. Seed default values
    seedDefaultCookies();
    seedDefaultSessionStorage();
    seedDefaultLocalStorage();
    seedDefaultIndexedDB();
    logger.info('App storage reset and seeded with default values.');
  } catch (error) {
    logger.error({ error }, 'Error resetting app storage:');
  }
};

/**
 * Seeds default cookies.
 */
const seedDefaultCookies = () => {
  // Example: Seed default cookies. Replace with your actual cookie names/values
  CookieUtil.set('userSession', 'defaultSession', {
    expires: new Date(Date.now() + 3600000),
  });
  CookieUtil.set('preferences', 'defaultPreferences', {
    path: '/',
    expires: new Date(Date.now() + 3600000),
  });
  logger.info('Default cookies seeded.');
};

/**
 * Seeds default session storage.
 */
const seedDefaultSessionStorage = () => {
  // Example: Seed default sessionStorage. Replace with your actual keys/values
  sessionStorage.setItem('authStatus', 'loggedOut');
  sessionStorage.setItem(
    'userData',
    JSON.stringify({ username: 'guest', role: 'viewer' }),
  );
  logger.info('Default session storage seeded.');
};

/**
 * Seeds default local storage.
 */
const seedDefaultLocalStorage = () => {
  // Example: Seed default localStorage. Replace with your actual keys/values
  localStorage.setItem('theme', 'light');
  localStorage.setItem('language', 'en');
  logger.info('Default local storage seeded.');
};

/**
 * Seeds default IndexedDB values.
 */
const seedDefaultIndexedDB = async () => {
  const dbName = 'yourDatabaseName'; // Replace with your actual database name
  const dbVersion = 1; // Replace with your database version
  const storeName = 'yourStoreName'; // Replace with your object store name

  // Example of default data for IndexedDB
  const defaultData = [
    { _id: '1', data: { username: 'guest', role: 'viewer' }, isActive: true },
    { _id: '2', data: { username: 'admin', role: 'admin' }, isActive: true },
  ];

  // Seed default data to IndexedDB
  for (const item of defaultData) {
    await IndexedDBUtil.set(dbName, dbVersion, storeName, item);
  }
  logger.info('Default IndexedDB seeded.');
};
