export type LanguageCode =
  | 'te'
  | 'en'
  | 'hi'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'gu'
  | 'bn'
  | 'or'
  | 'pa'
  | 'as'
  | 'kok'
  | 'ne'
  | 'mni'
  | 'kha'
  | 'lus'
  | 'ur';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeName: string;
  scriptFont: string;
  region: string;
  greeting: string;
}

export type UserRole = 'guest' | 'artisan' | 'buyer';

export type CraftCategory =
  | 'Handloom'
  | 'Clay/Pottery'
  | 'Metalcraft'
  | 'Folk Art'
  | 'Woodcraft'
  | 'Stone Craft'
  | 'Jewelry/Terracotta';

export interface PricingEstimation {
  baseMaterialCostINR: number;
  fairKarigarWageINR: number;
  recommendedRetailPriceINR: number;
  pricingRationale: string;
}

export interface ArtisanProfile {
  id: string;
  name: string;
  regionalName: string;
  primaryLanguage: LanguageCode;
  village: string;
  district: string;
  state: string;
  phone: string;
  whatsapp: string;
  photo: string;
  verified: boolean;
  craftsExperienceYears: number;
  giCertified: boolean;
  masterTitle?: string;
  awards?: string[];
  craftSpecialty?: CraftCategory;
  upiId?: string;
  storeTagline?: string;
  guildName?: string;
  lineageBio?: string;
  experienceLineageText?: string;
}

export interface PurchasedCertificate {
  certificateId: string;
  craftId: string;
  craftTitle: string;
  artisanName: string;
  artisanVillage: string;
  artisanState: string;
  issueDate: string;
  imageUrl: string;
  pricePaidINR: number;
  qrHash: string;
  stateOfOrigin: string;
  category: CraftCategory;
  materialsUsed: string[];
}

export interface BuyerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  location: string;
  deliveryState: string;
  pincode: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  favoriteMediums: CraftCategory[];
  favoriteStates?: string[];
  patronLevel: string;
  patronLevelNumber: number;
  patronPoints: number;
  directWagesSupportedINR: number;
  familiesEmpowered: number;
  wishlistCraftIds: string[];
  purchasedCertificates: PurchasedCertificate[];
}

export interface CraftItem {
  id: string;
  title: string;
  hindiTitle: string;
  regionalTitle: string;
  regionalLanguage: LanguageCode;
  titleTranslations?: Partial<Record<LanguageCode, string>>;
  craftLineageTranslations?: Partial<Record<LanguageCode, string>>;
  categoryTranslations?: Partial<Record<LanguageCode, string>>;
  storyTranslations?: Partial<Record<LanguageCode, string>>;
  materialsTranslations?: Partial<Record<LanguageCode, string[]>>;
  craftLineage: string;
  category: CraftCategory;
  stateOfOrigin: string;
  materialsDetected: string[];
  heritageStory: string;
  hindiStory: string;
  regionalStory: string;
  suggestedTags: string[];
  estimatedCraftingDays: number;
  pricingEstimation: PricingEstimation;
  careInstructions: string;
  artisan: ArtisanProfile;
  imageUrl: string;
  certificateId: string;
  timestamp: string;
  rating: number;
  viewsCount: number;
  inquiriesCount: number;
  isGiTagged: boolean;
  isHandmadeSealVerified: boolean;
  giNumber?: number;
  giTagCode?: string;
  giYear?: number;
  giGuild?: string;
  districtCluster?: string;
  inStock?: boolean;
}

export interface GITagEntry {
  id: string;
  giNumber: number;
  giTagCode: string;
  name: string;
  hindiName: string;
  regionalName: string;
  category: CraftCategory;
  state: string;
  districtClusters: string[];
  registrationYear: number;
  registeredProprietor: string;
  heritageStory: string;
  signatureMaterials: string[];
  uniquenessFactor: string;
  coordinates: { x: number; y: number };
  imageUrl: string;
  associatedCraftId?: string;
  status: 'Registered' | 'Active GI Guild';
}

export interface StateGICluster {
  id: string;
  stateName: string;
  regionalName: string;
  giTagCount: number;
  activeArtisansCount: string;
  featuredStory: string;
  imageUrl: string;
  coordinates: { x: number; y: number };
  famousCrafts: string[];
  giTagIds: string[];
}

export interface InquiryMessage {
  id: string;
  craftId: string;
  craftTitle: string;
  buyerName: string;
  buyerLocation: string;
  buyerPhone: string;
  message: string;
  buyerMessage?: string;
  translatedMessage?: string;
  timestamp: string;
  status: 'new' | 'in_discussion' | 'replied' | 'converted' | 'completed';
  whatsappLink: string;
}

export interface AIScanResult {
  title: string;
  englishTitle?: string;
  hindiTitle: string;
  regionalTitle: string;
  selectedLanguage: LanguageCode;
  craftLineage: string;
  categoryTag?: string;
  category: CraftCategory | string;
  stateOfOrigin: string;
  materialsDetected: string[];
  heritageStory: string;
  hindiStory?: string;
  regionalStory: string;
  suggestedTags: string[];
  smartTags?: string[];
  estimatedCraftingDays: number;
  pricingEstimation: PricingEstimation;
  careInstructions?: string;
  isAuthenticCraft?: boolean;
  isCraft?: boolean;
}

