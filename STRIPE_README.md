# Stripe Setup

This app declares Stripe billing products in `stripe.products.json`.

## What the manifest owns

- Stripe Product name, description and QJ metadata.
- Recurring monthly and annual Prices.
- Stable `lookup_key` values generated from `app_id` and plan id.

Stripe Prices are effectively immutable. If the amount changes, the script creates a new Price and transfers the lookup key.

## Create or update Stripe products

Run in test mode first:

```bash
STRIPE_SECRET_KEY=sk_test_... bun run stripe:ensure-products
```

Then repeat in live mode when verified:

```bash
STRIPE_SECRET_KEY=sk_live_... bun run stripe:ensure-products
```

The command prints Railway-ready variables:

```text
STRIPE_PRODUCT_ID=prod_...
STRIPE_PRICE_MONTHLY_USD=price_...
STRIPE_PRICE_ANNUAL_USD=price_...
```

## Railway variables

Set these on the Railway service:

```text
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRODUCT_ID=prod_...
STRIPE_PRICE_MONTHLY_USD=price_...
STRIPE_PRICE_ANNUAL_USD=price_...
```

Do not commit Stripe secrets. Only `stripe.products.json` belongs in Git.
