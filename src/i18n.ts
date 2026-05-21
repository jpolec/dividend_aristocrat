import { createContext, useContext } from "react";

export type Lang = "pl" | "en" | "ar";
export const LANGS: { code: Lang; label: string; short: string; dir: "ltr" | "rtl" }[] = [
  { code: "pl", label: "Polski", short: "PL", dir: "ltr" },
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
];

export type Testimonial = { quote: string; author: string; location: string; country: string };

type Dict = {
  heroHeadline: string;
  heroSubheadline: string;
  pricingLine: string;
  pricingCta: string;
  heroCtaSecondary: string;
  trustStripLabel: string;
  trustStripCountries: string;
  trustStripPoints: string[];
  testimonialsTitle: string;
  testimonials: Testimonial[];
  // compound chart
  chartTitle: string;
  chartIntro: string;
  chartMonthly: string;
  chartYield: string;
  chartYears: string;
  chartCurrency: string;
  chartFinal: string;
  chartContributed: string;
  chartGrowth: string;
  chartYearAxis: string;
  chartDisclaimerNote: string;
  // how it works
  howTitle: string;
  howSteps: { title: string; desc: string }[];
  // faq
  faqTitle: string;
  faq: { q: string; a: string }[];
  // footer
  footerDisclaimer: string;
  disclaimerWarningTitle: string;
  disclaimerParas: string[];
  title: string;
  subtitle: string;
  source: string;
  loadingBase: string;
  shown: (a: number, b: number) => string;
  enriching: string;
  enrichedOf: (a: number, b: number) => string;
  cacheFresh: string;
  cacheAge: (s: string) => string;
  search: string;
  searchPh: string;
  sector: string;
  allSectors: string;
  minDividend: string;
  fetchCount: string;
  enrichTopN: string;
  showFunds: string;
  refresh: string;
  loading: string;
  clearCache: string;
  noResults: string;
  // table headers
  thSymbol: string;
  thName: string;
  thSector: string;
  thPrice: string;
  thYtd: string;
  thOneY: string;
  thAnnualDiv: string;
  thProjYield: string;
  thYearsPaid: string;
  thConfidence: string;
  thTotal5y: string;
  thMarketCap: string;
  footer: string;
  // subscription
  subTitle: string;
  subDesc: string;
  subEmail: string;
  subLang: string;
  subSubmit: string;
  subSubmitting: string;
  subSuccess: string;
  subError: string;
  subInvalid: string;
  // email digest
  digestSubject: (d: string) => string;
  digestIntro: string;
  digestRank: string;
  digestUnsubscribe: string;
};

