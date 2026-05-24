import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (id: string) => {
    if (!isHome) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-900/90 backdrop-blur-lg border-b border-white/5'
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
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-2xl font-bold text-cream tracking-tight group-hover:text-electric transition-colors">
                Richter
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {isHome && (
                <>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-sm font-medium text-cream-muted hover:text-cream transition-colors relative group"
                  >
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
                  </button>
                  <button
                    onClick={() => scrollToSection('app')}
                    className="text-sm font-medium text-cream-muted hover:text-cream transition-colors relative group"
                  >
                    Smile4Me
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-sm font-medium text-cream-muted hover:text-cream transition-colors relative group"
                  >
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
                  </button>
                </>
              )}
              {!isHome && (
                <Link
                  to="/"
                  className="text-sm font-medium text-cream-muted hover:text-cream transition-colors"
                >
                  Home
                </Link>
              )}
              <Link
                to="/privacy"
                className="text-sm font-medium text-cream-muted hover:text-cream transition-colors relative group"
              >
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                to="/impressum"
                className="text-sm font-medium text-cream-muted hover:text-cream transition-colors relative group"
              >
                Impressum
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              {isHome ? (
                <button
                  onClick={() => scrollToSection('contact')}
                  className="glow-button px-6 py-3 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-dark transition-colors"
                >
                  Get in Touch
                </button>
              ) : (
                <Link
                  to="/"
                  className="glow-button px-6 py-3 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric-dark transition-colors"
                >
                  Back to Home
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-cream hover:text-electric transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-navy-900/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo.png" alt="Richter Digital" className="w-12 h-12 object-contain" />
            <span className="font-display text-3xl font-bold text-cream">Richter</span>
          </div>
          {isHome && (
            <>
              <button onClick={() => scrollToSection('about')} className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">About</button>
              <button onClick={() => scrollToSection('app')} className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">Smile4Me</button>
              <button onClick={() => scrollToSection('contact')} className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">Contact</button>
            </>
          )}
          {!isHome && (
            <Link to="/" className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">Home</Link>
          )}
          <Link to="/privacy" className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">Privacy Policy</Link>
          <Link to="/impressum" className="text-2xl font-display font-semibold text-cream hover:text-electric transition-colors">Impressum</Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
