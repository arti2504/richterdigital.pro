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

const PortfolioSection = () => {
  const { lang } = useLang();

  const projects: Project[] = [
    {
      name: 'Smile4Me',
      type: tr(lang, 'Android-App · Google Play', 'Android app · Google Play'),
      desc: tr(lang,
        'Von uns entworfen, gebaut und veröffentlicht. Die App verwandelt ein Android-Handy in einen täuschend echten Fake-Livestream — mit animierten Zuschauerzahlen, Reaktionen und Chat. Weltweit live im Play Store.',
        'Designed, built and published by us. The app turns an Android phone into a convincing fake livestream — with animated viewer counts, reactions and chat. Live worldwide on Google Play.'),
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
        'KI-Schreibassistent für akademische Texte: Rechtschreibung, Grammatik, Stil, automatische Quellen und Karteikarten — alles an einem Ort.',
        'AI writing assistant for academic texts: spelling, grammar, style, automatic sources and flashcards — all in one place.'),
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
        'Quest-basierte Community für Gründer und Creator: Aufgaben erledigen, Honor verdienen, einem Stamm beitreten. Von Grund auf für die Community gebaut und gelauncht.',
        'Quest-based community for founders and creators: complete tasks, earn Honor, join a tribe. Built and launched from the ground up.'),
      tags: ['React', 'Firebase', 'Community'],
      link: 'https://thepackt.io',
      accent: '#F59E0B',
      desktop: '/images/packt-desktop.png',
      mobile: '/images/packt-mobile.png',
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
      </div>
    </section>
  );
};

export default PortfolioSection;
