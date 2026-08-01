import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, Send, Loader2, ArrowUp } from 'lucide-react';
import { useLang, tr } from '../i18n';
import { track, setUserData, estimateLeadValue } from '../lib/pixel';

const ACCESS_KEY = 'f29d119e-7534-481b-9109-e7b82dc2e8a6';
const CONTACT_EMAIL = 'richterdigitals@gmail.com';

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
    tr(lang, '1.000 bis 3.000 €', '€1,000 to €3,000'),
    tr(lang, '3.000 bis 8.000 €', '€3,000 to €8,000'),
    tr(lang, '8.000 € und mehr', '€8,000 and up'),
    tr(lang, 'Keine Angabe', 'Prefer not to say'),
  ];

  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget,      setBudget]      = useState('');
  const [message,     setMessage]     = useState('');
  const [status,      setStatus]      = useState<'idle' | 'sending' | 'error'>('idle');
  const [sent,        setSent]        = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { cardRef.current?.classList.add('visible'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData();
    fd.append('access_key', ACCESS_KEY);
    fd.append('from_name', 'Richter Digital Website');
    fd.append('subject', `${tr(lang, 'Neue Projektanfrage', 'New project inquiry')}: ${projectType || tr(lang, 'Allgemein', 'General')}`);
    fd.append('name', name);
    fd.append('email', email);
    fd.append(tr(lang, 'Projektart', 'Project type'), projectType || tr(lang, 'keine Angabe', 'not provided'));
    fd.append('Budget', budget || tr(lang, 'keine Angabe', 'not provided'));
    fd.append(tr(lang, 'Nachricht', 'Message'), message);
    fd.append('botcheck', '');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        /* Conversion an Meta melden (nur bei erteilter Einwilligung):
           Advanced Matching aus den Formulardaten, Wert aus dem Budgetrahmen. */
        const [fn, ...rest] = name.trim().split(/\s+/);
        setUserData({ em: email, fn, ln: rest.join(' ') });
        track('Lead', {
          content_category: projectType || 'unspecified',
          value: estimateLeadValue(budget),
          currency: 'EUR',
        });
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const fieldCls = 'w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-ink text-sm focus:outline-none focus:border-electric transition-colors placeholder:text-ink/40';
  const selectCls = fieldCls;

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
            <p className="text-cream font-display font-bold mx-auto" style={{ fontSize: 'clamp(19px, 2.2vw, 26px)', lineHeight: 1.3, maxWidth: '22ch' }}>
              {tr(lang,
                'Verliere keine Kunden mehr an eine veraltete Seite.',
                'Stop losing customers to an outdated site.')}
            </p>
            <p className="mt-4 text-cream-muted text-lg max-w-lg mx-auto">
              {tr(lang,
                'Beschreib dein Projekt unten. Wir melden uns innerhalb von 24 Stunden mit einer ehrlichen Einschätzung. Unverbindlich und kostenlos.',
                "Describe your project below. We get back to you within 24 hours with an honest assessment. No commitment, no cost.")}
            </p>

            {/* Kurzer Weg zurueck zum Rechner: vier Klicks statt Formular tippen. */}
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 bg-electric text-white font-display font-bold rounded-full hover:bg-electric-dark transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              {tr(lang, 'In vier Fragen zum Angebot', 'Get a quote in four questions')}
            </button>
            <p className="mt-3 text-cream-muted/70 text-sm">
              {tr(lang, 'Schneller als das Formular', 'Faster than the form')}
            </p>
          </div>

          <div ref={cardRef} className="reveal-up">
            <div className="lens-frame bg-navy-800/70 backdrop-blur-sm p-8 md:p-12">

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-electric/15 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cream mb-2">{tr(lang, 'Danke! Deine Nachricht ist da.', 'Thanks! Your message is in.')}</h3>
                  <p className="text-cream-muted">{tr(lang, 'Wir melden uns innerhalb von 24 Stunden bei dir.', 'We will get back to you within 24 hours.')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Name', 'Name')}</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={tr(lang, 'Dein Name', 'Your name')} className={fieldCls} />
                    </div>
                    <div>
                      <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'E-Mail', 'Email')} *</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={tr(lang, 'damit wir antworten können', 'so we can reply')} className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Was brauchst du?', 'What do you need?')}</label>
                    <select value={projectType} onChange={e => setProjectType(e.target.value)} className={selectCls}>
                      <option value="" disabled>{tr(lang, 'Projektart wählen…', 'Select project type…')}</option>
                      {PROJECT_TYPES.map(t => (<option key={t} value={t}>{t}</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Ungefähres Budget (optional)', 'Rough budget (optional)')}</label>
                    <select value={budget} onChange={e => setBudget(e.target.value)} className={selectCls}>
                      <option value="">{tr(lang, 'Keine Angabe / unsicher', 'Prefer not to say / not sure')}</option>
                      {BUDGETS.map(b => (<option key={b} value={b}>{b}</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono-label text-cream-muted block mb-2">{tr(lang, 'Erzähl uns von deiner Idee', 'Tell us about your idea')} *</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5}
                      placeholder={tr(lang, 'Was möchtest du bauen? Für wen ist es? Was sind die wichtigsten Funktionen?', 'What do you want to build? Who is it for? What are the most important features?')}
                      className={fieldCls + ' resize-none'} />
                  </div>

                  {status === 'error' && (
                    <p className="text-center text-sm text-red-400">
                      {tr(lang, 'Da ist etwas schiefgelaufen. Schreib uns direkt: ', 'Something went wrong. Email us directly: ')}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="w-full glow-button-border py-4 bg-electric text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 disabled:opacity-70">
                    {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {status === 'sending' ? tr(lang, 'Wird gesendet…', 'Sending…') : tr(lang, 'Nachricht senden', 'Send message')}
                  </button>

                  <p className="text-center text-xs text-cream-muted/50">
                    {tr(lang, 'Oder direkt per E-Mail:', 'Or email directly:')}{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric/70 hover:text-electric transition-colors">{CONTACT_EMAIL}</a>
                  </p>

                  <p className="text-center text-xs text-cream-muted/40" style={{ lineHeight: 1.5 }}>
                    {tr(lang,
                      'Deine Angaben nutzen wir ausschließlich zur Beantwortung deiner Anfrage. Näheres in der ',
                      'We use your details solely to answer your inquiry. More in our ')}
                    <Link to="/privacy" className="underline underline-offset-2 hover:text-cream-muted">
                      {tr(lang, 'Datenschutzerklärung', 'privacy policy')}
                    </Link>.
                  </p>

                </form>
              )}

              {!sent && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent my-8" />
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream-muted text-sm">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-electric flex-shrink-0" />{tr(lang, 'Bad Driburg, Deutschland', 'Bad Driburg, Germany')}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-electric flex-shrink-0" />{tr(lang, 'Antwort in 24 Stunden', 'Reply within 24 hours')}</div>
                    <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-electric flex-shrink-0" />{tr(lang, 'DE & EN willkommen', 'EN & DE welcome')}</div>
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
