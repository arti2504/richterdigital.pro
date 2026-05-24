import { useEffect, useRef } from 'react';
import { Code, Smartphone, Zap } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lensRef.current) {
              lensRef.current.style.opacity = '1';
              lensRef.current.style.transform = 'translateX(0) scale(1)';
            }
            if (textRef.current) {
              setTimeout(() => {
                if (textRef.current) {
                  textRef.current.style.opacity = '1';
                  textRef.current.style.transform = 'translateX(0)';
                }
              }, 200);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(45, 98, 255, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Decorative Lens */}
            <div
              ref={lensRef}
              className="lens-frame aspect-square max-w-md mx-auto lg:mx-0 relative overflow-hidden transition-all duration-1000 opacity-0"
              style={{ transform: 'translateX(-60vw) scale(0.92)' }}
            >
              {/* Decorative content */}
              <div className="absolute inset-0 flex items-center justify-center bg-navy-800/50">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-50"
                    style={{ background: '#2D62FF' }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-3xl opacity-40"
                    style={{ background: '#8B5CF6' }}
                  />
                  <div
                    className="absolute bottom-8 right-0 w-20 h-20 rounded-full blur-3xl opacity-40"
                    style={{ background: '#EC4899' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-3xl bg-navy-800 border border-white/10 flex items-center justify-center">
                      <Code className="w-10 h-10 text-electric" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Border shimmer */}
              <div className="absolute inset-0 rounded-[40px] border-shimmer pointer-events-none" />
            </div>

            {/* Right - Text */}
            <div
              ref={textRef}
              className="transition-all duration-1000 opacity-0"
              style={{ transform: 'translateX(10vw)' }}
            >
              <span className="font-mono-label text-electric mb-4 block">ABOUT US</span>
              <h2 className="font-display text-display-2 text-cream font-bold mb-6">
                Building Digital Products{' '}
                <span className="text-electric">That Matter</span>
              </h2>
              <p className="text-cream-muted leading-relaxed mb-6">
                Richter Digital is a small but passionate development studio based in Bad Driburg, Germany. 
                We specialize in building mobile apps and web applications that focus on user experience, 
                performance, and clean design.
              </p>
              <p className="text-cream-muted leading-relaxed mb-8">
                Our goal is simple: create products people enjoy using every day. We believe great 
                software should be fun, fast, and accessible to everyone.
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Smartphone, label: 'Mobile Apps' },
                  { icon: Code, label: 'Web Apps' },
                  { icon: Zap, label: 'Fast & Clean' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-navy-800/50 rounded-xl px-4 py-2.5 border border-white/5 hover:border-electric/30 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-electric" />
                    <span className="text-sm text-cream">{item.label}</span>
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

export default AboutSection;
