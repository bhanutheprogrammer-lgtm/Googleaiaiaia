import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronDown,
  Loader2,
  AlertCircle,
  RotateCcw,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';
import { CraftCategory, LanguageCode } from '../types';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { authTranslations, AuthTranslationDictionary } from '../locales/authTranslations';
import { ArtLynkLogo } from './ArtLynkLogo';
import { lockScroll, unlockScroll } from '../lib/scrollLock';
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
    isAuthLoading,
    authError,
    sendPhoneOtp,
    verifyPhoneOtp,
    clearAuthError,
    loginAsArtisanDemo,
    loginAsBuyerDemo,
    loginAsGuest,
    loginWithCredentials,
    signupArtisan,
    signupBuyer,
  } = useAuth();

  const { setActiveTab, setLanguage, currentLanguage, closeTour } = useArtisan();

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

  // Phone Auth State
  const [phoneNumber, setPhoneNumber] = useState('+91 ');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpToast, setOtpToast] = useState<string | null>(null);

  // Artisan Signup States
  const [artisanName, setArtisanName] = useState('');
  const [artisanRegionalName, setArtisanRegionalName] = useState('');
  const [artisanSpecialty, setArtisanSpecialty] = useState<CraftCategory>('Handloom');
  const [artisanVillage, setArtisanVillage] = useState('');
  const [artisanDistrict, setArtisanDistrict] = useState('');
  const [artisanState, setArtisanState] = useState('Telangana');
  const [artisanLanguage, setArtisanLanguage] = useState<LanguageCode>('en');
  const [artisanGiDeclaration, setArtisanGiDeclaration] = useState(true);

  // Buyer Signup States
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerDeliveryState, setBuyerDeliveryState] = useState('Karnataka');
  const [buyerPincode, setBuyerPincode] = useState('');
  const [selectedMediums, setSelectedMediums] = useState<CraftCategory[]>(['Handloom', 'Clay/Pottery']);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Resend Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Background Scroll Locking, Lenis Prevention & GSAP animation
  useEffect(() => {
    if (isAuthModalOpen) {
      lockScroll();

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
              scale: 0.94, 
              y: 20, 
              opacity: 0, 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              duration: 0.35, 
              ease: 'power3.out' 
            }
          );
        });

        return () => ctx.revert();
      }
    } else {
      unlockScroll();
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
      unlockScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAuthModalOpen]);

  const handleClose = () => {
    clearAuthError();
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
      clearAuthError();
    }
  }, [isAuthModalOpen, authModalRole, authModalTab]);

  if (!isAuthModalOpen) return null;

  // Active translation dictionary
  const t: AuthTranslationDictionary = authTranslations[modalLanguage] || authTranslations.en;
  const currentLangMeta = INDIAN_LANGUAGES.find((l) => l.code === modalLanguage) || INDIAN_LANGUAGES[0];

  const handleLanguageSelect = (code: LanguageCode) => {
    setModalLanguage(code);
    setLanguage(code);
    setIsLangDropdownOpen(false);
  };

  const handleToggleMedium = (category: CraftCategory) => {
    if (selectedMediums.includes(category)) {
      setSelectedMediums(selectedMediums.filter((m) => m !== category));
    } else {
      setSelectedMediums([...selectedMediums, category]);
    }
  };

  // Handle Send OTP via Fast Mock / Phone Auth
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    clearAuthError();
    const rawPhone = phoneNumber.trim();
    if (!rawPhone || rawPhone === '+91') {
      return;
    }

    const result = await sendPhoneOtp(rawPhone);
    if (result.success) {
      const code = result.code || '123456';
      setOtpSent(true);
      setOtpCode(code);
      setResendTimer(60);
      setOtpToast(`📱 Demo SMS OTP sent to ${rawPhone}: ${code} (Auto-filled)`);
      setTimeout(() => {
        setOtpToast(null);
      }, 7000);
    }
  };

  // Handle Verify OTP and Complete Auth
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    if (tab === 'login') {
      const res = await verifyPhoneOtp(otpCode);
      if (res.success) {
        closeAuthModal();
        closeTour();
        if (activeRole === 'artisan') {
          setActiveTab('scan_studio');
        } else {
          setActiveTab('bazaar');
        }
      }
    } else {
      // Sign Up Flow with Custom Profile
      if (activeRole === 'artisan') {
        const res = await verifyPhoneOtp(otpCode, {
          role: 'artisan',
          name: artisanName || 'Ustad Rameshwar Rao',
          craftSpecialty: artisanSpecialty,
          village: artisanVillage || 'Bhoodan Pochampally',
          district: artisanDistrict || 'Yadadri Bhuvanagiri',
          state: artisanState,
          primaryLanguage: artisanLanguage,
          giCertified: artisanGiDeclaration
        });
        if (res.success) {
          closeAuthModal();
          closeTour();
          setActiveTab('scan_studio');
        }
      } else {
        const res = await verifyPhoneOtp(otpCode, {
          role: 'buyer',
          name: buyerName || 'Ananya Sharma',
          email: buyerEmail || 'ananya.sharma@heritagepatron.in',
          state: buyerDeliveryState,
          pincode: buyerPincode || '560038',
          favoriteMediums: selectedMediums
        });
        if (res.success) {
          closeAuthModal();
          closeTour();
          setActiveTab('bazaar');
        }
      }
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      id="auth-modal-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 xs:p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={cardRef}
        id="auth-modal-card"
        data-lenis-prevent
        className="relative w-full max-w-lg md:max-w-xl mx-auto my-auto max-h-[90vh] overflow-y-auto bg-[#0C243C] text-white rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-2xl p-3.5 xs:p-4 sm:p-6 overscroll-contain flex flex-col space-y-4 sm:space-y-5 box-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Mandala Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

        <div className="relative z-10 space-y-4 sm:space-y-5 w-full min-w-0">
          {/* Top Row: Badge (Left) and Language Dropdown + Close "✕" Button (Right) */}
          <div className="flex items-center justify-between w-full mb-2 px-1 pb-3 border-b border-white/15 min-w-0 gap-2">
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

          {/* Brand Intro with Terracotta Emblem */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-stone-900/90 border border-amber-500/40 p-2 flex items-center justify-center shrink-0 shadow-md">
              <ArtLynkLogo size={36} glow className="shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#FAF6EE] leading-tight truncate">
                {t.headerTitle}
              </h2>
              <p className="text-xs text-stone-300 font-serif line-clamp-2 mt-0.5">
                {t.headerSubtitle}
              </p>
            </div>
          </div>

          {/* Instant Demo SMS OTP Toast Banner */}
          {otpToast && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center justify-between gap-2 text-xs text-emerald-200 animate-in fade-in duration-200 shadow-md">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold truncate">{otpToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setOtpToast(null)}
                className="text-emerald-400 hover:text-emerald-200 shrink-0 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Error Alert Box */}
          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl flex items-start justify-between gap-2 text-xs text-red-200 animate-in fade-in duration-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{authError}</p>
              </div>
              <button
                type="button"
                onClick={clearAuthError}
                className="text-red-400 hover:text-red-200 shrink-0 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

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
                onClick={() => {
                  setActiveRole('artisan');
                  setOtpSent(false);
                }}
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
                onClick={() => {
                  setActiveRole('buyer');
                  setOtpSent(false);
                }}
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
                  onClick={() => {
                    setTab('login');
                    setOtpSent(false);
                  }}
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
                  onClick={() => {
                    setTab('signup');
                    setOtpSent(false);
                  }}
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

          {/* Dynamic Form Area: Phone OTP Authentication Workflow */}
          <div className="w-full">
            {tab === 'login' ? (
              /* SIGN IN WITH PHONE OTP FORM */
              <div className="space-y-4 font-sans w-full">
                <div className="bg-[#132A45]/80 p-4 sm:p-5 rounded-2xl border border-amber-500/20 shadow-xs space-y-4 box-border">
                  <div>
                    <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#E67E22] shrink-0" />
                      <span>{t.phoneOrEmailLabelArtisan} *</span>
                    </label>
                    <div className="flex flex-row items-center gap-2 w-full mt-1.5">
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98480 23412"
                        disabled={otpSent || isAuthLoading}
                        className="flex-1 min-w-0 w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                      />
                      {!otpSent ? (
                        <button
                          type="button"
                          id="send-phone-otp-btn"
                          onClick={() => handleSendOtp()}
                          disabled={isAuthLoading || phoneNumber.trim().length < 5}
                          className="shrink-0 whitespace-nowrap px-3.5 py-2.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 transition-all"
                        >
                          {isAuthLoading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5" />
                          )}
                          <span>Send OTP</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode('');
                          }}
                          className="shrink-0 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-medium cursor-pointer"
                          title="Change phone number"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-stone-400 mt-1">
                      {activeRole === 'artisan' ? t.phoneTipArtisan : t.phoneTipBuyer}
                    </p>
                  </div>

                  {/* OTP Input Section */}
                  {otpSent && (
                    <div className="animate-in fade-in duration-300 space-y-2 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>6-Digit Verification Code (SMS OTP) *</span>
                        </label>
                        <span className="text-[11px] text-emerald-400 font-medium">OTP Sent to {phoneNumber}</span>
                      </div>

                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Enter 6-digit OTP (e.g. 123456)"
                        className="w-full block rounded-xl px-3.5 py-2.5 text-center text-lg tracking-widest font-mono font-bold bg-[#0A1A2D] border border-amber-400 text-white placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 box-border"
                      />

                      <div className="flex items-center justify-between text-xs text-stone-400 pt-1 flex-wrap gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/30">
                            Demo Code: 123456
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpCode('123456')}
                            className="text-[11px] text-amber-300 underline font-semibold hover:text-amber-200 cursor-pointer"
                          >
                            Auto-Fill
                          </button>
                        </div>
                        {resendTimer > 0 ? (
                          <span className="text-amber-300 font-mono">Resend in {resendTimer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            disabled={isAuthLoading}
                            className="text-amber-300 hover:underline font-bold cursor-pointer"
                          >
                            Resend SMS OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {otpSent ? (
                  <button
                    type="button"
                    id="submit-verify-otp-btn"
                    onClick={handleVerifyOtp}
                    disabled={isAuthLoading || otpCode.trim().length < 4}
                    className={`w-full block text-center py-3 sm:py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50 ${
                      activeRole === 'artisan'
                        ? 'bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#B83227]'
                        : 'bg-linear-to-r from-[#117A65] via-[#D4AF37] to-[#117A65]'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2 w-full">
                      {isAuthLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          <span>Verifying with Firebase...</span>
                        </>
                      ) : (
                        <>
                          <span className="truncate">Verify & Sign In</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </>
                      )}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={isAuthLoading || phoneNumber.trim().length < 5}
                    className={`w-full block text-center py-3 sm:py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50 ${
                      activeRole === 'artisan'
                        ? 'bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#B83227]'
                        : 'bg-linear-to-r from-[#117A65] via-[#D4AF37] to-[#117A65]'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2 w-full">
                      {isAuthLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          <span>Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <span className="truncate">Request OTP to Sign In</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </>
                      )}
                    </span>
                  </button>
                )}

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('signup');
                      setOtpSent(false);
                    }}
                    className="text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    {t.dontHaveAccount}
                  </button>
                </div>
              </div>
            ) : activeRole === 'artisan' ? (
              /* ARTISAN SIGNUP FORM WITH PHONE OTP */
              <form onSubmit={otpSent ? handleVerifyOtp : (e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-4 font-sans w-full">
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
                    <div className="flex flex-row items-center gap-2 w-full mt-1.5">
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98480 23412"
                        disabled={otpSent || isAuthLoading}
                        className="flex-1 min-w-0 w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                      />
                      {!otpSent ? (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          disabled={isAuthLoading || phoneNumber.trim().length < 5}
                          className="shrink-0 whitespace-nowrap px-3.5 py-2.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 transition-all"
                        >
                          {isAuthLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Send OTP'}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode('');
                          }}
                          className="shrink-0 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-medium cursor-pointer"
                          title="Change phone number"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-stone-400 mt-1">
                      {t.whatsappNote}
                    </p>
                  </div>

                  {/* OTP verification input on Signup */}
                  {otpSent && (
                    <div className="pt-2 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                          Enter 6-Digit SMS OTP Code *
                        </label>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/30">
                            Demo: 123456
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpCode('123456')}
                            className="text-[11px] text-amber-300 underline font-semibold hover:text-amber-200 cursor-pointer"
                          >
                            Auto-Fill
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="123456"
                        className="w-full block rounded-xl px-3.5 py-2.5 text-center text-lg tracking-widest font-mono font-bold bg-[#0A1A2D] border border-amber-400 text-white placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 box-border"
                      />
                    </div>
                  )}

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
                  disabled={isAuthLoading}
                  className="w-full block text-center py-3 sm:py-3.5 rounded-2xl bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#B83227] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    {isAuthLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="truncate">{otpSent ? 'Verify OTP & Open Studio' : 'Get OTP & Continue'}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('login');
                      setOtpSent(false);
                    }}
                    className="text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    {t.alreadyHaveAccount}
                  </button>
                </div>
              </form>
            ) : (
              /* BUYER SIGNUP FORM WITH PHONE OTP */
              <form onSubmit={otpSent ? handleVerifyOtp : (e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-4 font-sans w-full">
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
                    <div className="sm:col-span-1">
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.buyerPhoneLabel} *
                      </label>
                      <div className="flex flex-row items-center gap-2 w-full mt-1.5">
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 97411 99201"
                          disabled={otpSent || isAuthLoading}
                          className="flex-1 min-w-0 w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                        />
                        {!otpSent ? (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            disabled={isAuthLoading || phoneNumber.trim().length < 5}
                            className="shrink-0 whitespace-nowrap px-3.5 py-2.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 transition-all"
                          >
                            {isAuthLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Send OTP'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setOtpCode('');
                            }}
                            className="shrink-0 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-medium cursor-pointer"
                            title="Change phone number"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block mb-1">
                        {t.deliveryStateLabel} *
                      </label>
                      <select
                        value={buyerDeliveryState}
                        onChange={(e) => setBuyerDeliveryState(e.target.value)}
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white font-semibold cursor-pointer focus:outline-hidden focus:border-amber-400 box-border mt-1.5"
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
                        className="w-full block rounded-xl px-3.5 py-2.5 text-sm bg-[#0A1A2D] border border-amber-500/30 text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 box-border overflow-hidden text-ellipsis mt-1.5"
                      />
                    </div>
                  </div>

                  {/* OTP Input for Buyer */}
                  {otpSent && (
                    <div className="pt-2 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                          Enter 6-Digit SMS OTP Code *
                        </label>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/30">
                            Demo: 123456
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpCode('123456')}
                            className="text-[11px] text-amber-300 underline font-semibold hover:text-amber-200 cursor-pointer"
                          >
                            Auto-Fill
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="123456"
                        className="w-full block rounded-xl px-3.5 py-2.5 text-center text-lg tracking-widest font-mono font-bold bg-[#0A1A2D] border border-amber-400 text-white placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 box-border"
                      />
                    </div>
                  )}

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
                  disabled={isAuthLoading}
                  className="w-full block text-center py-3 sm:py-3.5 rounded-2xl bg-linear-to-r from-[#117A65] via-[#D4AF37] to-[#117A65] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all border border-emerald-400/60 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2 w-full">
                    {isAuthLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="truncate">{otpSent ? 'Verify OTP & Join Community' : 'Get OTP & Join'}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('login');
                      setOtpSent(false);
                    }}
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
    </div>,
    document.body
  );
};

