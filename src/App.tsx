import { useEffect, useState } from "react";
import { DividendTable } from "./DividendTable";
import { SubscribeCard } from "./SubscribeCard";
import { Hero } from "./Hero";
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
        <header className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold truncate">{t.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="self-start flex gap-1 rounded-md border bg-background p-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
                  lang === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                aria-label={l.label}
              >
                <span className="sm:hidden">{l.short}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-4 sm:gap-6">
          <Hero />
          <SubscribeCard />
          <DividendTable />
        </div>
      </div>
    </LangCtx.Provider>
  );
}

export default App;
