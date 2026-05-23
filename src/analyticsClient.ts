type ClientEvent = {
  type: string;
  path?: string;
  referrer?: string;
  targetTag?: string;
  targetText?: string;
  targetHref?: string;
  metadata?: Record<string, unknown>;
};

const VISITOR_KEY = "aristo_visitor_id";
const SESSION_KEY = "aristo_session_id";

function id() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function storedId(key: string) {
  try {
    let value = localStorage.getItem(key);
    if (!value) {
      value = id();
      localStorage.setItem(key, value);
    }
    return value;
  } catch {
    return id();
  }
}

function sessionId() {
  try {
    let value = sessionStorage.getItem(SESSION_KEY);
    if (!value) {
      value = id();
      sessionStorage.setItem(SESSION_KEY, value);
    }
    return value;
  } catch {
    return id();
  }
}

function currentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function post(payload: ClientEvent) {
  if (window.location.pathname.startsWith("/admin")) return;
  const body = JSON.stringify({
    visitorId: storedId(VISITOR_KEY),
    sessionId: sessionId(),
    path: payload.path ?? currentPath(),
    referrer: payload.referrer ?? document.referrer,
    ...payload,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/event", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function trackEvent(type: string, payload: Omit<ClientEvent, "type"> = {}) {
  post({ type, ...payload });
}

export function initAnalytics() {
  if (typeof window === "undefined") return;
  if ((window as unknown as { __aristoAnalytics?: boolean }).__aristoAnalytics) return;
  (window as unknown as { __aristoAnalytics?: boolean }).__aristoAnalytics = true;

  setTimeout(() => trackEvent("page_view"), 250);

  document.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target.closest("a,button") : null;
    if (!(target instanceof HTMLElement)) return;
    const text = target.innerText || target.getAttribute("aria-label") || target.getAttribute("title") || "";
    const href = target instanceof HTMLAnchorElement ? target.href : null;
    trackEvent("click", {
      targetTag: target.tagName.toLowerCase(),
      targetText: text,
      targetHref: href,
    });
  }, { capture: true });
}
