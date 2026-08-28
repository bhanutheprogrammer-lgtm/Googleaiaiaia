import React, { useEffect, useState, useRef } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  Coins, 
  Check, 
  Share2, 
  QrCode, 
  Volume2, 
  VolumeX, 
  Globe, 
  Languages 
} from 'lucide-react';
import gsap from 'gsap';
import { useArtisan } from '../context/ArtisanContext';
import { CraftItem, LanguageCode } from '../types';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { LanguageModal } from './LanguageModal';

export const CraftStoryDrawer: React.FC = () => {
  const {
    selectedCraftForStory,
    setSelectedCraftForStory,
    setSelectedCraftForCertificate,
    generateWhatsAppLink,
    currentLanguage,
    t
  } = useArtisan();

  const [activeStoryLang, setActiveStoryLang] = useState<'regional' | 'hindi' | 'english'>('regional');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Background Scroll Locking, Lenis Prevention & GSAP animation
  useEffect(() => {
    if (selectedCraftForStory) {
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
              y: 40, 
              opacity: 0, 
              rotationX: 8,
              transformPerspective: 1200 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              rotationX: 0,
              duration: 0.45, 
              ease: 'power3.out' 
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
  }, [selectedCraftForStory]);

  const handleClose = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.85,
        y: 25,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          window.speechSynthesis?.cancel();
          setIsPlayingAudio(false);
          setSelectedCraftForStory(null);
        },
      });
    } else {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
      setSelectedCraftForStory(null);
    }
  };

  // Sync active story text when global currentLanguage changes
  useEffect(() => {
    if (currentLanguage === 'hi') {
      setActiveStoryLang('hindi');
    } else if (currentLanguage === 'en') {
      setActiveStoryLang('english');
    } else {
      setActiveStoryLang('regional');
    }
  }, [currentLanguage]);

  if (!selectedCraftForStory) return null;

  const craft = selectedCraftForStory;
  const whatsAppLink = generateWhatsAppLink(craft, currentLanguage);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Text to speech narration helper
  const handleToggleNarration = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    } else {
      if ('speechSynthesis' in window) {
        const textToRead = activeStoryLang === 'regional'
          ? craft.regionalStory
          : activeStoryLang === 'hindi'
          ? craft.hindiStory
          : craft.heritageStory;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  const regionalMeta = INDIAN_LANGUAGES.find((l) => l.code === craft.regionalLanguage) || INDIAN_LANGUAGES[0];

  return (
    <>
      <div 
        ref={overlayRef}
        id="craft-story-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <div 
          ref={cardRef}
          id="craft-story-modal-card"
          data-lenis-prevent
          onClick={(e) => e.stopPropagation()}
          className="relative w-[92%] sm:w-full max-w-3xl md:max-w-4xl mx-auto max-h-[88vh] overflow-y-auto bg-[#0F1E2E] text-white rounded-3xl border border-amber-500/30 shadow-2xl p-4 sm:p-6 md:p-8 overscroll-contain flex flex-col space-y-5 box-border"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 shrink-0">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-1 rounded-full bg-[#A84A2C] text-white text-[10px] font-bold tracking-wider uppercase font-sans border border-amber-500/30">
                {craft.category}
              </span>
              <span className="text-xs text-amber-200 font-semibold flex items-center gap-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {craft.stateOfOrigin}
              </span>
            </div>

            {/* Header Actions: [ 🌐 Language Icon ] [ 🔗 Share Icon ] [ ✕ Close Icon ] */}
            <div className="flex items-center space-x-2">
              {/* Language Selection Button */}
              <button
                id="drawer-language-btn"
                type="button"
                onClick={() => setIsLanguageModalOpen(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all duration-150 cursor-pointer flex items-center justify-center"
                title="Select Language / भाषा चुनें"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-amber-300" />
              </button>

              {/* Share Button */}
              <button
                id="drawer-share-btn"
                type="button"
                onClick={handleCopyShare}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all duration-150 cursor-pointer flex items-center justify-center"
                title="Share Craft"
                aria-label="Share Craft"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#27AE60]" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                id="drawer-close-btn"
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all duration-150 cursor-pointer flex items-center justify-center"
                title="Close Modal"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Visual & Key Lineage Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* High-Res Photo View */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-stone-900 border border-amber-500/30 shadow-md">
              <img
                src={craft.imageUrl}
                alt={craft.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0F1E2E]/90 text-white text-[10px] font-bold border border-[#B88E28]/60 font-sans">
                  {craft.craftLineage.split('—')[0]}
                </span>

                <button
                  onClick={() => {
                    setSelectedCraftForStory(null);
                    setSelectedCraftForCertificate(craft);
                  }}
                  className="px-3 py-1 rounded-full bg-amber-400 text-[#0F1E2E] text-[10px] font-bold shadow-md flex items-center gap-1 hover:bg-amber-300 transition-colors font-sans cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{t.bazaar_gi_seal}</span>
                </button>
              </div>
            </div>

            {/* Title & Karigar Profile Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-200 font-serif leading-snug">
                  {currentLanguage === 'hi' ? craft.hindiTitle : (currentLanguage === craft.regionalLanguage ? craft.regionalTitle : craft.title)}
                </h2>
                {currentLanguage !== 'en' && (
                  <p className="text-sm font-semibold text-amber-400 mt-1 font-sans">
                    {craft.regionalTitle}
                  </p>
                )}
                {currentLanguage !== 'hi' && currentLanguage !== 'en' && (
                  <p className="text-xs text-stone-300 mt-0.5 font-serif">
                    {craft.hindiTitle}
                  </p>
                )}
              </div>

              {/* Master Karigar Card */}
              <div className="p-4 rounded-2xl bg-[#1A344D]/80 border border-amber-500/25 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-sans">
                    Master Artisan Lineage
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#27AE60]/20 text-emerald-300 text-[10px] font-bold border border-[#27AE60]/40 flex items-center gap-1 font-sans">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> {t.hero_stamp_handmade}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={craft.artisan.photo}
                    alt={craft.artisan.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#B88E28] shadow-xs"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-amber-100 flex items-center gap-1.5 font-serif">
                      {craft.artisan.name}
                      <Award className="w-4 h-4 text-amber-400" />
                    </h3>
                    {currentLanguage !== 'en' && (
                      <p className="text-xs font-semibold text-amber-300 font-sans">
                        {craft.artisan.regionalName}
                      </p>
                    )}
                    <p className="text-[11px] text-stone-300 font-sans">
                      📍 {craft.artisan.village}, {craft.artisan.state} • {craft.artisan.craftsExperienceYears} {t.stories_years_exp}
                    </p>
                  </div>
                </div>

                {craft.artisan.masterTitle && (
                  <p className="text-[11px] text-amber-200 font-medium bg-[#0F1E2E] px-3 py-1.5 rounded-xl border border-amber-500/30 font-sans">
                    🎖️ <strong>{craft.artisan.masterTitle}</strong>
                  </p>
                )}
              </div>

              {/* Crafting Time & Tags */}
              <div className="flex items-center space-x-4 text-xs text-stone-300 font-sans">
                <span className="flex items-center gap-1 font-semibold text-amber-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {craft.estimatedCraftingDays} {t.bazaar_days_crafting}
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400">
                  GI No: {craft.certificateId}
                </span>
              </div>
            </div>

          </div>

          {/* Deep Virasat Katha (Cultural Heritage Story) with Multilingual Switcher */}
          <div className="p-5 rounded-2xl bg-[#1A344D]/80 border border-amber-500/25 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200 font-sans">
                  {t.hero_virasat_katha} (Cultural Heritage Story)
                </h3>
              </div>

              {/* Language toggles */}
              <div className="flex items-center space-x-1 bg-[#0F1E2E] p-1 rounded-xl border border-amber-500/30 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveStoryLang('regional')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
                    activeStoryLang === 'regional'
                      ? 'bg-[#A84A2C] text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {regionalMeta.nativeName}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStoryLang('hindi')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
                    activeStoryLang === 'hindi'
                      ? 'bg-[#A84A2C] text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStoryLang('english')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
                    activeStoryLang === 'english'
                      ? 'bg-[#A84A2C] text-white shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  English
                </button>

                {/* Voice Narration Button */}
                <button
                  type="button"
                  onClick={handleToggleNarration}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isPlayingAudio ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'text-stone-400 hover:bg-white/10 border-transparent'
                  }`}
                  title={t.stories_listen_narration}
                  aria-label={t.stories_listen_narration}
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Story Text Box */}
            <p className="text-sm text-stone-200 leading-relaxed font-serif text-justify bg-[#0F1E2E] p-4 rounded-xl border border-amber-500/20 shadow-2xs">
              {activeStoryLang === 'regional'
                ? craft.regionalStory
                : activeStoryLang === 'hindi'
                ? craft.hindiStory
                : craft.heritageStory}
            </p>

            {/* Materials Detected */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-amber-300/90 uppercase tracking-wider block font-sans">
                {t.hero_heritage_badge} (Materials & Natural Dyes):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {craft.materialsDetected.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-[#0F1E2E] text-stone-200 text-xs font-semibold border border-amber-500/30 shadow-2xs font-sans">
                    🌿 {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Kala-Moolya Fair Price Transparency Chart */}
          <div className="p-5 rounded-2xl bg-[#1A344D] text-white border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider font-sans">
                  {t.hero_fair_price_title}
                </h3>
              </div>
              <span className="text-xl font-extrabold text-amber-300 font-serif">
                ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-stone-300">{t.hero_material_cost}</p>
                <p className="text-sm font-bold text-white">₹{craft.pricingEstimation.baseMaterialCostINR.toLocaleString('en-IN')}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#27AE60]/20 border border-[#27AE60]/40">
                <p className="text-[10px] text-emerald-300 font-semibold">{t.hero_artisan_wage}</p>
                <p className="text-sm font-bold text-emerald-300">₹{craft.pricingEstimation.fairKarigarWageINR.toLocaleString('en-IN')}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-400/20 border border-amber-400/40">
                <p className="text-[10px] text-amber-300 font-semibold">{t.bazaar_fair_price_label}</p>
                <p className="text-sm font-bold text-amber-200">₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <p className="text-xs text-stone-300 italic font-serif">
              💡 {craft.pricingEstimation.pricingRationale}
            </p>
          </div>

          {/* Care Instructions */}
          <div className="p-4 rounded-xl bg-[#1A344D]/60 border border-amber-500/20 text-xs text-stone-300 font-serif">
            <strong className="text-amber-200 font-sans uppercase tracking-wider">Care Instructions:</strong> {craft.careInstructions}
          </div>

          {/* Footer Direct WhatsApp CTA */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div>
              <p className="text-[11px] text-stone-400 font-sans">
                100% Direct From Karigar (Zero Middleman Markup)
              </p>
              <p className="text-base font-extrabold text-amber-300 font-serif">
                ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')} INR
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedCraftForStory(null);
                  setSelectedCraftForCertificate(craft);
                }}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 text-amber-200 text-xs font-bold border border-amber-500/40 hover:bg-white/20 shadow-xs cursor-pointer font-sans uppercase tracking-wider transition-colors"
              >
                {t.bazaar_gi_seal}
              </button>

              <a
                id="drawer-whatsapp-cta-btn"
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#27AE60] hover:bg-[#219653] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer font-sans uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.stories_buy_whatsapp}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Multilingual Selection Dialog for Product Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </>
  );
};

export default CraftStoryDrawer;
