import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang, tr } from '../i18n';
import Reveal from '../components/Reveal';

const FAQSection = () => {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: tr(lang, 'Wie lange dauert ein Projekt?', 'How long does a project take?'),
      a: tr(lang,
        'Das hängt vom Umfang ab. Eine Landingpage ist oft in ein bis zwei Wochen fertig, eine App oder Web-App dauert meist mehrere Wochen. Im Erstgespräch bekommst du einen realistischen Zeitplan.',
        'It depends on the scope. A landing page is often done within one to two weeks, an app or web app usually takes several weeks. You get a realistic timeline in the first call.'),
    },
    {
      q: tr(lang, 'Was kostet das?', 'What does it cost?'),
      a: tr(lang,
        'Du bekommst einen Festpreis, bevor die Arbeit beginnt. Was deins kostet, hängt vom Umfang ab. Beantworte oben die vier Fragen, dann schicke ich dir einen Vorschlag. Das kostet nichts und verpflichtet zu nichts.',
        'You get a fixed price before the work starts. What yours costs depends on the scope. Answer the four questions above and I will send you a proposal. That costs nothing and commits you to nothing.'),
    },
    {
      q: tr(lang, 'Ich bin nicht technisch. Ist das ein Problem?', 'I am not technical. Is that a problem?'),
      a: tr(lang,
        'Überhaupt nicht. Du bringst die Idee, wir kümmern uns um die Technik. Wir reden Klartext statt Fachchinesisch, du weißt jederzeit, was gerade passiert.',
        'Not at all. You bring the idea, we handle the tech. We talk plainly instead of in jargon, so you always know what is going on.'),
    },
    {
      q: tr(lang, 'Bekomme ich nach dem Launch Support?', 'Do I get support after launch?'),
      a: tr(lang,
        'Ja. Auch nach dem Launch sind wir für dich da, ob für Fehlerbehebung, neue Funktionen oder Store-Updates. Das lässt sich als Paket oder bei Bedarf regeln.',
        'Yes. We are there for you after launch too, whether for bug fixes, new features or store updates. We can arrange that as a package or on demand.'),
    },
    {
      q: tr(lang, 'Brauche ich schon ein fertiges Konzept?', 'Do I need a finished concept already?'),
      a: tr(lang,
        'Nein. Eine grobe Idee reicht völlig. Im Gespräch schärfen wir gemeinsam, was Sinn ergibt und was nicht.',
        'No. A rough idea is enough. In the call we work out together what makes sense and what does not.'),
    },
  ];

  return (
    <section id="faq" className="bg-paper text-ink py-20 sm:py-28 px-6">
      <div className="max-w-[820px] mx-auto">
        <Reveal>
          <p className="font-mono-label text-electric mb-4">{tr(lang, 'Häufige Fragen', 'FAQ')}</p>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
            {lang === 'de'
              ? <>Bevor du fragst, <span className="mark-hl">hier die Antworten</span>.</>
              : <>Before you ask, <span className="mark-hl">here are the answers</span>.</>}
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <div className="border-b border-ink/10">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
                    <span className="font-display font-semibold text-ink" style={{ fontSize: 'clamp(17px, 2vw, 22px)' }}>{f.q}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-electric text-white rotate-45' : 'bg-mist text-ink group-hover:bg-electric/10'}`}>
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="pb-5 pr-10 text-ink/70 font-sans" style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.6 }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
