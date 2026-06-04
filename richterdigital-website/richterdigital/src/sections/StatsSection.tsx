import { useEffect, useRef } from 'react';

const stats = [
  { value: '3',    unit: '',    label: 'Live products shipped' },
  { value: '180+', unit: '',    label: 'Countries reached on Play Store' },
  { value: '2+',   unit: 'yrs', label: 'Building digital products' },
  { value: '100%', unit: '',    label: 'Code ownership — always yours' },
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          inner.current?.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="stats" className="relative bg-navy-900 py-16 lg:py-20 overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

      <div className="px-6 lg:px-16">
        <div ref={inner} className="max-w-6xl mx-auto reveal-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center lg:px-10 flex flex-col items-center gap-2"
              >
                <div className="font-display font-bold text-cream leading-none"
                  style={{ fontSize: 'clamp(42px, 5vw, 68px)' }}
                >
                  <span className="text-gradient-blue">{s.value}</span>
                  {s.unit && <span className="text-cream-muted text-2xl ml-1">{s.unit}</span>}
                </div>
                <p className="text-cream-muted text-sm leading-snug text-center max-w-[140px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
