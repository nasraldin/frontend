/**
 * IndexedDB Utility Module
 *
 * This module provides utility functions for interacting with IndexedDB, a low-level API for
 * client-side storage of significant amounts of structured data, including files/blobs.
 * It allows for the storage of data in a transactional database system.
 *
 * The module includes:
 *
 * 1. **IDBItem<T>**: An interface representing an item stored in the IndexedDB, which includes:
 *    - `_id`: A unique identifier for the object in the store.
 *    - `data`: The actual data associated with the identifier.
 *    - `isActive`: A boolean indicating if the item is active.
 *
 * 2. **openIDB**: A function to open a database with versioning and migration support.
 *    It accepts the following parameters:
 *    - `dbName`: The name of the database.
 *    - `version`: The version of the database.
 *    - `storeName`: The name of the object store to be created or opened.
 *
 * 3. **getFromIDB<T>**: A function to retrieve data from a specific object store.
 *    It takes the following parameters:
 *    - `dbName`: The name of the database.
 *    - `dbVersion`: The version of the database.
 *    - `storeName`: The name of the object store.
 *    - `key`: The key of the item to retrieve.
 *
 * 4. **setToIDB<T>**: A function to set data into a specific object store.
 *    It accepts the following parameters:
 *    - `dbName`: The name of the database.
 *    - `dbVersion`: The version of the database.
 *    - `storeName`: The name of the object store.
 *    - `data`: An object of type IDBItem<T> to be stored.
 *
 * The module also includes migration logic to handle changes in the database schema
 * across different versions, ensuring that data is preserved and updated as necessary.
 */
import { isIndexedDBAvailable } from '~/utils/helpers';
import { logger } from '~/utils/logger';

/**
 * Generic interface for items stored in IndexedDB.
 * @template T - The type of data stored in the item.
 */
export interface IDBItem<T> {
  _id: string; // Unique identifier for the object in the store
  data: T; // The actual data associated with the identifier
  isActive: boolean; // Flag to indicate whether the item is active or not
}

/**
 * Modular migration steps for database versioning.
 */
export const migrations: Record<
  number,
  (db: IDBDatabase, storeName: string) => void
> = {
  1: (db: IDBDatabase, storeName: string) => {
    const objectStore = db.createObjectStore(storeName, { keyPath: '_id' });
    logger.info(
      {
        objectStore,
      },
      `Created object store '${storeName}' with keyPath '_id'`,
    );
  },
  2: (db: IDBDatabase, storeName: string) => {
    const objectStore = db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName);
    objectStore.createIndex('nameIndex', 'data.name', { unique: false });
    logger.info(
      {
        objectStore,
      },
      `Created index 'nameIndex' on object store '${storeName}'`,
    );
  },
  3: (db: IDBDatabase, storeName: string) => {
    const objectStore = db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName);
    if (!db.objectStoreNames.contains('preferences')) {
      db.createObjectStore('preferences', { keyPath: '_id' });
      logger.info(
        {
          objectStore,
        },
        `Created object store 'preferences'`,
      );
    }
  },
  4: (db: IDBDatabase, storeName: string) => {
    const objectStore = db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName);
    const cursorRequest = objectStore.openCursor();

    cursorRequest.onsuccess = (event: Event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const item = cursor.value.data;
        if (!Object.hasOwn(item, 'isActive')) {
          item.isActive = true; // Add default 'isActive' field
        }
        cursor.update(cursor.value);
        cursor.continue();
      }
    };
    cursorRequest.onerror = (event) => {
      logger.error(
        `Error upgrading store '${storeName}': ${(event.target as IDBRequest).error?.message}`,
      );
    };
  },
};

/**
 * Opens a database with versioning and migration support.
 * @param dbName - The name of the database to open.
 * @param version - The version of the database to open.
 * @param storeName - The name of the object store to create or open.
 * @returns A promise that resolves to the opened IDBDatabase instance.
 */
export const openIDB = (
  dbName: string,
  version: number,
  _storeName: string,
): Promise<IDBDatabase> => {
  if (!isIndexedDBAvailable()) {
    logger.warn('IndexedDB is not available in server side');
    return Promise.reject(new Error('IndexedDB is not available'));
  }

  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onerror = (event) => {
      reject(
        new Error(
          `Error opening database: ${(event.target as IDBRequest).error?.message}`,
        ),
      );
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      const oldVersion = db.version;

      logger.info(`Upgrading database from version ${oldVersion} to ${version}`);

      // Apply migrations based on version
      for (let i = oldVersion + 1; i <= version; i++) {
        if (migrations[i]) {
          migrations[i](db, 'layouts'); // Pass the correct store name
        }
      }
    };
  });
};

/**
 * Retrieves data from a specific object store.
 * @param dbName - The name of the database to retrieve data from.
 * @param dbVersion - The version of the database.
 * @param storeName - The name of the object store.
 * @param key - The key of the item to retrieve.
 * @returns A promise that resolves to the item of type T, or undefined if not found.
 */
