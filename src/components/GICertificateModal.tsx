import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  Award, 
  Flame, 
  CheckCircle, 
  QrCode, 
  Share2, 
  Sparkles 
} from 'lucide-react';
import gsap from 'gsap';
import { useArtisan } from '../context/ArtisanContext';
import { ArtisanLinkLogo } from './ArtisanLinkLogo';

export const GICertificateModal: React.FC = () => {
  const {
    selectedCraftForCertificate,
    setSelectedCraftForCertificate,
    currentLanguage,
    t
  } = useArtisan();

  const printRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Background Scroll Locking & GSAP Animation
  useEffect(() => {
    if (selectedCraftForCertificate) {
      document.body.classList.add('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      // GSAP Entrance
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
              scale: 0.75, 
              y: 50, 
              opacity: 0, 
              rotateX: 8,
              transformPerspective: 1200 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              rotateX: 0,
              duration: 0.5, 
              ease: 'power3.out' 
            }
          );

          // Stagger seal and stamps
          gsap.fromTo(
            '.cert-stamp-badge',
            { scale: 0, rotate: -30, opacity: 0 },
            { 
              scale: 1, 
              rotate: 0, 
              opacity: 1, 
              duration: 0.6, 
              stagger: 0.1, 
              delay: 0.25, 
              ease: 'elastic.out(1, 0.5)' 
            }
          );
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
  }, [selectedCraftForCertificate]);

  if (!selectedCraftForCertificate) return null;

  const craft = selectedCraftForCertificate;

  const handleClose = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.8,
        y: 30,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setSelectedCraftForCertificate(null),
      });
    } else {
      setSelectedCraftForCertificate(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!selectedCraftForCertificate || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      id="gi-certificate-modal-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={cardRef}
        id="gi-certificate-card"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-[92%] sm:w-full max-w-2xl mx-auto max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 overscroll-contain bg-[#0F1E2E] text-white border border-amber-500/30 flex flex-col space-y-5 box-border"
      >
        {/* Top Control Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 shrink-0">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-sans">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{t.bazaar_gi_seal} • Digital Certificate of Authenticity</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs transition-colors cursor-pointer font-sans uppercase tracking-wider"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              id="close-gi-certificate-btn"
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/20"
              title="Close Certificate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Royal Parchment Certificate Body */}
        <div 
          ref={printRef}
          className="space-y-6 text-[#0F1E2E] relative bg-[#FAF9F6] p-4 sm:p-6 rounded-2xl border-2 border-[#B88E28]"
        >
          {/* Ornate Indian Double Border Frame */}
          <div className="border-2 border-[#B88E28]/60 p-5 sm:p-7 rounded-2xl relative bg-white/80 shadow-xs space-y-6">
            
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-[#B88E28] text-lg font-serif">❖</div>
            <div className="absolute top-2 right-2 text-[#B88E28] text-lg font-serif">❖</div>
            <div className="absolute bottom-2 left-2 text-[#B88E28] text-lg font-serif">❖</div>
            <div className="absolute bottom-2 right-2 text-[#B88E28] text-lg font-serif">❖</div>

            {/* Emblem Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-1">
                <ArtisanLinkLogo size={72} />
              </div>

              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#A84A2C] uppercase font-sans">
                {t.hero_stamp_gi} • Geographical Indications Registry
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-serif tracking-tight text-[#0F1E2E]">
                {t.hero_stamp_handmade} Certificate
              </h1>
              <p className="text-[11px] sm:text-xs font-semibold text-stone-600 uppercase tracking-wider font-sans">
                Certificate of 100% Genuine Indian Handmade Origin & GI Heritage
              </p>
            </div>

            {/* Certificate ID Banner */}
            <div className="flex items-center justify-center">
              <div className="px-4 py-1.5 rounded-full bg-[#FAF9F6] border-2 border-[#B88E28] text-xs font-mono font-bold text-[#A84A2C] shadow-inner tracking-wider">
                CERTIFICATE ID: {craft.certificateId}
              </div>
            </div>

            {/* Craft & Artisan Details Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-900/15 text-center sm:text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Craft Title
                </span>
                <p className="text-sm font-bold text-[#0F1E2E] font-serif leading-tight">{craft.title}</p>
                {currentLanguage !== 'en' && (
                  <p className="text-xs font-semibold text-[#A84A2C]">{craft.regionalTitle}</p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Master Artisan
                </span>
                <p className="text-sm font-bold text-[#0F1E2E] font-serif">{craft.artisan.name}</p>
                <p className="text-xs text-stone-600 font-sans">
                  {craft.artisan.village}, {craft.artisan.state}
                </p>
                <p className="text-[10px] text-[#27AE60] font-bold font-sans">
                  ✓ Verified GI Guild Custodian
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Category & Crafting Time
                </span>
                <p className="text-sm font-bold text-[#0F1E2E] font-sans">{craft.category}</p>
                <p className="text-xs text-stone-600 font-sans">
                  {craft.estimatedCraftingDays} {t.bazaar_days_crafting}
                </p>
              </div>
            </div>

            {/* Official GI Tag Registry Attributes */}
            {craft.isGiTagged && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left font-sans">
                <div>
                  <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">GI Registry No.</span>
                  <span className="text-xs font-black text-[#A84A2C]">{craft.giNumber ? `GI #${craft.giNumber}` : 'GI Registered'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">Official Tag Code</span>
                  <span className="text-xs font-mono font-bold text-stone-800 truncate block">{craft.giTagCode || craft.certificateId}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">Year Notified</span>
                  <span className="text-xs font-bold text-stone-800">{craft.giYear || 'Govt. Certified'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider block">District Cluster</span>
                  <span className="text-xs font-bold text-stone-800 truncate block">{craft.districtCluster || craft.stateOfOrigin}</span>
                </div>
                {craft.giGuild && (
                  <div className="col-span-2 sm:col-span-4 pt-1.5 border-t border-amber-500/20 text-[10px] text-stone-700">
                    <strong className="text-[#A84A2C]">Authorized Guild:</strong> {craft.giGuild}
                  </div>
                )}
              </div>
            )}

            {/* Lineage Citation */}
            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-amber-900/15 text-xs text-[#0F1E2E] leading-relaxed text-justify font-serif">
              <strong className="text-[#A84A2C] font-sans uppercase tracking-wider">Lineage Verification:</strong> This certified handmade artifact has been verified under the Geographical Indications of Goods (Registration and Protection) Act, 1999. It strictly uses traditional hereditary techniques ({craft.craftLineage}), natural non-synthetic materials ({craft.materialsDetected.join(', ')}), and directly supports certified master artisans with zero middleman exploitation.
            </div>

            {/* Verification QR Code & Seals */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-amber-900/15">
              
              {/* QR Code */}
              <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs w-full sm:w-auto">
                <div className="w-14 h-14 bg-stone-900 rounded-lg flex items-center justify-center text-white shrink-0 p-1">
                  <QrCode className="w-full h-full" />
                </div>
                <div className="text-left font-sans">
                  <p className="text-[11px] font-bold text-[#0F1E2E]">Scan to Verify Provenance</p>
                  <p className="text-[9px] text-stone-500">Unique Authenticity Record on ArtLynk</p>
                  <p className="text-[9px] font-mono text-[#A84A2C] font-semibold">{craft.certificateId}</p>
                </div>
              </div>

              {/* Royal Seal Stamps */}
              <div className="flex items-center space-x-4 font-sans shrink-0">
                <div className="cert-stamp-badge w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-[#27AE60] p-1 flex flex-col items-center justify-center text-center text-[#27AE60] bg-emerald-50/50">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[7px] sm:text-[8px] font-black uppercase leading-tight mt-0.5">100% SHUDDH HASTSHILP</span>
                </div>

                <div className="cert-stamp-badge w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-[#A84A2C] p-1 flex flex-col items-center justify-center text-center text-[#A84A2C] bg-red-50/50">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[7px] sm:text-[8px] font-black uppercase leading-tight mt-0.5">GI PROTECTED BHARAT</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};


