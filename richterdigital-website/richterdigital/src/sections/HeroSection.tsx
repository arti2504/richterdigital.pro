import { ArrowDown, Smartphone, Globe, Code2, Monitor } from 'lucide-react';

const services = [
  { icon: Smartphone, label: 'Android Apps' },
  { icon: Smartphone, label: 'iOS Apps'     },
  { icon: Globe,      label: 'Web Apps'     },
  { icon: Monitor,    label: 'Websites'     },
];

const trust = [
  '🇩🇪 Based in Germany',
  '⚡ Fast delivery',
  '💬 Direct communication',
  '🔒 GDPR compliant',
];

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen bg-navy-900 flex items-center pt-20 pb-16 overflow-hidden">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #2D62FF 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">

          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 rounded-full px-4 py-1.5 mb-8 hero-card-in">
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="font-mono-label text-electric">Available for new projects</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream font-bold leading-[1.04] mb-6 hero-text-in">
            Turn your idea into a<br />
            <span className="text-electric">real digital product</span>
          </h1>

          {/* Subheadline */}
          <p className="text-cream-muted text-xl leading-relaxed max-w-2xl mx-auto mb-10 hero-phones-in">
            I design and build Android apps, iOS apps, web apps, and websites —
            from your first idea all the way to launch. No agency overhead, just direct work.
          </p>

          {/* Service tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 hero-phones-in">
            {services.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-navy-800/80 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-cream"
              >
                <Icon className="w-4 h-4 text-electric" />
                {label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 hero-phones-in">
            <button
              onClick={() => scrollTo('contact')}
              className="glow-button px-8 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all text-base"
            >
              Get a Free Quote
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="px-8 py-4 bg-white/5 text-cream border border-white/10 font-semibold rounded-xl hover:bg-white/10 transition-all text-base flex items-center justify-center gap-2 group"
            >
              See My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 hero-phones-in">
            {trust.map((t) => (
              <span key={t} className="text-sm text-cream-muted">{t}</span>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #070A12)' }}
      />
    </section>
  );
};

export default HeroSection;
