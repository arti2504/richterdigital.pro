import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Clock, Send, ChevronDown } from 'lucide-react';
import { useLang, tr } from '../i18n';

const ContactSection = () => {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  const PROJECT_TYPES = [
    tr(lang, 'Android-App', 'Android app'),
    tr(lang, 'iOS-App', 'iOS app'),
    tr(lang, 'Web-App / SaaS', 'Web app / SaaS'),
    tr(lang, 'Website / Landingpage', 'Website / landing page'),
    tr(lang, 'Noch unklar', 'Not sure yet'),
  ];
  const BUDGETS = [
    tr(lang, 'Unter 1.000 €', 'Under €1,000'),
    '1.000 – 3.000 €',
    '3.000 – 8.000 €',
    '8.000 €+',
    tr(lang, 'Keine Angabe', 'Prefer not to say'),
  ];

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
    const subject = encodeURIComponent(`${tr(lang, 'Projektanfrage', 'Project inquiry')} — ${projectType || tr(lang, 'Allgemein', 'General')}`);
    const body = encodeURIComponent(
      `${tr(lang, 'Projektart', 'Project type')}: ${projectType || '—'}\n${tr(lang, 'Budget', 'Budget')}: ${budget || '—'}\n\n${message}`
    );
    window.location.href = `mailto:hello@richterdigital.pro?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 55% 50%, rgba(7,17,255,0.10) 0%, transparent 55%)' }} />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <span className="font-mono-label text-electric mb-4 block">{tr(lang, 'Kontakt', 'Contact')}</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              {tr(lang, 'Eine Idee?', 'Have an idea?')}{' '}
              <span className="text-gradient-blue">{tr(lang, 'Lass uns reden.', "Let's talk.")}</span>
            </h2>
            <p className="text-cream-muted text-lg max-w-lg mx-auto">
              {tr(lang,
                'Beschreib dein Projekt unten — wir melden uns innerhalb von 24 Stunden mit einer groben Einschätzung. Unverbindlich und kostenlos.',
                "Describe your project below — we'll get back to you within 24 hours with a rough estimate. No commitment, no cost.")}
            </p>
          </div>

          <div ref={cardRef} className="reveal-up">
            <div className="lens-frame bg-navy-800/70 backdrop-blur-sm p-8 md:p-12">

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-electric/15 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cream mb-2">{tr(lang, 'E-Mail-Programm öffnet sich…', 'Opening your email app…')}</h3>
                  <p className="text-cream-muted">
                    {tr(lang, 'Falls nicht,', "If it didn't open,")}{' '}
                    <a href="mailto:hello@richterdigital.pro" className="text-electric hover:underline">
                      {tr(lang, 'hier direkt senden.', 'click here to send directly.')}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Was brauchst du?', 'What do you need?')}</label>
                    <div className="relative">
                      <select value={projectType} onChange={e => setProjectType(e.target.value)} className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3 text-cream text-sm appearance-none focus:outline-none focus:border-electric/50 transition-colors">
                        <option value="" disabled>{tr(lang, 'Projektart wählen…', 'Select project type…')}</option>
                        {PROJECT_TYPES.map(t => (<option key={t} value={t}>{t}</option>))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Ungefähres Budget (optional)', 'Rough budget (optional)')}</label>
                    <div className="relative">
                      <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3 text-cream text-sm appearance-none focus:outline-none focus:border-electric/50 transition-colors">
                        <option value="">{tr(lang, 'Keine Angabe / unsicher', 'Prefer not to say / not sure')}</option>
                        {BUDGETS.map(b => (<option key={b} value={b}>{b}</option>))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Erzähl uns von deiner Idee', 'Tell us about your idea')}</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder={tr(lang, 'Was möchtest du bauen? Für wen ist es? Was sind die 2–3 wichtigsten Funktionen? (Deutsch oder Englisch, beides geht)', 'What do you want to build? Who is it for? What are the 2–3 most important features? (English or German, both fine)')}
                      className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3 text-cream text-sm resize-none focus:outline-none focus:border-electric/50 transition-colors placeholder:text-cream-muted/40"
                    />
                  </div>

                  <button type="submit" className="w-full glow-button-border py-4 bg-electric text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    {tr(lang, 'Nachricht senden', 'Send message')}
                  </button>

                  <p className="text-center text-xs text-cream-muted/50">
                    {tr(lang, 'Oder direkt per E-Mail:', 'Or email directly:')}{' '}
                    <a href="mailto:hello@richterdigital.pro" className="text-electric/70 hover:text-electric transition-colors">hello@richterdigital.pro</a>
                  </p>

                </form>
              )}

              {!sent && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent my-8" />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream-muted text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-electric flex-shrink-0" />
                      {tr(lang, 'Bad Driburg, Deutschland', 'Bad Driburg, Germany')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-electric flex-shrink-0" />
                      {tr(lang, 'Antwort in 24 Stunden', 'Reply within 24 hours')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-electric flex-shrink-0" />
                      {tr(lang, 'DE & EN willkommen', 'EN & DE welcome')}
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
