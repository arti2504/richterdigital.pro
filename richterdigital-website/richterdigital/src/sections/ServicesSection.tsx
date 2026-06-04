import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const ServicesSection = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      t: tr(lang, 'App-Entwicklung', 'App development'),
      d: tr(lang,
        'Native Android- und iOS-Apps, die sich schnell anfühlen, stabil laufen und im Store bestehen — vom Konzept bis zur Veröffentlichung.',
        'Native Android and iOS apps that feel fast, run stable and make it through store review — from concept to release.'),
    },
    {
      t: tr(lang, 'Web-Apps', 'Web apps'),
      d: tr(lang,
        'Dashboards, Portale und SaaS-Produkte — performant gebaut, sauber strukturiert und so, dass sie mit deinem Geschäft mitwachsen.',
        'Dashboards, portals and SaaS products — built for performance, cleanly structured and ready to scale with your business.'),
    },
    {
      t: tr(lang, 'Landingpages', 'Landing pages'),
      d: tr(lang,
        'Seiten, die Besucher in Kunden verwandeln: schnell, klar und auf Conversion ausgerichtet — inklusive sauberer Technik und SEO-Basis.',
        'Pages that turn visitors into customers: fast, clear and conversion-focused — with clean code and SEO basics included.'),
    },
    {
      t: tr(lang, 'KI-Integration', 'AI integration'),
      d: tr(lang,
        'Wir bauen KI direkt in dein Produkt — Automatisierungen, Assistenten und smarte Features, die echten Mehrwert liefern statt nur ein Buzzword zu sein.',
        'We build AI right into your product — automations, assistants and smart features that deliver real value instead of just being a buzzword.'),
    },
  ];

  return (
    <section id="services" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Leistungen', 'Services')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Von der Idee bis zum Launch — <span className="mark-hl">alles aus einer Hand</span>.</>
              : <>From idea to launch — <span className="mark-hl">all from one partner</span>.</>}
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
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="pb-6 pr-12 text-ink/70 font-sans" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.6 }}>{it.d}</p>
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
