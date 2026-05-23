import { openAppDatabase } from "./db";

const db = openAppDatabase("subscribers");

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

// Additive migrations for paid-subscription support (safe to run multiple times)
for (const stmt of [
  "ALTER TABLE subscribers ADD COLUMN paid_status TEXT DEFAULT 'pending'", // pending | active | canceled
  "ALTER TABLE subscribers ADD COLUMN stripe_customer_id TEXT",
  "ALTER TABLE subscribers ADD COLUMN stripe_subscription_id TEXT",
  "ALTER TABLE subscribers ADD COLUMN paid_at INTEGER",
  "ALTER TABLE subscribers ADD COLUMN currency TEXT",
]) {
  try {
    db.exec(stmt);
  } catch {
    // column already exists
  }
}

export type Lang = "pl" | "en" | "ar";
const ALLOWED_LANGS: Lang[] = ["pl", "en", "ar"];

const insertStmt = db.prepare<unknown, [string, string, number]>(
  "INSERT INTO subscribers (email, lang, created_at) VALUES (?, ?, ?) " +
    "ON CONFLICT(email) DO UPDATE SET lang = excluded.lang",
);
const listStmt = db.prepare<
  {
    email: string;
    lang: Lang;
    created_at: number;
    last_sent_at: number | null;
    paid_status: string | null;
    paid_at: number | null;
    currency: string | null;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
  },
  []
>(
  "SELECT email, lang, created_at, last_sent_at, paid_status, paid_at, currency, stripe_customer_id, stripe_subscription_id FROM subscribers ORDER BY created_at DESC",
);
const listActivePaidStmt = db.prepare<{ email: string; lang: Lang }, []>(
  "SELECT email, lang FROM subscribers WHERE paid_status = 'active'",
);
const markPaidStmt = db.prepare<
  unknown,
  [string, string, string, string, number, string]
>(
  "UPDATE subscribers SET paid_status = 'active', stripe_customer_id = ?, stripe_subscription_id = ?, currency = ?, paid_at = ? WHERE email = ?",
);
const markCanceledByCustomerStmt = db.prepare<unknown, [string]>(
  "UPDATE subscribers SET paid_status = 'canceled' WHERE stripe_customer_id = ?",
);
const markCanceledBySubscriptionStmt = db.prepare<unknown, [string]>(
  "UPDATE subscribers SET paid_status = 'canceled' WHERE stripe_subscription_id = ?",
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

export function listPaidSubscribers() {
  return listActivePaidStmt.all();
}

export function markPaid(args: {
  email: string;
  customerId: string;
  subscriptionId: string;
  currency: string;
}) {
  markPaidStmt.run(args.customerId, args.subscriptionId, args.currency, Date.now(), args.email.toLowerCase().trim());
}

export function markCanceledByCustomer(customerId: string) {
  markCanceledByCustomerStmt.run(customerId);
}

export function markCanceledBySubscription(subscriptionId: string) {
  markCanceledBySubscriptionStmt.run(subscriptionId);
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
