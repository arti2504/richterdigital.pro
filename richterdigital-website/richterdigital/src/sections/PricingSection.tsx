import { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';
import { track, trackCustom } from '../lib/pixel';

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

  const packages = [
    {
      name: 'Starter',
      price: '690 €',
      value: 690,
      tagline: tr(lang, 'Ein professioneller Auftritt auf einer Seite. Ideal für den Einstieg.', 'A professional presence on one page. Ideal to get started.'),
      features: [
        tr(lang, 'Durchdachte Landingpage (One-Pager)', 'Well-crafted landing page (one-pager)'),
        tr(lang, 'Individuelles Design, passend zu deiner Marke', 'Custom design that fits your brand'),
        tr(lang, 'Optimiert für Handy, Tablet und Desktop', 'Optimised for phone, tablet and desktop'),
        tr(lang, 'Kontaktformular & schnelle Ladezeiten', 'Contact form & fast load times'),
        tr(lang, 'Eine Korrekturschleife', 'One revision round'),
      ],
      highlight: false,
    },
    {
      name: 'Professional',
      price: '1.290 €',
      value: 1290,
      tagline: tr(lang, 'Mehrere Seiten für alle, die ihre Arbeit richtig zeigen wollen.', 'Multiple pages for everyone who wants to properly show their work.'),
      features: [
        tr(lang, 'Alles aus Starter', 'Everything in Starter'),
        tr(lang, 'Bis zu fünf Unterseiten', 'Up to five subpages'),
        tr(lang, 'Verkaufsstarke Texte für deine Seiten', 'Persuasive copy for your pages'),
        tr(lang, 'Rechtssicher: Impressum, Datenschutz, Cookies', 'Legally sound: imprint, privacy, cookies'),
        tr(lang, 'Grundlegende Suchmaschinen-Optimierung', 'Basic search engine optimisation'),
        tr(lang, 'Zwei Korrekturschleifen', 'Two revision rounds'),
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      price: tr(lang, 'ab 1.890 €', 'from €1,890'),
      value: 1890,
      tagline: tr(lang, 'Die komplette Lösung mit Funktionen, die dir aktiv Arbeit abnehmen.', 'The complete solution with features that actively save you work.'),
      features: [
        tr(lang, 'Alles aus Professional', 'Everything in Professional'),
        tr(lang, 'Online-Terminbuchung oder Galerie', 'Online booking or self-service gallery'),
        tr(lang, 'Anbindung an deine Tools (Kalender, Newsletter, WhatsApp)', 'Connected to your tools (calendar, newsletter, WhatsApp)'),
        tr(lang, 'Auswertung, woher deine Besucher kommen', 'Analytics on where your visitors come from'),
        tr(lang, 'Individuell erweiterbar', 'Individually extendable'),
      ],
      highlight: false,
    },
  ];

  const care = [
    { name: 'Basis',   price: '29 €',  desc: tr(lang, 'Hosting, Updates, Sicherheit, Erreichbarkeit', 'Hosting, updates, security, uptime') },
    { name: 'Plus',    price: '59 €',  desc: tr(lang, 'zusätzlich kleine Änderungen inklusive (Bilder, Texte)', 'plus small changes included (images, copy)') },
    { name: 'Premium', price: '129 €', desc: tr(lang, 'laufende Pflege plus ein Blogartikel pro Monat', 'ongoing care plus one blog article per month') },
  ];

  /* Klick auf ein Paket: verrät, welches Paket zieht — und ist das Signal
     "will kaufen" kurz vor der Anfrage. */
  const choosePackage = (pkg: { name: string; value: number }) => {
    trackCustom('PaketKlick', { content_name: pkg.name, value: pkg.value, currency: 'EUR' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="pricing" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Preise', 'Pricing')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Klare Pakete, <span className="mark-hl">keine Überraschungen</span>.</>
              : <>Clear packages, <span className="mark-hl">no surprises</span>.</>}
          </h2>
          <p className="mt-4 text-ink/70 font-sans max-w-[640px]" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Websites und Landingpages zum Festpreis. Apps und Web-Apps kalkulieren wir individuell nach Umfang — dafür reden wir am besten kurz.',
              'Websites and landing pages at a fixed price. Apps and web apps are quoted individually by scope — best to talk briefly for those.')}
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5 items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`relative h-full rounded-2xl p-7 flex flex-col ${
                p.highlight
                  ? 'bg-ink text-white shadow-2xl md:-my-3 md:py-10'
                  : 'bg-paper border border-ink/10'
              }`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-electric text-white text-xs font-display font-bold rounded-full px-4 py-1.5 whitespace-nowrap">
                    {tr(lang, 'Meine Empfehlung', 'My recommendation')}
                  </span>
                )}
                <p className={`font-mono-label ${p.highlight ? 'text-electric-light' : 'text-electric'}`}>{p.name}</p>
                <p className="mt-3 font-display font-bold" style={{ fontSize: 'clamp(30px, 3vw, 40px)' }}>{p.price}</p>
                <p className={`mt-1 text-xs ${p.highlight ? 'text-white/50' : 'text-ink/50'}`}>{tr(lang, 'zzgl. 19 % USt.', 'plus 19% VAT')}</p>
                <p className={`mt-3 text-sm ${p.highlight ? 'text-white/75' : 'text-ink/70'}`} style={{ lineHeight: 1.55 }}>{p.tagline}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.highlight ? 'text-electric-light' : 'text-electric'}`} />
                      <span className={`text-sm ${p.highlight ? 'text-white/85' : 'text-ink/80'}`} style={{ lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choosePackage(p)}
                  className={`mt-7 w-full py-3.5 rounded-full font-display font-bold text-[15px] transition-all inline-flex items-center justify-center gap-2 ${
                    p.highlight
                      ? 'bg-electric text-white hover:bg-electric-dark'
                      : 'bg-mist text-ink hover:bg-electric hover:text-white'
                  }`}
                >
                  {tr(lang, 'Kostenloses Erstgespräch', 'Free first call')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 bg-mist rounded-2xl p-7 md:p-8">
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
