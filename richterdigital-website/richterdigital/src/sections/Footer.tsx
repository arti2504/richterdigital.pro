import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { useLang, tr } from '../i18n';

const Footer = () => {
  const { lang } = useLang();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const services = [
    tr(lang, 'App-Entwicklung', 'App development'),
    tr(lang, 'Web-Apps', 'Web apps'),
    tr(lang, 'Landingpages', 'Landing pages'),
    tr(lang, 'KI-Integration', 'AI integration'),
  ];

  return (
    <footer className="relative bg-navy-900 pt-16 pb-8 z-[100]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-4 gap-10 mb-12">

            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4 w-fit">
                <img src="/images/logo.png" alt="Richter Digital" className="w-9 h-9 object-contain" />
                <span className="font-display text-xl font-bold text-cream">Richter Digital</span>
              </Link>
              <p className="text-cream-muted text-sm leading-relaxed mb-5 max-w-sm">
                {tr(lang,
                  'App- und Web-Entwicklung aus Deutschland, KI-gestützt. Aus deiner Idee machen wir ein fertiges digitales Produkt: Android, iOS, Web-Apps und Websites.',
                  'App and web development from Germany, powered by AI. We turn your idea into a finished digital product: Android, iOS, web apps and websites.')}
              </p>
              <div className="space-y-2 text-sm text-cream-muted">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-electric mt-0.5 flex-shrink-0" />
                  <span>Arthur Richter · Schmechtener Str. 13, 33014 Bad Driburg, {tr(lang, 'Deutschland', 'Germany')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-electric flex-shrink-0" />
                  <a href="mailto:richterdigitals@gmail.com" className="hover:text-electric transition-colors">richterdigitals@gmail.com</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-mono-label text-cream mb-5">{tr(lang, 'Leistungen', 'Services')}</h4>
              <ul className="space-y-3 text-sm text-cream-muted">
                {services.map((s) => (
                  <li key={s}>
                    <button onClick={() => scrollTo('services')} className="hover:text-electric transition-colors text-left">{s}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono-label text-cream mb-5">Links</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollTo('portfolio')} className="text-cream-muted hover:text-electric transition-colors">Portfolio</button></li>
                <li><button onClick={() => scrollTo('about')} className="text-cream-muted hover:text-electric transition-colors">{tr(lang, 'Über uns', 'About us')}</button></li>
                <li><button onClick={() => scrollTo('contact')} className="text-cream-muted hover:text-electric transition-colors">{tr(lang, 'Kontakt', 'Contact')}</button></li>
                <li><Link to="/privacy" className="text-cream-muted hover:text-electric transition-colors">{tr(lang, 'Datenschutz', 'Privacy Policy')}</Link></li>
                <li><Link to="/impressum" className="text-cream-muted hover:text-electric transition-colors">Impressum</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-muted">
            <p>&copy; {new Date().getFullYear()} Richter Digital · Arthur Richter. {tr(lang, 'Alle Rechte vorbehalten.', 'All rights reserved.')}</p>
            <p>{tr(lang, 'Mit Sorgfalt gebaut in Deutschland', 'Made with care in Germany')} 🇩🇪</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
