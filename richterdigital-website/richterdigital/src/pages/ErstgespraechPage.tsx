import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight, Send, Loader2, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';
import { track, setUserData, estimateLeadValue } from '../lib/pixel';

/**
 * Zielseite fuer bezahlte Anzeigen.
 *
 * Bewusst ohne Navigationsmenue: Wer ueber eine Anzeige kommt, soll genau eine
 * Handlung vor sich haben. Jeder zusaetzliche Link ist ein Ausgang, fuer den
 * bereits Klickkosten bezahlt wurden.
 */

const ACCESS_KEY = 'f29d119e-7534-481b-9109-e7b82dc2e8a6';
const CONTACT_EMAIL = 'richterdigitals@gmail.com';

const Sterne = () => (
  <div className="flex gap-0.5" role="img" aria-label="5 von 5 Sternen">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const ErstgespraechPage = () => {
  const { lang } = useLang();
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projekt, setProjekt] = useState('');
  const [budget, setBudget] = useState('');
  const [nachricht, setNachricht] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [gesendet, setGesendet] = useState(false);

  /* Aufruf dieser Seite ist ein echtes Kaufsignal - sie wird nur ueber
     Anzeigen erreicht. Einmal pro Besuch melden. */
  useEffect(() => {
    const t = setTimeout(() => {
      track('ViewContent', { content_name: 'Landingpage Erstgespraech', content_category: 'lp' });
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  /* Eigener Seitentitel: Diese Seite ist eine andere Botschaft als die
     Startseite, und der Reiter ist das Erste, was nach dem Klick sichtbar wird. */
  useEffect(() => {
    const vorher = document.title;
    document.title = tr(lang,
      'Kostenloses Erstgespräch | Richter Digital',
      'Free first call | Richter Digital');
    return () => { document.title = vorher; };
  }, [lang]);

  const zumFormular = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const absenden = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData();
    fd.append('access_key', ACCESS_KEY);
    fd.append('from_name', 'Richter Digital Landingpage');
    fd.append('subject', `${tr(lang, 'Erstgespraech-Anfrage', 'Consultation request')}: ${projekt || tr(lang, 'Allgemein', 'General')}`);
    fd.append('name', name);
    fd.append('email', email);
    fd.append(tr(lang, 'Projektart', 'Project type'), projekt || tr(lang, 'keine Angabe', 'not provided'));
    fd.append('Budget', budget || tr(lang, 'keine Angabe', 'not provided'));
    fd.append(tr(lang, 'Nachricht', 'Message'), nachricht);
    fd.append('Quelle', 'Landingpage /erstgespraech');
    fd.append('botcheck', '');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setGesendet(true);
        const [vn, ...rest] = name.trim().split(/\s+/);
        setUserData({ em: email, fn: vn, ln: rest.join(' ') });
        track('Lead', {
          content_category: projekt || 'unspecified',
          content_name: 'Landingpage Erstgespraech',
          value: estimateLeadValue(budget),
          currency: 'EUR',
        });
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const PROJEKTARTEN = [
    tr(lang, 'Ich habe noch keine Website', 'I have no website yet'),
    tr(lang, 'Meine Website bringt zu wenig', 'My website underperforms'),
    tr(lang, 'Ich mache mich gerade selbststaendig', 'I am starting a business'),
    tr(lang, 'App oder Web-App', 'App or web app'),
    tr(lang, 'Noch unklar', 'Not sure yet'),
  ];
  const BUDGETS = [
    tr(lang, 'Unter 1.000 €', 'Under €1,000'),
    tr(lang, '1.000 bis 3.000 €', '€1,000 to €3,000'),
    tr(lang, '3.000 bis 8.000 €', '€3,000 to €8,000'),
    tr(lang, '8.000 € und mehr', '€8,000 and up'),
    tr(lang, 'Keine Angabe', 'Prefer not to say'),
  ];

  const feld = 'w-full bg-white border border-ink/15 rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-electric transition-colors placeholder:text-ink/40';

  const probleme = [
    {
      t: tr(lang, 'Sie ist zu langsam', 'It is too slow'),
      d: tr(lang, 'Jede Sekunde Ladezeit kostet Besucher. Wer drei Sekunden wartet, ist meist schon wieder weg — und landet beim Nächsten.',
             'Every second of load time costs visitors. Whoever waits three seconds is usually gone — and lands with the next provider.'),
    },
    {
      t: tr(lang, 'Sie sagt nicht, was du willst', 'It does not say what you want'),
      d: tr(lang, 'Kein klarer nächster Schritt, kein sichtbarer Kontakt. Besucher, die nicht wissen, was sie tun sollen, tun nichts.',
             'No clear next step, no visible contact. Visitors who do not know what to do, do nothing.'),
    },
    {
      t: tr(lang, 'Auf dem Handy fällt sie auseinander', 'It falls apart on mobile'),
      d: tr(lang, 'Die meisten schauen vom Handy. Wenn dort Text überlappt oder Knöpfe zu klein sind, ist der Eindruck sofort verbrannt.',
             'Most people look from their phone. If text overlaps or buttons are too small there, the impression is burnt instantly.'),
    },
  ];

  const stimmen = [
    {
      zitat: tr(lang,
        'Arthur hat die Ladezeiten meiner drei Shops deutlich verbessert und kümmert sich seitdem zuverlässig um die Technik. Ich muss mich um nichts kümmern und kann mich voll auf den Verkauf konzentrieren.',
        'Arthur significantly improved the load times of my three shops and has been reliably taking care of the tech ever since. I don’t have to worry about anything and can focus fully on selling.'),
      name: 'Oleg',
      rolle: tr(lang, 'Inhaber, Powercleany · Fitorb · SwiftPod', 'Owner, Powercleany · Fitorb · SwiftPod'),
      foto: '/images/refs/oleg.jpg',
    },
    {
      zitat: tr(lang,
        'Arthur hat meine Marke sofort verstanden. Die Design-Entwürfe für meine Website haben meine Erwartungen übertroffen, und die Zusammenarbeit ist unkompliziert und auf Augenhöhe.',
        'Arthur understood my brand right away. The design drafts for my website exceeded my expectations, and working together is easy and on equal footing.'),
      name: 'Rebecca',
      rolle: tr(lang, 'Gründerin, Soul of Frequency', 'Founder, Soul of Frequency'),
      foto: '/images/refs/becky.jpg',
    },
  ];

  const pakete = [
    { name: 'Starter', preis: '690 €', was: tr(lang, 'Eine starke Seite, die Anfragen bringt', 'One strong page that brings inquiries') },
    { name: 'Professional', preis: '1.290 €', was: tr(lang, 'Bis zu fünf Seiten, Texte, Rechtstexte, SEO-Grundlagen', 'Up to five pages, copy, legal texts, basic SEO'), top: true },
    { name: 'Premium', preis: tr(lang, 'ab 1.890 €', 'from €1,890'), was: tr(lang, 'Dazu Terminbuchung, Tool-Anbindung, Auswertungen', 'Plus booking, tool integrations, analytics') },
  ];

  const schritte = [
    { n: '01', t: tr(lang, 'Erstgespräch', 'First call'), d: tr(lang, 'Wir reden 20 Minuten über dein Geschäft und dein Ziel. Kostenlos, unverbindlich, ohne Verkaufsmasche.', 'We talk for 20 minutes about your business and your goal. Free, no obligation, no sales pitch.') },
    { n: '02', t: tr(lang, 'Angebot', 'Quote'), d: tr(lang, 'Du bekommst einen Festpreis und einen Termin. Keine Stundenzettel, keine Überraschungen.', 'You get a fixed price and a date. No timesheets, no surprises.') },
    { n: '03', t: tr(lang, 'Umsetzung', 'Build'), d: tr(lang, 'Ich baue und halte dich auf dem Laufenden. Du gibst das Design frei, bevor es weitergeht.', 'I build and keep you posted. You approve the design before it continues.') },
    { n: '04', t: tr(lang, 'Online', 'Live'), d: tr(lang, 'Deine Seite geht live. Auf Wunsch kümmere ich mich weiter um Technik und Updates.', 'Your site goes live. On request I keep handling tech and updates.') },
  ];

  return (
    <div className="bg-paper text-ink min-h-screen">
      {/* Kopf: nur Marke, kein Menue */}
      <header className="border-b border-ink/8">
        <div className="max-w-[1080px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="Richter Digital" className="w-8 h-8 object-contain" />
            <span className="font-display text-lg font-bold">Richter Digital</span>
          </Link>
          <span className="hidden sm:flex items-center gap-1.5 text-ink/55 text-xs">
            <MapPin className="w-3.5 h-3.5 text-electric" /> Bad Driburg
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-14 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-[840px] mx-auto text-center">
          <Reveal>
            <p className="font-mono-label text-electric mb-4">{tr(lang, 'Kostenloses Erstgespräch', 'Free first call')}</p>
            <h1 className="font-display font-bold" style={{ fontSize: 'clamp(32px, 5.6vw, 60px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              {lang === 'de'
                ? <>Eine Website, die <span className="mark-hl">Kunden bringt</span>.</>
                : <>A website that <span className="mark-hl">brings customers</span>.</>}
            </h1>
            <p className="mt-5 text-ink/70 mx-auto" style={{ fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.6, maxWidth: '38rem' }}>
              {tr(lang,
                'Zum Festpreis ab 690 €. Du redest direkt mit dem, der sie baut — keine Agentur, keine Warteschleife, keine Rechnung fürs Gespräch.',
                'At a fixed price from €690. You talk directly to the person who builds it — no agency, no hold music, no invoice for the call.')}
            </p>
            <button onClick={zumFormular} className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric text-white font-display font-bold rounded-full hover:bg-electric-dark transition-colors text-[16px]">
              {tr(lang, 'Kostenloses Erstgespräch sichern', 'Get your free first call')} <ArrowRight className="w-4 h-4" />
            </button>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-ink/55 text-sm">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-electric" />{tr(lang, '100 % kostenlos & unverbindlich', '100% free, no obligation')}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-electric" />{tr(lang, 'Antwort in 24 Stunden', 'Reply within 24 hours')}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-14 sm:py-20 bg-mist">
        <div className="max-w-[1080px] mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-center mx-auto" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', lineHeight: 1.15, maxWidth: '30rem' }}>
              {lang === 'de'
                ? <>Warum Websites <span className="mark-hl">keine Kunden bringen</span></>
                : <>Why websites <span className="mark-hl">bring no customers</span></>}
            </h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {probleme.map((p, i) => (
              <Reveal key={p.t} delay={i * 80}>
                <div className="h-full bg-paper rounded-2xl border border-ink/10 p-6">
                  <span className="font-display font-bold text-electric text-2xl">{`0${i + 1}`}</span>
                  <p className="mt-3 font-display font-bold" style={{ fontSize: '18px' }}>{p.t}</p>
                  <p className="mt-2 text-ink/70 text-sm" style={{ lineHeight: 1.6 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kundenstimmen */}
      <section className="px-6 py-14 sm:py-20">
        <div className="max-w-[880px] mx-auto">
          <Reveal>
            <p className="font-mono-label text-electric mb-3 text-center">{tr(lang, 'Stimmen', 'Voices')}</p>
            <h2 className="font-display font-bold text-center" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', lineHeight: 1.15 }}>
              {tr(lang, 'Was Kunden sagen', 'What clients say')}
            </h2>
          </Reveal>
          <div className="mt-9 grid md:grid-cols-2 gap-5">
            {stimmen.map((s, i) => (
              <Reveal key={s.name} delay={i * 80}>
                <div className="h-full bg-paper rounded-2xl border border-ink/10 p-6 flex flex-col">
                  <Sterne />
                  <p className="mt-4 text-ink/80" style={{ fontSize: '16px', lineHeight: 1.6 }}>&ldquo;{s.zitat}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img src={s.foto} alt={s.name} loading="lazy" width={256} height={256} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="font-display font-semibold text-sm">{s.name}</p>
                      <p className="text-ink/55 text-xs">{s.rolle}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Echte Arbeit */}
      <section className="px-6 py-14 sm:py-20 bg-mist">
        <div className="max-w-[1080px] mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-center" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', lineHeight: 1.15 }}>
              {lang === 'de' ? <>Gebaut, gelauncht, <span className="mark-hl">in echten Händen</span></> : <>Built, launched, <span className="mark-hl">in real hands</span></>}
            </h2>
          </Reveal>
          <div className="mt-9 grid sm:grid-cols-3 gap-5">
            {[
              { n: 'Smile4Me', t: tr(lang, 'Android-App im Play Store', 'Android app on Google Play'), img: '/images/smile4me-screenshot1.png' },
              { n: 'Clio AI', t: tr(lang, 'KI-Schreibassistent, Web-App', 'AI writing assistant, web app'), img: '/images/clio-desktop.png' },
              { n: 'ThePackt', t: tr(lang, 'Community-Plattform', 'Community platform'), img: '/images/packt-desktop.png' },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <div className="bg-paper rounded-2xl border border-ink/10 overflow-hidden h-full">
                  <div className="aspect-[16/10] bg-mist overflow-hidden">
                    <img src={p.img} alt={p.n} loading="lazy" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5">
                    <p className="font-display font-bold" style={{ fontSize: '17px' }}>{p.n}</p>
                    <p className="text-ink/60 text-sm mt-0.5">{p.t}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-8 text-center text-ink/55 text-sm">
              {tr(lang, 'Dazu betreue ich laufend drei Online-Shops:', 'I also maintain three online shops:')}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {[
                { src: '/images/refs/powercleany.png', bg: '#F1F1F2', alt: 'Powercleany' },
                { src: '/images/refs/fitorb.png', bg: '#F1F1F2', alt: 'Fitorb' },
                { src: '/images/refs/swiftpod.png', bg: '#0B1022', alt: 'SwiftPod' },
              ].map((l) => (
                <div key={l.alt} className="flex items-center justify-center rounded-xl h-[58px] px-6 border border-ink/8" style={{ background: l.bg }}>
                  <img src={l.src} alt={l.alt} loading="lazy" className="max-h-[24px] w-auto object-contain" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pakete */}
      <section className="px-6 py-14 sm:py-20">
        <div className="max-w-[1080px] mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-center" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', lineHeight: 1.15 }}>
              {lang === 'de' ? <>Klare Preise, <span className="mark-hl">keine Überraschungen</span></> : <>Clear prices, <span className="mark-hl">no surprises</span></>}
            </h2>
            <p className="mt-4 text-center text-ink/65 mx-auto text-sm" style={{ maxWidth: '34rem' }}>
              {tr(lang, 'Damit du weißt, woran du bist — bevor wir überhaupt sprechen. Alle Preise zzgl. 19 % USt.',
                     'So you know where you stand — before we even talk. All prices plus 19% VAT.')}
            </p>
          </Reveal>
          <div className="mt-9 grid sm:grid-cols-3 gap-4">
            {pakete.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <div className={`h-full rounded-2xl p-6 text-center ${p.top ? 'bg-ink text-white shadow-xl' : 'bg-paper border border-ink/10'}`}>
                  <p className={`font-mono-label ${p.top ? 'text-electric-light' : 'text-electric'}`}>{p.name}</p>
                  <p className="mt-2 font-display font-bold" style={{ fontSize: '30px' }}>{p.preis}</p>
                  <p className={`mt-2 text-sm ${p.top ? 'text-white/75' : 'text-ink/65'}`} style={{ lineHeight: 1.5 }}>{p.was}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink/65">
              {[
                tr(lang, 'Festpreis statt Stundenzettel', 'Fixed price, not timesheets'),
                tr(lang, 'Rechtssicher mit Impressum & Datenschutz', 'Legally sound: imprint & privacy'),
                tr(lang, 'Für Handy, Tablet und Desktop', 'For phone, tablet and desktop'),
              ].map((f) => (
                <span key={f} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-electric" />{f}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ablauf */}
      <section className="px-6 py-14 sm:py-20 bg-mist">
        <div className="max-w-[1080px] mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-center" style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', lineHeight: 1.15 }}>
              {tr(lang, 'So läuft es ab', 'How it works')}
            </h2>
          </Reveal>
          <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {schritte.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="h-full">
                  <span className="font-display font-bold text-electric" style={{ fontSize: '15px' }}>{s.n}</span>
                  <p className="mt-1.5 font-display font-bold" style={{ fontSize: '17px' }}>{s.t}</p>
                  <p className="mt-1.5 text-ink/70 text-sm" style={{ lineHeight: 1.6 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wer ich bin */}
      <section className="px-6 py-14 sm:py-20">
        <div className="max-w-[820px] mx-auto grid sm:grid-cols-[160px_1fr] gap-8 items-center">
          <Reveal>
            <img src="/images/arthur.jpg" alt="Arthur Richter" loading="lazy" className="w-[160px] h-[160px] rounded-2xl object-cover mx-auto" />
          </Reveal>
          <Reveal delay={80}>
            <div>
              <p className="font-mono-label text-electric mb-2">{tr(lang, 'Wer das baut', 'Who builds it')}</p>
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', lineHeight: 1.2 }}>Arthur Richter</h2>
              <p className="mt-3 text-ink/70" style={{ fontSize: '16px', lineHeight: 1.65 }}>
                {tr(lang,
                  'Ich baue Websites, Landingpages und Apps aus Bad Driburg — für Betriebe, Praxen und Selbstständige in ganz Deutschland und Österreich. Du arbeitest direkt mit mir, nicht mit einem Projektmanager, der deine Wünsche weiterreicht. Ich nehme bewusst nur wenige Projekte gleichzeitig an, damit jedes die Zeit bekommt, die es braucht.',
                  'I build websites, landing pages and apps from Bad Driburg — for businesses, practices and freelancers across Germany and Austria. You work directly with me, not with a project manager passing on your wishes. I deliberately take on only a few projects at a time so each gets the time it needs.')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formular */}
      <section ref={formRef} className="px-6 py-14 sm:py-20 bg-navy-900">
        <div className="max-w-[620px] mx-auto">
          <Reveal>
            <h2 className="font-display font-bold text-cream text-center" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', lineHeight: 1.15 }}>
              {tr(lang, 'Lass uns 20 Minuten reden', 'Let us talk for 20 minutes')}
            </h2>
            <p className="mt-4 text-cream-muted text-center" style={{ fontSize: '16px', lineHeight: 1.6 }}>
              {tr(lang,
                'Erzähl kurz, worum es geht. Ich melde mich innerhalb von 24 Stunden mit einer ehrlichen Einschätzung — auch wenn die lautet, dass du gerade keine neue Website brauchst.',
                'Tell me briefly what it is about. I get back to you within 24 hours with an honest assessment — even if that means you do not need a new website right now.')}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 bg-paper rounded-2xl p-6 sm:p-8">
              {gesendet ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-electric" />
                  </div>
                  <p className="font-display font-bold" style={{ fontSize: '20px' }}>{tr(lang, 'Danke, ist angekommen.', 'Thanks, got it.')}</p>
                  <p className="mt-2 text-ink/65 text-sm">{tr(lang, 'Ich melde mich innerhalb von 24 Stunden bei dir.', 'I will get back to you within 24 hours.')}</p>
                </div>
              ) : (
                <form onSubmit={absenden} className="space-y-4">
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lp-name" className="font-mono-label text-ink/60 block mb-1.5">{tr(lang, 'Name', 'Name')}</label>
                      <input id="lp-name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={feld} placeholder={tr(lang, 'Dein Name', 'Your name')} />
                    </div>
                    <div>
                      <label htmlFor="lp-mail" className="font-mono-label text-ink/60 block mb-1.5">{tr(lang, 'E-Mail', 'Email')} *</label>
                      <input id="lp-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={feld} placeholder={tr(lang, 'damit ich antworten kann', 'so I can reply')} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lp-projekt" className="font-mono-label text-ink/60 block mb-1.5">{tr(lang, 'Was trifft auf dich zu?', 'What applies to you?')}</label>
                    <select id="lp-projekt" value={projekt} onChange={(e) => setProjekt(e.target.value)} className={feld}>
                      <option value="" disabled>{tr(lang, 'Bitte wählen…', 'Please choose…')}</option>
                      {PROJEKTARTEN.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lp-budget" className="font-mono-label text-ink/60 block mb-1.5">{tr(lang, 'Ungefähres Budget (optional)', 'Rough budget (optional)')}</label>
                    <select id="lp-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={feld}>
                      <option value="">{tr(lang, 'Keine Angabe', 'Prefer not to say')}</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="lp-nachricht" className="font-mono-label text-ink/60 block mb-1.5">{tr(lang, 'Worum geht es?', 'What is it about?')}</label>
                    <textarea id="lp-nachricht" rows={4} value={nachricht} onChange={(e) => setNachricht(e.target.value)} className={feld + ' resize-none'} placeholder={tr(lang, 'Ein, zwei Sätze reichen völlig.', 'One or two sentences are plenty.')} />
                  </div>

                  {status === 'error' && (
                    <p className="text-center text-sm text-red-600">
                      {tr(lang, 'Da ist etwas schiefgelaufen. Schreib mir direkt: ', 'Something went wrong. Email me directly: ')}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="w-full py-4 bg-electric text-white font-display font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 hover:bg-electric-dark transition-colors">
                    {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {status === 'sending' ? tr(lang, 'Wird gesendet…', 'Sending…') : tr(lang, 'Erstgespräch anfragen', 'Request first call')}
                  </button>

                  <p className="text-center text-xs text-ink/45" style={{ lineHeight: 1.5 }}>
                    {tr(lang, 'Deine Angaben nutze ich ausschließlich für deine Anfrage. Näheres in der ', 'I use your details solely for your inquiry. More in the ')}
                    <Link to="/privacy" className="underline hover:text-ink/70">{tr(lang, 'Datenschutzerklärung', 'privacy policy')}</Link>.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 py-8 bg-navy-900 border-t border-white/8">
        <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-cream-muted text-xs">
          <span>© {new Date().getFullYear()} Richter Digital · Arthur Richter</span>
          <span className="flex gap-5">
            <Link to="/impressum" className="hover:text-electric-light transition-colors">Impressum</Link>
            <Link to="/privacy" className="hover:text-electric-light transition-colors">{tr(lang, 'Datenschutz', 'Privacy')}</Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ErstgespraechPage;
