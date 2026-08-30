import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, ArrowRight, X, Play, HelpCircle } from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { ArtLynkLogo } from './ArtLynkLogo';
import { getTourLocale } from '../locales/tourTranslations';
import { speakTourText, stopSpeech } from '../utils/speechVoiceHelper';

interface TutorialPromptScreenProps {
  onStartTour: () => void;
  onSkipTour: () => void;
}

export const TutorialPromptScreen: React.FC<TutorialPromptScreenProps> = ({
  onStartTour,
  onSkipTour
}) => {
  const { currentLanguage } = useArtisan();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const tourData = getTourLocale(currentLanguage);

  // Auto narrate the question once on mount with user-friendly fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      handleToggleVoice();
    }, 450);

    return () => {
      clearTimeout(timer);
      stopSpeech();
    };
  }, [currentLanguage]);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToSpeak = `${tourData.promptTitle}. ${tourData.promptQuestion}. ${tourData.promptSubtext}`;
      speakTourText(
        textToSpeak,
        currentLanguage,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleAccept = () => {
    stopSpeech();
    setIsExiting(true);
    setTimeout(() => {
      onStartTour();
    }, 300);
  };

  const handleDecline = () => {
    stopSpeech();
    setIsExiting(true);
    setTimeout(() => {
      onSkipTour();
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="tutorial-prompt-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] min-h-screen bg-[#071422] text-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
        >
          {/* Ambient Heritage Aura Backgrounds */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-terracotta-600/15 rounded-full blur-3xl animate-pulse" />
            
            {/* Subtle Indian Jaali Lattice */}
            <div 
              className="absolute inset-0 opacity-[0.03] bg-repeat"
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, #FFD166 2px, transparent 0), radial-gradient(circle at 75px 75px, #FFD166 2px, transparent 0)`,
                backgroundSize: '100px 100px'
              }}
            />
          </div>

          {/* Center Heritage Card */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-xl bg-[#0C1F33]/90 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-6"
          >
            {/* Header Stack: Logo Emblem + Direct Craft Badge + Welcome Chip */}
            <div className="flex flex-col items-center gap-2.5">
              {/* 1. Glowing Circular Logo Emblem */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 20px rgba(245, 158, 11, 0.25)',
                    '0 0 40px rgba(224, 107, 38, 0.45)',
                    '0 0 20px rgba(245, 158, 11, 0.25)'
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-500/20 to-amber-950/40 p-3 border border-amber-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.25)]"
              >
                <ArtLynkLogo size={44} glow color="gradient" className="w-10 h-10 sm:w-12 sm:h-12" />
              </motion.div>

              {/* 2. Direct Craft Badge (Placed Cleanly BELOW the Logo) */}
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm">
                100% DIRECT CRAFT
              </span>

              {/* 3. Welcome Chip */}
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-200/90 flex items-center gap-1.5 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{tourData.promptTitle || 'Welcome to ArtLynk Bharat'}</span>
              </div>
            </div>

            {/* Title & Question */}
            <div className="space-y-2 max-w-md">
              {/* Main Question in Native Language */}
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold leading-snug tracking-tight">
                {tourData.promptQuestion}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {tourData.promptSubtext}
              </p>
            </div>

            {/* Audio Voice Narration Pill Button */}
            <motion.button
              id="tutorial-prompt-voice-btn"
              type="button"
              onClick={handleToggleVoice}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-xs font-sans font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                isSpeaking
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/10 text-amber-200 border-amber-500/30 hover:bg-white/15'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>{tourData.pauseVoice}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>{tourData.listenBtn}</span>
                </>
              )}
            </motion.button>

            {/* Dual Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {/* Primary "Yes, Show Me" Button */}
              <motion.button
                id="tutorial-prompt-yes-btn"
                type="button"
                onClick={handleAccept}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-terracotta-500 text-[#071422] font-serif font-black text-sm sm:text-base hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                <span className="text-lg">🔊</span>
                <span>{tourData.yesBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Secondary "No, Skip" Button */}
              <motion.button
                id="tutorial-prompt-skip-btn"
                type="button"
                onClick={handleDecline}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-sans text-xs sm:text-sm transition-all border border-white/15 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4 opacity-70" />
                <span>{tourData.noBtn}</span>
              </motion.button>
            </div>

            {/* Micro Indicator of Steps */}
            <div className="pt-2 text-[11px] text-slate-400 font-sans flex items-center justify-center gap-4">
              <span>🇮🇳 5 Simple Steps</span>
              <span>•</span>
              <span>🎙️ Voice in Native Language</span>
              <span>•</span>
              <span>⏱️ 1 Minute</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
