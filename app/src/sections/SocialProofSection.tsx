import { useEffect, useRef } from 'react';
import { Star, Building2, Stethoscope, Scale, Home, Briefcase } from 'lucide-react';

// Branchen, in denen wir tätig sind - statt "Bekannt aus"
const industries = [
  { name: 'Anwaltskanzleien', icon: Scale },
  { name: 'Arztpraxen', icon: Stethoscope },
  { name: 'Immobilien', icon: Home },
  { name: 'Unternehmen', icon: Briefcase },
  { name: 'Startups', icon: Building2 },
];

const SocialProofSection = () => {
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
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-900 py-16 z-[25]"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto transition-all duration-1000 opacity-0 translate-y-5"
        >
          {/* Google Rating */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-navy-800/50 hover:bg-navy-800 rounded-full px-5 py-2.5 border border-white/5 hover:border-electric/30 transition-all group"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-cream font-medium">5.0</span>
              <span className="text-cream-muted text-sm">Google Bewertungen</span>
            </a>
          </div>

          {/* Industries we serve */}
          <div className="text-center">
            <p className="font-mono-label text-cream-muted mb-8">BRANCHEN, DIE WIR BEDienen</p>
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
              {industries.map((industry) => (
                <div
                  key={industry.name}
                  className="flex items-center gap-3 px-5 py-3 bg-navy-800/30 rounded-xl border border-white/5 hover:border-electric/30 hover:bg-navy-800/50 transition-all group"
                >
                  <industry.icon className="w-5 h-5 text-electric" />
                  <span className="text-cream text-sm font-medium">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
