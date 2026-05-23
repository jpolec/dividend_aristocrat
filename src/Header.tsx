import { useEffect, useState } from "react";
import { LANGS, type Lang, useT } from "./i18n";

export function Header() {
  const { t, lang, setLang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/#problem", label: t.navTheCase },
    { href: "/#method", label: t.navMethodology },
    { href: "/#sample", label: t.navSample },
    { href: "/#pricing", label: t.navMembership },
    { href: "/#faq", label: t.navFaq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--aris-green-950)]/90 backdrop-blur-md border-b border-[var(--aris-line)] py-3"
          : "border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7 flex items-center justify-between gap-2 sm:gap-4">
        <a href="/" className="flex items-center gap-2 sm:gap-2.5 text-[var(--aris-paper)] min-w-0">
          <svg className="h-7 w-7 shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 3L34 11V29L20 37L6 29V11L20 3Z" stroke="#c6a667" strokeWidth="1.4" />
            <path d="M13 26V18L20 22L27 14V26" stroke="#c6a667" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="27" cy="14" r="1.8" fill="#c6a667" />
          </svg>
          <span className="leading-tight hidden xs:inline sm:inline">
            <span className="block font-serif-display text-[17px] sm:text-[19px] text-[var(--aris-paper)]">
              {t.brandName}
            </span>
            <span className="hidden sm:block font-mono-mark text-[9px] tracking-[0.3em] uppercase text-[var(--aris-gold)] -mt-0.5">
              {t.brandSub}
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--aris-paper)]/75 hover:text-[var(--aris-gold)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Flag-based language picker — always visible, prominent */}
          <div className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-[var(--aris-line)] bg-[var(--aris-green-900)]/60 backdrop-blur p-0.5 sm:p-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium transition-colors ${
                  lang === l.code
                    ? "bg-[var(--aris-gold)] text-[var(--aris-green-950)]"
                    : "text-[var(--aris-paper)]/85 hover:bg-[var(--aris-gold)]/10 hover:text-[var(--aris-gold)]"
                }`}
                aria-label={l.label}
                title={l.label}
              >
                <span className="text-[14px] sm:text-[15px] leading-none">{l.flag}</span>
                <span className="font-mono-mark tracking-wider text-[11px] hidden md:inline">{l.short}</span>
              </button>
            ))}
          </div>
          <a
            href="/#pricing"
            className="hidden sm:inline-flex items-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-4 py-2 text-sm font-semibold transition shadow-sm"
          >
            {t.navStartCta}
          </a>
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 -m-2 flex flex-col gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="w-5 h-px bg-[var(--aris-paper)]" />
            <span className="w-5 h-px bg-[var(--aris-paper)]" />
            <span className="w-5 h-px bg-[var(--aris-paper)]" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-[var(--aris-green-950)]/97 border-t border-[var(--aris-line)] px-5 py-6 flex flex-col gap-4">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--aris-paper)]/80 hover:text-[var(--aris-gold)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#pricing"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-sm bg-[var(--aris-gold)] hover:bg-[var(--aris-gold-soft)] text-[var(--aris-green-950)] px-4 py-3 text-sm font-semibold transition mt-2"
          >
            {t.navStartCta}
          </a>
        </div>
      )}
    </header>
  );
}
