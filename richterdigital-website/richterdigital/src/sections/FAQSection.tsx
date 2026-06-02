import { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a project take?',
    a: 'It depends on the scope. A landing page or simple website is usually done in 1–2 weeks. A mobile app MVP or web app takes 4–10 weeks. I always give you a realistic timeline upfront — no surprise delays.',
  },
  {
    q: 'Do I need technical knowledge to work with you?',
    a: 'Not at all. You bring the idea, I handle everything technical. We communicate in plain language — no jargon. You will always know what is being built and why.',
  },
  {
    q: 'Can you sign an NDA?',
    a: 'Yes, absolutely. If your project is confidential I will sign a Non-Disclosure Agreement before we discuss any details. Your idea stays between us.',
  },
  {
    q: 'What if I am not satisfied with the result?',
    a: 'We work iteratively — you give feedback throughout the process, not just at the end. I build in rounds so you are never surprised by the final result. Your satisfaction is the goal.',
  },
  {
    q: 'Do you also handle maintenance and updates after launch?',
    a: 'Yes. I offer ongoing support after launch — bug fixes, feature updates, App Store / Play Store updates. We can agree on a maintenance package or handle it per request.',
  },
  {
    q: 'Do I need to share my budget upfront?',
    a: 'No, but it helps. If you have a rough number in mind, I can tell you immediately what is realistic within that. No budget? Just describe your project — I will tell you what it would cost.',
  },
  {
    q: 'Do you work with clients outside Germany?',
    a: 'Yes, I work with clients internationally. Communication in English or German, payments via bank transfer or PayPal. Time zones have never been a problem.',
  },
  {
    q: 'Who owns the code and the app after launch?',
    a: 'You do. Once the project is paid, all rights to the code, design, and product are fully yours. No hidden licensing fees.',
  },
];

const FAQItem = ({ q, a, isOpen, onToggle }: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={`border rounded-2xl overflow-hidden transition-colors ${
      isOpen ? 'border-electric/30 bg-navy-800/60' : 'border-white/8 bg-navy-800/30 hover:border-white/15'
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
    >
      <span className={`font-display font-semibold text-base transition-colors ${isOpen ? 'text-cream' : 'text-cream-muted'}`}>
        {q}
      </span>
      <span className="flex-shrink-0">
        {isOpen
          ? <Minus className="w-4 h-4 text-electric" />
          : <Plus className="w-4 h-4 text-cream-muted" />
        }
      </span>
    </button>

    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? '200px' : '0px' }}
    >
      <p className="px-6 pb-5 text-cream-muted text-sm leading-relaxed">
        {a}
      </p>
    </div>
  </div>
);

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            innerRef.current?.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-navy-900 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 40% 60%, rgba(45,98,255,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-14">
            <span className="font-mono-label text-electric mb-4 block">FAQ</span>
            <h2 className="font-display text-display-2 text-cream font-bold mb-4">
              Questions you might have
            </h2>
            <p className="text-cream-muted text-lg">
              Still wondering something?{' '}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-electric hover:underline"
              >
                Just ask directly →
              </button>
            </p>
          </div>

          <div ref={innerRef} className="reveal-up space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
