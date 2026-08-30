import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { 
  Search, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface HeroSectionProps {
  onAuthPrompt?: (role: 'artisan' | 'buyer') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAuthPrompt }) => {
  const { 
    t,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
  } = useArtisan();
  const { isDarkMode } = useTheme();
  const { openAuthModal } = useAuth();

  const heroRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleOpenAuth = (role: 'artisan' | 'buyer') => {
    if (onAuthPrompt) onAuthPrompt(role);
    else openAuthModal(role);
  };

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }
        );
      }

      if (subheadRef.current) {
        tl.fromTo(
          subheadRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.3'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split headline into individual words for React Bits BlurText + ShinyText animation
  const headlineWords = useMemo(() => {
    const words: { word: string; isHighlight: boolean }[] = [];
    
    const title1 = (t.hero_title_1 || 'Authentic').trim().split(/\s+/).filter(Boolean);
    title1.forEach(w => words.push({ word: w, isHighlight: false }));
    
    const highlight = (t.hero_title_highlight || 'Heritage').trim().split(/\s+/).filter(Boolean);
    highlight.forEach(w => words.push({ word: w, isHighlight: true }));
    
    const title2 = (t.hero_title_2 || 'Crafts.').trim().split(/\s+/).filter(Boolean);
    title2.forEach(w => words.push({ word: w, isHighlight: false }));
    
    return words;
  }, [t.hero_title_1, t.hero_title_highlight, t.hero_title_2]);

  const categories = [
    { name: 'All', label: t.cat_all || 'All' },
    { name: 'Handloom', label: t.cat_handloom || 'Handloom' },
    { name: 'Clay/Pottery', label: t.cat_clay || 'Clay/Pottery' },
    { name: 'Metalcraft', label: t.cat_metal || 'Metalcraft' },
    { name: 'Folk Art', label: t.cat_folk || 'Folk Art' },
    { name: 'Woodcraft', label: t.cat_wood || 'Woodcraft' },
  ];

  return (
    <section 
      ref={heroRef}
      data-scroll-section
      data-scroll
      id="hero-section"
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-transparent border-b border-amber-500/20' : 'bg-[#FAF9F6] border-b border-amber-900/10'
      }`}
    >
      {/* Background Jaali Pattern & Mandala Glow */}
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-jaali-dark opacity-80' : 'jaali-pattern opacity-40'}`} />
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-mandala-radial pointer-events-none opacity-60" />

      {/* Main Editorial Hero Wrapper */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 py-8 sm:py-10 lg:py-12">
        
        {/* 1. Top Header Manifesto & Titles */}
        <div className="max-w-4xl mx-auto text-center mb-6">
          <div ref={badgeRef} className="inline-flex items-center justify-center gap-2.5 text-[#a0522d] mb-1.5">
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#a0522d] inline-block opacity-80"></span>
            <span className="font-sans text-[10px] sm:text-xs md:text-sm tracking-widest font-bold uppercase text-[#a0522d]">
              {t.hero_lead || 'DIRECT FROM BHARAT • KALALINK'}
            </span>
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#a0522d] inline-block opacity-80"></span>
          </div>

          {/* BlurText & ShinyText Animated Main Headline */}
          <h1 
            id="hero-main-headline"
            className={`text-2xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight my-2 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 ${
              isDarkMode ? 'text-[#FAF9F6]' : 'text-stone-900'
            }`}
          >
            {headlineWords.map((item, index) => (
              <motion.span
                key={`${item.word}-${index}`}
                initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className={`inline-block ${
                  item.isHighlight
                    ? 'bg-[linear-gradient(110deg,#a0522d,45%,#fcd34d,55%,#a0522d)] bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent italic font-normal'
                    : isDarkMode ? 'text-[#FAF9F6]' : 'text-stone-900'
                }`}
              >
                {item.word}
              </motion.span>
            ))}
          </h1>

          <p 
            ref={subheadRef}
            className={`text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4 font-serif ${
              isDarkMode ? 'text-stone-300' : 'text-stone-600'
            }`}
          >
            {t.hero_subtitle || 'Connecting 7 million grassroots Indian artisans directly to global and domestic buyers with zero middlemen commissions, blockchain GI authenticity verification, and AI-powered storytelling.'}
          </p>
        </div>

        {/* 2. Editorial Search Bar & Category Filter Chips */}
        <div className={`mt-6 sm:mt-8 pt-6 border-t ${isDarkMode ? 'border-amber-500/20' : 'border-amber-900/10'}`}>
          <div className="max-w-4xl mx-auto">
            
            {/* Search Input Bar */}
            <div 
              id="voice-search-bar"
              className={`relative flex items-center rounded-2xl shadow-sm border p-2 focus-within:border-[#A84A2C] focus-within:ring-2 focus-within:ring-[#A84A2C]/20 transition-all ${
              isDarkMode 
                ? 'bg-[#0C1F30]/90 border-amber-500/30' 
                : 'bg-white border-amber-900/15'
            }`}>
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.hero_search_placeholder || 'Search by craft, GI state, weaver lineage, or material...'}
                className={`w-full px-3 py-2 text-sm placeholder-stone-400 bg-transparent focus:outline-hidden font-sans ${
                  isDarkMode ? 'text-[#FAF9F6]' : 'text-[#0F1E2E]'
                }`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-stone-400 hover:text-stone-200 px-2 cursor-pointer font-sans"
                >
                  {t.hero_clear || 'Clear'}
                </button>
              )}

              <button
                id="search-explore-btn"
                onClick={() => {
                  const bazaarElem = document.getElementById('marketplace-section');
                  bazaarElem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-linear-to-r from-[#A84A2C] to-[#C05621] hover:from-[#913D22] hover:to-[#A84A2C] text-white text-xs font-sans uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer shrink-0"
              >
                <span>{t.hero_explore || 'Explore'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Vernacular Cultural Discovery Tagline */}
            <div className="flex items-center justify-between mt-3 text-stone-400 text-xs font-sans px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className={`text-[11px] font-sans ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>
                  {t.app_tagline_guest || 'Direct from India’s Master Artisans • Heritage Crafts'}
                </span>
              </div>
            </div>

            {/* Category Chips - Editorial Styling */}
            <div id="craft-categories-container" className="flex items-center justify-center flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  id={`cat-filter-${cat.name.toLowerCase().replace('/', '-')}`}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#A84A2C] text-white shadow-xs'
                      : isDarkMode
                        ? 'bg-[#0C1F30] text-stone-200 border border-amber-500/20 hover:border-amber-400'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-[#A84A2C]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Dual-Persona Cards (Cleanly below the search section with standard document flow & generous spacing) */}
        <div id="guest-gateway-banner" className="my-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Artisan / Karigar Onboarding */}
            <div 
              id="hero-persona-artisan-card"
              onClick={() => handleOpenAuth('artisan')}
              className="bg-linear-to-br from-[#0C243C] to-[#162E4A] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 text-white shadow-xl hover:border-amber-300 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#B83227] to-[#E67E22] flex items-center justify-center text-2xl border border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
                  🪔
                </div>
                <span className="px-3 py-1 rounded-full bg-[#B83227] text-white text-[10px] font-sans font-bold uppercase tracking-wider">
                  {t.guest_artisan_card_badge || 'For Karigars & Weavers'}
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                <h3 className="font-serif font-black text-xl text-[#FAF6EE] group-hover:text-amber-300 transition-colors">
                  {t.guest_artisan_card_title || 'Are you a Master Artisan (Karigar)?'}
                </h3>
                <p className="text-stone-300 text-xs font-sans leading-relaxed">
                  {t.guest_artisan_card_desc || 'Open your digital Karkhana studio. Scan crafts via Vernacular AI, generate instant GI certificates, and receive 100% direct WhatsApp orders.'}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>{t.guest_artisan_card_cta || 'Open Your Workshop Studio'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Buyer / Patron Onboarding */}
            <div 
              id="hero-persona-buyer-card"
              onClick={() => handleOpenAuth('buyer')}
              className="bg-linear-to-br from-[#0E6655] to-[#117A65] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 text-white shadow-xl hover:border-emerald-300 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#117A65] to-[#0E6655] flex items-center justify-center text-2xl border border-emerald-400 shadow-md group-hover:scale-105 transition-transform">
                  🛍️
                </div>
                <span className="px-3 py-1 rounded-full bg-[#0C243C] text-emerald-300 text-[10px] font-sans font-bold uppercase tracking-wider border border-emerald-400/40">
                  {t.guest_buyer_card_badge || 'For Patrons & Collectors'}
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                <h3 className="font-serif font-black text-xl text-[#FAF6EE] group-hover:text-amber-200 transition-colors">
                  {t.guest_buyer_card_title || 'Are you an Art Patron (Art Lover)?'}
                </h3>
                <p className="text-emerald-100 text-xs font-sans leading-relaxed">
                  {t.guest_buyer_card_desc || 'Discover 100% verified handmade Indian crafts directly from weavers & sculptors. Save wishlists, collect authenticity certificates, and pay zero middleman commissions.'}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-amber-200 group-hover:translate-x-1 transition-transform">
                <span>{t.guest_buyer_card_cta || 'Join as Heritage Buyer'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

