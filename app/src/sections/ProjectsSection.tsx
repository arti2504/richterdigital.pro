import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const projects = [
  {
    id: 'citylights',
    title: 'Citylights',
    subtitle: 'Eine Homepage, die verkauft.',
    description: 'Klare Botschaft, schnelle Ladezeit, durchdachte Conversion-Struktur—für ein Immobilien-Team, das in jeder Stadt zuhause ist.',
    image: '/images/project_city_street.jpg',
    mockImage: '/images/project_mock.jpg',
    category: 'Immobilien',
  },
];

// Beispiel Designs - zeigen was möglich ist, ohne zu lügen
const exampleDesigns = [
  {
    id: 'kanzlei',
    name: 'Kanzlei-Website',
    category: 'Legal',
    image: '/images/case_lawyer.jpg',
    description: 'Premium Webdesign für Anwaltskanzleien. Fokus auf Vertrauensaufbau und klare Kommunikation der Expertise.',
  },
  {
    id: 'praxis',
    name: 'Praxis-Website',
    category: 'Medical',
    image: '/images/case_medical.jpg',
    description: 'Moderne Patientenakquise durch optimierte Online-Terminbuchung und vertrauensförderndes Design.',
  },
  {
    id: 'immo',
    name: 'Immobilien-Portal',
    category: 'Real Estate',
    image: '/images/case_realestate.jpg',
    description: 'Luxus-Immobilienportal mit immersiver Objektpräsentation und intelligenter Lead-Qualifizierung.',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDesign, setSelectedDesign] = useState<typeof exampleDesigns[0] | null>(null);

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

  const featuredProject = projects[0];

  return (
    <section
      ref={sectionRef}
      id="projekte"
      className="relative min-h-screen bg-navy-900 py-24 lg:py-32 z-30"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url(${featuredProject.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'rgba(7,10,18,0.75)',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 px-6 lg:px-12 transition-all duration-1000 opacity-0 translate-y-10"
      >
        {/* Main Lens */}
        <div className="max-w-7xl mx-auto">
          <div className="lens-frame bg-navy-800/80 backdrop-blur-sm p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text Content */}
              <div>
                <span className="font-mono-label text-electric mb-4 block">PROJEKT</span>
                <h2 className="font-display text-display-2 text-cream font-bold mb-4">
                  {featuredProject.title}
                </h2>
                <p className="text-xl lg:text-2xl text-cream-muted mb-6">
                  {featuredProject.subtitle}
                </p>
                <p className="text-cream-muted/80 mb-8 max-w-lg">
                  {featuredProject.description}
                </p>

                <button className="group glow-button px-6 py-3 bg-electric text-white font-semibold rounded-xl flex items-center gap-3 hover:bg-electric-dark transition-all">
                  Details ansehen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right - Mock Image */}
              <div className="lens-frame-inner aspect-[4/3] relative overflow-hidden">
                <img
                  src={featuredProject.mockImage}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Example Designs Grid */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="text-center mb-12">
            <span className="font-mono-label text-electric mb-4 block">UNSERE ARBEIT</span>
            <h3 className="font-display text-display-3 text-cream font-bold">
              Beispiel Designs
            </h3>
            <p className="text-cream-muted mt-4 max-w-2xl mx-auto">
              Das ist möglich – maßgeschneiderte Designs für Ihre Branche
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {exampleDesigns.map((design) => (
              <button
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                className="group text-left lens-frame aspect-video relative overflow-hidden cursor-pointer"
              >
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, transparent 30%, rgba(7,10,18,0.95) 100%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono-label text-electric text-xs mb-2 block">{design.category}</span>
                  <h4 className="font-display text-xl font-bold text-cream mb-1">{design.name}</h4>
                  <div className="flex items-center gap-2 text-cream-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Mehr erfahren</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Design Modal */}
      <Dialog open={!!selectedDesign} onOpenChange={() => setSelectedDesign(null)}>
        <DialogContent className="max-w-4xl bg-navy-800 border-navy-700 text-cream max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">
              {selectedDesign?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedDesign && (
            <div className="space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono-label text-electric text-xs mb-2 block">{selectedDesign.category}</span>
                <p className="text-cream-muted">{selectedDesign.description}</p>
              </div>
              <div className="bg-navy-900/50 rounded-xl p-6">
                <p className="text-sm text-cream-muted">
                  <span className="text-electric font-semibold">Hinweis:</span> Dies ist ein Beispiel-Design, 
                  das zeigt, was für Ihre Branche möglich ist. Jedes Projekt wird individuell auf Ihre 
                  Bedürfnisse und Ziele angepasst.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
