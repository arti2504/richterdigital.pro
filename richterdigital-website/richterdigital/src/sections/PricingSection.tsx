import { useEffect, useRef } from 'react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';
import AngebotRechner from './AngebotRechner';
import { track } from '../lib/pixel';

const PricingSection = () => {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  /* Ein Blick auf die Preise ist der wichtigste Zwischenschritt vor der Anfrage.
     Wird einmal pro Besuch gemeldet, sobald die Sektion wirklich sichtbar war —
     erst abschalten, wenn das Event auch wirklich rausging (Einwilligung!). */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sent = track('ViewContent', { content_name: 'Preise', content_category: 'pricing' });
          if (sent) io.unobserve(entry.target);
        });
      },
      /* threshold 0 + negativer rootMargin: die Sektion muss das mittlere
         Drittel des Bildschirms erreichen. Ein prozentualer threshold waere
         hier falsch — die Sektion ist hoeher als ein Handy-Display, 40 %
         davon werden auf dem Handy nie gleichzeitig sichtbar. */
      { threshold: 0, rootMargin: '-20% 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const care = [
    { name: 'Basis',   price: '29 €',  desc: tr(lang, 'Hosting, Updates, Sicherheit, Erreichbarkeit', 'Hosting, updates, security, uptime') },
    { name: 'Plus',    price: '59 €',  desc: tr(lang, 'zusätzlich kleine Änderungen inklusive (Bilder, Texte)', 'plus small changes included (images, copy)') },
    { name: 'Premium', price: '129 €', desc: tr(lang, 'laufende Pflege plus ein Blogartikel pro Monat', 'ongoing care plus one blog article per month') },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Angebot', 'Get a quote')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Vier Fragen, <span className="mark-hl">dann weißt du woran du bist</span>.</>
              : <>Four questions, <span className="mark-hl">then you know where you stand</span>.</>}
          </h2>
          <p className="mt-4 text-ink/70 font-sans max-w-[640px]" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Sag mir kurz, was du vorhast. Ich schicke dir einen Vorschlag mit Festpreis, damit du vorher weißt, was es kostet. Kostenlos und unverbindlich.',
              'Tell me briefly what you have in mind. I send you a proposal with a fixed price, so you know what it costs beforehand. Free and without obligation.')}
          </p>
        </Reveal>

        <AngebotRechner />

        {/* Zusatzleistung, die zu jedem Paket dazugehoert. Der durchgestrichene
            Preis ist echt: Die Analyse ist einzeln fuer 190 € buchbar. Ein
            erfundener Referenzpreis waere nach § 5 UWG abmahnfaehig. */}
        <Reveal delay={100}>
          <div className="mt-6 relative overflow-hidden rounded-2xl bg-navy-800 text-cream p-7 md:p-10">
            {/* Blauer Schein, damit der Block sich vom Rest der Seite abhebt */}
            <div
              className="absolute -top-28 -right-20 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(7,17,255,0.45), transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative md:flex md:items-center md:justify-between gap-10">
              <div className="max-w-[560px]">
                <span className="inline-block font-mono-label text-electric-light bg-electric/20 rounded-full px-3 py-1.5">
                  {tr(lang, 'Zu jedem Paket inklusive', 'Included with every package')}
                </span>
                <p className="mt-4 font-display font-bold" style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', lineHeight: 1.15 }}>
                  {tr(lang, 'Konkurrenzanalyse', 'Competitor analysis')}
                </p>
                <p className="mt-3 text-cream-muted" style={{ fontSize: '16px', lineHeight: 1.65 }}>
                  {tr(lang,
                    'Bevor ich anfange, schaue ich mir deine Mitbewerber an. Was sie online besser machen als du, und wo sie Lücken haben, die du nutzen kannst. Du bekommst das als PDF.',
                    'Before I start, I look at your competitors. What they do better online than you, and where they have gaps you can use. You get it as a PDF.')}
                </p>
              </div>

              {/* Geschuetztes Leerzeichen, sonst rutscht das Eurozeichen auf dem
                  Handy in die naechste Zeile. */}
              <div className="mt-7 md:mt-0 flex items-baseline gap-4 flex-shrink-0">
                <span
                  className="font-display font-bold line-through decoration-2 whitespace-nowrap"
                  style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', color: '#F87171' }}
                >
                  190&nbsp;€
                </span>
                <span
                  className="font-display font-bold whitespace-nowrap"
                  style={{ fontSize: 'clamp(34px, 4.4vw, 48px)', color: '#4ADE80', lineHeight: 1 }}
                >
                  {tr(lang, 'kostenlos', 'free')}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 bg-mist rounded-2xl p-7 md:p-8">
            <div className="md:flex items-end justify-between gap-6">
              <div>
                <p className="font-mono-label text-electric">{tr(lang, 'Laufende Betreuung', 'Ongoing care')}</p>
                <p className="mt-2 font-display font-bold text-ink" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}>
                  {tr(lang, 'Deine Seite bleibt schnell, sicher und aktuell.', 'Your site stays fast, secure and up to date.')}
                </p>
              </div>
              <p className="text-ink/55 text-xs mt-2 md:mt-0 md:text-right whitespace-nowrap">
                {tr(lang, 'optional · monatlich kündbar · zzgl. USt.', 'optional · cancel monthly · plus VAT')}
              </p>
            </div>
            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              {care.map((c) => (
                <div key={c.name} className="bg-paper rounded-xl border border-ink/10 p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="font-display font-semibold text-ink text-sm">{c.name}</p>
                    <p className="font-display font-bold text-electric">{c.price}<span className="text-ink/45 text-xs font-sans font-normal"> / {tr(lang, 'Monat', 'month')}</span></p>
                  </div>
                  <p className="mt-2 text-ink/65 text-sm" style={{ lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PricingSection;
