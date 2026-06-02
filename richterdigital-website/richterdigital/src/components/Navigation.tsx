import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollTo = (id: string) => {
    if (!isHome) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = isHome
    ? [
        { label: 'Services',  id: 'services'  },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'About',     id: 'about'     },
        { label: 'Contact',   id: 'contact'   },
      ]
    : [];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-lg border-b border-white/6'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Richter Digital"
                className="w-9 h-9 object-contain"
              />
              <span className="font-display text-xl font-bold text-cream tracking-tight group-hover:text-electric transition-colors">
                Richter Digital
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-sm font-medium text-cream-muted hover:text-cream transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              {!isHome && (
                <Link to="/" className="text-sm font-medium text-cream-muted hover:text-cream transition-colors">
                  Home
                </Link>
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              {isHome ? (
                <button
                  onClick={() => scrollTo('contact')}
                  className="glow-button px-5 py-2.5 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-dark transition-colors"
                >
                  Get a Free Quote
                </button>
              ) : (
                <Link
                  to="/"
                  className="glow-button px-5 py-2.5 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-dark transition-colors"
                >
                  Back to Home
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-cream hover:text-electric transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-navy-900/97 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative flex flex-col items-center justify-center h-full gap-7">
          <Link to="/" className="flex items-center gap-3 mb-2">
            <img src="/images/logo.png" alt="Richter Digital" className="w-10 h-10 object-contain" />
            <span className="font-display text-2xl font-bold text-cream">Richter Digital</span>
          </Link>
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors"
            >
              {label}
            </button>
          ))}
          {!isHome && (
            <Link to="/" className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">
              Home
            </Link>
          )}
          <button
            onClick={() => scrollTo('contact')}
            className="mt-2 glow-button px-8 py-3.5 bg-electric text-white font-semibold rounded-xl text-base"
          >
            Get a Free Quote
          </button>
          <div className="flex gap-6 mt-2">
            <Link to="/privacy" className="text-sm text-cream-muted hover:text-electric transition-colors">Privacy</Link>
            <Link to="/impressum" className="text-sm text-cream-muted hover:text-electric transition-colors">Impressum</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
