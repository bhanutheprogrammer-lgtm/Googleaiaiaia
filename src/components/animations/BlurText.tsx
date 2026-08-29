import React from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number; // Delay in milliseconds between words
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
}

/**
 * React Bits "BlurText" Component
 * Animates text sequentially with a smooth blur, scale, and translation spring transition.
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 120, // 0.12s staggered delay per word
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-flex flex-wrap justify-center items-center gap-x-2.5 sm:gap-x-3.5 ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={`${element}-${index}`}
          initial={{
            filter: 'blur(12px)',
            opacity: 0,
            y: direction === 'bottom' ? 16 : -16,
            scale: 0.95,
          }}
          animate={{
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.65,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          className="inline-block whitespace-nowrap"
        >
          {element}
        </motion.span>
      ))}
    </span>
  );
};
