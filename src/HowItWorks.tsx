import { useT } from "./i18n";

const ICONS = ["🔍", "📧", "📈"];

export function HowItWorks() {
  const { t } = useT();
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-800">
        {t.howTitle}
      </h3>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
        {t.howSteps.map((s, i) => (
          <div key={i} className="rounded-xl border bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-lg">
                {ICONS[i]}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {i + 1}
              </div>
            </div>
            <h4 className="mt-3 font-semibold text-slate-900">{s.title}</h4>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
