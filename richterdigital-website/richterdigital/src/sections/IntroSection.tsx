import { useLang, tr } from '../i18n';

const IntroSection = () => {
  const { lang } = useLang();
  return (
    <section className="bg-paper text-ink py-16 sm:py-24 lg:py-28 px-6">
      <div className="max-w-[860px] mx-auto text-center">
        <h2 className="font-display font-bold" style={{ fontSize: 'clamp(34px, 5vw, 66px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {lang === 'de' ? (
            <>Aus deiner Idee wird ein <span className="mark-hl">echtes Produkt</span>.</>
          ) : (
            <>Turn your idea into a <span className="mark-hl">real product</span>.</>
          )}
        </h2>
        <p className="mt-6 mx-auto font-sans text-ink/70" style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.55, maxWidth: '58ch' }}>
          {tr(lang,
            'Wir bauen Apps, Web-Apps und Landingpages. Vom ersten Entwurf bis zum fertigen Produkt im Store oder online. Unser Sitz ist in Deutschland, unsere Kunden sind überall.',
            'We build apps, web apps and landing pages. From the first draft to the finished product, live in the store or online. We are based in Germany and work with clients everywhere.')}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
