import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Package, 
  MessageSquare, 
  Calculator,
  QrCode,
  ChevronDown, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSelector } from '../LanguageSelector';
import { ArtisanLinkLogo } from '../ArtisanLinkLogo';

export const ArtisanNavbar: React.FC = () => {
  const {
    t,
    activeTab,
    setActiveTab,
    unreadInquiriesCount
  } = useArtisan();

  const {
    artisanUser,
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

  const artisanName = artisanUser?.name || 'Ustad Rameshwar Rao';

  const handleNavClick = (tab: 'scan_studio' | 'ledger' | 'inquiries' | 'fair_pricing' | 'store_qr') => {
    setActiveTab(tab as any);
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById('heritage-manifesto-footer') || document.querySelector('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="artisan-sticky-navbar"
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
            id="artisan-brand-logo"
            onClick={() => handleNavClick('scan_studio')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0 min-w-0"
          >
            <ArtisanLinkLogo size={36} className="shrink-0 group-hover:scale-105 transition-transform" />

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-[#FAF8F5] font-serif">
                  {t.app_name || 'ArtLynk'}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-sans font-bold bg-[#B88E28]/20 text-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#B88E28]/40 whitespace-nowrap">
                  <span>🪔</span>
                  <span>{t.nav_artisan_badge || 'Karigar Studio'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CENTER: Floating / Pill Navigation Menu Container */}
          {/* ========================================================= */}
          <nav 
            id="artisan-desktop-pill-nav"
            className="hidden md:flex items-center bg-stone-900/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 gap-5 lg:gap-6 text-sm text-stone-200 shadow-inner"
          >
            {/* AI Scan Studio */}
            <button
              id="artisan-nav-scan-btn"
              onClick={() => handleNavClick('scan_studio')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scan_studio'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.nav_scan || 'AI Scan Studio'}</span>
            </button>

            {/* My Catalog */}
            <button
              id="artisan-nav-catalog-btn"
              onClick={() => handleNavClick('ledger')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ledger'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>{t.nav_catalog || 'My Catalog'}</span>
            </button>

            {/* Buyer Inquiries */}
            <button
              id="artisan-nav-inquiries-btn"
              onClick={() => handleNavClick('inquiries')}
              className={`relative transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{t.nav_inquiries || 'Buyer Leads'}</span>
              {unreadInquiriesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-black border border-white/60">
                  {unreadInquiriesCount}
                </span>
              )}
            </button>

            {/* Fair Pricing */}
            <button
              id="artisan-nav-pricing-btn"
              onClick={() => handleNavClick('fair_pricing')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'fair_pricing'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.nav_pricing || 'Fair Pricing'}</span>
            </button>

            {/* Store QR */}
            <button
              id="artisan-nav-qr-btn"
              onClick={() => handleNavClick('store_qr')}
              className={`transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'store_qr'
                  ? 'text-amber-300 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4 text-purple-400" />
              <span>{t.nav_qr || 'Store QR'}</span>
            </button>

            {/* About */}
            <button
              id="artisan-nav-about-btn"
              onClick={handleAboutClick}
              className="transition-colors whitespace-nowrap cursor-pointer text-stone-300 hover:text-white flex items-center gap-1.5"
            >
              <Info className="w-4 h-4 text-stone-400" />
              <span>About</span>
            </button>
          </nav>

          {/* ========================================================= */}
          {/* 3. RIGHT: Action Group (Language + Artisan Avatar Trigger) */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* 11-Language Selector Dropdown */}
            <LanguageSelector 
              id="artisan-language-selector" 
              buttonClassName="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/40 bg-[#0C243C] text-white hover:border-amber-400 hover:bg-[#123152] transition shadow-xs cursor-pointer shrink-0"
            />

            {/* USER PROFILE TRIGGER: Circular avatar + ChevronDown */}
            <div className="relative shrink-0" ref={profileDropdownRef}>
              <button
                id="artisan-profile-menu-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/10 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer group"
                aria-label="Artisan Menu"
              >
                <img
                  src={artisanUser?.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
                  alt={artisanName}
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
                    id="artisan-profile-dropdown-menu"
                    initial={{ opacity: 0, scale: 0.92, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-[#0c1f30] border border-amber-500/30 rounded-2xl p-2 shadow-2xl z-50 text-stone-200 origin-top-right backdrop-blur-xl"
                  >
                    {/* Artisan Mini Summary */}
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-amber-200 truncate font-serif">
                        {artisanName}
                      </p>
                      <p className="text-[10px] text-amber-300/80 font-sans">
                        🪔 {artisanUser?.masterTitle || 'Master Artisan'}
                      </p>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {/* Item 1: Profile ("Account Settings & Profile") */}
                      <button
                        id="artisan-dropdown-open-profile-btn"
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
                        id="artisan-dropdown-signout-btn"
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
              id="artisan-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-300 hover:text-white bg-white/5 md:hidden border border-white/10 cursor-pointer active:scale-95 transition-transform"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE COLLAPSIBLE MENU WITH RICH SPRING ANIMATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="artisan-mobile-drawer"
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
                src={artisanUser?.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
                alt={artisanName}
                className="w-10 h-10 rounded-full object-cover border border-amber-400/60"
              />
              <div>
                <p className="text-sm font-bold text-amber-200 font-serif">{artisanName}</p>
                <p className="text-xs text-amber-300">🪔 {artisanUser?.masterTitle || 'Master Artisan'}</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-1 pt-1 font-sans text-xs">
              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 }}
                onClick={() => handleNavClick('scan_studio')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'scan_studio' ? 'bg-[#A84A2C] text-white font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.nav_scan || 'AI Scan Studio'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                onClick={() => handleNavClick('ledger')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'ledger' ? 'bg-[#B88E28] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4 text-amber-300" />
                <span>{t.nav_catalog || 'My Catalog'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16 }}
                onClick={() => handleNavClick('inquiries')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  activeTab === 'inquiries' ? 'bg-[#2D6A4F] text-white font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>{t.nav_inquiries || 'Buyer Leads'}</span>
                </div>
                {unreadInquiriesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                    {unreadInquiriesCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => handleNavClick('fair_pricing')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'fair_pricing' ? 'bg-[#B88E28] text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>{t.nav_pricing || 'Fair Pricing'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24 }}
                onClick={() => handleNavClick('store_qr')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                  activeTab === 'store_qr' ? 'bg-purple-900 text-white font-bold shadow-sm' : 'text-stone-300 hover:bg-white/5'
                }`}
              >
                <QrCode className="w-4 h-4 text-purple-300" />
                <span>{t.nav_qr || 'Store QR'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -12 }}
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
                initial={{ opacity: 0, x: -12 }}
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
