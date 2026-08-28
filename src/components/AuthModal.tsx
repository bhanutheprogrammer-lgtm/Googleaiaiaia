import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  UserCheck, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Layers, 
  Heart,
  Eye,
  KeyRound,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';
import { CraftCategory, LanguageCode } from '../types';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { authTranslations, AuthTranslationDictionary } from '../locales/authTranslations';
import { ArtisanLinkLogo } from './ArtisanLinkLogo';
import gsap from 'gsap';

const CRAFT_SPECIALTIES: CraftCategory[] = [
  'Handloom',
  'Clay/Pottery',
  'Metalcraft',
  'Folk Art',
  'Woodcraft',
  'Stone Craft',
  'Jewelry/Terracotta'
];

const STATES_LIST = [
  'Telangana',
  'Andhra Pradesh',
  'Rajasthan',
  'Uttar Pradesh',
  'Chhattisgarh',
  'Odisha',
  'West Bengal',
  'Gujarat',
  'Tamil Nadu',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Assam',
  'Bihar',
  'Kashmir'
];

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalRole,
    authModalTab,
    loginAsArtisanDemo,
    loginAsBuyerDemo,
    loginAsGuest,
    loginWithCredentials,
    signupArtisan,
    signupBuyer,
  } = useAuth();

  const { setActiveTab, setLanguage, currentLanguage } = useArtisan();

  // DEFAULT ENGLISH UI by requirement
  const [modalLanguage, setModalLanguage] = useState<LanguageCode>('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const authLangDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click or tap
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (authLangDropdownRef.current && !authLangDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const [activeRole, setActiveRole] = useState<'artisan' | 'buyer'>(authModalRole || 'artisan');
  const [tab, setTab] = useState<'login' | 'signup'>(authModalTab || 'login');

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Artisan Signup States
  const [artisanName, setArtisanName] = useState('');
  const [artisanRegionalName, setArtisanRegionalName] = useState('');
  const [artisanSpecialty, setArtisanSpecialty] = useState<CraftCategory>('Handloom');
  const [artisanVillage, setArtisanVillage] = useState('');
  const [artisanDistrict, setArtisanDistrict] = useState('');
  const [artisanState, setArtisanState] = useState('Telangana');
  const [artisanPhone, setArtisanPhone] = useState('');
  const [artisanLanguage, setArtisanLanguage] = useState<LanguageCode>('en');
  const [artisanGiDeclaration, setArtisanGiDeclaration] = useState(true);

  // Buyer Signup States
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerDeliveryState, setBuyerDeliveryState] = useState('Karnataka');
  const [buyerPincode, setBuyerPincode] = useState('');
  const [selectedMediums, setSelectedMediums] = useState<CraftCategory[]>(['Handloom', 'Clay/Pottery']);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Background Scroll Locking, Lenis Prevention & GSAP animation
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.classList.add('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      if (cardRef.current && overlayRef.current) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );

          gsap.fromTo(
            cardRef.current,
            { 
              scale: 0.82, 
              y: 40, 
              opacity: 0, 
              rotationX: 8,
              transformPerspective: 1000 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              rotationX: 0,
              duration: 0.45, 
              ease: 'back.out(1.5)' 
            }
          );
        });

        return () => ctx.revert();
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleKeyDown);
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [isAuthModalOpen]);

  const handleClose = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.85,
        y: 20,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: closeAuthModal,
      });
    } else {
      closeAuthModal();
    }
  };

  // Sync role & tab when opened via triggers
  useEffect(() => {
    if (isAuthModalOpen) {
      if (authModalRole) setActiveRole(authModalRole);
      if (authModalTab) setTab(authModalTab);
    }
  }, [isAuthModalOpen, authModalRole, authModalTab]);

  if (!isAuthModalOpen) return null;

  // Active translation dictionary
  const t: AuthTranslationDictionary = authTranslations[modalLanguage] || authTranslations.en;
  const currentLangMeta = INDIAN_LANGUAGES.find((l) => l.code === modalLanguage) || INDIAN_LANGUAGES[0];

  const handleLanguageSelect = (code: LanguageCode) => {
    setModalLanguage(code);
    setLanguage(code); // Also sync with global app language for cohesive experience
    setIsLangDropdownOpen(false);
  };

  const handleToggleMedium = (category: CraftCategory) => {
    if (selectedMediums.includes(category)) {
      setSelectedMediums(selectedMediums.filter((m) => m !== category));
    } else {
      setSelectedMediums([...selectedMediums, category]);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = loginIdentifier.trim() || (activeRole === 'artisan' ? '+91 98480 23412' : 'ananya.sharma@heritagepatron.in');
    loginWithCredentials(activeRole, identifier);
    if (activeRole === 'artisan') {
      setActiveTab('scan_studio');
    } else {
      setActiveTab('bazaar');
    }
  };

  const handleArtisanSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupArtisan({
      name: artisanName || 'Ustad Rameshwar Rao',
      regionalName: artisanRegionalName || artisanName || 'Ustad Rameshwar Rao',
      craftSpecialty: artisanSpecialty,
      village: artisanVillage || 'Bhoodan Pochampally',
      district: artisanDistrict || 'Yadadri Bhuvanagiri',
      state: artisanState,
      phone: artisanPhone || '+91 98480 23412',
      whatsapp: (artisanPhone || '9848023412').replace(/[^0-9]/g, ''),
      primaryLanguage: artisanLanguage,
      giCertified: artisanGiDeclaration
    });
    setActiveTab('scan_studio');
  };

  const handleBuyerSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupBuyer({
      name: buyerName || 'Ananya Sharma',
      email: buyerEmail || 'ananya.sharma@heritagepatron.in',
      phone: buyerPhone || '+91 97411 99201',
      favoriteMediums: selectedMediums,
      deliveryState: buyerDeliveryState,
      pincode: buyerPincode || '560038'
    });
    setActiveTab('bazaar');
  };

  return (
    <div 
      ref={overlayRef}
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={cardRef}
        id="auth-modal-card"
        data-lenis-prevent
        className="relative w-[92%] sm:w-full max-w-lg md:max-w-xl mx-auto max-h-[88vh] overflow-y-auto bg-[#0C243C] text-white rounded-3xl border border-amber-500/30 shadow-2xl p-4 sm:p-6 overscroll-contain flex flex-col space-y-4 sm:space-y-5 box-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Mandala Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

        <div className="relative z-10 space-y-4 sm:space-y-5 w-full min-w-0">
          {/* Top Row: Badge (Left) and Language Dropdown + Close "✕" Button (Right) */}
          <div className="flex items-center justify-between w-full mb-3 px-1 pb-3 border-b border-white/15 min-w-0 gap-2">
            <span className="text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-amber-950/50 text-amber-300 border border-amber-500/30 truncate min-w-0 shrink">
              {t.portalBadge}
            </span>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Prominent Language Selector Dropdown with Click-Outside handler */}
              <div className="relative" ref={authLangDropdownRef}>
                <button
                  id="auth-modal-language-btn"
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-1.5 bg-white/10 hover:bg-white/20 text-amber-300 border border-[#D4AF37]/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-sans font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none">{currentLangMeta.nativeName}</span>
                  <ChevronDown className="w-3 h-3 text-amber-300 shrink-0" />
                </button>

                {isLangDropdownOpen && (
                  <div 
                    id="auth-modal-language-dropdown"
                    data-lenis-prevent
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#0B1E33] border border-amber-500/40 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 max-h-72 overflow-y-auto overscroll-contain"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#D97706 transparent',
                    }}
                  >
                    <div className="sticky top-0 bg-[#0B1E33] z-20 flex items-center justify-between px-3 py-2 border-b border-white/10 shadow-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 font-sans truncate whitespace-nowrap">
                        Select Language (11 Languages)
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-md font-mono shrink-0">
                        11
                      </span>
                    </div>
                    <div className="p-2 space-y-1">
                      {INDIAN_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                            modalLanguage === lang.code ? 'bg-amber-500/20 font-bold text-amber-200 border border-amber-500/40' : 'text-stone-200'
                          }`}
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-sm truncate">{lang.nativeName}</span>
                            <span className="text-[10px] text-stone-400 font-sans truncate">{lang.label}</span>
                          </div>
                          {modalLanguage === lang.code && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Close "✕" Button */}
              <button
                id="close-auth-modal-top-btn"
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                title="Close (Esc)"
                className="shrink-0 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1 sm:ml-2 cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Brand Intro */}
          <div className="flex items-center gap-3.5 min-w-0">
            <ArtisanLinkLogo size={52} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#FAF6EE] leading-tight truncate">
                {t.headerTitle}
              </h2>
              <p className="text-xs text-stone-300 font-serif line-clamp-2 mt-0.5">
                {t.headerSubtitle}
              </p>
            </div>
          </div>

          {/* ⚡ 1-Click Quick Demo Login Ribbon for Judges */}
          <div className="pt-2 sm:pt-3 border-t border-white/15 w-full">
            <p className="text-[10px] uppercase font-sans font-bold tracking-widest text-amber-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{t.quickDemoTitle}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
              <button
                id="demo-artisan-quick-btn"
                type="button"
                onClick={() => {
                  loginAsArtisanDemo();
                  setActiveTab('scan_studio');
                }}
                className="w-full min-w-0 px-3 py-2 rounded-xl bg-linear-to-r from-[#B83227] to-[#8C231A] text-white text-xs font-bold font-sans flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#D4AF37] shadow-sm cursor-pointer"
              >
                <span className="shrink-0">🪔</span>
                <span className="truncate">{t.demoArtisan}</span>
              </button>

              <button
                id="demo-buyer-quick-btn"
                type="button"
                onClick={() => {
                  loginAsBuyerDemo();
                  setActiveTab('bazaar');
                }}
                className="w-full min-w-0 px-3 py-2 rounded-xl bg-linear-to-r from-[#117A65] to-[#0E6655] text-white text-xs font-bold font-sans flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all border border-emerald-400/60 shadow-sm cursor-pointer"
              >
                <span className="shrink-0">🛍️</span>
                <span className="truncate">{t.demoBuyer}</span>
              </button>

              <button
                id="demo-guest-quick-btn"
                type="button"
                onClick={() => {
                  loginAsGuest();
                  setActiveTab('bazaar');
                }}
                className="w-full min-w-0 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all border border-white/20 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span className="truncate">{t.guestBtn}</span>
              </button>
            </div>
          </div>

          {/* Primary Role Selector Tabs */}
          <div className="space-y-3 w-full">
            <div className="w-full grid grid-cols-2 p-1.5 rounded-full gap-1.5 bg-[#071624] border border-amber-500/20 box-border">
              <button
                id="auth-role-artisan-tab"
                type="button"
                onClick={() => setActiveRole('artisan')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap text-center transition-all cursor-pointer ${
                  activeRole === 'artisan'
                    ? 'bg-[#B83227] text-white shadow-md font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span className="shrink-0">🪔</span>
                <span className="truncate">{t.artisanTab}</span>
              </button>

              <button
                id="auth-role-buyer-tab"
                type="button"
                onClick={() => setActiveRole('buyer')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap text-center transition-all cursor-pointer ${
                  activeRole === 'buyer'
                    ? 'bg-[#117A65] text-white shadow-md font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span className="shrink-0">🛍️</span>
                <span className="truncate">{t.buyerTab}</span>
              </button>
            </div>

            {/* Sub-Tab: Sign In vs Create Account */}
            <div className="flex items-center justify-between px-1 min-w-0">
              <div className="flex space-x-6 text-xs uppercase tracking-wider font-sans font-bold shrink-0">
                <button
                  id="auth-subtab-login"
                  type="button"
                  onClick={() => setTab('login')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    tab === 'login'
                      ? 'text-amber-300 border-b-2 border-amber-400'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {t.signIn}
                </button>
                <button
                  id="auth-subtab-signup"
                  type="button"
                  onClick={() => setTab('signup')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    tab === 'signup'
                      ? 'text-amber-300 border-b-2 border-amber-400'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {t.signUp}
                </button>
              </div>

              <span className="text-[11px] text-stone-400 font-sans hidden sm:inline-block truncate">
                {activeRole === 'artisan' ? t.artisanPortalNote : t.buyerPortalNote}
              </span>
            </div>
          </div>

          {/* Dynamic Form Area */}
          <div className="w-full">
            {tab === 'login' ? (
              /* SIGN IN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans w-full">
                <div className="bg-[#132A45]/80 p-4 sm:p-5 rounded-2xl border border-amber-500/20 shadow-xs space-y-4 box-border">
                  <div>
                    <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      {activeRole === 'artisan' ? (
                        <Phone className="w-3.5 h-3.5 text-[#E67E22] shrink-0" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span className="truncate">
                        {activeRole === 'artisan' ? t.phoneOrEmailLabelArtisan : t.phoneOrEmailLabelBuyer} *
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder={activeRole === 'artisan' ? t.phonePlaceholderArtisan : t.emailOrPhonePlaceholderBuyer}
                      className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 focus:outline-hidden focus:border-amber-400 text-white font-semibold placeholder-stone-400 overflow-hidden text-ellipsis box-border"
                    />
                    <p className="text-[10px] text-stone-400 mt-1">
                      {activeRole === 'artisan' ? t.phoneTipArtisan : t.phoneTipBuyer}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#E67E22] shrink-0" />
                      <span>{t.passwordLabel} *</span>
                    </label>
                    <div className="flex flex-row items-center gap-2 w-full min-w-0 box-border">
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder={t.passwordPlaceholder}
                        className="flex-1 min-w-0 w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 focus:outline-hidden focus:border-amber-400 text-white placeholder-stone-400 box-border overflow-hidden text-ellipsis"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsOtpSent(true);
                          setLoginPassword('1234');
                        }}
                        className="shrink-0 whitespace-nowrap px-3 sm:px-4 py-2.5 text-xs sm:text-sm rounded-xl font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 cursor-pointer transition-colors"
                      >
                        {isOtpSent ? t.otpSentBtn : t.getOtpBtn}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-login-btn"
                  className={`w-full block text-center py-3 sm:py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] ${
                    activeRole === 'artisan'
                      ? 'bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#B83227]'
                      : 'bg-linear-to-r from-[#117A65] via-[#D4AF37] to-[#117A65]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    <span className="truncate">{activeRole === 'artisan' ? t.submitArtisanSignIn : t.submitBuyerSignIn}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    className="text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    {t.dontHaveAccount}
                  </button>
                </div>
              </form>
            ) : activeRole === 'artisan' ? (
              /* ARTISAN SIGNUP FORM */
              <form onSubmit={handleArtisanSignupSubmit} className="space-y-4 font-sans w-full">
                <div className="bg-[#132A45]/80 p-4 sm:p-5 rounded-2xl border border-amber-500/20 shadow-xs space-y-3.5 box-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.fullNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={artisanName}
                        onChange={(e) => setArtisanName(e.target.value)}
                        placeholder={t.fullNamePlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.regionalNameLabel}
                      </label>
                      <input
                        type="text"
                        value={artisanRegionalName}
                        onChange={(e) => setArtisanRegionalName(e.target.value)}
                        placeholder={t.regionalNamePlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-serif placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.craftSpecialtyLabel} *
                      </label>
                      <select
                        value={artisanSpecialty}
                        onChange={(e) => setArtisanSpecialty(e.target.value as CraftCategory)}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold cursor-pointer focus:outline-hidden focus:border-amber-400 box-border"
                      >
                        {CRAFT_SPECIALTIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#0C243C] text-white">
                            {t.categories[cat] || cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.preferredLanguageLabel} *
                      </label>
                      <select
                        value={artisanLanguage}
                        onChange={(e) => setArtisanLanguage(e.target.value as LanguageCode)}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold cursor-pointer focus:outline-hidden focus:border-amber-400 box-border"
                      >
                        {INDIAN_LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code} className="bg-[#0C243C] text-white">
                            {lang.nativeName} ({lang.label})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.villageLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={artisanVillage}
                        onChange={(e) => setArtisanVillage(e.target.value)}
                        placeholder={t.villagePlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.districtLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={artisanDistrict}
                        onChange={(e) => setArtisanDistrict(e.target.value)}
                        placeholder={t.districtPlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.stateLabel} *
                      </label>
                      <select
                        value={artisanState}
                        onChange={(e) => setArtisanState(e.target.value)}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold cursor-pointer focus:outline-hidden focus:border-amber-400 box-border"
                      >
                        {STATES_LIST.map((st) => (
                          <option key={st} value={st} className="bg-[#0C243C] text-white">{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                      {t.whatsappNumberLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={artisanPhone}
                      onChange={(e) => setArtisanPhone(e.target.value)}
                      placeholder={t.whatsappNumberPlaceholder}
                      className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                    />
                    <p className="text-[10px] text-stone-400 mt-1">
                      {t.whatsappNote}
                    </p>
                  </div>

                  {/* GI Self-Declaration */}
                  <div className="pt-2 border-t border-white/10">
                    <label className="flex items-start gap-2.5 text-xs text-stone-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={artisanGiDeclaration}
                        onChange={(e) => setArtisanGiDeclaration(e.target.checked)}
                        className="mt-0.5 accent-[#B83227] rounded-sm cursor-pointer shrink-0"
                      />
                      <span className="leading-relaxed text-stone-300">
                        <strong className="text-amber-200">{t.handmadeDeclaration}</strong>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-artisan-signup-btn"
                  className="w-full block text-center py-3 sm:py-3.5 rounded-2xl bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#B83227] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    <span className="truncate">{t.submitArtisanSignUp}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    {t.alreadyHaveAccount}
                  </button>
                </div>
              </form>
            ) : (
              /* BUYER SIGNUP FORM */
              <form onSubmit={handleBuyerSignupSubmit} className="space-y-4 font-sans w-full">
                <div className="bg-[#132A45]/80 p-4 sm:p-5 rounded-2xl border border-amber-500/20 shadow-xs space-y-3.5 box-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.fullNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder={t.buyerFullNamePlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.emailLabel} *
                      </label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.buyerPhoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder={t.buyerPhonePlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.deliveryStateLabel} *
                      </label>
                      <select
                        value={buyerDeliveryState}
                        onChange={(e) => setBuyerDeliveryState(e.target.value)}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold cursor-pointer focus:outline-hidden focus:border-amber-400 box-border"
                      >
                        {STATES_LIST.map((st) => (
                          <option key={st} value={st} className="bg-[#0C243C] text-white">{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.pincodeLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerPincode}
                        onChange={(e) => setBuyerPincode(e.target.value)}
                        placeholder={t.pincodePlaceholder}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis"
                      />
                    </div>
                  </div>

                  {/* Favorite Craft Categories Multi-select */}
                  <div>
                    <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-2">
                      {t.favMediumsLabel}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CRAFT_SPECIALTIES.map((cat) => {
                        const isSelected = selectedMediums.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleToggleMedium(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#117A65] text-white border-emerald-400 shadow-xs'
                                : 'bg-[#0A1A2D] text-stone-300 border-amber-500/30 hover:border-amber-400'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {t.categories[cat] || cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-buyer-signup-btn"
                  className="w-full block text-center py-3 sm:py-3.5 rounded-2xl bg-linear-to-r from-[#117A65] via-[#D4AF37] to-[#117A65] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all border border-emerald-400/60 cursor-pointer active:scale-[0.99]"
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    <span className="truncate">{t.submitBuyerSignUp}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    {t.alreadyHaveAccount}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Modal Footer Note */}
          <div className="pt-2 border-t border-white/10 text-center">
            <p className="text-[11px] text-stone-400 font-sans">
              {t.footerNote}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
