import { createHmac, randomBytes } from "node:crypto";
import { openAppDatabase } from "./db";

const db = openAppDatabase("partners");

db.exec(`
  CREATE TABLE IF NOT EXISTS partners (
    code TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    social_handle TEXT,
    country TEXT,
    estimated_reach TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    commission_pct INTEGER NOT NULL DEFAULT 100,
    payment_method TEXT,
    payment_details TEXT,
    signed_nda_at INTEGER,
    signed_agreement_at INTEGER,
    signed_ip TEXT,
    signed_signature TEXT,
    created_at INTEGER NOT NULL,
    approved_at INTEGER
  );
`);

// Additive migrations — separate signature + IP per document, login tracking
for (const stmt of [
  "ALTER TABLE partners ADD COLUMN signed_nda_signature TEXT",
  "ALTER TABLE partners ADD COLUMN signed_nda_ip TEXT",
  "ALTER TABLE partners ADD COLUMN signed_agreement_signature TEXT",
  "ALTER TABLE partners ADD COLUMN signed_agreement_ip TEXT",
  "ALTER TABLE partners ADD COLUMN last_login_at INTEGER",
  "ALTER TABLE partners ADD COLUMN login_count INTEGER DEFAULT 0",
]) {
  try { db.exec(stmt); } catch { /* column exists */ }
}

db.exec(`

  CREATE TABLE IF NOT EXISTS partner_clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    user_agent TEXT,
    referer TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_clicks_code ON partner_clicks(code);
  CREATE INDEX IF NOT EXISTS idx_clicks_ts ON partner_clicks(timestamp);

  CREATE TABLE IF NOT EXISTS partner_attributions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    attributed_at INTEGER NOT NULL,
    UNIQUE(code, customer_email)
  );

  CREATE TABLE IF NOT EXISTS partner_commissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | paid | reversed
    confirmed_at INTEGER,
    paid_at INTEGER,
    payout_id INTEGER,
    stripe_payment_intent_id TEXT,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_commissions_code ON partner_commissions(code);
  CREATE INDEX IF NOT EXISTS idx_commissions_status ON partner_commissions(status);

  CREATE TABLE IF NOT EXISTS partner_payouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL,
    method TEXT NOT NULL,
    method_details TEXT,
    status TEXT NOT NULL DEFAULT 'requested', -- requested | paid
    requested_at INTEGER NOT NULL,
    paid_at INTEGER,
    paid_reference TEXT
  );
`);

// ─── Helpers ────────────────────────────────────────────────────────────────

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function generateCode(name: string): string {
  const base = (name || "PARTNER")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 8) || "PARTNER";
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  return `${base}${suffix}`;
}

const SECRET = process.env.ADMIN_TOKEN || process.env.STRIPE_SECRET_KEY || "fallback-dev-secret-rotate-me";

