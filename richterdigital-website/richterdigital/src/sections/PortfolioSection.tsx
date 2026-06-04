import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    slug:    'smile4me',
    number:  '01',
    name:    'Smile4Me',
    type:    'Android App · Google Play',
    headline:'A prank app shipped solo and live in 180+ countries.',
    result:  'Available worldwide on Google Play',
    resultLabel: 'Reach',
    description:
      'Designed, built, and published entirely solo. Smile4Me makes your Android phone look exactly like a real livestream platform — animated viewer counts, reactions, chat. Live on Google Play.',
    tags: ['Android', 'Kotlin', 'Firebase', 'AdMob', 'Google Play'],
    preview: null,
    screens: ['/images/smile4me-screenshot1.png', '/images/smile4me-screenshot2.png'],
    logo:    '/images/smile4me-logo.png',
    link:    'https://play.google.com/store/apps/developer?id=Richter+Digital',
    accent:  '#3DDC84',
    featured: true,
  },
  {
    slug:    'getclio',
    number:  '02',
    name:    'Clio AI',
    type:    'Web App · SaaS',
    headline:'AI writing assistant built for students.',
    result:  'Live & growing',
    resultLabel: 'Status',
    description:
      'KI-Schreibassistent für akademische Texte. Rechtschreibung, Grammatik, Stil, automatische Quellen und Karteikarten — alles an einem Ort.',
    tags: ['React', 'TypeScript', 'AI / LLM', 'Web App'],
    preview: '/images/clio-preview.jpg',
    screens: null,
    logo:    null,
    link:    'https://getclio.ai',
    accent:  '#2D62FF',
    featured: false,
  },
  {
    slug:    'thepackt',
    number:  '03',
    name:    'ThePackt',
    type:    'Web App · Community Platform',
    headline:'Where indie founders help each other grow.',
    result:  'Open Beta',
    resultLabel: 'Status',
    description:
      'Quest-based community for founders and creators. Complete tasks, earn Honor, join a tribe. No follower count required. Built and launched from scratch.',
    tags: ['React', 'Firebase', 'Community', 'Web App'],
    preview: '/images/packt-preview.jpg',
    screens: null,
    logo:    null,
    link:    'https://thepackt.io',
    accent:  '#F59E0B',
    featured: false,
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRefs.current.forEach((c, i) => {
              if (!c) return;
              setTimeout(() => c.classList.add('visible'), i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative bg-navy-900 py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 10% 60%, rgba(45,98,255,0.05) 0%, transparent 55%)' }}
      />

      <div className="px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <span className="font-mono-label text-electric mb-4 block">PORTFOLIO</span>
            <h2
              className="font-display font-bold text-cream leading-tight"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Real products.<br />Shipped and live.
            </h2>
          </div>

          {/* Featured card — full width */}
          {projects.filter(p => p.featured).map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="reveal-up mb-5 group"
            >
              <div className="relative lens-frame bg-navy-800/50 overflow-hidden">
                <div className="grid lg:grid-cols-2 min-h-[420px]">

                  {/* Left: content */}
                  <div className="p-10 lg:p-14 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <img src={p.logo!} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <span className="font-mono-label text-cream-muted/60 block">{p.number}</span>
                          <span className="font-mono-label text-cream-muted/60">{p.type}</span>
                        </div>
                      </div>
                      <h3
                        className="font-display font-bold text-cream mb-4 leading-tight"
                        style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
                      >
                        {p.name}
                      </h3>
                      <p className="text-cream-muted leading-relaxed mb-6 max-w-md">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>

                    {/* Result stat + link */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-mono-label text-cream-muted/50 mb-1">{p.resultLabel}</p>
                        <p className="font-display font-bold text-2xl" style={{ color: p.accent }}>{p.result}</p>
                      </div>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-cream hover:text-electric transition-colors group/link"
                      >
                        View on Play Store
                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Right: screenshots */}
                  <div className="relative bg-navy-900/60 flex items-end justify-center gap-4 p-8 pt-12 overflow-hidden">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 30%, ${p.accent}14 0%, transparent 70%)` }}
                    />
                    {p.screens?.map((src, si) => (
                      <div
                        key={si}
                        className={`relative z-10 rounded-[20px] overflow-hidden border border-white/10 flex-shrink-0 ${si === 1 ? 'mb-8' : ''}`}
                        style={{ width: '42%', aspectRatio: '9/16' }}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover object-top" />
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Other projects — 2 col */}
          <div className="grid lg:grid-cols-2 gap-5">
            {projects.filter(p => !p.featured).map((p, i) => (
              <div
                key={p.slug}
                ref={(el) => { cardRefs.current[i + 1] = el; }}
                className="reveal-up lens-frame bg-navy-800/50 overflow-hidden group"
              >
                {/* Preview image */}
                <div className="relative h-52 bg-navy-900/70 overflow-hidden">
                  {p.preview && (
                    <img
                      src={p.preview}
                      alt={p.name}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).parentElement!.style.background =
                          `linear-gradient(135deg, ${p.accent}10, transparent)`;
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(11,16,34,1), transparent)' }}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="font-mono-label text-cream-muted/50 block mb-1">{p.number} — {p.type}</span>
                  <h3 className="font-display text-2xl font-bold text-cream mb-3">{p.name}</h3>
                  <p className="text-cream-muted text-sm leading-relaxed mb-5">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono-label text-cream-muted/40 mb-0.5">{p.resultLabel}</p>
                      <p className="font-display font-bold text-lg" style={{ color: p.accent }}>{p.result}</p>
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-cream-muted hover:text-electric transition-colors group/link"
                    >
                      Visit Site
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