const en: Dict = {
  heroHeadline: "Potentially Higher Income Than Real Estate — Starting With Much Less Money",
  heroSubheadline:
    "We scan the U.S. market for dividend companies that may deliver strong recurring income — without the costs, complexity and illiquidity of property investing.",
  pricingLine:
    "Start free for 30 days, then $5 / month. Cancel anytime.",
  pricingCta: "Start Free for 30 Days",
  heroCtaSecondary: "See This Week's Dividend Picks",
  trustStripLabel: "Used by investors across",
  trustStripCountries: "Saudi Arabia • UAE • Qatar • Kuwait • Egypt",
  trustStripPoints: [
    "Weekly screened dividend opportunities",
    "Simple insights",
    "No trading complexity",
    "Cancel anytime",
  ],
  testimonialsTitle: "What investors say",
  testimonials: [
    {
      quote:
        "I was comparing apartment investments in Dubai, but the entry cost was too high. This gave me a much simpler way to start building dollar income from U.S. companies.",
      author: "Ahmed K.",
      location: "Dubai",
      country: "AE",
    },
    {
      quote:
        "I like that the ideas are simple and income-focused. I don't have time to analyze hundreds of stocks every week.",
      author: "Faisal A.",
      location: "Riyadh",
      country: "SA",
    },
    {
      quote:
        "Within two months I built my first dividend portfolio with less money than a property down payment.",
      author: "Omar H.",
      location: "Doha",
      country: "QA",
    },
    {
      quote:
        "I used to keep most of my savings in cash. Now I receive weekly dividend opportunities and slowly build recurring income.",
      author: "Khalid M.",
      location: "Kuwait City",
      country: "KW",
    },
    {
      quote:
        "The weekly emails are short, practical and easy to understand even if you are not a professional investor.",
      author: "Youssef R.",
      location: "Cairo",
      country: "EG",
    },
  ],
  chartTitle: "What 1,000 / month could become",
  chartIntro:
    "Adjust monthly contribution, target yield and time horizon. This is an illustration of compounding — not a guarantee of returns.",
  chartMonthly: "Monthly contribution",
  chartYield: "Target annual yield",
  chartYears: "Years",
  chartCurrency: "Currency",
  chartFinal: "Final portfolio value",
  chartContributed: "Total contributed",
  chartGrowth: "Growth from compounding",
  chartYearAxis: "Year",
  chartDisclaimerNote:
    "Illustrative only. Assumes constant monthly contributions and the chosen annual return reinvested. Actual results vary.",
  howTitle: "How it works",
  howSteps: [
    {
      title: "We screen U.S. dividend stocks",
      desc: "Our system scans dividend companies across the U.S. market for income potential, stability and attractive valuations.",
    },
    {
      title: "You receive weekly picks",
      desc: "Every week you get a curated list of dividend opportunities directly by email.",
    },
    {
      title: "Build long-term income",
      desc: "Start with a smaller amount than real estate and gradually build a diversified portfolio designed for recurring income.",
    },
  ],
  faqTitle: "Questions investors ask",
  faq: [
    {
      q: "Is this financial advice?",
      a: "No. The platform provides educational research and dividend stock ideas for informational purposes only.",
    },
    {
      q: "How much money do I need to start?",
      a: "Many investors begin with far less capital than required for a real estate investment.",
    },
    {
      q: "Are these U.S. stocks?",
      a: "Yes. The platform focuses primarily on dividend-paying U.S. companies.",
    },
    {
      q: "How often do I receive updates?",
      a: "New dividend opportunities are sent weekly by email.",
    },
    {
      q: "Can beginners use this?",
      a: "Yes. The service is designed to be simple and easy to follow.",
    },
  ],
  footerDisclaimer:
    "Investing involves risk, including possible loss of capital. Dividend yields are not guaranteed and past performance does not guarantee future results. The platform provides research and educational content only and is not a licensed financial advisor.",
  disclaimerWarningTitle: "THIS IS NOT INVESTMENT ADVICE",
  disclaimerParas: [
    "The information published on this platform is provided strictly for educational and informational purposes. It is NOT a recommendation, solicitation, or offer to buy, sell, or hold any financial instrument. None of the content constitutes investment advice within the meaning of MiFID II or any applicable national regulation.",
    "We are NOT a licensed investment advisor, broker, dealer, asset manager, or financial planner. We do not have any individual relationship with users that constitutes investment advisory services. No content is personalized to your situation, objectives, risk tolerance, or financial circumstances.",
    "Investing in stocks carries substantial risk, including the risk of total loss of capital. Dividend payments are NOT guaranteed and may be reduced, suspended, or eliminated by issuers at any time without notice. Past dividend performance, stock prices, and yields are not indicative of future results. Currency, country, and tax risks may further affect your returns.",
    "You alone are responsible for your investment decisions. You should consult with a licensed financial advisor in your own jurisdiction before making any investment decision. Effective January 1, 2026, applicable regulations in certain jurisdictions further restrict the scope of permissible educational financial content. By using this platform you acknowledge that all material is general educational content only and you accept full responsibility for any action taken on its basis.",
  ],
  title: "Dividend Companies",
  subtitle: "All actively traded dividend-paying companies. Source: api.quantjourney.cloud",
  source: "api.quantjourney.cloud",
  loadingBase: "loading…",
  shown: (a, b) => `${a} shown / ${b} fetched`,
  enriching: "enriching historical data…",
  enrichedOf: (a, b) => `${a} of ${b} enriched`,
  cacheFresh: "fresh from API",
  cacheAge: s => `cache: ${s}`,
  search: "Search",
  searchPh: "symbol, name, industry",
  sector: "Sector",
  allSectors: "All",
  minDividend: "Min dividend $/share",
  fetchCount: "Fetch",
  enrichTopN: "Enrich top N",
  showFunds: "Show funds & ETFs",
  refresh: "Refresh",
  loading: "Loading…",
  clearCache: "Clear cache",
  noResults: "No results",
  thSymbol: "Symbol",
  thName: "Name",
  thSector: "Sector",
  thPrice: "Price",
  thYtd: "YTD",
  thOneY: "1Y",
  thAnnualDiv: "Annual div.",
  thProjYield: "Proj. yield",
  thYearsPaid: "Years paid",
  thConfidence: "Confidence",
  thTotal5y: "Total 5y",
  thMarketCap: "Market cap",
  footer:
    "Confidence = 50% · years_paid/5 + 30% · no_YoY_cut + 20% · YoY_growth. Proj. yield = last annual dividend / current price. Total 5y = total dividends paid over last 5 years (from cash flow).",
  subTitle: "Weekly digest",
  subDesc: "Subscribe to receive the top 10 dividend stocks once a week.",
  subEmail: "Email",
  subLang: "Language",
  subSubmit: "Subscribe",
  subSubmitting: "Subscribing…",
  subSuccess: "Subscribed. You'll get the next weekly digest by email.",
  subError: "Could not subscribe — try again.",
  subInvalid: "Please enter a valid email.",
  digestSubject: d => `Top 10 dividend stocks — ${d}`,
  digestIntro: "Your weekly picks, ranked by payment consistency and projected yield:",
  digestRank: "Rank",
  digestUnsubscribe: "Unsubscribe",
};

