import { useEffect, useMemo, useState } from "react";
import { TICKER_PROFILES } from "./SampleResearch";

type ResearchData = {
  symbol: string;
  prices: { date: string; close: number }[];
  metrics: { lastClose: number | null; high52w: number | null; low52w: number | null; fiveYearReturnPct: number | null };
  dividendHistory: { year: string; paid: number }[];
  companyProfile: Record<string, unknown> | null;
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

  // Header uses illustrative profile values for consistency with the main marketing table.
  // Live market data (current price, 5Y return) is shown separately in the snapshot grid.
  const illustrativePrice = profile.illustrativePrice;
  const annualDiv = profile.illustrativeDiv;
  const yieldPct = illustrativePrice > 0 ? (annualDiv / illustrativePrice) * 100 : 0;
  const livePrice = data?.metrics.lastClose ?? null;

  return (
    <Shell>
      {/* Header */}
      <header className="border-b border-[var(--aris-line-dark)] pb-6 mb-6">
        <a href="/#picks" className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)] mb-3 inline-block">← back to research</a>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono-mark text-[28px] sm:text-[34px] font-bold text-[var(--aris-emerald)]">{symbol}</span>
              <h1 className="font-serif-display text-[24px] sm:text-[32px] lg:text-[40px] text-[var(--aris-ink)]">{profile.name}</h1>
            </div>
            <div className="mt-2 flex items-center gap-3 flex-wrap text-[13.5px] text-[var(--aris-muted)]">
              <span>{profile.sector}</span>
              {profile.halalAware && (
                <span className="inline-flex items-center gap-1 text-[var(--aris-emerald)] font-semibold">
                  <span>◈</span> HALAL-AWARE PASS
                </span>
              )}
            </div>
          </div>
          <div className="text-end">
            <div className="font-mono-mark text-[10px] tracking-wider uppercase text-[var(--aris-muted)]">Illustrative</div>
            <div className="font-serif-display text-[36px] sm:text-[44px] text-[var(--aris-ink)] tabular-nums leading-none">
              ${fmt(illustrativePrice)}
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

      {/* 5Y price chart */}
      <section className="mb-8">
        <SectionTitle>5-Year Price History</SectionTitle>
        <div className="mt-3 rounded-xl border border-[var(--aris-line-dark)] bg-white p-4">
          {data?.prices.length ? (
            <PriceChart prices={data.prices} />
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[var(--aris-muted)] text-sm">Loading prices…</div>
          )}
          {data?.metrics.fiveYearReturnPct != null && (
            <div className="mt-3 text-[13px] text-[var(--aris-muted)]">
              5-year price return: <strong className={data.metrics.fiveYearReturnPct >= 0 ? "text-emerald-700" : "text-rose-700"}>
                {data.metrics.fiveYearReturnPct >= 0 ? "+" : ""}{data.metrics.fiveYearReturnPct.toFixed(1)}%
              </strong>
              {" (price only, dividends not included)"}
            </div>
          )}
        </div>
      </section>

      {/* Investment simulation */}
      <section className="mb-8">
        <SectionTitle>Investment Simulation</SectionTitle>
        <p className="text-[14px] text-[var(--aris-muted)] mt-1 mb-4 max-w-3xl">
          What if you contributed a fixed amount monthly and the dividend yield held at {yieldPct.toFixed(2)}%?
          Below is an illustrative compounding model with quarterly dividend reinvestment.
        </p>
        <InvestmentSimulator yieldPct={yieldPct} />
      </section>

      {/* About */}
      <section className="mb-8">
        <SectionTitle>About {profile.name}</SectionTitle>
        <div className="mt-3 rounded-xl border border-[var(--aris-line-dark)] bg-white p-5 sm:p-6">
          <p className="text-[15px] text-[var(--aris-ink)] leading-relaxed">{profile.description ?? "Company description not available."}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 text-[13px]">
            {profile.founded && <Info label="Founded" value={profile.founded} />}
            {profile.hq && <Info label="Headquarters" value={profile.hq} />}
            {profile.employees && <Info label="Employees" value={profile.employees} />}
            {profile.brands && <Info label="Brands" value={profile.brands} fullWidth />}
          </div>
        </div>
      </section>

      {/* Methodology check */}
      <section className="mb-8">
        <SectionTitle>Methodology Check</SectionTitle>
        <div className="mt-3 rounded-xl border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-5 sm:p-6">
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
    <div style={{ background: "var(--aris-paper)", minHeight: "100vh" }}>
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
      highlight ? "border-[var(--aris-gold)] bg-amber-50/40" : "border-[var(--aris-line-dark)] bg-white"
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
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState(5);
  const [yieldPct, setYieldPct] = useState(initialYield > 0 ? Number(initialYield.toFixed(1)) : 10);
  const [currency, setCurrency] = useState<"AED" | "SAR" | "QAR" | "USD">("AED");

  // Quarterly compounding (matches actual dividend payment frequency)
  const series = useMemo(() => {
    const qRate = yieldPct / 100 / 4;
    const totalQuarters = years * 4;
    const points: { q: number; balance: number; contributed: number; divIncome: number }[] = [];
    let balance = 0;
    let totalDivs = 0;
    let contributed = 0;
    points.push({ q: 0, balance: 0, contributed: 0, divIncome: 0 });
    for (let q = 1; q <= totalQuarters; q++) {
      // 3 monthly contributions per quarter
      for (let m = 0; m < 3; m++) {
        balance += monthly;
        contributed += monthly;
      }
      // Quarterly dividend on average balance
      const div = balance * qRate;
      totalDivs += div;
      balance += div;
      points.push({ q, balance, contributed, divIncome: totalDivs });
    }
    return points;
  }, [monthly, years, yieldPct]);

  const final = series[series.length - 1];
  const fmtMoney = (n: number) => `${currency} ${Math.round(n).toLocaleString()}`;

  return (
    <div className="rounded-xl border border-[var(--aris-line-dark)] bg-[var(--aris-offwhite)] p-5 sm:p-6">
      <div className="grid sm:grid-cols-4 gap-4 mb-5">
        <Slider label={`Monthly (${currency})`} value={monthly} min={100} max={10000} step={100} onChange={setMonthly} display={monthly.toLocaleString()} />
        <Slider label="Years" value={years} min={1} max={20} step={1} onChange={setYears} display={`${years}`} />
        <Slider label="Yield (%)" value={yieldPct} min={3} max={18} step={0.5} onChange={setYieldPct} display={`${yieldPct.toFixed(1)}%`} />
        <div className="flex flex-col gap-1">
          <label className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)]">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value as typeof currency)} className="h-10 rounded-sm border border-[var(--aris-line-dark)] bg-white px-3 text-[14px]">
            {(["AED", "SAR", "QAR", "USD"] as const).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg bg-white border border-[var(--aris-line-dark)] px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-muted)]">Total contributed</div>
          <div className="mt-1 font-serif-display text-[20px] sm:text-[24px] tabular-nums text-[var(--aris-ink)]">{fmtMoney(final.contributed)}</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-amber-800">Dividend income</div>
          <div className="mt-1 font-serif-display text-[20px] sm:text-[24px] tabular-nums text-amber-900">{fmtMoney(final.divIncome)}</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-[var(--aris-green-950)] to-[var(--aris-charcoal)] text-[var(--aris-paper)] px-5 py-4">
          <div className="font-mono-mark text-[10px] uppercase tracking-wider text-[var(--aris-gold)]">Final portfolio value</div>
          <div className="mt-1 font-serif-display text-[26px] sm:text-[32px] tabular-nums">{fmtMoney(final.balance)}</div>
        </div>
      </div>

      <SimChart series={series} years={years} />

      <p className="text-[12px] text-[var(--aris-muted)] italic mt-4">
        Illustration assumes constant monthly contributions, quarterly dividend payments reinvested, and yield held at {yieldPct.toFixed(1)}%.
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
          <span className="text-[var(--aris-muted)]">Contributions (no growth)</span>
        </span>
      </div>
    </div>
  );
}