export function signMagicToken(email: string, ttlMs = 24 * 60 * 60 * 1000): string {
  const expires = Date.now() + ttlMs;
  const payload = `${email.toLowerCase()}:${expires}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 32);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyMagicToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon < 0) return null;
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expected = createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 32);
    if (sig !== expected) return null;
    const [email, expiresStr] = payload.split(":");
    if (!email || !expiresStr) return null;
    if (Number(expiresStr) < Date.now()) return null;
    return email;
  } catch {
    return null;
  }
}

// Session cookie token (longer-lived, e.g. 30d)
export function signSessionCookie(email: string, ttlMs = 30 * 24 * 60 * 60 * 1000): string {
  return signMagicToken(email, ttlMs);
}
export const verifySessionCookie = verifyMagicToken;

// ─── Partner CRUD ───────────────────────────────────────────────────────────

export type Partner = {
  code: string;
  email: string;
  name: string;
  social_handle: string | null;
  country: string | null;
  estimated_reach: string | null;
  status: "pending" | "active" | "suspended" | "rejected";
  commission_pct: number;
  payment_method: string | null;
  payment_details: string | null;
  signed_nda_at: number | null;
  signed_nda_signature: string | null;
  signed_nda_ip: string | null;
  signed_agreement_at: number | null;
  signed_agreement_signature: string | null;
  signed_agreement_ip: string | null;
  // legacy (combined) — kept for backwards compat with older rows
  signed_ip: string | null;
  signed_signature: string | null;
  created_at: number;
  approved_at: number | null;
  last_login_at: number | null;
  login_count: number;
};

export function applyAsPartner(args: {
  email: string;
  name: string;
  social_handle?: string;
  country?: string;
  estimated_reach?: string;
}): Partner {
  if (!isEmail(args.email)) throw new Error("invalid email");
  if (!args.name || args.name.length < 2) throw new Error("name required");
  const email = args.email.toLowerCase().trim();
  const existing = db.prepare<Partner, [string]>("SELECT * FROM partners WHERE email = ?").get(email);
  if (existing) return existing;
  // Auto-approve for simplicity (you can flip status to pending if you want manual review)
  const code = generateCode(args.name);
  db.prepare(
    "INSERT INTO partners (code, email, name, social_handle, country, estimated_reach, status, created_at, approved_at) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)",
  ).run(
    code,
    email,
    args.name.trim(),
    args.social_handle ?? null,
    args.country ?? null,
    args.estimated_reach ?? null,
    Date.now(),
    Date.now(),
  );
  return getPartnerByEmail(email)!;
}

export function getPartnerByEmail(email: string): Partner | null {
  return db.prepare<Partner, [string]>("SELECT * FROM partners WHERE email = ?").get(email.toLowerCase().trim()) ?? null;
}
export function getPartnerByCode(code: string): Partner | null {
  return db.prepare<Partner, [string]>("SELECT * FROM partners WHERE code = ?").get(code) ?? null;
}
export function listPartners(): Partner[] {
  return db.prepare<Partner, []>("SELECT * FROM partners ORDER BY created_at DESC").all();
}

export function recordLogin(email: string) {
  db.prepare(
    "UPDATE partners SET last_login_at = ?, login_count = COALESCE(login_count, 0) + 1 WHERE email = ?",
  ).run(Date.now(), email.toLowerCase().trim());
}

// Per-partner click + conversion counts in one query
export type PartnerWithStats = Partner & {
  clicks_count: number;
  conversions_count: number;
  pending_cents: number;
  confirmed_cents: number;
  paid_cents: number;
};

export function listPartnersWithStats(): PartnerWithStats[] {
  return db.prepare<PartnerWithStats, []>(`
    SELECT p.*,
      COALESCE((SELECT COUNT(*) FROM partner_clicks WHERE code = p.code), 0) AS clicks_count,
      COALESCE((SELECT COUNT(*) FROM partner_attributions WHERE code = p.code), 0) AS conversions_count,
      COALESCE((SELECT SUM(amount_cents) FROM partner_commissions WHERE code = p.code AND status = 'pending'), 0) AS pending_cents,
      COALESCE((SELECT SUM(amount_cents) FROM partner_commissions WHERE code = p.code AND status = 'confirmed'), 0) AS confirmed_cents,
      COALESCE((SELECT SUM(amount_cents) FROM partner_commissions WHERE code = p.code AND status = 'paid'), 0) AS paid_cents
    FROM partners p
    ORDER BY p.created_at DESC
  `).all();
}

export function partnersOverview() {
  const total = db.prepare<{ n: number }, []>("SELECT COUNT(*) AS n FROM partners").get()?.n ?? 0;
  const active = db.prepare<{ n: number }, []>("SELECT COUNT(*) AS n FROM partners WHERE status = 'active'").get()?.n ?? 0;
  const signed = db.prepare<{ n: number }, []>(
    "SELECT COUNT(*) AS n FROM partners WHERE signed_nda_at IS NOT NULL AND signed_agreement_at IS NOT NULL",
  ).get()?.n ?? 0;
  const ever_logged_in = db.prepare<{ n: number }, []>(
    "SELECT COUNT(*) AS n FROM partners WHERE last_login_at IS NOT NULL",
  ).get()?.n ?? 0;
  const total_clicks = db.prepare<{ n: number }, []>("SELECT COUNT(*) AS n FROM partner_clicks").get()?.n ?? 0;
  const total_conversions = db.prepare<{ n: number }, []>("SELECT COUNT(*) AS n FROM partner_attributions").get()?.n ?? 0;
  const total_commissions_cents = db.prepare<{ n: number | null }, []>(
    "SELECT SUM(amount_cents) AS n FROM partner_commissions WHERE status IN ('confirmed','paid')",
  ).get()?.n ?? 0;
  return { total, active, signed, ever_logged_in, total_clicks, total_conversions, total_commissions_cents: total_commissions_cents ?? 0 };
}

export function signDocument(args: {
  email: string;
  which: "nda" | "agreement";
  signature: string;
  ip: string;
}) {
  const now = Date.now();
  const sig = args.signature.trim();
  const email = args.email.toLowerCase().trim();
  if (args.which === "nda") {
    db.prepare(
      "UPDATE partners SET signed_nda_at = ?, signed_nda_signature = ?, signed_nda_ip = ? WHERE email = ?",
    ).run(now, sig, args.ip, email);
  } else {
    db.prepare(
      "UPDATE partners SET signed_agreement_at = ?, signed_agreement_signature = ?, signed_agreement_ip = ? WHERE email = ?",
    ).run(now, sig, args.ip, email);
  }
}

export function updatePartnerPaymentDetails(email: string, method: string, details: string) {
  db.prepare("UPDATE partners SET payment_method = ?, payment_details = ? WHERE email = ?").run(
    method,
    details,
    email.toLowerCase().trim(),
  );
}

// ─── Click tracking ─────────────────────────────────────────────────────────

export function recordClick(code: string, userAgent: string | null, referer: string | null) {
  db.prepare("INSERT INTO partner_clicks (code, timestamp, user_agent, referer) VALUES (?, ?, ?, ?)").run(
    code,
    Date.now(),
    userAgent,
    referer,
  );
}

// ─── Attribution + commissions ──────────────────────────────────────────────

export function recordAttribution(args: {
  code: string;
  customerEmail: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}) {
  db.prepare(
    "INSERT OR IGNORE INTO partner_attributions (code, customer_email, stripe_customer_id, stripe_subscription_id, attributed_at) VALUES (?, ?, ?, ?, ?)",
  ).run(args.code, args.customerEmail.toLowerCase().trim(), args.stripeCustomerId ?? null, args.stripeSubscriptionId ?? null, Date.now());
}

export function createPendingCommission(args: {
  code: string;
  customerEmail: string;
  amountCents: number;
  currency: string;
  stripePaymentIntentId?: string;
}) {
  db.prepare(
    "INSERT INTO partner_commissions (code, customer_email, amount_cents, currency, status, created_at, stripe_payment_intent_id) VALUES (?, ?, ?, ?, 'pending', ?, ?)",
  ).run(
    args.code,
    args.customerEmail.toLowerCase().trim(),
    args.amountCents,
    args.currency.toLowerCase(),
    Date.now(),
    args.stripePaymentIntentId ?? null,
  );
}

export function confirmCommission(stripePaymentIntentId: string) {
  db.prepare(
    "UPDATE partner_commissions SET status = 'confirmed', confirmed_at = ? WHERE stripe_payment_intent_id = ? AND status = 'pending'",
  ).run(Date.now(), stripePaymentIntentId);
}

export function reverseCommission(stripePaymentIntentId: string) {
  db.prepare(
    "UPDATE partner_commissions SET status = 'reversed' WHERE stripe_payment_intent_id = ? AND status IN ('pending','confirmed')",
  ).run(stripePaymentIntentId);
}

// Auto-confirm any pending commissions older than the refund window
export function autoConfirmPending(refundWindowMs = 7 * 24 * 60 * 60 * 1000) {
  db.prepare(
    "UPDATE partner_commissions SET status = 'confirmed', confirmed_at = ? WHERE status = 'pending' AND created_at < ?",
  ).run(Date.now(), Date.now() - refundWindowMs);
}

// ─── Stats + payouts ────────────────────────────────────────────────────────

export function partnerStats(code: string) {
  const clicks = db.prepare<{ n: number }, [string]>(
    "SELECT COUNT(*) AS n FROM partner_clicks WHERE code = ?",
  ).get(code)?.n ?? 0;

  const conversions = db.prepare<{ n: number }, [string]>(
    "SELECT COUNT(*) AS n FROM partner_attributions WHERE code = ?",
  ).get(code)?.n ?? 0;

  const rows = db.prepare<
    { status: string; total: number; currency: string },
    [string]
  >("SELECT status, currency, SUM(amount_cents) AS total FROM partner_commissions WHERE code = ? GROUP BY status, currency").all(code);

  const balance: Record<string, { pending: number; confirmed: number; paid: number; reversed: number }> = {};
  for (const r of rows) {
    if (!balance[r.currency]) balance[r.currency] = { pending: 0, confirmed: 0, paid: 0, reversed: 0 };
    balance[r.currency][r.status as keyof (typeof balance)[string]] = r.total;
  }

  const commissions = db.prepare<
    { id: number; customer_email: string; amount_cents: number; currency: string; status: string; created_at: number; confirmed_at: number | null; paid_at: number | null },
    [string]
  >("SELECT id, customer_email, amount_cents, currency, status, created_at, confirmed_at, paid_at FROM partner_commissions WHERE code = ? ORDER BY created_at DESC LIMIT 50").all(code);

  return { clicks, conversions, balance, commissions };
}

export function requestPayout(args: {
  code: string;
  amountCents: number;
  currency: string;
  method: string;
  methodDetails: string;
}): number {
  // Check confirmed-and-unpaid balance for this currency
  const available = db.prepare<{ total: number | null }, [string, string]>(
    "SELECT SUM(amount_cents) AS total FROM partner_commissions WHERE code = ? AND currency = ? AND status = 'confirmed'",
  ).get(args.code, args.currency.toLowerCase())?.total ?? 0;
  if ((available ?? 0) < args.amountCents) {
    throw new Error(`Insufficient confirmed balance. Available: ${(available ?? 0) / 100} ${args.currency.toUpperCase()}`);
  }
  const info = db.prepare(
    "INSERT INTO partner_payouts (code, amount_cents, currency, method, method_details, status, requested_at) VALUES (?, ?, ?, ?, ?, 'requested', ?)",
  ).run(args.code, args.amountCents, args.currency.toLowerCase(), args.method, args.methodDetails, Date.now());
  return Number(info.lastInsertRowid);
}

export function listPayouts(code?: string) {
  if (code) {
    return db.prepare(
      "SELECT * FROM partner_payouts WHERE code = ? ORDER BY requested_at DESC",
    ).all(code);
  }
  return db.prepare("SELECT * FROM partner_payouts ORDER BY requested_at DESC").all();
}

export function markPayoutPaid(payoutId: number, reference: string) {
  // Get payout details
  const payout = db.prepare<
    { code: string; amount_cents: number; currency: string },
    [number]
  >("SELECT code, amount_cents, currency FROM partner_payouts WHERE id = ?").get(payoutId);
  if (!payout) throw new Error("payout not found");

  db.prepare("UPDATE partner_payouts SET status = 'paid', paid_at = ?, paid_reference = ? WHERE id = ?")
    .run(Date.now(), reference, payoutId);

  // Mark up to amount_cents of confirmed commissions as paid (FIFO)
  let remaining = payout.amount_cents;
  const candidates = db.prepare<
    { id: number; amount_cents: number },
    [string, string]
  >("SELECT id, amount_cents FROM partner_commissions WHERE code = ? AND currency = ? AND status = 'confirmed' ORDER BY confirmed_at ASC").all(payout.code, payout.currency);
  for (const c of candidates) {
    if (remaining <= 0) break;
    db.prepare("UPDATE partner_commissions SET status = 'paid', paid_at = ?, payout_id = ? WHERE id = ?")
      .run(Date.now(), payoutId, c.id);
    remaining -= c.amount_cents;
  }
}
