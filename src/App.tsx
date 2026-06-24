import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { DividendTable } from "./DividendTable";
import { Problem } from "./Problem";
import { CompoundChart } from "./CompoundChart";
import { WhyDividend } from "./WhyDividend";
import { HowWeFilter } from "./HowWeFilter";
import { SampleResearch } from "./SampleResearch";
import { ShariaSection } from "./ShariaSection";
import { Comparison } from "./Comparison";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { FinalCta } from "./FinalCta";
import { RiskNotice } from "./RiskNotice";
import { Footer } from "./Footer";
import { Admin } from "./Admin";
import { PartnerApp } from "./PartnerApp";
import { StockResearch } from "./StockResearch";
import { StaticPage } from "./StaticPage";
import { DividendBasics } from "./DividendBasics";
import { InvestorGuidesStrip } from "./InvestorGuidesStrip";
import { InvestorGuidePage } from "./InvestorGuidePage";
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
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  if (path.startsWith("/admin")) {
    return <Admin />;
  }
  if (path.startsWith("/partner")) {
    return <PartnerApp />;
  }
  if (path.startsWith("/research/") && path.length > 10) {
    return <StockResearch />;
  }
  if (path.startsWith("/research")) {
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
  if (["/terms", "/privacy", "/risk", "/refund", "/arabic-support", "/contact", "/about"].includes(path)) {
    return (
      <LangCtx.Provider value={{ lang, setLang, t }}>
        <Header />
        <StaticPage path={path} />
        <Footer />
      </LangCtx.Provider>
    );
  }
  if (path.startsWith("/dividend-basics")) {
    return (
      <LangCtx.Provider value={{ lang, setLang, t }}>
        <Header />
        <DividendBasics />
        <Footer />
      </LangCtx.Provider>
    );
  }
  if (path.startsWith("/investor-guides") || path.startsWith("/guides")) {
    return (
      <LangCtx.Provider value={{ lang, setLang, t }}>
        <Header />
        <InvestorGuidePage />
        <Footer />
      </LangCtx.Provider>
    );
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <Header />
      <main>
        <Hero />
        <InvestorGuidesStrip />
        <Problem />
        <CompoundChart />
        <WhyDividend />
        <HowWeFilter />
        <SampleResearch />
        <ShariaSection />
        <Comparison />
        <Testimonials />
        <RiskNotice />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </LangCtx.Provider>
  );
}

export default App;
