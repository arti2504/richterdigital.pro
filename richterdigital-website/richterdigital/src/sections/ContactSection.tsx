import { useEffect, useRef } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardRef.current?.classList.add('visible');
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
      className="relative bg-navy-900 py-24 lg:py-32 z-40 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(45,98,255,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono-label text-electric mb-4 block">CONTACT</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-cream-muted text-lg max-w-lg mx-auto">
              Questions about Smile4Me, or interested in working together?
              I'd love to hear from you.
            </p>
          </div>

          {/* Card */}
          <div ref={cardRef} className="reveal-up max-w-2xl mx-auto">
            <div className="lens-frame bg-navy-800/70 backdrop-blur-sm p-10 md:p-14 text-center">

              {/* Email block */}
              <div className="mb-10">
                <div className="w-14 h-14 rounded-2xl bg-electric/15 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-6 h-6 text-electric" />
                </div>
                <p className="font-mono-label text-cream-muted mb-3">WRITE US AT</p>
                <a
                  href="mailto:hello@richterdigital.pro"
                  className="text-2xl md:text-3xl font-display font-semibold text-electric hover:text-electric-light transition-colors break-all"
                >
                  hello@richterdigital.pro
                </a>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

              {/* Meta */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-cream-muted text-sm">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-electric flex-shrink-0" />
                  <span>Bad Driburg, Germany</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-electric flex-shrink-0" />
                  <span>Reply within 1–2 business days</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
