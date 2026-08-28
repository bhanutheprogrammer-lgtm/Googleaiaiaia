import React, { useState, useEffect, useRef } from 'react';
import { 
  Languages, 
  Sparkles, 
  ShoppingBag, 
  MapPin, 
  BookOpen, 
  UserCheck, 
  LogOut, 
  MessageSquare, 
  ChevronDown, 
  Flame, 
  ShieldCheck, 
  Heart, 
  QrCode, 
  Award, 
  User, 
  Layers, 
  ArrowRightLeft, 
  Settings,
  CheckCircle2
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';
import { ArtisanLinkLogo } from './ArtisanLinkLogo';
import { LanguageCode, UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    t,
    activeTab,
    setActiveTab,
    artisan,
    unreadInquiriesCount
  } = useArtisan();

  const {
    userRole,
    artisanUser,
    buyerUser,
    openAuthModal,
    logout,
    switchRole,
    wishlistIds,
    purchasedCertificates,
    setIsPitaraDrawerOpen,
    setIsStoreQRModalOpen,
    openAccountSettings
  } = useAuth();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  const currentArtisan = artisanUser || artisan;

  const handleLogoClick = () => {
    if (userRole === 'artisan') {
      setActiveTab('ledger');
    } else if (userRole === 'buyer') {
      setActiveTab('bazaar');
    } else {
      setActiveTab('bazaar');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6EE] bg-opacity-95 backdrop-blur-md border-b border-[#D4AF37]/40 shadow-md transition-all">
      {/* Top Auspicious Gold Border Ribbon */}
      <div className="h-[2px] w-full bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#E67E22]" />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="w-full h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-3 box-border overflow-hidden">
          
          {/* Logo & Brand Identity - Editorial Style */}
          <div 
            id="brand-logo"
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group select-none shrink-0 min-w-0"
          >
            <ArtisanLinkLogo size={36} className="shrink-0" />

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-tighter leading-none text-[#0C243C] font-serif">
                  {t.app_name || 'ArtLynk'}
                </span>
                {userRole === 'artisan' && (
                  <span className="hidden sm:inline-block text-[9px] font-sans font-bold bg-[#B88E28]/20 text-[#0C243C] px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap border border-[#B88E28]/40">
                    Karigar Studio
                  </span>
                )}
                {userRole === 'buyer' && (
                  <span className="hidden sm:inline-block text-[9px] font-sans font-bold bg-[#0C243C] text-amber-300 px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#D4AF37]/50 whitespace-nowrap">
                    Patron
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center Navigation Links - Role-Specific */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-5 font-sans text-xs uppercase tracking-wider font-semibold">
            
            {/* GUEST NAVIGATION */}
            {userRole === 'guest' && (
              <>
                <button
                  id="nav-bazaar-btn"
                  onClick={() => setActiveTab('bazaar')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'bazaar'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  {t.nav_crafts}
                </button>

                <button
                  id="nav-stories-btn"
                  onClick={() => setActiveTab('stories')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'stories'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  {t.nav_stories}
                </button>

                <button
                  id="nav-map-btn"
                  onClick={() => setActiveTab('craft_map')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'craft_map'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  {t.nav_map}
                </button>
              </>
            )}

            {/* ARTISAN (SELLER) NAVIGATION */}
            {userRole === 'artisan' && (
              <>
                <button
                  id="nav-scan-btn"
                  onClick={() => setActiveTab('scan_studio')}
                  className={`py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'scan_studio'
                      ? 'text-[#E67E22] border-b-2 border-[#E67E22] font-bold'
                      : 'text-[#E67E22] hover:text-[#B83227]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.nav_scan}</span>
                </button>

                <button
                  id="nav-ledger-btn"
                  onClick={() => setActiveTab('ledger')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'ledger'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  {t.nav_catalog}
                </button>

                <button
                  id="nav-inquiries-btn"
                  onClick={() => setActiveTab('inquiries')}
                  className={`relative py-1.5 transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'inquiries'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#27AE60]" />
                  <span>{t.nav_inquiries}</span>
                  {unreadInquiriesCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#B83227] text-white text-[9px] font-bold">
                      {unreadInquiriesCount}
                    </span>
                  )}
                </button>

                <button
                  id="nav-store-qr-btn"
                  onClick={() => setIsStoreQRModalOpen(true)}
                  className="py-1.5 transition-colors cursor-pointer flex items-center gap-1 text-[#0C243C] hover:text-[#B83227]"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-700" />
                  <span>Store QR (दुकान QR)</span>
                </button>

                <button
                  id="nav-explore-btn"
                  onClick={() => setActiveTab('bazaar')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'bazaar'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  Public Bazaar
                </button>
              </>
            )}

            {/* BUYER (PATRON) NAVIGATION */}
            {userRole === 'buyer' && (
              <>
                <button
                  id="nav-bazaar-buyer-btn"
                  onClick={() => setActiveTab('bazaar')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'bazaar'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  Marketplace
                </button>

                <button
                  id="nav-virasat-btn"
                  onClick={() => setActiveTab('virasat_feed')}
                  className={`py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'virasat_feed'
                      ? 'text-[#0C243C] border-b-2 border-[#0C243C] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Virasat Feed</span>
                </button>

                <button
                  id="nav-pitara-btn"
                  onClick={() => setActiveTab('pitara')}
                  className={`relative py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'pitara'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-[#B83227]" />
                  <span>Wishlist</span>
                  {wishlistIds.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#B83227] text-white text-[9px] font-bold">
                      {wishlistIds.length}
                    </span>
                  )}
                </button>

                <button
                  id="nav-vault-btn"
                  onClick={() => setActiveTab('certificates')}
                  className={`py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'certificates'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>GI Certificates ({purchasedCertificates.length})</span>
                </button>

                <button
                  id="nav-stories-buyer-btn"
                  onClick={() => setActiveTab('stories')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'stories'
                      ? 'text-[#B83227] border-b-2 border-[#B83227] font-bold'
                      : 'text-[#0C243C] hover:text-[#B83227]'
                  }`}
                >
                  {t.nav_stories}
                </button>
              </>
            )}

          </nav>

          {/* Right Controls: Multilingual Selector + Auth / Profile Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Quick Wishlist Icon for Buyers */}
            {userRole === 'buyer' && (
              <button
                id="header-pitara-trigger-btn"
                onClick={() => setIsPitaraDrawerOpen(true)}
                className="relative p-1.5 sm:p-2 rounded-xl bg-white border border-[#D4AF37]/50 text-[#B83227] hover:bg-amber-50 transition-colors cursor-pointer shadow-xs shrink-0"
                title="Open Wishlist Drawer"
              >
                <Heart className="w-4 h-4 fill-[#B83227]" />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#B83227] text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    {wishlistIds.length}
                  </span>
                )}
              </button>
            )}

            {/* 11-Language Switcher Dropdown with Click-Outside handler */}
            <LanguageSelector 
              id="language-selector" 
              buttonClassName="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-[#D4AF37]/50 bg-white text-[#0C243C] hover:border-[#B83227] transition-all cursor-pointer shadow-xs shrink-0"
            />

            {/* GUEST: Login / Register Button */}
            {userRole === 'guest' && (
              <button
                id="guest-login-modal-btn"
                onClick={() => openAuthModal('artisan', 'login')}
                className="bg-[#0C243C] text-amber-300 hover:bg-[#B83227] hover:text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all text-xs font-sans uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#D4AF37] shrink-0 whitespace-nowrap"
              >
                <span>🪔</span>
                <span className="hidden xs:inline">Login / Register</span>
                <span className="xs:hidden">Login</span>
              </button>
            )}

            {/* LOGGED IN: Profile Avatar + Role Switcher Menu */}
            {userRole !== 'guest' && (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0C243C] text-[#FAF6EE] text-xs cursor-pointer border border-[#D4AF37] hover:border-amber-400 transition-all shadow-xs"
                >
                  <img
                    src={userRole === 'artisan' ? currentArtisan.photo : (buyerUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')}
                    alt="Profile"
                    className="w-7 h-7 rounded-lg object-cover border border-[#D4AF37]"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="font-bold text-[11px] leading-tight text-amber-200 truncate max-w-[110px]">
                      {userRole === 'artisan' ? currentArtisan.name : (buyerUser?.name || 'Ananya Sharma')}
                    </p>
                    <p className="text-[9px] text-stone-300 font-sans">
                      {userRole === 'artisan' ? 'Master Artisan' : 'Heritage Patron'}
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {/* Profile & Instant Persona Switcher Dropdown */}
                {profileDropdownOpen && (
                  <div 
                    id="profile-dropdown-menu"
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#FAF6EE] border-2 border-[#D4AF37] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {/* User Summary */}
                    <div className="px-4 pb-3 border-b border-stone-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={userRole === 'artisan' ? currentArtisan.photo : (buyerUser?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')}
                          alt="User"
                          className="w-10 h-10 rounded-xl object-cover border border-[#D4AF37]"
                        />
                        <div>
                          <p className="text-xs font-bold font-serif text-[#0C243C]">
                            {userRole === 'artisan' ? currentArtisan.name : (buyerUser?.name || 'Ananya Sharma')}
                          </p>
                          <p className="text-[10px] text-stone-500 font-sans">
                            {userRole === 'artisan' ? `📍 ${currentArtisan.village}, ${currentArtisan.state}` : buyerUser?.email}
                          </p>
                          <span className="inline-block mt-0.5 text-[9px] font-bold font-sans uppercase px-2 py-0.5 rounded-md bg-[#0C243C] text-amber-300">
                            {userRole === 'artisan' ? ' कारीगर Mode' : '🛍️ कला प्रेमी Patron Mode'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Switch Persona Section */}
                    <div className="p-3 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-sans px-1">
                        Instant Persona Switcher (For Testing)
                      </p>

                      <button
                        onClick={() => {
                          switchRole('artisan');
                          setActiveTab('scan_studio');
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-serif flex items-center justify-between transition-colors cursor-pointer ${
                          userRole === 'artisan'
                            ? 'bg-[#B83227] text-white font-bold'
                            : 'bg-white hover:bg-stone-100 text-[#0C243C]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🪔</span>
                          <span>Ustad Rameshwar (Artisan)</span>
                        </span>
                        {userRole === 'artisan' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>

                      <button
                        onClick={() => {
                          switchRole('buyer');
                          setActiveTab('bazaar');
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-serif flex items-center justify-between transition-colors cursor-pointer ${
                          userRole === 'buyer'
                            ? 'bg-[#0C243C] text-amber-300 font-bold'
                            : 'bg-white hover:bg-stone-100 text-[#0C243C]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🛍️</span>
                          <span>Ananya Sharma (Buyer)</span>
                        </span>
                        {userRole === 'buyer' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                      </button>

                      <button
                        onClick={() => {
                          switchRole('guest');
                          setActiveTab('bazaar');
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans flex items-center justify-between transition-colors cursor-pointer ${
                          userRole === 'guest'
                            ? 'bg-stone-800 text-white font-bold'
                            : 'bg-white hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>👁️</span>
                          <span>Guest Mode (Logged Out)</span>
                        </span>
                      </button>
                    </div>

                    {/* Account Settings & Profile Modification */}
                    <div className="pt-2 px-3 border-t border-stone-200">
                      <button
                        id="nav-account-settings-btn"
                        onClick={() => {
                          openAccountSettings();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold font-sans text-[#0C243C] hover:bg-amber-50 flex items-center justify-between transition-colors cursor-pointer border border-[#D4AF37]/50 shadow-2xs mb-2"
                      >
                        <span className="flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-[#B83227]" />
                          <span>⚙️ Account Settings</span>
                        </span>
                        <span className="text-[10px] text-stone-600 font-sans font-normal">Edit Profile</span>
                      </button>

                      <button
                        id="nav-logout-btn"
                        onClick={() => {
                          logout();
                          setActiveTab('bazaar');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold font-sans text-[#B83227] hover:bg-red-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout from Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
