import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative bg-navy-900 pt-16 pb-8 z-[100]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4 w-fit">
                <img src="/images/logo.png" alt="Richter Digital" className="w-9 h-9 object-contain" />
                <span className="font-display text-xl font-bold text-cream">Richter Digital</span>
              </Link>
              <p className="text-cream-muted text-sm leading-relaxed mb-5 max-w-sm">
                Freelance app & web development from Germany.
                I turn your idea into a real digital product — Android, iOS, web apps, websites.
              </p>
              <div className="space-y-2 text-sm text-cream-muted">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-electric mt-0.5 flex-shrink-0" />
                  <span>Arthur Richter · Schmechtener Str. 13, 33014 Bad Driburg, Germany</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-electric flex-shrink-0" />
                  <a href="mailto:hello@richterdigital.pro" className="hover:text-electric transition-colors">
                    hello@richterdigital.pro
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono-label text-cream mb-5">SERVICES</h4>
              <ul className="space-y-3 text-sm text-cream-muted">
                {['Android Apps', 'iOS Apps', 'Web Apps', 'Websites'].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollTo('services')}
                      className="hover:text-electric transition-colors text-left"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-mono-label text-cream mb-5">LINKS</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => scrollTo('portfolio')} className="text-cream-muted hover:text-electric transition-colors">
                    Portfolio
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('about')} className="text-cream-muted hover:text-electric transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('contact')} className="text-cream-muted hover:text-electric transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <Link to="/privacy" className="text-cream-muted hover:text-electric transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/impressum" className="text-cream-muted hover:text-electric transition-colors">
                    Impressum
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-muted">
            <p>&copy; {new Date().getFullYear()} Richter Digital — Arthur Richter. All rights reserved.</p>
            <p>Made with care in Germany 🇩🇪</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
