import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const PortfolioSection = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const projects = [
    {
      name: 'Smile4Me',
      type: tr(lang, 'Android-App · Google Play', 'Android app · Google Play'),
      desc: tr(lang,
        'Komplett allein entworfen, gebaut und veröffentlicht. Die App verwandelt ein Android-Handy in einen täuschend echten Fake-Livestream — mit animierten Zuschauerzahlen, Reaktionen und Chat. Weltweit live im Play Store.',
        'Designed, built and published entirely solo. The app turns an Android phone into a convincing fake livestream — with animated viewer counts, reactions and chat. Live worldwide on Google Play.'),
      tags: ['Kotlin', 'Firebase', 'AdMob', 'Google Play'],
      link: 'https://play.google.com/store/apps/developer?id=Richter+Digital',
      preview: '/images/smile4me-screenshot1.png',
      accent: '#3DDC84',
    },
    {
      name: 'Clio AI',
      type: tr(lang, 'Web-App · SaaS', 'Web app · SaaS'),
      desc: tr(lang,
        'KI-Schreibassistent für akademische Texte: Rechtschreibung, Grammatik, Stil, automatische Quellen und Karteikarten — alles an einem Ort.',
        'AI writing assistant for academic texts: spelling, grammar, style, automatic sources and flashcards — all in one place.'),
      tags: ['React', 'TypeScript', 'AI / LLM'],
      link: 'https://getclio.ai',
      preview: null,
      accent: '#0711ff',
    },
    {
      name: 'ThePackt',
      type: tr(lang, 'Web-App · Community', 'Web app · Community'),
      desc: tr(lang,
        'Quest-basierte Community für Gründer und Creator: Aufgaben erledigen, Honor verdienen, einem Stamm beitreten. Von Grund auf selbst gebaut und gelauncht.',
        'Quest-based community for founders and creators: complete tasks, earn Honor, join a tribe. Built and launched from scratch.'),
      tags: ['React', 'Firebase', 'Community'],
      link: 'https://thepackt.io',
      preview: null,
      accent: '#F59E0B',
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

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="h-full flex flex-col bg-paper rounded-2xl border border-ink/10 overflow-hidden hover:border-electric/40 transition-colors">
                  <div className="h-40 flex items-center justify-center" style={{ background: p.preview ? '#0B1022' : `${p.accent}14` }}>
                    {p.preview
                      ? <img src={p.preview} alt={p.name} className="h-full w-full object-cover object-top" />
                      : <span className="font-display font-bold" style={{ color: p.accent, fontSize: '28px' }}>{p.name}</span>}
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <p className="font-mono-label text-ink/50">{p.type}</p>
                    <h3 className="mt-2 font-display font-bold text-ink text-2xl">{p.name}</h3>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-ink/70 font-sans" style={{ fontSize: '15px', lineHeight: 1.55 }}>{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.tags.map((t) => (
                          <span key={t} className="text-xs bg-mist text-ink/70 rounded-full px-3 py-1">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto pt-5 flex items-center gap-3">
                      <button onClick={() => setOpen(isOpen ? null : i)} className="text-sm font-display font-semibold text-electric hover:underline">
                        {isOpen ? tr(lang, 'Weniger', 'Less') : tr(lang, 'Mehr erfahren', 'Learn more')}
                      </button>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 text-sm font-display font-semibold text-ink hover:text-electric transition-colors">
                        {tr(lang, 'Ansehen', 'Visit')} <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
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

export default PortfolioSection;
