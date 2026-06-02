import { useEffect, useRef } from 'react';
import { ExternalLink, Smartphone, Globe, Plus } from 'lucide-react';

const projects = [
  {
    slug:    'smile4me',
    name:    'Smile4Me',
    tagline: 'Fake Livestream Prank App',
    type:    'Android App',
    typeIcon: Smartphone,
    status:  'Live',
    statusColor: 'emerald',
    description:
      'A prank app that makes your phone look exactly like a real streaming platform — animated viewer counts, live reactions, chat. Built, published, and maintained solo on Google Play.',
    tags:    ['Android', 'Kotlin', 'Google Play', 'AdMob', 'Firebase'],
    logo:    '/images/smile4me-logo.png',
    screens: ['/images/smile4me-screenshot1.png', '/images/smile4me-screenshot2.png'],
    link:    'https://play.google.com/store/apps/developer?id=Richter+Digital',
    linkLabel: 'Google Play',
    accent:  '#3DDC84',
  },
  {
    slug:    'getclio',
    name:    'Clio AI',
    tagline: 'AI Writing Assistant for Students',
    type:    'Web App',
    typeIcon: Globe,
    status:  'Live',
    statusColor: 'blue',
    description:
      'AI-powered writing assistant for academic work. Spelling, grammar, style correction, automatic citations and flashcard generation — all in one place. Designed for students.',
    tags:    ['React', 'TypeScript', 'AI / LLM', 'Web App'],
    logo:    null,
    preview: '/images/clio-preview.jpg',
    link:    'https://getclio.ai',
    linkLabel: 'Visit Site',
    accent:  '#2D62FF',
  },
  {
    slug:    'thepackt',
    name:    'ThePackt',
    tagline: 'No Budget. No Audience. No Problem.',
    type:    'Web App',
    typeIcon: Globe,
    status:  'Open Beta',
    statusColor: 'amber',
    description:
      'Community platform for indie founders and creators. Quest-based mutual support — complete tasks, earn Honor, join a tribe. No follower count required to grow.',
    tags:    ['React', 'Firebase', 'Community Platform', 'Web App'],
    logo:    null,
    preview: '/images/packt-preview.jpg',
    link:    'https://thepackt.io',
    linkLabel: 'Visit Site',
    accent:  '#F59E0B',
  },
];

const statusStyles: Record<string, string> = {
  emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  blue:    'text-blue-400 bg-blue-400/10 border-blue-400/20',
  amber:   'text-amber-400 bg-amber-400/10 border-amber-400/20',
};

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
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(45,98,255,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-mono-label text-electric mb-4 block">PORTFOLIO</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              What I've built
            </h2>
            <p className="text-cream-muted text-lg max-w-xl mx-auto">
              Real products, shipped and live — built end-to-end from idea to launch.
            </p>
          </div>

          {/* Project cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="reveal-up lens-frame bg-navy-800/60 flex flex-col overflow-hidden group hover:border-white/20 transition-colors"
              >
                {/* Preview image / screenshot strip */}
                <div className="relative h-44 overflow-hidden bg-navy-900/80 flex-shrink-0">
                  {p.preview ? (
                    <img
                      src={p.preview}
                      alt={`${p.name} preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        // Fallback if screenshot not saved yet
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : p.screens ? (
                    <div className="flex gap-2 p-3 h-full">
                      {p.screens.map((src, si) => (
                        <div key={si} className="lens-frame-inner flex-1 overflow-hidden">
                          <img src={src} alt="" className="w-full h-full object-cover object-top" />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Gradient overlay bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(11,16,34,0.9), transparent)' }}
                  />

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-mono-label border rounded-full px-2.5 py-1 ${statusStyles[p.statusColor]}`}>
                      {p.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* App header */}
                  <div className="flex items-center gap-3 mb-3">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${p.accent}18` }}
                      >
                        <p.typeIcon className="w-5 h-5" style={{ color: p.accent }} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream leading-tight">{p.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-cream-muted">
                        <p.typeIcon className="w-3 h-3" />
                        {p.type}
                      </div>
                    </div>
                  </div>

                  <p className="text-cream-muted text-sm leading-relaxed mb-5 flex-1">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: p.accent }}
                  >
                    {p.linkLabel}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* More coming */}
          <div
            className="mt-5 lens-frame bg-navy-800/25 border-dashed p-6 flex items-center justify-center gap-4 text-center cursor-pointer hover:bg-navy-800/40 hover:border-electric/25 transition-all group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Plus className="w-5 h-5 text-electric/50 group-hover:text-electric transition-colors" />
            <div>
              <p className="text-sm font-semibold text-cream-muted group-hover:text-cream transition-colors">
                Your project here — have an idea?
              </p>
              <p className="text-xs text-cream-muted/50 mt-0.5">Get in touch and let's build it.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
