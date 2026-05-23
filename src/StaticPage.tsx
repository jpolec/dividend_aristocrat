import { useT, type Lang } from "./i18n";

const CONTACT_EMAIL = "support@dividendaristocrat.com";

type Page = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: Array<{ title: string; body: string[] }>;
};

const enPages: Record<string, Page> = {
  "/terms": {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "These terms govern access to Aristocrat Dividend Research. The service provides educational research and screening tools only.",
    sections: [
      {
        title: "Educational research only",
        body: [
          "We publish general financial research, dividend screening, market commentary, and educational materials. We do not provide investment advice, portfolio management, brokerage, asset management, or financial planning services.",
          "Nothing on the platform is personalized to your objectives, financial situation, risk tolerance, tax position, or jurisdiction.",
        ],
      },
      {
        title: "User responsibility",
        body: [
          "You are responsible for your own financial decisions. Before buying, selling, or holding any security, consult an appropriately licensed professional in your jurisdiction.",
          "You agree not to treat our research as a recommendation, instruction, or promise of future return.",
        ],
      },
      {
        title: "Subscription access",
        body: [
          "Paid access is for the subscribing user only. You may not resell, redistribute, scrape, or republish the research without written permission.",
          "We may update, change, suspend, or discontinue parts of the service as the product develops.",
        ],
      },
    ],
  },
  "/privacy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "We collect only the information needed to operate subscriptions, payments, support, and product analytics.",
    sections: [
      {
        title: "Information we collect",
        body: [
          "We may collect your email address, language preference, subscription status, payment identifiers from Stripe, support messages, and basic technical logs.",
          "Payment card details are handled by Stripe. We do not store full card numbers on our servers.",
        ],
      },
      {
        title: "How we use information",
        body: [
          "We use information to provide access, send research updates, process subscriptions, handle refunds, improve reliability, prevent abuse, and respond to support requests.",
          "We do not sell personal information.",
        ],
      },
      {
        title: "Data requests",
        body: [
          `For privacy requests, contact ${CONTACT_EMAIL}. Include the email address used for your subscription so we can identify the account.`,
        ],
      },
    ],
  },
  "/risk": {
    eyebrow: "Disclosures",
    title: "Risk Statement",
    intro: "Dividend investing involves meaningful risk. Dividend income is not guaranteed and securities can lose value.",
    sections: [
      {
        title: "Market and capital risk",
        body: [
          "Stocks, REITs, BDCs, ADRs, and other securities can decline substantially, including to zero. Past performance does not predict future results.",
          "Dividend yields can look high because a share price has fallen. A high yield is not automatically attractive or safe.",
        ],
      },
      {
        title: "Dividend risk",
        body: [
          "Dividends may be reduced, suspended, delayed, or eliminated by issuers at any time. Dividend history is not a guarantee of future payments.",
          "Tax, currency, interest-rate, credit, liquidity, and country risks may affect returns.",
        ],
      },
      {
        title: "No personal advice",
        body: [
          "Our research is educational and general. It is not tailored to your personal circumstances and should not be used as the sole basis for an investment decision.",
        ],
      },
    ],
  },
  "/refund": {
    eyebrow: "Membership",
    title: "Refund Policy",
    intro: "We want users to evaluate the research calmly. The current membership includes a 30-day money-back guarantee.",
    sections: [
      {
        title: "30-day refund window",
        body: [
          "If you are not satisfied, contact us within 30 days of your first payment and request a refund.",
          "Refunds are returned to the original payment method through Stripe. Bank and card processing times may vary.",
        ],
      },
      {
        title: "Subscription cancellation",
        body: [
          "You may cancel future renewals. Cancellation stops future billing but does not automatically refund prior charges outside the stated refund window.",
        ],
      },
      {
        title: "How to request a refund",
        body: [
          `Email ${CONTACT_EMAIL} from the address used for purchase and include “Refund request” in the subject line.`,
        ],
      },
    ],
  },
  "/arabic-support": {
    eyebrow: "Support",
    title: "Arabic Support",
    intro: "Arabic support is available for platform access, research navigation, billing questions, and general product help.",
    sections: [
      {
        title: "What we can help with",
        body: [
          "We can help with account access, payment issues, language settings, research navigation, and understanding how to read our methodology.",
          "Arabic support does not include personalized investment advice or recommendations.",
        ],
      },
      {
        title: "Contact",
        body: [
          `Email ${CONTACT_EMAIL}. You may write in Arabic or English.`,
        ],
      },
    ],
  },
  "/contact": {
    eyebrow: "Contact",
    title: "Contact",
    intro: CONTACT_EMAIL,
    sections: [],
  },
  "/about": {
    eyebrow: "Company",
    title: "About Us",
    intro: "Aristocrat Dividend Research focuses on educational financial analysis for income-oriented investors.",
    sections: [
      {
        title: "What we do",
        body: [
          "We have worked with financial analysis, screening, research workflows, and market data for years. The platform turns that experience into structured dividend-company research for investors who want a disciplined process.",
          "Our focus is on dividend history, payout discipline, balance-sheet context, valuation context, currency exposure, and long-term business durability.",
        ],
      },
      {
        title: "What we do not do",
        body: [
          "We do not provide personalized investment advice. We do not manage money, execute trades, or tell users what to buy or sell.",
          "Our role is education, research, and decision support. Your financial decisions remain your responsibility.",
        ],
      },
    ],
  },
};

