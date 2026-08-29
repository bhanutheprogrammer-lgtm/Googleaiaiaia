import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Sparkles, Flame, Layers, ShieldCheck } from 'lucide-react';
import { BlurText } from './animations/BlurText';
import { ArtLynkLogo } from './ArtLynkLogo';
import { useAuth } from '../context/AuthContext';

interface PersonaTransitionScreenProps {
  forcedTargetRole?: 'artisan' | 'buyer' | null;
}

export const PersonaTransitionScreen: React.FC<PersonaTransitionScreenProps> = ({ forcedTargetRole }) => {
  const { isSwitchingPersona, switchingTargetRole } = useAuth();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const targetRole = forcedTargetRole || switchingTargetRole || 'buyer';

  // Handle the 2.0s fade-out step before 2.3s unmount
  useEffect(() => {
    if (isSwitchingPersona) {
      setIsFadingOut(false);
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2000);

      return () => clearTimeout(fadeTimer);
    } else {
      setIsFadingOut(false);
    }
  }, [isSwitchingPersona]);

  if (!isSwitchingPersona) return null;

  const isBuyerMode = targetRole === 'buyer';

  const headingText = isBuyerMode 
    ? 'Shifting to MarketPlace' 
    : 'Shifting to Seller Studio';

  const subtitleText = isBuyerMode
    ? 'Loading verified GI crafts, curated collections & direct patron pricing...'
    : 'Opening artisan workshop, vernacular voice listings & order management...';

  return (
    <div
      id="persona-transition-overlay"
      className={`fixed inset-0 z-[9999] bg-[#071422] flex flex-col items-center justify-center text-center p-6 select-none transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 40%, ${isBuyerMode ? 'rgba(17, 122, 101, 0.25)' : 'rgba(184, 50, 39, 0.28)'} 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 75%)
        `,
      }}
    >
      {/* Background Subtle Floating Dust / Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        
        {/* Animated Brand Emblem & Ring */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Pulsing Aura Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-amber-600/20 blur-xl animate-pulse" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full border border-dashed border-amber-400/30"
          />

          {/* Center Emblem Container */}
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-4 flex items-center justify-center shadow-2xl border ${
            isBuyerMode 
              ? 'bg-gradient-to-br from-[#0B253A] via-[#117A65]/40 to-[#071624] border-emerald-400/50 shadow-emerald-950/50' 
              : 'bg-gradient-to-br from-[#2D120B] via-[#B83227]/40 to-[#071624] border-amber-500/50 shadow-amber-950/50'
          }`}>
            {isBuyerMode ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.85, 1.08, 1] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-center text-4xl sm:text-5xl"
              >
                <span>🛍️</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.85, 1.08, 1] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-center text-4xl sm:text-5xl"
              >
                <span>🪔</span>
              </motion.div>
            )}
          </div>

          {/* Small Floating Sparkle Pill */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#0C243C] border border-amber-400/60 shadow-lg text-[10px] font-bold text-amber-300 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{isBuyerMode ? 'Marketplace' : 'Studio'}</span>
          </motion.div>
        </motion.div>

        {/* Small Mode Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-1"
        >
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest border ${
            isBuyerMode
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
              : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>{isBuyerMode ? 'Switching to Buyer Interface' : 'Switching to Artisan Interface'}</span>
          </span>
        </motion.div>

        {/* Main Heading Animated with React Bits "BlurText" */}
        <div className="my-2 min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
          <BlurText
            text={headingText}
            delay={120} // 0.12s staggered delay per word
            direction="bottom"
            className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.25)] my-3 text-center"
          />
        </div>

        {/* Subtitle with Fade & Slide Animation */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
          className="font-sans text-xs sm:text-sm text-stone-300/90 max-w-md leading-relaxed px-4 mt-1"
        >
          {subtitleText}
        </motion.p>

        {/* Progress Loading Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '180px' }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="h-1 bg-white/10 rounded-full overflow-hidden mt-8 relative"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className={`h-full w-1/2 rounded-full ${
              isBuyerMode
                ? 'bg-gradient-to-r from-transparent via-emerald-400 to-amber-300'
                : 'bg-gradient-to-r from-transparent via-amber-400 to-orange-500'
            }`}
          />
        </motion.div>

        {/* Brand Stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex items-center gap-2 text-stone-400 text-xs font-serif tracking-wider"
        >
          <ArtLynkLogo size={18} />
          <span>ArtLynk • Direct Craft Provenance</span>
        </motion.div>

      </div>
    </div>
  );
};
