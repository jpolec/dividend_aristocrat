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
};

type Row = Base & {
  yieldPct: number;
  div5yGrowthPct: number | null; // we approximate from API where possible
  payoutPct: number | null;
  quality: number; // 0-100
};

function qualityScore(e: Enriched | undefined): number {
  if (!e) return 0;
  // Same logic as backend confidence + small boost for long history
  return Math.min(100, e.confidence + (e.yearsPaid >= 5 ? 0 : -20));
}

export function SampleResearch() {
  const { t } = useT();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Pull from base screener (returns all dividend payers) and filter our preview list
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
          return {
            symbol: sym,
            companyName: b?.companyName ?? sym,
            price,
            lastAnnualDividend: div,
            yieldPct: price > 0 ? (div / price) * 100 : 0,
            div5yGrowthPct: null, // QJ doesn't expose growth directly; left null in preview
            payoutPct: null,
            quality: qualityScore(e),
          };
        });
        setRows(built);
      } catch {
        // Static fallback if API not available
        setRows([
          { symbol: "KO",  companyName: "Coca-Cola Co.",          price: 78, lastAnnualDividend: 2.04, yieldPct: 2.6, div5yGrowthPct: 4.1, payoutPct: 68, quality: 92 },
          { symbol: "JNJ", companyName: "Johnson & Johnson",      price: 160, lastAnnualDividend: 5.04, yieldPct: 3.1, div5yGrowthPct: 6.0, payoutPct: 55, quality: 94 },
          { symbol: "PG",  companyName: "Procter & Gamble",       price: 165, lastAnnualDividend: 4.20, yieldPct: 2.5, div5yGrowthPct: 6.5, payoutPct: 60, quality: 91 },
          { symbol: "MMM", companyName: "3M Co.",                 price: 130, lastAnnualDividend: 2.80, yieldPct: 2.2, div5yGrowthPct: -2.5, payoutPct: 70, quality: 65 },
          { symbol: "ABT", companyName: "Abbott Laboratories",    price: 140, lastAnnualDividend: 2.36, yieldPct: 1.7, div5yGrowthPct: 11.2, payoutPct: 45, quality: 88 },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section>
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight">
          {t.sampleResearchTitle}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.sampleResearchIntro}
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 text-start font-semibold">{t.sampleResearchHeaders.symbol}</th>
                <th className="px-4 py-3 text-start font-semibold">{t.sampleResearchHeaders.company}</th>
                <th className="px-4 py-3 text-end font-semibold">{t.sampleResearchHeaders.yield}</th>
                <th className="px-4 py-3 text-end font-semibold">{t.sampleResearchHeaders.growth5y}</th>
                <th className="px-4 py-3 text-end font-semibold">{t.sampleResearchHeaders.payout}</th>
                <th className="px-4 py-3 text-end font-semibold">{t.sampleResearchHeaders.quality}</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">…</td>
                </tr>
              )}
              {!loading && rows.map(r => (
                <tr key={r.symbol} className="border-t border-stone-100 hover:bg-stone-50/60">
                  <td className="px-4 py-3 font-mono font-semibold text-emerald-900">{r.symbol}</td>
                  <td className="px-4 py-3 text-slate-800">{r.companyName}</td>
                  <td className="px-4 py-3 text-end tabular-nums font-semibold text-emerald-800">
                    {r.yieldPct > 0 ? `${r.yieldPct.toFixed(2)}%` : "—"}
                  </td>
                  <td className={`px-4 py-3 text-end tabular-nums ${
                    r.div5yGrowthPct == null ? "text-slate-400" :
                    r.div5yGrowthPct >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}>
                    {r.div5yGrowthPct == null ? "—" : `${r.div5yGrowthPct >= 0 ? "+" : ""}${r.div5yGrowthPct.toFixed(1)}%`}
                  </td>
                  <td className="px-4 py-3 text-end tabular-nums text-slate-600">
                    {r.payoutPct == null ? "—" : `${r.payoutPct}%`}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <QualityBadge value={r.quality} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 italic leading-relaxed max-w-3xl">
        {t.sampleResearchDisclaimer}
      </p>
    </section>
  );
}

function QualityBadge({ value }: { value: number }) {
  const v = Math.round(value);
  const cls =
    v >= 85 ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
    v >= 70 ? "bg-amber-50 text-amber-800 border-amber-200" :
    "bg-stone-100 text-slate-600 border-stone-200";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold tabular-nums ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {v}
    </span>
  );
}
