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


  return (
    <section ref={sectionRef} id="pricing" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <div className="sm:flex sm:items-start sm:justify-between sm:gap-10">
            <div className="max-w-[640px]">
              <p className="font-mono-label text-electric mb-4">{tr(lang, 'Angebot', 'Get a quote')}</p>
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                {lang === 'de'
                  ? <>Vier Fragen, <span className="mark-hl">dann weißt du woran du bist</span>.</>
                  : <>Four questions, <span className="mark-hl">then you know where you stand</span>.</>}
              </h2>
              <p className="mt-4 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                {tr(lang,
                  'Sag mir kurz, was du vorhast. Ich schicke dir einen Vorschlag mit Festpreis, damit du vorher weißt, was es kostet. Kostenlos und unverbindlich.',
                  'Tell me briefly what you have in mind. I send you a proposal with a fixed price, so you know what it costs beforehand. Free and without obligation.')}
              </p>
            </div>

            {/* Preisschild. Beantwortet die Frage, die den Besucher vom Rechner
                abhaelt: rede ich hier ueber Hunderte oder ueber Zehntausende. */}
            <div className="mt-8 sm:mt-2 flex-shrink-0 flex justify-center sm:block">
              <div
                className="rounded-full bg-electric text-white flex flex-col items-center justify-center shadow-xl"
                style={{ width: '148px', height: '148px', transform: 'rotate(-8deg)' }}
              >
                <span className="font-display font-semibold opacity-90" style={{ fontSize: '15px', lineHeight: 1 }}>
                  {tr(lang, 'ab', 'from')}
                </span>
                <span className="font-display font-bold whitespace-nowrap" style={{ fontSize: '38px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  399&nbsp;€
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <AngebotRechner />

        {/* Zusatzleistung der beiden groesseren Pakete. Beim Starter zu 399 €
            waere eine Zugabe im Wert von 190 € fast die Haelfte des Auftrags.
            Der durchgestrichene Preis ist echt: Die Analyse ist einzeln fuer
            190 € buchbar. Ein erfundener Referenzpreis waere nach § 5 UWG
            abmahnfaehig. */}
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
                  {tr(lang, 'In Professional und Premium enthalten', 'Included in Professional and Premium')}
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

      </div>
    </section>
  );
};

export default PricingSection;
