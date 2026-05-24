import { useEffect, useRef } from 'react';
import { Shield, Server, Lock, FileCheck } from 'lucide-react';

const techStack = [
  { name: 'WordPress', icon: 'WP' },
  { name: 'React', icon: 'Re' },
  { name: 'Next.js', icon: 'Nx' },
  { name: 'Google', icon: 'Gg' },
  { name: 'Analytics', icon: 'An' },
  { name: 'SEO', icon: 'Se' },
  { name: 'SSL Secure', icon: 'SS' },
  { name: 'DSGVO', icon: 'DS' },
  { name: 'Server DE', icon: 'DE' },
];

const trustBadges = [
  { icon: Shield, label: 'SSL Verschlüsselt' },
  { icon: Lock, label: 'DSGVO Konform' },
  { icon: Server, label: 'Serverstandort Deutschland' },
  { icon: FileCheck, label: 'Rechtssichere Verträge' },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Duplicate for seamless loop
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-900 py-16 z-[85] overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 px-6">
          <span className="font-mono-label text-cream-muted mb-2 block">TECHNOLOGIE & SICHERHEIT</span>
          <h3 className="font-display text-xl text-cream font-semibold">
            Moderne Technologie. Höchste Sicherheit.
          </h3>
        </div>

        {/* Marquee */}
        <div className="relative mb-12 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />

          <div className="flex marquee-track">
            {duplicatedStack.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 mx-6 flex items-center gap-3 px-6 py-3 bg-navy-800/50 rounded-xl border border-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="font-mono text-sm text-cream-muted">{tech.icon}</span>
                </div>
                <span className="text-cream-muted font-medium whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 px-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-cream-muted"
            >
              <badge.icon className="w-5 h-5 text-electric" />
              <span className="text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default TechStackSection;
