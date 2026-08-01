import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const ServicesSection = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  /* Reihenfolge nach Umsatz: Landingpages bringen die meisten Kunden und
     stehen deshalb oben. Der erste Eintrag ist beim Laden aufgeklappt. */
  const items = [
    {
      t: tr(lang, 'Landingpages', 'Landing pages'),
      d: tr(lang,
        'Seiten, die aus Besuchern Kunden machen. Schnell geladen, klar aufgebaut und für Google optimiert.',
        'Pages that turn visitors into customers. Fast to load, clearly built and optimised for Google.'),
      extra: tr(lang,
        'Zu jeder Landingpage gehört die Konkurrenzanalyse dazu. Ich schaue mir an, was deine Mitbewerber online machen und wo du sie überholen kannst. Einzeln kostet die 190 €, bei einer Landingpage ist sie kostenlos.',
        'A competitor analysis comes with every landing page. I look at what your competitors do online and where you can overtake them. On its own it costs €190, with a landing page it is free.'),
    },
    {
      t: tr(lang, 'Web-Apps', 'Web apps'),
      d: tr(lang,
        'Dashboards, Portale und SaaS-Produkte, die zuverlässig laufen und mit deinem Geschäft mitwachsen.',
        'Dashboards, portals and SaaS products that run reliably and grow with your business.'),
    },
    {
      t: tr(lang, 'App-Entwicklung', 'App development'),
      d: tr(lang,
        'Native Apps für Android und iOS, die sich schnell anfühlen und im Store bestehen. Vom Konzept bis zur Veröffentlichung kümmern wir uns um alles.',
        'Native apps for Android and iOS that feel fast and make it through store review. From concept to release, we take care of everything.'),
    },
    {
      t: tr(lang, 'KI-Integration', 'AI integration'),
      d: tr(lang,
        'Wir bauen KI direkt in dein Produkt. Automatisierungen, Assistenten und Funktionen, die deinen Nutzern echte Arbeit abnehmen.',
        'We build AI right into your product. Automations, assistants and features that genuinely save your users work.'),
    },
  ];

  return (
    <section id="services" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Leistungen', 'Services')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Von der Idee bis zum Launch, <span className="mark-hl">alles aus einer Hand</span>.</>
              : <>From idea to launch, <span className="mark-hl">all from one partner</span>.</>}
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-ink/10">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="border-b border-ink/10">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 py-6 text-left group">
                    <span className="font-display font-semibold text-ink" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)' }}>{it.t}</span>
                    <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-electric text-white rotate-45' : 'bg-mist text-ink group-hover:bg-electric/10'}`}>
                      <Plus className="w-5 h-5" />
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="pr-12 text-ink/70 font-sans" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.6 }}>{it.d}</p>
                    {it.extra && (
                      <div className="mt-4 mb-6 mr-4 rounded-xl bg-electric/[0.06] border border-electric/20 px-5 py-4">
                        <p className="font-display font-bold text-ink text-[15px]">
                          {tr(lang, 'Konkurrenzanalyse inklusive', 'Competitor analysis included')}
                          <span className="ml-2 font-sans font-normal" style={{ color: '#DC2626' }}>
                            <span className="line-through">190&nbsp;€</span>
                          </span>
                          <span className="ml-1.5 font-sans font-semibold" style={{ color: '#15803D' }}>
                            {tr(lang, 'kostenlos', 'free')}
                          </span>
                        </p>
                        <p className="mt-1.5 text-ink/70 text-sm" style={{ lineHeight: 1.55 }}>{it.extra}</p>
                      </div>
                    )}
                    {!it.extra && <div className="pb-6" />}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
