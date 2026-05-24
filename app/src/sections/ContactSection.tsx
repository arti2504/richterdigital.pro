import { useEffect, useRef } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
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
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-40 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(45, 98, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono-label text-electric mb-4 block">CONTACT</span>
          <h2 className="font-display text-display-2 text-cream font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-cream-muted text-lg mb-12 max-w-xl mx-auto">
            Questions about Smile4Me or interested in working together? We'd love to hear from you.
          </p>

          {/* Contact Lens Card */}
          <div
            ref={lensRef}
            className="lens-frame bg-navy-800/80 backdrop-blur-sm p-10 md:p-16 max-w-2xl mx-auto transition-all duration-1000 opacity-0"
            style={{ transform: 'translateY(40px) scale(0.96)' }}
          >
            {/* Email */}
            <div className="mb-10">
              <div className="w-16 h-16 rounded-2xl bg-electric/20 flex items-center justify-center mx-auto mb-5">
                <Mail className="w-7 h-7 text-electric" />
              </div>
              <p className="font-mono-label text-cream-muted mb-3">EMAIL US AT</p>
              <a
                href="mailto:hello@richterdigital.pro"
                className="text-2xl md:text-3xl font-display font-semibold text-electric hover:text-electric-light transition-colors"
              >
                hello@richterdigital.pro
              </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

            {/* Details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-cream-muted">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-electric" />
                <span>Bad Driburg, Germany</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-electric" />
                <span>Response within 1-2 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
