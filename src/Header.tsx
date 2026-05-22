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
    { href: "#problem", label: t.navTheCase },
    { href: "#method", label: t.navMethodology },
    { href: "#sample", label: t.navSample },
    { href: "#pricing", label: t.navMembership },
    { href: "#faq", label: t.navFaq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--aris-green-950)]/90 backdrop-blur-md border-b border-[var(--aris-line)] py-3"
          : "border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 text-[var(--aris-paper)]">
          <svg className="h-7 w-7 shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 3L34 11V29L20 37L6 29V11L20 3Z" stroke="#c6a667" strokeWidth="1.4" />
            <path d="M13 26V18L20 22L27 14V26" stroke="#c6a667" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="27" cy="14" r="1.8" fill="#c6a667" />
          </svg>
          <span className="leading-tight">
            <span className="block font-serif-display text-[19px] text-[var(--aris-paper)]">
              {t.brandName}
            </span>
            <span className="block font-mono-mark text-[9px] tracking-[0.3em] uppercase text-[var(--aris-gold)] -mt-0.5">
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

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-0.5 rounded border border-[var(--aris-line)] p-0.5">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`font-mono-mark text-[11px] tracking-wider px-2 py-1 rounded transition-colors ${
                  lang === l.code
                    ? "bg-[var(--aris-gold)] text-[var(--aris-green-950)]"
                    : "text-[var(--aris-gold)] hover:bg-[var(--aris-gold)]/10"
                }`}
                aria-label={l.label}
              >
                {l.short}
              </button>
            ))}
          </div>
          <a
            href="#pricing"
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
          <div className="flex gap-1 mt-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                className={`font-mono-mark text-[11px] tracking-wider px-3 py-1.5 rounded border transition ${
                  lang === l.code
                    ? "bg-[var(--aris-gold)] text-[var(--aris-green-950)] border-[var(--aris-gold)]"
                    : "border-[var(--aris-line)] text-[var(--aris-gold)]"
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
