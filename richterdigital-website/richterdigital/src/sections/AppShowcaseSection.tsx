import { useEffect, useRef } from 'react';
import { Check, Tv2, Laugh, Smartphone, Zap } from 'lucide-react';

const features = [
  { icon: Tv2,        text: 'Realistic fake livestream interface' },
  { icon: Laugh,      text: 'Prank your friends & family' },
  { icon: Smartphone, text: 'Works on any Android device' },
  { icon: Zap,        text: 'Free to use, no signup required' },
];

const AppShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lensRef.current) {
              lensRef.current.style.opacity = '1';
              lensRef.current.style.transform = 'translateY(0) scale(1)';
            }
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
      id="app"
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-30 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(45,98,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div
          ref={lensRef}
          className="max-w-7xl mx-auto transition-all duration-1000 opacity-0"
          style={{ transform: 'translateY(100px) scale(0.96)' }}
        >
          {/* Main Lens Card */}
          <div className="lens-frame bg-navy-800/80 backdrop-blur-sm p-8 lg:p-12">
            {/* Header with App Logo */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
              <img
                src="/images/smile4me-logo.png"
                alt="Smile4Me"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover breathing"
              />
              <div>
                <span className="font-mono-label text-electric mb-2 block">OUR APP</span>
                <h2 className="font-display text-display-2 text-cream font-bold mb-2">
                  Smile4Me
                </h2>
                <p className="text-cream-muted text-lg">
                  The ultimate fake livestream prank app
                </p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Description + Features */}
              <div>
                <p className="text-cream-muted leading-relaxed mb-8">
                  Smile4Me lets you create a convincing fake livestream on your phone —
                  perfect for pranking friends and family. It looks just like a real streaming
                  platform, complete with viewer counts, reactions, and comments.
                  Download it free on Google Play and start the fun.
                </p>

                {/* Feature List */}
                <ul className="space-y-4 mb-10">
                  {features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-electric" />
                      </div>
                      <span className="text-cream">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://play.google.com/store/apps/developer?id=Richter+Digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-8 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all inline-flex items-center gap-2"
                  >
                    Get it on Google Play
                  </a>
                  <span className="px-6 py-4 bg-white/5 text-cream-muted rounded-xl border border-white/10 flex items-center">
                    App Store — Coming Soon
                  </span>
                </div>
              </div>

              {/* Right: Screenshots in phone frames */}
              <div className="flex gap-4 justify-center lg:justify-end">
                <div className="lens-frame-inner w-40 md:w-52 aspect-[9/16] relative overflow-hidden hover:scale-[1.03] transition-transform duration-300">
                  <img
                    src="/images/smile4me-screenshot1.png"
                    alt="Smile4Me Screenshot 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lens-frame-inner w-40 md:w-52 aspect-[9/16] relative overflow-hidden hover:scale-[1.03] transition-transform duration-300 mt-8">
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

export default AppShowcaseSection;
