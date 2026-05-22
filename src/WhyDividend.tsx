import { useT } from "./i18n";

const ICONS = ["📜", "💰", "⚖️", "🏛️", "🌐"];

export function WhyDividend() {
  const { t } = useT();
  return (
    <section>
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight">
          {t.whyTitle}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.whyIntro}
        </p>
      </div>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {t.whyCards.map((card, i) => (
          <div key={i} className="rounded-xl border border-stone-200 bg-white px-5 py-5 hover:shadow-md hover:border-amber-300 transition">
            <div className="flex items-center justify-center h-9 w-9 rounded-md bg-gradient-to-br from-emerald-50 to-emerald-100 text-lg border border-emerald-200">
              {ICONS[i] ?? "•"}
            </div>
            <h4 className="mt-3 font-semibold text-slate-900 text-sm">{card.title}</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
