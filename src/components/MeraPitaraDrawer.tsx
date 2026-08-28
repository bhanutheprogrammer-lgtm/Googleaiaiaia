import React, { useEffect, useRef } from 'react';
import { 
  X, 
  Trash2, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Award,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';

export const MeraPitaraDrawer: React.FC = () => {
  const {
    isPitaraDrawerOpen,
    setIsPitaraDrawerOpen,
    wishlistIds,
    toggleWishlist,
    acquireCraftCertificate,
    buyerUser
  } = useAuth();

  const { crafts, generateWhatsAppLink, setSelectedCraftForCertificate, setSelectedCraftForStory, setActiveTab, t } = useArtisan();

  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Background Scroll Locking, Lenis Prevention & GSAP Animation
  useEffect(() => {
    if (isPitaraDrawerOpen) {
      document.body.classList.add('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      if (drawerRef.current && overlayRef.current) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );

          gsap.fromTo(
            drawerRef.current,
            { x: '100%' },
            { x: '0%', duration: 0.4, ease: 'power3.out' }
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
  }, [isPitaraDrawerOpen]);

  const handleClose = () => {
    if (drawerRef.current && overlayRef.current) {
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.28,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => setIsPitaraDrawerOpen(false),
      });
    } else {
      setIsPitaraDrawerOpen(false);
    }
  };

  if (!isPitaraDrawerOpen) return null;

  const wishlistedCrafts = crafts.filter((c) => wishlistIds.includes(c.id));
  const totalAmountINR = wishlistedCrafts.reduce((sum, c) => sum + c.pricingEstimation.recommendedRetailPriceINR, 0);
  const totalArtisanWageINR = wishlistedCrafts.reduce((sum, c) => sum + c.pricingEstimation.fairKarigarWageINR, 0);

  return (
    <div 
      ref={overlayRef}
      id="pitara-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={drawerRef}
        id="pitara-drawer-content"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#0C243C] text-white h-full shadow-2xl flex flex-col border-l border-amber-500/40 overscroll-contain"
      >
        {/* Drawer Header */}
        <div className="bg-[#0C243C] p-5 text-white flex items-center justify-between border-b border-white/15 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#B83227] to-[#E67E22] flex items-center justify-center text-white font-serif text-lg font-black border border-[#D4AF37]">
              🎁
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-amber-200">
                {t.pitara_title || 'Wishlist'}
              </h2>
              <p className="text-[10px] text-stone-300 font-sans">
                Curated Saved Masterpieces • {wishlistedCrafts.length} items
              </p>
            </div>
          </div>

          <button
            id="close-pitara-drawer-btn"
            onClick={handleClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Impact Notice */}
        <div className="bg-[#132A45] p-3 border-b border-amber-500/20 px-5 flex items-center gap-2.5 text-xs text-amber-200">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-serif">
            Directly supporting <strong>{wishlistedCrafts.length} Karigar Families</strong> with 100% fair artisan wages.
          </span>
        </div>

        {/* Scrollable Item List */}
        <div 
          className="p-4 overflow-y-auto flex-1 space-y-3 overscroll-contain"
        >
          {wishlistedCrafts.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center text-2xl text-amber-300 font-serif border border-white/10">
                🪔
              </div>
              <h3 className="text-sm font-bold font-serif text-amber-200">
                {t.pitara_empty_title || 'Your Wishlist is currently empty'}
              </h3>
              <p className="text-xs text-stone-300 font-sans max-w-xs mx-auto">
                {t.pitara_empty_desc || 'Explore the verified Indian craft bazaar and tap the heart icon on any masterpiece to save it here.'}
              </p>
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('bazaar');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-linear-to-r from-[#B83227] to-[#E67E22] text-white text-xs font-bold font-sans uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer border border-amber-500/40"
              >
                {t.pitara_explore_cta || 'Explore Bazaar'}
              </button>
            </div>
          ) : (
            wishlistedCrafts.map((craft) => {
              const waLink = generateWhatsAppLink(craft);
              return (
                <div 
                  key={craft.id}
                  className="bg-[#132A45]/90 rounded-2xl p-3 border border-amber-500/25 shadow-xs flex gap-3 relative group"
                >
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    className="w-20 h-20 rounded-xl object-cover border border-amber-500/30 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold font-serif text-amber-100 line-clamp-1">
                          {craft.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(craft.id)}
                          className="text-stone-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-stone-300 font-sans">
                        By {craft.artisan.name} • {craft.artisan.village}, {craft.artisan.state}
                      </p>

                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-black font-serif text-amber-300">
                          ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-emerald-300 font-sans font-bold">
                          ₹{craft.pricingEstimation.fairKarigarWageINR.toLocaleString('en-IN')} Karigar Wage
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 bg-[#27AE60] hover:bg-[#219653] text-white rounded-lg text-[10px] font-bold font-sans flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp Karigar</span>
                      </a>

                      <button
                        onClick={() => {
                          acquireCraftCertificate(craft);
                          handleClose();
                          setActiveTab('certificates');
                        }}
                        className="py-1.5 px-2 bg-white/10 hover:bg-white/20 border border-amber-500/30 text-amber-200 rounded-lg text-[10px] font-bold font-sans flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Acquire & generate Certificate in Vault"
                      >
                        <Award className="w-3 h-3 text-amber-300" />
                        <span>Acquire & Vault</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Fair Wage Summary */}
        {wishlistedCrafts.length > 0 && (
          <div className="bg-[#0A1A2D] p-5 border-t border-white/15 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-stone-300">
                <span>Subtotal Value</span>
                <span className="font-semibold text-amber-200">₹{totalAmountINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-300 font-bold">
                <span>Direct Artisan Wage Contribution</span>
                <span>₹{totalArtisanWageINR.toLocaleString('en-IN')} (100% to Karigars)</span>
              </div>
              <div className="flex justify-between text-stone-400 text-[10px]">
                <span>Platform Commission</span>
                <span className="font-bold text-emerald-300">₹0.00 (Zero Commission)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15">
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('certificates');
                }}
                className="w-full py-3 rounded-xl bg-linear-to-r from-[#B83227] to-[#E67E22] text-white text-xs font-bold uppercase tracking-wider font-sans flex items-center justify-center gap-2 border border-amber-500/40 hover:scale-[1.01] transition-all cursor-pointer shadow-md"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>View Digital Certificates Vault</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

