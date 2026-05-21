import { serve } from "bun";
import index from "./index.html";
import { cacheGet, cacheGetWithAge, cachePut, cacheClear, cacheStats } from "./cache";
import {
  subscribe,
  unsubscribe,
  listSubscribers,
  isValidEmail,
  normalizeLang,
  getJobLastRun,
} from "./subscribers";
import { runDigest, selectTopPicks, renderDigestHtml, shouldRunWeekly } from "./digest";

const QJ_BASE = "https://api.quantjourney.cloud";
const QJ_TOKEN = process.env.QJ_TOKEN;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN; // optional simple auth for admin/send endpoints

async function qjCall<T = unknown>(route: string, params: Record<string, unknown>): Promise<T> {
  const cacheKey = `${route}::${JSON.stringify(params)}`;
  const hit = cacheGet<T>(cacheKey);
  if (hit !== null) return hit;
  const res = await fetch(`${QJ_BASE}/d/${route}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${QJ_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`QJ ${route} -> HTTP ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as T;
  cachePut(cacheKey, json);
  return json;
}

type ScreenerRow = Record<string, unknown> & { symbol: string; isFund?: boolean; isEtf?: boolean };

async function fetchScreener(url: URL) {
  const limit = url.searchParams.get("limit") ?? "200";
  const minDividend = url.searchParams.get("min_dividend") ?? "0.01";
  const includeFunds = url.searchParams.get("include_funds") === "true";

  const body: Record<string, unknown> = {
    dividend_more_than: Number(minDividend),
    limit: Number(limit),
    is_actively_trading: true,
    is_etf: false,
    is_fund: false,
  };

  const cacheKey = `screener::${JSON.stringify(body)}`;
  const cached = cacheGetWithAge<{ rows: ScreenerRow[] }>(cacheKey);
  let rowsAll: ScreenerRow[];
  let ageMs: number;
  if (cached) {
    rowsAll = cached.value.rows;
    ageMs = cached.ageMs;
  } else {
    const json = (await qjCall("equity.reference.get_stock_screener", body)) as {
      data?: { value?: ScreenerRow[] };
    };
    rowsAll = json?.data?.value ?? [];
    cachePut(cacheKey, { rows: rowsAll });
    ageMs = 0;
  }

  const rows = includeFunds ? rowsAll : rowsAll.filter(r => r.isFund !== true && r.isEtf !== true);
  return Response.json({
    count: rows.length,
    total_from_screener: rowsAll.length,
    dropped_funds_etfs: rowsAll.length - rows.length,
    cache_age_ms: ageMs,
    rows,
  });
}

type CashFlowRow = { date: string; fiscalYear: string; commonDividendsPaid: number };
type PriceRow = { date: string; close: number };

function computeConsistency(history: CashFlowRow[]) {
  const last5 = history.slice(0, 5);
  const divs = last5.map(r => Math.abs(r.commonDividendsPaid || 0));
  const years = last5.length;
  const yearsPaid = divs.filter(v => v > 0).length;
  const chrono = divs.slice().reverse();
  let noCut = 0;
  let growth = 0;
  let transitions = 0;
  for (let i = 1; i < chrono.length; i++) {
    if (chrono[i - 1] === 0) continue;
    transitions++;
    if (chrono[i] >= chrono[i - 1]) noCut++;
    if (chrono[i] > chrono[i - 1]) growth++;
  }
  const paidScore = years > 0 ? yearsPaid / years : 0;
  const noCutScore = transitions > 0 ? noCut / transitions : 0;
  const growthScore = transitions > 0 ? growth / transitions : 0;
  const confidence = 100 * (0.5 * paidScore + 0.3 * noCutScore + 0.2 * growthScore);
  const totalPaid5y = divs.reduce((s, v) => s + v, 0);
  return { yearsCovered: years, yearsPaid, confidence, totalPaid5y };
}

function computePriceMetrics(prices: PriceRow[]) {
  if (prices.length === 0) return { ytd: null, oneYear: null, lastClose: null };
  const asc = prices.slice().sort((a, b) => a.date.localeCompare(b.date));
  const lastClose = asc[asc.length - 1].close;
  const lastDate = asc[asc.length - 1].date;
  const year = Number(lastDate.slice(0, 4));
  const firstOfYear = asc.find(p => p.date.slice(0, 4) === String(year));
  const ytd = firstOfYear ? ((lastClose - firstOfYear.close) / firstOfYear.close) * 100 : null;
  const oneYAgoTs = new Date(lastDate).getTime() - 365 * 24 * 3600 * 1000;
  const closeAtOrAfter = asc.find(p => new Date(p.date).getTime() >= oneYAgoTs);
  const oneYear = closeAtOrAfter ? ((lastClose - closeAtOrAfter.close) / closeAtOrAfter.close) * 100 : null;
  return { ytd, oneYear, lastClose };
}

async function enrichTicker(symbol: string) {
  const today = new Date();
  const start = new Date(today);
  start.setFullYear(today.getFullYear() - 1);
  start.setMonth(0, 1);

  const [cf, px] = await Promise.allSettled([
    qjCall<{ data?: { value?: CashFlowRow[] } }>("equity.fundamentals.get_cash_flow_statement", {
      symbol,
      period: "annual",
      limit: 5,
    }),
    qjCall<{ data?: { value?: Record<string, PriceRow[]> } }>("equity.pricing.get_historical_prices", {
      symbols: symbol,
      start_date: start.toISOString().slice(0, 10),
      end_date: today.toISOString().slice(0, 10),
      frequency: "1d",
    }),
  ]);

  const history = cf.status === "fulfilled" ? cf.value?.data?.value ?? [] : [];
  const prices = px.status === "fulfilled" ? px.value?.data?.value?.[symbol] ?? [] : [];

  return { symbol, ...computeConsistency(history), ...computePriceMetrics(prices) };
}

async function fetchEnriched(req: Request) {
  const { symbols } = (await req.json()) as { symbols: string[] };
  if (!Array.isArray(symbols) || symbols.length === 0) {
    return Response.json({ error: "symbols[] required" }, { status: 400 });
  }
  const CONCURRENCY = 12;
  const out: unknown[] = [];
  for (let i = 0; i < symbols.length; i += CONCURRENCY) {
    const batch = symbols.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(s => enrichTicker(s).catch(e => ({ symbol: s, error: String(e) }))));
    out.push(...results);
  }
  return Response.json({ enriched: out });
}

