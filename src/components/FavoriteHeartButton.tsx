import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface FavoriteHeartButtonProps {
  isFavorited: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

// 8 radial angles for the micro-sparkle burst (in degrees)
const BURST_PARTICLES = [
  { angle: 0, color: '#E11D48', distance: 18, size: 4 },
  { angle: 45, color: '#D4AF37', distance: 20, size: 3 },
  { angle: 90, color: '#B45A28', distance: 18, size: 4 },
  { angle: 135, color: '#F43F5E', distance: 20, size: 3.5 },
  { angle: 180, color: '#E11D48', distance: 18, size: 4 },
  { angle: 225, color: '#D4AF37', distance: 20, size: 3 },
  { angle: 270, color: '#B45A28', distance: 18, size: 4 },
  { angle: 315, color: '#FB7185', distance: 20, size: 3.5 },
];

export const FavoriteHeartButton: React.FC<FavoriteHeartButtonProps> = ({
  isFavorited,
  onToggle,
  size = 'md',
  className = '',
  showTooltip = false,
}) => {
  const [triggerBurst, setTriggerBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  // Trigger radial sparkle burst on favoriting
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFavorited) {
      setTriggerBurst(true);
      setBurstKey((prev) => prev + 1);
    }
    onToggle(e);
  };

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.button
        type="button"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleClick}
        aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        title={showTooltip ? (isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist') : undefined}
        className={`relative z-10 flex items-center justify-center rounded-full transition-colors cursor-pointer select-none shadow-xs backdrop-blur-md ${sizeClasses[size]} ${
          isFavorited
            ? 'bg-[#B45A28] text-white shadow-amber-900/20'
            : 'bg-white/90 hover:bg-white text-stone-700 hover:text-[#B45A28] border border-stone-200/60'
        } ${className}`}
      >
        {/* Animated Heart Icon with Elastic Spring Bounce */}
        <motion.div
          key={isFavorited ? 'favorited' : 'unfavorited'}
          initial={{ scale: 1 }}
          animate={
            isFavorited
              ? {
                  scale: [1, 0.6, 1.45, 0.88, 1.15, 1],
                  rotate: [0, -14, 14, -6, 6, 0],
                }
              : { scale: [1, 0.85, 1] }
          }
          transition={{
            duration: 0.55,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="flex items-center justify-center"
        >
          <Heart
            size={iconSizes[size]}
            className={`transition-colors duration-200 ${
              isFavorited ? 'fill-white stroke-white' : 'stroke-current stroke-[2]'
            }`}
          />
        </motion.div>

        {/* Shockwave expanding ring ripple when favorited */}
        <AnimatePresence>
          {triggerBurst && (
            <motion.span
              key={`shockwave-${burstKey}`}
              initial={{ scale: 0.6, opacity: 0.85, borderColor: '#B45A28' }}
              animate={{ scale: 2.1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#B45A28] pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating mini heart particle that floats upward upon favoriting */}
      <AnimatePresence>
        {triggerBurst && (
          <motion.div
            key={`float-heart-${burstKey}`}
            initial={{ y: 0, opacity: 1, scale: 0.8 }}
            animate={{
              y: -30,
              opacity: 0,
              scale: 1.3,
              x: [0, -4, 4, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute z-20 pointer-events-none text-[#E11D48]"
          >
            <Heart size={14} className="fill-[#E11D48] stroke-[#E11D48]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial Sparkle Particle Burst */}
      <AnimatePresence>
        {triggerBurst &&
          BURST_PARTICLES.map((particle, idx) => {
            const rad = (particle.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * particle.distance;
            const targetY = Math.sin(rad) * particle.distance;

            return (
              <motion.span
                key={`sparkle-${burstKey}-${idx}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
                  scale: [0, 1.2, 0],
                  opacity: [1, 0.9, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                  delay: idx * 0.015,
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                }}
                className="absolute rounded-full pointer-events-none z-20 shadow-xs"
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
};
