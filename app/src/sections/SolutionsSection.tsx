import { useEffect, useRef } from 'react';
import { Check, Sparkles, TrendingUp, Crown } from 'lucide-react';

const solutions = [
  {
    id: 'essential',
    name: 'Essential',
    subtitle: 'Für Sichtbarkeit & Vertrauen',
    description: 'Die professionelle Basis für Ihre digitale Präsenz.',
    icon: Sparkles,
    features: [
      'Responsive Website bis 5 Seiten',
      'SEO-Grundoptimierung',
      'Kontaktformular & Karten-Integration',
      'DSGVO-konformes Setup',
      '3 Monate Support',
    ],
    highlighted: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    subtitle: 'Für Lead-Generierung & Vertrieb',
    description: 'Maximieren Sie Ihre Conversion mit strategischem Design.',
    icon: TrendingUp,
    features: [
      'Alles aus Essential, plus:',
      'Bis zu 10 Seiten',
      'Conversion-Optimierung',
      'Blog & Content-Management',
      'Analytics & Tracking-Setup',
      '6 Monate Support',
    ],
    highlighted: true,
  },
  {
    id: 'dominance',
    name: 'Dominance',
    subtitle: 'Full-Custom Lösung & Branding',
    description: 'Die komplette digitale Transformation für Marktführer.',
    icon: Crown,
    features: [
      'Alles aus Growth, plus:',
      'Unbegrenzte Seiten',
      'Individuelles Design-System',
      'Multi-Language Support',
      'API-Integrationen',
      '12 Monate Premium-Support',
    ],
    highlighted: false,
  },
];

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                }, index * 150);
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

  const scrollToContact = () => {
    const element = document.getElementById('kontakt');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-900 py-24 lg:py-32 z-[70]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(45, 98, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-mono-label text-electric mb-4 block">UNSERE LÖSUNGEN</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-6">
              Investition in Ihren Erfolg
            </h2>
            <p className="text-cream-muted max-w-2xl mx-auto text-lg">
              Keine versteckten Kosten. Keine Überraschungen. Nur messbare Ergebnisse.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`group relative rounded-3xl p-8 lg:p-10 transition-all duration-700 opacity-0 ${
                  solution.highlighted
                    ? 'bg-gradient-to-b from-electric/20 to-navy-800 border-2 border-electric/50 scale-105'
                    : 'bg-navy-800/50 border border-white/5 hover:border-white/10'
                }`}
                style={{ transform: 'translateY(40px)' }}
              >
                {/* Popular badge */}
                {solution.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="font-mono-label text-xs bg-electric text-white px-4 py-1.5 rounded-full">
                      EMPFOHLEN
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  solution.highlighted ? 'bg-electric/30' : 'bg-electric/20'
                }`}>
                  <solution.icon className="w-7 h-7 text-electric" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold text-cream mb-2">
                  {solution.name}
                </h3>
                <p className="text-electric text-sm font-medium mb-3">
                  {solution.subtitle}
                </p>
                <p className="text-cream-muted text-sm mb-8">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                      <span className="text-cream/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    solution.highlighted
                      ? 'bg-electric text-white hover:bg-electric-dark glow-button'
                      : 'bg-white/5 text-cream hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Anfragen
                </button>
              </div>
            ))}
          </div>

          {/* No-Risk Guarantee */}
          <div className="bg-navy-800/50 rounded-3xl p-8 lg:p-12 border border-electric/20 text-center">
            <div className="inline-flex items-center gap-2 bg-electric/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-electric" />
              <span className="font-mono-label text-electric text-xs">ZUFRIEDENHEITS-GARANTIE</span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-cream mb-4">
              Wir gehen erst live, wenn das Design zu 100% sitzt.
            </h3>
            <p className="text-cream-muted max-w-2xl mx-auto">
              Unbegrenzte Revisionen während der Design-Phase. Ihre Zufriedenheit ist unsere Priorität.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
