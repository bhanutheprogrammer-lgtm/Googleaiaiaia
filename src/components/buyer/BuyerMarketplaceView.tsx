import React, { useRef, useEffect } from 'react';
import { 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { BuyerProfile } from '../../types';
import { HeroSection } from '../HeroSection';
import { CraftGrid } from '../CraftGrid';
import { CraftMapSection } from '../CraftMapSection';
import { StoriesSection } from '../StoriesSection';
import { BuyerCertificateVault } from './BuyerCertificateVault';

interface BuyerMarketplaceViewProps {
  buyer?: BuyerProfile;
}

export const BuyerMarketplaceView: React.FC<BuyerMarketplaceViewProps> = ({ buyer: propBuyer }) => {
  const { activeTab, setActiveTab, t } = useArtisan();
  const { buyerUser, wishlistIds, setIsPitaraDrawerOpen } = useAuth();
  const tabContainerRef = useRef<HTMLElement>(null);

  const currentBuyer = propBuyer || buyerUser;
  const certCount = currentBuyer?.purchasedCertificates?.length || 1;

  // GSAP matchMedia and timeline-based smooth cross-fade animation when switching tabs
  useEffect(() => {
    if (!tabContainerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 0px)', () => {
      const tl = gsap.timeline();
      tl.fromTo(
        tabContainerRef.current,
        { 
          opacity: 0, 
          y: 16,
          scale: 0.99
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.38, 
          ease: 'power2.out',
          clearProps: 'transform'
        }
      );
    });

    return () => mm.revert();
  }, [activeTab]);

  const userProfileCard = (
    <div id="patron-overview-card" className="bg-[#0F1E2E] text-white border border-amber-500/30 rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          <img
            src={currentBuyer?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={currentBuyer?.name || 'Buyer'}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/40 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-3 py-0.5 rounded-full bg-emerald-800/90 text-white text-[10px] font-sans font-bold uppercase tracking-wider shadow-xs border border-emerald-500/30">
                🌟 {currentBuyer?.patronLevel || 'Guardian of Indian Handloom — Level 2'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-sans font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>{t.patron_badge || 'Verified Art Patron'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#FAF9F6] tracking-tight">
              {t.welcome || 'Welcome'}, {currentBuyer?.name || 'Ananya Sharma'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-sans mt-0.5">
              {t.buyer_direct_patronage || 'Direct Patronage'} • 📍 {currentBuyer?.deliveryCity || 'Bengaluru'}, {currentBuyer?.deliveryState || 'Karnataka'}
            </p>
          </div>
        </div>
      </div>

      {/* Patron Impact Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-5 pt-5 border-t border-white/10">
        <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-stone-300 truncate">
            {t.patron_wages_supported || 'Direct Wages Supported'}
          </span>
          <div className="flex items-baseline gap-1 mt-1 mb-0.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-amber-300">
              ₹{currentBuyer?.directWagesSupportedINR?.toLocaleString('en-IN') || '45,000'}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-300 leading-tight">
            {t.dash_zero_middleman || '100% Middleman-Free'}
          </span>
        </div>

        <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-stone-300 truncate">
            {t.patron_families_empowered || 'Families Empowered'}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1 mb-0.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-emerald-400">
              {currentBuyer?.familiesEmpowered || 2}
            </span>
            <span className="text-xs sm:text-sm font-semibold truncate text-emerald-300">
              {t.stat_families || 'Families'}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-300 leading-tight">
            Pochampally & Bastar
          </span>
        </div>

        <div 
          onClick={() => setIsPitaraDrawerOpen(true)}
          className="bg-white/5 hover:bg-white/10 border border-amber-500/20 rounded-2xl p-3 sm:p-3.5 cursor-pointer transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-stone-300 truncate">
              {t.nav_pitara || 'Wishlist'}
            </span>
            <motion.div
              key={wishlistIds.length}
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.4, 0.9, 1.15, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80" />
            </motion.div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1 mb-0.5">
            <motion.span 
              key={`count-${wishlistIds.length}`}
              initial={{ scale: 0.8, y: -4 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-red-400"
            >
              {wishlistIds.length}
            </motion.span>
            <span className="text-xs sm:text-sm font-semibold truncate text-red-300">
              {t.stat_masterpieces || 'Masterpieces'}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-300 leading-tight">
            {t.buyer_click_pitara || 'Click to open Wishlist'}
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('certificates')}
          className="bg-white/5 hover:bg-white/10 border border-amber-500/20 rounded-2xl p-3 sm:p-3.5 cursor-pointer transition-all flex flex-col justify-between"
        >
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-stone-300 truncate">
            {t.nav_certificates || 'GI Certificates'}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1 mb-0.5">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-amber-300">
              {certCount}
            </span>
            <span className="text-xs sm:text-sm font-semibold truncate text-amber-200">
              {t.cert_verified_badge || 'Verified'}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-300 leading-tight">
            {t.buyer_download_parchment || 'Download parchment'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div id="buyer-marketplace-workspace" className="min-h-screen bg-[#FAF9F6] text-[#0F1E2E]">
      
      {/* Active Tab Views with Smooth GSAP cross-fade */}
      <section ref={tabContainerRef} id="buyer-active-tab-container">
        {activeTab === 'bazaar' && (
          <div className="space-y-8">
            <HeroSection />
            <CraftGrid />
          </div>
        )}

        {activeTab === 'craft_map' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 sm:py-8 space-y-6">
            {userProfileCard}
            <CraftMapSection />
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 sm:py-8 space-y-6">
            {userProfileCard}
            <BuyerCertificateVault />
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 sm:py-8 space-y-6">
            {userProfileCard}
            <StoriesSection />
          </div>
        )}
      </section>

    </div>
  );
};
