import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

type Project = {
  name: string;
  type: string;
  desc: string;
  tags: string[];
  link: string;
  accent: string;
  desktop?: string;
  mobile?: string;
  mobile2?: string;
};

const Dot = () => <span className="w-2 h-2 rounded-full bg-ink/20" />;

const DeviceShowcase = ({ p }: { p: Project }) => {
  const [deskErr, setDeskErr] = useState(false);
  const [mobErr, setMobErr] = useState(false);

  const fallback = (!p.desktop && !p.mobile) || (p.desktop ? deskErr : mobErr);

  if (fallback) {
    return (
      <div className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center" style={{ background: `${p.accent}14` }}>
        <span className="font-display font-bold" style={{ color: p.accent, fontSize: '30px' }}>{p.name}</span>
      </div>
    );
  }

  if (p.desktop) {
    return (
      <div className="relative w-full aspect-[4/3]">
        <div className="absolute left-0 top-3 right-[16%] bottom-3 rounded-xl overflow-hidden border border-ink/10 bg-white shadow-xl">
          <div className="h-7 bg-mist flex items-center gap-1.5 px-3 border-b border-ink/10"><Dot /><Dot /><Dot /></div>
          <img src={p.desktop} alt={`${p.name} Desktop`} onError={() => setDeskErr(true)} className="w-full h-[calc(100%-1.75rem)] object-cover object-top" />
        </div>
        {p.mobile && !mobErr && (
          <div className="absolute right-0 bottom-2 w-[30%] aspect-[9/19] rounded-[18px] border-[3px] border-ink bg-white overflow-hidden shadow-2xl">
            <img src={p.mobile} alt={`${p.name} Mobile`} onError={() => setMobErr(true)} className="w-full h-full object-cover object-top" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] flex items-end justify-center gap-4 pb-2">
      <div className="w-[34%] aspect-[9/19] rounded-[18px] border-[3px] border-ink bg-white overflow-hidden shadow-2xl">
        <img src={p.mobile} alt={`${p.name} 1`} onError={() => setMobErr(true)} className="w-full h-full object-cover object-top" />
      </div>
      {p.mobile2 && (
        <div className="w-[34%] aspect-[9/19] rounded-[18px] border-[3px] border-ink bg-white overflow-hidden shadow-2xl mb-6">
          <img src={p.mobile2} alt={`${p.name} 2`} className="w-full h-full object-cover object-top" />
        </div>
      )}
    </div>
  );
};

type CareProject = {
  name: string;
  branch: string;
  desc: string;
  link: string;
  accent: string;
};

const PortfolioSection = () => {
  const { lang } = useLang();

  const projects: Project[] = [
    {
      name: 'Smile4Me',
      type: tr(lang, 'Android-App · Google Play', 'Android app · Google Play'),
      desc: tr(lang,
        'Von uns entworfen, gebaut und in den Store gebracht. Die App lässt ein Android-Handy wie einen echten Livestream aussehen, mit animierten Zuschauerzahlen, Reaktionen und Chat. Weltweit im Play Store verfügbar.',
        'Designed, built and brought to the store by us. The app makes an Android phone look like a real livestream, with animated viewer counts, reactions and chat. Available worldwide on Google Play.'),
      tags: ['Kotlin', 'Firebase', 'AdMob', 'Google Play'],
      link: 'https://play.google.com/store/apps/developer?id=Richter+Digital',
      accent: '#3DDC84',
      mobile: '/images/smile4me-screenshot1.png',
      mobile2: '/images/smile4me-screenshot2.png',
    },
    {
      name: 'Clio AI',
      type: tr(lang, 'Web-App · SaaS', 'Web app · SaaS'),
      desc: tr(lang,
        'KI-Schreibassistent für akademische Texte. Er prüft Rechtschreibung, Grammatik und Stil, findet Quellen und legt Karteikarten an, alles an einem Ort.',
        'AI writing assistant for academic texts. It checks spelling, grammar and style, finds sources and creates flashcards, all in one place.'),
      tags: ['React', 'TypeScript', 'AI / LLM'],
      link: 'https://getclio.ai',
      accent: '#0711ff',
      desktop: '/images/clio-desktop.png',
      mobile: '/images/clio-mobile.png',
    },
    {
      name: 'ThePackt',
      type: tr(lang, 'Web-App · Community', 'Web app · Community'),
      desc: tr(lang,
        'Quest-basierte Community für Gründer und Creator. Aufgaben erledigen, Honor sammeln, einem Stamm beitreten. Von Grund auf gebaut und gelauncht.',
        'Quest-based community for founders and creators. Complete tasks, earn Honor, join a tribe. Built and launched from the ground up.'),
      tags: ['React', 'Firebase', 'Community'],
      link: 'https://thepackt.io',
      accent: '#F59E0B',
      desktop: '/images/packt-desktop.png',
      mobile: '/images/packt-mobile.png',
    },
  ];

  const careProjects: CareProject[] = [
    {
      name: 'Powercleany',
      branch: tr(lang, 'Online-Shop · Haushalts- & Reinigungsgeräte', 'Online shop · household & cleaning devices'),
      desc: tr(lang,
        'Laufender E-Commerce-Shop. Wir haben die Ladezeiten optimiert und betreuen die Seite technisch.',
        'Live e-commerce shop. We optimised the load times and handle the ongoing technical care.'),
      link: 'https://powercleany.de/',
      accent: '#0E7490',
    },
    {
      name: 'Fitorb',
      branch: tr(lang, 'Online-Shop · Smart Ring & Health-Tech', 'Online shop · smart ring & health tech'),
      desc: tr(lang,
        'Shop für einen Gesundheits-Smart-Ring. Ladezeit-Optimierung und laufende technische Betreuung.',
        'Shop for a health smart ring. Load time optimisation and ongoing technical care.'),
      link: 'https://www.fitorb.de/',
      accent: '#B45309',
    },
    {
      name: 'SwiftPod',
      branch: tr(lang, 'Online-Shop · Tech-Gadgets', 'Online shop · tech gadgets'),
      desc: tr(lang,
        'Produkt-Shop für eine Smart-Maus. Ladezeit-Optimierung und laufende technische Betreuung.',
        'Product shop for a smart mouse. Load time optimisation and ongoing technical care.'),
      link: 'https://swiftpod.de/',
      accent: '#1D4ED8',
    },
  ];

  return (
    <section id="portfolio" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Ausgewählte Arbeiten', 'Selected work')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Gebaut, gelauncht und <span className="mark-hl">in echten Händen</span>.</>
              : <>Built, launched and <span className="mark-hl">in real hands</span>.</>}
          </h2>
        </Reveal>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {projects.map((p, i) => (
            <div key={p.name} className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
              <Reveal variant={i % 2 === 1 ? 'right' : 'left'} className={i % 2 === 1 ? 'md:order-2' : 'md:order-1'}>
                <DeviceShowcase p={p} />
              </Reveal>
              <Reveal variant={i % 2 === 1 ? 'left' : 'right'} className={i % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                <div>
                  <p className="font-mono-label text-ink/50">{p.type}</p>
                  <h3 className="mt-2 font-display font-bold text-ink" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>{p.name}</h3>
                  <p className="mt-4 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {p.tags.map((t) => (<span key={t} className="text-xs bg-mist text-ink/70 rounded-full px-3 py-1">{t}</span>))}
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-display font-bold text-electric hover:gap-3 transition-all">
                    {tr(lang, 'Live ansehen', 'View live')} <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-20 lg:mt-28">
          <Reveal>
            <p className="font-mono-label text-electric mb-3">{tr(lang, 'Optimierung & Betreuung', 'Optimisation & care')}</p>
            <h3 className="font-display font-bold" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              {lang === 'de'
                ? <>Drei Shops, die wir <span className="mark-hl">schnell halten</span>.</>
                : <>Three shops we <span className="mark-hl">keep fast</span>.</>}
            </h3>
            <p className="mt-3 text-ink/70 font-sans max-w-[640px]" style={{ fontSize: '16px', lineHeight: 1.6 }}>
              {tr(lang,
                'Nicht jedes Projekt beginnt bei null. Diese laufenden Online-Shops haben wir performance-optimiert und betreuen sie laufend technisch.',
                'Not every project starts from zero. We performance-optimised these live online shops and handle their ongoing technical care.')}
            </p>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {careProjects.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full bg-paper rounded-2xl border border-ink/10 p-6 hover:border-ink/25 hover:shadow-lg transition-all"
                >
                  <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center font-display font-bold text-lg" style={{ background: `${c.accent}14`, color: c.accent }}>
                    {c.name.charAt(0)}
                  </span>
                  <p className="mt-4 font-display font-bold text-ink" style={{ fontSize: '20px' }}>{c.name}</p>
                  <p className="mt-1 font-mono-label text-ink/50" style={{ fontSize: '11px' }}>{c.branch}</p>
                  <p className="mt-3 text-ink/70 text-sm" style={{ lineHeight: 1.55 }}>{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-display font-bold text-electric text-sm group-hover:gap-3 transition-all">
                    {tr(lang, 'Shop ansehen', 'View shop')} <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
