import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

/* Zitate sind von Oleg und Rebecca freigegeben. */

const GOOGLE_PROFIL = 'https://share.google/HTVGc8UxX7cHVEr1t';

/** Googles Vier-Farben-G, fuer den Verweis auf das echte Profil. */
const GoogleG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

const Sterne = () => (
  <div className="flex gap-0.5" role="img" aria-label="5 von 5 Sternen">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { lang } = useLang();
  const spur = useRef<HTMLDivElement>(null);

  const stimmen = [
    {
      quote: tr(lang,
        'Arthur hat die Ladezeiten meiner drei Shops deutlich verbessert und kümmert sich seitdem zuverlässig um die Technik. Ich muss mich um nichts kümmern und kann mich voll auf den Verkauf konzentrieren.',
        'Arthur significantly improved the load times of my three shops and has been reliably taking care of the tech ever since. I don’t have to worry about anything and can focus fully on selling.'),
      name: 'Oleg',
      role: tr(lang, 'Inhaber, Powercleany · Fitorb · SwiftPod', 'Owner, Powercleany · Fitorb · SwiftPod'),
      photo: '/images/refs/oleg.jpg',
    },
    {
      quote: tr(lang,
        'Arthur hat meine Marke sofort verstanden. Die Design-Entwürfe für meine Website haben meine Erwartungen übertroffen, und die Zusammenarbeit ist unkompliziert und auf Augenhöhe.',
        'Arthur understood my brand right away. The design drafts for my website exceeded my expectations, and working together is easy and on equal footing.'),
      name: 'Rebecca',
      /* Markenname auf Wunsch der Kundin noch nicht oeffentlich. */
      role: tr(lang, 'Gründerin, SOF', 'Founder, SOF'),
      photo: '/images/refs/becky.jpg',
    },
  ];

  const schieben = (richtung: 1 | -1) => {
    const el = spur.current;
    if (!el) return;
    el.scrollBy({ left: richtung * Math.min(el.clientWidth * 0.85, 420), behavior: 'smooth' });
  };

  if (stimmen.length === 0) return null;

  return (
    <section className="bg-mist text-ink py-20 sm:py-28">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <div className="sm:flex sm:items-end sm:justify-between gap-6">
            <div>
              <p className="font-mono-label text-electric mb-4">{tr(lang, 'Stimmen', 'Voices')}</p>
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                {lang === 'de'
                  ? <>Was Kunden <span className="mark-hl">über die Arbeit sagen</span>.</>
                  : <>What clients <span className="mark-hl">say about the work</span>.</>}
              </h2>
            </div>
            {/* Pfeile auch auf dem Handy: das Wischen erkennt sonst niemand. */}
            <div className="flex gap-2 flex-shrink-0 mt-6 sm:mt-0">
              <button onClick={() => schieben(-1)} aria-label={tr(lang, 'Zurück', 'Previous')}
                className="w-11 h-11 rounded-full border border-ink/15 bg-paper flex items-center justify-center hover:border-electric hover:text-electric transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => schieben(1)} aria-label={tr(lang, 'Weiter', 'Next')}
                className="w-11 h-11 rounded-full border border-ink/15 bg-paper flex items-center justify-center hover:border-electric hover:text-electric transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Waagerechter Schieber. Auf dem Handy eine Karte, am Rechner zwei. */}
      <div
        ref={spur}
        className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {stimmen.map((s) => (
          <div
            key={s.name}
            className="snap-start flex-shrink-0 bg-paper rounded-2xl border border-ink/10 p-6 flex flex-col"
            style={{ width: 'min(85vw, 440px)' }}
          >
            <Sterne />
            <p className="mt-4 text-ink/80 flex-1" style={{ fontSize: '16px', lineHeight: 1.6 }}>&ldquo;{s.quote}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <img src={s.photo} alt={s.name} loading="lazy" width={256} height={256} className="w-11 h-11 rounded-full object-cover" />
              <div>
                <p className="font-display font-semibold text-ink text-sm">{s.name}</p>
                <p className="text-ink/55 text-xs">{s.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verweis auf das echte Profil. Ueberpruefbar, anders als Sterne auf der eigenen Seite. */}
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal delay={80}>
          <a
            href={GOOGLE_PROFIL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 bg-paper border border-ink/12 rounded-full pl-4 pr-5 py-2.5 hover:border-electric transition-colors group"
          >
            <GoogleG className="w-5 h-5" />
            <span className="font-display font-semibold text-sm text-ink">
              {tr(lang, 'Bewertungen auf Google ansehen', 'See our reviews on Google')}
            </span>
            <ArrowUpRight className="w-4 h-4 text-ink/45 group-hover:text-electric transition-colors" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
