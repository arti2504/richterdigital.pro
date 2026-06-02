import { useEffect, useRef } from 'react';

const DEG = Math.PI / 180;

// Places Arthur has worked — home + international clients
const LOCATIONS = [
  { lat: 51.73, lng:   9.02, home: true  }, // Bad Driburg (home)
  { lat: 52.52, lng:  13.40, home: false }, // Berlin
  { lat: 51.51, lng:  -0.13, home: false }, // London
  { lat: 48.85, lng:   2.35, home: false }, // Paris
  { lat: 52.37, lng:   4.90, home: false }, // Amsterdam
  { lat: 48.21, lng:  16.37, home: false }, // Vienna
  { lat: 41.90, lng:  12.50, home: false }, // Rome
  { lat: 40.42, lng:  -3.70, home: false }, // Madrid
  { lat: 59.33, lng:  18.07, home: false }, // Stockholm
  { lat: 40.71, lng: -74.01, home: false }, // New York
  { lat: 34.05, lng:-118.24, home: false }, // Los Angeles
  { lat: 43.65, lng: -79.38, home: false }, // Toronto
  { lat: -23.55,lng: -46.63, home: false }, // São Paulo
  { lat: 25.20, lng:  55.27, home: false }, // Dubai
  { lat: 19.08, lng:  72.88, home: false }, // Mumbai
  { lat:  1.35, lng: 103.82, home: false }, // Singapore
  { lat: 35.68, lng: 139.69, home: false }, // Tokyo
  { lat:-33.87, lng: 151.21, home: false }, // Sydney
];

const LAT_LINES = [-60, -30, 0, 30, 60];
const LNG_LINES = Array.from({ length: 12 }, (_, i) => i * 30 - 180 + 15);

const GlobeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const R    = mobile ? 105 : 175;
    const SIZE = Math.round(R * 3);

    canvas.width  = SIZE;
    canvas.height = SIZE;

    const cx = SIZE / 2;
    const cy = SIZE / 2;

    let rot   = 10;   // start showing Europe
    let pulse = 0;
    let raf: number;

    const project = (lat: number, lng: number) => {
      const phi   = lat * DEG;
      const theta = (lng + rot) * DEG;
      const x =  R * Math.cos(phi) * Math.cos(theta);
      const y =  R * Math.sin(phi);
      const z =  R * Math.cos(phi) * Math.sin(theta);
      return { sx: cx + x, sy: cy - y, z };
    };

    const tick = () => {
      rot   += 0.05;
      pulse += 0.025;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // ── 1. Outer atmosphere ──
      const atm = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.38);
      atm.addColorStop(0,   'rgba(45,98,255,0.10)');
      atm.addColorStop(0.55,'rgba(45,98,255,0.04)');
      atm.addColorStop(1,   'transparent');
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.38, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. Dark sphere base ──
      const base = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.22, R * 0.05, cx, cy, R);
      base.addColorStop(0, 'rgba(12,20,52,0.96)');
      base.addColorStop(1, 'rgba(4,7,18,0.98)');
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // ── 3. Location dot glows (outside clip so they can bleed over edge) ──
      for (const loc of LOCATIONS) {
        const { sx, sy, z } = project(loc.lat, loc.lng);
        const vis = Math.max(0, (z + R * 0.05) / (R * 1.05));
        if (vis < 0.02) continue;
        const dr = loc.home ? 4 : 2.5;
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, dr * 8);
        glow.addColorStop(0,   `rgba(80,150,255,${vis * 0.75})`);
        glow.addColorStop(0.35,`rgba(45,98,255, ${vis * 0.28})`);
        glow.addColorStop(1,   'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, dr * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 4. Clip all grid/dot drawing to sphere ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // Latitude grid
      for (const lat of LAT_LINES) {
        for (let lng = -180; lng < 180; lng += 3) {
          const p1 = project(lat, lng);
          const p2 = project(lat, lng + 3);
          const z  = (p1.z + p2.z) / 2;
          const a  = z > 0
            ? 0.08 + (z / R) * 0.32
            : 0.015 + Math.max(0, (z + R) / R) * 0.04;
          ctx.strokeStyle = `rgba(45,98,255,${a})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.stroke();
        }
      }

      // Longitude grid
      for (const lng of LNG_LINES) {
        for (let lat = -90; lat < 90; lat += 3) {
          const p1 = project(lat, lng);
          const p2 = project(lat + 3, lng);
          const z  = (p1.z + p2.z) / 2;
          const a  = z > 0
            ? 0.05 + (z / R) * 0.22
            : 0.01 + Math.max(0, (z + R) / R) * 0.03;
          ctx.strokeStyle = `rgba(45,98,255,${a})`;
          ctx.lineWidth = 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.stroke();
        }
      }

      // Dot cores + home pulse ring
      for (const loc of LOCATIONS) {
        const { sx, sy, z } = project(loc.lat, loc.lng);
        const vis = Math.max(0, (z + R * 0.05) / (R * 1.05));
        if (vis < 0.02) continue;

        const dr = loc.home ? 3.8 : 2.2;

        // White-blue core
        ctx.fillStyle = `rgba(180,215,255,${vis * 0.95})`;
        ctx.beginPath();
        ctx.arc(sx, sy, dr, 0, Math.PI * 2);
        ctx.fill();

        // Home — animated double pulse ring
        if (loc.home && z > 0) {
          [0, 0.5].forEach((offset) => {
            const t  = ((Math.sin(pulse + offset * Math.PI) * 0.5 + 0.5));
            const rr = dr + 3 + t * 22;
            const aa = (1 - t) * vis * 0.65;
            ctx.strokeStyle = `rgba(80,150,255,${aa})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(sx, sy, rr, 0, Math.PI * 2);
            ctx.stroke();
          });
        }
      }

      ctx.restore();

      // ── 5. Edge rim (light limb brightening) ──
      const rim = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R);
      rim.addColorStop(0,    'transparent');
      rim.addColorStop(0.78, 'rgba(45,98,255,0.04)');
      rim.addColorStop(1,    'rgba(45,98,255,0.20)');
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // ── 6. Specular highlight ──
      const spec = ctx.createRadialGradient(
        cx - R * 0.32, cy - R * 0.28, 0,
        cx - R * 0.32, cy - R * 0.28, R * 0.55
      );
      spec.addColorStop(0,   'rgba(100,160,255,0.06)');
      spec.addColorStop(1,   'transparent');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top:   '-28px',
        right: '-28px',
        pointerEvents: 'none',
        zIndex: 9997,
        opacity: 0.80,
      }}
      aria-hidden="true"
    />
  );
};

export default GlobeBackground;
