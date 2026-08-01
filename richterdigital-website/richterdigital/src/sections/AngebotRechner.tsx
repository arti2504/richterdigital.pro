import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Loader2, Check } from 'lucide-react';
import { useLang, tr } from '../i18n';
import { track, trackCustom, setUserData } from '../lib/pixel';

/**
 * Mehrstufige Anfrage statt leerem Nachrichtenfeld.
 *
 * Die ersten Schritte sind reine Klickfragen und springen von selbst weiter -
 * niemand muss tippen, bevor er sich entschieden hat. Erst am Ende kommen die
 * Kontaktdaten, und da hat der Besucher schon vier Entscheidungen investiert.
 */

const ACCESS_KEY = 'f29d119e-7534-481b-9109-e7b82dc2e8a6';
const CONTACT_EMAIL = 'richterdigitals@gmail.com';

const AngebotRechner = () => {
  const { lang } = useLang();

  const schritte = [
    {
      frage: tr(lang, 'Was brauchst du?', 'What do you need?'),
      feld: tr(lang, 'Vorhaben', 'Project'),
      optionen: [
        tr(lang, 'Eine neue Website', 'A new website'),
        tr(lang, 'Meine Website erneuern', 'Renew my website'),
        tr(lang, 'Einen Online-Shop', 'An online shop'),
        tr(lang, 'Eine App oder Web-App', 'An app or web app'),
      ],
    },
    {
      frage: tr(lang, 'Wie groß soll es werden?', 'How big should it be?'),
      feld: tr(lang, 'Umfang', 'Scope'),
      optionen: [
        tr(lang, 'Eine Seite reicht', 'One page is enough'),
        tr(lang, 'Ein paar Unterseiten', 'A few subpages'),
        tr(lang, 'Größer, mit vielen Seiten', 'Larger, with many pages'),
        tr(lang, 'Weiß ich noch nicht', 'I do not know yet'),
      ],
    },
    {
      frage: tr(lang, 'Was hast du schon?', 'What do you already have?'),
      feld: tr(lang, 'Bestand', 'Existing'),
      optionen: [
        tr(lang, 'Noch nichts, ich fange bei null an', 'Nothing yet, starting from zero'),
        tr(lang, 'Eine Domain habe ich', 'I have a domain'),
        tr(lang, 'Website ist da, aber veraltet', 'Site exists, but outdated'),
      ],
    },
    {
      frage: tr(lang, 'Wer kümmert sich später darum?', 'Who takes care of it later?'),
      feld: tr(lang, 'Betreuung', 'Maintenance'),
      optionen: [
        tr(lang, 'Das sollst du übernehmen', 'You should handle it'),
        tr(lang, 'Mache ich selbst', 'I will do it myself'),
        tr(lang, 'Weiß ich noch nicht', 'I do not know yet'),
      ],
    },
  ];

  const [schritt, setSchritt] = useState(0);
  const [antworten, setAntworten] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [fertig, setFertig] = useState(false);

  const gesamt = schritte.length + 1; // Fragen plus Kontaktschritt

  const waehlen = (wert: string) => {
    const neu = [...antworten];
    neu[schritt] = wert;
    setAntworten(neu);
    if (schritt === 0) trackCustom('RechnerStart');
    trackCustom('RechnerSchritt', { schritt: schritt + 1, antwort: wert });
    setSchritt(schritt + 1);
  };

  const zurueck = () => setSchritt(Math.max(0, schritt - 1));

  const absenden = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData();
    fd.append('access_key', ACCESS_KEY);
    fd.append('from_name', 'Richter Digital Angebotsrechner');
    fd.append('subject', `${tr(lang, 'Neue Anfrage', 'New request')}: ${antworten[0] ?? ''}`);
    fd.append('name', name);
    fd.append('email', email);
    if (telefon) fd.append(tr(lang, 'Telefon', 'Phone'), telefon);
    schritte.forEach((s, i) => fd.append(s.feld, antworten[i] ?? tr(lang, 'keine Angabe', 'not provided')));
    fd.append('botcheck', '');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setFertig(true);
        const [vn, ...rest] = name.trim().split(/\s+/);
        setUserData({ em: email, fn: vn, ln: rest.join(' ') });
        track('Lead', {
          content_name: 'Angebotsrechner',
          content_category: antworten[0] ?? 'unspecified',
          currency: 'EUR',
        });
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const feld = 'w-full bg-white border border-ink/15 rounded-xl px-4 py-3.5 text-ink text-[15px] focus:outline-none focus:border-electric transition-colors placeholder:text-ink/40';

  if (fertig) {
    return (
      <div className="mt-12 bg-paper border border-ink/10 rounded-2xl p-8 md:p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-electric" />
        </div>
        <p className="font-display font-bold" style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}>
          {tr(lang, 'Angekommen. Danke!', 'Received. Thank you!')}
        </p>
        <p className="mt-3 text-ink/65 max-w-[420px] mx-auto" style={{ lineHeight: 1.6 }}>
          {tr(lang,
            'Ich schaue mir deine Angaben an und melde mich innerhalb von 24 Stunden mit einem Vorschlag.',
            'I will look at your answers and get back to you within 24 hours with a proposal.')}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-paper border border-ink/10 rounded-2xl p-6 sm:p-9 shadow-sm">
      {/* Fortschritt */}
      <div className="flex items-center gap-2">
        {Array.from({ length: gesamt }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: i <= schritt ? '#0711ff' : '#E6E6E9' }}
          />
        ))}
      </div>
      <p className="mt-3 font-mono-label text-ink/45">
        {tr(lang, 'Schritt', 'Step')} {schritt + 1} {tr(lang, 'von', 'of')} {gesamt}
      </p>

      {schritt < schritte.length ? (
        <div className="mt-5">
          <p className="font-display font-bold" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.2 }}>
            {schritte[schritt].frage}
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {schritte[schritt].optionen.map((o) => (
              <button
                key={o}
                onClick={() => waehlen(o)}
                className="text-left px-5 py-4 rounded-xl border border-ink/12 bg-paper hover:border-electric hover:bg-electric/5 transition-colors font-display font-semibold text-[15px] min-h-[56px]"
              >
                {o}
              </button>
            ))}
          </div>
          {schritt > 0 && (
            <button onClick={zurueck} className="mt-6 inline-flex items-center gap-2 text-ink/50 hover:text-ink text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> {tr(lang, 'Zurück', 'Back')}
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={absenden} className="mt-5">
          <p className="font-display font-bold" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.2 }}>
            {tr(lang, 'Wohin soll der Vorschlag?', 'Where should the proposal go?')}
          </p>
          <p className="mt-2 text-ink/60 text-sm">
            {tr(lang, 'Ich melde mich innerhalb von 24 Stunden. Kostenlos und unverbindlich.',
                   'I get back to you within 24 hours. Free and without obligation.')}
          </p>

          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div className="mt-5 space-y-3">
            <div>
              <label htmlFor="ar-name" className="font-mono-label text-ink/55 block mb-1.5">{tr(lang, 'Name', 'Name')}</label>
              <input id="ar-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={feld} placeholder={tr(lang, 'Dein Name', 'Your name')} />
            </div>
            <div>
              <label htmlFor="ar-mail" className="font-mono-label text-ink/55 block mb-1.5">{tr(lang, 'E-Mail', 'Email')} *</label>
              <input id="ar-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={feld} placeholder="name@firma.de" />
            </div>
            <div>
              <label htmlFor="ar-tel" className="font-mono-label text-ink/55 block mb-1.5">
                {tr(lang, 'Telefon', 'Phone')} <span className="text-ink/35">{tr(lang, '(optional)', '(optional)')}</span>
              </label>
              <input id="ar-tel" type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} autoComplete="tel" className={feld} placeholder={tr(lang, 'falls du lieber telefonierst', 'if you prefer a call')} />
            </div>
          </div>

          {status === 'error' && (
            <p className="mt-4 text-center text-sm text-red-600">
              {tr(lang, 'Da ist etwas schiefgelaufen. Schreib mir direkt: ', 'Something went wrong. Email me directly: ')}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
            </p>
          )}

          <button type="submit" disabled={status === 'sending'} className="mt-6 w-full py-4 bg-electric text-white font-display font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-electric-dark transition-colors">
            {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {status === 'sending' ? tr(lang, 'Wird gesendet…', 'Sending…') : tr(lang, 'Vorschlag anfordern', 'Request proposal')}
          </button>

          <div className="mt-4 flex items-center justify-between gap-4">
            <button type="button" onClick={zurueck} className="inline-flex items-center gap-2 text-ink/50 hover:text-ink text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> {tr(lang, 'Zurück', 'Back')}
            </button>
            <p className="text-xs text-ink/45 text-right">
              {tr(lang, 'Deine Angaben nutze ich nur für deine Anfrage. ', 'I use your details only for your request. ')}
              <Link to="/privacy" className="underline hover:text-ink/70">{tr(lang, 'Datenschutz', 'Privacy')}</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default AngebotRechner;
