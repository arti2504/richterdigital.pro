import { useEffect, useRef } from 'react';
import { Search, PenTool, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Strategie & Struktur',
    description: 'Wir analysieren Zielgruppe, Wettbewerb und Conversion-Pfade—bevor das erste Pixel gezeichnet wird.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Design & Technik',
    description: 'Schnelles, sauberes Code-Fundament. Ein Design, das Vertrauen schafft und skaliert.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Launch & Optimierung',
    description: 'Wir gehen live, messen Ergebnisse und feilen nach—für kontinuierliches Wachstum.',
    icon: Rocket,
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate line
            if (lineRef.current) {
              lineRef.current.style.transform = 'scaleX(1)';
            }

            // Animate cards with stagger
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prozess"
      className="relative bg-navy-900 py-24 lg:py-32 z-50"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 70%, rgba(45, 98, 255, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <span className="font-mono-label text-electric mb-4 block">PROZESS</span>
            <h2 className="font-display text-display-2 text-cream font-bold">
              So entsteht Ihre neue Website
            </h2>
          </div>

          {/* Timeline line (desktop) */}
          <div className="hidden lg:block relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
            <div
              ref={lineRef}
              className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent origin-left transition-transform duration-1500"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative bg-navy-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/5 hover:border-electric/30 transition-all duration-500 opacity-0"
                style={{ transform: 'translateY(40px) scale(0.98)' }}
              >
                {/* Step number */}
                <div className="absolute -top-4 left-8">
                  <span className="font-mono-label text-electric bg-navy-900 px-3 py-1 rounded-full border border-electric/30">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-electric/20 flex items-center justify-center mb-6 group-hover:bg-electric/30 transition-colors">
                  <step.icon className="w-7 h-7 text-electric" />
                </div>

                {/* Accent line */}
                <div className="w-10 h-1 bg-electric rounded-full mb-6" />

                {/* Content */}
                <h3 className="font-display text-xl lg:text-2xl font-bold text-cream mb-4">
                  {step.title}
                </h3>
                <p className="text-cream-muted leading-relaxed">
                  {step.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl bg-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
