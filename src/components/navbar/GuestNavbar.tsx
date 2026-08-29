import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Map, 
  BookOpen, 
  LogIn, 
  Sparkles, 
  Info,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSelector } from '../LanguageSelector';
import { ArtisanLinkLogo } from '../ArtisanLinkLogo';

interface GuestNavbarProps {
  onAuthClick?: () => void;
}

export const GuestNavbar: React.FC<GuestNavbarProps> = ({ onAuthClick }) => {
  const {
    t,
    activeTab,
    setActiveTab
  } = useArtisan();

  const { openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenAuth = () => {
    setMobileMenuOpen(false);
    if (onAuthClick) onAuthClick();
    else openAuthModal('buyer');
  };

  const handleNavClick = (tab: 'bazaar' | 'stories' | 'craft_map') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById('heritage-manifesto-footer') || document.querySelector('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('stories');
    }
  };

  return (
    <header 
      id="guest-sticky-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B1522]/98 backdrop-blur-xl shadow-2xl border-b border-amber-500/30' 
          : 'bg-[#121c2b]/95 backdrop-blur-md shadow-lg border-b border-white/10'
      } text-white`}
    >
      {/* Top Auspicious Subtle Ribbon */}
      <div className={`h-[2.5px] w-full bg-linear-to-r from-[#A84A2C] via-[#B88E28] to-[#2D6A4F] transition-opacity duration-300 ${isScrolled ? 'opacity-100 shadow-[0_0_12px_rgba(184,142,40,0.6)]' : 'opacity-80'}`} />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* MODERN 3-PART SEPARATED NAVBAR (DESKTOP) */}
        <div className={`w-full ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'} flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300`}>
          
          {/* ========================================================= */}
          {/* 1. LEFT: Brand Logo + ArtLynk Text (shrink-0) */}
          {/* ========================================================= */}
          <div 
            id="guest-brand-logo"
            onClick={() => handleNavClick('bazaar')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0 min-w-0"
          >
            <ArtisanLinkLogo size={36} className="shrink-0 group-hover:scale-105 transition-transform" />

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-[#FAF8F5] font-serif">
                  {t.app_name || 'ArtLynk'}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-sans font-bold bg-[#B88E28]/20 text-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#B88E28]/40 whitespace-nowrap">
                  <span>✨</span>
                  <span>{t.app_badge_handmade || '100% Indian Handmade'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CENTER: Floating / Pill Navigation Menu Container */}
          {/* ========================================================= */}
          <nav 
            id="guest-desktop-pill-nav"
            className="hidden md:flex items-center bg-stone-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 gap-6 text-sm text-stone-200 shadow-inner"
          >
            {/* Explore Crafts */}
            <button
              id="guest-nav-crafts-btn"
              onClick={() => handleNavClick('bazaar')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'bazaar'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{t.nav_crafts || 'Explore Crafts'}</span>
            </button>

            {/* Heritage Stories */}
            <button
              id="guest-nav-stories-btn"
              onClick={() => handleNavClick('stories')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'stories'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{t.nav_stories || 'Heritage Stories'}</span>
            </button>

            {/* GI Map */}
            <button
              id="guest-nav-map-btn"
              onClick={() => handleNavClick('craft_map')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'craft_map'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4 text-emerald-400" />
              <span>{t.nav_map || 'GI Map'}</span>
            </button>

            {/* Karigar Direct */}
            <button
              id="guest-nav-karigar-direct"
              onClick={() => handleOpenAuth()}
              className="transition-colors whitespace-nowrap cursor-pointer text-stone-300 hover:text-amber-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Karigar Direct</span>
            </button>

            {/* About */}
            <button
              id="guest-nav-about"
              onClick={handleAboutClick}
              className="transition-colors whitespace-nowrap cursor-pointer text-stone-300 hover:text-white flex items-center gap-1.5"
            >
              <Info className="w-4 h-4 text-stone-400" />
              <span>About</span>
            </button>
          </nav>

          {/* ========================================================= */}
          {/* 3. RIGHT: Action Group (Language Switch + Login/Join) */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* 11-Language Selector Dropdown */}
            <LanguageSelector 
              id="guest-language-selector" 
              buttonClassName="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/40 bg-[#0C243C] text-white hover:border-amber-400 hover:bg-[#123152] transition shadow-xs cursor-pointer shrink-0"
            />

            {/* Login / Join Button */}
            <button
              id="guest-btn-open-auth"
              onClick={handleOpenAuth}
              className="px-4 sm:px-5 py-2 rounded-full bg-linear-to-r from-[#A84A2C] to-[#C05621] hover:from-[#913D22] hover:to-[#A84A2C] text-white text-xs font-bold uppercase tracking-wider font-sans shadow-md cursor-pointer transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.nav_login || 'Login / Join'}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="guest-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-300 hover:text-white bg-white/5 md:hidden border border-white/10 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE COLLAPSIBLE MENU WITH SPRING ANIMATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="guest-mobile-drawer"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#0C1F30] px-4 py-4 space-y-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-1 font-sans text-xs">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => handleNavClick('bazaar')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'bazaar' ? 'bg-[#A84A2C] text-white font-bold' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>{t.nav_crafts || 'Explore Crafts'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => handleNavClick('stories')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'stories' ? 'bg-[#A84A2C] text-white font-bold' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>{t.nav_stories || 'Heritage Stories'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={() => handleNavClick('craft_map')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'craft_map' ? 'bg-[#2D6A4F] text-white font-bold' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <Map className="w-4 h-4 text-emerald-300" />
                <span>{t.nav_map || 'GI Map'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleAboutClick}
                className="w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 text-stone-300 hover:bg-white/5 cursor-pointer"
              >
                <Info className="w-4 h-4 text-stone-400" />
                <span>About Heritage Mission</span>
              </motion.button>

              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-2 border-t border-white/10"
              >
                <button
                  onClick={handleOpenAuth}
                  className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#A84A2C] to-[#C05621] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 transition-transform"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav_login || 'Login / Join ArtLynk'}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
