import { useEffect, useMemo, useState } from "react";
import { TICKER_PROFILES } from "./SampleResearch";

type ResearchData = {
  symbol: string;
  prices: { date: string; close: number }[];
  metrics: { lastClose: number | null; high52w: number | null; low52w: number | null; tenYearReturnPct: number | null };
  dividendHistory: { year: string; paid: number; currency?: string }[];
  quarterlyDividendHistory: { date: string; period: string; paid: number; currency?: string }[];
  companyProfile: unknown;
  screenerRow: Record<string, unknown> | null;
};

const fmt = (n: number | null | undefined, d = 2) =>
  n == null || Number.isNaN(n) ? "—" : n.toLocaleString(undefined, { maximumFractionDigits: d });
const fmtCap = (n: number | null) => {
  if (n == null) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
};
const fmtMoney = (n: number, currency = "$") => {
  if (n >= 1e12) return `${currency}${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${currency}${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${currency}${(n / 1e6).toFixed(2)}M`;
  return `${currency}${Math.round(n).toLocaleString()}`;
};

function firstRecord(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) {
    const first = value[0];
    return first && typeof first === "object" ? first as Record<string, unknown> : null;
  }
  return value && typeof value === "object" ? value as Record<string, unknown> : null;
}

function textField(record: Record<string, unknown> | null | undefined, keys: string[]) {
  if (!record) return null;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function numericField(record: Record<string, unknown> | null | undefined, keys: string[]) {
  if (!record) return null;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
  }
  return null;
}

