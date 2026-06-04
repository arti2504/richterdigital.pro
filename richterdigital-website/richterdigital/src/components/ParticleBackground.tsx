import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
  wobble: number;
  wobbleSpeed: number;
}

const COUNT = 55;

function spawn(W: number, H: number, randomY = false): Particle {
  const hues = [15, 15, 15, 20, 10, 25]; // #ff4620 = hsl(15°) — orange-red tones
  return {
    x: Math.random() * W,
    y: randomY ? Math.random() * H : H + 30,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -(Math.random() * 0.55 + 0.18),
    r: Math.random() * 1.6 + 0.6,
    opacity: 0,
    life: 0,
    maxLife: Math.random() * 280 + 200,
    hue: hues[Math.floor(Math.random() * hues.length)],
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.035 + 0.012,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.008 + 0.003,
  };
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // Seed particles spread across the screen
    const particles: Particle[] = Array.from({ length: COUNT }, () =>
      spawn(W, H, true)
    );

    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Advance
        p.life++;
        p.pulse  += p.pulseSpeed;
        p.wobble += p.wobbleSpeed;

        // Wobble horizontal drift
        p.x += p.vx + Math.sin(p.wobble) * 0.18;
        p.y += p.vy;

        // Horizontal wrap
        if (p.x < -30) p.x = W + 30;
        if (p.x > W + 30) p.x = -30;

        // Fade in / out
        const fade = 55;
        if (p.life < fade) {
          p.opacity = p.life / fade;
        } else if (p.life > p.maxLife - fade) {
          p.opacity = (p.maxLife - p.life) / fade;
        } else {
          p.opacity = 1;
        }

        // Respawn
        if (p.life >= p.maxLife || p.y < -30) {
          particles[i] = spawn(W, H);
          continue;
        }

        const a   = p.opacity;
        const pr  = p.r * (1 + Math.sin(p.pulse) * 0.45); // pulsed radius
        const h   = p.hue;

        // ── Layer 1: large ambient glow — illuminates background ──
        const g1 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 110);
        g1.addColorStop(0,   `hsla(${h}, 100%, 60%, ${a * 0.07})`);
        g1.addColorStop(0.5, `hsla(${h}, 100%, 55%, ${a * 0.03})`);
        g1.addColorStop(1,   'hsla(0,0%,0%,0)');
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 110, 0, Math.PI * 2);
        ctx.fill();

        // ── Layer 2: medium soft halo ──
        const mid = pr * 13;
        const g2  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, mid);
        g2.addColorStop(0,   `hsla(${h}, 100%, 75%, ${a * 0.5})`);
        g2.addColorStop(0.45,`hsla(${h}, 100%, 65%, ${a * 0.18})`);
        g2.addColorStop(1,   'hsla(0,0%,0%,0)');
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, mid, 0, Math.PI * 2);
        ctx.fill();

        // ── Layer 3: bright core ──
        const g3 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 2.2);
        g3.addColorStop(0, `hsla(${h}, 100%, 98%, ${a})`);
        g3.addColorStop(1, `hsla(${h}, 100%, 80%, 0)`);
        ctx.fillStyle = g3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pr * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