const plPages: Record<string, Page> = {
  "/terms": {
    eyebrow: "Informacje prawne",
    title: "Regulamin świadczenia usługi",
    intro: "Ten regulamin określa zasady dostępu do Aristocrat Dividend Research. Usługa obejmuje wyłącznie edukacyjne materiały badawcze i narzędzia analityczne.",
    sections: [
      {
        title: "Wyłącznie edukacja i research",
        body: [
          "Publikujemy ogólne analizy finansowe, screeningi dywidendowe, komentarze rynkowe i materiały edukacyjne. Nie świadczymy usług doradztwa inwestycyjnego, zarządzania portfelem, pośrednictwa maklerskiego, zarządzania aktywami ani planowania finansowego.",
          "Żadna treść w serwisie nie jest dostosowana do Twoich celów, sytuacji finansowej, tolerancji ryzyka, sytuacji podatkowej ani jurysdykcji.",
        ],
      },
      {
        title: "Odpowiedzialność użytkownika",
        body: [
          "Samodzielnie odpowiadasz za swoje decyzje finansowe. Przed zakupem, sprzedażą lub utrzymywaniem jakiegokolwiek instrumentu finansowego skonsultuj się z odpowiednio licencjonowanym specjalistą w swojej jurysdykcji.",
          "Zgadzasz się nie traktować naszych materiałów jako rekomendacji, instrukcji inwestycyjnej ani obietnicy przyszłego wyniku.",
        ],
      },
      {
        title: "Dostęp subskrypcyjny",
        body: [
          "Płatny dostęp jest przeznaczony wyłącznie dla subskrybującego użytkownika. Nie wolno odsprzedawać, redystrybuować, scrapować ani ponownie publikować materiałów bez pisemnej zgody.",
          "Możemy aktualizować, zmieniać, zawieszać lub wycofywać części usługi w miarę rozwoju produktu.",
        ],
      },
    ],
  },
  "/privacy": {
    eyebrow: "Informacje prawne",
    title: "Polityka prywatności",
    intro: "Zbieramy tylko informacje potrzebne do obsługi subskrypcji, płatności, wsparcia i podstawowej analityki produktu.",
    sections: [
      {
        title: "Jakie informacje zbieramy",
        body: [
          "Możemy zbierać adres email, preferencję językową, status subskrypcji, identyfikatory płatności ze Stripe, wiadomości do wsparcia oraz podstawowe logi techniczne.",
          "Dane kart płatniczych obsługuje Stripe. Nie przechowujemy pełnych numerów kart na naszych serwerach.",
        ],
      },
      {
        title: "Jak wykorzystujemy informacje",
        body: [
          "Wykorzystujemy dane do zapewnienia dostępu, wysyłania aktualizacji researchu, obsługi subskrypcji, zwrotów, poprawy niezawodności, zapobiegania nadużyciom i odpowiadania na zgłoszenia.",
          "Nie sprzedajemy danych osobowych.",
        ],
      },
      {
        title: "Wnioski dotyczące danych",
        body: [
          `W sprawach prywatności napisz na ${CONTACT_EMAIL}. Podaj adres email użyty przy subskrypcji, abyśmy mogli zidentyfikować konto.`,
        ],
      },
    ],
  },
  "/risk": {
    eyebrow: "Oświadczenia",
    title: "Oświadczenie o ryzyku",
    intro: "Inwestowanie dywidendowe wiąże się z istotnym ryzykiem. Dochód z dywidend nie jest gwarantowany, a wartość papierów wartościowych może spaść.",
    sections: [
      {
        title: "Ryzyko rynkowe i ryzyko kapitału",
        body: [
          "Akcje, REIT-y, BDC, ADR-y i inne instrumenty mogą znacząco stracić na wartości, nawet do zera. Wyniki historyczne nie przewidują wyników przyszłych.",
          "Wysoka stopa dywidendy może wynikać ze spadku ceny akcji. Wysoki yield nie oznacza automatycznie atrakcyjnej ani bezpiecznej inwestycji.",
        ],
      },
      {
        title: "Ryzyko dywidendy",
        body: [
          "Emitenci mogą w dowolnym momencie obniżyć, zawiesić, opóźnić albo całkowicie wstrzymać dywidendy. Historia wypłat nie gwarantuje przyszłych wypłat.",
          "Na wynik mogą wpływać podatki, waluty, stopy procentowe, kredyt, płynność i ryzyka kraju.",
        ],
      },
      {
        title: "Brak indywidualnego doradztwa",
        body: [
          "Nasze materiały są edukacyjne i ogólne. Nie są dostosowane do Twojej indywidualnej sytuacji i nie powinny być jedyną podstawą decyzji inwestycyjnej.",
        ],
      },
    ],
  },
  "/refund": {
    eyebrow: "Subskrypcja",
    title: "Polityka zwrotów",
    intro: "Chcemy, aby użytkownicy mogli spokojnie ocenić research. Aktualna subskrypcja obejmuje 30-dniową gwarancję zwrotu pieniędzy.",
    sections: [
      {
        title: "30-dniowe okno zwrotu",
        body: [
          "Jeżeli nie jesteś zadowolony, skontaktuj się z nami w ciągu 30 dni od pierwszej płatności i poproś o zwrot.",
          "Zwroty są realizowane przez Stripe na pierwotną metodę płatności. Czas księgowania zależy od banku i operatora karty.",
        ],
      },
      {
        title: "Anulowanie subskrypcji",
        body: [
          "Możesz anulować przyszłe odnowienia. Anulowanie zatrzymuje przyszłe płatności, ale nie oznacza automatycznego zwrotu wcześniejszych opłat poza wskazanym oknem zwrotu.",
        ],
      },
      {
        title: "Jak poprosić o zwrot",
        body: [
          `Napisz na ${CONTACT_EMAIL} z adresu użytego przy zakupie i dodaj w temacie “Refund request”.`,
        ],
      },
    ],
  },
  "/arabic-support": {
    eyebrow: "Wsparcie",
    title: "Wsparcie po arabsku",
    intro: "Wsparcie po arabsku obejmuje dostęp do platformy, poruszanie się po researchu, pytania billingowe i ogólną pomoc produktową.",
    sections: [
      {
        title: "W czym pomagamy",
        body: [
          "Pomagamy przy dostępie do konta, problemach z płatnościami, ustawieniach języka, nawigacji po researchu i zrozumieniu metodologii.",
          "Wsparcie po arabsku nie obejmuje indywidualnych porad inwestycyjnych ani rekomendacji.",
        ],
      },
      {
        title: "Kontakt",
        body: [
          `Napisz na ${CONTACT_EMAIL}. Możesz pisać po arabsku lub po angielsku.`,
        ],
      },
    ],
  },
  "/contact": {
    eyebrow: "Kontakt",
    title: "Kontakt",
    intro: CONTACT_EMAIL,
    sections: [],
  },
  "/about": {
    eyebrow: "Firma",
    title: "O nas",
    intro: "Aristocrat Dividend Research koncentruje się na edukacyjnej analizie finansowej dla inwestorów nastawionych na dochód.",
    sections: [
      {
        title: "Czym się zajmujemy",
        body: [
          "Od lat pracujemy z analizą finansową, screeningiem, procesami researchu i danymi rynkowymi. Platforma przekłada to doświadczenie na uporządkowany research spółek dywidendowych dla inwestorów, którzy chcą działać według procesu.",
          "Skupiamy się na historii dywidend, dyscyplinie wypłat, bilansie, wycenie, ekspozycji walutowej i długoterminowej trwałości biznesu.",
        ],
      },
      {
        title: "Czego nie robimy",
        body: [
          "Nie świadczymy indywidualnego doradztwa inwestycyjnego. Nie zarządzamy pieniędzmi, nie wykonujemy transakcji i nie mówimy użytkownikom, co mają kupić lub sprzedać.",
          "Naszą rolą jest edukacja, research i wsparcie procesu decyzyjnego. Twoje decyzje finansowe pozostają Twoją odpowiedzialnością.",
        ],
      },
    ],
  },
};

