import { Database } from "bun:sqlite";

const DB_PATH = process.env.CACHE_DB ?? "./cache.sqlite";
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT PRIMARY KEY,
    lang TEXT NOT NULL DEFAULT 'en',
    created_at INTEGER NOT NULL,
    last_sent_at INTEGER
  );
  CREATE TABLE IF NOT EXISTS scheduler_state (
    job TEXT PRIMARY KEY,
    last_run_at INTEGER NOT NULL
  );
`);

export type Lang = "pl" | "en" | "ar";
const ALLOWED_LANGS: Lang[] = ["pl", "en", "ar"];

const insertStmt = db.prepare<unknown, [string, string, number]>(
  "INSERT INTO subscribers (email, lang, created_at) VALUES (?, ?, ?) " +
    "ON CONFLICT(email) DO UPDATE SET lang = excluded.lang",
);
const listStmt = db.prepare<{ email: string; lang: Lang; created_at: number; last_sent_at: number | null }, []>(
  "SELECT email, lang, created_at, last_sent_at FROM subscribers ORDER BY created_at DESC",
);
const deleteStmt = db.prepare<unknown, [string]>("DELETE FROM subscribers WHERE email = ?");
const markSentStmt = db.prepare<unknown, [number, string]>(
  "UPDATE subscribers SET last_sent_at = ? WHERE email = ?",
);

const getStateStmt = db.prepare<{ last_run_at: number }, [string]>(
  "SELECT last_run_at FROM scheduler_state WHERE job = ?",
);
const setStateStmt = db.prepare<unknown, [string, number]>(
  "INSERT INTO scheduler_state (job, last_run_at) VALUES (?, ?) " +
    "ON CONFLICT(job) DO UPDATE SET last_run_at = excluded.last_run_at",
);

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export function normalizeLang(s: unknown): Lang {
  return ALLOWED_LANGS.includes(s as Lang) ? (s as Lang) : "en";
}

export function subscribe(email: string, lang: Lang) {
  insertStmt.run(email.toLowerCase().trim(), lang, Date.now());
}

export function unsubscribe(email: string) {
  deleteStmt.run(email.toLowerCase().trim());
}

export function listSubscribers() {
  return listStmt.all();
}

export function markSent(email: string) {
  markSentStmt.run(Date.now(), email);
}

export function getJobLastRun(job: string): number | null {
  return getStateStmt.get(job)?.last_run_at ?? null;
}

export function setJobLastRun(job: string) {
  setStateStmt.run(job, Date.now());
}
