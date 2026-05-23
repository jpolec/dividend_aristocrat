const CONTACT_EMAIL = "support@dividendaristocrat.com";

type Page = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: Array<{ title: string; body: string[] }>;
};

const pages: Record<string, Page> = {
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

export function StaticPage({ path }: { path: string }) {
  const page = pages[path] ?? pages["/about"];
  return (
    <main
      className="min-h-screen pt-28 pb-16"
      style={{
        background: "linear-gradient(180deg, var(--aris-paper-2) 0%, #f5ecd4 55%, var(--aris-paper) 100%)",
      }}
    >
      <div className="mx-auto max-w-[900px] px-4 sm:px-7">
        <a href="/" className="text-sm text-[var(--aris-muted)] hover:text-[var(--aris-ink)]">← Home</a>
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
