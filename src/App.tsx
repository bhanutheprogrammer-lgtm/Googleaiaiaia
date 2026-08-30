import React, { useEffect, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArtisanProvider, useArtisan } from './context/ArtisanContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ArtisanProfile, BuyerProfile } from './types';
import { IntroLoader } from './components/IntroLoader';
import { LanguageGatewayScreen } from './components/LanguageGatewayScreen';
import { TutorialPromptScreen } from './components/TutorialPromptScreen';
import { AppTourGuide } from './components/AppTourGuide';

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
import { PersonaTransitionScreen } from './components/PersonaTransitionScreen';

const MainContent: React.FC = () => {
  const { userRole, currentUser, openAuthModal } = useAuth();
  const { isDarkMode } = useTheme();

  const containerBgClass = isDarkMode ? 'bg-jaali-dark text-[#F5F0E8]' : 'bg-[#FAF8F5] text-[#1E2838]';

  // 1. ARTISAN / SELLER VIEW: Renders ONLY the Artisan Workshop Studio
  if (userRole === 'artisan') {
    return (
      <div id="artisan-role-container" className={`min-h-screen ${containerBgClass} flex flex-col justify-between w-full m-0 p-0 transition-colors duration-300`}>
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
      <div id="buyer-role-container" className={`min-h-screen ${containerBgClass} flex flex-col justify-between w-full m-0 p-0 transition-colors duration-300`}>
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
    <div id="guest-role-container" className={`min-h-screen ${containerBgClass} flex flex-col justify-between w-full m-0 p-0 transition-colors duration-300`}>
      <GuestNavbar onAuthClick={() => openAuthModal('buyer')} />
      <div className="w-full flex-1">
        <PublicMarketplaceView onAuthPrompt={(role) => openAuthModal(role || 'buyer')} />
      </div>
      <Footer />
    </div>
  );
};

const MainLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { userRole } = useAuth();
  const { activeTab, crafts, isTourOpen, closeTour } = useArtisan();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Initialize Locomotive Scroll & Lenis across all role views & tabs
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      },
    });

    (window as any).locomotiveScroll = locomotiveScroll;
    
    // Proxy lenis methods for modal scroll locking & precise programmatic scrolling
    (window as any).lenis = {
      stop: () => {
        try {
          locomotiveScroll.stop?.();
          (locomotiveScroll as any).lenisInstance?.stop?.();
        } catch {
          // ignore
        }
      },
      start: () => {
        try {
          locomotiveScroll.start?.();
          (locomotiveScroll as any).lenisInstance?.start?.();
        } catch {
          // ignore
        }
      },
      scrollTo: (target: any, options: any) => {
        try {
          locomotiveScroll.scrollTo?.(target, options);
          (locomotiveScroll as any).lenisInstance?.scrollTo?.(target, options);
        } catch {
          window.scrollTo({ top: typeof target === 'number' ? target : 0, behavior: 'smooth' });
        }
      },
      resize: () => {
        try {
          (locomotiveScroll as any).lenisInstance?.resize?.();
          (locomotiveScroll as any).resize?.();
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      },
      raf: () => {},
    };

    // Auto-Resize observer on DOM container height changes (tab switch, scan result, filtering)
    let resizeTimer: any = null;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        try {
          (locomotiveScroll as any).lenisInstance?.resize?.();
          (locomotiveScroll as any).resize?.();
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      }, 50);
    });

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }
    if (document.body) {
      observer.observe(document.body);
    }

    return () => {
      observer.disconnect();
      clearTimeout(resizeTimer);
      (window as any).locomotiveScroll = undefined;
      (window as any).lenis = undefined;
      try {
        locomotiveScroll.destroy();
      } catch {
        // ignore
      }
    };
  }, []);

  // When activeTab, userRole or crafts list changes, smoothly reset scroll and refresh scroll boundaries
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const t1 = setTimeout(() => {
      if (lenis && typeof lenis.resize === 'function') {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 100);

    const t2 = setTimeout(() => {
      if (lenis && typeof lenis.resize === 'function') {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeTab, userRole, crafts.length]);

  return (
    <div 
      ref={scrollContainerRef}
      data-scroll-container 
      className={`min-h-screen ${
        isDarkMode ? 'bg-jaali-dark text-[#F5F0E8]' : 'bg-[#FAF8F5] text-[#1E2838]'
      } flex flex-col justify-between font-sans selection:bg-[#A84A2C]/20 selection:text-[#A84A2C] w-full overflow-x-hidden m-0 p-0 transition-colors duration-300 relative`}
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

      {/* Full-Screen Persona Switch Transition Screen with React Bits BlurText */}
      <PersonaTransitionScreen />

      {/* Autonomous Multilingual & Voice-Guided App Tour Engine */}
      <AppTourGuide isActive={isTourOpen} onComplete={closeTour} />
    </div>
  );
};

const AppFlow: React.FC = () => {
  const { startTour, closeTour } = useArtisan();
  const [introFinished, setIntroFinished] = useState(false);
  const [gatewayFinished, setGatewayFinished] = useState(false);
  const [tutorialPromptFinished, setTutorialPromptFinished] = useState(() => {
    try {
      return (
        localStorage.getItem('artisan_link_has_seen_tour_v1') === 'true' ||
        localStorage.getItem('artlynk_has_seen_tour') === 'true' ||
        sessionStorage.getItem('artlynk_tutorial_done') === 'true'
      );
    } catch {
      return false;
    }
  });

  const handleIntroComplete = () => {
    setIntroFinished(true);
  };

  const handleGatewayComplete = () => {
    setGatewayFinished(true);
  };

  const handleStartTour = () => {
    setTutorialPromptFinished(true);
    startTour();
  };

  const handleSkipTour = () => {
    try {
      localStorage.setItem('artisan_link_has_seen_tour_v1', 'true');
      localStorage.setItem('artlynk_has_seen_tour', 'true');
      sessionStorage.setItem('artlynk_tutorial_done', 'true');
    } catch {
      // ignore
    }
    closeTour();
    setTutorialPromptFinished(true);
  };

  return (
    <>
      {!introFinished ? (
        <IntroLoader onComplete={handleIntroComplete} />
      ) : !gatewayFinished ? (
        <LanguageGatewayScreen onComplete={handleGatewayComplete} />
      ) : !tutorialPromptFinished ? (
        <TutorialPromptScreen 
          onStartTour={handleStartTour} 
          onSkipTour={handleSkipTour} 
        />
      ) : (
        <MainLayout />
      )}
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ArtisanProvider>
          <AppFlow />
        </ArtisanProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