const arPages: Record<string, Page> = {
  "/terms": {
    eyebrow: "قانوني",
    title: "شروط الخدمة",
    intro: "تنظم هذه الشروط الوصول إلى Aristocrat Dividend Research. تقدم الخدمة أبحاثا تعليمية وأدوات فرز وتحليل فقط.",
    sections: [
      {
        title: "أبحاث تعليمية فقط",
        body: [
          "ننشر أبحاثا مالية عامة، وفرزا لأسهم توزيعات الأرباح، وتعليقات سوقية، ومواد تعليمية. لا نقدم استشارات استثمارية، أو إدارة محافظ، أو وساطة، أو إدارة أصول، أو تخطيطا ماليا.",
          "لا يتم تخصيص أي محتوى على المنصة وفقا لأهدافك أو وضعك المالي أو تحملك للمخاطر أو وضعك الضريبي أو بلدك.",
        ],
      },
      {
        title: "مسؤولية المستخدم",
        body: [
          "أنت مسؤول عن قراراتك المالية. قبل شراء أو بيع أو الاحتفاظ بأي ورقة مالية، استشر مختصا مرخصا في بلدك.",
          "توافق على عدم اعتبار أبحاثنا توصية أو أمرا استثماريا أو وعدا بعائد مستقبلي.",
        ],
      },
      {
        title: "الوصول عبر الاشتراك",
        body: [
          "الوصول المدفوع مخصص للمستخدم المشترك فقط. لا يجوز بيع الأبحاث أو إعادة توزيعها أو نسخها آليا أو إعادة نشرها من دون موافقة مكتوبة.",
          "قد نقوم بتحديث أو تغيير أو تعليق أو إيقاف أجزاء من الخدمة مع تطور المنتج.",
        ],
      },
    ],
  },
  "/privacy": {
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    intro: "نجمع فقط المعلومات اللازمة لتشغيل الاشتراكات والمدفوعات والدعم وتحليلات المنتج الأساسية.",
    sections: [
      {
        title: "المعلومات التي نجمعها",
        body: [
          "قد نجمع عنوان البريد الإلكتروني، وتفضيل اللغة، وحالة الاشتراك، ومعرفات الدفع من Stripe، ورسائل الدعم، وسجلات تقنية أساسية.",
          "تتم معالجة بيانات البطاقات بواسطة Stripe. لا نخزن أرقام البطاقات الكاملة على خوادمنا.",
        ],
      },
      {
        title: "كيف نستخدم المعلومات",
        body: [
          "نستخدم المعلومات لتوفير الوصول، وإرسال تحديثات الأبحاث، ومعالجة الاشتراكات، والتعامل مع طلبات الاسترداد، وتحسين الاعتمادية، ومنع إساءة الاستخدام، والرد على طلبات الدعم.",
          "لا نبيع المعلومات الشخصية.",
        ],
      },
      {
        title: "طلبات البيانات",
        body: [
          `لطلبات الخصوصية، تواصل معنا عبر ${CONTACT_EMAIL}. يرجى ذكر البريد المستخدم في الاشتراك حتى نتمكن من تحديد الحساب.`,
        ],
      },
    ],
  },
  "/risk": {
    eyebrow: "إفصاحات",
    title: "بيان المخاطر",
    intro: "ينطوي الاستثمار في توزيعات الأرباح على مخاطر مهمة. دخل التوزيعات غير مضمون، وقد تنخفض قيمة الأوراق المالية.",
    sections: [
      {
        title: "مخاطر السوق ورأس المال",
        body: [
          "قد تنخفض الأسهم وصناديق REIT وشركات BDC وشهادات ADR وغيرها من الأوراق المالية انخفاضا كبيرا، وقد تصل قيمتها إلى الصفر. الأداء السابق لا يتنبأ بالنتائج المستقبلية.",
          "قد يبدو العائد على التوزيعات مرتفعا لأن سعر السهم انخفض. العائد المرتفع لا يعني تلقائيا أن الاستثمار جذاب أو آمن.",
        ],
      },
      {
        title: "مخاطر التوزيعات",
        body: [
          "يمكن للشركات خفض التوزيعات أو تعليقها أو تأخيرها أو إلغاؤها في أي وقت. تاريخ التوزيعات لا يضمن المدفوعات المستقبلية.",
          "قد تؤثر الضرائب والعملات وأسعار الفائدة والائتمان والسيولة ومخاطر البلد في النتائج.",
        ],
      },
      {
        title: "لا توجد استشارة شخصية",
        body: [
          "أبحاثنا تعليمية وعامة. ليست مخصصة لظروفك الشخصية ولا ينبغي استخدامها كأساس وحيد لاتخاذ قرار استثماري.",
        ],
      },
    ],
  },
  "/refund": {
    eyebrow: "الاشتراك",
    title: "سياسة الاسترداد",
    intro: "نريد أن يتمكن المستخدمون من تقييم الأبحاث بهدوء. الاشتراك الحالي يتضمن ضمان استرداد خلال 30 يوما.",
    sections: [
      {
        title: "نافذة استرداد 30 يوما",
        body: [
          "إذا لم تكن راضيا، تواصل معنا خلال 30 يوما من أول دفعة واطلب الاسترداد.",
          "تتم إعادة المبالغ إلى وسيلة الدفع الأصلية عبر Stripe. قد تختلف مدة المعالجة حسب البنك ومزود البطاقة.",
        ],
      },
      {
        title: "إلغاء الاشتراك",
        body: [
          "يمكنك إلغاء التجديدات المستقبلية. الإلغاء يوقف الفوترة المستقبلية، لكنه لا يعني تلقائيا رد الرسوم السابقة خارج نافذة الاسترداد المحددة.",
        ],
      },
      {
        title: "كيفية طلب الاسترداد",
        body: [
          `راسل ${CONTACT_EMAIL} من البريد المستخدم في الشراء واكتب “Refund request” في عنوان الرسالة.`,
        ],
      },
    ],
  },
  "/arabic-support": {
    eyebrow: "الدعم",
    title: "الدعم باللغة العربية",
    intro: "يتوفر الدعم باللغة العربية للوصول إلى المنصة، والتنقل في الأبحاث، وأسئلة الفوترة، والمساعدة العامة في المنتج.",
    sections: [
      {
        title: "كيف يمكننا المساعدة",
        body: [
          "نساعد في الوصول إلى الحساب، ومشكلات الدفع، وإعدادات اللغة، والتنقل داخل الأبحاث، وفهم طريقة قراءة المنهجية.",
          "الدعم باللغة العربية لا يشمل استشارات استثمارية شخصية أو توصيات.",
        ],
      },
      {
        title: "تواصل",
        body: [
          `راسل ${CONTACT_EMAIL}. يمكنك الكتابة بالعربية أو الإنجليزية.`,
        ],
      },
    ],
  },
  "/contact": {
    eyebrow: "تواصل",
    title: "تواصل معنا",
    intro: CONTACT_EMAIL,
    sections: [],
  },
  "/about": {
    eyebrow: "الشركة",
    title: "من نحن",
    intro: "تركز Aristocrat Dividend Research على التحليل المالي التعليمي للمستثمرين المهتمين بالدخل.",
    sections: [
      {
        title: "ماذا نفعل",
        body: [
          "عملنا لسنوات في التحليل المالي، وعمليات الفرز، وسير عمل الأبحاث، وبيانات السوق. تحول المنصة هذه الخبرة إلى أبحاث منظمة عن شركات توزيعات الأرباح للمستثمرين الذين يريدون عملية منضبطة.",
          "نركز على تاريخ التوزيعات، وانضباط الدفع، وسياق الميزانية، وسياق التقييم، والتعرض للعملات، ومتانة الأعمال على المدى الطويل.",
        ],
      },
      {
        title: "ما الذي لا نفعله",
        body: [
          "لا نقدم استشارات استثمارية شخصية. لا ندير الأموال، ولا ننفذ الصفقات، ولا نقول للمستخدمين ماذا يشترون أو يبيعون.",
          "دورنا هو التعليم والبحث ودعم عملية القرار. تبقى قراراتك المالية مسؤوليتك.",
        ],
      },
    ],
  },
};

