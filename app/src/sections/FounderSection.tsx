import { useEffect, useRef } from 'react';
import { Linkedin, Mail } from 'lucide-react';

const FounderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.style.opacity = '1';
            contentRef.current.style.transform = 'translateY(0)';
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
      className="relative bg-navy-900 py-24 lg:py-32 z-[75]"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(45, 98, 255, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="lens-frame aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden">
                <img
                  src="/images/founder_arthur.jpg"
                  alt="Arthur Richter"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-electric/30 rounded-3xl -z-10" />
            </div>

            {/* Right - Content */}
            <div>
              <span className="font-mono-label text-electric mb-4 block">GRÜNDER</span>
              <h2 className="font-display text-display-3 text-cream font-bold mb-4">
                Arthur Richter
              </h2>
              <p className="text-cream-muted text-lg mb-6">
                Strategischer Denker. Digitaler Visionär. Ihr Partner für messbaren Erfolg.
              </p>
              <div className="space-y-4 text-cream-muted mb-8">
                <p>
                  Mit über 10 Jahren Erfahrung in der digitalen Transformation habe ich gelernt: 
                  Eine Website ist kein Kunstwerk—sie ist ein Geschäftswerkzeug.
                </p>
                <p>
                  Bei Richter Digital verbinden wir ästhetisches Design mit strategischem Denken. 
                  Jedes Pixel hat einen Zweck: Ihre Ziele zu erreichen.
                </p>
                <p>
                  Wir spezialisieren uns auf anspruchsvolle Kunden—Kanzleien, Arztpraxen, 
                  Premium-Immobilien—die mehr erwarten als eine „schöne" Website.
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-cream-muted hover:text-electric hover:bg-navy-700 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:arthur@richterdigital.de"
                  className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-cream-muted hover:text-electric hover:bg-navy-700 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
