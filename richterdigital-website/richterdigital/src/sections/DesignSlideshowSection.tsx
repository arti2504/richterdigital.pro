import { useState, useEffect } from 'react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const IMAGES = [
  '/images/designs/1.png', '/images/designs/2.png', '/images/designs/3.png', '/images/designs/4.png',
  '/images/designs/5.png', '/images/designs/6.png', '/images/designs/7.png', '/images/designs/8.png',
];

const Dot = () => <span className="w-2.5 h-2.5 rounded-full bg-ink/20" />;

const DesignSlideshowSection = () => {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="designs" className="bg-mist text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[980px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Design-Beispiele', 'Design examples')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>So könnte <span className="mark-hl">deine Seite aussehen</span>.</>
              : <>This is how <span className="mark-hl">your site could look</span>.</>}
          </h2>
          <p className="mt-4 text-ink/65 font-sans" style={{ fontSize: '17px', lineHeight: 1.6, maxWidth: '56ch' }}>
            {tr(lang,
              'Eine kleine Auswahl an Design-Richtungen. Deins bauen wir individuell auf deine Marke und deine Ziele zu.',
              'A small selection of design directions. Yours is built individually around your brand and your goals.')}
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 max-w-[620px] mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="rounded-xl overflow-hidden border border-ink/10 bg-white shadow-2xl">
              <div className="h-8 bg-mist flex items-center gap-1.5 px-3 border-b border-ink/10"><Dot /><Dot /><Dot /></div>
              <div className="relative aspect-[16/10] bg-white">
                {IMAGES.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Design ${i + 1}`}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2.5 mt-5">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Design ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${i === idx ? 'w-7 bg-electric' : 'w-2.5 bg-ink/20 hover:bg-ink/40'}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default DesignSlideshowSection;
