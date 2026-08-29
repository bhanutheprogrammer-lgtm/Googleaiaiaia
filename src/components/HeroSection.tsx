import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { 
  Search, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';

export const HeroSection: React.FC = () => {
  const { 
    t,
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
  } = useArtisan();

  const heroRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
    { name: 'All', label: t.cat_all },
    { name: 'Handloom', label: t.cat_handloom },
    { name: 'Clay/Pottery', label: t.cat_clay },
    { name: 'Metalcraft', label: t.cat_metal },
    { name: 'Folk Art', label: t.cat_folk },
    { name: 'Woodcraft', label: t.cat_wood },
  ];

  return (
    <section 
      ref={heroRef}
      data-scroll-section
      data-scroll
      id="hero-section"
      className="relative overflow-hidden bg-[#FAF9F6] border-b border-amber-900/10"
    >
      {/* Background Jaali Pattern & Mandala Glow */}
      <div className="absolute inset-0 jaali-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-mandala-radial pointer-events-none opacity-60" />

      {/* Main Editorial Hero Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-10 lg:py-12">
        
        {/* Top Header Manifesto */}
        <div className="max-w-4xl mx-auto text-center mb-6">
          <div ref={badgeRef} className="inline-flex items-center justify-center gap-2.5 text-[#a0522d] mb-1.5">
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#a0522d] inline-block opacity-80"></span>
            <span className="font-sans text-[10px] sm:text-xs md:text-sm tracking-widest font-bold uppercase text-[#a0522d]">
              {t.hero_lead}
            </span>
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#a0522d] inline-block opacity-80"></span>
          </div>

          {/* BlurText & ShinyText Animated Main Headline */}
          <h1 
            id="hero-main-headline"
            className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight my-2 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3"
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
                    : 'text-stone-900'
                }`}
              >
                {item.word}
              </motion.span>
            ))}
          </h1>

          <p 
            ref={subheadRef}
            className="text-xs sm:text-sm md:text-base text-stone-600 max-w-xl mx-auto leading-relaxed px-4 font-serif"
          >
            {t.hero_subtitle}
          </p>
        </div>

        {/* Editorial Search & Category Filter Strip */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-amber-900/10">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-amber-900/15 p-2 focus-within:border-[#A84A2C] focus-within:ring-2 focus-within:ring-[#A84A2C]/10 transition-all">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.hero_search_placeholder}
                className="w-full px-3 py-2 text-sm text-[#0F1E2E] placeholder-stone-400 bg-transparent focus:outline-hidden font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-stone-400 hover:text-stone-600 px-2 cursor-pointer font-sans"
                >
                  {t.hero_clear}
                </button>
              )}

              <button
                id="search-explore-btn"
                onClick={() => {
                  const bazaarElem = document.getElementById('marketplace-section');
                  bazaarElem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-[#0F1E2E] hover:bg-[#A84A2C] text-white text-xs font-sans uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer shrink-0"
              >
                <span>{t.hero_explore}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Vernacular Cultural Discovery Tagline */}
            <div className="flex items-center justify-between mt-3 text-stone-500 text-xs font-sans px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11px] text-stone-600">
                  Explore 100% GI-certified authentic crafts direct from master Indian karigars
                </span>
              </div>
            </div>

            {/* Category Chips - Editorial Styling */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  id={`cat-filter-${cat.name.toLowerCase().replace('/', '-')}`}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#A84A2C] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-[#A84A2C]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
