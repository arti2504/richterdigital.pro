import { useEffect, useRef } from 'react';
import { ArrowRight, Quote } from 'lucide-react';

const TestimonialSection = () => {
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

  const scrollToContact = () => {
    const element = document.getElementById('kontakt');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-[60]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'url(/images/testimonial_city.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'rgba(7,10,18,0.75)',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 px-6 lg:px-12 transition-all duration-1000 opacity-0 translate-y-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="lens-frame bg-navy-800/80 backdrop-blur-sm p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Quote */}
              <div>
                <span className="font-mono-label text-electric mb-6 block">KUNDENSTIMME</span>
                
                <Quote className="w-12 h-12 text-electric/30 mb-6" />
                
                <blockquote className="font-display text-3xl lg:text-4xl font-bold text-cream mb-8 leading-tight">
                  „Unsere Website verkauft jetzt{' '}
                  <span className="text-electric">für uns.</span>"
                </blockquote>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center">
                    <span className="font-display font-bold text-electric">SK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-cream">Sarah K.</div>
                    <div className="text-sm text-cream-muted">Geschäftsführerin</div>
                  </div>
                </div>

                <button
                  onClick={scrollToContact}
                  className="group glow-button px-6 py-3 bg-electric text-white font-semibold rounded-xl flex items-center gap-3 hover:bg-electric-dark transition-all"
                >
                  Gespräch vereinbaren
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right - Portrait */}
              <div className="lens-frame-inner aspect-[3/4] relative overflow-hidden max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <img
                  src="/images/testimonial_portrait.jpg"
                  alt="Sarah K."
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 60%, rgba(7,10,18,0.5) 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
