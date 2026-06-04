import { useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
};

const Reveal = ({ children, className = '', variant = 'up', delay = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setVis(true); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-${variant} ${vis ? 'visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
