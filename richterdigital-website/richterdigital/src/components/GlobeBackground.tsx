import { useEffect, useRef } from 'react';

const DEG = Math.PI / 180;

// Home + client cities
const HOME = { lat: 51.73, lng: 9.02 };
const CITIES = [
  { lat: 52.52, lng:  13.40 }, // Berlin
  { lat: 51.51, lng:  -0.13 }, // London
  { lat: 48.85, lng:   2.35 }, // Paris
  { lat: 52.37, lng:   4.90 }, // Amsterdam
  { lat: 48.21, lng:  16.37 }, // Vienna
  { lat: 41.90, lng:  12.50 }, // Rome
  { lat: 40.42, lng:  -3.70 }, // Madrid
  { lat: 59.33, lng:  18.07 }, // Stockholm
  { lat: 40.71, lng: -74.01 }, // New York
  { lat: 34.05, lng:-118.24 }, // Los Angeles
  { lat: 43.65, lng: -79.38 }, // Toronto
  { lat: 25.20, lng:  55.27 }, // Dubai
  { lat:  1.35, lng: 103.82 }, // Singapore
  { lat: 35.68, lng: 139.69 }, // Tokyo
  { lat:-33.87, lng: 151.21 }, // Sydney
  { lat:-23.55, lng: -46.63 }, // São Paulo
];

// ---------- math helpers ----------
const toXYZ = (lat: number, lng: number): [number, number, number] => {
  const phi = lat * DEG;
  const theta = lng * DEG;
  return [Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)];
};

const fromXYZ = (x: number, y: number, z: number) => ({
  lat: Math.asin(Math.max(-1, Math.min(1, y))) / DEG,
  lng: Math.atan2(z, x) / DEG,
});

/** SLERP great-circle arc — returns array of {lat,lng} */
const greatArc = (
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  steps = 48,
): { lat: number; lng: number }[] => {
  const [x1, y1, z1] = toXYZ(lat1, lng1);
  const [x2, y2, z2] = toXYZ(lat2, lng2);
  const dot = Math.max(-1, Math.min(1, x1*x2 + y1*y2 + z1*z2));
  const omega = Math.acos(dot);
  const sinO  = Math.sin(omega);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    if (sinO < 0.0001) return fromXYZ(x1, y1, z1);
    const w1 = Math.sin((1 - t) * omega) / sinO;
    const w2 = Math.sin(t * omega) / sinO;
    return fromXYZ(w1*x1 + w2*x2, w1*y1 + w2*y2, w1*z1 + w2*z2);
  });
};

// Pre-compute arcs once
const ARC_CACHE = CITIES.map(c => greatArc(HOME.lat, HOME.lng, c.lat, c.lng));

// Mesh nodes: lat ×20, lng ×24  → triangulated
const MESH_LATS = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
const MESH_STEP = 24; // lng step

// Build connection list (H = horizontal, V = vertical, D = diagonal)
interface Conn { lat1: number; lng1: number; lat2: number; lng2: number }
const CONNECTIONS: Conn[] = [];
for (const lat of MESH_LATS) {
  for (let lng = -180; lng < 180; lng += MESH_STEP) {
    const lng2 = lng + MESH_STEP;
    // H
    CONNECTIONS.push({ lat1: lat, lng1: lng, lat2: lat, lng2 });
    // V (if not at pole)
    if (lat < 80) {
      const lat2 = lat + 20;
      CONNECTIONS.push({ lat1: lat, lng1: lng, lat2, lng2: lng });
      // Diagonal
      CONNECTIONS.push({ lat1: lat, lng1: lng, lat2, lng2 });
    }
  }
}

// All unique nodes
const NODES: { lat: number; lng: number }[] = [];
for (const lat of MESH_LATS) {
  for (let lng = -180; lng < 180; lng += MESH_STEP) {
    NODES.push({ lat, lng });
  }
}

