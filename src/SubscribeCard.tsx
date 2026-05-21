import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useT, LANGS, type Lang } from "./i18n";

type Currency = "usd" | "pln" | "aed" | "sar" | "qar";

const CURRENCIES: { code: Currency; label: string; price: string }[] = [
  { code: "usd", label: "USD", price: "$5" },
  { code: "aed", label: "AED", price: "19 AED" },
  { code: "sar", label: "SAR", price: "19 SAR" },
  { code: "qar", label: "QAR", price: "19 QAR" },
  { code: "pln", label: "PLN", price: "19 zł" },
];

function defaultCurrency(lang: Lang): Currency {
  if (lang === "pl") return "pln";
  if (lang === "ar") return "aed";
  return "usd";
}

export function SubscribeCard() {
  const { t, lang } = useT();
  const [email, setEmail] = useState("");
  const [subLang, setSubLang] = useState<Lang>(lang);
  const [currency, setCurrency] = useState<Currency>(defaultCurrency(lang));
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error" | "invalid" | "paid_success" | "paid_canceled"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setSubLang(lang);
    setCurrency(defaultCurrency(lang));
  }, [lang]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get("paid");
    if (paid === "success") setStatus("paid_success");
    else if (paid === "canceled") setStatus("paid_canceled");
    if (paid) {
      // clean query
      const u = new URL(window.location.href);
      u.searchParams.delete("paid");
      window.history.replaceState({}, "", u.toString());
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: subLang, currency }),
      });
      const j = await res.json();
      if (!res.ok || !j.url) throw new Error(j?.error ?? `HTTP ${res.status}`);
      window.location.href = j.url; // redirect to Stripe Checkout
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <Card id="subscribe" className="text-start">
      <CardHeader>
        <CardTitle>{t.subTitle}</CardTitle>
        <CardDescription>{t.subDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "paid_success" && (
          <div className="mb-4 rounded-md border border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
            {t.subSuccess}
          </div>
        )}
        {status === "paid_canceled" && (
          <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40 px-3 py-2 text-sm text-amber-800 dark:text-amber-200">
            Payment was canceled — you weren't charged.
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-end gap-3">
          <div className="flex flex-col gap-1 sm:w-64">
            <label className="text-xs text-muted-foreground">{t.subEmail}</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.subLang}</label>
            <select
              value={subLang}
              onChange={e => setSubLang(e.target.value as Lang)}
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              {LANGS.map(l => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Plan</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.price} / mo
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={status === "submitting"} className="bg-emerald-600 hover:bg-emerald-700">
            {status === "submitting" ? t.subSubmitting : t.pricingCta}
          </Button>
        </form>

        {status === "invalid" && <p className="mt-3 text-sm text-destructive">{t.subInvalid}</p>}
        {status === "error" && (
          <p className="mt-3 text-sm text-destructive">
            {t.subError}
            {errorMsg ? ` (${errorMsg})` : ""}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
