import { useLang, tr } from '../i18n';

// HINWEIS: Erfundene Platzhalter-Logos, damit das Laufband sichtbar ist.
// Vor Veröffentlichung durch echte Kunden-/Partnerlogos ersetzen.
const LOGOS = ['Nordlicht', 'Pixelwerk', 'Lunara', 'Brightfox', 'Aurelia', 'Hanse Labs', 'Voltway', 'Meridian'];

const LogoMarqueeSection = () => {
  const { lang } = useLang();
  const row = [...LOGOS, ...LOGOS];

  return (
    <section className="bg-mist py-12 overflow-hidden">
      <p className="font-mono-label text-ink/40 text-center mb-8">{tr(lang, 'Vertraut von Teams, die liefern', 'Trusted by teams that ship')}</p>
      <div className="relative">
        <div className="flex w-max gap-16 marquee-track items-center">
          {row.map((logo, i) => (
            <span key={i} className="font-display font-semibold whitespace-nowrap" style={{ fontSize: '26px', color: 'rgba(150,132,98,0.55)' }}>
              {logo}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: 'linear-gradient(to right, #EEEEEE, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: 'linear-gradient(to left, #EEEEEE, transparent)' }} />
      </div>
    </section>
  );
};

export default LogoMarqueeSection;
