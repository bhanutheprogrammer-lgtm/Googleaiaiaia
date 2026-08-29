import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Sparkles, 
  Compass,
  Play,
  RotateCcw
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
  const { currentLanguage, setActiveTab } = useArtisan();
  const { setRoleDirectly, openAuthModal, closeAuthModal } = useAuth();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const tourLocale = getTourLocale(currentLanguage);
  const currentStep = tourLocale.steps[currentStepIndex] || tourLocale.steps[0];
  const totalSteps = tourLocale.steps.length;

  // Execute Step Actions (Switches views without auth popups)
  const applyStepAction = useCallback((stepIdx: number) => {
    const step = tourLocale.steps[stepIdx];
    if (!step) return;

    if (step.targetRole) {
      setRoleDirectly(step.targetRole);
    }

    if (step.targetTab) {
      setActiveTab(step.targetTab);
    }

    if (step.openAuthModal) {
      openAuthModal('artisan', 'login');
    } else {
      closeAuthModal();
    }
  }, [tourLocale.steps, setRoleDirectly, setActiveTab, openAuthModal, closeAuthModal]);

  // Update spotlight rect when step changes or window scrolls/resizes
  const updateSpotlight = useCallback(() => {
    if (!isActive) return;

    const step = tourLocale.steps[currentStepIndex];
    if (!step) return;

    let targetEl: HTMLElement | null = null;
    if (step.highlightSelector) {
      targetEl = document.querySelector(step.highlightSelector) as HTMLElement;
    }

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setTargetRect(rect);
      
      // Smoothly scroll target into view if not visible
      if (rect.top < 60 || rect.bottom > window.innerHeight - 80) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setTargetRect(null);
    }
  }, [isActive, currentStepIndex, tourLocale.steps]);

  // Handle Step Narration
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

  // Trigger step action and narration on step index changes
  useEffect(() => {
    if (!isActive) {
      stopSpeech();
      return;
    }

    applyStepAction(currentStepIndex);

    // Allow DOM to settle before calculating spotlight and speaking
    const timer = setTimeout(() => {
      updateSpotlight();
      speakCurrentStep(currentStepIndex);
    }, 450);

    return () => {
      clearTimeout(timer);
    };
  }, [isActive, currentStepIndex, applyStepAction, updateSpotlight, speakCurrentStep]);

  // Periodic and resize listener for spotlight accuracy
  useEffect(() => {
    if (!isActive) return;

    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight, true);

    const interval = setInterval(updateSpotlight, 600);

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
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    stopSpeech();
    closeAuthModal();
    setRoleDirectly('guest');
    setActiveTab('bazaar');
    try {
      localStorage.setItem('artisan_link_has_seen_tour_v1', 'true');
    } catch {
      // ignore
    }
    onComplete();
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
      className="fixed inset-0 z-[999999] pointer-events-none select-none flex flex-col justify-between"
    >
      {/* 1. Backdrop Spotlight Layer */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-all duration-300 pointer-events-auto">
        {targetRect && (
          <div
            className="absolute rounded-3xl border-2 border-amber-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] pointer-events-none transition-all duration-400 ease-out"
            style={{
              top: `${Math.max(10, targetRect.top - 8)}px`,
              left: `${Math.max(10, targetRect.left - 8)}px`,
              width: `${Math.min(window.innerWidth - 20, targetRect.width + 16)}px`,
              height: `${targetRect.height + 16}px`,
              boxShadow: '0 0 0 9999px rgba(5, 15, 25, 0.75), 0 0 30px rgba(245, 158, 11, 0.5)',
            }}
          >
            {/* Pulsing Corner Targets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-300 animate-ping" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300 animate-ping" />
          </div>
        )}
      </div>

      {/* 2. Top Header Bar: Tour Progress & Quick Close */}
      <div className="relative z-10 w-full p-3 sm:p-4 flex items-center justify-between pointer-events-auto">
        {/* Left: Active Step Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C1F33]/90 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold shadow-lg backdrop-blur-md">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{tourLocale.stepIndicator(currentStepIndex + 1, totalSteps)}</span>
        </div>

        {/* Step Progress Dots */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#0C1F33]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {tourLocale.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
              title={`Step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Skip Tour Button */}
        <button
          id="tour-skip-top-btn"
          type="button"
          onClick={handleFinish}
          className="px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-white/15 text-slate-300 hover:text-white border border-white/20 text-xs font-sans font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
        >
          <X className="w-3.5 h-3.5" />
          <span>{tourLocale.skipTour}</span>
        </button>
      </div>

      {/* 3. Bottom Interactive Heritage Navigation Card */}
      <div className="relative z-10 w-full p-4 sm:p-6 flex justify-center pointer-events-auto mb-2 sm:mb-4">
        <motion.div
          key={currentStepIndex}
          initial={{ y: 25, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 25, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-[#0B1C2D]/95 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl text-white flex flex-col space-y-4"
        >
          {/* Card Top Row: Step Tag + Voice Narration Toggle */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-sans font-bold uppercase tracking-wider">
                {currentStep.badge}
              </span>
              <span className="text-xs text-slate-400 font-sans hidden sm:inline">
                • 🇮🇳 100% Fair Heritage
              </span>
            </div>

            {/* Audio Voice Narration Button */}
            <button
              id="tour-voice-narration-btn"
              type="button"
              onClick={handleToggleVoice}
              className={`px-3 py-1 rounded-full text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isSpeaking
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 animate-pulse shadow-sm'
                  : 'bg-white/10 text-amber-200 border-amber-500/30 hover:bg-white/15'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span>{tourLocale.pauseVoice}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{tourLocale.playVoice}</span>
                </>
              )}
            </button>
          </div>

          {/* Step Main Title & Vernacular Explanation */}
          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-serif font-black text-amber-300 flex items-center gap-2">
              <span>{currentStep.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Navigation Action Buttons (Previous, Next / Finish) */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-3">
            {/* Previous Button */}
            <button
              id="tour-prev-step-btn"
              type="button"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentStepIndex === 0
                  ? 'opacity-30 pointer-events-none text-slate-500'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 active:scale-95'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tourLocale.prevBtn}</span>
            </button>

            {/* Next / Finish Button */}
            <button
              id="tour-next-step-btn"
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-terracotta-500 text-[#071422] font-serif font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer"
            >
              <span>
                {currentStepIndex === totalSteps - 1
                  ? tourLocale.finishBtn
                  : tourLocale.nextBtn}
              </span>
              {currentStepIndex === totalSteps - 1 ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
