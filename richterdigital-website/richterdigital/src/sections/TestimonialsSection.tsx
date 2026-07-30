import { Star } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

// WICHTIG: Diese Zitate sind Entwürfe. Vor dem Deploy müssen Oleg und Becky
// den Wortlaut ausdrücklich freigeben — erst dann veröffentlichen.
const TestimonialsSection = () => {
  const { lang } = useLang();

  const testimonials = [
    {
      quote: tr(lang,
        'Arthur hat die Ladezeiten meiner drei Shops deutlich verbessert und kümmert sich seitdem zuverlässig um die Technik. Ich muss mich um nichts kümmern und kann mich voll auf den Verkauf konzentrieren.',
        'Arthur significantly improved the load times of my three shops and has been reliably taking care of the tech ever since. I don’t have to worry about anything and can focus fully on selling.'),
      name: 'Oleg',
      role: tr(lang, 'Inhaber, Powercleany · Fitorb · SwiftPod', 'Owner, Powercleany · Fitorb · SwiftPod'),
      photo: undefined,
    },
    {
      quote: tr(lang,
        'Arthur hat meine Marke sofort verstanden. Die Design-Entwürfe für meine Website haben meine Erwartungen übertroffen, und die Zusammenarbeit ist unkompliziert und auf Augenhöhe.',
        'Arthur understood my brand right away. The design drafts for my website exceeded my expectations, and working together is easy and on equal footing.'),
      name: 'Rebecca',
      role: tr(lang, 'Gründerin, Soul of Frequency by ØLVIA Healing', 'Founder, Soul of Frequency by ØLVIA Healing'),
      photo: '/images/refs/becky.jpg',
    },
  ];

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-mist text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Stimmen', 'Voices')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Was Kunden <span className="mark-hl">über die Arbeit sagen</span>.</>
              : <>What clients <span className="mark-hl">say about the work</span>.</>}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-[880px]">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full bg-paper rounded-2xl border border-ink/10 p-6 flex flex-col">
                {/* Bewertung des Kunden selbst - bewusst ohne Plattform-Logo,
                    damit es nicht faelschlich nach Google oder Trustpilot aussieht. */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="font-display font-bold text-ink text-sm">5/5</span>
                </div>
                <p className="text-ink/80 font-sans" style={{ fontSize: '16px', lineHeight: 1.6 }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 pt-2">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      loading="lazy"
                      width={128}
                      height={128}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-electric/10 text-electric flex items-center justify-center font-display font-bold">{t.name.charAt(0)}</span>
                  )}
                  <div>
                    <p className="font-display font-semibold text-ink text-sm">{t.name}</p>
                    <p className="text-ink/55 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
