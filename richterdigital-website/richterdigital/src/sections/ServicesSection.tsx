import { useEffect, useRef } from 'react';
import { type LucideIcon, Smartphone, Globe, Monitor } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  span: string;
}

const services: Service[] = [
  {
    icon: Smartphone,
    title: 'Android Apps',
    description:
      'Native Android apps built for performance and published to Google Play. From simple tools to feature-rich applications — with AdMob monetization if needed.',
    tags: ['Kotlin', 'Google Play', 'Firebase', 'AdMob'],
    accent: '#3DDC84',
    span: 'lg:col-span-2',
  },
  {
    icon: Smartphone,
    title: 'iOS Apps',
    description:
      'iPhone & iPad apps that feel at home on Apple devices. Smooth, native, App Store-ready.',
    tags: ['Swift / SwiftUI', 'App Store'],
    accent: '#007AFF',
    span: 'lg:col-span-1',
  },
  {
    icon: Globe,
    title: 'Web Apps',
    description:
      'Browser-based tools, SaaS dashboards, or customer portals. Fast, modern, scalable.',
    tags: ['React', 'TypeScript', 'Node.js'],
    accent: '#2D62FF',
    span: 'lg:col-span-1',
  },
  {
    icon: Monitor,
    title: 'Websites',
    description:
      'Marketing sites and landing pages that convert — clean design, fast, SEO-ready.',
    tags: ['React / Vite', 'Tailwind', 'SEO'],
    accent: '#A78BFA',
    span: 'lg:col-span-2',
  },
];

const TiltCard = ({
  service,
  index,
  cardRef,
}: {
  service: Service;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.02)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className={`reveal-up tilt-card lens-frame bg-navy-800/60 p-7 lg:p-8 flex flex-col gap-5 cursor-default ${service.span}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon + title */}
      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${service.accent}18` }}
        >
          <service.icon className="w-5 h-5" style={{ color: service.accent }} />
        </div>
        <h3 className="font-display text-xl font-bold text-cream">{service.title}</h3>
      </div>

      {/* Description */}
      <p className="text-cream-muted text-sm leading-relaxed flex-1">{service.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

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
              setTimeout(() => card.classList.add('visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 85% 15%, rgba(45,98,255,0.06) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <span className="font-mono-label text-electric mb-4 block">SERVICES</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">What I build</h2>
            <p className="text-cream-muted text-lg max-w-lg mx-auto">
              Whatever platform your idea lives on — I build it.
            </p>
          </div>

          {/* Bento grid — 3 cols on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <TiltCard
                key={s.title}
                service={s}
                index={i}
                cardRef={(el) => { cardsRef.current[i] = el; }}
              />
            ))}
          </div>

          <p className="text-center text-cream-muted/60 text-sm mt-10">
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
