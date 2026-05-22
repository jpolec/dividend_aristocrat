import { useT } from "./i18n";

export function HowWeFilter() {
  const { t } = useT();
  return (
    <section id="methodology">
      <div className="rounded-2xl border border-slate-900 bg-slate-950 text-slate-100 overflow-hidden">
        {/* Header strip — Bloomberg terminal feel */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 sm:px-7 py-3 bg-slate-900">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-amber-300 font-semibold">
              Methodology
            </span>
          </div>
          <div className="text-[11px] text-slate-400 tabular-nums">QJ.RESEARCH/v1</div>
        </div>

        <div className="px-5 sm:px-7 py-7 sm:py-9 space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{t.howWeFilterTitle}</h3>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {t.howWeFilterIntro}
            </p>
          </div>

          {/* Stat callout */}
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-4 py-3">
            <p className="text-sm sm:text-base text-amber-200 leading-snug">
              <span className="font-semibold text-amber-300">●&nbsp;</span>
              {t.howWeFilterStat}
            </p>
          </div>

          {/* Metrics grid */}
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.howWeFilterMetrics.map((m, i) => (
              <div
                key={i}
                className="rounded-md border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-500/50 transition"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                  <span className="text-amber-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-1.5 text-sm font-semibold text-slate-100">{m.label}</div>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
