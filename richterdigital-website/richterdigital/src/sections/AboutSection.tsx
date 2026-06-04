import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const AboutSection = () => {
  const { lang } = useLang();
  return (
    <section id="about" className="bg-mist text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal variant="left">
          <div className="relative max-w-[420px] mx-auto">
            <img src="/images/arthur.jpg" alt="Arthur Richter, Gründer von Richter Digital" className="w-full rounded-3xl object-cover" />
            <div className="absolute bottom-4 left-4 bg-ink/85 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-display font-semibold text-sm">Arthur Richter — {tr(lang, 'Gründer', 'Founder')}</span>
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
              'Richter Digital begleitet dein Projekt von der ersten Idee bis zum Launch — und weit darüber hinaus. Du bekommst einen Partner, der dich end-to-end betreut: schnell, direkt und ohne Umwege. Die Erstberatung ist dabei immer kostenlos.',
              'Richter Digital guides your project from the first idea to launch — and well beyond. You get a partner who supports you end-to-end: fast, direct and without detours. The initial consultation is always free.')}
          </p>
          <p className="mt-4 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Wir arbeiten KI-nativ: Moderne KI-Werkzeuge sind für uns kein Buzzword, sondern der Hebel, mit dem wir besser, schneller und günstiger liefern als klassische Anbieter. Mit jahrelanger Erfahrung und eigener App-Entwicklung — Smile4Me ist weltweit im Play Store live — stehen wir dir auch nach dem Launch jederzeit tatkräftig zur Seite.',
              'We work AI-native: modern AI tools are not a buzzword for us but the lever that lets us deliver better, faster and more affordably than traditional shops. With years of experience and our own app development — Smile4Me is live worldwide on Google Play — we stay actively at your side long after launch.')}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
