/**
 * IndexedDB schema setup.
 * Single source of truth for DB version and object store definitions.
 *
 * Stores:
 *   exercises — exercise definitions (built-in + custom)
 *   workouts  — workout plans
 *   sessions  — completed/in-progress training sessions
 */

const DB_NAME    = 'supafast';
const DB_VERSION = 1;

let dbPromise = null;

/** Open (or reuse) the database connection */
export function openDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      createStores(db, e.oldVersion);
    };

    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror   = (e) => {
      dbPromise = null;
      reject(e.target.error);
    };
    req.onblocked = () => {
      console.warn('[DB] Upgrade blocked — close other tabs');
    };
  });

  return dbPromise;
}

function createStores(db, oldVersion) {
  if (oldVersion < 1) {
    // exercises
    const exStore = db.createObjectStore('exercises', { keyPath: 'id' });
    exStore.createIndex('category',  'category',  { unique: false });
    exStore.createIndex('isCustom',  'isCustom',  { unique: false });
    exStore.createIndex('name',      'name',      { unique: false });

    // workouts
    const wStore = db.createObjectStore('workouts', { keyPath: 'id' });
    wStore.createIndex('updatedAt', 'updatedAt', { unique: false });
    wStore.createIndex('createdAt', 'createdAt', { unique: false });

    // sessions
    const sStore = db.createObjectStore('sessions', { keyPath: 'id' });
    sStore.createIndex('startedAt',  'startedAt',  { unique: false });
    sStore.createIndex('workoutId',  'workoutId',  { unique: false });
    sStore.createIndex('status',     'status',     { unique: false });
    sStore.createIndex('dateKey',    'dateKey',    { unique: false });
  }
}

/**
 * Generic transaction helper.
 * Creates a transaction, passes stores to fn, returns fn's promise.
 * Transaction auto-commits when no more pending requests.
 *
 * @param {string|string[]} storeNames
 * @param {'readonly'|'readwrite'} mode
 * @param {(stores) => Promise} fn
 */
export async function tx(storeNames, mode, fn) {
  const db = await openDB();
  const names = Array.isArray(storeNames) ? storeNames : [storeNames];
  const transaction = db.transaction(names, mode);
  const stores = {};
  names.forEach(n => { stores[n] = transaction.objectStore(n); });

  try {
    return await fn(stores);
  } catch (err) {
    transaction.abort();
    throw err;
  }
}

/** Wrap an IDBRequest in a Promise */
export function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror   = (e) => reject(e.target.error);
  });
}
