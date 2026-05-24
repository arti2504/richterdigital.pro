import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    const content = contentRef.current;
    if (!lens || !content) return;

    // Initial animation on load — translate(-50%,-50%) muss IMMER dabei bleiben,
    // sonst verliert das Element seine absolute Zentrierung
    lens.style.opacity = '0';
    lens.style.transform = 'translate(-50%, -50%) scale(0.86) translateY(40px)';
    content.style.opacity = '0';
    content.style.transform = 'translateY(24px)';

    setTimeout(() => {
      lens.style.transition = 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
      lens.style.opacity = '1';
      lens.style.transform = 'translate(-50%, -50%) scale(1) translateY(0)';

      setTimeout(() => {
        content.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 300);
    }, 100);

    // Scroll-driven exit animation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.7), 1);

      if (progress > 0) {
        lens.style.transform = `translate(-50%, -50%) translateY(${-progress * 50}px) scale(${1 - progress * 0.03})`;
        lens.style.opacity = `${1 - progress * 0.5}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToApp = () => {
    const el = document.getElementById('app');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-navy-900 flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(45, 98, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* Hero Lens Frame — top: calc(50% + 40px) gibt dem fixed Nav (80px) etwas Luft */}
      <div
        ref={lensRef}
        className="absolute z-[6] lens-frame"
        style={{
          left: '50%',
          top: 'calc(50% + 40px)',
          transform: 'translate(-50%, -50%)',
          width: 'min(84vw, 1100px)',
          height: 'min(calc(100dvh - 100px), 680px)',
        }}
      >
        {/* Inner subtle gradient */}
        <div
          className="absolute inset-0 rounded-[40px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Content inside lens */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12"
        >
          {/* Top - Micro label */}
          <div className="font-mono-label text-cream/70">
            RICHTER DIGITAL
          </div>

          {/* Center - Main content */}
          <div className="flex flex-col items-center justify-center text-center flex-1 py-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-display-2 text-cream font-bold mb-4 leading-tight">
              App & Web Development{' '}
              <span className="text-electric">from Germany</span>
            </h1>
            <p className="text-lg lg:text-xl text-cream-muted max-w-xl mb-8">
              We develop apps and web-apps. Simple, fast, and built with care.
            </p>

            {/* Smile4Me Mini Card */}
            <div className="bg-navy-900/60 backdrop-blur-sm rounded-2xl border border-white/8 p-5 max-w-sm w-full">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src="/images/smile4me-logo.png"
                  alt="Smile4Me"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="text-left">
                  <h3 className="font-display text-lg font-bold text-cream">Smile4Me</h3>
                  <p className="text-sm text-cream-muted">Our first app</p>
                </div>
              </div>
              <p className="text-sm text-cream-muted text-left mb-4">
                Prank your friends with a fake livestream!
              </p>
              <button
                onClick={scrollToApp}
                className="w-full py-2.5 bg-electric hover:bg-electric-dark text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Learn more
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="font-mono-label text-cream/50 text-center">
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
