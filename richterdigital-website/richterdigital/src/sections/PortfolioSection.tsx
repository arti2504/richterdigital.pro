import { useEffect, useRef } from 'react';
import { ExternalLink, Smartphone, Plus } from 'lucide-react';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const moreRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRef.current?.classList.add('visible');
            setTimeout(() => moreRef.current?.classList.add('visible'), 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 65% 40%, rgba(45,98,255,0.07) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-mono-label text-electric mb-4 block">PORTFOLIO</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              What I've built
            </h2>
            <p className="text-cream-muted text-lg max-w-xl mx-auto">
              Real products, shipped and live. More projects are in progress.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Smile4Me — featured card */}
            <div ref={cardRef} className="reveal-up lg:col-span-1">
              <div className="lens-frame bg-navy-800/70 p-8 lg:p-10 h-full flex flex-col">

                {/* App header */}
                <div className="flex items-center gap-5 mb-6">
                  <img
                    src="/images/smile4me-logo.png"
                    alt="Smile4Me"
                    className="w-16 h-16 rounded-2xl object-cover breathing flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-2xl font-bold text-cream">Smile4Me</h3>
                      <span className="text-xs font-mono-label text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2.5 py-0.5">
                        Live
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cream-muted">
                      <Smartphone className="w-3.5 h-3.5 text-electric" />
                      Android App · Google Play Store
                    </div>
                  </div>
                </div>

                <p className="text-cream-muted leading-relaxed mb-6 flex-1">
                  A fake livestream prank app for Android. Designed to look exactly
                  like a real streaming platform — complete with animated viewer counts,
                  live reactions, and chat. Built, published, and maintained solo.
                </p>

                {/* Screenshots */}
                <div className="flex gap-4 mb-7">
                  <div className="lens-frame-inner w-28 sm:w-36 aspect-[9/16] overflow-hidden flex-shrink-0">
                    <img
                      src="/images/smile4me-screenshot1.png"
                      alt="Smile4Me Screenshot 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lens-frame-inner w-28 sm:w-36 aspect-[9/16] overflow-hidden flex-shrink-0 mt-5">
                    <img
                      src="/images/smile4me-screenshot2.png"
                      alt="Smile4Me Screenshot 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {['Android', 'Kotlin', 'Google Play', 'AdMob', 'Firebase'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-cream-muted bg-white/5 border border-white/8 rounded-lg px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="https://play.google.com/store/apps/developer?id=Richter+Digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric-light transition-colors font-medium"
                >
                  View on Google Play
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* "Your project here" placeholder cards */}
            <div ref={moreRef} className="reveal-up flex flex-col gap-6">

              {/* Placeholder 1 */}
              <div className="lens-frame bg-navy-800/30 border-dashed p-8 flex flex-col items-center justify-center text-center min-h-[220px] hover:bg-navy-800/50 hover:border-electric/30 transition-all group cursor-pointer"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                  <Plus className="w-6 h-6 text-electric" />
                </div>
                <p className="font-display text-lg font-bold text-cream-muted group-hover:text-cream transition-colors">
                  Your project here
                </p>
                <p className="text-sm text-cream-muted/60 mt-1">
                  Have an idea? Let's build it together.
                </p>
              </div>

              {/* Placeholder 2 */}
              <div className="lens-frame bg-navy-800/30 border-dashed p-8 flex flex-col items-center justify-center text-center min-h-[220px] hover:bg-navy-800/50 hover:border-electric/30 transition-all group cursor-pointer"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                  <Plus className="w-6 h-6 text-electric" />
                </div>
                <p className="font-display text-lg font-bold text-cream-muted group-hover:text-cream transition-colors">
                  More projects coming
                </p>
                <p className="text-sm text-cream-muted/60 mt-1">
                  Currently building — check back soon.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
