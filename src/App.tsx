import { useEffect, useState } from "react";
import { DividendTable } from "./DividendTable";
import { SubscribeCard } from "./SubscribeCard";
import { Hero } from "./Hero";
import { Testimonials } from "./Testimonials";
import { CompoundChart } from "./CompoundChart";
import { HowItWorks } from "./HowItWorks";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { Admin } from "./Admin";
import { DICTS, LangCtx, LANGS, dirOf, type Lang } from "./i18n";
import "./index.css";

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof localStorage !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    return saved && DICTS[saved] ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dirOf(lang);
  }, [lang]);

  const t = DICTS[lang];

  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    return <Admin />;
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 max-w-7xl">
        <div className="mb-4 sm:mb-6 flex justify-end">
          <div className="flex gap-1 rounded-md border border-amber-200 bg-white p-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition ${
                  lang === l.code ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-amber-50"
                }`}
                aria-label={l.label}
              >
                <span className="sm:hidden">{l.short}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8">
          <Hero />
          <CompoundChart />
          <Testimonials />
          <HowItWorks />
          <SubscribeCard />
          <div id="picks">
            <DividendTable />
          </div>
          <FAQ />
          <Footer />
        </div>
      </div>
    </LangCtx.Provider>
  );
}

export default App;
