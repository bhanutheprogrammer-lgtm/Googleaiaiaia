import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useArtisan } from '../context/ArtisanContext';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { LanguageCode } from '../types';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage?: (langCode: LanguageCode) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  onSelectLanguage,
}) => {
  const { currentLanguage, setLanguage } = useArtisan();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Background Scroll Lock & Entrance Animation
  useEffect(() => {
    if (!isOpen) return;

    lockScroll();

    if (cardRef.current && overlayRef.current) {
      const ctx = gsap.context(() => {
        // Overlay fade in
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );

        // Modal Card Spring Scale-In (Centered)
        gsap.fromTo(
          cardRef.current,
          { scale: 0.92, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
        );

        // Staggered list items
        if (listRef.current) {
          const items = listRef.current.querySelectorAll('.lang-item-btn');
          gsap.fromTo(
            items,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.2, stagger: 0.02, delay: 0.05, ease: 'power2.out' }
          );
        }
      });

      return () => {
        unlockScroll();
        ctx.revert();
      };
    }

    return () => {
      unlockScroll();
    };
  }, [isOpen]);

  // Close on Escape Key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseWithAnimation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleCloseWithAnimation = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 8,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    if (onSelectLanguage) {
      onSelectLanguage(code);
    }
    handleCloseWithAnimation();
  };

  return createPortal(
    <div
      ref={overlayRef}
      id="language-modal-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseWithAnimation();
        }
      }}
    >
      <div
        ref={cardRef}
        id="language-modal-card"
        data-lenis-prevent="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-modal-title"
        className="w-full max-w-sm bg-[#5C2A12] border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl max-h-[80vh] flex flex-col overflow-hidden select-none relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400 shrink-0" />
            <h2 id="language-modal-title" className="text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wider font-sans">
              SELECT LANGUAGE
            </h2>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold border border-amber-500/30">
              {INDIAN_LANGUAGES.length}
            </span>
          </div>

          <button
            id="close-language-modal-btn"
            type="button"
            onClick={handleCloseWithAnimation}
            aria-label="Close Language Modal"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Languages List */}
        <div
          ref={listRef}
          data-lenis-prevent="true"
          className="overflow-y-auto space-y-2 pr-1.5 my-3 flex-1 min-h-0 overscroll-contain touch-pan-y"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#D97706 rgba(255, 255, 255, 0.05)',
          }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          {INDIAN_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-option-${lang.code}`}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`lang-item-btn w-full p-3 rounded-2xl flex justify-between items-center cursor-pointer transition-all text-left ${
                  isSelected
                    ? 'border border-amber-400 bg-amber-500/10 text-amber-300 font-semibold shadow-inner'
                    : 'border border-transparent hover:bg-white/5 text-slate-200'
                }`}
              >
                <div className="flex flex-col pr-2">
                  <span className={`text-sm font-medium ${isSelected ? 'text-amber-200 font-bold' : 'text-white'}`}>
                    {lang.nativeName} ({lang.label})
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans">
                    {lang.region}
                  </span>
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-white/10 shrink-0 opacity-0 group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Subtext */}
        <div className="pt-2 border-t border-white/10 text-center shrink-0">
          <p className="text-[10px] text-slate-400 font-sans">
            AI translations powered by Vernacular Bharat Model
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LanguageModal;

