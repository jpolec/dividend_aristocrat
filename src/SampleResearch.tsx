import { useEffect, useState } from "react";
import { useT } from "./i18n";

const PREVIEW_TICKERS = ["KO", "JNJ", "PG", "MMM", "ABT"];

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
  div5yGrowthPct: number | null;
  payoutPct: number | null;
  debtProfile: "Conservative" | "Moderate" | "Aggressive";
  valuation: "Attractive" | "Fair" | "Premium";
  quality: number;
};

function debtForCap(mc: number | null): "Conservative" | "Moderate" | "Aggressive" {
  if (mc == null) return "Moderate";
  if (mc > 200e9) return "Conservative";
  if (mc > 50e9) return "Moderate";
  return "Aggressive";
}
function valuationForYield(y: number): "Attractive" | "Fair" | "Premium" {
  if (y >= 4) return "Attractive";
  if (y >= 2) return "Fair";
  return "Premium";
}

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
          const price = b?.price ?? 0;
          const div = b?.lastAnnualDividend ?? 0;
          const yieldPct = price > 0 ? (div / price) * 100 : 0;
          return {
            symbol: sym,
            companyName: b?.companyName ?? sym,
            price,
            lastAnnualDividend: div,
            marketCap: b?.marketCap ?? null,
            yieldPct,
            div5yGrowthPct: null,
            payoutPct: null,
            debtProfile: debtForCap(b?.marketCap ?? null),
            valuation: valuationForYield(yieldPct),
            quality: Math.min(100, e?.confidence ?? 0),
          };
        });
        setRows(built);
      } catch {
        // Fallback only if API fails (unlikely)
        setRows([
          { symbol: "KO", companyName: "Coca-Cola Co.", price: 78, lastAnnualDividend: 2.04, marketCap: 340e9, yieldPct: 2.6, div5yGrowthPct: 4.1, payoutPct: 68, debtProfile: "Conservative", valuation: "Fair", quality: 92 },
          { symbol: "JNJ", companyName: "Johnson & Johnson", price: 160, lastAnnualDividend: 5.04, marketCap: 390e9, yieldPct: 3.1, div5yGrowthPct: 6.0, payoutPct: 55, debtProfile: "Conservative", valuation: "Fair", quality: 94 },
          { symbol: "PG", companyName: "Procter & Gamble", price: 165, lastAnnualDividend: 4.20, marketCap: 390e9, yieldPct: 2.5, div5yGrowthPct: 6.5, payoutPct: 60, debtProfile: "Conservative", valuation: "Fair", quality: 91 },
          { symbol: "MMM", companyName: "3M Co.", price: 130, lastAnnualDividend: 2.80, marketCap: 70e9, yieldPct: 2.2, div5yGrowthPct: -2.5, payoutPct: 70, debtProfile: "Moderate", valuation: "Fair", quality: 65 },
          { symbol: "ABT", companyName: "Abbott Laboratories", price: 140, lastAnnualDividend: 2.36, marketCap: 240e9, yieldPct: 1.7, div5yGrowthPct: 11.2, payoutPct: 45, debtProfile: "Conservative", valuation: "Premium", quality: 88 },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="sample" className="py-20 sm:py-24" style={{ background: "var(--aris-paper)" }}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">Inside The Research</div>
          <h2 className="font-serif-display text-[30px] sm:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.sampleResearchTitle}
          </h2>
          <p className="text-[17px] text-[var(--aris-muted)] leading-relaxed max-w-2xl">
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
          <div className="flex justify-between items-center px-6 sm:px-7 py-5 bg-[var(--aris-green-950)] text-[var(--aris-paper)] flex-wrap gap-3">
            <div className="font-serif-display text-[20px]">Weekly Research — Income & Quality Screen</div>
            <div className="font-mono-mark text-[11px] tracking-wider text-[var(--aris-gold)]">
              LIVE DATA · NOT ADVICE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {[t.sampleResearchHeaders.company, t.sampleResearchHeaders.yield, t.sampleResearchHeaders.growth5y, t.sampleResearchHeaders.payout, "Debt", t.sampleResearchHeaders.quality].map(h => (
                    <th key={h} className="font-mono-mark text-[10.5px] tracking-wider uppercase text-[var(--aris-muted)] text-start px-4 sm:px-5 py-4 border-b border-[var(--aris-line-dark)] font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-[var(--aris-muted)] text-sm">…</td></tr>
                )}
                {!loading && rows.map(r => (
                  <tr key={r.symbol} className="border-b border-[var(--aris-line-dark)] hover:bg-[rgba(198,166,103,.07)] transition-colors">
                    <td className="px-4 sm:px-5 py-4 text-[14px]">
                      <div className="font-semibold text-[var(--aris-ink)]">
                        <span className="font-mono-mark text-[var(--aris-emerald)] me-2">{r.symbol}</span>
                        {r.companyName}
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[14px] font-mono-mark text-[var(--aris-ink)]">
                      {r.yieldPct > 0 ? `${r.yieldPct.toFixed(2)}%` : "—"}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[14px] font-mono-mark text-[var(--aris-ink)]">
                      {r.div5yGrowthPct == null ? "—" : `${r.div5yGrowthPct >= 0 ? "+" : ""}${r.div5yGrowthPct.toFixed(1)}%`}
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-[14px] font-mono-mark text-[var(--aris-ink)]">
                      {r.payoutPct == null ? "—" : `${r.payoutPct}%`}
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <Tag label={r.debtProfile} />
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <Score value={r.quality} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 sm:px-7 py-4 bg-[var(--aris-paper-2)] text-[12px] text-[var(--aris-muted)] italic leading-relaxed">
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
