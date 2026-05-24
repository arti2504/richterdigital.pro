import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-navy-900 pt-20 pb-8 z-[100]">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logo.png"
                  alt="Richter Digital"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-display text-3xl font-bold text-cream">
                  Richter
                </span>
              </div>
              <p className="text-cream-muted max-w-md mb-6">
                We develop apps and web-apps. Based in Bad Driburg, Germany — 
                building digital products with passion and precision.
              </p>
              <div className="text-sm text-cream-muted">
                <p>Arthur Richter · Richter Digital</p>
                <p>Schmechtener Str. 13</p>
                <p>33014 Bad Driburg, Germany</p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-mono-label text-cream mb-4">NAVIGATION</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-cream-muted hover:text-electric transition-colors">
                    Home
                  </Link>
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

            {/* App */}
            <div>
              <h4 className="font-mono-label text-cream mb-4">OUR APP</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <img src="/images/smile4me-logo.png" alt="Smile4Me" className="w-8 h-8 rounded-lg" />
                  <span className="text-cream-muted">Smile4Me</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cream-muted">
              &copy; {new Date().getFullYear()} Richter Digital. All rights reserved.
            </p>
            <p className="text-sm text-cream-muted">
              Made with care in Germany
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