// ----------------------------------
const GlobeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const R    = mobile ? 160 : 270;
    const SIZE = Math.round(R * 2.9);

    canvas.width  = SIZE;
    canvas.height = SIZE;

    // Position canvas so globe center sits near viewport top-right corner
    const offset = Math.round(SIZE / 2 - R * 0.35);
    canvas.style.top   = `-${offset}px`;
    canvas.style.right = `-${offset}px`;

    const cx = SIZE / 2;
    const cy = SIZE / 2;

    let rot   = 0;   // start showing Europe
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
      rot   += 0.04;
      pulse += 0.022;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // ── Outer atmosphere haze ──
      const atm = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.42);
      atm.addColorStop(0,    'rgba(30,80,255,0.14)');
      atm.addColorStop(0.45, 'rgba(20,60,220,0.06)');
      atm.addColorStop(1,    'transparent');
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.42, 0, Math.PI * 2);
      ctx.fill();

      // ── Sphere base ──
      const base = ctx.createRadialGradient(cx - R*0.3, cy - R*0.25, R*0.05, cx, cy, R);
      base.addColorStop(0, 'rgba(8,16,50,0.97)');
      base.addColorStop(1, 'rgba(3,6,16,0.99)');
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // ── Clip to sphere for all internal drawing ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // ── Mesh connections ──
      ctx.lineWidth = 0.7;
      for (const c of CONNECTIONS) {
        const p1 = project(c.lat1, c.lng1);
        const p2 = project(c.lat2, c.lng2);
        const z  = (p1.z + p2.z) / 2;
        const a  = z > 0
          ? 0.10 + (z / R) * 0.42
          : 0.015 + Math.max(0, (z + R) / R) * 0.05;
        ctx.strokeStyle = `rgba(50,140,255,${a})`;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      // ── Mesh node glows ──
      for (const n of NODES) {
        const { sx, sy, z } = project(n.lat, n.lng);
        if (z < 0) continue;
        const vis = z / R;
        // Small bright node
        ctx.fillStyle = `rgba(120,200,255,${vis * 0.85})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Great-circle arcs to client cities ──
      ctx.lineWidth = 0.9;
      for (const arc of ARC_CACHE) {
        let prevVis = false;
        ctx.beginPath();
        for (const pt of arc) {
          const { sx, sy, z } = project(pt.lat, pt.lng);
          const vis = z > 0;
          if (vis && !prevVis) ctx.moveTo(sx, sy);
          else if (vis)        ctx.lineTo(sx, sy);
          prevVis = vis;
        }
        ctx.strokeStyle = 'rgba(80,200,255,0.30)';
        ctx.stroke();
      }

      // ── City dots ──
      for (const city of CITIES) {
        const { sx, sy, z } = project(city.lat, city.lng);
        if (z < 0) continue;
        const vis = z / R;
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
        g.addColorStop(0, `rgba(100,200,255,${vis * 0.7})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(180,230,255,${vis * 0.9})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Home dot (Bad Driburg) — double pulse ring ──
      {
        const { sx, sy, z } = project(HOME.lat, HOME.lng);
        if (z > 0) {
          const vis = z / R;
          // Bright home dot
          ctx.fillStyle = `rgba(220,240,255,${vis})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
          ctx.fill();
          // Two pulse rings offset in phase
          for (const off of [0, Math.PI]) {
            const t  = (Math.sin(pulse + off) * 0.5 + 0.5);
            const rr = 4 + t * 24;
            const aa = (1 - t) * vis * 0.75;
            ctx.strokeStyle = `rgba(100,190,255,${aa})`;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.arc(sx, sy, rr, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.restore(); // end clip

      // ── Rim glow (limb brightening) ──
      const rim = ctx.createRadialGradient(cx, cy, R * 0.78, cx, cy, R);
      rim.addColorStop(0,    'transparent');
      rim.addColorStop(0.72, 'rgba(40,100,255,0.05)');
      rim.addColorStop(1,    'rgba(60,140,255,0.28)');
      ctx.fillStyle = rim;
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
        pointerEvents: 'none',
        zIndex: 9997,
        opacity: 0.88,
      }}
      aria-hidden="true"
    />
  );
};

export default GlobeBackground;
