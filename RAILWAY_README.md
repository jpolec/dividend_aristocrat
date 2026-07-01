# Railway Setup

GitHub repo:

```text
https://github.com/jpolec/dividend_aristocrat
```

Railway can deploy this app from GitHub using the package scripts:

```bash
bun install && bun run build
```

and:

```bash
bun run start
```

## Current production URL

Known Railway URL:

```text
https://dividendaristocrat-production.up.railway.app
```

## Variables

```text
QJ_API_KEY=...
RESEND_API_KEY=...
DIGEST_FROM=...
PUBLIC_BASE_URL=https://dividendaristocrat-production.up.railway.app
ADMIN_TOKEN=...
CACHE_DB=/data/dividend-aristocrat.sqlite
```

Stripe variables, after running `bun run stripe:ensure-products`:

```text
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRODUCT_ID=prod_...
STRIPE_PRICE_MONTHLY_USD=price_...
STRIPE_PRICE_ANNUAL_USD=price_...
```

## Volume

Attach a Railway volume and mount it at:

```text
/data
```

This keeps local SQLite state across redeploys.
