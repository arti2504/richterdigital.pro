import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToApp = () => {
    const el = document.getElementById('app');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-navy-900 flex items-center pt-20 pb-16 overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(45,98,255,0.12) 0%, transparent 65%)',
        }}
      />
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(7,10,18,0.6))',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Outer lens card */}
          <div className="lens-frame bg-navy-800/50 backdrop-blur-sm p-8 lg:p-14 hero-card-in">

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* ── Left: Text ── */}
              <div className="hero-text-in">
                <span className="font-mono-label text-electric mb-5 block">RICHTER DIGITAL</span>

                <h1 className="font-display text-4xl md:text-5xl lg:text-[52px] text-cream font-bold leading-[1.08] mb-5">
                  Prank your friends<br />
                  with a{' '}
                  <span className="text-electric">fake livestream</span>
                </h1>

                <p className="text-cream-muted text-lg leading-relaxed mb-8 max-w-md">
                  Smile4Me makes your phone look exactly like a real streaming
                  platform — live viewer counts, chat reactions, comments and all.
                  Download free on Google Play.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {['Fake live viewer count', 'Animated reactions', 'Free to use', 'No signup'].map((f) => (
                    <span
                      key={f}
                      className="text-xs text-cream/80 bg-electric/10 border border-electric/20 rounded-full px-3.5 py-1.5 font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="https://play.google.com/store/apps/developer?id=Richter+Digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-7 py-3.5 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all text-sm"
                  >
                    Get it on Google Play
                  </a>
                  <button
                    onClick={scrollToApp}
                    className="text-cream-muted hover:text-cream transition-colors text-sm flex items-center gap-2 group"
                  >
                    Learn more
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* ── Right: Phone mockups ── */}
              <div className="flex gap-5 justify-center lg:justify-end items-end hero-phones-in">
                <div className="lens-frame-inner w-36 sm:w-44 md:w-48 aspect-[9/16] overflow-hidden hover:scale-[1.03] transition-transform duration-500 flex-shrink-0">
                  <img
                    src="/images/smile4me-screenshot1.png"
                    alt="Smile4Me Screenshot 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lens-frame-inner w-36 sm:w-44 md:w-48 aspect-[9/16] overflow-hidden hover:scale-[1.03] transition-transform duration-500 flex-shrink-0 mb-10">
                  <img
                    src="/images/smile4me-screenshot2.png"
                    alt="Smile4Me Screenshot 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
