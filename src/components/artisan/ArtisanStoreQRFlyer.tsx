import React, { useRef } from 'react';
import { 
  QrCode, 
  Printer, 
  Share2, 
  Award, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useArtisan } from '../../context/ArtisanContext';

export const ArtisanStoreQRFlyer: React.FC = () => {
  const { artisan, crafts, t } = useArtisan();
  const flyerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const storeUrl = `https://artlynk.in/karigar/${artisan.id}`;
  const whatsappNumber = artisan.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div id="artisan-store-qr-flyer-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold font-sans uppercase tracking-wider mb-1.5 border border-purple-300">
            <QrCode className="w-3.5 h-3.5 text-purple-700" />
            <span>{t.qr_title || 'Exhibition Standee & Digital QR'}</span>
          </div>
          <h2 className="text-2xl font-black font-serif text-[#0C243C]">
            {t.qr_title || 'My Karigar Dukan QR Code & Printable Standee'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-sans mt-0.5">
            {t.qr_desc || 'Display this QR flyer at Surajkund Mela, Dilli Haat, or your village workshop. Visitors can scan with Google Lens/Camera to view your verified catalog and pay directly.'}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-2xl bg-[#0C243C] hover:bg-[#162E4A] text-amber-200 text-xs font-bold font-sans uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer border border-[#D4AF37]"
        >
          <Printer className="w-4 h-4 text-[#D4AF37]" />
          <span>{t.qr_print || 'Print Exhibition Standee'}</span>
        </button>
      </div>

      {/* Printable Standee Display Card */}
      <div className="flex justify-center">
        <div 
          ref={flyerRef}
          className="w-full max-w-xl bg-[#FAF6EE] border-4 border-[#D4AF37] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-[#0C243C] relative overflow-hidden"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#D4AF37] text-xs font-serif select-none">❖</div>
          <div className="absolute top-2 right-2 text-[#D4AF37] text-xs font-serif select-none">❖</div>
          <div className="absolute bottom-2 left-2 text-[#D4AF37] text-xs font-serif select-none">❖</div>
          <div className="absolute bottom-2 right-2 text-[#D4AF37] text-xs font-serif select-none">❖</div>

          {/* Standee Header */}
          <div className="text-center space-y-2 border-b-2 border-[#D4AF37]/50 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B83227] text-white text-[10px] font-bold font-sans uppercase tracking-widest">
              <span>🇮🇳 {t.qr_certified_artisan || 'Government GI Certified Master Artisan'}</span>
            </div>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#0C243C] tracking-tight">
              {artisan.name}
            </h3>
            <p className="text-xs text-stone-700 font-sans font-semibold">
              {artisan.masterTitle} • {artisan.guildName || 'Handloom Weavers Cooperative'}
            </p>
            <p className="text-xs text-stone-500 font-sans flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B83227]" />
              <span>{artisan.village}, {artisan.district}, {artisan.state}</span>
            </p>
          </div>

          {/* High-Resolution Standee QR Display */}
          <div className="flex flex-col items-center justify-center py-4 bg-white border-2 border-[#D4AF37] rounded-3xl p-6 shadow-inner space-y-4">
            <div className="p-3 bg-[#0C243C] rounded-2xl shadow-md border-2 border-[#D4AF37]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(storeUrl)}&color=0C243C&bgcolor=FAF6EE`}
                alt="Artisan Store QR"
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl"
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#B83227] font-sans">
                {t.qr_scan_instruction || 'Scan with Any Phone Camera / Google Lens'}
              </p>
              <p className="text-[11px] text-stone-500 font-sans">
                {t.qr_direct_portfolio || 'Direct Portfolio & 100% Verified Handcraft Catalog'}
              </p>
            </div>
          </div>

          {/* Direct Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3 bg-white/70 border border-stone-300 rounded-2xl space-y-0.5">
              <span className="text-[10px] text-stone-500 font-bold uppercase">Direct WhatsApp:</span>
              <p className="font-bold text-[#0C243C]">{artisan.whatsapp}</p>
            </div>
            <div className="p-3 bg-white/70 border border-stone-300 rounded-2xl space-y-0.5">
              <span className="text-[10px] text-stone-500 font-bold uppercase">Direct UPI ID:</span>
              <p className="font-bold text-[#0C243C]">{artisan.upiId || 'rameshwar.pochampally@upi'}</p>
            </div>
          </div>

          {/* Bottom Certified Stamp */}
          <div className="text-center pt-2 border-t border-stone-300">
            <p className="text-[10px] text-stone-500 font-sans tracking-wide">
              ArtLynk • Empowering 7 Million Grassroots Indian Karigars Middleman-Free
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
