import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface IntroLoaderProps {
  onComplete?: () => void;
}

type LoaderStage = 'spinning' | 'brand' | 'finished';

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<LoaderStage>('spinning');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  // Circular Text content
  const circularString = '• LOADING • ARTISANAL CRAFTS • BHARAT ';
  
  // Convert circular string to rotated characters for crisp rendering
  const circularChars = useMemo(() => {
    const chars = circularString.split('');
    const degreeStep = 360 / chars.length;
    return chars.map((char, i) => ({
      char,
      rotation: i * degreeStep,
    }));
  }, [circularString]);

  // Master Timeline Sequence:
  // Stage 1: 0s - 5s (Spinning Circular Text & Heritage Emblem)
  // Stage 2: 5s - 8s (Grand Brand Reveal "ArtLynk" & Tagline)
  // Stage 3: 8s - 10s (Smooth Fade Out & Main App Reveal)
  useEffect(() => {
    // Stage 1 -> Brand Reveal: triggers at 5s
    const brandTimer = setTimeout(() => {
      setStage('brand');
    }, 5000);

    // Brand Reveal -> Smooth Fade Out: triggers at 8s
    const finishTimer = setTimeout(() => {
      setIsFadingOut(true);
      setStage('finished');
    }, 8000);

    // Complete Unmount & Reveal Main App: triggers at 10s
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
      if (onComplete) onComplete();
    }, 10000);

    return () => {
      clearTimeout(brandTimer);
      clearTimeout(finishTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  // Skip handler
  const handleSkip = () => {
    setIsFadingOut(true);
    setStage('finished');
    setTimeout(() => {
      setIsUnmounted(true);
      if (onComplete) onComplete();
    }, 500);
  };

  if (isUnmounted) return null;

  return (
    <div
      id="intro-splash-loader"
      className={`fixed inset-0 z-[9999] bg-[#071422] flex flex-col items-center justify-center text-center select-none overflow-hidden transition-all duration-[1500ms] ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />
      
      {/* Subtle Starfield & Particle Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Main Content Stage Viewport */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* STAGE 1: CIRCULAR TEXT ANIMATION (0s – 5s) */}
          {/* ========================================================================= */}
          {stage === 'spinning' && (
            <motion.div
              key="stage-spinning"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Circular Rotating Ring Container */}
              <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 flex items-center justify-center">
                
                {/* Outer Rotating Text Ring */}
                <div 
                  className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                  style={{ willChange: 'transform' }}
                >
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
                    <defs>
                      <path
                        id="textCirclePath"
                        d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                      />
                    </defs>
                    <text className="fill-amber-300/85 text-[11px] sm:text-[12px] font-mono tracking-[0.24em] uppercase font-semibold">
                      <textPath href="#textCirclePath" startOffset="0%">
                        {circularString.repeat(2)}
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Subtle Inner Decorative Concentric Rings */}
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-amber-500/20 animate-pulse" />
                <div className="absolute w-44 h-44 sm:w-54 sm:h-54 rounded-full border border-dashed border-amber-500/15 animate-[spin_24s_linear_infinite_reverse]" />

                {/* Center Glowing Heritage Emblem / Diya Flame */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [1, 1.06, 1], opacity: 1 }}
                  transition={{
                    scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                    opacity: { duration: 0.6 }
                  }}
                  className="relative z-10 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0A1A2F]/90 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.35)] backdrop-blur-md"
                >
                  <div className="relative">
                    {/* Glowing Diya / Heritage Seal Icon */}
                    <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] animate-pulse" />
                    <span className="absolute -inset-1 bg-amber-400/20 blur-md rounded-full -z-10" />
                  </div>
                  <span className="mt-1 text-[9px] sm:text-[10px] font-serif tracking-widest text-amber-200/90 font-bold uppercase">
                    KALA
                  </span>
                </motion.div>
              </div>

              {/* Bottom Subtle Status Pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300/80 text-xs font-mono tracking-wider"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>CONNECTING TO BHARAT CRAFTS</span>
              </motion.div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 2: BRAND REVEAL "ArtLynk" (5s – 8s) */}
          {/* ========================================================================= */}
          {(stage === 'brand' || stage === 'finished') && (
            <motion.div
              key="stage-brand-reveal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              {/* Top Ornamental Heritage Line */}
              <div className="flex items-center gap-3">
                <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-500/60" />
                <span className="w-2 h-2 rotate-45 border border-amber-400/60 bg-amber-500/20" />
                <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-500/60" />
              </div>

              {/* Brand Reveal: "ArtLynk" */}
              <div className="min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.45)]">
                    ArtLynk
                  </h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-2 text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-amber-400/70 font-semibold"
                  >
                    GI Certified • Direct From Master Karigars
                  </motion.p>
                </motion.div>
              </div>

              {/* Bottom Ornamental Heritage Line */}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-500/60" />
                <span className="w-2 h-2 rotate-45 border border-amber-400/60 bg-amber-500/20" />
                <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-500/60" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="text-xs text-stone-400 hover:text-white px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm absolute bottom-6 right-6 transition-all cursor-pointer font-sans tracking-wide flex items-center gap-1.5 shadow-lg group z-20"
      >
        <span>Skip Intro</span>
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </div>
  );
};
