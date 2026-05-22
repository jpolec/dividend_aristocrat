import { useT } from "./i18n";

export function ShariaSection() {
  const { t } = useT();
  return (
    <section>
      <div className="rounded-2xl border border-emerald-900/20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50 px-6 py-7 sm:px-8 sm:py-9">
        <div className="flex items-center gap-2 text-amber-300 text-[11px] uppercase tracking-[0.2em] font-semibold">
          <span className="text-base">◈</span>
          <span>Halal-aware</span>
        </div>
        <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight">{t.shariaTitle}</h3>
        <p className="mt-2 text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-3xl">
          {t.shariaIntro}
        </p>

        <ul className="mt-5 grid gap-2 sm:gap-3 sm:grid-cols-2">
          {t.shariaBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="mt-1 text-amber-400 shrink-0">◆</span>
              <span className="text-emerald-50/90">{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-emerald-200/70 italic leading-relaxed max-w-3xl border-t border-emerald-800/50 pt-4">
          {t.shariaDisclaimer}
        </p>
      </div>
    </section>
  );
}
