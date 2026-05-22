import { useT } from "./i18n";

const ICONS = ["🔍", "📧", "📈"];

export function HowItWorks() {
  const { t } = useT();
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-emerald-950 tracking-tight">
        {t.howTitle}
      </h3>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
        {t.howSteps.map((s, i) => (
          <div key={i} className="rounded-xl border border-amber-100 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-lg shadow-inner">
                {ICONS[i]}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {`0${i + 1}`.slice(-2)}
              </div>
            </div>
            <h4 className="mt-3 font-semibold text-emerald-900">{s.title}</h4>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
