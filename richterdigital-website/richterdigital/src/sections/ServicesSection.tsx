import { useEffect, useRef } from 'react';
import { type LucideIcon, Smartphone, Globe, Monitor, ArrowUpRight } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    icon: Smartphone,
    number: '01',
    title: 'Android Apps',
    description:
      'Native Android applications built for performance, monetized with AdMob, and shipped to Google Play. From MVP to full product.',
    tags: ['Kotlin', 'Google Play', 'Firebase', 'AdMob'],
  },
  {
    icon: Smartphone,
    number: '02',
    title: 'iOS Apps',
    description:
      'iPhone and iPad apps built with Swift. Smooth, native, App Store-ready — designed to feel at home on Apple devices.',
    tags: ['Swift / SwiftUI', 'App Store', 'Core Data'],
  },
  {
    icon: Globe,
    number: '03',
    title: 'Web Apps',
    description:
      'SaaS tools, dashboards, and customer portals. Fast, scalable, built with React — with backend and database if needed.',
    tags: ['React', 'TypeScript', 'Node.js', 'Supabase'],
  },
  {
    icon: Monitor,
    number: '04',
    title: 'Websites',
    description:
      'Marketing sites and landing pages that convert. Clean design, fast loading, SEO-optimised — built to grow your business.',
    tags: ['React / Vite', 'Tailwind CSS', 'SEO'],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            itemRefs.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => el.classList.add('visible'), i * 100);
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
    <section ref={sectionRef} id="services" className="relative bg-navy-900 py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 90% 10%, rgba(45,98,255,0.05) 0%, transparent 55%)' }}
      />

      <div className="px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
            <div>
              <span className="font-mono-label text-electric mb-4 block">SERVICES</span>
              <h2
                className="font-display font-bold text-cream leading-tight"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                Everything you need,<br />under one roof.
              </h2>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-electric hover:gap-3 transition-all font-semibold text-sm group lg:mb-2"
            >
              Discuss your project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Service rows — editorial list style */}
          <div className="divide-y divide-white/6">
            {services.map((s, i) => (
              <div
                key={s.number}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="reveal-up grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 group cursor-default hover:pl-2 transition-all duration-300"
              >
                {/* Number + icon */}
                <div className="lg:col-span-1 flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                  <span className="font-mono-label text-electric/50 text-lg">{s.number}</span>
                  <s.icon className="w-5 h-5 text-electric/60 group-hover:text-electric transition-colors" />
                </div>

                {/* Title */}
                <div className="lg:col-span-3 flex items-center">
                  <h3
                    className="font-display font-bold text-cream group-hover:text-electric transition-colors"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
                  >
                    {s.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-5 flex items-center">
                  <p className="text-cream-muted leading-relaxed">{s.description}</p>
                </div>

                {/* Tags */}
                <div className="lg:col-span-3 flex items-center">
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
