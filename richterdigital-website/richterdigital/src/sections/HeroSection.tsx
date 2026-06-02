import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen bg-navy-900 flex items-center pt-20 pb-12 overflow-hidden">

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45,98,255,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Ghost headline in background */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            className="font-display font-bold text-center leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(120px, 20vw, 260px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(45,98,255,0.08)',
              userSelect: 'none',
              letterSpacing: '-0.04em',
            }}
          >
            RICHTER
          </span>
        </div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">

          {/* Available badge */}
          <div className="inline-flex items-center gap-2.5 bg-navy-800/80 border border-white/10 rounded-full px-4 py-1.5 mb-10 hero-card-in backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 available-dot flex-shrink-0" />
            <span className="font-mono-label text-emerald-400/90">Available for new projects</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display font-bold leading-[1.02] mb-6 hero-text-in"
            style={{ fontSize: 'clamp(42px, 7vw, 88px)' }}
          >
            <span className="text-cream">I build apps &amp; websites</span>
            <br />
            <span className="text-gradient-blue">from your idea.</span>
          </h1>

          {/* Sub */}
          <p className="text-cream-muted text-xl leading-relaxed max-w-2xl mx-auto mb-10 hero-phones-in">
            Android, iOS, web apps, websites — whatever your idea needs.
            Direct work, no agency. Based in Germany.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14 hero-phones-in">
            <button
              onClick={() => scrollTo('contact')}
              className="glow-button-border px-8 py-4 bg-electric text-white font-semibold rounded-xl text-base"
            >
              Get a Free Quote
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="px-8 py-4 bg-navy-800/80 text-cream border border-white/10 font-semibold rounded-xl hover:bg-navy-800 hover:border-white/20 transition-all text-base flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              See My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 hero-phones-in">
            {[
              '🇩🇪 Based in Germany',
              '⚡ Fast turnaround',
              '💬 Direct communication',
              '🔒 GDPR compliant',
            ].map((t) => (
              <span key={t} className="text-sm text-cream-muted/70">{t}</span>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-muted/40 hover:text-cream-muted transition-colors group"
        aria-label="Scroll down"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/20 group-hover:to-white/40 transition-colors" />
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
};

export default HeroSection;
