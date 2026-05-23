import { openAppDatabase } from "./db";

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24h

const db = openAppDatabase("cache");
db.exec(`
  CREATE TABLE IF NOT EXISTS qj_cache (
    key TEXT PRIMARY KEY,
    fetched_at INTEGER NOT NULL,
    payload TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_qj_cache_fetched_at ON qj_cache(fetched_at);
`);

const getStmt = db.prepare<{ fetched_at: number; payload: string }, [string]>(
  "SELECT fetched_at, payload FROM qj_cache WHERE key = ?",
);
const putStmt = db.prepare<unknown, [string, number, string]>(
  "INSERT INTO qj_cache (key, fetched_at, payload) VALUES (?, ?, ?) " +
    "ON CONFLICT(key) DO UPDATE SET fetched_at = excluded.fetched_at, payload = excluded.payload",
);
const clearStmt = db.prepare<unknown, []>("DELETE FROM qj_cache");
const statsStmt = db.prepare<{ n: number; oldest: number | null; newest: number | null }, []>(
  "SELECT COUNT(*) AS n, MIN(fetched_at) AS oldest, MAX(fetched_at) AS newest FROM qj_cache",
);

export function cacheGet<T>(key: string, ttlMs = DEFAULT_TTL_MS): T | null {
  const row = getStmt.get(key);
  if (!row) return null;
  if (Date.now() - row.fetched_at > ttlMs) return null;
  return JSON.parse(row.payload) as T;
}

export function cacheGetWithAge<T>(key: string, ttlMs = DEFAULT_TTL_MS): { value: T; ageMs: number } | null {
  const row = getStmt.get(key);
  if (!row) return null;
  const ageMs = Date.now() - row.fetched_at;
  if (ageMs > ttlMs) return null;
  return { value: JSON.parse(row.payload) as T, ageMs };
}

export function cachePut(key: string, value: unknown) {
  putStmt.run(key, Date.now(), JSON.stringify(value));
}

export function cacheClear() {
  clearStmt.run();
}

export function cacheStats() {
  const s = statsStmt.get();
  return {
    entries: s?.n ?? 0,
    oldest: s?.oldest ?? null,
    newest: s?.newest ?? null,
  };
}
