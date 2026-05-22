import { useState } from "react";
import { useT } from "./i18n";

export function FAQ() {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-24" style={{ background: "var(--aris-paper-2)" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-7">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow">Questions</div>
          <h2 className="font-serif-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[var(--aris-ink)] my-4">
            {t.faqTitle}
          </h2>
        </div>
        <div className="max-w-[820px] mx-auto">
          {t.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[var(--aris-line-dark)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-start font-serif-display text-[16px] sm:text-[20px] text-[var(--aris-ink)] py-5 sm:py-6 flex items-center justify-between gap-4 sm:gap-5"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span
                    className={`font-sans text-[24px] text-[var(--aris-gold)] shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all ${isOpen ? "max-h-[400px]" : "max-h-0"}`}>
                  <p className="pb-6 text-[15px] text-[var(--aris-muted)] leading-[1.65] max-w-[680px]">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
