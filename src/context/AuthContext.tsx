import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserRole, ArtisanProfile, BuyerProfile, CraftCategory, LanguageCode, PurchasedCertificate, CraftItem } from '../types';
import { DEFAULT_DEMO_ARTISAN, DEFAULT_DEMO_BUYER } from '../data/mockCrafts';

interface AuthContextType {
  userRole: UserRole;
  currentUser: (ArtisanProfile | BuyerProfile) | null;
  artisanUser: ArtisanProfile | null;
  buyerUser: BuyerProfile | null;
  isAuthModalOpen: boolean;
  authModalRole: 'artisan' | 'buyer';
  authModalTab: 'login' | 'signup';
  openAuthModal: (role?: 'artisan' | 'buyer', tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  loginAsArtisanDemo: () => void;
  loginAsBuyerDemo: () => void;
  loginAsGuest: () => void;
  loginWithCredentials: (role: 'artisan' | 'buyer', emailOrPhone: string, name?: string) => boolean;
  signupArtisan: (data: {
    name: string;
    regionalName?: string;
    craftSpecialty: CraftCategory;
    village: string;
    district: string;
    state: string;
    phone: string;
    whatsapp: string;
    primaryLanguage: LanguageCode;
    giCertified: boolean;
  }) => void;
  signupBuyer: (data: {
    name: string;
    email: string;
    phone: string;
    favoriteMediums: CraftCategory[];
    deliveryState: string;
    pincode: string;
  }) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  wishlistIds: string[];
  toggleWishlist: (craftId: string) => void;
  isWishlisted: (craftId: string) => boolean;
  purchasedCertificates: PurchasedCertificate[];
  acquireCraftCertificate: (craft: CraftItem) => void;
  isPitaraDrawerOpen: boolean;
  setIsPitaraDrawerOpen: (open: boolean) => void;
  isStoreQRModalOpen: boolean;
  setIsStoreQRModalOpen: (open: boolean) => void;
  isAccountSettingsOpen: boolean;
  openAccountSettings: () => void;
  closeAccountSettings: () => void;
  updateArtisanProfile: (updated: Partial<ArtisanProfile>) => void;
  updateBuyerProfile: (updated: Partial<BuyerProfile>) => void;
  resetToDefaults: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_auth_role_v2');
      if (saved === 'artisan' || saved === 'buyer' || saved === 'guest') {
        return saved as UserRole;
      }
    } catch (e) {
      console.error(e);
    }
    return 'guest'; // default to guest mode for authentication-gated flow
  });

  const [artisanUser, setArtisanUser] = useState<ArtisanProfile | null>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_artisan_user_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DEMO_ARTISAN;
  });

  const [buyerUser, setBuyerUser] = useState<BuyerProfile | null>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_buyer_user_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DEMO_BUYER;
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_wishlist_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DEMO_BUYER.wishlistCraftIds;
  });

  const [purchasedCertificates, setPurchasedCertificates] = useState<PurchasedCertificate[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_certificates_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DEMO_BUYER.purchasedCertificates;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'artisan' | 'buyer'>('artisan');
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isPitaraDrawerOpen, setIsPitaraDrawerOpen] = useState(false);
  const [isStoreQRModalOpen, setIsStoreQRModalOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('artisan_link_auth_role_v2', userRole);
    } catch (e) {
      console.error(e);
    }
  }, [userRole]);

  useEffect(() => {
    try {
      if (artisanUser) {
        localStorage.setItem('artisan_link_artisan_user_v2', JSON.stringify(artisanUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, [artisanUser]);

  useEffect(() => {
    try {
      if (buyerUser) {
        localStorage.setItem('artisan_link_buyer_user_v2', JSON.stringify(buyerUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, [buyerUser]);

  useEffect(() => {
    try {
      localStorage.setItem('artisan_link_wishlist_v2', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('artisan_link_certificates_v2', JSON.stringify(purchasedCertificates));
    } catch (e) {
      console.error(e);
    }
  }, [purchasedCertificates]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E67E22', '#F39C12', '#D4AF37', '#B83227', '#27AE60']
    });
  };

  const openAuthModal = (role: 'artisan' | 'buyer' = 'artisan', tab: 'login' | 'signup' = 'login') => {
    setAuthModalRole(role);
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginAsArtisanDemo = () => {
    setArtisanUser(DEFAULT_DEMO_ARTISAN);
    setUserRole('artisan');
    setIsAuthModalOpen(false);
    triggerCelebration();
  };

  const loginAsBuyerDemo = () => {
    setBuyerUser(DEFAULT_DEMO_BUYER);
    setUserRole('buyer');
    setIsAuthModalOpen(false);
    triggerCelebration();
  };

  const loginAsGuest = () => {
    setUserRole('guest');
    setIsAuthModalOpen(false);
  };

  const loginWithCredentials = (role: 'artisan' | 'buyer', emailOrPhone: string, name?: string): boolean => {
    if (role === 'artisan') {
      const profile: ArtisanProfile = {
        ...(artisanUser || DEFAULT_DEMO_ARTISAN),
        name: name || (artisanUser ? artisanUser.name : 'Ustad Rameshwar Rao'),
        phone: emailOrPhone.startsWith('+91') ? emailOrPhone : `+91 ${emailOrPhone}`,
        whatsapp: emailOrPhone.replace(/[^0-9]/g, ''),
      };
      setArtisanUser(profile);
      setUserRole('artisan');
    } else {
      const profile: BuyerProfile = {
        ...(buyerUser || DEFAULT_DEMO_BUYER),
        name: name || (buyerUser ? buyerUser.name : 'Ananya Sharma'),
        email: emailOrPhone.includes('@') ? emailOrPhone : (buyerUser?.email || 'ananya.sharma@heritagepatron.in'),
        phone: emailOrPhone.includes('@') ? (buyerUser?.phone || '+91 97411 99201') : emailOrPhone,
      };
      setBuyerUser(profile);
      setUserRole('buyer');
    }
    setIsAuthModalOpen(false);
    triggerCelebration();
    return true;
  };

  const signupArtisan = (data: {
    name: string;
    regionalName?: string;
    craftSpecialty: CraftCategory;
    village: string;
    district: string;
    state: string;
    phone: string;
    whatsapp: string;
    primaryLanguage: LanguageCode;
    giCertified: boolean;
  }) => {
    const newProfile: ArtisanProfile = {
      id: `artisan-${Date.now()}`,
      name: data.name,
      regionalName: data.regionalName || data.name,
      primaryLanguage: data.primaryLanguage,
      village: data.village,
      district: data.district,
      state: data.state,
      phone: data.phone,
      whatsapp: data.whatsapp,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      verified: true,
      craftsExperienceYears: 18,
      giCertified: data.giCertified,
      craftSpecialty: data.craftSpecialty,
      masterTitle: `Master Artisan in ${data.craftSpecialty} (${data.state})`,
      awards: ['Kala Ratna Certified Artisan', 'State Handicraft Guild Member'],
      upiId: `${data.name.toLowerCase().replace(/\s+/g, '')}@upi`,
      storeTagline: `Authentic handcrafted ${data.craftSpecialty} made with pure traditional heritage from ${data.village}, ${data.state}.`
    };

    setArtisanUser(newProfile);
    setUserRole('artisan');
    setIsAuthModalOpen(false);
    triggerCelebration();
  };

  const signupBuyer = (data: {
    name: string;
    email: string;
    phone: string;
    favoriteMediums: CraftCategory[];
    deliveryState: string;
    pincode: string;
  }) => {
    const newBuyer: BuyerProfile = {
      id: `buyer-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      location: `${data.deliveryState}, India`,
      deliveryState: data.deliveryState,
      pincode: data.pincode,
      favoriteMediums: data.favoriteMediums.length ? data.favoriteMediums : ['Handloom', 'Clay/Pottery'],
      patronLevel: 'Guardian of Indian Handloom — Level 1',
      patronLevelNumber: 1,
      patronPoints: 500,
      directWagesSupportedINR: 12000,
      familiesEmpowered: 1,
      wishlistCraftIds: ['craft-pochampally-ikat'],
      purchasedCertificates: []
    };

    setBuyerUser(newBuyer);
    setUserRole('buyer');
    setIsAuthModalOpen(false);
    triggerCelebration();
  };

  const logout = () => {
    setUserRole('guest');
  };

  const switchRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'artisan' && !artisanUser) {
      setArtisanUser(DEFAULT_DEMO_ARTISAN);
    }
    if (role === 'buyer' && !buyerUser) {
      setBuyerUser(DEFAULT_DEMO_BUYER);
    }
  };

  const toggleWishlist = (craftId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(craftId);
      if (exists) {
        return prev.filter((id) => id !== craftId);
      } else {
        triggerCelebration();
        return [...prev, craftId];
      }
    });
  };

  const isWishlisted = (craftId: string) => {
    return wishlistIds.includes(craftId);
  };

  const acquireCraftCertificate = (craft: CraftItem) => {
    const newCert: PurchasedCertificate = {
      certificateId: `CERT-PATRON-${Date.now().toString().slice(-6)}`,
      craftId: craft.id,
      craftTitle: craft.title,
      artisanName: craft.artisan.name,
      artisanVillage: craft.artisan.village,
      artisanState: craft.artisan.state,
      issueDate: new Date().toISOString().split('T')[0],
      imageUrl: craft.imageUrl,
      pricePaidINR: craft.pricingEstimation.recommendedRetailPriceINR,
      qrHash: `sha256:${Math.random().toString(36).substring(2, 15)}_${craft.id}`,
      stateOfOrigin: craft.stateOfOrigin,
      category: craft.category,
      materialsUsed: craft.materialsDetected
    };

    setPurchasedCertificates((prev) => [newCert, ...prev]);
    
    // Update buyer patron stats
    if (buyerUser) {
      const updatedWage = buyerUser.directWagesSupportedINR + craft.pricingEstimation.fairKarigarWageINR;
      const updatedPoints = buyerUser.patronPoints + 350;
      const updatedLevelNumber = updatedPoints > 2000 ? 3 : updatedPoints > 1000 ? 2 : 1;
      const updatedLevel = updatedLevelNumber === 3 
        ? 'Grand Patron of Indian Heritage — Level 3' 
        : updatedLevelNumber === 2 
        ? 'Guardian of Indian Handloom — Level 2' 
        : 'Heritage Supporter — Level 1';

      setBuyerUser({
        ...buyerUser,
        directWagesSupportedINR: updatedWage,
        patronPoints: updatedPoints,
        patronLevelNumber: updatedLevelNumber,
        patronLevel: updatedLevel,
        familiesEmpowered: buyerUser.familiesEmpowered + 1
      });
    }

    triggerCelebration();
  };

  const openAccountSettings = () => {
    setIsAccountSettingsOpen(true);
  };

  const closeAccountSettings = () => {
    setIsAccountSettingsOpen(false);
  };

  const updateArtisanProfile = (updated: Partial<ArtisanProfile>) => {
    setArtisanUser((prev) => {
      const base = prev || DEFAULT_DEMO_ARTISAN;
      const merged = { ...base, ...updated };
      try {
        localStorage.setItem('artisan_link_artisan_user_v2', JSON.stringify(merged));
      } catch (e) {
        console.error(e);
      }
      return merged;
    });
    triggerCelebration();
  };

  const updateBuyerProfile = (updated: Partial<BuyerProfile>) => {
    setBuyerUser((prev) => {
      const base = prev || DEFAULT_DEMO_BUYER;
      const merged = { ...base, ...updated };
      try {
        localStorage.setItem('artisan_link_buyer_user_v2', JSON.stringify(merged));
      } catch (e) {
        console.error(e);
      }
      return merged;
    });
    triggerCelebration();
  };

  const resetToDefaults = () => {
    if (userRole === 'artisan') {
      setArtisanUser(DEFAULT_DEMO_ARTISAN);
      try {
        localStorage.setItem('artisan_link_artisan_user_v2', JSON.stringify(DEFAULT_DEMO_ARTISAN));
      } catch (e) {
        console.error(e);
      }
    } else {
      setBuyerUser(DEFAULT_DEMO_BUYER);
      try {
        localStorage.setItem('artisan_link_buyer_user_v2', JSON.stringify(DEFAULT_DEMO_BUYER));
      } catch (e) {
        console.error(e);
      }
    }
    triggerCelebration();
  };

  const currentUser = userRole === 'artisan' ? artisanUser : userRole === 'buyer' ? buyerUser : null;

  return (
    <AuthContext.Provider
      value={{
        userRole,
        currentUser,
        artisanUser,
        buyerUser,
        isAuthModalOpen,
        authModalRole,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        loginAsArtisanDemo,
        loginAsBuyerDemo,
        loginAsGuest,
        loginWithCredentials,
        signupArtisan,
        signupBuyer,
        logout,
        switchRole,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        purchasedCertificates,
        acquireCraftCertificate,
        isPitaraDrawerOpen,
        setIsPitaraDrawerOpen,
        isStoreQRModalOpen,
        setIsStoreQRModalOpen,
        isAccountSettingsOpen,
        openAccountSettings,
        closeAccountSettings,
        updateArtisanProfile,
        updateBuyerProfile,
        resetToDefaults
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
