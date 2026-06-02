const items = [
  'Android', 'iOS', 'React', 'TypeScript', 'Web Apps',
  'Kotlin', 'Swift', 'Firebase', 'Node.js', 'Tailwind CSS',
  'Websites', 'Supabase', 'Google Play', 'App Store', 'REST APIs',
  'Android', 'iOS', 'React', 'TypeScript', 'Web Apps',
  'Kotlin', 'Swift', 'Firebase', 'Node.js', 'Tailwind CSS',
  'Websites', 'Supabase', 'Google Play', 'App Store', 'REST APIs',
];

const MarqueeSection = () => (
  <div className="relative bg-navy-900 py-5 overflow-hidden border-y border-white/5">
    {/* Edge fades */}
    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to right, #070A12, transparent)' }} />
    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to left, #070A12, transparent)' }} />

    <div className="flex">
      <div className="marquee-track flex gap-8 pr-8 whitespace-nowrap flex-shrink-0">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-sm text-cream-muted/50 font-medium">
            <span className="text-electric/40">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default MarqueeSection;