const pagesByLang: Record<Lang, Record<string, Page>> = {
  en: enPages,
  pl: plPages,
  ar: arPages,
};

export function StaticPage({ path }: { path: string }) {
  const { lang } = useT();
  const localizedPages = pagesByLang[lang] ?? enPages;
  const page = localizedPages[path] ?? localizedPages["/about"];
  const homeLabel = lang === "pl" ? "Strona główna" : lang === "ar" ? "الرئيسية" : "Home";
  return (
    <main
      className="min-h-screen pt-28 pb-16"
      style={{
        background: "linear-gradient(180deg, var(--aris-paper-2) 0%, #f5ecd4 55%, var(--aris-paper) 100%)",
      }}
    >
      <div className="mx-auto max-w-[900px] px-4 sm:px-7">
        <a href="/" className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)]">
          {lang === "ar" ? `${homeLabel} →` : `← ${homeLabel}`}
        </a>
        <div className="mt-8">
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="font-serif-display text-[34px] sm:text-[46px] text-[var(--aris-ink)] my-5">{page.title}</h1>
          <p className="text-[17px] leading-relaxed text-[var(--aris-muted)] max-w-2xl">{page.intro}</p>
        </div>

        <div className="mt-10 rounded-xl border border-[var(--aris-line)] bg-[var(--aris-offwhite)] px-5 sm:px-7 py-6 sm:py-8">
          {page.sections.length === 0 ? (
            <p className="font-mono-mark text-[15px] text-[var(--aris-ink)]">{page.intro}</p>
          ) : (
            <div className="space-y-8">
              {page.sections.map(section => (
                <section key={section.title}>
                  <h2 className="font-serif-display text-[22px] text-[var(--aris-ink)] mb-3">{section.title}</h2>
                  <div className="space-y-3 text-[14.5px] leading-relaxed text-[var(--aris-muted)]">
                    {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
