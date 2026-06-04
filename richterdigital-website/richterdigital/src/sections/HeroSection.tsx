import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen bg-navy-900 flex flex-col justify-end overflow-hidden">

      {/* ── Video background (swap poster + src when you have the file) ── */}
      <div className="absolute inset-0 z-[1]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/arthur.jpg"
        >
          {/* Drop hero-video.mp4 into images/ and it auto-activates */}
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7,10,18,0.55) 0%, rgba(7,10,18,0.3) 40%, rgba(7,10,18,0.85) 100%)',
          }}
        />
      </div>

      {/* ── Subtle blue glow at top ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(45,98,255,0.18) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Main content — pinned to bottom of hero ── */}
      <div className="relative z-10 px-6 lg:px-16 pb-20 pt-32">
        <div className="max-w-6xl mx-auto">

          {/* Available badge */}
          <div className="inline-flex items-center gap-2.5 bg-navy-800/70 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm hero-card-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 available-dot flex-shrink-0" />
            <span className="font-mono-label text-emerald-400/90">Available for new projects</span>
          </div>

          {/* Headline — huge like Droids */}
          <h1
            className="font-display font-bold text-cream leading-[1.0] mb-8 hero-text-in"
            style={{ fontSize: 'clamp(48px, 8.5vw, 110px)', letterSpacing: '-0.03em' }}
          >
            Turn your idea<br />
            <span
              className="relative inline-block"
              style={{
                WebkitTextStroke: '1px rgba(45,98,255,0.6)',
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #5B85FF 0%, #2D62FF 40%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              into a real product.
            </span>
          </h1>

          {/* Sub + CTA row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 hero-phones-in">
            <div className="max-w-xl">
              <p className="text-cream-muted text-xl leading-relaxed">
                Android, iOS, web apps and websites — built end-to-end
                by one developer who ships. Based in Germany, working internationally.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:ml-auto flex-shrink-0">
              <button
                onClick={() => scrollTo('contact')}
                className="glow-button-border px-8 py-4 bg-electric text-white font-bold rounded-xl text-base"
              >
                Get a Free Quote
              </button>
              <button
                onClick={() => scrollTo('portfolio')}
                className="px-8 py-4 bg-white/8 text-cream border border-white/15 font-semibold rounded-xl hover:bg-white/12 transition-all text-base flex items-center gap-2 group backdrop-blur-sm"
              >
                See the Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll line */}
      <button
        onClick={() => scrollTo('stats')}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-1.5 text-cream-muted/40 hover:text-cream-muted/70 transition-colors group"
        aria-label="Scroll"
      >
        <span className="font-mono-label text-[10px]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </button>
    </section>
  );
};

export default HeroSection;
