import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    // Nur zeigen, wenn noch keine Entscheidung gespeichert ist.
    if (!getConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!TRACKING_ENABLED || !visible) return null;

  const decide = (marketing: boolean) => {
    setConsent(marketing);
    setVisible(false);
  };

  const btn = 'flex-1 sm:flex-none px-6 py-3 rounded-full font-display font-bold text-[14px] transition-colors whitespace-nowrap';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={tr(lang, 'Hinweis zum Datenschutz', 'Privacy notice')}
      className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-5"
    >
      <div className="max-w-[880px] mx-auto bg-ink text-white rounded-2xl border border-white/12 shadow-2xl p-5 sm:p-6">
        <p className="font-display font-bold text-[16px] mb-2">
          {tr(lang, 'Darf es ein Cookie sein?', 'May we use cookies?')}
        </p>
        <p className="text-white/70 text-sm" style={{ lineHeight: 1.6 }}>
          {tr(lang,
            'Technisch notwendige Cookies brauchen wir, damit die Seite funktioniert. Zusätzlich möchten wir den Meta-Pixel (Facebook/Instagram) einsetzen, um zu messen, welche unserer Anzeigen funktionieren. Dabei werden Daten an Meta in die USA übertragen. Das passiert nur mit deiner Einwilligung, und du kannst sie jederzeit widerrufen.',
            'We need technically necessary cookies for the site to work. In addition we would like to use the Meta pixel (Facebook/Instagram) to measure which of our ads work. This transfers data to Meta in the USA. It only happens with your consent, and you can withdraw it at any time.')}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <button onClick={() => decide(true)} className={`${btn} bg-electric text-white hover:bg-electric-dark`}>
            {tr(lang, 'Alle akzeptieren', 'Accept all')}
          </button>
          <button onClick={() => decide(false)} className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
            {tr(lang, 'Nur notwendige', 'Necessary only')}
          </button>
          <Link
            to="/privacy"
            onClick={() => setVisible(false)}
            className="text-white/55 hover:text-white text-xs underline underline-offset-4 sm:ml-auto text-center"
          >
            {tr(lang, 'Datenschutzerklärung', 'Privacy policy')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