export const getFromIDB = async <T>(
  dbName: string,
  dbVersion: number,
  storeName: string,
  key: string,
): Promise<T | undefined> => {
  if (!isIndexedDBAvailable()) {
    logger.warn('IndexedDB is not available in server side');
    return;
  }

  const db = await openIDB(dbName, dbVersion, storeName);
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);

  return new Promise<T | undefined>((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => {
      const result = request.result
        ? (request.result as IDBItem<T>).data
        : undefined;
      resolve(result);
    };
    request.onerror = (e) =>
      reject(
        new Error(`Error getting data: ${(e.target as IDBRequest).error?.message}`),
      );
  });
};

/**
 * Sets data into a specific object store.
 * @param dbName - The name of the database to store data in.
 * @param dbVersion - The version of the database.
 * @param storeName - The name of the object store.
 * @param data - The data to be stored, wrapped in an IDBItem.
 * @returns A promise that resolves when the data has been successfully stored.
 */
export const setToIDB = async <T>(
  dbName: string,
  dbVersion: number,
  storeName: string,
  data: IDBItem<T>,
): Promise<void> => {
  if (!isIndexedDBAvailable()) {
    logger.warn('IndexedDB is not available in server side');
    return;
  }

  const db = await openIDB(dbName, dbVersion, storeName);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise<void>((resolve, reject) => {
    const request = store.put(data);
    request.onsuccess = () => resolve();
    request.onerror = (e) =>
      reject(
        new Error(`Error setting data: ${(e.target as IDBRequest).error?.message}`),
      );
  });
};

/**
 * Updates an existing item in the IndexedDB.
 * If the item does not exist, it will be created.
 * @param dbName - The name of the database to store data in.
 * @param dbVersion - The version of the database.
 * @param storeName - The name of the object store.
 * @param data - The data to be updated, wrapped in an IDBItem.
 * @returns A promise that resolves when the data has been successfully updated.
 */
export const updateInIDB = async <T>(
  dbName: string,
  dbVersion: number,
  storeName: string,
  data: IDBItem<T>,
): Promise<void> => {
  return setToIDB(dbName, dbVersion, storeName, data); // Overwrites or updates the existing item
};

/**
 * Deletes an item from the IndexedDB.
 * @param dbName - The name of the database to delete data from.
 * @param dbVersion - The version of the database.
 * @param storeName - The name of the object store.
 * @param key - The key of the item to delete.
 * @returns A promise that resolves when the item has been successfully deleted.
 */
export const deleteFromIDB = async (
  dbName: string,
  dbVersion: number,
  storeName: string,
  key: string,
): Promise<void> => {
  if (!isIndexedDBAvailable()) {
    logger.warn('IndexedDB is not available in server side');
    return;
  }

  const db = await openIDB(dbName, dbVersion, storeName);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise<void>((resolve, reject) => {
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = (e) =>
      reject(
        new Error(
          `Error deleting data: ${(e.target as IDBRequest).error?.message}`,
        ),
      );
  });
};

/**
 * Clears all records from a specific object store in the database.
 * @param dbName - The name of the database.
 * @param dbVersion - The version of the database.
 * @param storeName - The name of the object store to clear.
 * @returns A promise that resolves when the store has been cleared.
 */
export const clearStoreInIDB = async (
  dbName: string,
  dbVersion: number,
  storeName: string,
): Promise<void> => {
  if (!isIndexedDBAvailable()) {
    logger.warn('IndexedDB is not available in server side');
    return;
  }

  const db = await openIDB(dbName, dbVersion, storeName);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise<void>((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = (e) =>
      reject(
        new Error(
          `Error clearing store: ${(e.target as IDBRequest).error?.message}`,
        ),
      );
  });
};

/**
 * Clears the entire database by deleting all object stores.
 * @param dbName - The name of the database.
 * @param dbVersion - The version of the database.
 * @returns A promise that resolves when the entire database has been cleared.
 */
export const clearDatabaseInIDB = async (
  dbName: string,
  dbVersion: number,
): Promise<void> => {
  if (!isIndexedDBAvailable()) {
    logger.warn('IndexedDB is not available in server side');
    return;
  }

  const db = await openIDB(dbName, dbVersion, '');
  return new Promise<void>((resolve, reject) => {
    db.close();
    const deleteRequest = indexedDB.deleteDatabase(dbName);
    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = (e) =>
      reject(
        new Error(
          `Error deleting database: ${(e.target as IDBRequest).error?.message}`,
        ),
      );
  });
};

export const IndexedDBUtil = {
  open: openIDB,
  get: getFromIDB,
  set: setToIDB,
  update: updateInIDB,
  delete: deleteFromIDB,
  clearStore: clearStoreInIDB,
  clearDatabase: clearDatabaseInIDB,
};
