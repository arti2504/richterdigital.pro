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
          <p className="mt-5 mx-auto text-white/85 font-sans" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.55, maxWidth: '52ch' }}>
            {tr(lang,
              'Erzähl mir von deiner Idee — ich melde mich innerhalb von 24 Stunden mit einer ehrlichen Einschätzung zurück.',
              'Tell me about your idea — I get back to you within 24 hours with an honest assessment.')}
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="mt-9 px-9 py-4 bg-white text-electric font-display font-bold rounded-full text-[17px] hover:bg-white/90 transition-all"
          >
            {tr(lang, 'Kostenloses Angebot', 'Get a free quote')}
          </button>
        </div>
      </Reveal>
    </section>
  );
};

export default CtaSection;
