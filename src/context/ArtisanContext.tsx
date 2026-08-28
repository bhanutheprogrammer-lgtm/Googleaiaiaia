import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CraftItem, LanguageCode, InquiryMessage, ArtisanProfile } from '../types';
import { INITIAL_CRAFTS, INITIAL_INQUIRIES, INDIAN_LANGUAGES } from '../data/mockCrafts';
import { TranslationSchema, getTranslation } from '../locales';
import { useAuth } from './AuthContext';

export const CURRENT_ARTISAN_PROFILE: ArtisanProfile = {
  id: 'artisan-ramesh-rao',
  name: 'Ustad Ramesh Rao',
  regionalName: 'ఉస్తాద్ రమేష్ రావు (చేనేత గురువు)',
  primaryLanguage: 'te',
  village: 'Bhoodan Pochampally',
  district: 'Yadadri Bhuvanagiri',
  state: 'Telangana',
  phone: '+91 98480 23412',
  whatsapp: '+919848023412',
  photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
  verified: true,
  craftsExperienceYears: 32,
  giCertified: true,
  masterTitle: 'National Master Weaver & GI Guild Custodian',
  awards: ['National Merit Award (Handlooms)', 'Telangana Shilpa Shiromani']
};

export type AppTab = 
  | 'bazaar' 
  | 'scan_studio' 
  | 'ledger' 
  | 'craft_map' 
  | 'stories' 
  | 'inquiries' 
  | 'fair_pricing'
  | 'virasat_feed' 
  | 'pitara' 
  | 'certificates' 
  | 'store_qr';

interface ArtisanContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
  activeRole: 'buyer' | 'artisan';
  setActiveRole: (role: 'buyer' | 'artisan') => void;
  crafts: CraftItem[];
  inquiries: InquiryMessage[];
  addCraft: (craft: CraftItem) => void;
  updateCraft: (id: string, updated: Partial<CraftItem>) => void;
  toggleCraftInStock: (id: string) => void;
  deleteCraft: (id: string) => void;
  selectedCraftForStory: CraftItem | null;
  setSelectedCraftForStory: (craft: CraftItem | null) => void;
  selectedCraftForCertificate: CraftItem | null;
  setSelectedCraftForCertificate: (craft: CraftItem | null) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedState: string;
  setSelectedState: (st: string) => void;
  giOnlyFilter: boolean;
  setGiOnlyFilter: (val: boolean) => void;
  triggerMarigoldConfetti: () => void;
  artisan: ArtisanProfile;
  unreadInquiriesCount: number;
  markInquiryReplied: (id: string) => void;
  updateInquiryStatus: (id: string, status: InquiryMessage['status']) => void;
  generateWhatsAppLink: (craft: CraftItem, buyerLang?: LanguageCode) => string;
}

const ArtisanContext = createContext<ArtisanContextType | undefined>(undefined);

export const ArtisanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { artisanUser } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [activeRole, setActiveRole] = useState<'buyer' | 'artisan'>('buyer');
  const [activeTab, setActiveTab] = useState<AppTab>('bazaar');

  const t = getTranslation(currentLanguage);

  const [crafts, setCrafts] = useState<CraftItem[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_crafts_v2');
      if (saved) {
        const parsed: CraftItem[] = JSON.parse(saved);
        // Merge with any new initial crafts that might not be in saved list
        const existingIds = new Set(parsed.map(c => c.id));
        const missingInitial = INITIAL_CRAFTS.filter(c => !existingIds.has(c.id));
        return [...parsed, ...missingInitial];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CRAFTS;
  });

  const [inquiries, setInquiries] = useState<InquiryMessage[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_link_inquiries_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INQUIRIES;
  });

  const [selectedCraftForStory, setSelectedCraftForStory] = useState<CraftItem | null>(null);
  const [selectedCraftForCertificate, setSelectedCraftForCertificate] = useState<CraftItem | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [giOnlyFilter, setGiOnlyFilter] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('artisan_link_crafts_v2', JSON.stringify(crafts));
    } catch (e) {
      console.error(e);
    }
  }, [crafts]);

  useEffect(() => {
    try {
      localStorage.setItem('artisan_link_inquiries_v2', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  const addCraft = (newCraft: CraftItem) => {
    setCrafts((prev) => [newCraft, ...prev]);
  };

  const updateCraft = (id: string, updated: Partial<CraftItem>) => {
    setCrafts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const toggleCraftInStock = (id: string) => {
    setCrafts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, inStock: c.inStock === false ? true : false } : c))
    );
  };

  const deleteCraft = (id: string) => {
    setCrafts((prev) => prev.filter((c) => c.id !== id));
  };

  const markInquiryReplied = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'replied' } : inq))
    );
  };

  const updateInquiryStatus = (id: string, status: InquiryMessage['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const triggerMarigoldConfetti = () => {
    // Custom golden yellow & marigold orange festive burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#E67E22', '#F39C12', '#D4AF37', '#B83227', '#F1C40F', '#FAF6EE'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const generateWhatsAppLink = (craft: CraftItem, buyerLang?: LanguageCode) => {
    const rawNumber = craft.artisan.whatsapp.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('91') ? rawNumber : `91${rawNumber}`;
    
    const lang = buyerLang || currentLanguage;
    let greeting = 'Namaste';
    if (craft.artisan.primaryLanguage === 'te') greeting = 'Namaskaram';
    else if (craft.artisan.primaryLanguage === 'ta') greeting = 'Vanakkam';
    else if (craft.artisan.primaryLanguage === 'bn') greeting = 'Nomoshkar';
    else if (craft.artisan.primaryLanguage === 'ur') greeting = 'Adaab / Assalamu Alaikum';

    const text = encodeURIComponent(
      `${greeting} ${craft.artisan.name} ji! 🙏\n\n` +
      `I saw your verified handmade craft on *ArtLynk*:\n` +
      `🪔 *${craft.title}*\n` +
      `📜 *GI Certificate ID:* ${craft.certificateId}\n` +
      `📍 *Origin:* ${craft.artisan.village}, ${craft.artisan.state}\n` +
      `💰 *Fair Karigar Price:* ₹${craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}\n\n` +
      `I would love to purchase this directly from you. Could you please share availability and delivery details?\n\n` +
      `_(Direct Bharat Karigar Trade via ArtLynk)_`
    );

    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <ArtisanContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        t,
        activeRole,
        setActiveRole,
        crafts,
        inquiries,
        addCraft,
        updateCraft,
        toggleCraftInStock,
        deleteCraft,
        selectedCraftForStory,
        setSelectedCraftForStory,
        selectedCraftForCertificate,
        setSelectedCraftForCertificate,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedState,
        setSelectedState,
        giOnlyFilter,
        setGiOnlyFilter,
        triggerMarigoldConfetti,
        artisan: artisanUser || CURRENT_ARTISAN_PROFILE,
        unreadInquiriesCount,
        markInquiryReplied,
        updateInquiryStatus,
        generateWhatsAppLink,
      }}
    >
      {children}
    </ArtisanContext.Provider>
  );
};

export const useArtisan = () => {
  const context = useContext(ArtisanContext);
  if (!context) {
    throw new Error('useArtisan must be used within an ArtisanProvider');
  }
  return context;
};