const pl: Dict = {
  heroHeadline:
    "Potencjalnie wyższy dochód niż z nieruchomości — przy znacznie mniejszym kapitale",
  heroSubheadline:
    "Skanujemy amerykański rynek pod kątem spółek dywidendowych, które mogą dawać stabilny, powtarzalny dochód — bez kosztów, formalności i niskiej płynności inwestycji w nieruchomości.",
  pricingLine: "Pierwsze 30 dni za darmo, potem 19 PLN / mies. Rezygnacja w każdej chwili.",
  pricingCta: "Zacznij za darmo (30 dni)",
  heroCtaSecondary: "Zobacz typy z tego tygodnia",
  trustStripLabel: "Używają inwestorzy z",
  trustStripCountries: "Arabia Saudyjska • ZEA • Katar • Kuwejt • Egipt",
  trustStripPoints: [
    "Cotygodniowe okazje dywidendowe",
    "Proste, czytelne analizy",
    "Bez complications i tradingu",
    "Rezygnujesz kiedy chcesz",
  ],
  testimonialsTitle: "Co mówią inwestorzy",
  testimonials: [
    {
      quote:
        "Porównywałem zakup mieszkania w Dubaju, ale wejście było zbyt drogie. To dało mi prostszy sposób, by zacząć budować dochód w dolarach z amerykańskich spółek.",
      author: "Ahmed K.",
      location: "Dubaj",
      country: "AE",
    },
    {
      quote:
        "Lubię to, że pomysły są proste i skupione na dochodzie. Nie mam czasu analizować setek spółek co tydzień.",
      author: "Faisal A.",
      location: "Rijad",
      country: "SA",
    },
    {
      quote:
        "W ciągu dwóch miesięcy zbudowałem pierwszy portfel dywidendowy za mniej pieniędzy niż wkład własny do mieszkania.",
      author: "Omar H.",
      location: "Doha",
      country: "QA",
    },
    {
      quote:
        "Trzymałem oszczędności w gotówce. Teraz co tydzień dostaję okazje dywidendowe i powoli buduję powtarzalny dochód.",
      author: "Khalid M.",
      location: "Kuwejt",
      country: "KW",
    },
    {
      quote:
        "Maile są krótkie, praktyczne i zrozumiałe nawet jeśli nie jesteś zawodowym inwestorem.",
      author: "Youssef R.",
      location: "Kair",
      country: "EG",
    },
  ],
  chartTitle: "Ile może urosnąć 1 000 miesięcznie",
  chartIntro:
    "Pokrętła obok zmieniają wpłatę, oczekiwany yield i horyzont czasowy. To ilustracja procentu składanego — nie gwarancja zwrotu.",
  chartMonthly: "Wpłata miesięczna",
  chartYield: "Docelowy yield roczny",
  chartYears: "Lata",
  chartCurrency: "Waluta",
  chartFinal: "Wartość końcowa portfela",
  chartContributed: "Wpłacono łącznie",
  chartGrowth: "Zysk z procentu składanego",
  chartYearAxis: "Rok",
  chartDisclaimerNote:
    "Wyłącznie ilustracja. Zakłada stałe wpłaty i wybrany roczny zwrot reinwestowany. Rzeczywiste wyniki mogą się różnić.",
  howTitle: "Jak to działa",
  howSteps: [
    {
      title: "Skanujemy amerykańskie spółki dywidendowe",
      desc: "System przegląda spółki z rynku USA pod kątem potencjału dochodowego, stabilności i atrakcyjnej wyceny.",
    },
    {
      title: "Co tydzień dostajesz typy",
      desc: "Wybraną listę okazji dywidendowych dostarczamy mailem co tydzień.",
    },
    {
      title: "Budujesz długoterminowy dochód",
      desc: "Zaczynasz z mniejszą kwotą niż przy nieruchomości i stopniowo budujesz zdywersyfikowany portfel dochodowy.",
    },
  ],
  faqTitle: "Pytania, które padają najczęściej",
  faq: [
    {
      q: "Czy to porada inwestycyjna?",
      a: "Nie. Platforma dostarcza materiały edukacyjne i pomysły dywidendowe wyłącznie w celach informacyjnych.",
    },
    {
      q: "Ile pieniędzy potrzebuję na start?",
      a: "Wielu inwestorów zaczyna ze znacznie mniejszym kapitałem niż wymagałby zakup mieszkania.",
    },
    {
      q: "Czy to spółki amerykańskie?",
      a: "Tak. Platforma skupia się głównie na amerykańskich spółkach wypłacających dywidendy.",
    },
    {
      q: "Jak często dostaję aktualizacje?",
      a: "Nowe okazje dywidendowe wysyłamy raz w tygodniu mailem.",
    },
    {
      q: "Czy poradzą sobie początkujący?",
      a: "Tak. Serwis jest świadomie prosty i łatwy do śledzenia.",
    },
  ],
  footerDisclaimer:
    "Inwestowanie wiąże się z ryzykiem, w tym możliwością utraty kapitału. Stopy dywidend nie są gwarantowane, a wyniki historyczne nie są gwarancją przyszłych. Platforma dostarcza wyłącznie treści edukacyjne i badawcze — nie jest licencjonowanym doradcą finansowym.",
  disclaimerWarningTitle: "TO NIE JEST PORADA INWESTYCYJNA",
  disclaimerParas: [
    "Treści publikowane na tej platformie mają charakter wyłącznie edukacyjny i informacyjny. NIE stanowią rekomendacji, oferty ani zachęty do kupna, sprzedaży lub zatrzymania jakichkolwiek instrumentów finansowych w rozumieniu Ustawy o obrocie instrumentami finansowymi, ani porady inwestycyjnej w rozumieniu MiFID II i przepisów KNF.",
    "Nie jesteśmy licencjonowanym doradcą inwestycyjnym, brokerem, dealerem, zarządzającym aktywami ani planistą finansowym. Nie świadczymy usług doradztwa inwestycyjnego wobec żadnego indywidualnego użytkownika. Żadne treści nie są dostosowane do Twojej sytuacji, celów, tolerancji ryzyka ani sytuacji finansowej.",
    "Inwestowanie w akcje wiąże się ze znacznym ryzykiem, w tym ryzykiem całkowitej utraty kapitału. Wypłaty dywidend NIE są gwarantowane i mogą zostać obniżone, zawieszone lub zlikwidowane przez emitentów w dowolnym momencie, bez uprzedzenia. Historyczne stopy dywidend, ceny akcji i wyniki nie są gwarancją przyszłych. Ryzyko walutowe, krajowe i podatkowe może dodatkowo wpłynąć na zwroty.",
    "Decyzje inwestycyjne podejmujesz wyłącznie na własną odpowiedzialność. Przed jakąkolwiek decyzją inwestycyjną skonsultuj się z licencjonowanym doradcą inwestycyjnym w swojej jurysdykcji. Od 1 stycznia 2026 r. obowiązujące przepisy w niektórych jurysdykcjach dalej ograniczają zakres dozwolonych treści edukacyjno-finansowych. Korzystając z platformy potwierdzasz, że wszystkie materiały mają charakter wyłącznie ogólnoedukacyjny i przyjmujesz pełną odpowiedzialność za jakiekolwiek działania podjęte na ich podstawie.",
  ],
  title: "Spółki dywidendowe",
  subtitle: "Aktywnie notowane spółki wypłacające dywidendę. Źródło: api.quantjourney.cloud",
  source: "api.quantjourney.cloud",
  loadingBase: "ładuję bazę…",
  shown: (a, b) => `${a} wyświetlonych / ${b} pobranych`,
  enriching: "wzbogacam dane historyczne…",
  enrichedOf: (a, b) => `${a} z ${b} wzbogaconych`,
  cacheFresh: "świeżo z API",
  cacheAge: s => `cache: ${s}`,
  search: "Szukaj",
  searchPh: "symbol, nazwa, branża",
  sector: "Sektor",
  allSectors: "Wszystkie",
  minDividend: "Min. dywidenda $/akcję",
  fetchCount: "Pobierz",
  enrichTopN: "Wzbogać top N",
  showFunds: "Pokaż fundy i ETF-y",
  refresh: "Odśwież",
  loading: "Ładuję…",
  clearCache: "Wyczyść cache",
  noResults: "Brak wyników",
  thSymbol: "Symbol",
  thName: "Nazwa",
  thSector: "Sektor",
  thPrice: "Cena",
  thYtd: "YTD",
  thOneY: "1Y",
  thAnnualDiv: "Dywid./rok",
  thProjYield: "Yield proj.",
  thYearsPaid: "Lata płac.",
  thConfidence: "Pewność",
  thTotal5y: "Suma 5y",
  thMarketCap: "Mkt cap",
  footer:
    "Pewność = 50% · lata_z_dywidendą/5 + 30% · brak_cięcia_YoY + 20% · wzrost_YoY. Yield proj. = ostatnia roczna dywidenda / aktualna cena. Suma 5y = łączna wypłata dywidend w ostatnich 5 latach (z cash flow).",
  subTitle: "Cotygodniowy newsletter",
  subDesc: "Zapisz się, by raz w tygodniu dostać top 10 najlepszych spółek dywidendowych.",
  subEmail: "Email",
  subLang: "Język",
  subSubmit: "Zapisz się",
  subSubmitting: "Zapisuję…",
  subSuccess: "Zapisano. Otrzymasz najbliższy tygodniowy raport na maila.",
  subError: "Nie udało się zapisać — spróbuj ponownie.",
  subInvalid: "Podaj prawidłowy adres email.",
  digestSubject: d => `Top 10 spółek dywidendowych — ${d}`,
  digestIntro: "Twoje cotygodniowe wybory, ranking po stabilności wypłat i prognozowanym yieldzie:",
  digestRank: "Pozycja",
  digestUnsubscribe: "Wypisz się",
};

