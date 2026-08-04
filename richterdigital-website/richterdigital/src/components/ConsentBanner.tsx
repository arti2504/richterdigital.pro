import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang, tr } from '../i18n';
import { getConsent, setConsent, revokeConsent } from '../lib/consent';
import { TRACKING_ENABLED } from '../lib/pixel';

/** Öffnet das Banner erneut (z. B. über den Footer-Link). */
export const CONSENT_OPEN_EVENT = 'rd-consent-open';
export function openConsentSettings(): void {
  revokeConsent();
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

const ConsentBanner = () => {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const kasten = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    // Nur zeigen, wenn noch keine Entscheidung gespeichert ist.
    if (!getConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  /* Solange das Banner steht, bekommt die Seite unten so viel Luft, wie das
     Banner hoch ist. Sonst liegt der letzte Bildschirminhalt dauerhaft
     darunter und laesst sich nicht mehr hochscrollen. */
  useEffect(() => {
    if (!visible) return;
    const anpassen = () => {
      const h = kasten.current?.getBoundingClientRect().height ?? 0;
      document.body.style.paddingBottom = `${Math.ceil(h)}px`;
    };
    anpassen();
    window.addEventListener('resize', anpassen);
    return () => {
      window.removeEventListener('resize', anpassen);
      document.body.style.paddingBottom = '';
    };
  }, [visible, lang]);

  if (!TRACKING_ENABLED || !visible) return null;

  const decide = (marketing: boolean) => {
    setConsent(marketing);
    setVisible(false);
  };

  const btn = 'flex-1 px-4 sm:px-6 py-3 rounded-full font-display font-bold text-[14px] transition-colors whitespace-nowrap';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={tr(lang, 'Hinweis zum Datenschutz', 'Privacy notice')}
      className="fixed bottom-0 left-0 right-0 z-[60] p-2 sm:p-5"
    >
      {/* Bewusst knapp gehalten. In der langen Fassung war das Banner auf dem
          Handy 450 px hoch, also 55 % des Bildschirms, und hat den Absende-
          knopf des Rechners verdeckt. Ein Tipp darauf landete auf dem Banner.
          Die Pflichtangaben stehen weiterhin drin: notwendige Cookies, Meta-
          Pixel, Datenuebertragung in die USA, Freiwilligkeit und Widerruf.
          Die Einzelheiten stehen einen Klick entfernt in der Erklaerung. */}
      <div ref={kasten} className="max-w-[880px] mx-auto bg-ink text-white rounded-2xl border border-white/12 shadow-2xl p-4 sm:p-6">
        <p className="font-display font-bold text-[15px] sm:text-[16px] mb-1.5">
          {tr(lang, 'Darf es ein Cookie sein?', 'May we use cookies?')}
        </p>
        <p className="text-white/70 text-[13px] sm:text-sm" style={{ lineHeight: 1.5 }}>
          {tr(lang,
            'Notwendige Cookies halten die Seite am Laufen. Mit deiner Einwilligung kommt der Meta-Pixel dazu, dabei gehen Daten an Meta in die USA. Widerruf jederzeit möglich.',
            'Necessary cookies keep the site running. With your consent we also use the Meta pixel, which sends data to Meta in the USA. You can withdraw at any time.')}
        </p>

        <div className="mt-3.5 flex items-center gap-2 sm:gap-3">
          <button onClick={() => decide(true)} className={`${btn} bg-electric text-white hover:bg-electric-dark`}>
            {tr(lang, 'Alle akzeptieren', 'Accept all')}
          </button>
          <button onClick={() => decide(false)} className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
            {tr(lang, 'Nur notwendige', 'Necessary only')}
          </button>
        </div>
        <Link
          to="/privacy"
          onClick={() => setVisible(false)}
          className="mt-3 block text-white/55 hover:text-white text-xs underline underline-offset-4 text-center sm:text-left"
        >
          {tr(lang, 'Datenschutzerklärung', 'Privacy policy')}
        </Link>
      </div>
    </div>
  );
};

export default ConsentBanner;
