import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Clock, Send, ChevronDown } from 'lucide-react';

const PROJECT_TYPES = [
  'Android App',
  'iOS App',
  'Web App / SaaS',
  'Website / Landing Page',
  'Not sure yet',
];

const BUDGETS = [
  'Under €1,000',
  '€1,000 – €3,000',
  '€3,000 – €8,000',
  '€8,000+',
  'I prefer not to say',
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  const [projectType, setProjectType] = useState('');
  const [budget,      setBudget]      = useState('');
  const [message,     setMessage]     = useState('');
  const [sent,        setSent]        = useState(false);

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
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project inquiry — ${projectType || 'General'}`);
    const body = encodeURIComponent(
      `Project type: ${projectType || '—'}\nBudget: ${budget || '—'}\n\n${message}`
    );
    window.location.href = `mailto:hello@richterdigital.pro?subject=${subject}&body=${body}`;
    setSent(true);
  };

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
            'radial-gradient(ellipse at 55% 50%, rgba(45,98,255,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono-label text-electric mb-4 block">CONTACT</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              Have an idea?{' '}
              <span className="text-gradient-blue">Let's talk.</span>
            </h2>
            <p className="text-cream-muted text-lg max-w-lg mx-auto">
              Describe your project below — I'll get back to you within 24 hours
              with a rough estimate. No commitment, no cost.
            </p>
          </div>

          <div ref={cardRef} className="reveal-up">
            <div className="lens-frame bg-navy-800/70 backdrop-blur-sm p-8 md:p-12">

              {sent ? (
                /* Thank you state */
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-electric/15 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cream mb-2">Opening your email app…</h3>
                  <p className="text-cream-muted">
                    If it didn't open,{' '}
                    <a href="mailto:hello@richterdigital.pro" className="text-electric hover:underline">
                      click here to send directly.
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Project type */}
                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">
                      What do you need?
                    </label>
                    <div className="relative">
                      <select
                        value={projectType}
                        onChange={e => setProjectType(e.target.value)}
                        className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3 text-cream text-sm appearance-none focus:outline-none focus:border-electric/50 transition-colors"
                      >
                        <option value="" disabled>Select project type…</option>
                        {PROJECT_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">
                      Rough budget (optional)
                    </label>
                    <div className="relative">
                      <select
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3 text-cream text-sm appearance-none focus:outline-none focus:border-electric/50 transition-colors"
                      >
                        <option value="">Prefer not to say / not sure</option>
                        {BUDGETS.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">
                      Tell me about your idea
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="What do you want to build? Who is it for? What are the 2–3 most important features? (English or German, both fine)"
                      className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3 text-cream text-sm resize-none focus:outline-none focus:border-electric/50 transition-colors placeholder:text-cream-muted/40"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full glow-button-border py-4 bg-electric text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                  {/* Fallback email link */}
                  <p className="text-center text-xs text-cream-muted/50">
                    Or email directly:{' '}
                    <a href="mailto:hello@richterdigital.pro" className="text-electric/70 hover:text-electric transition-colors">
                      hello@richterdigital.pro
                    </a>
                  </p>

                </form>
              )}

              {/* Divider */}
              {!sent && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent my-8" />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream-muted text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-electric flex-shrink-0" />
                      Bad Driburg, Germany
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-electric flex-shrink-0" />
                      Reply within 24 hours
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-electric flex-shrink-0" />
                      EN &amp; DE welcome
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
