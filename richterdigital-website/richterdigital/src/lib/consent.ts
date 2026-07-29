/**
 * Einwilligungsverwaltung (DSGVO Art. 6 Abs. 1 lit. a, § 25 TTDSG).
 *
 * Marketing-Tools dürfen erst nach ausdrücklicher Einwilligung geladen werden.
 * Die Entscheidung wird mit Zeitstempel gespeichert, damit sie nachweisbar ist.
 */

export type ConsentState = {
  necessary: true;
  marketing: boolean;
  ts: string;
  v: number;
};

const STORAGE_KEY = 'rd-consent';
const CONSENT_VERSION = 1;

/** Wird ausgelöst, sobald sich die Einwilligung ändert. */
export const CONSENT_EVENT = 'rd-consent-change';

export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // Bei neuer Version erneut fragen (z. B. wenn Tools dazukommen).
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasMarketingConsent(): boolean {
  return getConsent()?.marketing === true;
}

export function setConsent(marketing: boolean): void {
  const state: ConsentState = {
    necessary: true,
    marketing,
    ts: new Date().toISOString(),
    v: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Privater Modus o. Ä. — Einwilligung gilt dann nur für die Sitzung. */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
}

/**
 * Einwilligung zurückziehen. Marketing-Cookies von Meta werden entfernt;
 * die Seite wird neu geladen, damit bereits initialisierte Skripte verschwinden.
 */
export function revokeConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignorieren */ }
  ['_fbp', '_fbc'].forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`;
    document.cookie = `${name}=; Max-Age=0; path=/`;
  });
}
