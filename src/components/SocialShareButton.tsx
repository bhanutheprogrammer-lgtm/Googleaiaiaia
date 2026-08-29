import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  Send, 
  ExternalLink,
  Sparkles,
  MapPin,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { CraftItem } from '../types';
import { ArtLynkLogo } from './ArtLynkLogo';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

interface SocialShareButtonProps {
  craft: CraftItem;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'pill' | 'dark' | 'glass';
  className?: string;
  showLabel?: boolean;
}

export const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  craft,
  size = 'md',
  variant = 'icon',
  className = '',
  showLabel = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Generate shareable URL (using hash route or craft query parameter)
  const craftUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}#craft-${craft.id}`
    : `https://artlynk.app/#craft-${craft.id}`;

  const shareText = `Discover ${craft.title} handcrafted by master artisan ${craft.artisan.name} from ${craft.artisan.village ? `${craft.artisan.village}, ` : ''}${craft.stateOfOrigin}. 100% authentic GI craft on ArtLynk!`;
  const encodedUrl = encodeURIComponent(craftUrl);
  const encodedText = encodeURIComponent(shareText);

  // Social Links
  const shareChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      color: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      color: 'bg-black hover:bg-stone-800 text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=ArtLynk,VocalForLocal,IndianCrafts,Handmade`
    },
    {
      id: 'facebook',
      name: 'Facebook',
      color: 'bg-[#1877F2] hover:bg-[#166fe5] text-white',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.098.204-1.282.529-.184.326-.184.887-.184 1.706v1.745h3.918l-.519 3.667h-3.399v7.98h-5.41z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      id: 'telegram',
      name: 'Telegram',
      color: 'bg-[#229ED9] hover:bg-[#1e8cc0] text-white',
      icon: <Send className="w-3.5 h-3.5" />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: 'bg-[#0A66C2] hover:bg-[#095196] text-white',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    }
  ];

  // Native Web Share API
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: craft.title,
          text: shareText,
          url: craftUrl,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled or share failed, fallback to modal
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  // Copy Link Helper
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(craftUrl);
      } else {
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = craftUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Scroll Locking & Keydown handlers
  useEffect(() => {
    if (!isOpen) return;

    // Lock background scroll and pause smooth scroll
    lockScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unlockScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Size styling
  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  // Variant styling
  const getButtonClasses = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/80 hover:bg-white text-stone-700 hover:text-[#b45a28] border border-white/40 shadow-xs backdrop-blur-md';
      case 'dark':
        return 'bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 shadow-xs backdrop-blur-md';
      case 'pill':
        return 'bg-amber-50 hover:bg-amber-100/80 text-[#b45a28] font-medium border border-amber-200/80 shadow-2xs';
      case 'icon':
      default:
        return 'bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-[#b45a28] border border-stone-200/80 hover:border-[#b45a28]/30';
    }
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger Button */}
      <motion.button
        ref={buttonRef}
        type="button"
        id={`share-btn-${craft.id}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${getButtonClasses()} ${sizeClasses} ${className}`}
        title={`Share ${craft.title}`}
        aria-label={`Share ${craft.title}`}
        aria-expanded={isOpen}
      >
        <Share2 className={`${iconSizes} transition-transform group-hover:rotate-12`} />
        {showLabel && (
          <span className="font-medium text-xs">Share</span>
        )}
      </motion.button>

      {/* Share Modal Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain select-none"
              style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => {
                if (e.target === e.currentTarget) {
                  e.preventDefault();
                }
                e.stopPropagation();
              }}
            >
              
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              />

              {/* Share Card Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                style={{ overscrollBehavior: 'contain' }}
                className="relative w-full max-w-md bg-[#FCFBF8] text-[#0F1E2E] rounded-3xl border border-amber-500/30 shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)] overscroll-contain z-10 p-5 sm:p-6 space-y-4 select-text"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                  aria-label="Close share dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header with Terracotta Logo */}
                <div className="flex items-center gap-2.5 border-b border-stone-200/80 pb-3.5 pr-8">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-amber-500/40 flex items-center justify-center p-1.5 shrink-0">
                    <ArtLynkLogo size={24} color="terracotta" glow />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                      Share Masterpiece
                    </h3>
                    <p className="text-xs text-stone-500 font-sans">
                      Champion Indian crafts & empower local artisans
                    </p>
                  </div>
                </div>

                {/* Craft Mini Card Preview */}
                <div className="flex gap-3 bg-white p-3 rounded-2xl border border-amber-500/20 shadow-2xs">
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-xl shrink-0 border border-stone-200/60"
                  />
                  <div className="flex flex-col justify-between min-w-0 flex-1">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45a28] bg-orange-50 px-2 py-0.5 rounded-md">
                          {craft.category}
                        </span>
                        {craft.isGiTagged && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <ShieldCheck className="w-2.5 h-2.5" /> GI Tag
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 truncate mt-1">
                        {craft.title}
                      </h4>
                      <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#b45a28] shrink-0" />
                        <span>{craft.artisan.name} • {craft.stateOfOrigin}</span>
                      </p>
                    </div>
                    <div className="text-sm font-bold font-serif text-[#b45a28] mt-1">
                      ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Social Share Grid */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-sans mb-2.5">
                    Share via Social Platforms
                  </div>
                  <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                    {shareChannels.map((channel) => (
                      <a
                        key={channel.id}
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-amber-400 hover:shadow-xs transition-all group cursor-pointer text-center"
                      >
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${channel.color}`}>
                          {channel.icon}
                        </div>
                        <span className="text-[10px] font-medium text-stone-600 group-hover:text-stone-900 truncate max-w-full">
                          {channel.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Native Device Share (if supported) */}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="w-full py-2 px-3 rounded-xl bg-amber-100/60 hover:bg-amber-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 border border-amber-300/60 transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-[#b45a28]" />
                    <span>More share options on this device</span>
                  </button>
                )}

                {/* Copy Link Input Bar */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                    Or Copy Link
                  </div>
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-stone-200 focus-within:border-[#b45a28] transition-colors">
                    <input
                      type="text"
                      readOnly
                      value={craftUrl}
                      className="bg-transparent text-xs text-stone-600 px-2 py-1 outline-none w-full truncate font-mono select-all"
                    />
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyLink}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs ${
                        copied
                          ? 'bg-[#27AE60] text-white'
                          : 'bg-[#b45a28] hover:bg-[#96471d] text-white'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Footer note */}
                <div className="text-[11px] text-center text-stone-400 font-sans pt-1">
                  100% direct karigar remuneration • Verified GI Heritage
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default SocialShareButton;
