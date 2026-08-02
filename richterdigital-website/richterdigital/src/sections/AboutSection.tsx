import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const AboutSection = () => {
  const { lang } = useLang();
  return (
    <section id="about" className="bg-mist text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal variant="left">
          <div className="relative max-w-[420px] mx-auto">
            <img loading="lazy" decoding="async" src="/images/arthur.webp" alt="Arthur Richter, Gründer von Richter Digital" className="w-full rounded-3xl object-cover" />
            <div className="absolute bottom-4 left-4 bg-ink/85 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-display font-semibold text-sm">Arthur Richter, {tr(lang, 'Gründer', 'Founder')}</span>
            </div>
          </div>
        </Reveal>
        <Reveal variant="right">
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Über uns', 'About us')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.14, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Ein Partner.<br /><span className="mark-hl">Dein ganzes Projekt.</span></>
              : <>One partner.<br /><span className="mark-hl">Your entire project.</span></>}
          </h2>
          <p className="mt-5 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Richter Digital begleitet dein Projekt von der ersten Idee bis zum Launch und bleibt auch danach an deiner Seite. Du arbeitest direkt mit den Leuten, die dein Produkt bauen, ohne Umwege über Zwischenebenen. Die Erstberatung ist immer kostenlos.',
              'Richter Digital guides your project from the first idea to launch and stays at your side afterwards too. You work directly with the people building your product, with no layers in between. The first consultation is always free.')}
          </p>
          <p className="mt-4 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Wir nehmen bewusst nie mehr als eine Handvoll Projekte gleichzeitig an. So bekommt jedes Vorhaben die Zeit, die es braucht. Ein gutes Ergebnis ist uns wichtiger als ein voller Auftragskalender.',
              'We deliberately never take on more than a handful of projects at once. That way every project gets the time it needs. A good result matters more to us than a full calendar.')}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
