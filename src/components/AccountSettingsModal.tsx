import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  User, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CreditCard, 
  RotateCcw, 
  LogOut, 
  ArrowRightLeft, 
  Camera, 
  Mail, 
  Truck, 
  CheckCircle2, 
  Save, 
  Palette, 
  Compass, 
  Upload, 
  Trash2, 
  Globe, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';
import { CraftCategory, LanguageCode } from '../types';
import { INDIAN_LANGUAGES, DEFAULT_DEMO_ARTISAN, DEFAULT_DEMO_BUYER } from '../data/mockCrafts';
import { getProfileTranslation } from '../locales/profileTranslations';
import { ArtisanLinkLogo } from './ArtisanLinkLogo';

const ARTISAN_AVATAR_PRESETS = [
  {
    name: 'Master Weaver',
    role: 'Handloom & Silks',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Terracotta Sculptor',
    role: 'Clay & Pottery',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Dhokra Caster',
    role: 'Lost-Wax Bell Metal',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Folk Painter',
    role: 'Kalamkari & Madhubani',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  }
];

const BUYER_AVATAR_PRESETS = [
  {
    name: 'Ananya Sharma',
    desc: 'Passionate Arts Patron',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Priya Mukherjee',
    desc: 'Museum & Gallery Lover',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Rohan Verma',
    desc: 'Direct Artisan Supporter',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Meera Krishnan',
    desc: 'Handloom & Silks Curator',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
  }
];

const CRAFT_CATEGORIES: CraftCategory[] = [
  'Handloom',
  'Clay/Pottery',
  'Metalcraft',
  'Folk Art',
  'Woodcraft',
  'Stone Craft',
  'Jewelry/Terracotta'
];

const HERITAGE_REGIONS = [
  'Telangana',
  'Rajasthan',
  'Odisha',
  'Uttar Pradesh',
  'Tamil Nadu',
  'Kashmir',
  'West Bengal',
  'Kerala',
  'Gujarat',
  'Karnataka',
  'Madhya Pradesh',
  'Assam'
];

const INDIAN_STATES = [
  'Telangana',
  'Rajasthan',
  'Odisha',
  'Uttar Pradesh',
  'Tamil Nadu',
  'Kashmir',
  'West Bengal',
  'Kerala',
  'Gujarat',
  'Karnataka',
  'Madhya Pradesh',
  'Assam',
  'Maharashtra',
  'Andhra Pradesh',
  'Bihar',
  'Chhattisgarh'
];

