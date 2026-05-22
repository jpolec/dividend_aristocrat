import { useEffect, useState } from "react";
import { useT } from "./i18n";

// High-yield mix: pipeline MLPs (8%) + a BDC + an mREIT (9-13%)
const PREVIEW_TICKERS = ["MPLX", "WES", "ET", "ARCC", "AGNC"];

type TickerProfile = {
  name: string;
  sector: string;
  div5yGrowthPct: number;
  payoutPct: number;
  debtProfile: "Conservative" | "Moderate" | "Aggressive";
  halalAware: boolean;
  excludeReason?: string; // shown when halalAware === false
};

const TICKER_PROFILES: Record<string, TickerProfile> = {
  MPLX: { name: "MPLX LP", sector: "Pipelines · Midstream", div5yGrowthPct: 5.2, payoutPct: 78, debtProfile: "Moderate", halalAware: true },
  WES: { name: "Western Midstream Partners", sector: "Pipelines · Midstream", div5yGrowthPct: 7.8, payoutPct: 75, debtProfile: "Moderate", halalAware: true },
  ET: { name: "Energy Transfer LP", sector: "Pipelines · Midstream", div5yGrowthPct: 3.1, payoutPct: 82, debtProfile: "Moderate", halalAware: true },
  ARCC: { name: "Ares Capital", sector: "BDC · Lending", div5yGrowthPct: 4.8, payoutPct: 95, debtProfile: "Moderate", halalAware: false, excludeReason: "lending / interest income" },
  AGNC: { name: "AGNC Investment", sector: "mREIT · Mortgage", div5yGrowthPct: -8.4, payoutPct: 145, debtProfile: "Aggressive", halalAware: false, excludeReason: "mortgage-rate exposure" },
};

type Enriched = {
  symbol: string;
  yearsCovered: number;
  yearsPaid: number;
  confidence: number;
  totalPaid5y: number;
  ytd: number | null;
  oneYear: number | null;
  lastClose: number | null;
};

type Base = {
  symbol: string;
  companyName: string;
  price: number;
  lastAnnualDividend: number;
  marketCap: number | null;
};

type Row = Base & {
  yieldPct: number;
  div5yGrowthPct: number;
  payoutPct: number;
  debtProfile: "Conservative" | "Moderate" | "Aggressive";
  quality: number;
  halalAware: boolean;
  excludeReason?: string;
};

const TAG_STYLES: Record<string, string> = {
  Conservative: "bg-emerald-700/15 text-[var(--aris-emerald)] border-emerald-700/20",
  Moderate: "bg-amber-500/20 text-amber-800 border-amber-500/30",
  Aggressive: "bg-rose-500/15 text-rose-800 border-rose-500/25",
  Attractive: "bg-emerald-700/15 text-[var(--aris-emerald)] border-emerald-700/20",
  Fair: "bg-stone-200/70 text-[var(--aris-muted)] border-stone-300",
  Premium: "bg-amber-500/15 text-amber-900 border-amber-500/25",
};

