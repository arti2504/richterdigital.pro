import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang, tr } from '../i18n';

const Navigation = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [servicesOpen,setServicesOpen]= useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { lang, toggle } = useLang();

  const serviceLinks = [
    { label: tr(lang, 'App-Entwicklung', 'App development'), desc: tr(lang, 'Native Apps für Android & iOS', 'Native apps for Android & iOS') },
    { label: tr(lang, 'Web-Apps', 'Web apps'),               desc: tr(lang, 'SaaS, Dashboards, Portale', 'SaaS, dashboards, portals') },
    { label: tr(lang, 'Landingpages', 'Landing pages'),      desc: tr(lang, 'Marketing-Seiten, die konvertieren', 'Marketing sites that convert') },
    { label: tr(lang, 'KI-Integration', 'AI integration'),   desc: tr(lang, 'KI-Features in dein Produkt', 'AI features in your product') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [location]);

  const solid = scrolled || !isHome;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <button
      onClick={toggle}
      className={`font-display font-semibold text-[13px] tracking-wide text-white/80 hover:text-white transition-colors ${className}`}
      aria-label="Sprache wechseln / switch language"
    >
      <span className={lang === 'de' ? 'text-white' : ''}>DE</span>
      <span className="text-white/35 mx-1">/</span>
      <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
    </button>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? 'bg-ink/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[88px]">

            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <img src="/images/logo.png" alt="Richter Digital" className="w-10 h-10 object-contain" />
              <span className="font-display text-xl font-bold text-white tracking-tight">Richter Digital</span>
            </Link>

            <div className="hidden lg:flex items-center gap-9">
              {isHome && (
                <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <button className="flex items-center gap-1.5 text-[15px] font-display font-light tracking-wide uppercase text-white/90 hover:text-white transition-colors py-2">
                    {tr(lang, 'Leistungen', 'Services')}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-ink border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ${
                      servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}>
                    <div className="p-3">
                      {serviceLinks.map((s) => (
                        <button key={s.label} onClick={() => scrollTo('services')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                          <p className="text-sm font-display font-semibold text-white group-hover/item:text-electric-light transition-colors">{s.label}</p>
                          <p className="text-xs text-white/50 mt-0.5">{s.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {isHome && (
                <>
                  <button onClick={() => scrollTo('portfolio')} className="text-[15px] font-display font-light tracking-wide uppercase text-white/90 hover:text-white transition-colors">Portfolio</button>
                  <button onClick={() => scrollTo('about')}     className="text-[15px] font-display font-light tracking-wide uppercase text-white/90 hover:text-white transition-colors">{tr(lang, 'Über mich', 'About')}</button>
                  <button onClick={() => scrollTo('contact')}   className="text-[15px] font-display font-light tracking-wide uppercase text-white/90 hover:text-white transition-colors">{tr(lang, 'Kontakt', 'Contact')}</button>
                </>
              )}
              {!isHome && (
                <Link to="/" className="text-[15px] font-display font-light tracking-wide uppercase text-white/90 hover:text-white transition-colors">← Home</Link>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <LangToggle />
              <button onClick={() => isHome ? scrollTo('contact') : undefined} className="px-7 py-3 bg-electric text-white text-[15px] font-display font-bold rounded-full hover:bg-electric-dark transition-all">
                {tr(lang, 'Projekt anfragen', 'Start a project')}
              </button>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-ink/98 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className="relative flex flex-col items-center justify-center h-full gap-7 px-6">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src="/images/logo.png" alt="" className="w-11 h-11 object-contain" />
            <span className="font-display text-2xl font-bold text-white">Richter Digital</span>
          </Link>
          {isHome && (
            <>
              <button onClick={() => scrollTo('services')}  className="text-2xl font-display font-semibold uppercase tracking-wide text-white hover:text-electric-light transition-colors">{tr(lang, 'Leistungen', 'Services')}</button>
              <button onClick={() => scrollTo('portfolio')} className="text-2xl font-display font-semibold uppercase tracking-wide text-white hover:text-electric-light transition-colors">Portfolio</button>
              <button onClick={() => scrollTo('about')}     className="text-2xl font-display font-semibold uppercase tracking-wide text-white hover:text-electric-light transition-colors">{tr(lang, 'Über mich', 'About')}</button>
              <button onClick={() => scrollTo('contact')}   className="text-2xl font-display font-semibold uppercase tracking-wide text-white hover:text-electric-light transition-colors">{tr(lang, 'Kontakt', 'Contact')}</button>
            </>
          )}
          <button onClick={() => { scrollTo('contact'); setMobileOpen(false); }} className="mt-2 px-10 py-4 bg-electric text-white font-display font-bold rounded-full text-lg">
            {tr(lang, 'Projekt anfragen', 'Start a project')}
          </button>
          <LangToggle className="mt-2 text-base" />
          <div className="flex gap-6 mt-2">
            <Link to="/privacy"   className="text-sm text-white/60 hover:text-electric-light transition-colors">{tr(lang, 'Datenschutz', 'Privacy')}</Link>
            <Link to="/impressum" className="text-sm text-white/60 hover:text-electric-light transition-colors">{tr(lang, 'Impressum', 'Imprint')}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
