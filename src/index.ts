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
  markPaid,
  markCanceledByCustomer,
  markCanceledBySubscription,
} from "./subscribers";
import { runDigest, selectTopPicks, renderDigestHtml, shouldRunWeekly, sendEmail } from "./digest";
import { createCheckoutSession, verifyStripeSignature, defaultCurrencyForLang, type Currency } from "./stripe";
import {
  applyAsPartner,
  getPartnerByCode,
  getPartnerByEmail,
  listPartners,
  signDocument,
  recordLogin,
  listPartnersWithStats,
  partnersOverview,
  updatePartnerPaymentDetails,
  recordClick,
  recordAttribution,
  createPendingCommission,
  confirmCommission,
  reverseCommission,
  autoConfirmPending,
  partnerStats,
  requestPayout,
  listPayouts,
  markPayoutPaid,
  signMagicToken,
  verifyMagicToken,
  signSessionCookie,
  verifySessionCookie,
} from "./partners";

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

type CashFlowRow = { date: string; fiscalYear?: string; period?: string; reportedCurrency?: string; commonDividendsPaid: number };
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

// ─── Partner helpers ────────────────────────────────────────────────────────
const PARTNER_SESSION_COOKIE = "aristo_partner";
const REFERRAL_COOKIE = "aristo_ref";

function parseCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.split(/;\s*/).find(c => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function requirePartner(req: Request): { email: string } | Response {
  const cookie = parseCookie(req, PARTNER_SESSION_COOKIE);
  if (!cookie) return Response.json({ error: "unauthenticated" }, { status: 401 });
  const email = verifySessionCookie(cookie);
  if (!email) return Response.json({ error: "invalid session" }, { status: 401 });
  return { email };
}

function requireAdmin(req: Request): Response | null {
  if (!ADMIN_TOKEN) return null; // no auth configured -> open
  const got = new URL(req.url).searchParams.get("token") ?? req.headers.get("x-admin-token");
  if (got !== ADMIN_TOKEN) return new Response("unauthorized", { status: 401 });
  return null;
}

function envValue(key: string): string | null {
  const value = process.env[key]?.trim();
  return value ? value : null;
}

function publicBaseUrl(): string {
  const explicit = envValue("PUBLIC_BASE_URL");
  const railwayDomain = envValue("RAILWAY_PUBLIC_DOMAIN");
  if (explicit) {
    const normalized = withHttpsScheme(explicit).replace(/\/+$/, "");
    const railwayBase = railwayDomain ? withHttpsScheme(railwayDomain).replace(/\/+$/, "") : null;
    if (
      railwayBase &&
      normalized.endsWith(".up.railway.app") &&
      new URL(normalized).hostname !== new URL(railwayBase).hostname
    ) {
      console.warn(`[config] PUBLIC_BASE_URL (${normalized}) does not match RAILWAY_PUBLIC_DOMAIN; using ${railwayBase}`);
      return railwayBase;
    }
    return normalized;
  }

  if (railwayDomain) return withHttpsScheme(railwayDomain).replace(/\/+$/, "");

  return "http://localhost:3000";
}

function withHttpsScheme(urlOrDomain: string): string {
  return /^https?:\/\//i.test(urlOrDomain) ? urlOrDomain : `https://${urlOrDomain}`;
}

const BASE_URL = publicBaseUrl();

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

    // Single-ticker research aggregator
    "/api/research/:symbol": async req => {
      if (!QJ_TOKEN) return Response.json({ error: "QJ_TOKEN env var is not set" }, { status: 500 });
      const symbol = (new URL(req.url).pathname.split("/").pop() ?? "").toUpperCase();
      if (!/^[A-Z]{1,8}$/.test(symbol)) return Response.json({ error: "invalid symbol" }, { status: 400 });

      const today = new Date();
      const start = new Date(today);
      start.setFullYear(today.getFullYear() - 10);

      try {
        const [prices, cashFlow, quarterlyCashFlow, profile] = await Promise.allSettled([
          qjCall<{ data?: { value?: Record<string, PriceRow[]> } }>(
            "equity.pricing.get_historical_prices",
            { symbols: symbol, start_date: start.toISOString().slice(0, 10), end_date: today.toISOString().slice(0, 10), frequency: "1d" },
          ),
          qjCall<{ data?: { value?: CashFlowRow[] } }>(
            "equity.fundamentals.get_cash_flow_statement",
            { symbol, period: "annual", limit: 10 },
          ),
          qjCall<{ data?: { value?: CashFlowRow[] } }>(
            "equity.fundamentals.get_cash_flow_statement",
            { symbol, period: "quarter", limit: 40 },
          ),
          qjCall<{ data?: { value?: unknown } }>(
            "equity.fundamentals.get_company_profile",
            { symbol },
          ),
        ]);

        const priceSeries = prices.status === "fulfilled" ? prices.value?.data?.value?.[symbol] ?? [] : [];
        const cashFlowRows = cashFlow.status === "fulfilled" ? cashFlow.value?.data?.value ?? [] : [];
        const quarterlyCashFlowRows = quarterlyCashFlow.status === "fulfilled" ? quarterlyCashFlow.value?.data?.value ?? [] : [];
        const companyProfile = profile.status === "fulfilled" ? profile.value?.data?.value ?? null : null;

        // Downsample prices to ~weekly points for chart (reduce payload)
        const sorted = priceSeries.slice().sort((a, b) => a.date.localeCompare(b.date));
        const stride = Math.max(1, Math.floor(sorted.length / 300));
        const sampledPrices = sorted.filter((_, i) => i % stride === 0 || i === sorted.length - 1).map(p => ({ date: p.date, close: p.close }));

        const lastClose = sorted.length ? sorted[sorted.length - 1].close : null;
        const high52w = sorted.length ? Math.max(...sorted.slice(-260).map(p => p.close)) : null;
        const low52w = sorted.length ? Math.min(...sorted.slice(-260).map(p => p.close)) : null;
        const firstClose = sorted.length ? sorted[0].close : null;
        const tenYearReturnPct = lastClose != null && firstClose != null && firstClose > 0
          ? ((lastClose - firstClose) / firstClose) * 100 : null;

        // Annual dividends paid totals (absolute)
        const dividendHistory = cashFlowRows.slice(0, 10).map(r => ({
          year: r.fiscalYear ?? r.date.slice(0, 4),
          paid: Math.abs(r.commonDividendsPaid || 0),
          currency: r.reportedCurrency,
        }));
        const quarterlyDividendHistory = quarterlyCashFlowRows.slice(0, 40).map(r => ({
          date: r.date,
          period: `${r.fiscalYear ?? r.date.slice(0, 4)} ${r.period ?? ""}`.trim(),
          paid: Math.abs(r.commonDividendsPaid || 0),
          currency: r.reportedCurrency,
        }));

        return Response.json({
          symbol,
          prices: sampledPrices,
          metrics: { lastClose, high52w, low52w, tenYearReturnPct },
          dividendHistory,
          quarterlyDividendHistory,
          companyProfile,
        });
      } catch (e) {
        return Response.json({ error: String(e) }, { status: 502 });
      }
    },

    // ─── Partner program ────────────────────────────────────────────────
    "/r/:code": req => {
      const code = (new URL(req.url).pathname.split("/").pop() ?? "").toUpperCase();
      const partner = getPartnerByCode(code);
      if (!partner || partner.status !== "active") {
        return Response.redirect(BASE_URL + "/", 302);
      }
      recordClick(code, req.headers.get("user-agent"), req.headers.get("referer"));
      const maxAge = 90 * 24 * 60 * 60;
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie": `${REFERRAL_COOKIE}=${encodeURIComponent(code)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
        },
      });
    },

    "/api/partners/apply": {
      async POST(req) {
        try {
          const body = (await req.json()) as { email?: string; name?: string; social_handle?: string; country?: string; estimated_reach?: string };
          if (!body.email || !body.name) return Response.json({ error: "email + name required" }, { status: 400 });
          const partner = applyAsPartner({
            email: body.email,
            name: body.name,
            social_handle: body.social_handle,
            country: body.country,
            estimated_reach: body.estimated_reach,
          });
          const token = signMagicToken(partner.email);
          const loginUrl = `${BASE_URL}/partner/verify?token=${token}`;
          let emailSent = false;
          let emailError: string | null = null;
          try {
            await sendEmail(
              partner.email,
              `Welcome to Aristocrat Partner Program — your code is ${partner.code}`,
              `<p>Hi ${partner.name},</p><p>Welcome to the Aristocrat Partner Program. Your unique partner code is <strong>${partner.code}</strong>.</p><p>Click the link below to access your dashboard and sign your partner agreement:</p><p><a href="${loginUrl}">${loginUrl}</a></p><p>The link is valid for 24 hours.</p>`,
              `Welcome to Aristocrat Partner Program. Your code: ${partner.code}. Login link (valid 24h): ${loginUrl}`,
            );
            emailSent = true;
          } catch (e) {
            emailError = String(e);
            console.error("[partner-apply] email send failed:", emailError);
          }
          return Response.json({
            ok: true,
            code: partner.code,
            emailSent,
            emailError,
            // Always include the verify URL so the flow works even if email is broken
            verifyUrl: loginUrl,
            message: emailSent
              ? "Check your email for a login link"
              : "Application received. Email service is unavailable — use the link below to access your dashboard.",
          });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 400 });
        }
      },
    },

    "/api/partners/login": {
      async POST(req) {
        try {
          const { email } = (await req.json()) as { email?: string };
          if (!email || !isValidEmail(email)) return Response.json({ error: "invalid email" }, { status: 400 });
          const partner = getPartnerByEmail(email);
          if (!partner) return Response.json({ error: "not registered" }, { status: 404 });
          const token = signMagicToken(partner.email);
          const loginUrl = `${BASE_URL}/partner/verify?token=${token}`;
          let emailSent = false;
          let emailError: string | null = null;
          try {
            await sendEmail(
              partner.email,
              `Aristocrat — your login link`,
              `<p>Click the link to access your partner dashboard:</p><p><a href="${loginUrl}">${loginUrl}</a></p><p>Valid for 24 hours.</p>`,
              `Login link (valid 24h): ${loginUrl}`,
            );
            emailSent = true;
          } catch (e) {
            emailError = String(e);
            console.error("[partner-login] email send failed:", emailError);
          }
          return Response.json({
            ok: true,
            emailSent,
            emailError,
            verifyUrl: loginUrl,
            message: emailSent ? "Login link sent to your email" : "Email service is unavailable — use the link below to access your dashboard.",
          });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 400 });
        }
      },
    },

    "/api/partners/verify": req => {
      const token = new URL(req.url).searchParams.get("token") ?? "";
      const email = verifyMagicToken(token);
      if (!email) return Response.json({ error: "invalid or expired token" }, { status: 400 });
      const partner = getPartnerByEmail(email);
      if (!partner) return Response.json({ error: "not registered" }, { status: 404 });
      recordLogin(email);
      const session = signSessionCookie(email);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/partner/dashboard",
          "Set-Cookie": `${PARTNER_SESSION_COOKIE}=${session}; Path=/; HttpOnly; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax`,
        },
      });
    },

    "/api/partners/me": req => {
      const auth = requirePartner(req);
      if (auth instanceof Response) return auth;
      const partner = getPartnerByEmail(auth.email);
      if (!partner) return Response.json({ error: "not found" }, { status: 404 });
      autoConfirmPending(); // refresh confirmed status
      const stats = partnerStats(partner.code);
      const payouts = listPayouts(partner.code);
      return Response.json({ partner, stats, payouts });
    },

    "/api/partners/sign": {
      async POST(req) {
        const auth = requirePartner(req);
        if (auth instanceof Response) return auth;
        try {
          const { which, signature, accept } = (await req.json()) as { which?: string; signature?: string; accept?: boolean };
          if (which !== "nda" && which !== "agreement") return Response.json({ error: "which must be 'nda' or 'agreement'" }, { status: 400 });
          if (!accept) return Response.json({ error: "must accept the document" }, { status: 400 });
          if (!signature || signature.trim().length < 2) return Response.json({ error: "signature required" }, { status: 400 });
          const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
          signDocument({ email: auth.email, which, signature, ip });
          return Response.json({ ok: true });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 400 });
        }
      },
    },

    "/api/partners/payment-details": {
      async POST(req) {
        const auth = requirePartner(req);
        if (auth instanceof Response) return auth;
        const { method, details } = (await req.json()) as { method?: string; details?: string };
        if (!method || !details) return Response.json({ error: "method + details required" }, { status: 400 });
        updatePartnerPaymentDetails(auth.email, method, details);
        return Response.json({ ok: true });
      },
    },

    "/api/partners/payout": {
      async POST(req) {
        const auth = requirePartner(req);
        if (auth instanceof Response) return auth;
        try {
          const { amount, currency, method, methodDetails } = (await req.json()) as { amount?: number; currency?: string; method?: string; methodDetails?: string };
          if (!amount || amount <= 0 || !currency || !method || !methodDetails) {
            return Response.json({ error: "amount, currency, method, methodDetails required" }, { status: 400 });
          }
          const partner = getPartnerByEmail(auth.email)!;
          const payoutId = requestPayout({
            code: partner.code,
            amountCents: Math.round(amount * 100),
            currency,
            method,
            methodDetails,
          });
          return Response.json({ ok: true, payoutId });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 400 });
        }
      },
    },

    "/api/partners/logout": {
      POST() {
        return new Response(null, {
          status: 200,
          headers: { "Set-Cookie": `${PARTNER_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax` },
        });
      },
    },

    // Admin: partner management
    "/api/admin/partners": req => {
      const auth = requireAdmin(req);
      if (auth) return auth;
      autoConfirmPending();
      const partners = listPartnersWithStats();
      const payouts = listPayouts();
      const overview = partnersOverview();
      return Response.json({ partners, payouts, overview });
    },

    "/api/admin/partners/payout/mark-paid": {
      async POST(req) {
        const auth = requireAdmin(req);
        if (auth) return auth;
        const { payoutId, reference } = (await req.json()) as { payoutId?: number; reference?: string };
        if (!payoutId || !reference) return Response.json({ error: "payoutId + reference required" }, { status: 400 });
        markPayoutPaid(payoutId, reference);
        return Response.json({ ok: true });
      },
    },

    // Env var debug — admin-gated, only reports presence/length/prefix (no secrets exposed)
    "/api/admin/env-debug": req => {
      const auth = requireAdmin(req);
      if (auth) return auth;
      const checked = [
        "QJ_TOKEN",
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
        "STRIPE_PRICE_MONTHLY_AED",
        "STRIPE_PRICE_MONTHLY_SAR",
        "STRIPE_PRICE_MONTHLY_QAR",
        "STRIPE_PRICE_MONTHLY_USD",
        "STRIPE_PRICE_MONTHLY_PLN",
        "STRIPE_PRICE_ANNUAL_AED",
        "STRIPE_PRICE_ANNUAL_SAR",
        "STRIPE_PRICE_ANNUAL_QAR",
        "STRIPE_PRICE_ANNUAL_USD",
        "STRIPE_PRICE_ANNUAL_PLN",
        "STRIPE_PRICE_AED",
        "STRIPE_PRICE_SAR",
        "STRIPE_PRICE_QAR",
        "STRIPE_PRICE_USD",
        "STRIPE_PRICE_PLN",
        "RESEND_API_KEY",
        "MAILTRAP_API_TOKEN",
        "ADMIN_TOKEN",
        "PUBLIC_BASE_URL",
        "RAILWAY_PUBLIC_DOMAIN",
        "CACHE_DB",
        "NODE_ENV",
        "PORT",
        "DIGEST_FROM",
        "RAILWAY_DEPLOYMENT_ID",
        "RAILWAY_ENVIRONMENT_ID",
        "RAILWAY_ENVIRONMENT_NAME",
        "RAILWAY_PROJECT_ID",
        "RAILWAY_PROJECT_NAME",
        "RAILWAY_SERVICE_ID",
        "RAILWAY_SERVICE_NAME",
        "RAILWAY_GIT_COMMIT_SHA",
      ];
      const report: Record<string, {
        present: boolean;
        length: number;
        prefix: string;
        hasEdgeWhitespace?: boolean;
        looksTruncated?: boolean;
        looksLikeReferenceTemplate?: boolean;
      }> = {};
      for (const k of checked) {
        const raw = process.env[k];
        const v = raw?.trim();
        const length = v?.length ?? 0;
        let looksTruncated: boolean | undefined = undefined;
        const hasEdgeWhitespace = raw != null && raw !== v;
        const looksLikeReferenceTemplate = v?.startsWith("${{") === true && v.endsWith("}}");
        // Stripe live secret keys are typically ~107 chars
        if (k === "STRIPE_SECRET_KEY" && length > 0 && length < 80) looksTruncated = true;
        // Webhook secrets ~50-70 chars
        if (k === "STRIPE_WEBHOOK_SECRET" && length > 0 && length < 30) looksTruncated = true;
        // Price IDs ~30 chars
        if (k.startsWith("STRIPE_PRICE_") && length > 0 && length < 10) looksTruncated = true;
        report[k] = {
          present: v != null && v.length > 0,
          length,
          prefix: v ? v.slice(0, 12) + (v.length > 12 ? "…" : "") : "",
          ...(hasEdgeWhitespace ? { hasEdgeWhitespace } : {}),
          ...(looksTruncated ? { looksTruncated } : {}),
          ...(looksLikeReferenceTemplate ? { looksLikeReferenceTemplate } : {}),
        };
      }
      // Also report the runtime view of STRIPE secret via the stripe module to confirm same value
      const allKeys = Object.keys(process.env).filter(k => k.includes("STRIPE") || k.includes("QJ") || k.includes("RESEND"));
      const oddEnvKeys = Object.keys(process.env).filter(k => k.trim() !== k || k.length === 0);
      const currencies = ["aed", "sar", "qar", "usd", "pln"] as const;
      const tiers = ["monthly", "annual"] as const;
      const checkoutPrices = Object.fromEntries(currencies.map(currency => {
        const upper = currency.toUpperCase();
        const byTier = Object.fromEntries(tiers.map(tier => {
          const tierKey = `STRIPE_PRICE_${tier.toUpperCase()}_${upper}`;
          const legacyKey = tier === "monthly" ? `STRIPE_PRICE_${upper}` : null;
          const configuredKey = envValue(tierKey) ? tierKey : legacyKey && envValue(legacyKey) ? legacyKey : null;
          return [tier, { present: configuredKey != null, configuredKey }];
        }));
        return [currency, byTier];
      }));
      return Response.json({
        report,
        checkoutConfig: {
          stripeSecretPresent: envValue("STRIPE_SECRET_KEY") != null,
          effectiveBaseUrl: BASE_URL,
          prices: checkoutPrices,
        },
        allStripeOrQjOrResendKeysSeenByRuntime: allKeys,
        oddEnvKeys,
        railway: {
          deploymentId: envValue("RAILWAY_DEPLOYMENT_ID"),
          environmentName: envValue("RAILWAY_ENVIRONMENT_NAME"),
          projectName: envValue("RAILWAY_PROJECT_NAME"),
          serviceName: envValue("RAILWAY_SERVICE_NAME"),
          gitCommitSha: envValue("RAILWAY_GIT_COMMIT_SHA"),
        },
        cwd: process.cwd(),
        nodeEnv: process.env.NODE_ENV ?? null,
        timestamp: new Date().toISOString(),
      });
    },

    "/api/cache/stats": () => Response.json(cacheStats()),
    "/api/cache/clear": {
      async POST() {
        cacheClear();
        return Response.json({ ok: true });
      },
    },

    // Subscription (free / unpaid)
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

    // Stripe Checkout — paid subscription (monthly or annual)
    "/api/checkout": {
      async POST(req) {
        try {
          const { email, lang, currency, tier, referralCode } = (await req.json()) as {
            email?: string;
            lang?: string;
            currency?: Currency;
            tier?: "monthly" | "annual";
            referralCode?: string;
          };
          if (!email || !isValidEmail(email)) {
            return Response.json({ error: "invalid email" }, { status: 400 });
          }
          const lng = normalizeLang(lang);
          const cur = currency ?? defaultCurrencyForLang(lng);
          // Validate referral code if provided
          let validRef: string | null = null;
          if (referralCode) {
            const p = getPartnerByCode(referralCode.toUpperCase());
            if (p && p.status === "active") validRef = p.code;
          }
          // Pre-register as pending; webhook will flip to active
          subscribe(email, lng);
          const { url } = await createCheckoutSession({
            email, lang: lng, currency: cur, tier, referralCode: validRef, baseUrl: BASE_URL,
          });
          return Response.json({ url });
        } catch (e) {
          return Response.json({ error: String(e) }, { status: 500 });
        }
      },
    },

    // Stripe webhook — confirms payment, handles cancellations
    "/api/stripe/webhook": {
      async POST(req) {
        const secret = envValue("STRIPE_WEBHOOK_SECRET") ?? "";
        if (!secret) return new Response("webhook secret not configured", { status: 500 });
        const rawBody = await req.text();
        const sig = req.headers.get("stripe-signature");
        const valid = await verifyStripeSignature(rawBody, sig, secret);
        if (!valid) return new Response("invalid signature", { status: 400 });

        const event = JSON.parse(rawBody) as {
          type: string;
          data: { object: Record<string, unknown> };
        };

        try {
          if (event.type === "checkout.session.completed") {
            const obj = event.data.object as {
              customer: string;
              subscription: string;
              currency: string;
              amount_total?: number;
              payment_intent?: string;
              client_reference_id?: string;
              customer_details?: { email?: string };
              metadata?: { email?: string; referral_code?: string };
            };
            const email = obj.metadata?.email ?? obj.customer_details?.email;
            if (email) {
              markPaid({
                email,
                customerId: obj.customer,
                subscriptionId: obj.subscription,
                currency: obj.currency,
              });
              console.log(`[stripe] paid: ${email} (${obj.currency})`);

              // Partner attribution + commission
              const refCode = obj.metadata?.referral_code || obj.client_reference_id;
              if (refCode) {
                const partner = getPartnerByCode(refCode.toUpperCase());
                if (partner && partner.status === "active") {
                  recordAttribution({
                    code: partner.code,
                    customerEmail: email,
                    stripeCustomerId: obj.customer,
                    stripeSubscriptionId: obj.subscription,
                  });
                  if (obj.amount_total != null) {
                    const commissionCents = Math.round((obj.amount_total * partner.commission_pct) / 100);
                    createPendingCommission({
                      code: partner.code,
                      customerEmail: email,
                      amountCents: commissionCents,
                      currency: obj.currency,
                      stripePaymentIntentId: obj.payment_intent,
                    });
                    console.log(`[partner] ${partner.code} → commission ${commissionCents/100} ${obj.currency} pending`);
                  }
                }
              }
            }
          } else if (event.type === "charge.refunded") {
            const obj = event.data.object as { payment_intent: string };
            if (obj.payment_intent) reverseCommission(obj.payment_intent);
          } else if (event.type === "customer.subscription.deleted") {
            const obj = event.data.object as { id: string; customer: string };
            markCanceledBySubscription(obj.id);
            console.log(`[stripe] canceled: subscription ${obj.id}`);
          } else if (event.type === "customer.deleted") {
            const obj = event.data.object as { id: string };
            markCanceledByCustomer(obj.id);
          }
          return Response.json({ received: true });
        } catch (e) {
          console.error("[stripe] webhook error:", e);
          return Response.json({ error: String(e) }, { status: 500 });
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