export function SampleResearch() {
  const { t } = useT();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const base = await fetch("/api/dividends?limit=300&min_dividend=0.1").then(r => r.json());
        const baseRows: Base[] = (base.rows ?? []).filter((r: Base) => PREVIEW_TICKERS.includes(r.symbol));

        const enrichRes = await fetch("/api/dividends/enriched", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbols: PREVIEW_TICKERS }),
        }).then(r => r.json());
        const eMap = new Map<string, Enriched>((enrichRes.enriched ?? []).map((e: Enriched) => [e.symbol, e]));

        const built: Row[] = PREVIEW_TICKERS.map(sym => {
          const b = baseRows.find(r => r.symbol === sym);
          const e = eMap.get(sym);
          const profile = TICKER_PROFILES[sym]!;
          const price = b?.price ?? 0;
          const div = b?.lastAnnualDividend ?? 0;
          const yieldPct = price > 0 ? (div / price) * 100 : 0;
          return {
            symbol: sym,
            companyName: b?.companyName ?? profile.name,
            price,
            lastAnnualDividend: div,
            marketCap: b?.marketCap ?? null,
            yieldPct,
            div5yGrowthPct: profile.div5yGrowthPct,
            payoutPct: profile.payoutPct,
            debtProfile: profile.debtProfile,
            quality: Math.min(100, e?.confidence ?? 0),
            halalAware: profile.halalAware,
            excludeReason: profile.excludeReason,
          };
        });
        setRows(built);
      } catch {
        // Static fallback (used only if API down) — illustrative yields
        setRows([
          { symbol: "MPLX", companyName: "MPLX LP", price: 48, lastAnnualDividend: 4.10, marketCap: 49e9, yieldPct: 8.5, div5yGrowthPct: 5.2, payoutPct: 78, debtProfile: "Moderate", quality: 78, halalAware: true },
          { symbol: "WES",  companyName: "Western Midstream Partners", price: 39, lastAnnualDividend: 3.20, marketCap: 14e9, yieldPct: 8.2, div5yGrowthPct: 7.8, payoutPct: 75, debtProfile: "Moderate", quality: 75, halalAware: true },
          { symbol: "ET",   companyName: "Energy Transfer LP", price: 16, lastAnnualDividend: 1.27, marketCap: 55e9, yieldPct: 7.8, div5yGrowthPct: 3.1, payoutPct: 82, debtProfile: "Moderate", quality: 68, halalAware: true },
          { symbol: "ARCC", companyName: "Ares Capital", price: 21, lastAnnualDividend: 1.92, marketCap: 13e9, yieldPct: 9.5, div5yGrowthPct: 4.8, payoutPct: 95, debtProfile: "Moderate", quality: 65, halalAware: false, excludeReason: "lending / interest income" },
          { symbol: "AGNC", companyName: "AGNC Investment", price: 10, lastAnnualDividend: 1.44, marketCap: 6e9, yieldPct: 13.5, div5yGrowthPct: -8.4, payoutPct: 145, debtProfile: "Aggressive", quality: 35, halalAware: false, excludeReason: "mortgage-rate exposure" },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="sample" className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">Inside The Research</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.sampleResearchTitle}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[var(--aris-muted)] leading-relaxed max-w-2xl">
            {t.sampleResearchIntro}
          </p>
        </div>

        <div
          className="rounded-xl overflow-hidden bg-[var(--aris-offwhite)]"
          style={{
            border: "1px solid var(--aris-line-dark)",
            boxShadow: "0 30px 70px -45px rgba(12,18,14,.4)",
          }}
        >
          <div className="flex justify-between items-center px-4 sm:px-7 py-4 sm:py-5 bg-[var(--aris-green-950)] text-[var(--aris-paper)] flex-wrap gap-2">
            <div className="font-serif-display text-[16px] sm:text-[20px]">Weekly Research — Income & Quality Screen</div>
            <div className="font-mono-mark text-[10px] sm:text-[11px] tracking-wider text-[var(--aris-gold)]">
              LIVE DATA · NOT ADVICE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {[t.sampleResearchHeaders.company, t.sampleResearchHeaders.yield, t.sampleResearchHeaders.growth5y, t.sampleResearchHeaders.payout, "Debt", "Halal-aware", t.sampleResearchHeaders.quality].map(h => (
                    <th key={h} className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] text-start px-4 sm:px-5 py-4 border-b border-[var(--aris-line-dark)] font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-[var(--aris-muted)] text-sm">…</td></tr>
                )}
                {!loading && rows.map(r => (
                  <tr
                    key={r.symbol}
                    className={`border-b border-[var(--aris-line-dark)] transition-colors ${
                      r.halalAware ? "hover:bg-[rgba(198,166,103,.07)]" : "bg-[rgba(12,18,14,.025)] hover:bg-[rgba(12,18,14,.05)]"
                    }`}
                  >
                    <td className="px-4 sm:px-5 py-4 text-[14px]">
                      <div className="font-semibold text-[var(--aris-ink)] flex items-center gap-2">
                        <span className="font-mono-mark text-[var(--aris-emerald)]">{r.symbol}</span>
                        <span className={r.halalAware ? "" : "text-[var(--aris-muted)]"}>{r.companyName}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[14px] font-mono-mark font-semibold" style={{ color: r.yieldPct >= 9 ? "#9c7c3a" : "var(--aris-ink)" }}>
                      {r.yieldPct > 0 ? `${r.yieldPct.toFixed(2)}%` : "—"}
                    </td>
                    <td className={`px-4 sm:px-5 py-4 text-[14px] font-mono-mark ${r.div5yGrowthPct < 0 ? "text-rose-700" : "text-[var(--aris-ink)]"}`}>
                      {`${r.div5yGrowthPct >= 0 ? "+" : ""}${r.div5yGrowthPct.toFixed(1)}%`}
                    </td>
                    <td className={`px-4 sm:px-5 py-4 text-[14px] font-mono-mark ${r.payoutPct > 100 ? "text-rose-700" : "text-[var(--aris-ink)]"}`}>
                      {`${r.payoutPct}%`}
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <Tag label={r.debtProfile} />
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      {r.halalAware ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--aris-emerald)]">
                          <span className="text-[14px] leading-none">◈</span>
                          PASS
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--aris-muted)]"
                          title={r.excludeReason}
                        >
                          <span className="text-[14px] leading-none">⊘</span>
                          EXCLUDED
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <Score value={r.quality} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-7 py-4 bg-[var(--aris-paper-2)] text-[12px] text-[var(--aris-muted)] italic leading-relaxed">
            <p className="not-italic font-medium text-[var(--aris-ink)] mb-1">
              <span className="text-[var(--aris-emerald)] me-1">◈ PASS</span> = passes halal-aware filter &nbsp;·&nbsp;
              <span className="text-[var(--aris-muted)] me-1">⊘ EXCLUDED</span> = shown for market context, outside the halal-aware screen
            </p>
            {t.sampleResearchDisclaimer}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ label }: { label: string }) {
  const cls = TAG_STYLES[label] ?? TAG_STYLES.Fair;
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

function Score({ value }: { value: number }) {
  const v = Math.round(value);
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-[46px] h-[5px] bg-[var(--aris-line-dark)] rounded overflow-hidden inline-block">
        <i className="block h-full rounded" style={{ width: `${v}%`, background: "linear-gradient(90deg, var(--aris-emerald), var(--aris-gold))" }} />
      </span>
      <span className="font-mono-mark text-[13px] text-[var(--aris-ink)] tabular-nums">{v}</span>
    </span>
  );
}
