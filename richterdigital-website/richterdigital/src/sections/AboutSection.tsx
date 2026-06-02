import { useEffect, useRef } from 'react';
import { Code2, Smartphone, Globe, Shield, Zap, MessageSquare } from 'lucide-react';

const strengths = [
  { icon: MessageSquare, label: 'Direct contact', desc: 'You talk to me, not a project manager.' },
  { icon: Zap,           label: 'Fast delivery',  desc: 'No agency overhead means faster turnaround.' },
  { icon: Shield,        label: 'Made in Germany', desc: 'GDPR-compliant, reliable, high quality standards.' },
  { icon: Code2,         label: 'Full stack',      desc: 'I handle design, frontend, backend, and deployment.' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            leftRef.current?.classList.add('visible');
            setTimeout(() => rightRef.current?.classList.add('visible'), 150);
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
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(45,98,255,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — decorative */}
            <div ref={leftRef} className="reveal-left">
              <div className="lens-frame bg-navy-800/60 aspect-square max-w-md mx-auto lg:mx-0 relative overflow-hidden flex items-center justify-center">
                {/* Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-30" style={{ background: '#2D62FF' }} />
                <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: '#8B5CF6' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-6 p-10">
                  <img
                    src="/images/logo.png"
                    alt="Richter Digital"
                    className="w-20 h-20 object-contain breathing"
                  />
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-cream">Arthur Richter</p>
                    <p className="text-cream-muted text-sm mt-1">Freelance App & Web Developer</p>
                    <p className="text-cream-muted/60 text-xs mt-0.5">Bad Driburg, Germany 🇩🇪</p>
                  </div>

                  {/* Mini stats */}
                  <div className="flex gap-8">
                    {[
                      { value: '4+', label: 'Services' },
                      { value: '1',  label: 'App live'  },
                      { value: '∞',  label: 'Ideas left' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="font-display text-2xl font-bold text-electric">{s.value}</p>
                        <p className="text-xs text-cream-muted font-mono-label">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech icons row */}
                  <div className="flex gap-3">
                    {[Smartphone, Globe, Code2].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-electric" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div ref={rightRef} className="reveal-right">
              <span className="font-mono-label text-electric mb-4 block">ABOUT ME</span>
              <h2 className="font-display text-display-2 text-cream font-bold mb-6">
                A developer who{' '}
                <span className="text-electric">actually ships</span>
              </h2>
              <p className="text-cream-muted leading-relaxed mb-5">
                I'm Arthur — a freelance developer based in Bad Driburg, Germany. I build
                Android and iOS apps, web apps, and websites for clients who have an idea
                and need someone to execute it.
              </p>
              <p className="text-cream-muted leading-relaxed mb-8">
                I started with my own app, <strong className="text-cream">Smile4Me</strong>,
                which I designed, built, and published to Google Play entirely on my own.
                Now I take on client projects and bring the same level of care and quality
                to your idea — at rates that make sense for early-stage projects.
              </p>

              {/* Strengths grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {strengths.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-start gap-3 bg-navy-800/40 rounded-2xl p-4 border border-white/5 hover:border-electric/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-electric/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <s.icon className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cream">{s.label}</p>
                      <p className="text-xs text-cream-muted mt-0.5">{s.desc}</p>
                    </div>
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
