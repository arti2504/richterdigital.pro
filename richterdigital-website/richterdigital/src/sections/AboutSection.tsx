import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const AboutSection = () => {
  const { lang } = useLang();
  return (
    <section id="about" className="bg-mist text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal variant="left">
          <img src="/images/arthur.jpg" alt="Arthur Richter" className="w-full max-w-[420px] mx-auto rounded-3xl object-cover" />
        </Reveal>
        <Reveal variant="right">
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Über mich', 'About')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.14, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Ein Entwickler. <span className="mark-hl">Dein ganzes Projekt.</span></>
              : <>One developer. <span className="mark-hl">Your entire project.</span></>}
          </h2>
          <p className="mt-5 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Ich bin Arthur Richter, freier Entwickler aus Bad Driburg. Statt einer großen Agentur bekommst du eine Person, die dein Projekt von der Idee bis zum Launch end-to-end baut — schnell, direkt und ohne Umwege.',
              "I'm Arthur Richter, a freelance developer based in Bad Driburg, Germany. Instead of a big agency you get one person who builds your project end-to-end, from idea to launch — fast, direct and without detours.")}
          </p>
          <p className="mt-4 text-ink/70 font-sans" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            {tr(lang,
              'Ich arbeite KI-nativ: Ich nutze moderne KI-Werkzeuge nicht als Buzzword, sondern um besser, schneller und günstiger zu liefern als klassische Anbieter. Meine eigene App habe ich allein entwickelt und weltweit im Play Store veröffentlicht.',
              'I work AI-native: I use modern AI tools not as a buzzword but to deliver better, faster and more affordably than traditional shops. I built and shipped my own app solo, live worldwide on Google Play.')}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
