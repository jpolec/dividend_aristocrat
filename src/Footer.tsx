import { useT } from "./i18n";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="mt-4 space-y-4">
      {/* Big visible warning */}
      <div className="rounded-xl border-2 border-amber-400 bg-amber-50/80 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">⚠️</span>
          <div className="flex-1 min-w-0">
            <h4 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-amber-900">
              {t.disclaimerWarningTitle}
            </h4>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-amber-950">
              {t.disclaimerParas.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compact short version + meta */}
      <div className="rounded-xl border bg-slate-50 px-5 py-4 text-xs text-slate-500 leading-relaxed">
        {t.footerDisclaimer}
      </div>
    </footer>
  );
}
