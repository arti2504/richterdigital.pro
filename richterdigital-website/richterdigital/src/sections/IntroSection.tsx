import { useLang, tr } from '../i18n';

const IntroSection = () => {
  const { lang } = useLang();
  return (
    <section id="intro" className="bg-paper text-ink py-16 sm:py-24 lg:py-28 px-6">
      <div className="max-w-[860px] mx-auto text-center">
        {/* Einzige h1 der Seite: die Hauptaussage. Ohne h1 fehlt Google das
            staerkste Signal, worum es hier geht. */}
        <h1 className="font-display font-bold" style={{ fontSize: 'clamp(34px, 5vw, 66px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {lang === 'de' ? (
            <>Aus deiner Idee wird ein <span className="mark-hl">echtes Produkt</span>.</>
          ) : (
            <>Turn your idea into a <span className="mark-hl">real product</span>.</>
          )}
        </h1>
        <p className="mt-6 mx-auto font-sans text-ink/70" style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: 1.55, maxWidth: '58ch' }}>
          {tr(lang,
            'Wir bauen Landingpages, Web-Apps und Apps. Vom ersten Entwurf bis zur fertigen Seite online oder zur App im Store. Unser Sitz ist in Deutschland, unsere Kunden sind überall.',
            'We build landing pages, web apps and apps. From the first draft to the finished site online or the app in the store. We are based in Germany and work with clients everywhere.')}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
