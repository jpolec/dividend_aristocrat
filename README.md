# dividend_aristocrat

Web app that surfaces actively-traded dividend-paying companies, scores them by 5-year payment consistency, and emails the top 10 picks to subscribers once a week. Built with Bun + React + Tailwind + shadcn/ui.

## Data

Powered by [api.quantjourney.cloud](https://api.quantjourney.cloud):

- `equity.reference.get_stock_screener` — dividend payer base list
- `equity.fundamentals.get_cash_flow_statement` — 5y dividends-paid history
- `equity.pricing.get_historical_prices` — YTD / 1Y price changes

A simple **confidence score** is computed per ticker:

> `confidence = 50% · years_paid/5 + 30% · no_YoY_cut + 20% · YoY_growth`

## Features

- Sortable / filterable table with sector, search, min-dividend, fund toggle
- Enriched columns: YTD %, 1Y %, projected yield, years paid, confidence bar, total 5y dividends
- Persistent **SQLite cache** (`bun:sqlite`) with 24h TTL — survives restarts, avoids hammering the upstream
- Email **subscription** with language pick: Polish, English, Arabic (full RTL)
- Weekly digest renderer with localized HTML email body
- **Admin panel** at `/admin` — subscriber list, preview, dry-run, send
- One-click **unsubscribe** link (localized confirmation page)
- In-process scheduler that runs the weekly digest if more than 7 days have passed

## Run locally

```sh
bun install
cp .env.example .env   # then fill in QJ_TOKEN (required) and optionally RESEND_API_KEY
bun --hot src/index.ts
```

Open http://localhost:3000.

Admin panel: http://localhost:3000/admin (set `ADMIN_TOKEN` in `.env` to require auth).

## Env vars

| var               | required | notes                                                       |
| ----------------- | -------- | ----------------------------------------------------------- |
| `QJ_TOKEN`        | yes      | QuantJourney bearer token                                   |
| `RESEND_API_KEY`  | no       | If unset, emails are logged to stdout instead of sent       |
| `DIGEST_FROM`     | no       | From-address for digests                                    |
| `PUBLIC_BASE_URL` | no       | Used in unsubscribe links (default: `http://localhost:3000`) |
| `ADMIN_TOKEN`     | no       | Gate admin endpoints/panel                                  |
| `PORT`            | no       | Default `3000`                                              |
| `CACHE_DB`        | no       | Default `./cache.sqlite`                                    |

## Endpoints

- `GET  /api/dividends?limit=...&min_dividend=...&include_funds=true|false`
- `POST /api/dividends/enriched` — body `{ symbols: string[] }`
- `POST /api/subscribe` — body `{ email, lang }`
- `GET  /api/unsubscribe?email=...&lang=...`
- `GET  /api/admin/subscribers` — list (token-gated if `ADMIN_TOKEN` set)
- `GET  /api/admin/preview?lang=en|pl|ar` — render digest as HTML
- `POST /api/admin/send?dry=true&only=email@...` — trigger digest (optionally dry-run / single recipient)
- `GET  /api/cache/stats` · `POST /api/cache/clear`
