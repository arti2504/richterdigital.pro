import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const ProcessSection = () => {
  const { lang } = useLang();
  const steps = [
    { t: tr(lang, 'Kickoff-Gespräch', 'Kickoff call'),       d: tr(lang, 'Wir sprechen über deine Idee und dein Ziel und klären, was das Produkt am Ende können muss. Die Erstberatung kostet nichts.', 'We talk about your idea and your goal and figure out what the product really needs to do. The first call is free.') },
    { t: tr(lang, 'Konzept & Design', 'Concept & design'),   d: tr(lang, 'Wir entwerfen Aufbau und Design. Du gibst Feedback, bevor die erste Zeile Code entsteht.', 'We design the structure and look. You give feedback before the first line of code is written.') },
    { t: tr(lang, 'Entwicklung', 'Development'),              d: tr(lang, 'Wir bauen in kurzen Etappen und halten dich mit regelmäßigen Updates auf dem Laufenden. Keine bösen Überraschungen.', 'We build in short stages and keep you posted with regular updates. No nasty surprises.') },
    { t: tr(lang, 'Test & Feinschliff', 'Testing & polish'), d: tr(lang, 'Wir testen alles gründlich und feilen so lange, bis es rundläuft.', 'We test everything thoroughly and keep refining until it just works.') },
    { t: tr(lang, 'Launch', 'Launch'),                       d: tr(lang, 'Ob im App Store, bei Google Play oder auf deiner Domain: Die Veröffentlichung übernehmen wir für dich.', "Whether it's the App Store, Google Play or your own domain, we handle the release for you.") },
    { t: tr(lang, 'Support & Weiterentwicklung', 'Support & growth'), d: tr(lang, 'Auch nach dem Launch bleiben wir für dich erreichbar, für Updates, Verbesserungen und neue Funktionen.', 'We stay reachable after launch too, for updates, improvements and new features.') },
  ];

  return (
    <section id="ablauf" className="bg-mist text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[1080px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'So arbeiten wir', 'How we work')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Aus deiner Idee wird ein Produkt, <span className="mark-hl">Schritt für Schritt</span>.</>
              : <>Your idea becomes a product, <span className="mark-hl">step by step</span>.</>}
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className="h-full bg-paper rounded-2xl border border-ink/10 p-6 hover:border-electric/40 transition-colors">
                <span className="font-display font-bold text-electric text-2xl">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display font-semibold text-ink" style={{ fontSize: '20px' }}>{s.t}</h3>
                <p className="mt-2 text-ink/65 font-sans" style={{ fontSize: '15px', lineHeight: 1.55 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
