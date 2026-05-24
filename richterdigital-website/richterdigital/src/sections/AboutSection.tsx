import { useEffect, useRef } from 'react';
import { Code, Smartphone, Zap, Globe } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRef.current?.classList.add('visible');
            setTimeout(() => textRef.current?.classList.add('visible'), 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-navy-900 py-24 lg:py-32 z-20 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 60%, rgba(45,98,255,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left — Decorative card ── */}
            <div
              ref={cardRef}
              className="reveal-left lens-frame aspect-square max-w-md mx-auto lg:mx-0 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-navy-800/60 flex items-center justify-center">
                {/* Glow blobs */}
                <div
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-40"
                  style={{ background: '#2D62FF' }}
                />
                <div
                  className="absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full blur-3xl opacity-30"
                  style={{ background: '#8B5CF6' }}
                />
                <div
                  className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full blur-3xl opacity-30"
                  style={{ background: '#EC4899' }}
                />

                {/* Centre icon */}
                <div className="relative z-10 flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-navy-900/80 border border-white/10 flex items-center justify-center">
                    <Code className="w-9 h-9 text-electric" />
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-6">
                    {[
                      { value: '1+', label: 'App live' },
                      { value: 'DE', label: 'Based' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="font-display text-2xl font-bold text-electric">{s.value}</p>
                        <p className="text-xs text-cream-muted font-mono-label">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right — Text ── */}
            <div ref={textRef} className="reveal-right">
              <span className="font-mono-label text-electric mb-4 block">ABOUT US</span>
              <h2 className="font-display text-display-2 text-cream font-bold mb-6">
                Building digital products{' '}
                <span className="text-electric">that matter</span>
              </h2>
              <p className="text-cream-muted leading-relaxed mb-5">
                Richter Digital is an indie development studio run by{' '}
                <strong className="text-cream">Arthur Richter</strong> from Bad Driburg, Germany.
                I build mobile apps and web applications that focus on user experience,
                performance, and clean design.
              </p>
              <p className="text-cream-muted leading-relaxed mb-8">
                My goal is simple: create products people actually enjoy using. Smile4Me
                is the first app — more are in the works.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Smartphone, label: 'Android Apps' },
                  { icon: Globe,      label: 'Web Apps' },
                  { icon: Code,       label: 'React / Vite' },
                  { icon: Zap,        label: 'Fast & Clean' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-navy-800/60 rounded-xl px-4 py-2.5 border border-white/5 hover:border-electric/30 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-electric" />
                    <span className="text-sm text-cream">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
