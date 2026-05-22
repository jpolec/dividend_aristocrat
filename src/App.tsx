import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { DividendTable } from "./DividendTable";
import { Problem } from "./Problem";
import { WhyDividend } from "./WhyDividend";
import { HowWeFilter } from "./HowWeFilter";
import { SampleResearch } from "./SampleResearch";
import { ShariaSection } from "./ShariaSection";
import { Comparison } from "./Comparison";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { Admin } from "./Admin";
import { DICTS, LangCtx, dirOf, type Lang } from "./i18n";
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
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/research")) {
    return (
      <LangCtx.Provider value={{ lang, setLang, t }}>
        <Header />
        <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <DividendTable />
        </main>
        <Footer />
      </LangCtx.Provider>
    );
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <Header />
      <main>
        <Hero />
        <Problem />
        <WhyDividend />
        <HowWeFilter />
        <SampleResearch />
        <ShariaSection />
        <Comparison />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </LangCtx.Provider>
  );
}

export default App;
