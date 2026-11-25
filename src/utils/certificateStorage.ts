import { CertificateRecord } from '../data/portfolio';

export interface CertificateWithUrl extends CertificateRecord {
  imageUrl?: string;
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
    return parsed.filter(
      (item): item is CertificateWithUrl =>
        Boolean(item && typeof item.id === 'string' && typeof item.title === 'string')
    );
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

async function getImageBlob(key: string): Promise<Blob | undefined> {
  const db = await openImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE_NAME, 'readonly');
    const store = tx.objectStore(IDB_STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => {
      const result = request.result as Blob | undefined;
      db.close();
      resolve(result);
    };
    request.onerror = () => {
      db.close();
      reject(request.error ?? new Error('Failed to load certificate image.'));
    };
  });
}

export async function loadCertificatesWithImages(): Promise<CertificateWithUrl[]> {
  const records = readMetadata();
  const hydrated = await Promise.all(
    records.map(async (record) => {
      if (record.imageUrl) {
        return { ...record };
      }
      if (!record.imageKey) {
        return { ...record };
      }
      try {
        const blob = await getImageBlob(record.imageKey);
        if (!blob) return { ...record };
        return {
          ...record,
          imageUrl: URL.createObjectURL(blob),
        };
      } catch {
        return { ...record };
      }
    })
  );
  return hydrated;
}
