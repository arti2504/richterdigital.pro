import { useEffect, useRef } from 'react';
import { type LucideIcon, Shield, Zap, MessageSquare, Code2 } from 'lucide-react';

interface Strength {
  icon: LucideIcon;
  label: string;
  desc: string;
}

const strengths: Strength[] = [
  { icon: MessageSquare, label: 'Direct contact',  desc: 'You talk to me, not a project manager.' },
  { icon: Zap,           label: 'Fast turnaround', desc: 'No agency layers, I move quickly.' },
  { icon: Shield,        label: 'Made in Germany', desc: 'Reliable, GDPR-compliant, high standards.' },
  { icon: Code2,         label: 'End-to-end',      desc: 'Design, code, deployment — all handled.' },
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
            setTimeout(() => rightRef.current?.classList.add('visible'), 120);
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
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 15% 60%, rgba(45,98,255,0.06) 0%, transparent 55%)' }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: Photo ── */}
            <div ref={leftRef} className="reveal-left">
              <div className="relative max-w-sm mx-auto lg:mx-0">

                {/* Glow behind photo */}
                <div
                  className="absolute -inset-4 rounded-[44px] blur-2xl opacity-20 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, #2D62FF, #8B5CF6)' }}
                />

                {/* Photo frame */}
                <div className="relative lens-frame overflow-hidden aspect-[3/4]">
                  <img
                    src="/images/arthur.jpg"
                    alt="Arthur Richter"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback if photo not yet added
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.classList.add('bg-navy-800');
                    }}
                  />
                  {/* Subtle overlay gradient at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(7,10,18,0.7), transparent)' }}
                  />
                  {/* Name badge over photo */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-navy-900/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-display text-sm font-bold text-cream">Arthur Richter</p>
                        <p className="text-xs text-cream-muted">Freelance Developer · Bad Driburg 🇩🇪</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 available-dot" />
                        <span className="text-xs text-emerald-400/80 font-mono-label">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Text ── */}
            <div ref={rightRef} className="reveal-right pt-2">
              <span className="font-mono-label text-electric mb-5 block">ABOUT ME</span>

              <h2 className="font-display text-display-2 text-cream font-bold mb-6 leading-tight">
                A developer who<br />
                <span className="text-gradient-blue">actually ships.</span>
              </h2>

              <div className="space-y-4 text-cream-muted leading-relaxed mb-8">
                <p>
                  I'm Arthur — a freelance developer from Bad Driburg, Germany. I build
                  apps and websites for people who have an idea and need someone to
                  turn it into a real product.
                </p>
                <p>
                  I started by building <strong className="text-cream">Smile4Me</strong> —
                  a prank app I designed, coded, and published to Google Play entirely on my own.
                  That's the level of ownership I bring to every project.
                </p>
                <p>
                  I'm at the start of my freelance journey, which means I keep rates competitive
                  and bring extra motivation to every project. You get someone who's genuinely
                  invested in making your idea work.
                </p>
              </div>

              {/* Strengths */}
              <div className="grid grid-cols-2 gap-3">
                {strengths.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-start gap-3 bg-navy-800/50 rounded-2xl p-4 border border-white/5 hover:border-electric/25 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-electric/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <s.icon className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cream">{s.label}</p>
                      <p className="text-xs text-cream-muted/80 mt-0.5 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 glow-button-border px-7 py-3.5 bg-electric text-white font-semibold rounded-xl text-sm"
              >
                Let's work together →
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
