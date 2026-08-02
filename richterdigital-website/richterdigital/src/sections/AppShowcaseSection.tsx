import { useEffect, useRef } from 'react';
import { Tv2, Laugh, Smartphone, Zap } from 'lucide-react';

const features = [
  { icon: Tv2,        text: 'Realistic fake livestream interface' },
  { icon: Laugh,      text: 'Prank your friends & family' },
  { icon: Smartphone, text: 'Works on any Android device' },
  { icon: Zap,        text: 'Free to use — no signup required' },
];

const AppShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRef.current?.classList.add('visible');
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
      id="app"
      className="relative bg-navy-900 py-24 lg:py-32 z-30 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(45,98,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 15% 70%, rgba(139,92,246,0.05) 0%, transparent 45%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        {/* Section label */}
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <span className="font-mono-label text-electric">OUR APP</span>
        </div>

        <div ref={cardRef} className="max-w-7xl mx-auto reveal-up">
          <div className="lens-frame bg-navy-800/70 backdrop-blur-sm p-8 lg:p-12">

            {/* App header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10 pb-10 border-b border-white/5">
              <img loading="lazy" decoding="async"
                src="/images/smile4me-logo.png"
                alt="Smile4Me"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover breathing flex-shrink-0"
              />
              <div>
                <h2 className="font-display text-3xl lg:text-4xl text-cream font-bold mb-1">
                  Smile4Me
                </h2>
                <p className="text-cream-muted">
                  The ultimate fake livestream prank app for Android
                </p>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — description + features + CTAs */}
              <div>
                <p className="text-cream-muted leading-relaxed mb-8">
                  Smile4Me turns your Android phone into a convincing fake livestream.
                  It looks exactly like a real streaming platform — complete with animated
                  viewer counts, live chat reactions, and comments. Hand it to someone and
                  watch their reaction. The perfect harmless prank, available free on Google Play.
                </p>

                <ul className="space-y-3.5 mb-10">
                  {features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-electric/15 flex items-center justify-center flex-shrink-0">
                        <f.icon className="w-4 h-4 text-electric" />
                      </div>
                      <span className="text-cream text-sm">{f.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://play.google.com/store/apps/developer?id=Richter+Digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-7 py-3.5 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all text-sm"
                  >
                    Get it on Google Play
                  </a>
                  <span className="px-5 py-3.5 bg-white/5 text-cream-muted rounded-xl border border-white/8 text-sm flex items-center">
                    App Store — Coming Soon
                  </span>
                </div>
              </div>

              {/* Right — Screenshots */}
              <div className="flex gap-5 justify-center lg:justify-end items-end">
                <div className="lens-frame-inner w-40 md:w-52 aspect-[9/16] overflow-hidden hover:scale-[1.03] transition-transform duration-500 flex-shrink-0">
                  <img loading="lazy" decoding="async"
                    src="/images/smile4me-screenshot1.webp"
                    alt="Smile4Me Screenshot 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lens-frame-inner w-40 md:w-52 aspect-[9/16] overflow-hidden hover:scale-[1.03] transition-transform duration-500 flex-shrink-0 mb-10">
                  <img loading="lazy" decoding="async"
                    src="/images/smile4me-screenshot2.webp"
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

export default AppShowcaseSection;
