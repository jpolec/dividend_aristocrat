import type { Lang } from "./subscribers";

const STRIPE_API = "https://api.stripe.com/v1";

export type Currency = "usd" | "pln" | "aed" | "sar" | "qar";
export type Tier = "monthly" | "annual";

// Map language → default currency. User can override in UI.
export function defaultCurrencyForLang(lang: Lang): Currency {
  if (lang === "pl") return "pln";
  if (lang === "ar") return "aed";
  return "usd";
}

// Price IDs come from Stripe Dashboard, set per (tier, currency)
// e.g. STRIPE_PRICE_MONTHLY_USD or STRIPE_PRICE_ANNUAL_AED
function priceIdFor(currency: Currency, tier: Tier = "monthly"): string | null {
  const key = `STRIPE_PRICE_${tier.toUpperCase()}_${currency.toUpperCase()}`;
  // Backwards-compatible fallback to the older monthly-only env var name
  const fallback = tier === "monthly" ? `STRIPE_PRICE_${currency.toUpperCase()}` : null;
  return envValue(key) ?? (fallback ? envValue(fallback) : null);
}

function envValue(key: string): string | null {
  const value = process.env[key]?.trim();
  return value ? value : null;
}

function form(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") sp.set(k, String(v));
  }
  return sp.toString();
}

async function stripeFetch<T>(path: string, secret: string, body?: string): Promise<T> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: body == null ? "GET" : "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) throw new Error(`Stripe ${path} ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export async function createCheckoutSession(args: {
  email: string;
  lang: Lang;
  currency: Currency;
  tier?: Tier;
  referralCode?: string | null;
  baseUrl: string;
}): Promise<{ url: string; sessionId: string }> {
  const stripeSecret = envValue("STRIPE_SECRET_KEY");
  if (!stripeSecret) throw new Error("STRIPE_SECRET_KEY not configured");
  const tier: Tier = args.tier ?? "monthly";
  const priceId = priceIdFor(args.currency, tier);
  if (!priceId) throw new Error(`No price ID configured for ${tier}/${args.currency} (set STRIPE_PRICE_${tier.toUpperCase()}_${args.currency.toUpperCase()})`);

  const body = form({
    mode: "subscription",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": 1,
    customer_email: args.email,
    success_url: `${args.baseUrl}/?paid=success`,
    cancel_url: `${args.baseUrl}/?paid=canceled`,
    "metadata[email]": args.email,
    "metadata[lang]": args.lang,
    "metadata[referral_code]": args.referralCode ?? undefined,
    "subscription_data[metadata][email]": args.email,
    "subscription_data[metadata][lang]": args.lang,
    "subscription_data[metadata][referral_code]": args.referralCode ?? undefined,
    client_reference_id: args.referralCode ?? undefined,
    allow_promotion_codes: "true",
  });

  const session = await stripeFetch<{ id: string; url: string }>("/checkout/sessions", stripeSecret, body);
  return { url: session.url, sessionId: session.id };
}

// Verify Stripe webhook signature using Web Crypto (no SDK).
// Stripe-Signature header format: t=<ts>,v1=<sig>
export async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  toleranceSeconds = 300,
): Promise<boolean> {
  if (!signatureHeader) return false;
  const parts = Object.fromEntries(
    signatureHeader.split(",").map(s => {
      const i = s.indexOf("=");
      return [s.slice(0, i), s.slice(i + 1)];
    }),
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSeconds) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${rawBody}`));
  const expected = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  // constant-time compare
  if (expected.length !== v1.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  return mismatch === 0;
}
