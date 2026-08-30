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
  const { activeTab } = useArtisan();
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

  return (
    <div id="public-marketplace-view" className="min-h-screen bg-[#FAF6EE] text-[#0C243C]">
      {/* Public Hero and Craft Grid with GSAP cross-fade */}
      <section ref={tabContainerRef} id="guest-content-tabs">
        {activeTab === 'bazaar' && (
          <div className="space-y-8">
            <HeroSection onAuthPrompt={onAuthPrompt} />
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
