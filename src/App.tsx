import React, { useEffect, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArtisanProvider } from './context/ArtisanContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ArtisanProfile, BuyerProfile } from './types';
import { IntroLoader } from './components/IntroLoader';

gsap.registerPlugin(ScrollTrigger);

// Suppress false null-target warnings during dynamic view switches
gsap.config({
  nullTargetWarn: false,
});

// Role-Specific Navbars
import { ArtisanNavbar } from './components/navbar/ArtisanNavbar';
import { BuyerNavbar } from './components/navbar/BuyerNavbar';
import { GuestNavbar } from './components/navbar/GuestNavbar';

// Role-Specific Isolated Views
import { ArtisanDashboardView } from './components/artisan/ArtisanDashboardView';
import { BuyerMarketplaceView } from './components/buyer/BuyerMarketplaceView';
import { PublicMarketplaceView } from './components/guest/PublicMarketplaceView';

// Common Components & Modals
import { Footer } from './components/Footer';
import { CraftStoryDrawer } from './components/CraftStoryDrawer';
import { GICertificateModal } from './components/GICertificateModal';
import { AuthModal } from './components/AuthModal';
import { MeraPitaraDrawer } from './components/MeraPitaraDrawer';
import { ArtisanStoreQRModal } from './components/ArtisanStoreQRModal';
import { AccountSettingsModal } from './components/AccountSettingsModal';
import { JudgeRoleSwitcher } from './components/JudgeRoleSwitcher';
import { MobileBottomNav } from './components/MobileBottomNav';

const MainContent: React.FC = () => {
  const { userRole, currentUser, openAuthModal } = useAuth();

  // 1. ARTISAN / SELLER VIEW: Renders ONLY the Artisan Workshop Studio
  if (userRole === 'artisan') {
    return (
      <div id="artisan-role-container" className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between w-full m-0 p-0">
        <ArtisanNavbar />
        <div className="w-full flex-1">
          <ArtisanDashboardView artisan={currentUser as ArtisanProfile} />
        </div>
        <Footer />
      </div>
    );
  }

  // 2. BUYER VIEW: Renders ONLY the Buyer Marketplace & Wishlist
  if (userRole === 'buyer') {
    return (
      <div id="buyer-role-container" className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between w-full m-0 p-0">
        <BuyerNavbar />
        <div className="w-full flex-1">
          <BuyerMarketplaceView buyer={currentUser as BuyerProfile} />
        </div>
        <Footer />
      </div>
    );
  }

  // 3. GUEST VIEW: Renders Public Browse Mode with Auth Prompts
  return (
    <div id="guest-role-container" className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between w-full m-0 p-0">
      <GuestNavbar onAuthClick={() => openAuthModal('buyer')} />
      <div className="w-full flex-1">
        <PublicMarketplaceView onAuthPrompt={(role) => openAuthModal(role || 'buyer')} />
      </div>
      <Footer />
    </div>
  );
};

const MainLayout: React.FC = () => {
  // Initialize Locomotive Scroll across each and every section
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
      },
    });

    (window as any).locomotiveScroll = locomotiveScroll;
    // Proxy lenis methods for modal scroll locking compatibility
    (window as any).lenis = {
      stop: () => locomotiveScroll.stop?.(),
      start: () => locomotiveScroll.start?.(),
      scrollTo: (target: any, options: any) => locomotiveScroll.scrollTo?.(target, options),
      raf: () => {},
    };

    return () => {
      (window as any).locomotiveScroll = undefined;
      (window as any).lenis = undefined;
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div 
      data-scroll-container 
      className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between text-[#1E2838] font-sans selection:bg-[#A84A2C]/20 selection:text-[#A84A2C] w-full overflow-x-hidden m-0 p-0"
    >
      {/* Strict Role Router */}
      <MainContent />

      {/* Global Modals & Drawers */}
      <CraftStoryDrawer />
      <GICertificateModal />
      <AuthModal />
      <MeraPitaraDrawer />
      <ArtisanStoreQRModal />
      <AccountSettingsModal />

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Floating Role Switcher Pill for Judges */}
      <JudgeRoleSwitcher />
    </div>
  );
};

export default function App() {
  const [introFinished, setIntroFinished] = useState(() => {
    // Check if user already saw the intro in this session
    return Boolean(sessionStorage.getItem('artlynk_intro_played'));
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('artlynk_intro_played', 'true');
    setIntroFinished(true);
  };

  return (
    <AuthProvider>
      <ArtisanProvider>
        {!introFinished && <IntroLoader onComplete={handleIntroComplete} />}
        <MainLayout />
      </ArtisanProvider>
    </AuthProvider>
  );
}