export const AccountSettingsModal: React.FC = () => {
  const {
    isAccountSettingsOpen,
    closeAccountSettings,
    userRole,
    artisanUser,
    buyerUser,
    updateArtisanProfile,
    updateBuyerProfile,
    switchRole,
    resetToDefaults,
    logout
  } = useAuth();

  const { currentLanguage, setLanguage, setActiveTab } = useArtisan();

  const t = getProfileTranslation(currentLanguage);

  const [activeTabKey, setActiveTabKey] = useState<'details' | 'craft' | 'actions'>('details');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showPhotoToast, setShowPhotoToast] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Artisan Local State
  const [artisanForm, setArtisanForm] = useState({
    name: '',
    masterTitle: '',
    photo: '',
    phone: '',
    whatsapp: '',
    upiId: '',
    craftSpecialty: 'Handloom' as CraftCategory,
    village: '',
    district: '',
    state: 'Telangana',
    guildName: '',
    craftsExperienceYears: 25,
    experienceLineageText: '',
    lineageBio: '',
    storeTagline: '',
    giCertified: true
  });

  // Buyer Local State
  const [buyerForm, setBuyerForm] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: 'Karnataka',
    pincode: '',
    favoriteMediums: [] as CraftCategory[],
    favoriteStates: [] as string[]
  });

  // Populate local form when modal opens or user updates
  useEffect(() => {
    if (isAccountSettingsOpen) {
      if (userRole === 'artisan' && artisanUser) {
        setArtisanForm({
          name: artisanUser.name || '',
          masterTitle: artisanUser.masterTitle || '',
          photo: artisanUser.photo || DEFAULT_DEMO_ARTISAN.photo,
          phone: artisanUser.phone || '',
          whatsapp: artisanUser.whatsapp || '',
          upiId: artisanUser.upiId || '',
          craftSpecialty: artisanUser.craftSpecialty || 'Handloom',
          village: artisanUser.village || '',
          district: artisanUser.district || '',
          state: artisanUser.state || 'Telangana',
          guildName: artisanUser.guildName || '',
          craftsExperienceYears: artisanUser.craftsExperienceYears || 25,
          experienceLineageText: artisanUser.experienceLineageText || '',
          lineageBio: artisanUser.lineageBio || '',
          storeTagline: artisanUser.storeTagline || '',
          giCertified: artisanUser.giCertified ?? true
        });
      } else if (userRole === 'buyer' && buyerUser) {
        setBuyerForm({
          name: buyerUser.name || '',
          email: buyerUser.email || '',
          phone: buyerUser.phone || '',
          photo: buyerUser.photo || DEFAULT_DEMO_BUYER.photo,
          deliveryAddress: buyerUser.deliveryAddress || '',
          deliveryCity: buyerUser.deliveryCity || '',
          deliveryState: buyerUser.deliveryState || 'Karnataka',
          pincode: buyerUser.pincode || '',
          favoriteMediums: buyerUser.favoriteMediums || ['Handloom', 'Clay/Pottery'],
          favoriteStates: buyerUser.favoriteStates || ['Telangana', 'Rajasthan', 'Odisha', 'Uttar Pradesh']
        });
      }
      setShowSuccessToast(false);
      setShowPhotoToast(false);
      setPhotoError(null);
    }
  }, [isAccountSettingsOpen, userRole, artisanUser, buyerUser]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when open & GSAP Entrance Animation
  useEffect(() => {
    if (isAccountSettingsOpen) {
      document.body.classList.add('overflow-hidden');
      const win = window as any;
      if (win.lenis && typeof win.lenis.stop === 'function') {
        win.lenis.stop();
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
              scale: 0.88, 
              y: 30, 
              opacity: 0, 
              rotationX: 4,
              transformPerspective: 1000 
            },
            { 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              rotationX: 0,
              duration: 0.4, 
              ease: 'power3.out' 
            }
          );
        });

        return () => ctx.revert();
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      const win = window as any;
      if (win.lenis && typeof win.lenis.start === 'function') {
        win.lenis.start();
      }
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      const win = window as any;
      if (win.lenis && typeof win.lenis.start === 'function') {
        win.lenis.start();
      }
    };
  }, [isAccountSettingsOpen]);

  // Tab switch GSAP animation
  useEffect(() => {
    if (tabContentRef.current && isAccountSettingsOpen) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [activeTabKey]);

  if (!isAccountSettingsOpen) return null;

  const handleClose = () => {
    if (cardRef.current && overlayRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.9,
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: closeAccountSettings,
      });
    } else {
      closeAccountSettings();
    }
  };

  // Handle Interactive Image Upload with FileReader & Base64 preview
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Image size exceeds 5MB limit. Please choose a smaller image.');
      setTimeout(() => setPhotoError(null), 4000);
      return;
    }

    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        if (userRole === 'artisan') {
          setArtisanForm(prev => ({ ...prev, photo: base64 }));
        } else {
          setBuyerForm(prev => ({ ...prev, photo: base64 }));
        }
        setShowPhotoToast(true);
        setTimeout(() => setShowPhotoToast(false), 3500);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    const defaultPhoto = userRole === 'artisan' ? DEFAULT_DEMO_ARTISAN.photo : DEFAULT_DEMO_BUYER.photo;
    if (userRole === 'artisan') {
      setArtisanForm(prev => ({ ...prev, photo: defaultPhoto }));
    } else {
      setBuyerForm(prev => ({ ...prev, photo: defaultPhoto }));
    }
    setShowPhotoToast(true);
    setTimeout(() => setShowPhotoToast(false), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (userRole === 'artisan') {
      updateArtisanProfile({
        name: artisanForm.name.trim() || 'Ustad Rameshwar Rao',
        masterTitle: artisanForm.masterTitle.trim(),
        photo: artisanForm.photo.trim() || DEFAULT_DEMO_ARTISAN.photo,
        phone: artisanForm.phone.trim(),
        whatsapp: artisanForm.whatsapp.trim(),
        upiId: artisanForm.upiId.trim(),
        craftSpecialty: artisanForm.craftSpecialty,
        village: artisanForm.village.trim(),
        district: artisanForm.district.trim(),
        state: artisanForm.state.trim(),
        guildName: artisanForm.guildName.trim(),
        craftsExperienceYears: Number(artisanForm.craftsExperienceYears) || 20,
        experienceLineageText: artisanForm.experienceLineageText.trim(),
        lineageBio: artisanForm.lineageBio.trim(),
        storeTagline: artisanForm.storeTagline.trim(),
        giCertified: artisanForm.giCertified
      });
    } else if (userRole === 'buyer') {
      updateBuyerProfile({
        name: buyerForm.name.trim() || 'Ananya Sharma',
        email: buyerForm.email.trim(),
        phone: buyerForm.phone.trim(),
        photo: buyerForm.photo.trim() || DEFAULT_DEMO_BUYER.photo,
        deliveryAddress: buyerForm.deliveryAddress.trim(),
        deliveryCity: buyerForm.deliveryCity.trim(),
        deliveryState: buyerForm.deliveryState.trim(),
        location: `${buyerForm.deliveryCity ? buyerForm.deliveryCity + ', ' : ''}${buyerForm.deliveryState}, India`,
        pincode: buyerForm.pincode.trim(),
        favoriteMediums: buyerForm.favoriteMediums,
        favoriteStates: buyerForm.favoriteStates
      });
    }

    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const toggleBuyerMedium = (category: CraftCategory) => {
    setBuyerForm(prev => {
      const exists = prev.favoriteMediums.includes(category);
      if (exists) {
        return {
          ...prev,
          favoriteMediums: prev.favoriteMediums.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          favoriteMediums: [...prev.favoriteMediums, category]
        };
      }
    });
  };

  const toggleBuyerState = (st: string) => {
    setBuyerForm(prev => {
      const exists = prev.favoriteStates.includes(st);
      if (exists) {
        return {
          ...prev,
          favoriteStates: prev.favoriteStates.filter(s => s !== st)
        };
      } else {
        return {
          ...prev,
          favoriteStates: [...prev.favoriteStates, st]
        };
      }
    });
  };

  const currentPhoto = userRole === 'artisan' 
    ? (artisanForm.photo || DEFAULT_DEMO_ARTISAN.photo) 
    : (buyerForm.photo || DEFAULT_DEMO_BUYER.photo);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={overlayRef}
      id="account-settings-modal-overlay"
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={cardRef}
        id="account-settings-modal-card"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0b1b2b] border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto text-white flex flex-col space-y-6 box-border touch-pan-y"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D4AF37 transparent',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* ========================================================= */}
        {/* MODAL HEADER */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <ArtisanLinkLogo size={42} className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold font-serif text-amber-200 tracking-wide truncate">
                  {t.modalTitle || 'Account Settings & Profile'}
                </h2>
                <span className={`text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                  userRole === 'artisan' 
                    ? 'bg-[#B83227]/40 text-amber-300 border-[#B83227]' 
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                }`}>
                  {userRole === 'artisan' ? (t.artisanBadge || 'Artisan') : (t.buyerBadge || 'Buyer / Patron')}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 font-sans truncate mt-0.5">
                {t.modalSubtitle || 'Manage your credentials, direct trade contacts, and craft preferences'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Compact In-Modal Language Dropdown */}
            <div className="relative flex items-center bg-[#071624] border border-amber-500/40 rounded-full px-3 py-1.5 shadow-xs hover:border-amber-400 transition-colors">
              <Globe className="w-3.5 h-3.5 text-amber-300 mr-1.5 shrink-0" />
              <select
                id="modal-language-selector"
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-amber-200 font-semibold text-xs font-sans focus:outline-hidden cursor-pointer pr-1"
                title="Select Language"
              >
                {INDIAN_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0C243C] text-white py-1">
                    {lang.nativeName} ({lang.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Close Button "✕" */}
            <button
              id="close-account-settings-btn"
              onClick={handleClose}
              className="p-2 rounded-full text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3-TAB NAVIGATION BAR */}
        {/* ========================================================= */}
        <div className="flex border-b border-white/10 gap-6 mb-6 text-sm font-semibold shrink-0 overflow-x-auto">
          {/* TAB 1: Profile Details */}
          <button
            id="settings-tab-details"
            type="button"
            onClick={() => setActiveTabKey('details')}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 relative whitespace-nowrap ${
              activeTabKey === 'details'
                ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.tabProfile || 'Profile Details'}</span>
          </button>

          {/* TAB 2: Craft & Preferences */}
          <button
            id="settings-tab-craft"
            type="button"
            onClick={() => setActiveTabKey('craft')}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 relative whitespace-nowrap ${
              activeTabKey === 'craft'
                ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{userRole === 'artisan' ? (t.tabCraft || 'Craft & Provenance') : (t.tabCraftBuyer || 'Craft & Preferences')}</span>
          </button>

          {/* TAB 3: Account Actions */}
          <button
            id="settings-tab-actions"
            type="button"
            onClick={() => setActiveTabKey('actions')}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 relative whitespace-nowrap ${
              activeTabKey === 'actions'
                ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.tabActions || 'Account Actions'}</span>
          </button>
        </div>

        {/* Success / Error Banners */}
        {showSuccessToast && (
          <div 
            id="settings-success-toast"
            className="bg-emerald-600/90 text-white px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-200 shrink-0 border border-emerald-400/40"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>{t.successToast || 'Profile updated successfully!'}</span>
            </div>
            <button 
              onClick={() => setShowSuccessToast(false)}
              className="text-emerald-100 hover:text-white cursor-pointer ml-3 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {showPhotoToast && (
          <div 
            id="settings-photo-toast"
            className="bg-[#102A45] text-amber-200 px-4 py-2 rounded-xl flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-200 shrink-0 border border-amber-400/40"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t.photoSuccessToast || 'Avatar updated!'}</span>
            </div>
            <button 
              onClick={() => setShowPhotoToast(false)}
              className="text-amber-300 hover:text-white cursor-pointer ml-3 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {photoError && (
          <div 
            id="settings-photo-error"
            className="bg-red-800/90 text-white px-4 py-2 rounded-xl flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-200 shrink-0 border border-red-500/40"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />
              <span>{photoError}</span>
            </div>
            <button 
              onClick={() => setPhotoError(null)}
              className="text-red-200 hover:text-white cursor-pointer ml-3 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Form */}
        <form id="account-settings-form" onSubmit={handleSave} className="space-y-6">
          <div ref={tabContentRef}>

            {/* ========================================================= */}
            {/* TAB 1: PROFILE DETAILS */}
            {/* ========================================================= */}
            {activeTabKey === 'details' && (
              <div className="space-y-6">
                
                {/* 1. Avatar Section */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-200 font-sans flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>{t.avatarLabel || 'Profile Photo'}</span>
                    </label>
                    <span className="text-[11px] text-stone-400 font-sans">
                      {t.avatarSubtitle || 'Upload or select preset'}
                    </span>
                  </div>

                  <input 
                    type="file"
                    ref={fileInputRef}
                    id="avatar-upload"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-1">
                    {/* Circular Live Avatar Preview */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="relative shrink-0 group cursor-pointer"
                      title="Click to change photo"
                    >
                      <div className="w-24 h-24 rounded-full border-2 border-amber-400/80 ring-4 ring-amber-400/20 shadow-lg overflow-hidden relative bg-stone-900">
                        <img 
                          src={currentPhoto} 
                          alt="Profile Preview"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 p-2 text-center">
                          <Camera className="w-5 h-5 mb-1 text-amber-300" />
                          <span className="text-[10px] font-bold font-sans">Change</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Upload & Remove */}
                    <div className="flex-1 w-full space-y-3 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                        <button
                          type="button"
                          id="btn-trigger-avatar-upload"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-stone-950" />
                          <span>Upload New Photo</span>
                        </button>

                        <button
                          type="button"
                          id="btn-remove-avatar-photo"
                          onClick={handleRemovePhoto}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-red-500/30 text-stone-300 hover:text-white text-xs font-medium font-sans flex items-center gap-1.5 transition-colors border border-white/15 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Photo</span>
                        </button>
                      </div>

                      {/* Preset Avatar Selector Grid */}
                      <div className="pt-2">
                        <p className="text-[11px] font-semibold text-stone-300 font-sans mb-2">
                          Preset Avatars:
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(userRole === 'artisan' ? ARTISAN_AVATAR_PRESETS : BUYER_AVATAR_PRESETS).map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                if (userRole === 'artisan') {
                                  setArtisanForm(prev => ({ ...prev, photo: preset.url }));
                                } else {
                                  setBuyerForm(prev => ({ ...prev, photo: preset.url }));
                                }
                                setShowPhotoToast(true);
                                setTimeout(() => setShowPhotoToast(false), 2000);
                              }}
                              className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                (userRole === 'artisan' ? artisanForm.photo : buyerForm.photo) === preset.url
                                  ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                                  : 'bg-[#0A1A2D] border-white/10 hover:border-amber-400/50'
                              }`}
                            >
                              <img 
                                src={preset.url} 
                                alt={preset.name} 
                                className="w-7 h-7 rounded-full object-cover shrink-0 border border-amber-400/40"
                              />
                              <span className="text-[10px] text-stone-200 truncate font-sans font-medium">
                                {preset.name.split(' ')[0]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Contact Fields */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Contact Information</span>
                  </h3>

                  {userRole === 'buyer' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 font-sans">
                          Full Name *
                        </label>
                        <input 
                          type="text"
                          required
                          value={buyerForm.name}
                          onChange={(e) => setBuyerForm({ ...buyerForm, name: e.target.value })}
                          placeholder="Ananya Sharma"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 font-sans flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>Email Address *</span>
                        </label>
                        <input 
                          type="email"
                          required
                          value={buyerForm.email}
                          onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })}
                          placeholder="ananya.sharma@artlynk.in"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-semibold text-stone-200 font-sans flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>Phone Number</span>
                        </label>
                        <input 
                          type="tel"
                          value={buyerForm.phone}
                          onChange={(e) => setBuyerForm({ ...buyerForm, phone: e.target.value })}
                          placeholder="+91 97411 99201"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 font-sans">
                          Full Name *
                        </label>
                        <input 
                          type="text"
                          required
                          value={artisanForm.name}
                          onChange={(e) => setArtisanForm({ ...artisanForm, name: e.target.value })}
                          placeholder="Ustad Rameshwar Rao"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 font-sans">
                          Master Title
                        </label>
                        <input 
                          type="text"
                          value={artisanForm.masterTitle}
                          onChange={(e) => setArtisanForm({ ...artisanForm, masterTitle: e.target.value })}
                          placeholder="Master Weaver & National Awardee"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 font-sans flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp Direct Trade *</span>
                        </label>
                        <input 
                          type="tel"
                          required
                          value={artisanForm.whatsapp}
                          onChange={(e) => setArtisanForm({ ...artisanForm, whatsapp: e.target.value })}
                          placeholder="+91 98480 22334"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-emerald-400 focus:outline-hidden font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-200 font-sans flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                          <span>UPI ID for Direct Payouts</span>
                        </label>
                        <input 
                          type="text"
                          value={artisanForm.upiId}
                          onChange={(e) => setArtisanForm({ ...artisanForm, upiId: e.target.value })}
                          placeholder="rameshwar.ikat@okhdfcbank"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Patron Stats Card */}
                {userRole === 'buyer' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#102A45] to-[#163558] border border-amber-400/40 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-serif">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Guardian of Indian Handloom — Level 2</span>
                      </div>
                      <p className="text-[11px] text-stone-300 font-sans">
                        Direct wages generated: <strong>₹{buyerUser?.directWagesSupportedINR.toLocaleString('en-IN') || '42,500'}</strong> • <strong>{buyerUser?.familiesEmpowered || 4}</strong> artisan families empowered
                      </p>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-xl bg-[#0A1A2D] border border-amber-400/50 text-center shadow-xs shrink-0 ml-3">
                      <p className="text-[10px] uppercase font-bold text-stone-400">Patron Points</p>
                      <p className="text-sm font-extrabold text-amber-300">{buyerUser?.patronPoints || 1850}</p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: CRAFT & PREFERENCES */}
            {/* ========================================================= */}
            {activeTabKey === 'craft' && (
              <div className="space-y-6">

                {/* BUYER PREFERENCES & SHIPPING */}
                {userRole === 'buyer' && (
                  <div className="space-y-5">
                    {/* Favorite Craft Disciplines */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-3">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-amber-200 font-sans flex items-center gap-2">
                          <Palette className="w-4 h-4 text-amber-400" />
                          <span>Favorite Craft Disciplines</span>
                        </label>
                        <p className="text-[11px] text-stone-300 font-sans mt-0.5">
                          Select the authentic Indian craft forms you collect and support
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {CRAFT_CATEGORIES.map((cat) => {
                          const isSelected = buyerForm.favoriteMediums.includes(cat);
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => toggleBuyerMedium(cat)}
                              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                                  : 'bg-[#0A1A2D] text-stone-300 hover:text-white border border-amber-500/30'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-stone-950" />}
                              <span>{cat}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Heritage Regions */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-3">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-amber-200 font-sans flex items-center gap-2">
                          <Compass className="w-4 h-4 text-amber-400" />
                          <span>Heritage Regions</span>
                        </label>
                        <p className="text-[11px] text-stone-300 font-sans mt-0.5">
                          Choose states and GI clusters of special cultural interest
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {HERITAGE_REGIONS.map((st) => {
                          const isSelected = buyerForm.favoriteStates.includes(st);
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => toggleBuyerState(st)}
                              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0A1A2D] text-amber-300 font-bold border border-amber-400 shadow-xs'
                                  : 'bg-[#0A1A2D]/60 text-stone-300 hover:text-white border border-amber-500/20'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                              <span>{st}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Shipping Address Form */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-sans flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-400" />
                        <span>Shipping Address Form</span>
                      </h3>

                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 font-sans">
                            Street Address
                          </label>
                          <input 
                            type="text"
                            value={buyerForm.deliveryAddress}
                            onChange={(e) => setBuyerForm({ ...buyerForm, deliveryAddress: e.target.value })}
                            placeholder="Flat 402, Heritage Residency, 12th Main Road, Indiranagar"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-emerald-400 focus:outline-hidden"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-stone-200 font-sans">
                              City
                            </label>
                            <input 
                              type="text"
                              value={buyerForm.deliveryCity}
                              onChange={(e) => setBuyerForm({ ...buyerForm, deliveryCity: e.target.value })}
                              placeholder="Bengaluru"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-emerald-400 focus:outline-hidden"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-stone-200 font-sans">
                              State
                            </label>
                            <select
                              value={buyerForm.deliveryState}
                              onChange={(e) => setBuyerForm({ ...buyerForm, deliveryState: e.target.value })}
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-emerald-400 focus:outline-hidden cursor-pointer"
                            >
                              {INDIAN_STATES.map((st) => (
                                <option key={st} value={st} className="bg-[#0C243C] text-white">{st}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-stone-200 font-sans">
                              Pincode
                            </label>
                            <input 
                              type="text"
                              value={buyerForm.pincode}
                              onChange={(e) => setBuyerForm({ ...buyerForm, pincode: e.target.value })}
                              placeholder="560038"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-emerald-400 focus:outline-hidden font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ARTISAN CRAFT & PROVENANCE */}
                {userRole === 'artisan' && (
                  <div className="space-y-5">
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans flex items-center gap-2">
                        <Palette className="w-4 h-4 text-amber-400" />
                        <span>Craft Discipline & Lineage</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 font-sans">
                            Primary Craft Specialty *
                          </label>
                          <select
                            value={artisanForm.craftSpecialty}
                            onChange={(e) => setArtisanForm({ ...artisanForm, craftSpecialty: e.target.value as CraftCategory })}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden cursor-pointer"
                          >
                            {CRAFT_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat} className="bg-[#0C243C] text-white">{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 font-sans">
                            Guild / Cooperative Name
                          </label>
                          <input 
                            type="text"
                            value={artisanForm.guildName}
                            onChange={(e) => setArtisanForm({ ...artisanForm, guildName: e.target.value })}
                            placeholder="Pochampally Handloom Weavers Society"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>Regional Provenance</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 font-sans">
                            Village / Town *
                          </label>
                          <input 
                            type="text"
                            required
                            value={artisanForm.village}
                            onChange={(e) => setArtisanForm({ ...artisanForm, village: e.target.value })}
                            placeholder="Bhoodan Pochampally"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 font-sans">
                            District
                          </label>
                          <input 
                            type="text"
                            value={artisanForm.district}
                            onChange={(e) => setArtisanForm({ ...artisanForm, district: e.target.value })}
                            placeholder="Yadadri Bhuvanagiri"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-200 font-sans">
                            State *
                          </label>
                          <select
                            value={artisanForm.state}
                            onChange={(e) => setArtisanForm({ ...artisanForm, state: e.target.value })}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white focus:border-amber-400 focus:outline-hidden cursor-pointer"
                          >
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st} className="bg-[#0C243C] text-white">{st}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: ACCOUNT ACTIONS */}
            {/* ========================================================= */}
            {activeTabKey === 'actions' && (
              <div className="space-y-4">
                
                {/* 1. Account Persona / Role Switcher */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-amber-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200 font-sans">
                        Account Persona & View
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-amber-300">
                      Active: {userRole === 'artisan' ? 'Artisan / Seller' : 'Buyer / Patron'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    Seamlessly switch between Artisan Studio mode (catalog management & leads) and Buyer mode (bazaar discovery & wishlist).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        switchRole('artisan');
                        setActiveTab('scan_studio');
                        setShowSuccessToast(true);
                      }}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        userRole === 'artisan'
                          ? 'bg-[#B83227] text-white border-[#D4AF37] shadow-md font-bold'
                          : 'bg-[#0A1A2D] hover:bg-[#163456] text-white border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🪔</span>
                        <div>
                          <p className="text-xs font-bold font-serif">Artisan / Seller</p>
                          <p className={`text-[10px] ${userRole === 'artisan' ? 'text-amber-100' : 'text-stone-400'}`}>
                            Scan Studio, Catalog & Leads
                          </p>
                        </div>
                      </div>
                      {userRole === 'artisan' && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        switchRole('buyer');
                        setActiveTab('bazaar');
                        setShowSuccessToast(true);
                      }}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        userRole === 'buyer'
                          ? 'bg-[#0A1A2D] text-amber-300 border-amber-400 shadow-md font-bold'
                          : 'bg-[#0A1A2D] hover:bg-[#163456] text-white border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🛍️</span>
                        <div>
                          <p className="text-xs font-bold font-serif">Buyer / Patron</p>
                          <p className={`text-[10px] ${userRole === 'buyer' ? 'text-amber-200' : 'text-stone-400'}`}>
                            Bazaar, Wishlist & GI Map
                          </p>
                        </div>
                      </div>
                      {userRole === 'buyer' && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                    </button>
                  </div>
                </div>

                {/* 2. Reset Demo Data */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#132A45]/70 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-200 font-sans">
                      <RotateCcw className="w-4 h-4 text-amber-400" />
                      <span>Reset Demo Data</span>
                    </div>
                    <p className="text-xs text-stone-300 font-sans">
                      Restore default demo profiles, catalog items, and preferences
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetToDefaults();
                      setShowSuccessToast(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold font-sans flex items-center gap-1.5 transition-colors border border-amber-500/30 cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>
                </div>

                {/* 3. Session Management / Logout */}
                <div className="p-4 sm:p-5 rounded-2xl bg-red-950/30 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-300 font-sans">
                      <LogOut className="w-4 h-4" />
                      <span>Session Management</span>
                    </div>
                    <p className="text-xs text-stone-300 font-sans">
                      Log out from current session and return to guest mode
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeAccountSettings();
                      setActiveTab('bazaar');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#B83227] hover:bg-red-800 text-white text-xs font-bold font-sans flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out from Session</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* ========================================================= */}
          {/* MODAL FOOTER: Cancel + Save Changes */}
          {/* ========================================================= */}
          {activeTabKey !== 'actions' && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3 shrink-0">
              <button
                type="button"
                onClick={closeAccountSettings}
                className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-linear-to-r from-[#B83227] to-[#E67E22] hover:from-[#96281e] hover:to-[#d35400] text-white text-xs font-bold tracking-wide shadow-md flex items-center gap-2 transition-transform active:scale-98 cursor-pointer border border-[#D4AF37]"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}

        </form>

      </div>
    </div>,
    document.body
  );
};
