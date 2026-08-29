import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Map, 
  Heart, 
  Award, 
  BookOpen, 
  ChevronDown, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Info,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSelector } from '../LanguageSelector';
import { ArtisanLinkLogo } from '../ArtisanLinkLogo';

export const BuyerNavbar: React.FC = () => {
  const {
    t,
    activeTab,
    setActiveTab
  } = useArtisan();

  const {
    buyerUser,
    wishlistIds,
    setIsPitaraDrawerOpen,
    logout,
    openAccountSettings
  } = useAuth();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const buyerName = buyerUser?.name || 'Ananya Sharma';

  const handleNavClick = (tab: 'bazaar' | 'craft_map' | 'certificates' | 'stories') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
    // Smooth scroll to footer or heritage manifesto
    const element = document.getElementById('heritage-manifesto-footer') || document.querySelector('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('stories');
    }
  };

  const handleOpenPitara = () => {
    setIsPitaraDrawerOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="buyer-sticky-navbar"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B1522]/98 backdrop-blur-xl shadow-2xl border-b border-amber-500/30' 
          : 'bg-[#121c2b]/95 backdrop-blur-md shadow-lg border-b border-white/10'
      } text-white`}
    >
      {/* Top Auspicious & Heritage Subtle Ribbon */}
      <div className={`h-[2.5px] w-full bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#2D6A4F] transition-opacity duration-300 ${isScrolled ? 'opacity-100 shadow-[0_0_12px_rgba(184,142,40,0.6)]' : 'opacity-80'}`} />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* MODERN 3-PART SEPARATED NAVBAR (DESKTOP) */}
        <div className={`w-full ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'} flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300`}>
          
          {/* ========================================================= */}
          {/* 1. LEFT: Brand Logo + ArtLynk Text (shrink-0) */}
          {/* ========================================================= */}
          <div 
            id="buyer-brand-logo"
            onClick={() => handleNavClick('bazaar')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0 min-w-0"
          >
            <ArtisanLinkLogo size={36} className="shrink-0 group-hover:scale-105 transition-transform" />

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-[#FAF8F5] font-serif">
                  {t.app_name || 'ArtLynk'}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-sans font-bold bg-[#2D6A4F]/40 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-400/40 whitespace-nowrap">
                  <span>🛍️</span>
                  <span>{t.nav_patron_badge || 'Art Patron'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CENTER: Floating / Pill Navigation Menu Container */}
          {/* ========================================================= */}
          <nav 
            id="buyer-desktop-pill-nav"
            className="hidden md:flex items-center bg-stone-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 gap-6 text-sm text-stone-200 shadow-inner"
          >
            {/* Explore Crafts */}
            <button
              id="buyer-nav-explore-crafts"
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
              id="buyer-nav-heritage-stories"
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
              id="buyer-nav-gi-map"
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
              id="buyer-nav-karigar-direct"
              onClick={() => handleNavClick('bazaar')}
              className="transition-colors whitespace-nowrap cursor-pointer text-stone-300 hover:text-amber-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Karigar Direct</span>
            </button>

            {/* About */}
            <button
              id="buyer-nav-about"
              onClick={handleAboutClick}
              className="transition-colors whitespace-nowrap cursor-pointer text-stone-300 hover:text-white flex items-center gap-1.5"
            >
              <Info className="w-4 h-4 text-stone-400" />
              <span>About</span>
            </button>
          </nav>

          {/* ========================================================= */}
          {/* 3. RIGHT: Action Group (Wishlist + Language + Profile Trigger) */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Wishlist Button */}
            <button
              id="buyer-nav-wishlist-btn"
              onClick={handleOpenPitara}
              title="Wishlist"
              className="relative p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'text-rose-400 fill-rose-400' : 'text-stone-300'}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#B83227] text-white text-[9px] font-black border border-white/80">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Compact Language Selector */}
            <LanguageSelector 
              id="buyer-language-selector" 
              buttonClassName="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/40 bg-[#0C243C] text-white hover:border-amber-400 hover:bg-[#123152] transition shadow-xs cursor-pointer shrink-0"
            />

            {/* USER PROFILE TRIGGER: Circular avatar + ChevronDown */}
            <div className="relative shrink-0" ref={profileDropdownRef}>
              <button
                id="buyer-profile-menu-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/10 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer group"
                aria-label="User Menu"
              >
                <img
                  src={buyerUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt={buyerName}
                  className="w-8 h-8 rounded-full object-cover border-2 border-amber-400/60 shadow-sm"
                />
                <ChevronDown 
                  className={`w-3.5 h-3.5 text-stone-300 group-hover:text-amber-300 transition-transform duration-200 mr-1 ${
                    profileDropdownOpen ? 'rotate-180 text-amber-300' : ''
                  }`} 
                />
              </button>

              {/* USER PROFILE DROPDOWN MENU WITH MOTION ANIMATION */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div 
                    id="buyer-profile-dropdown-menu"
                    initial={{ opacity: 0, scale: 0.92, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-[#0c1f30] border border-amber-500/30 rounded-2xl p-2 shadow-2xl z-50 text-stone-200 origin-top-right backdrop-blur-xl"
                  >
                    {/* User Mini Summary */}
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-amber-200 truncate font-serif">
                        {buyerName}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-sans font-semibold">
                        🌟 {buyerUser?.patronLevel || 'Patron'}
                      </p>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {/* Item 1: Profile ("Account Settings & Profile") */}
                      <button
                        id="dropdown-open-profile-btn"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          openAccountSettings();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-white/10 hover:text-amber-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-amber-400" />
                        <span>Profile & Settings</span>
                      </button>

                      {/* Item 2: Sign Out */}
                      <button
                        id="dropdown-signout-btn"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="buyer-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-300 hover:text-white bg-white/5 md:hidden border border-white/10 cursor-pointer active:scale-95 transition-transform"
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
            id="buyer-mobile-drawer"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#0C1F30] px-4 py-4 space-y-3 shadow-2xl backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-3 pb-3 border-b border-white/10"
            >
              <img
                src={buyerUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={buyerName}
                className="w-10 h-10 rounded-full object-cover border border-amber-400/60"
              />
              <div>
                <p className="text-sm font-bold text-amber-200 font-serif">{buyerName}</p>
                <p className="text-xs text-emerald-400">🌟 {buyerUser?.patronLevel || 'Level 2 Patron'}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-1 pt-1 font-sans text-xs">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 }}
                onClick={() => handleNavClick('bazaar')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'bazaar' ? 'bg-[#A84A2C] text-white font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>{t.nav_crafts || 'Explore Crafts'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                onClick={() => handleNavClick('stories')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'stories' ? 'bg-[#A84A2C] text-white font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>{t.nav_stories || 'Heritage Stories'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16 }}
                onClick={() => handleNavClick('craft_map')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'craft_map' ? 'bg-[#2D6A4F] text-white font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <Map className="w-4 h-4 text-emerald-300" />
                <span>{t.nav_map || 'GI Map'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleOpenPitara}
                className="w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between text-stone-300 hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Wishlist</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#B83227] text-white text-[10px] font-bold">
                  {wishlistIds.length}
                </span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24 }}
                onClick={() => handleNavClick('certificates')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'certificates' ? 'bg-[#B88E28] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>{t.nav_certificates || 'Certificates'} ({buyerUser?.purchasedCertificates?.length || 1})</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAccountSettings();
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 text-amber-300 hover:bg-white/5 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Account Settings & Profile</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 text-rose-300 hover:bg-rose-950/30 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
