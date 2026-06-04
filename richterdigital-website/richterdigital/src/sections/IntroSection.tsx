import { useLang, tr } from '../i18n';

const IntroSection = () => {
  const { lang } = useLang();
  return (
    <section className="bg-paper text-ink py-24 lg:py-28 px-6">
      <div className="max-w-[820px] mx-auto text-center">
        <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(30px, 4.2vw, 56px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
          {lang === 'de' ? (
            <>Aus deiner Idee wird ein <span className="text-electric">echtes Produkt</span>.</>
          ) : (
            <>Turn your idea into a <span className="text-electric">real product</span>.</>
          )}
        </h2>
        <p className="mt-5 mx-auto font-sans text-ink/70" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.55, maxWidth: '58ch' }}>
          {tr(lang,
            'Apps, Web-Apps und Landingpages — end-to-end gebaut von einem KI-nativen Entwickler, der liefert. Aus Deutschland, weltweit im Einsatz.',
            'Apps, web apps and landing pages — built end-to-end by an AI-native developer who ships. Based in Germany, working worldwide.')}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
