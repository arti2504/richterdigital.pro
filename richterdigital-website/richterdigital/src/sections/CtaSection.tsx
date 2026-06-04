import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const CtaSection = () => {
  const { lang } = useLang();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="bg-electric text-white py-20 sm:py-28 px-6">
      <Reveal>
        <div className="max-w-[820px] mx-auto text-center">
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.6vw, 58px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {tr(lang, 'Bereit, dein Produkt zu bauen?', 'Ready to build your product?')}
          </h2>
          <p className="mt-5 mx-auto text-white/85 font-sans" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.55, maxWidth: '54ch' }}>
            {tr(lang,
              'Erzähl uns von deiner Idee — wir melden uns innerhalb von 24 Stunden mit einer ehrlichen Einschätzung. Die Erstberatung ist kostenlos.',
              'Tell us about your idea — we get back to you within 24 hours with an honest assessment. The initial consultation is free.')}
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="mt-9 px-9 py-4 bg-white text-electric font-display font-bold rounded-full text-[17px] hover:bg-white/90 transition-all"
          >
            {tr(lang, 'Kostenlose Beratung', 'Get a free consultation')}
          </button>
        </div>
      </Reveal>
    </section>
  );
};

export default CtaSection;
