import { useEffect, useRef } from 'react';
import { type LucideIcon, MessageSquare, Code2, Rocket } from 'lucide-react';

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Share your idea',
    description:
      'Tell me what you want to build — a rough idea is enough. We talk through the concept, the target users, and the key features. Free, no commitment.',
  },
  {
    number: '02',
    icon: Code2,
    title: 'I build it',
    description:
      'I design and develop your product from scratch. You get regular updates and can give feedback at every stage. Transparent process, no surprises.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'You launch',
    description:
      'Your app or website goes live. I handle the deployment — App Store, Google Play, or your domain. After launch I am still available for support and updates.',
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            itemRefs.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
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
      id="how-it-works"
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle separator line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(45,98,255,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-mono-label text-electric mb-4 block">HOW IT WORKS</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              From idea to launch —{' '}
              <span className="text-electric">three steps</span>
            </h2>
            <p className="text-cream-muted text-lg max-w-lg mx-auto">
              Simple and transparent. No complicated processes, no agency jargon.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="reveal-up relative"
              >
                {/* Connector line between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-electric/30 to-transparent -translate-x-6 z-0" />
                )}

                <div className="relative z-10 lens-frame bg-navy-800/50 p-7">
                  {/* Number + Icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono-label text-electric/40 text-2xl font-bold">{step.number}</span>
                    <div className="w-11 h-11 rounded-xl bg-electric/15 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-electric" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-cream mb-3">
                    {step.title}
                  </h3>
                  <p className="text-cream-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glow-button px-8 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all"
            >
              Start with your idea →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
