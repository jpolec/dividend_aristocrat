import { createHash } from "node:crypto";
import { openAppDatabase } from "./db";

const db = openAppDatabase("analytics");
const HASH_SECRET = process.env.ADMIN_TOKEN || process.env.STRIPE_SECRET_KEY || "analytics-dev-secret";

db.exec(`
  CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER NOT NULL,
    visitor_id TEXT,
    session_id TEXT,
    type TEXT NOT NULL,
    path TEXT,
    referrer TEXT,
    target_tag TEXT,
    target_text TEXT,
    target_href TEXT,
    metadata_json TEXT,
    user_agent TEXT,
    ip_hash TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_analytics_ts ON analytics_events(timestamp);
  CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(type);
  CREATE INDEX IF NOT EXISTS idx_analytics_path ON analytics_events(path);
  CREATE INDEX IF NOT EXISTS idx_analytics_visitor ON analytics_events(visitor_id);
`);

export type AnalyticsEventInput = {
  visitorId?: string | null;
  sessionId?: string | null;
  type: string;
  path?: string | null;
  referrer?: string | null;
  targetTag?: string | null;
  targetText?: string | null;
  targetHref?: string | null;
  metadata?: Record<string, unknown> | null;
};

function clean(value: unknown, max = 240): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function cleanType(type: unknown) {
  const value = clean(type, 48) ?? "event";
  return /^[a-z0-9_.:-]+$/i.test(value) ? value : "event";
}

function requestIp(req?: Request) {
  if (!req) return null;
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || null;
}

function hashIp(ip: string | null) {
  if (!ip) return null;
  return createHash("sha256").update(`${HASH_SECRET}:${ip}`).digest("hex").slice(0, 24);
}

function safeMetadata(metadata: Record<string, unknown> | null | undefined) {
  if (!metadata) return null;
  try {
    return JSON.stringify(metadata).slice(0, 1800);
  } catch {
    return null;
  }
}

export function recordAnalyticsEvent(input: AnalyticsEventInput, req?: Request) {
  db.prepare(
    `INSERT INTO analytics_events
      (timestamp, visitor_id, session_id, type, path, referrer, target_tag, target_text, target_href, metadata_json, user_agent, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    Date.now(),
    clean(input.visitorId, 80),
    clean(input.sessionId, 80),
    cleanType(input.type),
    clean(input.path, 260),
    clean(input.referrer, 360),
    clean(input.targetTag, 32),
    clean(input.targetText, 180),
    clean(input.targetHref, 360),
    safeMetadata(input.metadata),
    clean(req?.headers.get("user-agent"), 500),
    hashIp(requestIp(req)),
  );
}

function scalar(sql: string, params: unknown[] = []) {
  return db.prepare<{ n: number }, unknown[]>(sql).get(...params)?.n ?? 0;
}

function rows<T>(sql: string, params: unknown[] = []) {
  return db.prepare<T, unknown[]>(sql).all(...params);
}

export function analyticsSummary() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const since24h = now - day;
  const since7d = now - 7 * day;
  const since30d = now - 30 * day;
  const visitorExpr = "COALESCE(visitor_id, ip_hash)";

  const totals = {
    events: scalar("SELECT COUNT(*) AS n FROM analytics_events"),
    pageViews: scalar("SELECT COUNT(*) AS n FROM analytics_events WHERE type = 'page_view'"),
    clicks: scalar("SELECT COUNT(*) AS n FROM analytics_events WHERE type = 'click'"),
    checkoutStarts: scalar("SELECT COUNT(*) AS n FROM analytics_events WHERE type = 'checkout_start'"),
    visitors: scalar(`SELECT COUNT(DISTINCT ${visitorExpr}) AS n FROM analytics_events WHERE ${visitorExpr} IS NOT NULL`),
    visitors24h: scalar(`SELECT COUNT(DISTINCT ${visitorExpr}) AS n FROM analytics_events WHERE timestamp >= ? AND ${visitorExpr} IS NOT NULL`, [since24h]),
    visitors7d: scalar(`SELECT COUNT(DISTINCT ${visitorExpr}) AS n FROM analytics_events WHERE timestamp >= ? AND ${visitorExpr} IS NOT NULL`, [since7d]),
    visitors30d: scalar(`SELECT COUNT(DISTINCT ${visitorExpr}) AS n FROM analytics_events WHERE timestamp >= ? AND ${visitorExpr} IS NOT NULL`, [since30d]),
    pageViews7d: scalar("SELECT COUNT(*) AS n FROM analytics_events WHERE type = 'page_view' AND timestamp >= ?", [since7d]),
    clicks7d: scalar("SELECT COUNT(*) AS n FROM analytics_events WHERE type = 'click' AND timestamp >= ?", [since7d]),
    checkoutStarts7d: scalar("SELECT COUNT(*) AS n FROM analytics_events WHERE type = 'checkout_start' AND timestamp >= ?", [since7d]),
  };

  const topPages = rows<{ path: string; views: number; visitors: number }>(
    `SELECT COALESCE(path, '/') AS path,
      COUNT(*) AS views,
      COUNT(DISTINCT ${visitorExpr}) AS visitors
     FROM analytics_events
     WHERE type = 'page_view' AND timestamp >= ?
     GROUP BY COALESCE(path, '/')
     ORDER BY views DESC
     LIMIT 12`,
    [since30d],
  );

  const topClicks = rows<{ target_text: string | null; target_href: string | null; clicks: number; visitors: number }>(
    `SELECT target_text, target_href,
      COUNT(*) AS clicks,
      COUNT(DISTINCT ${visitorExpr}) AS visitors
     FROM analytics_events
     WHERE type = 'click' AND timestamp >= ?
     GROUP BY COALESCE(target_href, ''), COALESCE(target_text, '')
     ORDER BY clicks DESC
     LIMIT 12`,
    [since30d],
  );

  const recentEvents = rows<{
    id: number;
    timestamp: number;
    type: string;
    path: string | null;
    target_text: string | null;
    target_href: string | null;
    referrer: string | null;
  }>(
    `SELECT id, timestamp, type, path, target_text, target_href, referrer
     FROM analytics_events
     ORDER BY timestamp DESC
     LIMIT 60`,
  );

  const daily = rows<{ day: string; page_views: number; clicks: number; visitors: number; checkout_starts: number }>(
    `SELECT
      strftime('%Y-%m-%d', timestamp / 1000, 'unixepoch') AS day,
      SUM(CASE WHEN type = 'page_view' THEN 1 ELSE 0 END) AS page_views,
      SUM(CASE WHEN type = 'click' THEN 1 ELSE 0 END) AS clicks,
      COUNT(DISTINCT ${visitorExpr}) AS visitors,
      SUM(CASE WHEN type = 'checkout_start' THEN 1 ELSE 0 END) AS checkout_starts
     FROM analytics_events
     WHERE timestamp >= ?
     GROUP BY day
     ORDER BY day DESC
     LIMIT 14`,
    [now - 14 * day],
  );

  return { totals, topPages, topClicks, recentEvents, daily };
}
