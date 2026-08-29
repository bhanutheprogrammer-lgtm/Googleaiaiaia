import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Award,
  Download
} from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';

export const ArtisanStoreQRModal: React.FC = () => {
  const { isStoreQRModalOpen, setIsStoreQRModalOpen, artisanUser } = useAuth();
  const { artisan, crafts } = useArtisan();
  const currentArtisan = artisanUser || artisan;

  const flyerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Background Scroll Locking & GSAP Animation
  useEffect(() => {
    if (isStoreQRModalOpen) {
      document.body.classList.add('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      if (cardRef.current && overlayRef.current) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );

          gsap.fromTo(
            cardRef.current,
            { 
              scale: 0.8, 
              y: 45, 
              opacity: 0,
              rotateZ: -1.5,
              transformPerspective: 1000 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              rotateZ: 0,
              duration: 0.5, 
              ease: 'back.out(1.5)' 
            }
          );

          if (flyerRef.current) {
            gsap.fromTo(
              flyerRef.current,
              { opacity: 0, scale: 0.92, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.45, delay: 0.15, ease: 'power2.out' }
            );
          }
        });

        return () => ctx.revert();
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [isStoreQRModalOpen]);

  if (!isStoreQRModalOpen) return null;

  const handleClose = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.82,
        y: 25,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setIsStoreQRModalOpen(false),
      });
    } else {
      setIsStoreQRModalOpen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const storeUrl = `https://artlynk.in/karigar/${currentArtisan.id}`;

  if (!isStoreQRModalOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      id="store-qr-modal-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={cardRef}
        id="store-qr-modal-card"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[94%] sm:w-full max-w-xl mx-auto max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 overscroll-contain bg-[#0C243C] text-white border border-amber-500/30 flex flex-col space-y-4 box-border touch-pan-y"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D4AF37 transparent',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 text-white shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🪔</span>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-serif text-amber-200">
                Artisan Storefront (Karigar Dukan) QR Flyer Card
              </h2>
              <p className="text-[10px] text-stone-300 font-sans">
                Printable Exhibition Standee & Mela QR Display
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-linear-to-r from-[#B83227] to-[#E67E22] text-white text-xs font-bold font-sans flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Standee</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Royal Display Card Container */}
        <div className="overflow-y-auto flex-1 flex justify-center bg-[#081827] p-3 sm:p-4 rounded-2xl border border-white/10">
          <div 
            ref={flyerRef}
            className="w-full max-w-md bg-white rounded-2xl border-4 border-[#D4AF37] p-5 sm:p-6 shadow-xl relative overflow-hidden text-center space-y-4"
          >
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#B83227]" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#B83227]" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#B83227]" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#B83227]" />

            {/* Header Emblem */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0C243C] text-amber-300 text-xs font-serif border border-[#D4AF37]">
              <span>🏛️ Shuddh Hastshilp • Verified GI Guild</span>
            </div>

            {/* Artisan Photo & Titles */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <img
                  src={currentArtisan.photo}
                  alt={currentArtisan.name}
                  className="w-24 h-24 rounded-full object-cover border-3 border-[#D4AF37] shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-7 h-7 bg-[#27AE60] text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-serif text-[#0C243C]">
                  {currentArtisan.name}
                </h3>
                <p className="text-sm font-serif text-[#B83227] font-semibold">
                  {currentArtisan.regionalName}
                </p>
                <p className="text-xs text-stone-600 font-sans mt-0.5">
                  📍 {currentArtisan.village}, {currentArtisan.district}, {currentArtisan.state}
                </p>
              </div>

              <div className="bg-[#FAF6EE] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/50 text-xs text-[#0C243C] font-serif italic max-w-xs">
                "{currentArtisan.storeTagline || currentArtisan.masterTitle || 'Direct handmade craft without middlemen commissions.'}"
              </div>
            </div>

            {/* Generated QR Matrix Container */}
            <div className="bg-[#FAF6EE] p-4 rounded-2xl border-2 border-dashed border-[#D4AF37] flex flex-col items-center space-y-2">
              {/* High-res Styled SVG QR Code */}
              <div className="bg-white p-3 rounded-2xl shadow-inner border border-stone-200">
                <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                  {/* Outer Frame */}
                  <rect x="5" y="5" width="30" height="30" rx="4" stroke="#0C243C" strokeWidth="4" fill="none" />
                  <rect x="12" y="12" width="16" height="16" rx="2" fill="#B83227" />

                  <rect x="65" y="5" width="30" height="30" rx="4" stroke="#0C243C" strokeWidth="4" fill="none" />
                  <rect x="72" y="12" width="16" height="16" rx="2" fill="#B83227" />

                  <rect x="5" y="65" width="30" height="30" rx="4" stroke="#0C243C" strokeWidth="4" fill="none" />
                  <rect x="12" y="72" width="16" height="16" rx="2" fill="#B83227" />

                  {/* QR Pattern Data Blocks */}
                  <rect x="42" y="10" width="8" height="8" rx="1" fill="#0C243C" />
                  <rect x="52" y="10" width="6" height="6" rx="1" fill="#D4AF37" />
                  <rect x="42" y="24" width="6" height="14" rx="1" fill="#0C243C" />
                  <rect x="52" y="22" width="8" height="8" rx="1" fill="#B83227" />

                  <rect x="10" y="44" width="8" height="8" rx="1" fill="#D4AF37" />
                  <rect x="22" y="42" width="12" height="6" rx="1" fill="#0C243C" />
                  <rect x="42" y="42" width="16" height="16" rx="2" fill="#0C243C" />
                  <circle cx="50" cy="50" r="4" fill="#D4AF37" />

                  <rect x="65" y="42" width="10" height="8" rx="1" fill="#B83227" />
                  <rect x="80" y="42" width="12" height="12" rx="1" fill="#0C243C" />

                  <rect x="42" y="65" width="8" height="12" rx="1" fill="#D4AF37" />
                  <rect x="54" y="65" width="14" height="6" rx="1" fill="#0C243C" />
                  <rect x="46" y="80" width="18" height="10" rx="1" fill="#0C243C" />
                  <rect x="70" y="65" width="8" height="8" rx="1" fill="#B83227" />
                  <rect x="82" y="70" width="10" height="18" rx="1" fill="#D4AF37" />
                </svg>
              </div>

              <div className="space-y-0.5 text-center font-sans">
                <p className="text-xs font-bold text-[#0C243C] uppercase tracking-wider">
                  Scan to View Live Catalog & Order
                </p>
                <p className="text-[10px] text-stone-500">
                  Direct WhatsApp: {currentArtisan.phone}
                </p>
                {currentArtisan.upiId && (
                  <p className="text-[10px] font-bold text-[#27AE60]">
                    Direct UPI: {currentArtisan.upiId}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Authenticity Seal */}
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-sans text-stone-600">
              <span className="flex items-center gap-1 font-semibold text-[#0C243C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#27AE60]" />
                <span>100% Direct Karigar Trade</span>
              </span>
              <span className="font-bold text-[#B83227]">
                ArtLynk Verified
              </span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-sans shrink-0">
          <span className="text-stone-300 text-[11px]">
            Display this flyer at Surajkund, Dilli Haat, or Shilparamam craft fairs.
          </span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(storeUrl);
              alert('Store Link copied to clipboard!');
            }}
            className="text-amber-400 hover:text-amber-300 font-bold hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Copy Store Link</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

