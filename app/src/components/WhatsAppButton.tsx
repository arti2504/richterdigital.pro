import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+491234567890'; // Replace with actual number
  const message = encodeURIComponent('Hallo Richter Digital, ich interessiere mich für eine neue Website.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[150] group"
      aria-label="WhatsApp Kontakt"
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 whatsapp-pulse" />
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 whatsapp-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
        <div className="bg-navy-800 text-cream text-sm px-4 py-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Schreiben Sie uns
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
