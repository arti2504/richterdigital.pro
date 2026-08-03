/**
 * Meta Pixel - laedt ausschliesslich nach erteilter Marketing-Einwilligung.
 *
 * ===================================================================
 *  HIER DIE PIXEL-ID EINTRAGEN (Meta Events Manager > Datenquellen).
 *  Solange das Feld leer ist, wird nichts geladen und nichts gesendet,
 *  und das Cookie-Banner bleibt aus.
 * ===================================================================
 */
// Typ bewusst als string (nicht als Literal), damit die Pruefung unten
// unabhaengig vom eingetragenen Wert kompiliert.
export const META_PIXEL_ID: string = '4331807687032584';

export const TRACKING_ENABLED = META_PIXEL_ID !== '';

import { CONSENT_EVENT, hasMarketingConsent, type ConsentState } from './consent';

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: unknown;
    };
    _fbq?: unknown;
  }
}

/** Nutzerdaten fuer Advanced Matching (Meta hasht sie im Browser selbst). */
export type UserData = {
  em?: string;   // E-Mail
  fn?: string;   // Vorname
  ln?: string;   // Nachname
};

let injected = false;
let pendingUserData: UserData | undefined;

/**
 * Eindeutige Event-ID. Meta nutzt sie zur Deduplizierung, wenn dasselbe
 * Ereignis zusaetzlich server-seitig (Conversions API) gemeldet wird.
 * Ohne diese ID wuerde ein Lead doppelt gezaehlt.
 */
function newEventId(): string {
  if (crypto?.randomUUID) return crypto.randomUUID();
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return Array.from(b, (n) => n.toString(16).padStart(2, '0')).join('');
}

function injectPixel(): void {
  if (injected || !META_PIXEL_ID) return;
  injected = true;

  /* Offizieller Meta-Basis-Code: Aufrufe werden gepuffert, bis fbevents.js geladen ist. */
  type Fbq = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    loaded: boolean;
    version: string;
    push?: unknown;
  };
  const fbq = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);

  // Bereits bekannte Nutzerdaten direkt mitgeben (bessere Zuordnung).
  if (pendingUserData) fbq('init', META_PIXEL_ID, pendingUserData);
  else fbq('init', META_PIXEL_ID);

  fbq('track', 'PageView', {}, { eventID: newEventId() });
}

/**
 * Beim Start aufrufen: laedt den Pixel sofort, falls die Einwilligung schon
 * vorliegt, und reagiert danach auf Aenderungen.
 */
export function initPixel(): void {
  if (!TRACKING_ENABLED) return;
  if (hasMarketingConsent()) injectPixel();
  window.addEventListener(CONSENT_EVENT, (e) => {
    const state = (e as CustomEvent<ConsentState>).detail;
    if (state?.marketing) injectPixel();
  });
}

/**
 * Advanced Matching: E-Mail und Name aus dem Formular an Meta uebergeben.
 * Meta normalisiert und hasht die Werte im Browser (SHA-256), der Klartext
 * verlaesst das Geraet nicht. Deutlich hoehere Trefferquote bei der Zuordnung
 * von Anfragen zu Anzeigen.
 */
export function setUserData(data: UserData): void {
  const clean: UserData = {};
  if (data.em?.trim()) clean.em = data.em.trim().toLowerCase();
  if (data.fn?.trim()) clean.fn = data.fn.trim().toLowerCase();
  if (data.ln?.trim()) clean.ln = data.ln.trim().toLowerCase();
  if (!Object.keys(clean).length) return;

  pendingUserData = { ...pendingUserData, ...clean };
  if (!hasMarketingConsent() || !window.fbq) return;
  window.fbq('init', META_PIXEL_ID, pendingUserData);
}

/**
 * Standard-Event melden - nur bei erteilter Einwilligung.
 * Gibt zurueck, ob das Event tatsaechlich gesendet wurde. Aufrufer, die ein
 * Event nur einmal senden wollen, duerfen ihren Merker erst bei `true`
 * setzen - sonst geht das Event verloren, wenn die Einwilligung noch fehlte.
 */
export function track(
  event: 'Lead' | 'Contact' | 'ViewContent' | 'InitiateCheckout',
  params?: Record<string, unknown>,
): boolean {
  if (!hasMarketingConsent() || !window.fbq) return false;
  window.fbq('track', event, params ?? {}, { eventID: newEventId() });
  return true;
}

/** Eigenes Event melden (z. B. Klick auf ein Paket). */
export function trackCustom(event: string, params?: Record<string, unknown>): boolean {
  if (!hasMarketingConsent() || !window.fbq) return false;
  window.fbq('trackCustom', event, params ?? {}, { eventID: newEventId() });
  return true;
}

/**
 * Geschaetzter Auftragswert je Budget-Angabe im Formular.
 * Damit kann Meta auf Anfragen mit hoeherem Wert hin optimieren, statt jeden
 * Lead gleich zu behandeln. Konservativ an den Paketpreisen orientiert.
 *
 * Derzeit ungenutzt: Der Rechner fragt kein Budget mehr ab, das Lead-Event
 * geht ohne Wert raus. Bleibt fuer den Fall, dass die Frage zurueckkommt.
 */
export function estimateLeadValue(budgetLabel: string): number {
  // Die Auswahl sind Spannen ("3.000 bis 8.000 EUR"), also steht in jedem
  // Label mehr als eine Zahl. Deshalb die UNTERGRENZE auswerten, nicht
  // irgendeine Zahl: sonst zaehlt "1.000 bis 3.000" wie "3.000 bis 8.000".
  if (/unter|under/i.test(budgetLabel)) return 399;
  const ohneTausenderpunkt = budgetLabel.replace(/[.,](?=\d{3})/g, '');
  const untergrenze = parseInt(ohneTausenderpunkt.match(/\d+/)?.[0] ?? '', 10);
  if (Number.isNaN(untergrenze)) return 399; // "Keine Angabe"
  if (untergrenze >= 8000) return 5000;
  if (untergrenze >= 3000) return 1890;
  if (untergrenze >= 1000) return 1290;
  return 399; // Starter-Paket als Untergrenze
}
