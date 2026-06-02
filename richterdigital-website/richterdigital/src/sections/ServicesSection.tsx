import { useEffect, useRef } from 'react';
import { Smartphone, Globe, Monitor, Code2 } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Android Apps',
    description:
      'Native Android applications built for performance and a great user experience. From simple utilities to complex feature-rich apps — published to the Google Play Store.',
    tags: ['Kotlin / Java', 'Google Play', 'AdMob', 'Firebase'],
    color: '#3DDC84',
  },
  {
    icon: Smartphone,
    title: 'iOS Apps',
    description:
      'iPhone and iPad apps that feel at home on Apple devices. Smooth animations, native UI, and App Store-ready quality from day one.',
    tags: ['Swift / SwiftUI', 'App Store', 'Core Data', 'Push Notifications'],
    color: '#007AFF',
  },
  {
    icon: Globe,
    title: 'Web Apps',
    description:
      'Browser-based applications, SaaS tools, dashboards, or customer portals. Fast, modern, and scalable — built with React and a solid backend if needed.',
    tags: ['React', 'TypeScript', 'Node.js', 'Supabase / Firebase'],
    color: '#2D62FF',
  },
  {
    icon: Monitor,
    title: 'Websites',
    description:
      'Professional marketing websites and landing pages that actually convert. Clean design, fast loading, SEO-friendly, and easy for you to update.',
    tags: ['React / Vite', 'Tailwind CSS', 'SEO', 'CMS optional'],
    color: '#A78BFA',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              setTimeout(() => card.classList.add('visible'), i * 100);
            });
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
      id="services"
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(45,98,255,0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-mono-label text-electric mb-4 block">SERVICES</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              What I build
            </h2>
            <p className="text-cream-muted text-lg max-w-xl mx-auto">
              Whatever platform your idea lives on — I can build it.
              From mobile to web, concept to finished product.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="reveal-up lens-frame bg-navy-800/60 p-7 flex flex-col gap-5 hover:border-electric/30 transition-colors group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}18` }}
                >
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-cream mb-3 group-hover:text-electric transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-cream-muted text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-cream-muted bg-white/5 border border-white/8 rounded-lg px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-cream-muted text-sm mt-10">
            Not sure what you need?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-electric hover:underline"
            >
              Just describe your idea →
            </button>
          </p>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
