import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-navy-900 pt-16 pb-8 z-[100]">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Main content */}
          <div className="grid md:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4 w-fit">
                <img
                  src="/images/logo.png"
                  alt="Richter Digital"
                  className="w-9 h-9 object-contain"
                />
                <span className="font-display text-2xl font-bold text-cream">Richter Digital</span>
              </Link>
              <p className="text-cream-muted text-sm leading-relaxed mb-5">
                Indie app &amp; web studio from Germany.<br />
                Building products people enjoy using.
              </p>
              <div className="space-y-2 text-sm text-cream-muted">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-electric mt-0.5 flex-shrink-0" />
                  <span>Arthur Richter · Schmechtener Str. 13<br />33014 Bad Driburg, Germany</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-electric flex-shrink-0" />
                  <a href="mailto:hello@richterdigital.pro" className="hover:text-electric transition-colors">
                    hello@richterdigital.pro
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-mono-label text-cream mb-5">NAVIGATION</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="text-cream-muted hover:text-electric transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-cream-muted hover:text-electric transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/impressum" className="text-cream-muted hover:text-electric transition-colors">Impressum</Link>
                </li>
              </ul>
            </div>

            {/* App */}
            <div>
              <h4 className="font-mono-label text-cream mb-5">OUR APP</h4>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/smile4me-logo.png"
                  alt="Smile4Me"
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <p className="text-cream text-sm font-semibold">Smile4Me</p>
                  <p className="text-cream-muted text-xs">Fake Livestream Prank App</p>
                </div>
              </div>
              <a
                href="https://play.google.com/store/apps/developer?id=Richter+Digital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-electric hover:text-electric-light transition-colors"
              >
                View on Google Play →
              </a>
            </div>

          </div>

          {/* Bottom bar */}
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
