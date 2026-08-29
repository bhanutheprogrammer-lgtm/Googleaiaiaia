import React, { useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Map, 
  Award,
  Users,
  Coins
} from 'lucide-react';
import gsap from 'gsap';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { HeroSection } from '../HeroSection';
import { CraftGrid } from '../CraftGrid';
import { CraftMapSection } from '../CraftMapSection';
import { StoriesSection } from '../StoriesSection';

interface PublicMarketplaceViewProps {
  onAuthPrompt?: (role?: 'artisan' | 'buyer') => void;
}

export const PublicMarketplaceView: React.FC<PublicMarketplaceViewProps> = ({ onAuthPrompt }) => {
  const { activeTab, t } = useArtisan();
  const { openAuthModal } = useAuth();
  const tabContainerRef = useRef<HTMLElement>(null);

  // GSAP cross-fade animation when switching tabs in Guest view
  useEffect(() => {
    if (!tabContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tabContainerRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, tabContainerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const handleOpenAuth = (role: 'artisan' | 'buyer') => {
    if (onAuthPrompt) onAuthPrompt(role);
    else openAuthModal(role);
  };

  return (
    <div id="public-marketplace-view" className="min-h-screen bg-[#FAF6EE] text-[#0C243C]">
      
      {/* 1. Dual Role Gateway Banner */}
      <section id="guest-gateway-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Artisan / Karigar Onboarding */}
          <div 
            onClick={() => handleOpenAuth('artisan')}
            className="bg-linear-to-br from-[#0C243C] to-[#162E4A] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 text-white shadow-xl hover:border-amber-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#B83227] to-[#E67E22] flex items-center justify-center text-2xl border border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
                🪔
              </div>
              <span className="px-3 py-1 rounded-full bg-[#B83227] text-white text-[10px] font-sans font-bold uppercase tracking-wider">
                {t.guest_artisan_card_badge || 'For Karigars & Weavers'}
              </span>
            </div>

            <div className="mt-4 space-y-1.5">
              <h3 className="font-serif font-black text-xl text-[#FAF6EE] group-hover:text-amber-300 transition-colors">
                {t.guest_artisan_card_title || 'Are you a Master Artisan (Karigar)?'}
              </h3>
              <p className="text-stone-300 text-xs font-sans leading-relaxed">
                {t.guest_artisan_card_desc || 'Open your digital Karkhana studio. Scan crafts via Vernacular AI, generate instant GI certificates, and receive 100% direct WhatsApp orders.'}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>{t.guest_artisan_card_cta || 'Open Your Workshop Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Buyer / Patron Onboarding */}
          <div 
            onClick={() => handleOpenAuth('buyer')}
            className="bg-linear-to-br from-[#0E6655] to-[#117A65] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 text-white shadow-xl hover:border-emerald-300 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#117A65] to-[#0E6655] flex items-center justify-center text-2xl border border-emerald-400 shadow-md group-hover:scale-105 transition-transform">
                🛍️
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0C243C] text-emerald-300 text-[10px] font-sans font-bold uppercase tracking-wider border border-emerald-400/40">
                {t.guest_buyer_card_badge || 'For Patrons & Collectors'}
              </span>
            </div>

            <div className="mt-4 space-y-1.5">
              <h3 className="font-serif font-black text-xl text-[#FAF6EE] group-hover:text-amber-200 transition-colors">
                {t.guest_buyer_card_title || 'Are you an Art Patron (Art Lover)?'}
              </h3>
              <p className="text-emerald-100 text-xs font-sans leading-relaxed">
                {t.guest_buyer_card_desc || 'Discover 100% verified handmade Indian crafts directly from weavers & sculptors. Save wishlists, collect authenticity certificates, and pay zero middleman commissions.'}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-amber-200 group-hover:translate-x-1 transition-transform">
              <span>{t.guest_buyer_card_cta || 'Join as Heritage Buyer'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Public Hero and Craft Grid with GSAP cross-fade */}
      <section ref={tabContainerRef} id="guest-content-tabs">
        {activeTab === 'bazaar' && (
          <div className="space-y-8">
            <HeroSection />
            <CraftGrid />
          </div>
        )}

        {activeTab === 'craft_map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CraftMapSection />
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StoriesSection />
          </div>
        )}
      </section>

    </div>
  );
};
