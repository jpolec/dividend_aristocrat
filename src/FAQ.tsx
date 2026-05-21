import { useState } from "react";
import { useT } from "./i18n";

export function FAQ() {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-800">
        {t.faqTitle}
      </h3>
      <div className="rounded-xl border bg-white divide-y divide-slate-200 shadow-sm">
        {t.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 sm:px-5 py-3.5 text-start hover:bg-slate-50 transition"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-slate-800 text-sm sm:text-base">{item.q}</span>
                <span className="text-slate-400 text-lg shrink-0 select-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
