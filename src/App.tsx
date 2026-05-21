import { useEffect, useState } from "react";
import { DividendTable } from "./DividendTable";
import { SubscribeCard } from "./SubscribeCard";
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
      <div className="container mx-auto p-6 max-w-7xl">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex gap-1 rounded-md border bg-background p-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 text-sm rounded ${
                  lang === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-6">
          <SubscribeCard />
          <DividendTable />
        </div>
      </div>
    </LangCtx.Provider>
  );
}

export default App;
