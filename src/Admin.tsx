import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Sub = {
  email: string;
  lang: string;
  created_at: number;
  last_sent_at: number | null;
};
type Resp = { count: number; last_run_at: number | null; subscribers: Sub[] };

const fmtDate = (ms: number | null) =>
  ms == null ? "—" : new Date(ms).toLocaleString();

export function Admin() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem("admin_token") ?? "");
  const [data, setData] = useState<Resp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function withToken(url: string) {
    return token ? `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}` : url;
  }

  async function load() {
    setError(null);
    try {
      const res = await fetch(withToken("/api/admin/subscribers"));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = (await res.json()) as Resp;
      setData(j);
    } catch (e) {
      setError(String(e));
    }
  }

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("admin_token", token);
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function dryRun(only?: string) {
    setBusy(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ dry: "true" });
      if (only) qs.set("only", only);
      const res = await fetch(withToken(`/api/admin/send?${qs}`), { method: "POST" });
      const j = await res.json();
      alert(`Dry run: ${JSON.stringify(j)}`);
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function sendReal(only?: string) {
    if (!confirm(only ? `Send digest to ${only}?` : "Send digest to ALL subscribers now?")) return;
    setBusy(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (only) qs.set("only", only);
      const res = await fetch(withToken(`/api/admin/send${qs.toString() ? `?${qs}` : ""}`), { method: "POST" });
      const j = await res.json();
      alert(`Send: ${JSON.stringify(j)}`);
      load();
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <header className="mb-6 flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Admin</h1>
        <a href="/" className="text-sm text-muted-foreground hover:underline">← back</a>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Auth</CardTitle>
          <CardDescription>
            If <code>ADMIN_TOKEN</code> env var is set on the server, paste it here. Otherwise leave empty.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="admin token (or empty)"
            className="max-w-md"
          />
          <Button onClick={load}>Load</Button>
        </CardContent>
      </Card>

      {error && (
        <div className="mb-4 rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {data && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Subscribers ({data.count})</CardTitle>
              <CardDescription>
                Last weekly job ran: <strong>{fmtDate(data.last_run_at)}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" disabled={busy} onClick={() => dryRun()}>Dry run (all)</Button>
                <Button disabled={busy} onClick={() => sendReal()}>Send now (all)</Button>
                <a href={withToken("/api/admin/preview?lang=en")} target="_blank" rel="noopener" className="inline-flex items-center px-3 h-9 rounded-md border text-sm hover:bg-muted">Preview EN</a>
                <a href={withToken("/api/admin/preview?lang=pl")} target="_blank" rel="noopener" className="inline-flex items-center px-3 h-9 rounded-md border text-sm hover:bg-muted">Preview PL</a>
                <a href={withToken("/api/admin/preview?lang=ar")} target="_blank" rel="noopener" className="inline-flex items-center px-3 h-9 rounded-md border text-sm hover:bg-muted">Preview AR</a>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase">
                    <tr>
                      <th className="px-3 py-2 text-start font-medium">Email</th>
                      <th className="px-3 py-2 text-start font-medium">Lang</th>
                      <th className="px-3 py-2 text-start font-medium">Subscribed</th>
                      <th className="px-3 py-2 text-start font-medium">Last sent</th>
                      <th className="px-3 py-2 text-start font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subscribers.map(s => (
                      <tr key={s.email} className="border-t">
                        <td className="px-3 py-2 font-mono">{s.email}</td>
                        <td className="px-3 py-2 uppercase">{s.lang}</td>
                        <td className="px-3 py-2">{fmtDate(s.created_at)}</td>
                        <td className="px-3 py-2">{fmtDate(s.last_sent_at)}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" disabled={busy} onClick={() => dryRun(s.email)}>Dry</Button>
                            <Button size="sm" disabled={busy} onClick={() => sendReal(s.email)}>Send</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {data.subscribers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">No subscribers yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
