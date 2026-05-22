import { useT } from "./i18n";

export function Comparison() {
  const { t } = useT();
  return (
    <section>
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight">
          {t.comparisonTitle}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.comparisonIntro}
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="bg-stone-50 px-5 py-3">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              {t.comparisonLeft}
            </div>
          </div>
          <div className="bg-emerald-950 px-5 py-3">
            <div className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
              {t.comparisonRight}
            </div>
          </div>
        </div>

        <div className="divide-y divide-stone-200">
          {t.comparisonRows.map((row, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-stone-200">
              <div className="px-5 py-4 bg-stone-50/40">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                  {row.dimension}
                </div>
                <div className="text-sm text-slate-700">{row.left}</div>
              </div>
              <div className="px-5 py-4 bg-white">
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 mb-1 font-medium">
                  {row.dimension}
                </div>
                <div className="text-sm font-medium text-emerald-900">{row.right}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 italic leading-relaxed max-w-3xl">
        {t.comparisonNote}
      </p>
    </section>
  );
}
