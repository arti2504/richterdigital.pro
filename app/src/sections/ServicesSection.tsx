import { useEffect, useRef } from 'react';

const services = [
  {
    id: 'webdesign',
    title: 'WEBDESIGN',
    description: 'Websites, die verkaufen',
    image: '/images/service_webdesign.jpg',
  },
  {
    id: 'brand',
    title: 'MARKENIDENTITÄT',
    description: 'Ein Auftritt, der bleibt',
    image: '/images/service_brand.jpg',
  },
  {
    id: 'conversion',
    title: 'CONVERSION',
    description: 'Besucher werden Kunden',
    image: '/images/service_conversion.jpg',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lensesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (titleRef.current) {
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translateY(0)';
            }

            // Animate lenses with stagger
            lensesRef.current.forEach((lens, index) => {
              if (lens) {
                setTimeout(() => {
                  lens.style.opacity = '1';
                  lens.style.transform = 'translateX(0) translateY(0) scale(1)';
                }, index * 150);
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px' }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-20"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(45, 98, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        {/* Title */}
        <div
          ref={titleRef}
          className="text-center mb-16 lg:mb-24 transition-all duration-700 opacity-0 translate-y-5"
        >
          <span className="font-mono-label text-electric mb-4 block">LEISTUNGEN</span>
          <h2 className="font-display text-display-2 text-cream font-bold">
            Dreimal gesehen. Immer erkannt.
          </h2>
        </div>

        {/* Three Lenses */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { lensesRef.current[index] = el; }}
              className="group relative w-full max-w-sm lg:w-[25vw] lg:max-w-[380px] aspect-[3/4] lens-frame breathing cursor-pointer transition-all duration-700 opacity-0"
              style={{
                transform: index === 0 ? 'translateX(-60vw) scale(0.92)' : index === 2 ? 'translateX(60vw) scale(0.92)' : 'translateY(40vh) scale(0.92)',
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(180deg, transparent 40%, rgba(7,10,18,0.9) 100%)',
                }}
              />

              {/* Border shimmer effect */}
              <div className="absolute inset-0 rounded-[40px] border-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="font-mono-label text-electric text-xs mb-2 block">
                  0{index + 1}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-cream mb-2">
                  {service.title}
                </h3>
                <p className="text-cream-muted text-sm lg:text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
