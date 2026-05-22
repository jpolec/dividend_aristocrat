import { useT } from "./i18n";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="text-[var(--aris-paper)]/60 py-16 sm:py-20" style={{ background: "var(--aris-ink)" }}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr] pb-12 border-b border-[var(--aris-paper)]/10">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2.5 text-[var(--aris-paper)] mb-4">
              <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none">
                <path d="M20 3L34 11V29L20 37L6 29V11L20 3Z" stroke="#c6a667" strokeWidth="1.4" />
                <path d="M13 26V18L20 22L27 14V26" stroke="#c6a667" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="27" cy="14" r="1.8" fill="#c6a667" />
              </svg>
              <span>
                <span className="block font-serif-display text-[20px]">{t.brandName}</span>
                <span className="block font-mono-mark text-[9px] tracking-[0.3em] uppercase text-[var(--aris-gold)] -mt-0.5">
                  {t.brandSub}
                </span>
              </span>
            </a>
            <p className="text-[13.5px] leading-[1.6] max-w-[300px]">{t.footerBrandTagline}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Apple Pay", "Mada", "Tabby", "Tamara"].map(p => (
                <span key={p} className="font-mono-mark text-[11px] border border-[var(--aris-paper)]/15 rounded-sm px-3 py-1.5 text-[var(--aris-paper)]/50">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {[
            { title: t.footerColPlatform, links: t.footerLinks.platform, hrefs: ["#method", "#sample", "#sharia", "#pricing"] },
            { title: t.footerColCompany, links: t.footerLinks.company, hrefs: ["#", "#faq", "#", "#"] },
            { title: t.footerColLegal, links: t.footerLinks.legal, hrefs: ["#", "#", "#", "#"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-mono-mark text-[11px] tracking-wider uppercase text-[var(--aris-gold)] mb-4 font-medium">
                {col.title}
              </h4>
              {col.links.map((link, i) => (
                <a
                  key={link}
                  href={col.hrefs[i]}
                  className="block text-[14px] mb-2.5 text-[var(--aris-paper)]/60 hover:text-[var(--aris-gold)] transition"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Strong disclaimer */}
        <div className="pt-8">
          <div
            className="rounded-md px-5 py-5 mb-6"
            style={{ border: "2px solid rgba(198,166,103,.35)", background: "rgba(198,166,103,.04)" }}
          >
            <h4 className="font-mono-mark text-[11px] tracking-[0.18em] uppercase text-[var(--aris-gold)] font-bold mb-3 flex items-center gap-2">
              <span>⚠</span>
              {t.disclaimerWarningTitle}
            </h4>
            <div className="space-y-3 text-[12.5px] leading-[1.6] text-[var(--aris-paper)]/65">
              {t.disclaimerParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 mt-6 pt-6 border-t border-[var(--aris-paper)]/10 text-[12.5px] text-[var(--aris-paper)]/40">
          <span>{t.footerCopyright}</span>
          <span>{t.footerLocale}</span>
        </div>
      </div>
    </footer>
  );
}
