import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

/* Zitate sind von Oleg und Rebecca freigegeben.

   Die Zahlen im linken Block stammen vom echten Google-Profil, nachgesehen am
   02.08.2026: 5,0 aus 2 Rezensionen. Die Anzahl steht bewusst dabei. Ein
   Sternedurchschnitt ohne Anzahl gilt als irrefuehrend, sobald nur wenige
   Bewertungen dahinterstehen. Beim Aendern der Anzahl unbedingt vorher auf
   dem Profil nachsehen. */
const GOOGLE_PROFIL = 'https://share.google/HTVGc8UxX7cHVEr1t';
const GOOGLE_ANZAHL = 2;

/** Googles Vier-Farben-G, als Verweis auf das echte Profil. */
const GoogleG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

const Sterne = ({ groesse = 'w-4 h-4' }: { groesse?: string }) => (
  <div className="flex gap-0.5" role="img" aria-label="5 von 5 Sternen">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className={`${groesse} text-amber-400`} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const KURZ = 150;

const TestimonialsSection = () => {
  const { lang } = useLang();
  const spur = useRef<HTMLDivElement>(null);
  const [offen, setOffen] = useState<number | null>(null);

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
    el.scrollBy({ left: richtung * Math.min(el.clientWidth * 0.8, 380), behavior: 'smooth' });
  };

  if (stimmen.length === 0) return null;

  return (
    <section id="stimmen" className="bg-mist text-ink py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-center" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Das sagen <span className="mark-hl">unsere Kunden</span></>
              : <>What <span className="mark-hl">our clients say</span></>}
          </h2>
        </Reveal>
      </div>

      <div className="max-w-[1080px] mx-auto mt-12 px-6 lg:flex lg:items-center lg:gap-12">

        {/* Linker Block mit der Gesamtnote. Verweist auf das echte Profil,
            damit die Angabe nachpruefbar ist. */}
        <Reveal>
          <a
            href={GOOGLE_PROFIL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center flex-shrink-0 lg:w-[230px] group"
          >
            <p className="font-display font-bold tracking-wide" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)' }}>
              {tr(lang, 'AUSGEZEICHNET', 'EXCELLENT')}
            </p>
            <div className="mt-3">
              <Sterne groesse="w-7 h-7" />
            </div>
            <p className="mt-3 text-ink/70" style={{ fontSize: '14px' }}>
              {lang === 'de'
                ? <>Basierend auf <strong className="text-ink font-semibold">{GOOGLE_ANZAHL} Bewertungen</strong></>
                : <>Based on <strong className="text-ink font-semibold">{GOOGLE_ANZAHL} reviews</strong></>}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 group-hover:opacity-75 transition-opacity">
              <GoogleG className="w-6 h-6" />
              <span className="font-display font-semibold text-[19px] text-ink">Google</span>
            </span>
          </a>
        </Reveal>

        {/* Rechts der Schieber mit den einzelnen Stimmen */}
        <div className="relative mt-12 lg:mt-0 flex-1 min-w-0">
          <div
            ref={spur}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {stimmen.map((s, i) => {
              const langerText = s.quote.length > KURZ;
              const ausgeklappt = offen === i || !langerText;
              return (
                <div
                  key={s.name}
                  className="snap-start flex-shrink-0 bg-paper rounded-2xl border border-ink/10 p-6 flex flex-col"
                  style={{ width: 'min(78vw, 330px)' }}
                >
                  <div className="flex items-center gap-3">
                    <img src={s.photo} alt={s.name} loading="lazy" width={256} height={256} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-ink text-[15px] truncate">{s.name}</p>
                      <p className="text-ink/55 text-xs truncate">{s.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Sterne />
                    <BadgeCheck className="w-[18px] h-[18px] text-electric" aria-label={tr(lang, 'Kunde bestätigt', 'Verified client')} />
                  </div>

                  <p className="mt-3 text-ink/80 flex-1" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                    &ldquo;{ausgeklappt ? s.quote : s.quote.slice(0, KURZ).trimEnd() + '…'}&rdquo;
                  </p>

                  {langerText && (
                    <button
                      onClick={() => setOffen(offen === i ? null : i)}
                      className="mt-3 self-start text-ink/50 hover:text-electric transition-colors text-sm"
                    >
                      {offen === i ? tr(lang, 'Weniger', 'Show less') : tr(lang, 'Weiterlesen', 'Read more')}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pfeile. Auch auf dem Handy sichtbar, das Wischen erkennt sonst niemand. */}
          <button
            onClick={() => schieben(-1)}
            aria-label={tr(lang, 'Zurück', 'Previous')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-10 h-10 rounded-full bg-paper border border-ink/15 shadow-lg flex items-center justify-center hover:border-electric hover:text-electric transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => schieben(1)}
            aria-label={tr(lang, 'Weiter', 'Next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-10 h-10 rounded-full bg-paper border border-ink/15 shadow-lg flex items-center justify-center hover:border-electric hover:text-electric transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
