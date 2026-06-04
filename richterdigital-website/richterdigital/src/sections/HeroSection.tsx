import { ArrowDown } from 'lucide-react';
import { useLang, tr } from '../i18n';

const HeroSection = () => {
  const { lang } = useLang();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen bg-ink flex items-end overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline poster="/images/arthur.jpg">
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.15) 38%, rgba(20,20,20,0.92) 100%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 lg:px-10 pb-20 pt-32">
        <div className="flex items-center gap-3.5 mb-7 hero-card-in">
          <span className="w-[54px] h-px bg-white/45" />
          <span className="font-display font-semibold text-[13px] tracking-[0.18em] uppercase text-white">
            {tr(lang, 'Verfügbar für neue Projekte', 'Available for new projects')}
          </span>
        </div>

        <h1 className="font-display font-semibold text-white hero-text-in" style={{ fontSize: 'clamp(40px, 5.6vw, 74px)', lineHeight: 1.04, letterSpacing: '-0.03em', maxWidth: '17ch' }}>
          {tr(lang, 'Aus deiner Idee wird ein echtes Produkt.', 'Turn your idea into a real product.')}
        </h1>

        <p className="mt-6 text-white/80 font-sans font-medium hero-phones-in" style={{ fontSize: 'clamp(17px, 1.6vw, 22px)', lineHeight: 1.45, maxWidth: '52ch' }}>
          {tr(lang,
            'Apps, Web-Apps und Landingpages — end-to-end gebaut von einem KI-nativen Entwickler, der liefert. Aus Deutschland, weltweit im Einsatz.',
            'Apps, web apps and landing pages — built end-to-end by an AI-native developer who ships. Based in Germany, working worldwide.')}
        </p>

        <div className="mt-9 flex flex-wrap gap-4 hero-phones-in">
          <button onClick={() => scrollTo('contact')} className="px-9 py-4 bg-electric text-white font-display font-bold rounded-full text-[17px] hover:bg-electric-dark transition-all">
            {tr(lang, 'Kostenloses Angebot', 'Get a free quote')}
          </button>
          <button onClick={() => scrollTo('portfolio')} className="px-8 py-4 bg-transparent text-white border border-white/40 font-display font-semibold rounded-full text-[17px] hover:border-white hover:bg-white/5 transition-all flex items-center gap-2 group">
            {tr(lang, 'Arbeiten ansehen', 'See the work')}
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