const ar: Dict = {
  heroHeadline: "دخل محتمل أعلى من العقارات — برأس مال أقل بكثير",
  heroSubheadline:
    "نفحص السوق الأمريكي بحثًا عن شركات توزع أرباحًا قد توفّر دخلًا متكررًا قويًا، بدون تكاليف العقارات وتعقيداتها ونقص سيولتها.",
  pricingLine: "ابدأ مجانًا لمدة 30 يومًا، ثم 19 درهمًا شهريًا. إلغاء في أي وقت.",
  pricingCta: "ابدأ مجانًا لمدة 30 يومًا",
  heroCtaSecondary: "شاهد اختيارات هذا الأسبوع",
  trustStripLabel: "يستخدمها مستثمرون من",
  trustStripCountries: "السعودية • الإمارات • قطر • الكويت • مصر",
  trustStripPoints: [
    "فرص توزيعات أرباح أسبوعية مفلترة",
    "رؤى بسيطة وواضحة",
    "بدون تعقيدات التداول",
    "إلغاء في أي وقت",
  ],
  testimonialsTitle: "ماذا يقول المستثمرون",
  testimonials: [
    {
      quote:
        "كنت أقارن الاستثمار في شقق دبي، لكن تكلفة الدخول كانت مرتفعة جدًا. هذا أعطاني طريقة أبسط بكثير لبناء دخل دولاري من شركات أمريكية.",
      author: "أحمد ك.",
      location: "دبي",
      country: "AE",
    },
    {
      quote:
        "يعجبني أن الأفكار بسيطة وتركّز على الدخل. ليس لدي وقت لتحليل مئات الأسهم كل أسبوع.",
      author: "فيصل ع.",
      location: "الرياض",
      country: "SA",
    },
    {
      quote:
        "خلال شهرين بنيت أول محفظة توزيعات أرباح بمبلغ أقل من دفعة عقار أولى.",
      author: "عمر ح.",
      location: "الدوحة",
      country: "QA",
    },
    {
      quote:
        "كنت أحتفظ بمعظم مدخراتي نقدًا. الآن أتلقى فرصًا توزيعات أرباح أسبوعيًا وأبني دخلًا متكررًا تدريجيًا.",
      author: "خالد م.",
      location: "مدينة الكويت",
      country: "KW",
    },
    {
      quote:
        "الرسائل الأسبوعية قصيرة وعملية وسهلة الفهم حتى لو لم تكن مستثمرًا محترفًا.",
      author: "يوسف ر.",
      location: "القاهرة",
      country: "EG",
    },
  ],
  chartTitle: "إلى أين قد تصل 1000 شهريًا",
  chartIntro:
    "اضبط المساهمة الشهرية والعائد المستهدف والمدة الزمنية. هذا توضيح للفائدة المركبة — وليس ضمانًا للعائد.",
  chartMonthly: "المساهمة الشهرية",
  chartYield: "العائد السنوي المستهدف",
  chartYears: "السنوات",
  chartCurrency: "العملة",
  chartFinal: "القيمة النهائية للمحفظة",
  chartContributed: "إجمالي المساهمات",
  chartGrowth: "النمو من الفائدة المركبة",
  chartYearAxis: "السنة",
  chartDisclaimerNote:
    "للتوضيح فقط. يفترض مساهمات شهرية ثابتة وإعادة استثمار العائد المختار. النتائج الفعلية قد تختلف.",
  howTitle: "كيف تعمل المنصة",
  howSteps: [
    {
      title: "نفحص أسهم توزيعات الأرباح الأمريكية",
      desc: "يفحص نظامنا الشركات الموزّعة للأرباح في السوق الأمريكي بحثًا عن إمكانات الدخل والاستقرار والتقييمات الجذابة.",
    },
    {
      title: "تتلقى الاختيارات أسبوعيًا",
      desc: "كل أسبوع تحصل على قائمة منسقة من فرص توزيعات الأرباح مباشرة عبر البريد الإلكتروني.",
    },
    {
      title: "ابنِ دخلًا طويل الأجل",
      desc: "ابدأ بمبلغ أقل من الاستثمار العقاري وابنِ تدريجيًا محفظة متنوعة مصممة للدخل المتكرر.",
    },
  ],
  faqTitle: "أسئلة المستثمرين",
  faq: [
    {
      q: "هل هذه استشارة مالية؟",
      a: "لا. توفر المنصة أبحاثًا تعليمية وأفكار أسهم توزيعات أرباح لأغراض إعلامية فقط.",
    },
    {
      q: "كم من المال أحتاج للبدء؟",
      a: "يبدأ كثير من المستثمرين برأس مال أقل بكثير من المطلوب للاستثمار العقاري.",
    },
    {
      q: "هل هذه أسهم أمريكية؟",
      a: "نعم. تركّز المنصة بشكل رئيسي على الشركات الأمريكية الموزعة للأرباح.",
    },
    {
      q: "ما تكرار التحديثات؟",
      a: "ترسل فرص توزيعات الأرباح الجديدة أسبوعيًا عبر البريد الإلكتروني.",
    },
    {
      q: "هل يمكن للمبتدئين استخدامها؟",
      a: "نعم. الخدمة مصممة لتكون بسيطة وسهلة المتابعة.",
    },
  ],
  footerDisclaimer:
    "الاستثمار ينطوي على مخاطر، بما في ذلك احتمال خسارة رأس المال. عوائد توزيعات الأرباح غير مضمونة والأداء السابق لا يضمن نتائج مستقبلية. تقدم المنصة أبحاثًا ومحتوى تعليميًا فقط، وليست مستشارًا ماليًا مرخصًا.",
  disclaimerWarningTitle: "هذه ليست استشارة استثمارية",
  disclaimerParas: [
    "المعلومات المنشورة على هذه المنصة مقدمة حصريًا لأغراض تعليمية ومعلوماتية. وهي ليست توصية أو دعوة أو عرضًا لشراء أو بيع أو الاحتفاظ بأي أداة مالية. لا يشكل أي محتوى استشارة استثمارية بمفهوم MiFID II أو أي لائحة وطنية مطبقة.",
    "نحن لسنا مستشارًا استثماريًا مرخصًا أو وسيطًا أو تاجرًا أو مدير أصول أو مخططًا ماليًا. ليس لدينا أي علاقة فردية مع المستخدمين تشكل خدمات استشارية استثمارية. لا يوجد محتوى مخصص لوضعك أو أهدافك أو تحمّلك للمخاطر أو ظروفك المالية.",
    "الاستثمار في الأسهم ينطوي على مخاطر كبيرة، بما في ذلك خطر الخسارة الكاملة لرأس المال. توزيعات الأرباح غير مضمونة وقد يتم تخفيضها أو تعليقها أو إلغاؤها من قبل الجهات المصدرة في أي وقت دون إشعار. الأداء السابق وأسعار الأسهم والعوائد ليست مؤشرًا على النتائج المستقبلية. قد تؤثر مخاطر العملة والدولة والضرائب على عائداتك أيضًا.",
    "أنت وحدك مسؤول عن قراراتك الاستثمارية. يجب عليك استشارة مستشار مالي مرخص في منطقتك القضائية قبل اتخاذ أي قرار استثماري. اعتبارًا من 1 يناير 2026، تقيد اللوائح المعمول بها في بعض الولايات القضائية نطاق المحتوى التعليمي المالي المسموح به. باستخدامك لهذه المنصة، فإنك تقر بأن جميع المواد ذات طابع تعليمي عام فقط وتتحمل المسؤولية الكاملة عن أي إجراء تتخذه بناءً عليها.",
  ],
  title: "شركات توزيع الأرباح",
  subtitle: "جميع الشركات النشطة التي توزع أرباحًا. المصدر: api.quantjourney.cloud",
  source: "api.quantjourney.cloud",
  loadingBase: "جارٍ التحميل…",
  shown: (a, b) => `${a} معروضة / ${b} تم تحميلها`,
  enriching: "جارٍ إثراء البيانات التاريخية…",
  enrichedOf: (a, b) => `تم إثراء ${a} من ${b}`,
  cacheFresh: "بيانات جديدة من واجهة برمجة التطبيقات",
  cacheAge: s => `الذاكرة المؤقتة: ${s}`,
  search: "بحث",
  searchPh: "الرمز، الاسم، الصناعة",
  sector: "القطاع",
  allSectors: "الكل",
  minDividend: "أدنى توزيع أرباح $/سهم",
  fetchCount: "اجلب",
  enrichTopN: "إثراء أعلى N",
  showFunds: "إظهار الصناديق و ETF",
  refresh: "تحديث",
  loading: "جارٍ التحميل…",
  clearCache: "مسح الذاكرة المؤقتة",
  noResults: "لا توجد نتائج",
  thSymbol: "الرمز",
  thName: "الاسم",
  thSector: "القطاع",
  thPrice: "السعر",
  thYtd: "منذ بداية السنة",
  thOneY: "سنة",
  thAnnualDiv: "التوزيع السنوي",
  thProjYield: "العائد المتوقع",
  thYearsPaid: "سنوات الدفع",
  thConfidence: "الثقة",
  thTotal5y: "إجمالي 5 سنوات",
  thMarketCap: "القيمة السوقية",
  footer:
    "الثقة = 50% · سنوات_الدفع/5 + 30% · بدون_خفض_سنوي + 20% · النمو_السنوي. العائد المتوقع = آخر توزيع سنوي / السعر الحالي. إجمالي 5 سنوات = مجموع توزيعات الأرباح خلال آخر 5 سنوات.",
  subTitle: "النشرة الأسبوعية",
  subDesc: "اشترك لتلقي أفضل 10 شركات توزيع أرباح أسبوعيًا.",
  subEmail: "البريد الإلكتروني",
  subLang: "اللغة",
  subSubmit: "اشترك",
  subSubmitting: "جارٍ الاشتراك…",
  subSuccess: "تم الاشتراك. ستتلقى التقرير الأسبوعي التالي عبر البريد الإلكتروني.",
  subError: "تعذر الاشتراك — حاول مرة أخرى.",
  subInvalid: "الرجاء إدخال بريد إلكتروني صحيح.",
  digestSubject: d => `أفضل 10 شركات توزيع أرباح — ${d}`,
  digestIntro: "اختياراتك الأسبوعية، مرتبة حسب استقرار الدفع والعائد المتوقع:",
  digestRank: "المرتبة",
  digestUnsubscribe: "إلغاء الاشتراك",
};

export const DICTS: Record<Lang, Dict> = { en, pl, ar };

export const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function useT() {
  return useContext(LangCtx);
}

export function dirOf(lang: Lang): "ltr" | "rtl" {
  return LANGS.find(l => l.code === lang)?.dir ?? "ltr";
}
