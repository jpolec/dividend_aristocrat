import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DEFAULT_DB_PATH = process.env.NODE_ENV === "production"
  ? "/tmp/dividend-aristocrat/cache.sqlite"
  : "./cache.sqlite";

function configuredDbPath(): string {
  const value = process.env.CACHE_DB?.trim();
  if (!value || value.startsWith("${{")) return DEFAULT_DB_PATH;
  return value;
}

const openDatabases = new Set<Database>();
let activeDbPath: string | null = null;

function ensureParentDir(dbPath: string) {
  if (dbPath === ":memory:") return;
  const dir = dirname(dbPath);
  if (!dir || dir === ".") return;
  mkdirSync(dir, { recursive: true });
}

export function openAppDatabase(label: string): Database {
  const configured = configuredDbPath();
  const candidates = configured === DEFAULT_DB_PATH ? [configured] : [configured, DEFAULT_DB_PATH];
  let lastError: unknown;

  for (const dbPath of candidates) {
    try {
      ensureParentDir(dbPath);
      const db = new Database(dbPath);
      db.exec("PRAGMA journal_mode = WAL;");
      openDatabases.add(db);
      activeDbPath = dbPath;
      return db;
    } catch (error) {
      lastError = error;
      console.error(`[db] failed to open ${label} database at ${dbPath}:`, error);
    }
  }

  throw lastError;
}

export function getActiveDatabasePath() {
  return activeDbPath ?? configuredDbPath();
}

export function checkpointDatabases() {
  for (const db of openDatabases) {
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE);");
    } catch (error) {
      console.error("[db] WAL checkpoint failed:", error);
    }
  }
}
