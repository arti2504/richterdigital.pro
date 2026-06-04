import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

type Testimonial = { quote: string; name: string; role: string };

const TestimonialsSection = () => {
  const { lang } = useLang();

  const testimonials: Testimonial[] = [];

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Stimmen', 'Voices')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Was Kunden <span className="mark-hl">über die Arbeit sagen</span>.</>
              : <>What clients <span className="mark-hl">say about the work</span>.</>}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full bg-paper rounded-2xl border border-ink/10 p-6">
                <p className="text-ink/80 font-sans" style={{ fontSize: '16px', lineHeight: 1.6 }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-electric/10 text-electric flex items-center justify-center font-display font-bold">{t.name.charAt(0)}</span>
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
