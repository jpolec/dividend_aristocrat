import { createContext, useContext } from "react";

export type Lang = "pl" | "en" | "ar";
export const LANGS: { code: Lang; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "pl", label: "Polski", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

export type Testimonial = { quote: string; author: string; location: string };

type Dict = {
  heroHeadline: string;
  heroSubheadline: string;
  pricingLine: string;
  pricingCta: string;
  testimonials: Testimonial[];
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
  heroHeadline: "Earn More Than Real Estate — With Less Capital and Less Risk",
  heroSubheadline:
    "Discover U.S. dividend stocks targeting 5–10% yearly income potential without buying property, dealing with tenants, or locking away millions in real estate.",
  pricingLine:
    "$5 / month — every week you receive the stocks worth entering, scored by 5-year payment consistency.",
  pricingCta: "Start for $5/month",
  testimonials: [
    {
      quote:
        "I was considering buying another apartment in Dubai, but the rental yield barely justified the capital. This gave me a more flexible way to build income in dollars.",
      author: "Ahmed K.",
      location: "Dubai",
    },
    {
      quote:
        "With real estate I needed huge upfront capital. Here I started small and still built meaningful recurring dividend income.",
      author: "Faisal A.",
      location: "Riyadh",
    },
    {
      quote:
        "I prefer this over property because I stay liquid. No tenants, no maintenance, no waiting years to exit.",
      author: "Omar H.",
      location: "Doha",
    },
    {
      quote:
        "The weekly picks save me hours of research. It feels like having a dividend analyst in my inbox.",
      author: "Khalid M.",
      location: "Kuwait City",
    },
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
  heroHeadline: "Zarabiaj więcej niż na nieruchomościach — przy mniejszym kapitale i niższym ryzyku",
  heroSubheadline:
    "Amerykańskie spółki dywidendowe z potencjałem 5–10% rocznie. Bez kupowania mieszkań, bez najemców, bez zamrażania milionów w betonie.",
  pricingLine:
    "19 PLN / miesiąc — co tydzień dostajesz spółki, w które warto wejść, oceniane po stabilności wypłat z 5 lat.",
  pricingCta: "Zacznij za 19 PLN/mies.",
  testimonials: [
    {
      quote:
        "Rozważałem kupno kolejnego mieszkania w Dubaju, ale stopa najmu ledwo uzasadniała kapitał. Tu mam bardziej elastyczny sposób budowania dochodu w dolarach.",
      author: "Ahmed K.",
      location: "Dubaj",
    },
    {
      quote:
        "Przy nieruchomościach potrzebowałem ogromnego kapitału na start. Tu zacząłem od małych kwot i też zbudowałem realny, powtarzalny dochód z dywidend.",
      author: "Faisal A.",
      location: "Rijad",
    },
    {
      quote:
        "Wolę to od nieruchomości, bo zostaję płynny. Brak najemców, brak remontów, brak czekania latami na wyjście.",
      author: "Omar H.",
      location: "Doha",
    },
    {
      quote:
        "Cotygodniowe typy oszczędzają mi godziny researchu. Mam wrażenie, że dostaję analityka dywidendowego prosto do skrzynki.",
      author: "Khalid M.",
      location: "Kuwejt",
    },
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
  heroHeadline: "اربح أكثر من العقارات — برأس مال أقل ومخاطر أقل",
  heroSubheadline:
    "اكتشف أسهم الشركات الأمريكية الموزعة لأرباح تستهدف عائدًا سنويًا من 5 إلى 10٪ دون شراء عقارات، أو التعامل مع المستأجرين، أو تجميد ملايين في العقارات.",
  pricingLine:
    "19 درهم إماراتي / 19 ريال سعودي / 19 ريال قطري شهريًا — كل أسبوع تتلقى الأسهم التي تستحق الاستثمار، مرتبة حسب استقرار التوزيعات على مدى 5 سنوات.",
  pricingCta: "ابدأ بـ 19 درهمًا/شهر",
  testimonials: [
    {
      quote:
        "كنت أفكر في شراء شقة أخرى في دبي، لكن عائد الإيجار لم يكن يبرر رأس المال المطلوب. هذا أعطاني طريقة أكثر مرونة لبناء دخل بالدولار.",
      author: "أحمد ك.",
      location: "دبي",
    },
    {
      quote:
        "العقارات تتطلب رأس مال ضخم من البداية. هنا بدأت بمبلغ صغير وما زلت أبني دخلًا متكررًا حقيقيًا من توزيعات الأرباح.",
      author: "فيصل ع.",
      location: "الرياض",
    },
    {
      quote:
        "أفضّل هذا على العقارات لأنني أبقى سيولة. لا مستأجرين، ولا صيانة، ولا انتظار سنوات للخروج.",
      author: "عمر ح.",
      location: "الدوحة",
    },
    {
      quote:
        "الاختيارات الأسبوعية توفر عليّ ساعات من البحث. وكأن لدي محلل توزيعات أرباح في صندوق الوارد الخاص بي.",
      author: "خالد م.",
      location: "مدينة الكويت",
    },
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
