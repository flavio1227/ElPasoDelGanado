import { CoffeeBrew, AppSettings, Language } from '../types';

const DB_NAME = 'CoffeeCompanionDB';
const DB_VERSION = 1;

const STORES = {
  BREWS: 'brews',
  SETTINGS: 'settings',
};

let dbInstance: IDBDatabase | null = null;

export async function initDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORES.BREWS)) {
        const brewStore = db.createObjectStore(STORES.BREWS, { keyPath: 'id' });
        brewStore.createIndex('date', 'date', { unique: false });
        brewStore.createIndex('method', 'method', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
      }
    };
  });
}

export async function saveBrew(brew: CoffeeBrew): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BREWS], 'readwrite');
    const store = transaction.objectStore(STORES.BREWS);
    const request = store.put(brew);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAllBrews(): Promise<CoffeeBrew[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BREWS], 'readonly');
    const store = transaction.objectStore(STORES.BREWS);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getBrewsByDateRange(startDate: string, endDate: string): Promise<CoffeeBrew[]> {
  const allBrews = await getAllBrews();
  return allBrews.filter(brew => brew.date >= startDate && brew.date <= endDate);
}

export async function deleteBrew(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BREWS], 'readwrite');
    const store = transaction.objectStore(STORES.BREWS);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SETTINGS], 'readwrite');
    const store = transaction.objectStore(STORES.SETTINGS);
    const request = store.put({ key: 'app', ...settings });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getSettings(): Promise<AppSettings | null> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SETTINGS], 'readonly');
    const store = transaction.objectStore(STORES.SETTINGS);
    const request = store.get('app');

    request.onsuccess = () => {
      const result = request.result;
      if (result) {
        const { key, ...settings } = result;
        resolve(settings as AppSettings);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllData(): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BREWS, STORES.SETTINGS], 'readwrite');

    const brewStore = transaction.objectStore(STORES.BREWS);
    const settingsStore = transaction.objectStore(STORES.SETTINGS);

    const clearBrews = brewStore.clear();
    const clearSettings = settingsStore.clear();

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function exportData(): Promise<string> {
  const brews = await getAllBrews();
  const settings = await getSettings();

  return JSON.stringify({ brews, settings }, null, 2);
}

export async function importData(jsonData: string): Promise<void> {
  const data = JSON.parse(jsonData);

  if (data.settings) {
    await saveSettings(data.settings);
  }

  if (data.brews && Array.isArray(data.brews)) {
    for (const brew of data.brews) {
      await saveBrew(brew);
    }
  }
}
