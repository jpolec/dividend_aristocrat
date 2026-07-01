type StripeManifest = {
  app_id: string;
  product: {
    name: string;
    description?: string;
    metadata?: Record<string, string>;
  };
  prices: Array<{
    id: string;
    nickname?: string;
    currency: string;
    unit_amount: number;
    interval: "day" | "week" | "month" | "year";
    interval_count?: number;
    trial_period_days?: number;
    metadata?: Record<string, string>;
  }>;
};

const manifestPath = new URL("../stripe.products.json", import.meta.url);
const manifest = (await Bun.file(manifestPath).json()) as StripeManifest;
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripeBaseUrl = "https://api.stripe.com/v1";

function encodeForm(value: Record<string, string | number | boolean | undefined>): URLSearchParams {
  const form = new URLSearchParams();
  for (const [key, raw] of Object.entries(value)) {
    if (raw === undefined) continue;
    form.set(key, String(raw));
  }
  return form;
}

async function stripeRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${stripeBaseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      ...(init.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...init.headers,
    },
  });

  const payload = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Stripe request failed: ${response.status}`);
  }
  return payload;
}

async function listAll<T>(path: string): Promise<T[]> {
  const output: T[] = [];
  let startingAfter: string | undefined;

  while (true) {
    const separator = path.includes("?") ? "&" : "?";
    const page = await stripeRequest<{ data: Array<T & { id: string }>; has_more: boolean }>(
      `${path}${separator}limit=100${startingAfter ? `&starting_after=${startingAfter}` : ""}`,
    );
    output.push(...page.data);
    if (!page.has_more || page.data.length === 0) return output;
    startingAfter = page.data[page.data.length - 1].id;
  }
}

type StripeProduct = {
  id: string;
  name: string;
  metadata?: Record<string, string>;
};

type StripePrice = {
  id: string;
  lookup_key?: string | null;
  currency: string;
  unit_amount: number | null;
  recurring?: {
    interval: string;
    interval_count: number;
    trial_period_days?: number | null;
  } | null;
  metadata?: Record<string, string>;
};

function lookupKey(planId: string): string {
  const normalizedApp = manifest.app_id.replace(/[^a-zA-Z0-9_]/g, "_");
  const normalizedPlan = planId.replace(/[^a-zA-Z0-9_]/g, "_");
  return `qj_${normalizedApp}_${normalizedPlan}`.toLowerCase();
}

async function ensureProduct(): Promise<StripeProduct> {
  const products = await listAll<StripeProduct>("/products");
  const existing = products.find((product) => product.metadata?.qj_app_id === manifest.app_id);
  if (existing) return existing;

  const form = encodeForm({
    name: manifest.product.name,
    description: manifest.product.description,
    "metadata[qj_app_id]": manifest.app_id,
    ...(manifest.product.metadata
      ? Object.fromEntries(Object.entries(manifest.product.metadata).map(([key, value]) => [`metadata[${key}]`, value]))
      : {}),
  });

  return stripeRequest<StripeProduct>("/products", { method: "POST", body: form });
}

function samePrice(price: StripePrice, expected: StripeManifest["prices"][number]): boolean {
  return (
    price.currency.toLowerCase() === expected.currency.toLowerCase() &&
    price.unit_amount === expected.unit_amount &&
    price.recurring?.interval === expected.interval &&
    price.recurring?.interval_count === (expected.interval_count ?? 1) &&
    (price.recurring?.trial_period_days ?? undefined) === expected.trial_period_days
  );
}

async function ensurePrice(product: StripeProduct, priceConfig: StripeManifest["prices"][number]): Promise<StripePrice> {
  const key = lookupKey(priceConfig.id);
  const prices = await listAll<StripePrice>(`/prices?product=${product.id}&active=true`);
  const existing = prices.find((price) => price.lookup_key === key || price.metadata?.qj_price_id === priceConfig.id);
  if (existing && samePrice(existing, priceConfig)) return existing;

  const metadata = {
    qj_app_id: manifest.app_id,
    qj_price_id: priceConfig.id,
    ...(priceConfig.metadata ?? {}),
  };

  const form = encodeForm({
    product: product.id,
    currency: priceConfig.currency.toLowerCase(),
    unit_amount: priceConfig.unit_amount,
    nickname: priceConfig.nickname,
    lookup_key: key,
    transfer_lookup_key: true,
    "recurring[interval]": priceConfig.interval,
    "recurring[interval_count]": priceConfig.interval_count ?? 1,
    "recurring[trial_period_days]": priceConfig.trial_period_days,
    ...Object.fromEntries(Object.entries(metadata).map(([metaKey, value]) => [`metadata[${metaKey}]`, value])),
  });

  return stripeRequest<StripePrice>("/prices", { method: "POST", body: form });
}

const product = await ensureProduct();
const prices = await Promise.all(manifest.prices.map((price) => ensurePrice(product, price)));

const envLines = [
  `STRIPE_PRODUCT_ID=${product.id}`,
  ...prices.map((price, index) => `STRIPE_PRICE_${manifest.prices[index].id.toUpperCase()}=${price.id}`),
];

console.log(JSON.stringify({ product, prices, env: envLines }, null, 2));
console.log("\n# Railway env");
console.log(envLines.join("\n"));
