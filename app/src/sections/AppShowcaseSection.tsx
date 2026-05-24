import { useEffect, useRef } from 'react';
import { Check, Sparkles, Camera, Share2, MessageCircle } from 'lucide-react';

const features = [
  { icon: Sparkles, text: 'Fun emoji filters & face effects' },
  { icon: Camera, text: 'Live streaming with reactions' },
  { icon: Share2, text: 'Share photos & videos with friends' },
  { icon: MessageCircle, text: 'Easy to use, fast & lightweight' },
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
          backgroundImage: 'url(/images/project_city_street.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'rgba(7,10,18,0.82)' }}
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
                  Express yourself with emoji filters and effects
                </p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Description + Features */}
              <div>
                <p className="text-cream-muted leading-relaxed mb-8">
                  Smile4Me is a social entertainment app that lets you add fun emoji filters and 
                  effects to your photos and videos. Share your moments with friends, go live with 
                  interactive reactions, and make every memory more fun.
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
                  <button className="glow-button px-8 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all">
                    Get it on Google Play
                  </button>
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
