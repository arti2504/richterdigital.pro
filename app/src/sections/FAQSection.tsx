import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Wie lange dauert ein Projekt?',
    answer: 'Die Projektdauer hängt vom Umfang ab. Eine Essential-Website ist typischerweise in 3–4 Wochen fertig. Growth- und Dominance-Projekte können 6–10 Wochen dauern. Wir legen Wert auf Qualität statt Eile—ein durchdachtes Design zahlt sich langfristig aus.',
  },
  {
    question: 'Was kostet eine Premium-Website?',
    answer: 'Unsere Projekte starten im mittleren vierstelligen Bereich. Die genaue Investition hängt von Ihren Anforderungen ab. Wir bieten auch flexible Mietkauf-Modelle an, um Ihre Liquidität zu schützen. In einem kostenlosen Erstgespräch erhalten Sie ein transparentes Angebot.',
  },
  {
    question: 'Warum Richter Digital?',
    answer: 'Wir kombinieren strategisches Denken mit exzellenter Umsetzung. Unser Fokus liegt auf messbaren Ergebnissen—mehr Leads, höhere Conversion, bessere Sichtbarkeit. Wir verstehen die Anforderungen von Kanzleien, Arztpraxen und Premium-Dienstleistern.',
  },
  {
    question: 'Ist meine Website DSGVO-konform?',
    answer: 'Absolut. Datenschutz ist bei uns kein nachträgliches Add-on, sondern integraler Bestandteil jedes Projekts. Wir implementieren Cookie-Consent, sichere Formulare, und unser Serverstandort ist in Deutschland.',
  },
  {
    question: 'Kann ich meine Website später erweitern?',
    answer: 'Ja, alle unsere Websites sind skalierbar aufgebaut. Ob neue Seiten, zusätzliche Funktionen oder Integrationen—wir wachsen mit Ihren Anforderungen. Unser Support-Team steht Ihnen auch nach dem Launch zur Seite.',
  },
  {
    question: 'Wie funktioniert der Mietkauf?',
    answer: 'Beim Mietkauf zahlen Sie monatlich eine feste Rate über 12–24 Monate. Nach der letzten Rate gehört die Website Ihnen vollständig. Ideal, wenn Sie Ihre Liquidität schonen möchten, aber sofort von einer professionellen Website profitieren wollen.',
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.style.opacity = '1';
            contentRef.current.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-900 py-24 lg:py-32 z-[80]"
    >
      <div className="relative z-10 px-6 lg:px-12">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto transition-all duration-1000 opacity-0 translate-y-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-mono-label text-electric mb-4 block">FAQ</span>
            <h2 className="font-display text-display-2 text-cream font-bold">
              Häufig gestellte Fragen
            </h2>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-navy-800/50 rounded-2xl border border-white/5 px-6 lg:px-8 data-[state=open]:border-electric/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-display text-lg font-semibold text-cream hover:text-electric py-6 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-cream-muted pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
