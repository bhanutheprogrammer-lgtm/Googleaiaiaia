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
  Sparkles,
  Menu,
  X,
  Compass,
  PhoneCall,
  Info
} from 'lucide-react';
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
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-40 w-full bg-[#121c2b]/90 backdrop-blur-md text-white border-b border-white/10 shadow-lg transition-all">
      {/* Top Auspicious & Heritage Subtle Ribbon */}
      <div className="h-[2.5px] w-full bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#2D6A4F]" />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* MODERN 3-PART SEPARATED NAVBAR (DESKTOP) */}
        <div className="w-full h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
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

              {/* USER PROFILE DROPDOWN MENU */}
              {profileDropdownOpen && (
                <div 
                  id="buyer-profile-dropdown-menu"
                  className="absolute right-0 top-full mt-2 w-48 bg-[#0c1f30] border border-amber-500/30 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-stone-200"
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
                      <span>Profile</span>
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
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="buyer-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-300 hover:text-white bg-white/5 md:hidden border border-white/10 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE COLLAPSIBLE MENU */}
      {mobileMenuOpen && (
        <div 
          id="buyer-mobile-drawer"
          className="md:hidden border-t border-white/10 bg-[#0C1F30] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <img
              src={buyerUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={buyerName}
              className="w-10 h-10 rounded-full object-cover border border-amber-400/60"
            />
            <div>
              <p className="text-sm font-bold text-amber-200 font-serif">{buyerName}</p>
              <p className="text-xs text-emerald-400">🌟 {buyerUser?.patronLevel || 'Level 2 Patron'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1 font-sans text-xs">
            <button
              onClick={() => handleNavClick('bazaar')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'bazaar' ? 'bg-[#A84A2C] text-white font-bold' : 'text-stone-300 hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>{t.nav_crafts || 'Explore Crafts'}</span>
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'stories' ? 'bg-[#A84A2C] text-white font-bold' : 'text-stone-300 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>{t.nav_stories || 'Heritage Stories'}</span>
            </button>

            <button
              onClick={() => handleNavClick('craft_map')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'craft_map' ? 'bg-[#2D6A4F] text-white font-bold' : 'text-stone-300 hover:bg-white/5'
              }`}
            >
              <Map className="w-4 h-4 text-emerald-300" />
              <span>{t.nav_map || 'GI Map'}</span>
            </button>

            <button
              onClick={handleOpenPitara}
              className="w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between text-stone-300 hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Wishlist</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#B83227] text-white text-[10px] font-bold">
                {wishlistIds.length}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('certificates')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'certificates' ? 'bg-[#B88E28] text-stone-950 font-bold' : 'text-stone-300 hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{t.nav_certificates || 'Certificates'} ({buyerUser?.purchasedCertificates?.length || 1})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAccountSettings();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 text-amber-300 hover:bg-white/5 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Account Settings & Profile</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 text-rose-300 hover:bg-rose-950/30 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