function requireAdmin(req: Request): Response | null {
  if (!ADMIN_TOKEN) return null; // no auth configured -> open
  const got = new URL(req.url).searchParams.get("token") ?? req.headers.get("x-admin-token");
  if (got !== ADMIN_TOKEN) return new Response("unauthorized", { status: 401 });
  return null;
}

const BASE_URL = process.env.PUBLIC_BASE_URL ?? "http://localhost:3000";

const server = serve({
  port: Number(process.env.PORT ?? 3000),

  routes: {
    "/*": index,

    "/api/dividends": async req => {
      if (!QJ_TOKEN) return Response.json({ error: "QJ_TOKEN env var is not set" }, { status: 500 });
      try {
        return await fetchScreener(new URL(req.url));
      } catch (e) {
        return Response.json({ error: String(e) }, { status: 502 });
      }
    },

    "/api/dividends/enriched": {
      async POST(req) {
        if (!QJ_TOKEN) return Response.json({ error: "QJ_TOKEN env var is not set" }, { status: 500 });
        try {
          return await fetchEnriched(req);
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 502 });
        }
      },
    },

    "/api/cache/stats": () => Response.json(cacheStats()),
    "/api/cache/clear": {
      async POST() {
        cacheClear();
        return Response.json({ ok: true });
      },
    },

    // Subscription
    "/api/subscribe": {
      async POST(req) {
        try {
          const { email, lang } = (await req.json()) as { email?: string; lang?: string };
          if (!email || !isValidEmail(email)) {
            return Response.json({ error: "invalid email" }, { status: 400 });
          }
          subscribe(email, normalizeLang(lang));
          return Response.json({ ok: true });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 400 });
        }
      },
    },

    "/api/unsubscribe": req => {
      const email = new URL(req.url).searchParams.get("email") ?? "";
      const lang = new URL(req.url).searchParams.get("lang") ?? "en";
      if (!email || !isValidEmail(email)) {
        return new Response("Invalid email", { status: 400 });
      }
      unsubscribe(email);
      const msg = {
        pl: "Zostałeś wypisany. Nie otrzymasz już cotygodniowych raportów.",
        en: "You have been unsubscribed. You will no longer receive weekly digests.",
        ar: "تم إلغاء اشتراكك. لن تتلقى التقارير الأسبوعية بعد الآن.",
      } as Record<string, string>;
      const dir = lang === "ar" ? "rtl" : "ltr";
      return new Response(
        `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><title>Unsubscribed</title></head>` +
          `<body style="font-family:system-ui;padding:48px;text-align:center;color:#0f172a;">` +
          `<h1>${msg[lang] ?? msg.en}</h1>` +
          `<p style="color:#64748b;">${email}</p></body></html>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    },

    // Admin
    "/api/admin/subscribers": req => {
      const auth = requireAdmin(req);
      if (auth) return auth;
      const subs = listSubscribers();
      return Response.json({
        count: subs.length,
        last_run_at: getJobLastRun("weekly_digest"),
        subscribers: subs,
      });
    },

    "/api/admin/preview": async req => {
      const auth = requireAdmin(req);
      if (auth) return auth;
      const lang = normalizeLang(new URL(req.url).searchParams.get("lang"));
      const picks = await selectTopPicks(BASE_URL);
      const { html } = renderDigestHtml(picks, lang, `${BASE_URL}/api/unsubscribe?email=preview&lang=${lang}`);
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    },

    "/api/admin/send": {
      async POST(req) {
        const auth = requireAdmin(req);
        if (auth) return auth;
        const url = new URL(req.url);
        const dryRun = url.searchParams.get("dry") === "true";
        const only = url.searchParams.get("only") ?? undefined;
        try {
          const result = await runDigest(BASE_URL, { dryRun, only });
          return Response.json(result);
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 500 });
        }
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && { hmr: true, console: true },
});

console.log(`🚀 Server running at ${server.url}`);

// In-process weekly scheduler: check on startup and every 6h
async function maybeRunWeekly() {
  if (!shouldRunWeekly()) return;
  console.log("[scheduler] weekly digest is due — running…");
  try {
    const result = await runDigest(BASE_URL);
    console.log(`[scheduler] sent=${result.sent} picks=${result.picks}`);
  } catch (e) {
    console.error(`[scheduler] error:`, e);
  }
}
setTimeout(maybeRunWeekly, 10_000); // 10s after startup
setInterval(maybeRunWeekly, 6 * 60 * 60 * 1000); // every 6h