function profileLocation(record: Record<string, unknown> | null) {
  const explicit = textField(record, ["headquarters", "hq", "address"]);
  if (explicit) return explicit;
  const city = textField(record, ["city"]);
  const state = textField(record, ["state"]);
  const country = textField(record, ["country"]);
  const parts = [city, state, country].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export function StockResearch() {
  const symbol = (window.location.pathname.split("/").pop() ?? "").toUpperCase();
  const [data, setData] = useState<ResearchData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    fetch(`/api/research/${symbol}`)
      .then(r => r.json())
      .then(j => {
        if (j.error) setError(j.error);
        else setData(j);
      })
      .catch(e => setError(String(e)));
  }, [symbol]);

  const profile = TICKER_PROFILES[symbol];
  if (!profile) {
    return <Shell><div className="text-rose-700">Unknown ticker: {symbol}</div></Shell>;
  }

  const qjProfile = firstRecord(data?.companyProfile);
  const screenerRow = data?.screenerRow ?? null;
  const livePrice = data?.metrics.lastClose ?? null;
  const reportPrice = livePrice ?? numericField(screenerRow, ["price"]) ?? profile.illustrativePrice;
  const annualDiv = numericField(screenerRow, ["lastAnnualDividend", "lastDiv", "annualDividend"]) ?? profile.illustrativeDiv;
  const yieldPct = reportPrice > 0 ? (annualDiv / reportPrice) * 100 : 0;
  const companyName = textField(qjProfile, ["companyName", "name"]) ?? textField(screenerRow, ["companyName", "name"]) ?? profile.name;
  const sector = textField(qjProfile, ["sector", "industry"]) ?? textField(screenerRow, ["sector", "industry"]) ?? profile.sector;
  const description = textField(qjProfile, ["description", "companyDescription"]) ?? profile.description ?? "Company description not available.";
  const founded = textField(qjProfile, ["ipoDate", "founded", "foundedDate"]) ?? profile.founded;
  const hq = profileLocation(qjProfile) ?? profile.hq;
  const employeesNumber = numericField(qjProfile, ["fullTimeEmployees", "employees"]);
  const employees = employeesNumber != null ? employeesNumber.toLocaleString() : textField(qjProfile, ["employees"]) ?? profile.employees;
  const marketCap = numericField(screenerRow, ["marketCap"]) ?? numericField(qjProfile, ["mktCap", "marketCap"]);

  return (
    <Shell>
      {/* Header */}
      <header className="border-b border-[var(--aris-line-dark)] pb-6 mb-6">
        <a href="/#picks" className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)] mb-3 inline-block">← back to research</a>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono-mark text-[28px] sm:text-[34px] font-bold text-[var(--aris-emerald)]">{symbol}</span>
              <h1 className="font-serif-display text-[24px] sm:text-[32px] lg:text-[40px] text-[var(--aris-ink)]">{companyName}</h1>
            </div>
            <div className="mt-2 flex items-center gap-3 flex-wrap text-[13.5px] text-[var(--aris-muted)]">
              <span>{sector}</span>
              {profile.halalAware && (
                <span className="inline-flex items-center gap-1 text-[var(--aris-emerald)] font-semibold">
                  <span>◈</span> HALAL-AWARE PASS
                </span>
              )}
            </div>
          </div>
          <div className="text-end rounded-lg border border-[var(--aris-line)] bg-[var(--aris-offwhite)] p-3">
            <div className="font-mono-mark text-[10px] tracking-wider uppercase text-[var(--aris-muted)]">Price / yield</div>
            <div className="font-serif-display text-[36px] sm:text-[44px] text-[var(--aris-ink)] tabular-nums leading-none">
              ${fmt(reportPrice)}
            </div>
            <div className="mt-1 font-mono-mark text-[14px] font-semibold text-[var(--aris-emerald)] tabular-nums">
              Yield {fmt(yieldPct, 2)}%
            </div>
          </div>
        </div>
      </header>

      {error && <div className="mb-4 rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</div>}

      {/* Snapshot */}
      <section className="mb-8">
        <SectionTitle>Snapshot</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          <Stat label="Live price" value={livePrice != null ? `$${fmt(livePrice)}` : "—"} />
          <Stat label="Annual dividend" value={`$${fmt(annualDiv, 2)}`} />
          <Stat label="Payout ratio" value={`${profile.payoutPct}%`} />
          <Stat label="5Y div growth" value={`${profile.div5yGrowthPct >= 0 ? "+" : ""}${profile.div5yGrowthPct.toFixed(1)}%`} positive={profile.div5yGrowthPct >= 0} />
          <Stat label="52w range" value={data?.metrics.low52w && data?.metrics.high52w ? `$${fmt(data.metrics.low52w)} – $${fmt(data.metrics.high52w)}` : "—"} />
          <Stat label="Quality score" value={`${profile.quality}/100`} highlight />
        </div>
      </section>

      {/* 10Y price chart */}
      <section className="mb-8">
        <SectionTitle>10-Year Price History</SectionTitle>
        <div className="mt-3 rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] p-4 shadow-[0_24px_70px_-55px_rgba(12,18,14,.35)]">
          {data?.prices.length ? (
            <PriceChart prices={data.prices} />
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[var(--aris-muted)] text-sm">Loading prices…</div>
          )}
          {data?.metrics.tenYearReturnPct != null && (
            <div className="mt-3 text-[13px] text-[var(--aris-muted)]">
              10-year price return: <strong className={data.metrics.tenYearReturnPct >= 0 ? "text-emerald-700" : "text-rose-700"}>
                {data.metrics.tenYearReturnPct >= 0 ? "+" : ""}{data.metrics.tenYearReturnPct.toFixed(1)}%
              </strong>
              {" (price only, dividends not included)"}
            </div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <SectionTitle>Dividend Payments</SectionTitle>
        <p className="text-[13.5px] text-[var(--aris-muted)] mt-1 max-w-3xl">
          Cash-flow data shows how much the company paid out in dividends. The per-share row is an investor-friendly estimate from the annual dividend used in this report.
        </p>
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-4 mt-3">
          <AnnualDividendTable rows={data?.dividendHistory ?? []} />
          <QuarterlyDividendTable
            rows={data?.quarterlyDividendHistory ?? []}
            annualDividend={annualDiv}
          />
        </div>
      </section>

      {/* Investment simulation */}
      <section className="mb-8">
        <SectionTitle>Investment Simulation</SectionTitle>
        <p className="text-[14px] text-[var(--aris-muted)] mt-1 mb-4 max-w-3xl">
          What if you started with AED 100,000 and reinvested dividends every quarter at a {yieldPct.toFixed(2)}% annual yield?
          Below is an illustrative compounding simulation, not a forecast.
        </p>
        <InvestmentSimulator yieldPct={yieldPct} />
      </section>

      {/* About */}
      <section className="mb-8">
        <SectionTitle>About {companyName}</SectionTitle>
        <div className="mt-3 rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] p-5 sm:p-6">
          <p className="text-[15px] text-[var(--aris-ink)] leading-relaxed">{description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 text-[13px]">
            {founded && <Info label="Founded / IPO" value={founded} />}
            {hq && <Info label="Headquarters" value={hq} />}
            {employees && <Info label="Employees" value={employees} />}
            {marketCap != null && <Info label="Market cap" value={fmtCap(marketCap)} />}
            {profile.brands && <Info label="Brands" value={profile.brands} fullWidth />}
          </div>
        </div>
      </section>

      {/* Methodology check */}
      <section className="mb-8">
        <SectionTitle>Methodology Check</SectionTitle>
        <div className="mt-3 rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] p-5 sm:p-6">
          <MethodCheck label="Dividend history" status={profile.div5yGrowthPct >= 0 ? "pass" : "warn"} note={`5Y growth: ${profile.div5yGrowthPct >= 0 ? "+" : ""}${profile.div5yGrowthPct.toFixed(1)}%`} />
          <MethodCheck label="Payout ratio" status={profile.payoutPct > 100 ? "fail" : profile.payoutPct > 80 ? "warn" : "pass"} note={`${profile.payoutPct}% of earnings`} />
          <MethodCheck label="Balance sheet" status={profile.debtProfile === "Conservative" ? "pass" : profile.debtProfile === "Moderate" ? "warn" : "fail"} note={`${profile.debtProfile} leverage`} />
          <MethodCheck label="Halal-aware screen" status={profile.halalAware ? "pass" : "fail"} note={profile.halalAware ? "Passes sector exclusions" : (profile.excludeReason ?? "Excluded")} />
          <MethodCheck label="Composite quality" status={profile.quality >= 70 ? "pass" : profile.quality >= 50 ? "warn" : "fail"} note={`${profile.quality}/100`} />
        </div>
      </section>

      <p className="text-[12px] text-[var(--aris-muted)] italic mt-8 max-w-3xl">
        This page is illustrative research and educational analysis only. Not a recommendation to buy or sell any security.
        Dividend yields are not guaranteed and may change. All investments carry risk including loss of capital. Please consult a licensed advisor in your jurisdiction.
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, var(--aris-paper-2) 0%, #f5edd8 42%, var(--aris-paper) 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-7 py-8 sm:py-12">{children}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif-display text-[20px] sm:text-[24px] text-[var(--aris-ink)] tracking-tight">{children}</h2>;
}

function Stat({ label, value, positive, highlight }: { label: string; value: string; positive?: boolean; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${
      highlight ? "border-[var(--aris-gold)] bg-amber-50/70" : "border-[var(--aris-line)] bg-[var(--aris-offwhite)]"
    }`}>
      <div className="font-mono-mark text-[10px] tracking-wider uppercase text-[var(--aris-muted)]">{label}</div>
      <div className={`mt-1 font-serif-display text-[18px] sm:text-[20px] tabular-nums ${
        positive === false ? "text-rose-700" : positive === true ? "text-emerald-700" : "text-[var(--aris-ink)]"
      }`}>{value}</div>
    </div>
  );
}

function Info({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "sm:col-span-3" : ""}>
      <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-muted)]">{label}</div>
      <div className="mt-1 text-[14px] text-[var(--aris-ink)]">{value}</div>
    </div>
  );
}

function MethodCheck({ label, status, note }: { label: string; status: "pass" | "warn" | "fail"; note: string }) {
  const icon = status === "pass" ? "✓" : status === "warn" ? "!" : "✗";
  const color = status === "pass" ? "bg-emerald-600 text-white" : status === "warn" ? "bg-amber-500 text-white" : "bg-rose-600 text-white";
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--aris-line-dark)] last:border-b-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[12px] font-bold ${color}`}>{icon}</div>
        <span className="font-medium text-[14px] text-[var(--aris-ink)]">{label}</span>
      </div>
      <span className="text-[13px] text-[var(--aris-muted)] text-end shrink-0">{note}</span>
    </div>
  );
}

function AnnualDividendTable({ rows }: { rows: { year: string; paid: number; currency?: string }[] }) {
  const shown = rows.slice(0, 10);
  return (
    <div className="rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--aris-line)] bg-amber-50/55">
        <div className="font-mono-mark text-[10px] tracking-wider uppercase text-[var(--aris-muted)]">Annual cash dividends</div>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full text-start">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-[var(--aris-muted)] font-mono-mark">
              <th className="px-4 py-2 text-start font-medium">Year</th>
              <th className="px-4 py-2 text-end font-medium">Paid</th>
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr><td colSpan={2} className="px-4 py-8 text-center text-sm text-[var(--aris-muted)]">No annual dividend cash-flow data.</td></tr>
            )}
            {shown.map(row => (
              <tr key={row.year} className="border-t border-[var(--aris-line-dark)]">
                <td className="px-4 py-2.5 text-[13px] text-[var(--aris-ink)]">{row.year}</td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px] text-[var(--aris-ink)]">
                  {fmtMoney(row.paid, row.currency ? `${row.currency} ` : "$")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuarterlyDividendTable({
  rows,
  annualDividend,
}: {
  rows: { date: string; period: string; paid: number; currency?: string }[];
  annualDividend: number;
}) {
  const fallback = buildFallbackQuarterRows(annualDividend);
  const hasCashFlowRows = rows.length > 0;
  const shown = hasCashFlowRows ? rows.slice(0, 12) : fallback;
  const quarterlyPerShare = annualDividend / 4;
  return (
    <div className="rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--aris-line)] bg-amber-50/55">
        <div className="font-mono-mark text-[10px] tracking-wider uppercase text-[var(--aris-muted)]">Quarterly payouts</div>
      </div>
      <div className="overflow-auto">
        <table className="w-full min-w-[560px] text-start">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-[var(--aris-muted)] font-mono-mark">
              <th className="px-4 py-2 text-start font-medium">Quarter</th>
              <th className="px-4 py-2 text-end font-medium">Company cash paid</th>
              <th className="px-4 py-2 text-end font-medium">Approx. / share</th>
            </tr>
          </thead>
          <tbody>
            {shown.map(row => (
              <tr key={`${row.date}-${row.period}`} className="border-t border-[var(--aris-line-dark)]">
                <td className="px-4 py-2.5 text-[13px] text-[var(--aris-ink)]">{row.period || row.date}</td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px] text-[var(--aris-ink)]">
                  {hasCashFlowRows ? fmtMoney(row.paid, row.currency ? `${row.currency} ` : "$") : "—"}
                </td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px] text-[var(--aris-ink)]">
                  ${fmt(quarterlyPerShare, 2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-4 py-3 text-[11.5px] text-[var(--aris-muted)] border-t border-[var(--aris-line)]">
        Company cash paid is from cash-flow statements. Approx. per-share payout uses the report's annual dividend divided by four.
      </p>
    </div>
  );
}

function buildFallbackQuarterRows(annualDividend: number) {
  const now = new Date();
  const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
  return Array.from({ length: 12 }, (_, i) => {
    const quarterIndex = currentQuarter - i;
    const year = now.getFullYear() + Math.floor((quarterIndex - 1) / 4);
    const q = ((((quarterIndex - 1) % 4) + 4) % 4) + 1;
    return {
      date: `${year}-Q${q}`,
      period: `${year} Q${q}`,
      paid: 0,
      currency: undefined,
      annualDividend,
    };
  });
}

// ─── Price chart ────────────────────────────────────────────────────────────
function PriceChart({ prices }: { prices: { date: string; close: number }[] }) {
  const W = 900;
  const H = 280;
  const PAD = { top: 16, right: 16, bottom: 28, left: 50 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const closes = prices.map(p => p.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;

  const xAt = (i: number) => PAD.left + (i / (prices.length - 1)) * innerW;
  const yAt = (v: number) => PAD.top + innerH - ((v - min) / range) * innerH;
  const path = prices.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.close)}`).join(" ");
  const area = `${path} L ${xAt(prices.length - 1)} ${PAD.top + innerH} L ${xAt(0)} ${PAD.top + innerH} Z`;

  // year labels: pick first occurrence per year
  const yearTicks: { i: number; year: string }[] = [];
  let lastYear = "";
  prices.forEach((p, i) => {
    const y = p.date.slice(0, 4);
    if (y !== lastYear) { yearTicks.push({ i, year: y }); lastYear = y; }
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
      <defs>
        <linearGradient id="research-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid + Y labels */}
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const v = min + range * (1 - f);
        return (
          <g key={f}>
            <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + innerH * f} y2={PAD.top + innerH * f} stroke="#e7e4dc" strokeDasharray="3 3" />
            <text x={PAD.left - 6} y={PAD.top + innerH * f + 4} textAnchor="end" fontSize="11" fill="#6f7a73" fontFamily="var(--font-mono)">
              ${v.toFixed(v < 50 ? 1 : 0)}
            </text>
          </g>
        );
      })}
      {/* X year labels */}
      {yearTicks.map(t => (
        <text key={t.year} x={xAt(t.i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6f7a73" fontFamily="var(--font-mono)">
          {t.year}
        </text>
      ))}
      <path d={area} fill="url(#research-area)" />
      <path d={path} fill="none" stroke="#047857" strokeWidth="2" />
      <circle cx={xAt(prices.length - 1)} cy={yAt(prices[prices.length - 1].close)} r="4" fill="#047857" stroke="white" strokeWidth="2" />
    </svg>
  );
}

// ─── Investment Simulator ──────────────────────────────────────────────────
function InvestmentSimulator({ yieldPct: initialYield }: { yieldPct: number }) {
  const [initialCapital, setInitialCapital] = useState(100000);
  const [monthly, setMonthly] = useState(0);
  const [years, setYears] = useState(10);
  const [yieldPct, setYieldPct] = useState(initialYield > 0 ? Number(initialYield.toFixed(1)) : 10);
  const [currency, setCurrency] = useState<"AED" | "SAR" | "QAR" | "USD" | "PLN">("AED");

  // Quarterly compounding (matches actual dividend payment frequency)
  const series = useMemo(() => {
    const qRate = yieldPct / 100 / 4;
    const totalQuarters = years * 4;
    const points: { q: number; balance: number; contributed: number; divIncome: number; dividend: number; startBalance: number }[] = [];
    let balance = initialCapital;
    let totalDivs = 0;
    let contributed = initialCapital;
    points.push({ q: 0, balance, contributed, divIncome: 0, dividend: 0, startBalance: balance });
    for (let q = 1; q <= totalQuarters; q++) {
      const startBalance = balance;
      // 3 monthly contributions per quarter
      for (let m = 0; m < 3; m++) {
        balance += monthly;
        contributed += monthly;
      }
      // Quarterly dividend on average balance
      const div = balance * qRate;
      totalDivs += div;
      balance += div;
      points.push({ q, balance, contributed, divIncome: totalDivs, dividend: div, startBalance });
    }
    return points;
  }, [initialCapital, monthly, years, yieldPct]);

  const final = series[series.length - 1];
  const fmtCurrency = (n: number) => `${currency} ${Math.round(n).toLocaleString()}`;

  return (
    <div className="rounded-xl border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-5 sm:p-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
        <Slider label={`Starting capital (${currency})`} value={initialCapital} min={10000} max={1000000} step={10000} onChange={setInitialCapital} display={initialCapital.toLocaleString()} />
        <Slider label={`Monthly add (${currency})`} value={monthly} min={0} max={10000} step={100} onChange={setMonthly} display={monthly.toLocaleString()} />
        <Slider label="Years" value={years} min={1} max={20} step={1} onChange={setYears} display={`${years}`} />
        <Slider label="Yield (%)" value={yieldPct} min={3} max={18} step={0.5} onChange={setYieldPct} display={`${yieldPct.toFixed(1)}%`} />
        <div className="flex flex-col gap-1">
          <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value as typeof currency)} className="h-10 rounded-sm border border-[var(--aris-line-dark)] bg-white px-3 text-[14px]">
            {(["AED", "SAR", "QAR", "USD", "PLN"] as const).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 mb-5">
        <div className="rounded-lg bg-white border border-[var(--aris-line-dark)] px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-muted)]">Starting capital</div>
          <div className="mt-1 font-serif-display text-[20px] sm:text-[24px] tabular-nums text-[var(--aris-ink)]">{fmtCurrency(initialCapital)}</div>
        </div>
        <div className="rounded-lg bg-white border border-[var(--aris-line-dark)] px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-muted)]">Total invested</div>
          <div className="mt-1 font-serif-display text-[20px] sm:text-[24px] tabular-nums text-[var(--aris-ink)]">{fmtCurrency(final.contributed)}</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-amber-800">Dividend income</div>
          <div className="mt-1 font-serif-display text-[20px] sm:text-[24px] tabular-nums text-amber-900">{fmtCurrency(final.divIncome)}</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-[var(--aris-green-950)] to-[var(--aris-charcoal)] text-[var(--aris-paper)] px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-gold)]">Final portfolio value</div>
          <div className="mt-1 font-serif-display text-[26px] sm:text-[32px] tabular-nums">{fmtCurrency(final.balance)}</div>
        </div>
      </div>

      <SimChart series={series} years={years} />
      <QuarterlyCompoundTable series={series.slice(1)} currency={currency} />

      <p className="text-[12px] text-[var(--aris-muted)] italic mt-4">
        Illustration assumes the selected starting capital, optional monthly additions, quarterly dividend payments reinvested, and yield held at {yieldPct.toFixed(1)}%.
        Real results vary with stock price moves and dividend changes. Dividend yields are not guaranteed.
      </p>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">{label}</label>
        <span className="text-[13px] font-semibold tabular-nums text-[var(--aris-gold)]">{display}</span>
      </div>
      <input type="range" value={value} min={min} max={max} step={step} onChange={e => onChange(Number(e.target.value))} className="w-full accent-amber-600" />
    </div>
  );
}

function QuarterlyCompoundTable({
  series,
  currency,
}: {
  series: { q: number; balance: number; contributed: number; divIncome: number; dividend: number; startBalance: number }[];
  currency: string;
}) {
  const fmtCurrency = (n: number) => `${currency} ${Math.round(n).toLocaleString()}`;
  return (
    <div className="mt-4 rounded-lg bg-white/85 border border-[var(--aris-line)] overflow-hidden">
      <div className="px-4 py-3 bg-amber-50/70 border-b border-[var(--aris-line)]">
        <div className="font-mono-mark text-[10px] tracking-wider uppercase text-[var(--aris-muted)]">Quarter-by-quarter compounding</div>
      </div>
      <div className="max-h-[360px] overflow-auto">
        <table className="w-full min-w-[650px] text-start">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-[var(--aris-muted)] font-mono-mark">
              <th className="px-4 py-2 text-start font-medium">Quarter</th>
              <th className="px-4 py-2 text-end font-medium">Start value</th>
              <th className="px-4 py-2 text-end font-medium">Dividend</th>
              <th className="px-4 py-2 text-end font-medium">Total dividends</th>
              <th className="px-4 py-2 text-end font-medium">End value</th>
            </tr>
          </thead>
          <tbody>
            {series.map(row => (
              <tr key={row.q} className="border-t border-[var(--aris-line-dark)]">
                <td className="px-4 py-2.5 text-[13px] text-[var(--aris-ink)]">Y{Math.ceil(row.q / 4)} Q{((row.q - 1) % 4) + 1}</td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px]">{fmtCurrency(row.startBalance)}</td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px] text-[var(--aris-gold)]">{fmtCurrency(row.dividend)}</td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px]">{fmtCurrency(row.divIncome)}</td>
                <td className="px-4 py-2.5 text-end font-mono-mark text-[13px] font-semibold text-[var(--aris-ink)]">{fmtCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SimChart({ series, years }: { series: { q: number; balance: number; contributed: number; divIncome: number }[]; years: number }) {
  const W = 900;
  const H = 240;
  const PAD = { top: 16, right: 16, bottom: 28, left: 64 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const max = Math.max(...series.map(p => p.balance)) || 1;
  const xAt = (i: number) => PAD.left + (i / (series.length - 1)) * innerW;
  const yAt = (v: number) => PAD.top + innerH - (v / max) * innerH;

  const balancePath = series.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.balance)}`).join(" ");
  const contribPath = series.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.contributed)}`).join(" ");
  const balanceArea = `${balancePath} L ${xAt(series.length - 1)} ${yAt(0)} L ${xAt(0)} ${yAt(0)} Z`;

  const yearMarks = Array.from({ length: years + 1 }, (_, y) => ({ q: y * 4, year: y }));

  return (
    <div className="rounded-lg bg-white border border-[var(--aris-line-dark)] p-3 sm:p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
        <defs>
          <linearGradient id="sim-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c6a667" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c6a667" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        {/* Y grid */}
        {[0, 0.25, 0.5, 0.75, 1].map(f => {
          const v = max * (1 - f);
          return (
            <g key={f}>
              <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + innerH * f} y2={PAD.top + innerH * f} stroke="#e7e4dc" strokeDasharray="3 3" />
              <text x={PAD.left - 6} y={PAD.top + innerH * f + 4} textAnchor="end" fontSize="11" fill="#6f7a73" fontFamily="var(--font-mono)">
                {Math.round(v).toLocaleString()}
              </text>
            </g>
          );
        })}
        {/* Year X labels */}
        {yearMarks.map(m => (
          <text key={m.year} x={xAt(m.q)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6f7a73" fontFamily="var(--font-mono)">
            Y{m.year}
          </text>
        ))}
        {/* Balance area + line */}
        <path d={balanceArea} fill="url(#sim-area)" />
        <path d={balancePath} fill="none" stroke="#c6a667" strokeWidth="2.5" />
        {/* Contributions dashed line */}
        <path d={contribPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
        {/* End dot */}
        <circle cx={xAt(series.length - 1)} cy={yAt(series[series.length - 1].balance)} r="5" fill="#c6a667" stroke="white" strokeWidth="2" />
      </svg>
      <div className="flex gap-5 mt-2 text-[12px] flex-wrap">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1 w-5 rounded bg-[var(--aris-gold)]" />
          <span className="text-[var(--aris-ink)] font-medium">Portfolio value</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-0 w-5" style={{ borderTop: "2px dashed #94a3b8" }} />
          <span className="text-[var(--aris-muted)]">Capital invested</span>
        </span>
      </div>
    </div>
  );
}
