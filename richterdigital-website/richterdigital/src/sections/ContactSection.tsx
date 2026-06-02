import { useEffect, useRef } from 'react';
import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

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
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 55% 50%, rgba(45,98,255,0.09) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono-label text-electric mb-4 block">CONTACT</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              Have an idea?{' '}
              <span className="text-electric">Let's talk.</span>
            </h2>
            <p className="text-cream-muted text-lg max-w-lg mx-auto">
              Describe your idea in a few sentences — I'll get back to you with
              a rough estimate and timeline. No commitment, no cost.
            </p>
          </div>

          {/* Card */}
          <div ref={cardRef} className="reveal-up">
            <div className="lens-frame bg-navy-800/70 backdrop-blur-sm p-10 md:p-14">

              {/* Main email CTA */}
              <div className="text-center mb-10">
                <div className="w-14 h-14 rounded-2xl bg-electric/15 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-6 h-6 text-electric" />
                </div>
                <p className="font-mono-label text-cream-muted mb-3">SEND ME AN EMAIL</p>
                <a
                  href="mailto:hello@richterdigital.pro"
                  className="text-2xl md:text-3xl font-display font-bold text-electric hover:text-electric-light transition-colors"
                >
                  hello@richterdigital.pro
                </a>
                <p className="text-cream-muted/60 text-sm mt-2">
                  Or write in German — kein Problem.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

              {/* What to include hint */}
              <div className="bg-electric/5 border border-electric/15 rounded-2xl p-5 mb-10">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-electric flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-cream mb-2">What to include in your message</p>
                    <ul className="text-sm text-cream-muted space-y-1">
                      <li>→ What's the app/website about?</li>
                      <li>→ Who is it for?</li>
                      <li>→ What are the 2–3 most important features?</li>
                      <li>→ Do you have a deadline or budget in mind?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream-muted text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-electric flex-shrink-0" />
                  Bad Driburg, Germany
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-electric flex-shrink-0" />
                  Reply within 1–2 business days
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
