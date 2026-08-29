import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  Award, 
  QrCode, 
  Share2, 
  Sparkles, 
  Check, 
  Copy, 
  Calendar, 
  MapPin, 
  User, 
  Download,
  BookmarkCheck,
  Flame,
  CheckCircle2,
  FileText
} from 'lucide-react';
import gsap from 'gsap';
import { useArtisan } from '../context/ArtisanContext';
import { useAuth } from '../context/AuthContext';
import { ArtLynkLogo } from './ArtLynkLogo';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

export const GICertificateModal: React.FC = () => {
  const {
    selectedCraftForCertificate,
    setSelectedCraftForCertificate,
    currentLanguage,
    t
  } = useArtisan();

  const {
    userRole,
    currentUser,
    buyerUser,
    artisanUser,
    purchasedCertificates,
    acquireCraftCertificate
  } = useAuth();

  const [copiedLink, setCopiedLink] = useState(false);
  const [justAcquired, setJustAcquired] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const [printStage, setPrintStage] = useState('');

  const printRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Background Scroll Locking & GSAP Animation
  useEffect(() => {
    if (selectedCraftForCertificate) {
      lockScroll();

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
              scale: 0.85, 
              y: 40, 
              opacity: 0, 
              rotateX: 6,
              transformPerspective: 1200 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              rotateX: 0, 
              duration: 0.45, 
              ease: 'power3.out' 
            }
          );

          // Stagger seal and stamps
          gsap.fromTo(
            '.cert-stamp-badge',
            { scale: 0, rotate: -25, opacity: 0 },
            { 
              scale: 1, 
              rotate: 0, 
              opacity: 1, 
              duration: 0.5, 
              stagger: 0.08, 
              delay: 0.2, 
              ease: 'elastic.out(1, 0.6)' 
            }
          );
        });

        return () => ctx.revert();
      }
    } else {
      unlockScroll();
      setCopiedLink(false);
      setJustAcquired(false);
    }

    return () => {
      unlockScroll();
    };
  }, [selectedCraftForCertificate]);

  if (!selectedCraftForCertificate) return null;

  const craft = selectedCraftForCertificate;

  // Resolve dynamic buyer / patron information
  const isBuyerRole = userRole === 'buyer';
  const isArtisanRole = userRole === 'artisan';
  
  const buyerName = isBuyerRole && buyerUser?.name 
    ? buyerUser.name 
    : isArtisanRole && artisanUser?.name 
    ? `${artisanUser.name} (Guild Custodian)`
    : currentUser?.name || 'Ananya Sharma';

  const patronLevel = isBuyerRole && buyerUser?.patronLevel
    ? buyerUser.patronLevel
    : 'Guardian of Indian Handloom & Heritage — Tier 1';

  const patronLocation = isBuyerRole && (buyerUser?.location || buyerUser?.deliveryState)
    ? (buyerUser.deliveryCity ? `${buyerUser.deliveryCity}, ${buyerUser.deliveryState}` : buyerUser.location)
    : `${craft.stateOfOrigin} Guild Connoisseur, India`;

  // Find if already acquired in buyer vault
  const existingCertificate = purchasedCertificates?.find(c => c.craftId === craft.id);
  const isAlreadyAcquired = !!existingCertificate || justAcquired;

  // Generate Unique Verifiable Certificate ID per Purchase / User
  const craftCode = (craft.giTagCode || craft.certificateId || craft.id)
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(-6)
    .toUpperCase();
  const buyerIdCode = (buyerUser?.id || 'PTRN')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(-4)
    .toUpperCase();
  const timestampCode = new Date().getFullYear().toString() + String(new Date().getMonth() + 1).padStart(2, '0');
  
  const dynamicCertId = existingCertificate?.certificateId || `CERT-GI-IND-${craftCode}-${buyerIdCode}-${timestampCode}`;

  // Formatted Issuance Date & Timestamp
  const formattedDate = existingCertificate?.issueDate 
    ? `${existingCertificate.issueDate} • 11:30 AM IST`
    : new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }).format(new Date());

  const handleClose = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.85,
        y: 25,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setSelectedCraftForCertificate(null),
      });
    } else {
      setSelectedCraftForCertificate(null);
    }
  };

  const handlePrintCertificate = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setPrintProgress(12);
    setPrintStage('Rendering Royal Parchment & Vector Seals...');

    const startTime = Date.now();
    const duration = 1350; // 1.35s smooth perceived generation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setPrintProgress(progress);

      if (progress < 45) {
        setPrintStage('Rendering Royal Parchment & Vector Seals...');
      } else if (progress < 85) {
        setPrintStage('Verifying GI Provenance & Digital Watermarks...');
      } else {
        setPrintStage('Preparing High-Resolution A4 Document...');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.print();
          setTimeout(() => {
            setIsPrinting(false);
            setPrintProgress(0);
            setPrintStage('');
          }, 800);
        }, 220);
      }
    }, 30);
  };

  const handleCopyVerificationLink = () => {
    const url = `https://artlynk.in/verify/${dynamicCertId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAcquireCertificate = () => {
    acquireCraftCertificate(craft);
    setJustAcquired(true);
  };

  if (!selectedCraftForCertificate || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      id="gi-certificate-modal-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={cardRef}
        id="gi-certificate-card"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[96%] sm:w-full max-w-3xl mx-auto max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl p-3 sm:p-6 md:p-7 overscroll-contain bg-[#0F1E2E] text-white border border-amber-500/30 flex flex-col space-y-4 box-border touch-pan-y"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D4AF37 transparent',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* ========================================================= */}
        {/* Top Control Bar (Hidden in Print)                         */}
        {/* ========================================================= */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3.5 shrink-0">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-sans">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{t.bazaar_gi_seal || '100% Authentic Handmade'} • Official GI Certificate</span>
          </div>

          <div className="flex items-center flex-wrap gap-2 shrink-0">
            {/* Quick Copy Verification Link */}
            <button
              id="copy-cert-verification-btn"
              onClick={handleCopyVerificationLink}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer font-sans"
              title="Copy verification link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-300" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Acquire & Save to Vault if not yet acquired */}
            {!isAlreadyAcquired && (
              <button
                id="acquire-cert-to-vault-btn"
                onClick={handleAcquireCertificate}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer font-sans"
                title="Save certificate to your Vault"
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Save to Vault</span>
              </button>
            )}

            {/* Print / PDF Button */}
            <button
              id="print-certificate-btn"
              onClick={handlePrintCertificate}
              disabled={isPrinting}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/70 text-stone-950 text-xs font-bold shadow-md hover:shadow-amber-500/20 hover:scale-102 transition-all cursor-pointer font-sans uppercase tracking-wider disabled:cursor-wait"
              title="Print or export high-resolution PDF certificate"
            >
              <Printer className={`w-3.5 h-3.5 ${isPrinting ? 'animate-bounce' : ''}`} />
              <span>{isPrinting ? 'Preparing...' : 'Print / PDF'}</span>
            </button>

            {/* Close Button */}
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

        {/* ========================================================= */}
        {/* Perceived Printing / Generation Animation Overlay          */}
        {/* ========================================================= */}
        {isPrinting && (
          <div 
            id="certificate-printing-overlay"
            className="no-print absolute inset-0 z-50 rounded-3xl bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center transition-all animate-in fade-in duration-200"
          >
            <div className="relative p-6 rounded-2xl bg-stone-900/95 border border-amber-500/50 shadow-2xl max-w-sm w-full space-y-4 text-center">
              {/* Animated Seal Icon */}
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                <Printer className="w-8 h-8 animate-pulse text-amber-400" />
                <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1.5 -right-1.5 animate-spin" />
                <ShieldCheck className="w-4 h-4 text-emerald-400 absolute -bottom-1 -left-1" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-sans">
                  <Award className="w-3.5 h-3.5" />
                  <span>Authenticity Engine</span>
                </div>
                <h3 className="text-base font-bold font-serif text-white tracking-tight">
                  Generating GI Certificate
                </h3>
                <p className="text-xs text-amber-200/90 font-medium font-sans h-5 flex items-center justify-center transition-all">
                  {printStage}
                </p>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full h-2.5 rounded-full bg-stone-800 border border-white/10 overflow-hidden p-0.5 shadow-inner">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-100 ease-out shadow-xs"
                    style={{ width: `${printProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-stone-400" />
                    <span>A4 Document Ready</span>
                  </span>
                  <span className="font-bold text-amber-400 text-xs">{printProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* Printable Royal Parchment Certificate Body (A4 Ready)     */}
        {/* ========================================================= */}
        <div 
          ref={printRef}
          id="certificate-parchment-container"
          className="space-y-4 text-[#0F1E2E] relative bg-[#FCF9F2] p-3 sm:p-5 md:p-6 rounded-2xl border-2 border-[#B88E28] shadow-md"
        >
          {/* Ornate Indian Double Border Frame */}
          <div className="border-2 border-[#A84A2C]/60 p-4 sm:p-6 md:p-7 rounded-xl relative bg-white/85 shadow-xs space-y-4 sm:space-y-5 overflow-hidden">
            
            {/* Authentic Heritage Seal Watermark (Background Vector) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] overflow-hidden select-none">
              <ArtLynkLogo size={340} color="terracotta" className="transform rotate-[-8deg] scale-110" />
            </div>

            {/* Corner Ornate Diamond Emblems */}
            <div className="absolute top-2 left-2 text-[#B88E28] text-base sm:text-lg font-serif select-none">❖</div>
            <div className="absolute top-2 right-2 text-[#B88E28] text-base sm:text-lg font-serif select-none">❖</div>
            <div className="absolute bottom-2 left-2 text-[#B88E28] text-base sm:text-lg font-serif select-none">❖</div>
            <div className="absolute bottom-2 right-2 text-[#B88E28] text-base sm:text-lg font-serif select-none">❖</div>

            {/* Emblem & Official Header */}
            <div className="text-center space-y-1.5 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-amber-600/30 p-1.5 flex items-center justify-center shadow-xs">
                  <ArtLynkLogo size={46} glow className="shrink-0" />
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] text-[#A84A2C] uppercase font-sans">
                {t.hero_stamp_gi || 'Geographical Indications of Goods Act, 1999'} • Official Registry
              </p>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-serif tracking-tight text-[#0F1E2E] leading-tight">
                {t.hero_stamp_handmade || '100% Authentic Handmade'} Certificate
              </h1>
              
              <p className="text-[11px] sm:text-xs font-semibold text-stone-600 uppercase tracking-widest font-sans">
                Certificate of Genuine Indian GI Provenance & Artisan Lineage
              </p>
            </div>

            {/* Certificate ID & Issue Date Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3.5 py-1.5 rounded-xl bg-[#FCF9F2] border border-[#B88E28]/50 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#A84A2C] tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>CERTIFICATE ID: <span className="font-extrabold text-[#0F1E2E]">{dynamicCertId}</span></span>
              </div>
              <div className="text-[11px] font-sans text-stone-600 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#B88E28]" />
                <span>Issued: <strong className="text-stone-800">{formattedDate}</strong></span>
              </div>
            </div>

            {/* Dynamic Craft & Master Artisan Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-amber-900/15 text-left">
              {/* Craft Info */}
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Craft Title & Category
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0F1E2E] font-serif leading-tight">{craft.title}</p>
                {craft.regionalTitle && (
                  <p className="text-xs font-semibold text-[#A84A2C] font-sans">{craft.regionalTitle}</p>
                )}
                <p className="text-[11px] text-stone-600 font-medium font-sans">
                  Category: <strong className="text-stone-800">{craft.category}</strong>
                </p>
              </div>

              {/* Master Artisan Info */}
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Master Karigar & Lineage
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0F1E2E] font-serif">{craft.artisan.name}</p>
                <p className="text-xs text-stone-600 font-sans flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#A84A2C] shrink-0" />
                  <span>{craft.artisan.village}, {craft.artisan.state}</span>
                </p>
                <p className="text-[10px] text-emerald-700 font-bold font-sans">
                  ✓ Verified Heritage Master ({craft.craftLineage || 'Traditional Lineage'})
                </p>
              </div>

              {/* Crafting Duration & Pure Materials */}
              <div className="space-y-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Crafting Time & Purity
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#0F1E2E] font-sans">
                  {craft.estimatedCraftingDays} Days of Handcrafted Work
                </p>
                <div className="text-[10px] text-stone-600 font-sans">
                  <span className="font-semibold text-[#A84A2C]">Materials:</span>{' '}
                  {craft.materialsDetected?.join(', ') || 'Natural organic fibers & mineral pigments'}
                </div>
              </div>
            </div>

            {/* Official GI Tag Registry Attributes */}
            {craft.isGiTagged && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left font-sans">
                <div>
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block">GI Registry No.</span>
                  <span className="text-xs font-black text-[#A84A2C]">{craft.giNumber ? `GI #${craft.giNumber}` : 'GI Registered'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block">Official Tag Code</span>
                  <span className="text-xs font-mono font-bold text-stone-800 truncate block">{craft.giTagCode || craft.certificateId}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block">Year Notified</span>
                  <span className="text-xs font-bold text-stone-800">{craft.giYear || 'Govt. Certified'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block">District Cluster</span>
                  <span className="text-xs font-bold text-stone-800 truncate block">{craft.districtCluster || craft.stateOfOrigin}</span>
                </div>
                {craft.giGuild && (
                  <div className="col-span-2 sm:col-span-4 pt-1 border-t border-amber-500/20 text-[10px] text-stone-700">
                    <strong className="text-[#A84A2C]">Authorized Guild:</strong> {craft.giGuild}
                  </div>
                )}
              </div>
            )}

            {/* Personalized Certified Buyer & Patron Provenance Section */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 border border-stone-300 text-left space-y-2 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-200 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#A84A2C]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Certified Patron & Beneficiary
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300 self-start sm:self-auto">
                  ✓ Verified Direct Trade (Zero Middleman Commission)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-[11px] text-stone-500 font-medium">Issued to Art Patron:</p>
                  <p className="font-bold text-[#0F1E2E] text-sm font-serif">{buyerName}</p>
                  <p className="text-[10px] text-stone-500">{patronLocation}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[11px] text-stone-500 font-medium">Patron Status & Direct Contribution:</p>
                  <p className="font-semibold text-[#A84A2C] text-xs">{patronLevel}</p>
                  <p className="text-[10px] font-bold text-emerald-700">
                    ₹{craft.pricingEstimation.fairKarigarWageINR.toLocaleString('en-IN')} Direct Wage Disbursed to Karigar
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Lineage Verification Citation */}
            <div className="bg-[#FAF9F6] p-2.5 sm:p-3 rounded-xl border border-amber-900/15 text-[11px] text-[#0F1E2E] leading-relaxed text-justify font-serif">
              <strong className="text-[#A84A2C] font-sans uppercase tracking-wider">Provenance Guarantee:</strong> This artifact has been verified under the Geographical Indications of Goods (Registration and Protection) Act, 1999. Crafted strictly with hereditary artisan techniques and natural raw materials ({craft.materialsDetected?.join(', ')}), ensuring 100% authentic cultural preservation and fair karigar wage empowerment.
            </div>

            {/* Verification QR Code, Signatures & Royal Seals */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-amber-900/20">
              
              {/* Scannable Verification QR Code */}
              <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs w-full sm:w-auto shrink-0">
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-stone-950 rounded-lg flex items-center justify-center text-amber-400 shrink-0 p-1">
                  <QrCode className="w-full h-full" />
                </div>
                <div className="text-left font-sans">
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#0F1E2E]">Scan to Verify Authenticity</p>
                  <p className="text-[9px] text-stone-500">Immutable Record on ArtLynk Vault</p>
                  <p className="text-[8px] font-mono text-[#A84A2C] font-bold truncate max-w-[140px] sm:max-w-[160px]">
                    {dynamicCertId}
                  </p>
                </div>
              </div>

              {/* Dual Signatures & Registry Seal */}
              <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto font-sans">
                {/* Master Artisan Signature */}
                <div className="text-center">
                  <div className="h-7 flex items-end justify-center">
                    <span className="font-serif italic text-sm sm:text-base font-bold text-[#A84A2C] tracking-wide border-b border-stone-400 px-2 pb-0.5">
                      {craft.artisan.name}
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold text-stone-500 uppercase tracking-wider block mt-1">
                    Master Karigar Seal
                  </span>
                </div>

                {/* Royal Seal Stamp Badges */}
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="cert-stamp-badge w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#27AE60] p-1 flex flex-col items-center justify-center text-center text-[#27AE60] bg-emerald-50/70 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[6.5px] sm:text-[7.5px] font-black uppercase leading-tight mt-0.5">
                      100% SHUDDH HASTSHILP
                    </span>
                  </div>

                  <div className="cert-stamp-badge w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#E06B26] p-1 flex flex-col items-center justify-center text-center text-[#E06B26] bg-orange-50/80 shadow-2xs">
                    <ArtLynkLogo size={18} color="terracotta" />
                    <span className="text-[6.5px] sm:text-[7.5px] font-black uppercase leading-tight mt-0.5">
                      ARTLYNK SEAL
                    </span>
                  </div>

                  <div className="cert-stamp-badge w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#A84A2C] p-1 flex flex-col items-center justify-center text-center text-[#A84A2C] bg-red-50/70 shadow-2xs">
                    <Award className="w-4 h-4" />
                    <span className="text-[6.5px] sm:text-[7.5px] font-black uppercase leading-tight mt-0.5">
                      GI PROTECTED BHARAT
                    </span>
                  </div>
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
export default GICertificateModal;
