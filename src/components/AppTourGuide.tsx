import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Compass
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { useAuth } from '../context/AuthContext';
import { getTourLocale } from '../locales/tourTranslations';
import { speakTourText, stopSpeech } from '../utils/speechVoiceHelper';

interface AppTourGuideProps {
  isActive: boolean;
  onComplete: () => void;
}

export const AppTourGuide: React.FC<AppTourGuideProps> = ({ isActive, onComplete }) => {
  const { 
    currentLanguage, 
    setActiveTab, 
    setSelectedCraftForStory, 
    setSelectedCraftForCertificate,
    closeTour,
    setActiveRole
  } = useArtisan();

  const { 
    setRoleDirectly, 
    setIsAuthModalOpen,
    closeAuthModal,
    setIsPitaraDrawerOpen,
    setIsStoreQRModalOpen,
    closeAccountSettings
  } = useAuth();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const tourLocale = getTourLocale(currentLanguage);
  const totalSteps = tourLocale.steps.length;
  const currentStep = tourLocale.steps[currentStepIndex] || tourLocale.steps[0];

  // Execute Step View & Tab Switching Actions (Zero automatic auth modal triggers)
  const applyStepAction = useCallback((stepIdx: number) => {
    const step = tourLocale.steps[stepIdx];
    if (!step) return;

    if (step.targetRole) {
      setRoleDirectly(step.targetRole);
      if (step.targetRole === 'artisan') {
        setActiveRole('artisan');
      } else {
        setActiveRole('buyer');
      }
    }

    if (step.targetTab) {
      setActiveTab(step.targetTab);
    }

    // Always ensure auth modal stays closed during the tour
    closeAuthModal();
  }, [tourLocale.steps, setRoleDirectly, setActiveRole, setActiveTab, closeAuthModal]);

  // Robust Target Element Spotlight Rect Calculation
  const updateSpotlight = useCallback(() => {
    if (!isActive) return;

    const step = tourLocale.steps[currentStepIndex];
    if (!step) return;

    let targetEl: HTMLElement | null = null;
    if (step.highlightSelector) {
      try {
        targetEl = document.querySelector(step.highlightSelector) as HTMLElement;
      } catch {
        targetEl = null;
      }
    }

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setTargetRect(rect);
      
      // Smoothly scroll target into view if outside the visible viewport
      if (rect.top < 70 || rect.bottom > window.innerHeight - 120) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setTargetRect(null);
    }
  }, [isActive, currentStepIndex, tourLocale.steps]);

  // Step Voice Narration
  const speakCurrentStep = useCallback((stepIdx: number) => {
    const step = tourLocale.steps[stepIdx];
    if (!step) return;

    stopSpeech();
    setIsSpeaking(true);

    const fullNarration = `${step.title}. ${step.voiceNarration || step.description}`;
    speakTourText(
      fullNarration,
      currentLanguage,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  }, [tourLocale.steps, currentLanguage]);

  // Airtight Tutorial Completion & Teardown Function
  const handleFinishTour = useCallback(() => {
    // 1. Cancel speech synthesis immediately
    stopSpeech();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }

    // 2. Explicitly close all modals and overlays
    setIsAuthModalOpen(false);
    closeAuthModal();
    setSelectedCraftForStory(null);
    setSelectedCraftForCertificate(null);
    setIsPitaraDrawerOpen(false);
    setIsStoreQRModalOpen(false);
    closeAccountSettings();

    // 3. Deactivate and unmount the tour completely
    closeTour();
    onComplete();

    // 4. Set persona strictly to 'guest' without triggering auth
    setRoleDirectly('guest');
    setActiveRole('buyer');
    setActiveTab('bazaar');

    // 5. Store completion in localStorage and sessionStorage so it never restarts
    try {
      localStorage.setItem('artlynk_has_seen_tour', 'true');
      localStorage.setItem('artisan_link_has_seen_tour_v1', 'true');
      sessionStorage.setItem('artlynk_tutorial_done', 'true');
    } catch {
      // ignore
    }

    // 6. Smooth scroll to top of page
    try {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { immediate: false });
      }
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [
    setIsAuthModalOpen,
    closeAuthModal,
    setSelectedCraftForStory,
    setSelectedCraftForCertificate,
    setIsPitaraDrawerOpen,
    setIsStoreQRModalOpen,
    closeAccountSettings,
    closeTour,
    onComplete,
    setRoleDirectly,
    setActiveRole,
    setActiveTab
  ]);

  // Trigger step view transitions and speech
  useEffect(() => {
    if (!isActive) {
      stopSpeech();
      return;
    }

    applyStepAction(currentStepIndex);

    const timer = setTimeout(() => {
      updateSpotlight();
      speakCurrentStep(currentStepIndex);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [isActive, currentStepIndex, applyStepAction, updateSpotlight, speakCurrentStep]);

  // Auto-track spotlight position on resize and scroll
  useEffect(() => {
    if (!isActive) return;

    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight, true);

    const interval = setInterval(updateSpotlight, 500);

    return () => {
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight, true);
      clearInterval(interval);
    };
  }, [isActive, updateSpotlight]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinishTour();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      speakCurrentStep(currentStepIndex);
    }
  };

  if (!isActive) return null;

  return (
    <div 
      id="autonomous-app-tour-guide"
      className="fixed inset-0 z-40 pointer-events-none select-none flex flex-col justify-between"
    >
      {/* 1. Crystal-Clear Semi-Transparent Dark Mask (Zero Blur) */}
      <div className="fixed inset-0 z-40 bg-black/25 pointer-events-none transition-all duration-300">
        {targetRect && (
          <div
            className="absolute ring-2 ring-amber-400 ring-offset-2 ring-offset-[#071422] rounded-2xl transition-all duration-300 pointer-events-none z-50 shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            style={{
              top: `${Math.max(6, targetRect.top - 6)}px`,
              left: `${Math.max(6, targetRect.left - 6)}px`,
              width: `${Math.min(window.innerWidth - 12, targetRect.width + 12)}px`,
              height: `${targetRect.height + 12}px`,
            }}
          >
            {/* Illuminated corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-300" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300" />
          </div>
        )}
      </div>

      {/* 2. Top Screen Progress Bar (Non-clipping on all screens) */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 flex items-center justify-between gap-2 pointer-events-auto">
        {/* Left: Active Step Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c1f30] border border-amber-500/40 text-amber-300 text-xs font-serif font-bold shadow-lg shrink-0">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '9s' }} />
          <span>{tourLocale.stepIndicator(currentStepIndex + 1, totalSteps)}</span>
        </div>

        {/* Step Progress Indicator Dots */}
        <div className="hidden xs:flex items-center gap-1 bg-[#0c1f30] px-2.5 py-1.5 rounded-full border border-white/15 shadow-md shrink-0">
          {tourLocale.steps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'w-4 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Skip Tour Button */}
        <button
          id="tour-skip-top-btn"
          type="button"
          onClick={handleFinishTour}
          className="px-3 py-1.5 rounded-full bg-[#0c1f30] hover:bg-[#132c44] text-slate-200 hover:text-white border border-white/20 text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-md active:scale-95 shrink-0"
        >
          <X className="w-3.5 h-3.5" />
          <span>{tourLocale.skipTour}</span>
        </button>
      </div>

      {/* 3. Responsive Floating Tutorial Dialog Card (Dynamically positioned above mobile bottom nav & responsive to viewport) */}
      <div 
        id="tour-dialog-card-container"
        className="fixed left-1/2 -translate-x-1/2 w-[94%] xs:w-[92%] sm:w-full max-w-lg z-50 bg-[#0c1f30] border border-amber-500/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl box-border pointer-events-auto transition-all duration-300 bottom-[calc(4.85rem+env(safe-area-inset-bottom,8px))] md:bottom-6 max-h-[calc(100dvh-8rem)] flex flex-col justify-between"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col w-full text-white"
          >
            {/* Top Header Row (Inside Card) */}
            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2 w-full">
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/30 shrink-0">
                {currentStep.badge}
              </span>

              {/* Voice Button */}
              <button
                id="tour-voice-narration-btn"
                type="button"
                onClick={handleToggleVoice}
                className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 transition-all cursor-pointer border ${
                  isSpeaking
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-emerald-400 animate-bounce' : 'text-amber-300'}`} />
                <span>{isSpeaking ? tourLocale.pauseVoice : tourLocale.playVoice}</span>
              </button>
            </div>

            {/* Typography & Content */}
            <h3 className="font-serif font-bold text-sm sm:text-base md:text-lg text-amber-300 leading-snug my-0.5 sm:my-1">
              {currentStep.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-h-20 sm:max-h-28 md:max-h-32 overflow-y-auto pr-1">
              {currentStep.description}
            </p>

            {/* Action Buttons (Bottom Row) */}
            <div className="flex items-center justify-between gap-2 mt-2.5 sm:mt-3 pt-2 border-t border-white/10 w-full">
              {/* Back Button */}
              <button
                id="tour-prev-step-btn"
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                  currentStepIndex === 0 ? 'opacity-30 pointer-events-none' : 'active:scale-95'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{tourLocale.prevBtn}</span>
              </button>

              {/* Next/Finish Button */}
              <button
                id="tour-next-step-btn"
                type="button"
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-linear-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 shadow-md shrink-0 flex items-center gap-1 transition-all cursor-pointer active:scale-95"
              >
                <span>
                  {currentStepIndex === totalSteps - 1
                    ? tourLocale.finishBtn
                    : tourLocale.nextBtn}
                </span>
                {currentStepIndex === totalSteps - 1 ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
