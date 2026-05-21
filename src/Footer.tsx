import { useT } from "./i18n";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="mt-4 rounded-xl border bg-slate-50 px-5 py-4 text-xs text-slate-500 leading-relaxed">
      {t.footerDisclaimer}
    </footer>
  );
}
