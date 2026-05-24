import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 127,
    suffix: '%',
    label: 'Kontaktanfragen',
    description: 'Nach Relaunch mit klarer Conversion-Struktur',
  },
  {
    icon: TrendingDown,
    value: 41,
    suffix: '%',
    prefix: '-',
    label: 'Absprungrate',
    description: 'Durch Ladezeit-Optimierung & Fokus',
  },
  {
    icon: Zap,
    value: 1.9,
    suffix: 's',
    label: 'Time to First Action',
    description: 'Nutzer verstehen das Angebot sofort',
  },
];

const ResultsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Animate lens
            if (lensRef.current) {
              lensRef.current.style.opacity = '1';
              lensRef.current.style.transform = 'translateX(0) scale(1)';
            }

            // Animate stats
            if (statsRef.current) {
              statsRef.current.style.opacity = '1';
              statsRef.current.style.transform = 'translateX(0)';
            }

            // Animate numbers
            stats.forEach((stat, index) => {
              const duration = 1500;
              const startTime = Date.now();
              const startValue = 0;
              const endValue = stat.value;

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = startValue + (endValue - startValue) * easeOut;

                setAnimatedValues((prev) => {
                  const newValues = [...prev];
                  newValues[index] = currentValue;
                  return newValues;
                });

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              setTimeout(() => requestAnimationFrame(animate), index * 200);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const formatValue = (value: number, index: number) => {
    const stat = stats[index];
    if (stat.value % 1 !== 0) {
      return value.toFixed(1);
    }
    return Math.round(value).toString();
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-40 overflow-hidden"
    >
      {/* Background diagonal rays */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ray-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D62FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#2D62FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#2D62FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="100" x2="100" y2="0" stroke="url(#ray-gradient)" strokeWidth="0.5" />
        <line x1="20" y1="100" x2="100" y2="20" stroke="url(#ray-gradient)" strokeWidth="0.3" />
        <line x1="0" y1="80" x2="80" y2="0" stroke="url(#ray-gradient)" strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Lens with image */}
            <div
              ref={lensRef}
              className="lens-frame aspect-[4/3] relative overflow-hidden transition-all duration-1000 opacity-0"
              style={{ transform: 'translateX(-70vw) scale(0.94)' }}
            >
              <img
                src="/images/results_office.jpg"
                alt="Modern office"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 98, 255, 0.1) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Right - Stats */}
            <div
              ref={statsRef}
              className="transition-all duration-1000 opacity-0"
              style={{ transform: 'translateX(10vw)' }}
            >
              <span className="font-mono-label text-electric mb-4 block">ERGEBNISSE</span>
              <h2 className="font-display text-display-2 text-cream font-bold mb-12">
                Mehr Anfragen.<br />
                <span className="text-electric">Weniger Reibung.</span>
              </h2>

              <div className="space-y-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-6 h-6 text-electric" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-display text-4xl lg:text-5xl font-bold text-electric">
                          {stat.prefix || '+'}{formatValue(animatedValues[index], index)}{stat.suffix}
                        </span>
                      </div>
                      <div className="font-semibold text-cream mb-1">{stat.label}</div>
                      <div className="text-sm text-cream-muted">{stat.description}</div>
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

export default ResultsSection;
