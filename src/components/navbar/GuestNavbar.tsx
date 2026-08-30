import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Map, 
  BookOpen, 
  Heart,
  LogIn, 
  Menu, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSelector } from '../LanguageSelector';
import { ArtLynkLogo } from '../ArtLynkLogo';
import { ThemeToggle } from '../ThemeToggle';

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

  return (
    <header 
      id="guest-sticky-navbar"
      className={`sticky top-0 z-50 w-full max-w-full box-border transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#5C2A12]/98 backdrop-blur-xl shadow-2xl border-b border-amber-500/30' 
          : 'bg-[#703816]/95 backdrop-blur-md shadow-lg border-b border-white/10'
      } text-white`}
    >
      {/* Top Auspicious Subtle Ribbon */}
      <div className={`h-[2.5px] w-full bg-linear-to-r from-[#A84A2C] via-[#B88E28] to-[#2D6A4F] transition-opacity duration-300 ${isScrolled ? 'opacity-100 shadow-[0_0_12px_rgba(212,175,55,0.6)]' : 'opacity-80'}`} />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 box-border">
        {/* RESPONSIVE NAVBAR CONTAINER */}
        <div className={`w-full max-w-full ${isScrolled ? 'h-13 sm:h-16' : 'h-14 sm:h-18'} px-1 sm:px-2 py-1.5 sm:py-0 flex items-center justify-between box-border gap-2 sm:gap-4 transition-all duration-300`}>
          
          {/* ========================================================= */}
          {/* 1. LEFT: Brand Logo + ArtLynk Text (shrink-0) */}
          {/* ========================================================= */}
          <div 
            id="guest-brand-logo"
            onClick={() => handleNavClick('bazaar')}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none group shrink-0 min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-stone-900/80 border border-amber-500/30 p-1 group-hover:border-amber-400/60 transition-colors">
              <ArtLynkLogo size={22} className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-white shrink-0 tracking-wide leading-none">
                  {t.app_name || 'ArtLynk'}
                </span>
                <span className="hidden 2xl:inline-flex items-center gap-1 text-[10px] font-sans font-bold bg-[#B88E28]/20 text-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#B88E28]/40 whitespace-nowrap shrink-0">
                  <span>✨</span>
                  <span>{t.app_badge_handmade || '100% Indian Handmade'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CENTER: Floating / Pill Navigation Menu Container (Desktop lg+) */}
          {/* ========================================================= */}
          <nav 
            id="guest-desktop-pill-nav"
            className="hidden lg:flex items-center justify-center bg-[#4A1E0B]/85 backdrop-blur-md px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 rounded-full border border-amber-500/20 gap-2.5 lg:gap-3 xl:gap-5 text-xs xl:text-sm text-stone-200 shadow-inner shrink min-w-0"
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
              <ShoppingBag className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 shrink-0" />
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
              <BookOpen className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 shrink-0" />
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
              <Map className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-emerald-400 shrink-0" />
              <span>{t.nav_map || 'GI Map'}</span>
            </button>
          </nav>

          {/* ========================================================= */}
          {/* 3. RIGHT: Action Group (Theme Toggle + Language + Login/Join) */}
          {/* ========================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-end">
            
            {/* Theme Toggle (Moon/Sun icon) */}
            <ThemeToggle 
              id="guest-theme-toggle" 
              className="p-1 sm:p-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center shrink-0 transition-colors"
            />

            {/* Wishlist / Mera Pitara Heart Button for Guest */}
            <button
              id="guest-nav-wishlist-btn"
              onClick={handleOpenAuth}
              title={t.nav_pitara || 'Wishlist / Mera Pitara'}
              aria-label="Wishlist"
              className="relative p-1 sm:p-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300 hover:text-rose-400 transition-colors" />
            </button>

            {/* Language Selector Dropdown */}
            <LanguageSelector 
              id="guest-language-selector" 
              buttonClassName="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[11px] sm:text-xs rounded-full flex items-center gap-1 shrink-0 font-medium border border-amber-500/40 bg-[#A0522D] text-white hover:border-amber-400 hover:bg-[#8B4513] transition shadow-2xs cursor-pointer"
            />

            {/* Login / Join Button */}
            <button
              id="guest-btn-open-auth"
              onClick={handleOpenAuth}
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-full bg-[#A0522D] hover:bg-[#8B4513] border border-amber-400/40 text-white flex items-center gap-1 shrink-0 whitespace-nowrap shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>LOGIN</span>
              <span className="hidden xs:inline">/ JOIN</span>
            </button>

            {/* Mobile/Tablet Hamburger Toggle Button */}
            <button
              id="guest-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-stone-300 hover:text-white bg-white/5 lg:hidden border border-white/10 flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#5C2A12] px-4 py-4 space-y-3 shadow-2xl backdrop-blur-xl"
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
                transition={{ delay: 0.18 }}
                onClick={handleOpenAuth}
                className="w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer text-stone-300 hover:bg-white/5 transition-all"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>{t.nav_pitara || 'Wishlist / Mera Pitara'}</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="px-3.5 py-1.5 flex items-center justify-between"
              >
                <span className="text-stone-400 text-xs font-medium">Theme Mode</span>
                <ThemeToggle id="guest-mobile-theme-toggle" />
              </motion.div>

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
