import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLang, tr } from '../i18n';

const HeroSection = () => {
  const { lang } = useLang();

  /* Startwert direkt aus matchMedia lesen. Mit einem festen false zeigt der
     erste Render die Desktop-Datei, und das Handy beginnt sie zu laden, bevor
     der Effekt sie gegen die kleinere austauscht. */
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const videoSrc = isMobile ? '/images/hero-video-mobile.mp4' : '/images/hero-video.mp4';
  const posterSrc = isMobile ? '/images/hero-poster-mobile.jpg' : '/images/hero-poster.jpg';

  /* Das Video darf nicht um die Leitung konkurrieren, solange die Seite noch
     aufbaut. preload="none" reicht dafuer nicht, autoPlay setzt sich darueber
     hinweg. Deshalb steht zuerst nur das Standbild, und die Quelle kommt erst
     dazu, wenn der Browser sonst nichts mehr zu tun hat. */
  const [videoLaden, setVideoLaden] = useState(false);

  useEffect(() => {
    let abbrechen: () => void;
    const starten = () => setVideoLaden(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(starten, { timeout: 3000 });
      abbrechen = () => window.cancelIdleCallback(id);
    } else {
      const id = window.setTimeout(starten, 1200);
      abbrechen = () => window.clearTimeout(id);
    }
    return () => abbrechen();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen bg-ink flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <video
          key={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          src={videoLaden ? videoSrc : undefined}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(20,20,20,0.0) 0%, rgba(20,20,20,0.0) 60%, rgba(20,20,20,0.8) 100%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[620px] mx-auto px-6 pb-10 sm:pb-12 text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center hero-phones-in">
          {/* Ziel ist der Rechner, nicht das Seitenende. Vorher landete hier
              jeder ganz unten und musste von dort wieder hochspringen. */}
          <button onClick={() => scrollTo('pricing')} className="w-full sm:w-auto px-7 py-3.5 bg-electric text-white font-display font-bold rounded-full text-[16px] hover:bg-electric-dark transition-all">
            {tr(lang, 'Kostenloses Angebot', 'Get a free quote')}
          </button>
          <button onClick={() => scrollTo('portfolio')} className="w-full sm:w-auto px-6 py-3.5 bg-transparent text-white border border-white/40 font-display font-semibold rounded-full text-[16px] hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
            {tr(lang, 'Arbeiten ansehen', 'See the work')}
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
