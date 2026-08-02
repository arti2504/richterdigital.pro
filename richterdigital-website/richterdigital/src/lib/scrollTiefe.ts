import { trackCustom } from './pixel';

/**
 * Scrolltiefe und Absprungpunkt melden.
 *
 * Bisher war zwischen dem Seitenaufruf und dem Angebots-Abschnitt nichts
 * gemessen. Wer vorher abgesprungen ist, tauchte nur als Fehlbetrag auf, ohne
 * dass erkennbar war, an welcher Stelle.
 *
 * Zwei Ereignisse:
 *   ScrollTiefe      bei 25, 50, 75 und 90 Prozent, je einmal pro Aufruf
 *   SeiteVerlassen   einmal beim Verlassen, mit der tiefsten erreichten Stelle
 *
 * Beide laufen ueber trackCustom und damit nur bei erteilter Einwilligung.
 */

const SCHWELLEN = [25, 50, 75, 90] as const;

/** Abschnitte in der Reihenfolge, in der sie auf der Startseite stehen. */
const ABSCHNITTE = [
  'intro', 'services', 'designs', 'portfolio', 'stimmen',
  'pricing', 'ablauf', 'faq', 'about', 'contact',
] as const;

function aktuelleTiefe(): number {
  const hoehe = document.documentElement.scrollHeight - window.innerHeight;
  if (hoehe <= 0) return 100;
  return Math.min(100, Math.round((window.scrollY / hoehe) * 100));
}

/** Letzter Abschnitt, dessen Oberkante die Bildschirmmitte passiert hat. */
function sichtbarerAbschnitt(): string {
  const mitte = window.innerHeight / 2;
  let treffer = 'hero';
  for (const id of ABSCHNITTE) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= mitte) treffer = id;
  }
  return treffer;
}

export function scrollTiefeMessen(): () => void {
  let maxTiefe = 0;
  let tiefsterAbschnitt = 'hero';
  let verlassenGemeldet = false;
  const start = Date.now();

  // Schwellen, die noch nicht erfolgreich gesendet wurden. Erst bei einem
  // echten true streichen, sonst geht die Meldung verloren, solange die
  // Einwilligung noch fehlt.
  const offen = new Set<number>(SCHWELLEN);

  let geplant = false;
  const messen = () => {
    geplant = false;
    const tiefe = aktuelleTiefe();
    if (tiefe > maxTiefe) {
      maxTiefe = tiefe;
      tiefsterAbschnitt = sichtbarerAbschnitt();
    }
    for (const schwelle of SCHWELLEN) {
      if (maxTiefe >= schwelle && offen.has(schwelle)) {
        if (trackCustom('ScrollTiefe', { prozent: schwelle })) offen.delete(schwelle);
      }
    }
  };

  const beiScroll = () => {
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(messen);
  };

  const beimVerlassen = () => {
    if (verlassenGemeldet) return;
    messen();
    const gesendet = trackCustom('SeiteVerlassen', {
      // Zehnerstufen statt roher Prozentwerte, sonst laesst sich die
      // Aufschluesselung im Events Manager nicht sinnvoll gruppieren.
      tiefe: `${Math.min(100, Math.round(maxTiefe / 10) * 10)}%`,
      abschnitt: tiefsterAbschnitt,
      sekunden: Math.round((Date.now() - start) / 1000),
    });
    if (gesendet) verlassenGemeldet = true;
  };

  // visibilitychange ist der zuverlaessige Weg auf dem Handy, pagehide faengt
  // die Faelle ab, in denen die Seite direkt entladen wird.
  const beiSichtbarkeit = () => {
    if (document.visibilityState === 'hidden') beimVerlassen();
  };

  window.addEventListener('scroll', beiScroll, { passive: true });
  document.addEventListener('visibilitychange', beiSichtbarkeit);
  window.addEventListener('pagehide', beimVerlassen);

  messen();

  return () => {
    window.removeEventListener('scroll', beiScroll);
    document.removeEventListener('visibilitychange', beiSichtbarkeit);
    window.removeEventListener('pagehide', beimVerlassen);
  };
}
