import { useEffect, useRef } from 'react';
import { type LucideIcon, Shield, Zap, MessageSquare, Code2, ArrowUpRight } from 'lucide-react';

interface Strength { icon: LucideIcon; label: string; desc: string }

const strengths: Strength[] = [
  { icon: MessageSquare, label: 'Direct contact',   desc: 'You deal with me, not a project manager.' },
  { icon: Zap,           label: 'Fast turnaround',  desc: 'No agency layers. I move quickly.' },
  { icon: Shield,        label: 'Made in Germany',  desc: 'Reliable, GDPR-compliant, high standards.' },
  { icon: Code2,         label: 'End-to-end',       desc: 'Design, code, deployment — I own it all.' },
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
            setTimeout(() => rightRef.current?.classList.add('visible'), 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-navy-900 py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 5% 50%, rgba(45,98,255,0.06) 0%, transparent 55%)' }}
      />

      <div className="px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left: Photo ── */}
            <div ref={leftRef} className="reveal-left">
              <div className="relative">
                {/* Glow behind photo */}
                <div
                  className="absolute -inset-6 rounded-[50px] opacity-25 pointer-events-none blur-2xl"
                  style={{ background: 'linear-gradient(135deg, #2D62FF, #8B5CF6)' }}
                />
                {/* Photo */}
                <div className="relative lens-frame aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/arthur.jpg"
                    alt="Arthur Richter"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const parent = (e.currentTarget as HTMLImageElement).parentElement!;
                      parent.style.background = 'linear-gradient(135deg, rgba(45,98,255,0.15), transparent)';
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Bottom badge */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-navy-900/85 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5 flex items-center justify-between">
                      <div>
                        <p className="font-display text-sm font-bold text-cream">Arthur Richter</p>
                        <p className="text-xs text-cream-muted">Developer · Bad Driburg 🇩🇪</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 available-dot" />
                        <span className="text-xs text-emerald-400/90 font-mono-label">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Text ── */}
            <div ref={rightRef} className="reveal-right pt-4">
              <span className="font-mono-label text-electric mb-5 block">ABOUT</span>

              <h2
                className="font-display font-bold text-cream leading-tight mb-8"
                style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
              >
                A developer<br />
                <span className="text-gradient-blue">who actually ships.</span>
              </h2>

              <div className="space-y-4 text-cream-muted leading-relaxed mb-10">
                <p>
                  I'm Arthur — a full-stack developer with two years of experience
                  designing and building digital products for clients across Europe and beyond.
                </p>
                <p>
                  I handle every stage myself: concept, design, development, testing,
                  and deployment. One person, full ownership, no handoffs.
                </p>
                <p>
                  My app <strong className="text-cream">Smile4Me</strong> is live on Google Play
                  in 180+ countries. <strong className="text-cream">Clio AI</strong> and{' '}
                  <strong className="text-cream">ThePackt</strong> are live web platforms — all built solo.
                  That's the standard I bring to every client project.
                </p>
              </div>

              {/* Strengths — simple list, not cards */}
              <div className="space-y-4 mb-10">
                {strengths.map((s) => (
                  <div key={s.label} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-electric/20 transition-colors">
                      <s.icon className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <p className="font-semibold text-cream text-sm">{s.label}</p>
                      <p className="text-cream-muted text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 font-bold text-electric hover:gap-3 transition-all group"
              >
                Start a project together
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
