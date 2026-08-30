import React, { useMemo, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  BookOpen, 
  Award, 
  Flame, 
  Clock, 
  Coins, 
  SlidersHorizontal, 
  ChevronRight, 
  QrCode 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArtisan } from '../context/ArtisanContext';
import { useAuth } from '../context/AuthContext';
import { CraftItem } from '../types';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { FavoriteHeartButton } from './FavoriteHeartButton';
import { SocialShareButton } from './SocialShareButton';
import { getCraftTitle, getCraftCategoryLabel, getCraftLineage } from '../utils/craftTranslations';

gsap.registerPlugin(ScrollTrigger);

export const CraftGrid: React.FC = () => {
  const {
    crafts,
    searchQuery,
    selectedCategory,
    selectedState,
    setSelectedState,
    giOnlyFilter,
    setGiOnlyFilter,
    setSelectedCraftForStory,
    setSelectedCraftForCertificate,
    generateWhatsAppLink,
    setActiveTab,
    currentLanguage,
    t
  } = useArtisan();

  const gridRef = useRef<HTMLDivElement>(null);

  // All unique states
  const statesList = useMemo(() => {
    const set = new Set<string>();
    crafts.forEach((c) => set.add(c.stateOfOrigin));
    return ['All', ...Array.from(set)];
  }, [crafts]);

  // Filtered crafts
  const filteredCrafts = useMemo(() => {
    return crafts.filter((craft) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = craft.title.toLowerCase().includes(q) ||
          craft.hindiTitle.toLowerCase().includes(q) ||
          craft.regionalTitle.toLowerCase().includes(q) ||
          craft.craftLineage.toLowerCase().includes(q) ||
          craft.stateOfOrigin.toLowerCase().includes(q) ||
          craft.artisan.name.toLowerCase().includes(q) ||
          craft.materialsDetected.some((m) => m.toLowerCase().includes(q));
        if (!matchTitle) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && craft.category !== selectedCategory) {
        return false;
      }

      // State filter
      if (selectedState !== 'All' && craft.stateOfOrigin !== selectedState) {
        return false;
      }

      // GI only
      if (giOnlyFilter && !craft.isGiTagged) {
        return false;
      }

      return true;
    });
  }, [crafts, searchQuery, selectedCategory, selectedState, giOnlyFilter]);

  // GSAP cross-fade when category, state, or search filters change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.craft-card-item');
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: {
            each: 0.04,
            from: 'start',
          },
          ease: 'power2.out',
        }
      );
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, [selectedCategory, selectedState, giOnlyFilter, filteredCrafts.length]);

  return (
    <section 
      id="marketplace-section" 
      data-scroll-section
      data-scroll
      className="py-10 sm:py-14 px-4 md:px-8 max-w-7xl mx-auto"
    >
      
      {/* Section Header - Editorial Layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-amber-900/10 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#A84A2C] font-sans mb-2">
            <span className="w-6 h-[1.5px] bg-[#A84A2C]"></span>
            <span>{t.bazaar_badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F1E2E] font-serif tracking-tight leading-tight">
            {t.bazaar_title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif max-w-2xl leading-relaxed">
            {t.bazaar_subtitle}
          </p>
        </div>

        {/* State, GI, and Scan Tools - Editorial Boxes */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Quick AI Scan for New Craft Listings with Subtle Pulsing Animation */}
          <button
            id="marketplace-scan-craft-btn"
            onClick={() => setActiveTab('scan_studio')}
            className="relative flex items-center space-x-1.5 sm:space-x-2 px-3.5 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-bold bg-linear-to-r from-[#A84A2C] to-[#C05621] hover:from-[#913D22] hover:to-[#A84A2C] text-white shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
            title="Scan handcrafted masterpiece to publish new listing"
          >
            {/* Subtle Pulsing attention ring */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="truncate">{t.dash_new_scan || 'Scan Craft'}</span>
          </button>

          {/* State Dropdown */}
          <div className="flex items-center space-x-2 bg-white border border-stone-200 hover:border-[#B88E28] rounded-xl px-3.5 py-2 shadow-2xs transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#A84A2C]" />
            <select
              id="state-filter-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? t.bazaar_all_states : st}
                </option>
              ))}
            </select>
          </div>

          {/* GI Toggle */}
          <button
            id="gi-filter-toggle"
            onClick={() => setGiOnlyFilter(!giOnlyFilter)}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all border cursor-pointer ${
              giOnlyFilter
                ? 'bg-[#0F1E2E] text-amber-300 border-[#0F1E2E] shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-[#A84A2C] shadow-2xs'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.bazaar_gi_only}</span>
          </button>
        </div>
      </div>

      {/* Grid of Craft Cards */}
      {filteredCrafts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-amber-900/20 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 mx-auto flex items-center justify-center text-[#A84A2C] mb-3">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0F1E2E] font-serif">{t.bazaar_no_crafts}</h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-1 font-serif">
            {t.bazaar_no_crafts_sub}
          </p>
        </div>
      ) : (
        <div 
          ref={gridRef}
          id="craft-items-grid-container"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 p-1 sm:p-2"
        >
          {filteredCrafts.map((craft) => (
            <CraftCard 
              key={craft.id} 
              craft={craft} 
              onViewStory={() => setSelectedCraftForStory(craft)}
              onViewCertificate={() => setSelectedCraftForCertificate(craft)}
              whatsAppLink={generateWhatsAppLink(craft, currentLanguage)}
              t={t}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      )}

    </section>
  );
};

interface CraftCardProps {
  craft: CraftItem;
  onViewStory: () => void;
  onViewCertificate: () => void;
  whatsAppLink: string;
  t: any;
  currentLanguage: string;
}

const CraftCard: React.FC<CraftCardProps> = ({
  craft,
  onViewStory,
  onViewCertificate,
  whatsAppLink,
  t,
  currentLanguage,
}) => {
  const { wishlistIds, toggleWishlist } = useAuth();
  const isWishlisted = wishlistIds.includes(craft.id);

  const categoryLabel = getCraftCategoryLabel(craft.category, currentLanguage) || t.cat_handloom || craft.category;
  const displayTitle = getCraftTitle(craft, currentLanguage);
  const artisanSubtitle = `${craft.artisan.name} • ${craft.artisan.village ? `${craft.artisan.village}, ` : ''}${craft.stateOfOrigin}`;
  const craftType = getCraftLineage(craft, currentLanguage) || craft.materialsDetected?.[0] || (t.app_badge_handmade || 'Handmade');

  return (
    <article
      id={`craft-card-${craft.id}`}
      className="craft-card-item bg-white rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group"
    >
      {/* Image & Category Tag (Top) */}
      <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
        <img
          src={craft.imageUrl}
          alt={craft.title}
          className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          loading="lazy"
          onClick={onViewStory}
        />

        {/* Floating Pill Badge (Top-Right): Light beige/cream pill badge with Category name */}
        <span className="absolute top-2.5 right-2.5 bg-[#f4efe6]/90 backdrop-blur-xs text-stone-800 text-xs px-2.5 py-1 rounded-full font-medium shadow-xs z-10 pointer-events-none border border-stone-200/50">
          {categoryLabel}
        </span>

        {/* Wishlist Heart Button with Framer Motion Animation (Top-Left) */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <FavoriteHeartButton
            isFavorited={isWishlisted}
            onToggle={() => toggleWishlist(craft.id)}
            size="sm"
            showTooltip
          />
        </div>

        {/* GI Tag Indicator Pill (Bottom-Left) */}
        {craft.isGiTagged && (
          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#0F1E2E]/90 backdrop-blur-md text-amber-300 text-[10px] font-sans font-medium border border-[#D4AF37]/30 shadow-xs flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-300" />
            <span className="hidden xs:inline sm:inline">{t.hero_stamp_gi || t.bazaar_gi_seal || 'GI Tagged'}</span>
          </span>
        )}
      </div>

      {/* Details & Typography (Bottom Content Area) */}
      <div className="p-3 sm:p-3.5 flex flex-col gap-1 flex-1 justify-between">
        
        {/* Title, Subtitle, Price Section */}
        <div className="flex flex-col gap-1">
          {/* Product Title: Elegant serif heading, bold, 2-line truncated */}
          <h3
            onClick={onViewStory}
            title={displayTitle}
            className="font-serif font-bold text-sm sm:text-base text-stone-900 line-clamp-2 leading-snug group-hover:text-[#b45a28] transition-colors cursor-pointer"
          >
            {displayTitle}
          </h3>

          {/* Artisan / Origin Subtitle: Muted gray text, single line truncated */}
          <p className="text-xs text-stone-500 truncate flex items-center gap-1" title={artisanSubtitle}>
            <MapPin className="w-3 h-3 text-[#b45a28] shrink-0" />
            <span className="truncate">{artisanSubtitle}</span>
          </p>

          {/* Price & Craft Tag Section: Warm terracotta/copper color */}
          <div className="flex items-baseline justify-between gap-1.5 mt-2 pt-0.5">
            <span className="text-[#b45a28] font-bold text-base sm:text-lg font-serif">
              ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-stone-500 leading-tight truncate max-w-[50%] text-right font-medium">
              {craftType}
            </span>
          </div>
        </div>

        {/* Action Controls: Story, Certificate, Social Share & WhatsApp Direct Trade */}
        <div className="pt-2.5 mt-2 border-t border-stone-100 flex items-center gap-1.5">
          {/* View Heritage Story Button */}
          <button
            id={`story-btn-${craft.id}`}
            onClick={onViewStory}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-[#b45a28] border border-stone-200/80 hover:border-[#b45a28]/30 transition-colors cursor-pointer shrink-0"
            title={t.bazaar_read_story || 'Read Heritage Story'}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#b45a28]" />
          </button>

          {/* View Authenticity Certificate Button */}
          <button
            id={`cert-btn-${craft.id}`}
            onClick={onViewCertificate}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-[#B88E28] border border-stone-200/80 hover:border-[#B88E28]/30 transition-colors cursor-pointer shrink-0"
            title={t.bazaar_gi_seal || 'View GI Seal Certificate'}
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
          </button>

          {/* Social Share Button */}
          <SocialShareButton 
            craft={craft} 
            size="sm"
            className="shrink-0"
          />

          {/* WhatsApp Direct Buy CTA */}
          <a
            id={`whatsapp-btn-${craft.id}`}
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#27AE60] hover:bg-[#219653] text-white text-[11px] sm:text-xs font-sans font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs transition-all cursor-pointer truncate"
            title="Direct WhatsApp Buy"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.bazaar_buy_whatsapp || 'Buy'}</span>
          </a>
        </div>

      </div>
    </article>
  );
};
