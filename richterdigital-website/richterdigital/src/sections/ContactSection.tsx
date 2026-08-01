import { useEffect, useRef } from 'react';
import { Mail, MapPin, Clock, ArrowUp } from 'lucide-react';
import { useLang, tr } from '../i18n';

const CONTACT_EMAIL = 'richterdigitals@gmail.com';

/**
 * Abschluss der Seite. Bewusst ohne eigenes Formular: Der Rechner weiter oben
 * ist der eine Weg zur Anfrage. Zwei Formulare auf einer Seite teilen die
 * Aufmerksamkeit, und wer lieber frei schreibt, hat die E-Mail-Adresse.
 */
const ContactSection = () => {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { cardRef.current?.classList.add('visible'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const zumRechner = () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} id="contact" className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 55% 50%, rgba(7,17,255,0.10) 0%, transparent 55%)' }} />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono-label text-electric mb-4 block">{tr(lang, 'Kontakt', 'Contact')}</span>
          <h2 className="font-display text-display-2 text-cream font-bold mb-5">
            {tr(lang, 'Eine Idee?', 'Have an idea?')}{' '}
            <span className="text-gradient-blue">{tr(lang, 'Lass uns reden.', "Let's talk.")}</span>
          </h2>

          <p className="text-cream font-display font-bold mx-auto" style={{ fontSize: 'clamp(20px, 2.6vw, 30px)', lineHeight: 1.3, maxWidth: '20ch' }}>
            {tr(lang,
              'Verliere keine Kunden mehr an eine veraltete Seite.',
              'Stop losing customers to an outdated site.')}
          </p>

          <p className="mt-5 text-cream-muted mx-auto" style={{ fontSize: '17px', lineHeight: 1.6, maxWidth: '34rem' }}>
            {tr(lang,
              'Vier Fragen, dann weiß ich, worum es geht. Du bekommst innerhalb von 24 Stunden einen Vorschlag mit Festpreis.',
              'Four questions and I know what this is about. You get a proposal with a fixed price within 24 hours.')}
          </p>

          <div ref={cardRef} className="reveal-up mt-8">
            <button
              onClick={zumRechner}
              className="glow-button-border inline-flex items-center gap-2.5 px-9 py-4 bg-electric text-white font-display font-bold rounded-full hover:bg-electric-dark transition-colors text-[17px]"
            >
              <ArrowUp className="w-5 h-5" />
              {tr(lang, 'In vier Fragen zum Angebot', 'Get a quote in four questions')}
            </button>

            <p className="mt-5 text-cream-muted/80 text-sm">
              {tr(lang, 'Lieber direkt schreiben?', 'Prefer to write directly?')}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric hover:text-electric-light transition-colors underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
            </p>

            <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent my-9" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream-muted text-sm">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-electric flex-shrink-0" />{tr(lang, 'Bad Driburg, Deutschland', 'Bad Driburg, Germany')}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-electric flex-shrink-0" />{tr(lang, 'Antwort in 24 Stunden', 'Reply within 24 hours')}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-electric flex-shrink-0" />{tr(lang, 'DE & EN willkommen', 'EN & DE welcome')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
