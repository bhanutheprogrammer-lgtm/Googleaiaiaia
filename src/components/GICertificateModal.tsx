import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  Award, 
  QrCode, 
  Sparkles, 
  Check, 
  Copy, 
  Calendar, 
  MapPin, 
  User, 
  Download,
  FileText
} from 'lucide-react';
import gsap from 'gsap';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useArtisan } from '../context/ArtisanContext';
import { useAuth } from '../context/AuthContext';
import { ArtLynkLogo } from './ArtLynkLogo';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

export const GICertificateModal: React.FC = () => {
  const {
    selectedCraftForCertificate,
    setSelectedCraftForCertificate,
    t
  } = useArtisan();

  const {
    userRole,
    currentUser,
    buyerUser,
    artisanUser
  } = useAuth();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStage, setDownloadStage] = useState('');

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
              scale: 0.9, 
              y: 30, 
              opacity: 0, 
              rotateX: 4,
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
            { scale: 0, rotate: -20, opacity: 0 },
            { 
              scale: 1, 
              rotate: 0, 
              opacity: 1, 
              duration: 0.5, 
              stagger: 0.08, 
              delay: 0.2, 
              ease: 'back.out(1.7)' 
            }
          );
        });

        return () => ctx.revert();
      }
    } else {
      unlockScroll();
      setCopiedLink(false);
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

  // Generate Unique Verifiable Certificate ID per Craft & Patron
  const craftCode = (craft.giTagCode || craft.certificateId || craft.id)
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(-6)
    .toUpperCase();
  const buyerIdCode = (buyerUser?.id || 'PTRN')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(-4)
    .toUpperCase();
  const timestampCode = new Date().getFullYear().toString() + String(new Date().getMonth() + 1).padStart(2, '0');
  
  const dynamicCertId = `CERT-GI-IND-${craftCode}-${buyerIdCode}-${timestampCode}`;

  // Formatted Issuance Date & Timestamp
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
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
        scale: 0.9,
        y: 20,
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

  /**
   * High-Resolution PDF Generator & Downloader
   */
  const handleDownloadPDF = async () => {
    if (isDownloading || !printRef.current) return;

    try {
      setIsDownloading(true);
      setDownloadProgress(15);
      setDownloadStage('Preparing parchment & high-res vector seals...');

      await new Promise((resolve) => setTimeout(resolve, 200));
      setDownloadProgress(45);
      setDownloadStage('Rasterizing GI typography and security watermarks...');

      const certificateElement = printRef.current;

      // Render crisp image at 2x pixel ratio for print-ready resolution using native SVG foreignObject
      // skipFonts: true and fontEmbedCSS: '' prevent SecurityError on cross-origin CDN stylesheets (Google Fonts)
      const imgData = await toPng(certificateElement, {
        pixelRatio: 2,
        backgroundColor: '#FCF9F2',
        skipFonts: true,
        fontEmbedCSS: '',
        cacheBust: true,
      });

      setDownloadProgress(75);
      setDownloadStage('Formatting high-resolution A4 document...');

      // Load image to compute exact aspect ratio
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
      });

      const imgWidth = img.naturalWidth || certificateElement.scrollWidth || 800;
      const imgHeight = img.naturalHeight || certificateElement.scrollHeight || 1100;
      const imgRatio = imgWidth / imgHeight;

      // Create jsPDF instance (Standard A4 Portrait: 210mm x 297mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

      const margin = 8; // 8mm margin
      const maxPrintWidth = pageWidth - (margin * 2);
      const maxPrintHeight = pageHeight - (margin * 2);

      let printWidth = maxPrintWidth;
      let printHeight = printWidth / imgRatio;

      if (printHeight > maxPrintHeight) {
        printHeight = maxPrintHeight;
        printWidth = printHeight * imgRatio;
      }

      const xOffset = margin + (maxPrintWidth - printWidth) / 2;
      const yOffset = margin + (maxPrintHeight - printHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, printWidth, printHeight, undefined, 'FAST');

      setDownloadProgress(95);
      setDownloadStage('Saving PDF to your device...');

      const cleanCraftName = (craft.title || 'GI-Craft')
        .replace(/[^a-zA-Z0-9]/g, '_')
        .slice(0, 30);

      const fileName = `ArtLynk_GI_Certificate_${craftCode}_${cleanCraftName}.pdf`;
      pdf.save(fileName);

      setDownloadProgress(100);
      setDownloadStage('Certificate Downloaded Successfully! 🎉');

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
        setDownloadStage('');
      }, 700);

    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback: trigger system print if browser canvas capture encountered an issue
      window.print();
      setIsDownloading(false);
      setDownloadProgress(0);
      setDownloadStage('');
    }
  };

  const handleCopyVerificationLink = () => {
    const url = `https://artlynk.in/verify/${dynamicCertId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!selectedCraftForCertificate || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      id="gi-certificate-modal-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain"
      style={{ overscrollBehavior: 'contain' }}
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
        style={{
          overscrollBehavior: 'contain',
          scrollbarWidth: 'thin',
          scrollbarColor: '#D4AF37 transparent',
          WebkitOverflowScrolling: 'touch'
        }}
        className="relative w-full max-w-3xl mx-auto max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl p-3.5 sm:p-6 md:p-7 overscroll-contain bg-[#0F1E2E] text-white border border-amber-500/30 flex flex-col space-y-4 box-border touch-pan-y"
      >
        {/* ========================================================= */}
        {/* Top Control Bar (Clean, Responsive, No Overflow)           */}
        {/* ========================================================= */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/15 pb-3 shrink-0">
          
          {/* Header Title & Seal badge */}
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-sans min-w-0">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{t.bazaar_gi_seal || '100% Authentic Handmade'} • Official GI Certificate</span>
          </div>

          {/* Action Controls Group: Copy Link, Download PDF, Close */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 shrink-0">
            
            {/* Quick Copy Verification Link */}
            <button
              id="copy-cert-verification-btn"
              type="button"
              onClick={handleCopyVerificationLink}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer font-sans shrink-0"
              title="Copy verification link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Functional Print / Download PDF Button */}
            <button
              id="download-certificate-pdf-btn"
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-75 text-stone-950 text-xs font-bold shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer font-sans uppercase tracking-wider disabled:cursor-wait shrink-0"
              title="Download high-resolution official PDF certificate"
            >
              {isDownloading ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin shrink-0 text-stone-900" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 shrink-0 text-stone-950" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Quick Native Print Icon Button */}
            <button
              id="print-certificate-quick-btn"
              type="button"
              onClick={() => window.print()}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer border border-white/20 shrink-0"
              title="Print directly to connected printer"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              id="close-gi-certificate-btn"
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/20 shrink-0 ml-auto sm:ml-0"
              title="Close Certificate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Interactive PDF Generation Animation Modal Overlay         */}
        {/* ========================================================= */}
        {isDownloading && (
          <div 
            id="certificate-printing-overlay"
            className="no-print absolute inset-0 z-50 rounded-3xl bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center transition-all animate-in fade-in duration-200"
          >
            <div className="relative p-6 rounded-2xl bg-stone-900/95 border border-amber-500/50 shadow-2xl max-w-sm w-full space-y-4 text-center">
              {/* Animated Seal Icon */}
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                <Download className="w-8 h-8 animate-bounce text-amber-400" />
                <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1.5 -right-1.5 animate-spin" />
                <ShieldCheck className="w-4 h-4 text-emerald-400 absolute -bottom-1 -left-1" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-sans">
                  <Award className="w-3.5 h-3.5" />
                  <span>ArtLynk GI Authenticity Engine</span>
                </div>
                <h3 className="text-base font-bold font-serif text-white tracking-tight">
                  Exporting Official Certificate
                </h3>
                <p className="text-xs text-amber-200/90 font-medium font-sans min-h-[1.25rem] flex items-center justify-center transition-all">
                  {downloadStage}
                </p>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full h-2.5 rounded-full bg-stone-800 border border-white/10 overflow-hidden p-0.5 shadow-inner">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-150 ease-out shadow-xs"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-stone-400" />
                    <span>A4 PDF Resolution</span>
                  </span>
                  <span className="font-bold text-amber-400 text-xs">{downloadProgress}%</span>
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
          className="space-y-4 text-[#0F1E2E] relative bg-[#FCF9F2] p-3 sm:p-5 md:p-6 rounded-2xl border-2 border-[#B88E28] shadow-md box-border"
        >
          {/* Ornate Indian Double Border Frame */}
          <div className="border-2 border-[#A84A2C]/60 p-4 sm:p-6 md:p-7 rounded-xl relative bg-white/90 shadow-xs space-y-4 sm:space-y-5 overflow-hidden box-border">
            
            {/* Authentic Heritage Seal Watermark (Background Vector - pointer events none) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden select-none z-0">
              <ArtLynkLogo size={320} color="terracotta" className="transform rotate-[-6deg] scale-110" />
            </div>

            {/* Corner Ornate Diamond Emblems (Neatly positioned outside text flow) */}
            <div className="absolute top-2 left-2.5 text-[#B88E28] text-sm sm:text-base font-serif select-none pointer-events-none opacity-40">❖</div>
            <div className="absolute top-2 right-2.5 text-[#B88E28] text-sm sm:text-base font-serif select-none pointer-events-none opacity-40">❖</div>
            <div className="absolute bottom-2 left-2.5 text-[#B88E28] text-sm sm:text-base font-serif select-none pointer-events-none opacity-40">❖</div>
            <div className="absolute bottom-2 right-2.5 text-[#B88E28] text-sm sm:text-base font-serif select-none pointer-events-none opacity-40">❖</div>

            {/* Emblem & Official Header */}
            <div className="text-center space-y-2 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-amber-600/30 p-1.5 flex items-center justify-center shadow-xs">
                  <ArtLynkLogo size={46} glow className="shrink-0" />
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] text-[#A84A2C] uppercase font-sans">
                {t.hero_stamp_gi || 'Geographical Indications of Goods Act, 1999'} • Official Registry
              </p>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-serif tracking-tight text-[#0F1E2E] leading-snug">
                {t.hero_stamp_handmade || '100% Authentic Handmade'} Certificate
              </h1>
              
              <p className="text-[11px] sm:text-xs font-semibold text-stone-600 uppercase tracking-widest font-sans">
                Certificate of Genuine Indian GI Provenance & Artisan Lineage
              </p>
            </div>

            {/* Certificate ID & Issue Date Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#FAF6EE] border border-[#B88E28]/40 shadow-xs relative z-10">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#A84A2C] tracking-wide break-all">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CERTIFICATE ID: <span className="font-extrabold text-[#0F1E2E]">{dynamicCertId}</span></span>
              </div>
              <div className="text-[11px] font-sans text-stone-600 flex items-center gap-1.5 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-[#B88E28]" />
                <span>Issued: <strong className="text-stone-800">{formattedDate}</strong></span>
              </div>
            </div>

            {/* Dynamic Craft & Master Artisan Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-amber-900/15 text-left relative z-10">
              {/* Craft Info */}
              <div className="space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Craft Title & Category
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0F1E2E] font-serif leading-snug break-words">
                  {craft.title}
                </p>
                {craft.regionalTitle && (
                  <p className="text-xs font-semibold text-[#A84A2C] font-sans leading-normal break-words">
                    {craft.regionalTitle}
                  </p>
                )}
                <p className="text-[11px] text-stone-600 font-medium font-sans">
                  Category: <strong className="text-stone-800">{craft.category}</strong>
                </p>
              </div>

              {/* Master Artisan Info */}
              <div className="space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Master Karigar & Lineage
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0F1E2E] font-serif break-words">
                  {craft.artisan.name}
                </p>
                <p className="text-xs text-stone-600 font-sans flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A84A2C] shrink-0" />
                  <span className="break-words">{craft.artisan.village}, {craft.artisan.state}</span>
                </p>
                <p className="text-[10px] text-emerald-700 font-bold font-sans">
                  ✓ Verified Heritage Master ({craft.craftLineage || 'Traditional Lineage'})
                </p>
              </div>

              {/* Crafting Duration & Pure Materials */}
              <div className="space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 block font-sans">
                  Crafting Time & Purity
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#0F1E2E] font-sans">
                  {craft.estimatedCraftingDays} Days of Dedicated Handwork
                </p>
                <div className="text-[10px] text-stone-600 font-sans leading-relaxed">
                  <span className="font-semibold text-[#A84A2C]">Materials:</span>{' '}
                  <span className="break-words">{craft.materialsDetected?.join(', ') || 'Natural organic fibers & mineral pigments'}</span>
                </div>
              </div>
            </div>

            {/* Official GI Tag Registry Attributes */}
            {craft.isGiTagged && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left font-sans relative z-10">
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block mb-0.5">GI Registry No.</span>
                  <span className="text-xs font-black text-[#A84A2C] break-words">{craft.giNumber ? `GI #${craft.giNumber}` : 'GI Registered'}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block mb-0.5">Official Tag Code</span>
                  <span className="text-xs font-mono font-bold text-stone-800 break-all">{craft.giTagCode || craft.certificateId}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block mb-0.5">Year Notified</span>
                  <span className="text-xs font-bold text-stone-800">{craft.giYear || 'Govt. Certified'}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block mb-0.5">District Cluster</span>
                  <span className="text-xs font-bold text-stone-800 break-words">{craft.districtCluster || craft.stateOfOrigin}</span>
                </div>
                {craft.giGuild && (
                  <div className="col-span-2 sm:col-span-4 pt-1.5 border-t border-amber-500/20 text-[10px] text-stone-700">
                    <strong className="text-[#A84A2C]">Authorized Guild:</strong> {craft.giGuild}
                  </div>
                )}
              </div>
            )}

            {/* Certified Buyer & Patron Provenance Section */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-300 text-left space-y-2.5 font-sans relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-stone-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#A84A2C]" />
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
            <div className="bg-[#FAF9F6] p-3 rounded-xl border border-amber-900/15 text-[11px] text-[#0F1E2E] leading-relaxed text-justify font-serif relative z-10">
              <strong className="text-[#A84A2C] font-sans uppercase tracking-wider">Provenance Guarantee:</strong> This artifact has been verified under the Geographical Indications of Goods (Registration and Protection) Act, 1999. Crafted strictly with hereditary artisan techniques and natural raw materials ({craft.materialsDetected?.join(', ')}), ensuring 100% authentic cultural preservation and fair karigar wage empowerment.
            </div>

            {/* Verification QR Code, Signatures & Royal Seals */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3.5 border-t border-amber-900/20 relative z-10">
              
              {/* Scannable Verification QR Code */}
              <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs w-full md:w-auto shrink-0">
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-stone-950 rounded-lg flex items-center justify-center text-amber-400 shrink-0 p-1">
                  <QrCode className="w-full h-full" />
                </div>
                <div className="text-left font-sans">
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#0F1E2E]">Scan to Verify Authenticity</p>
                  <p className="text-[9px] text-stone-500">Immutable Record on ArtLynk Vault</p>
                  <p className="text-[8px] font-mono text-[#A84A2C] font-bold break-all max-w-[150px]">
                    {dynamicCertId}
                  </p>
                </div>
              </div>

              {/* Dual Signatures & Registry Seal Stamps */}
              <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 w-full md:w-auto font-sans">
                
                {/* Master Artisan Signature */}
                <div className="text-center shrink-0">
                  <div className="h-7 flex items-end justify-center">
                    <span className="font-serif italic text-sm sm:text-base font-bold text-[#A84A2C] tracking-wide border-b border-stone-400 px-2 pb-0.5">
                      {craft.artisan.name}
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold text-stone-500 uppercase tracking-wider block mt-1">
                    Master Karigar Seal
                  </span>
                </div>

                {/* Royal Seal Stamp Badges (Properly sized with clear text) */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="cert-stamp-badge w-14 h-14 sm:w-15 sm:h-15 rounded-full border-2 border-dashed border-[#27AE60] p-1 flex flex-col items-center justify-center text-center text-[#27AE60] bg-emerald-50/80 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 mb-0.5" />
                    <span className="text-[7px] font-black uppercase leading-tight">
                      SHUDDH
                    </span>
                    <span className="text-[6px] font-extrabold uppercase leading-none">
                      HASTSHILP
                    </span>
                  </div>

                  <div className="cert-stamp-badge w-14 h-14 sm:w-15 sm:h-15 rounded-full border-2 border-dashed border-[#E06B26] p-1 flex flex-col items-center justify-center text-center text-[#E06B26] bg-orange-50/80 shadow-2xs">
                    <ArtLynkLogo size={16} color="terracotta" className="shrink-0 mb-0.5" />
                    <span className="text-[7px] font-black uppercase leading-tight">
                      ARTLYNK
                    </span>
                    <span className="text-[6px] font-extrabold uppercase leading-none">
                      VERIFIED
                    </span>
                  </div>

                  <div className="cert-stamp-badge w-14 h-14 sm:w-15 sm:h-15 rounded-full border-2 border-dashed border-[#A84A2C] p-1 flex flex-col items-center justify-center text-center text-[#A84A2C] bg-red-50/80 shadow-2xs">
                    <Award className="w-3.5 h-3.5 shrink-0 mb-0.5" />
                    <span className="text-[7px] font-black uppercase leading-tight">
                      GI BHARAT
                    </span>
                    <span className="text-[6px] font-extrabold uppercase leading-none">
                      PROTECTED
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

