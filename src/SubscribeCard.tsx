import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useT, LANGS, type Lang } from "./i18n";

export function SubscribeCard() {
  const { t, lang } = useT();
  const [email, setEmail] = useState("");
  const [subLang, setSubLang] = useState<Lang>(lang);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "invalid">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: subLang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Card className="text-start">
      <CardHeader>
        <CardTitle>{t.subTitle}</CardTitle>
        <CardDescription>{t.subDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{t.subEmail}</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-64"
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
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? t.subSubmitting : t.subSubmit}
          </Button>
          {status === "success" && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400">{t.subSuccess}</span>
          )}
          {status === "error" && <span className="text-sm text-destructive">{t.subError}</span>}
          {status === "invalid" && <span className="text-sm text-destructive">{t.subInvalid}</span>}
        </form>
      </CardContent>
    </Card>
  );
}
