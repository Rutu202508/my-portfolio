export interface CertificateRecord {
  id: string;
  title: string;
  description?: string;
  imageKey?: string;
  imageFileName?: string;
  imageFileSize?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface CertificateWithUrl extends CertificateRecord {
  imageUrl?: string;
  category?: string;
  issuer?: string;
  issuingOrganization?: string;
  date?: string;
  completionDate?: string;
}

const METADATA_STORAGE_KEY = 'rutuja-portfolio-certificates-v1';
const IDB_NAME = 'rutuja_portfolio_certificates_db';
const IDB_VERSION = 1;
const IDB_STORE_NAME = 'certificate_images';

function readMetadata(): CertificateWithUrl[] {
  try {
    const raw = localStorage.getItem(METADATA_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const rawTitle =
          typeof item.title === 'string'
            ? item.title
            : typeof (item as { name?: unknown }).name === 'string'
              ? (item as { name: string }).name
              : '';
        if (!item.id || !rawTitle) return null;
        return {
          ...item,
          id: String(item.id),
          title: rawTitle,
        } as CertificateWithUrl;
      })
      .filter((item): item is CertificateWithUrl => item !== null);
  } catch {
    return [];
  }
}

function openImageDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is unavailable in this browser.'));
      return;
    }
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB.'));
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image blob as data URL.'));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error('FileReader error.'));
    reader.readAsDataURL(blob);
  });
}

async function getAllImageBlobs(keys: string[]): Promise<Record<string, Blob>> {
  if (keys.length === 0) return {};
  const db = await openImageDb();
  return new Promise((resolve) => {
    const result: Record<string, Blob> = {};
    try {
      const tx = db.transaction(IDB_STORE_NAME, 'readonly');
      const store = tx.objectStore(IDB_STORE_NAME);

      keys.forEach((key) => {
        const req = store.get(key);
        req.onsuccess = () => {
          if (req.result instanceof Blob) {
            result[key] = req.result;
          }
        };
      });

      tx.oncomplete = () => {
        db.close();
        resolve(result);
      };
      tx.onerror = () => {
        db.close();
        resolve(result);
      };
      tx.onabort = () => {
        db.close();
        resolve(result);
      };
    } catch {
      db.close();
      resolve(result);
    }
  });
}

export async function loadCertificatesWithImages(): Promise<CertificateWithUrl[]> {
  const records = readMetadata();
  if (records.length === 0) return [];

  const keysToFetch = records
    .filter((r) => !r.imageUrl && Boolean(r.imageKey))
    .map((r) => r.imageKey as string);

  let blobsByKey: Record<string, Blob> = {};
  try {
    blobsByKey = await getAllImageBlobs(keysToFetch);
  } catch {
    blobsByKey = {};
  }

  const hydrated = await Promise.all(
    records.map(async (record) => {
      if (record.imageUrl) {
        return { ...record };
      }
      if (!record.imageKey) {
        return { ...record };
      }
      const blob = blobsByKey[record.imageKey];
      if (!blob) {
        return { ...record };
      }
      try {
        const dataUrl = await blobToDataUrl(blob);
        return {
          ...record,
          imageUrl: dataUrl,
        };
      } catch {
        return {
          ...record,
          imageUrl: URL.createObjectURL(blob),
        };
      }
    })
  );

  return hydrated;
}
