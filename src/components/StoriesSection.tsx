import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  MapPin, 
  Award, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { CraftItem } from '../types';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';

export const StoriesSection: React.FC = () => {
  const {
    crafts,
    setSelectedCraftForStory,
    setSelectedCraftForCertificate,
    generateWhatsAppLink,
    currentLanguage,
    t
  } = useArtisan();

  const [activeStoryCraft, setActiveStoryCraft] = useState<CraftItem>(crafts[0]);
  const [activeLangTab, setActiveLangTab] = useState<'regional' | 'hindi' | 'english'>(
    currentLanguage === 'hi' ? 'hindi' : currentLanguage === 'en' ? 'english' : 'regional'
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync tab when global currentLanguage changes
  React.useEffect(() => {
    if (currentLanguage === 'hi') {
      setActiveLangTab('hindi');
    } else if (currentLanguage === 'en') {
      setActiveLangTab('english');
    } else {
      setActiveLangTab('regional');
    }
  }, [currentLanguage]);

  const regionalMeta = INDIAN_LANGUAGES.find((l) => l.code === activeStoryCraft.regionalLanguage) || INDIAN_LANGUAGES[0];

  const handleToggleNarration = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    } else {
      if ('speechSynthesis' in window) {
        const textToRead = activeLangTab === 'regional'
          ? activeStoryCraft.regionalStory
          : activeLangTab === 'hindi'
          ? activeStoryCraft.hindiStory
          : activeStoryCraft.heritageStory;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  return (
    <section 
      id="stories-section" 
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8"
    >
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#A84A2C] bg-[#FAF9F6] px-4 py-1.5 rounded-full border border-amber-900/15">
          <BookOpen className="w-3.5 h-3.5 text-[#A84A2C]" />
          <span>{t.stories_badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F1E2E] font-serif tracking-tight leading-tight">
          {t.stories_title}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-serif max-w-2xl mx-auto leading-relaxed">
          {t.stories_subtitle}
        </p>
      </div>

      {/* Main Interactive Story Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left (4 Cols): Story Selector List with Smooth Scrolling & Lenis Prevention */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-sans">
              Artisan Chronicles ({crafts.length})
            </span>
            <span className="text-[11px] text-[#A84A2C] font-semibold font-sans">
              Select to Read
            </span>
          </div>

          <div 
            id="stories-selector-scroll-list"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1.5 overscroll-contain rounded-2xl touch-pan-y"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#A84A2C transparent',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {crafts.map((craft) => (
              <div
                key={craft.id}
                onClick={() => {
                  setActiveStoryCraft(craft);
                  if (isPlayingAudio) {
                    window.speechSynthesis?.cancel();
                    setIsPlayingAudio(false);
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 ${
                  activeStoryCraft.id === craft.id
                    ? 'bg-white border-[#A84A2C] shadow-md ring-2 ring-[#A84A2C]/15 scale-[1.01]'
                    : 'bg-white hover:bg-amber-50/40 border-stone-200/80 text-stone-700'
                }`}
              >
                <img
                  src={craft.imageUrl}
                  alt={craft.title}
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                />
                <div className="overflow-hidden flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A84A2C] block truncate">
                    {craft.category} • {craft.stateOfOrigin}
                  </span>
                  <h3 className="text-xs font-bold text-[#0F1E2E] font-serif truncate mt-0.5">
                    {currentLanguage === 'hi' ? craft.hindiTitle : craft.title}
                  </h3>
                  {currentLanguage !== 'en' && (
                    <p className="text-[11px] font-semibold text-stone-600 truncate">
                      {craft.regionalTitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (8 Cols): Featured Story Reading Room */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-8 shadow-lg space-y-6">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-0.5 rounded-full bg-[#A84A2C] text-white text-[10px] font-bold uppercase tracking-wider">
                  {activeStoryCraft.category}
                </span>
                <span className="text-xs text-stone-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A84A2C]" />
                  {activeStoryCraft.stateOfOrigin}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0F1E2E] mt-2">
                {currentLanguage === 'hi' ? activeStoryCraft.hindiTitle : activeStoryCraft.title}
              </h2>
              {currentLanguage !== 'en' && (
                <p className="text-xs font-semibold text-[#A84A2C] mt-0.5">
                  {activeStoryCraft.regionalTitle}
                </p>
              )}
            </div>

            {/* Language Switcher Tabs & Voice Narration */}
            <div className="flex items-center space-x-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setActiveLangTab('regional')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLangTab === 'regional'
                    ? 'bg-[#A84A2C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-[#A84A2C]'
                }`}
              >
                {regionalMeta.nativeName}
              </button>

              <button
                onClick={() => setActiveLangTab('hindi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLangTab === 'hindi'
                    ? 'bg-[#A84A2C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-[#A84A2C]'
                }`}
              >
                हिन्दी
              </button>

              <button
                onClick={() => setActiveLangTab('english')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLangTab === 'english'
                    ? 'bg-[#A84A2C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-[#A84A2C]'
                }`}
              >
                English
              </button>

              <button
                onClick={handleToggleNarration}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isPlayingAudio ? 'bg-amber-100 text-[#A84A2C] border-amber-300' : 'text-stone-600 hover:bg-white border-transparent'
                }`}
                title={t.stories_listen_narration}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4 text-[#A84A2C]" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Master Karigar Spotlight Ribbon */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] border border-amber-900/10">
            <div className="flex items-center space-x-3.5">
              <img
                src={activeStoryCraft.artisan.photo}
                alt={activeStoryCraft.artisan.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#B88E28]"
              />
              <div>
                <p className="text-sm font-bold text-[#0F1E2E] flex items-center gap-1 font-serif">
                  {activeStoryCraft.artisan.name}
                  <Award className="w-3.5 h-3.5 text-[#B88E28]" />
                </p>
                {currentLanguage !== 'en' && (
                  <p className="text-[11px] text-[#A84A2C] font-semibold">
                    {activeStoryCraft.artisan.regionalName}
                  </p>
                )}
                <p className="text-[11px] text-stone-500 font-sans">
                  {activeStoryCraft.artisan.village}, {activeStoryCraft.artisan.state} • {activeStoryCraft.artisan.craftsExperienceYears} {t.stories_years_exp}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCraftForCertificate(activeStoryCraft)}
              className="hidden sm:flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-white text-[#0F1E2E] text-xs font-bold border border-stone-200 shadow-2xs hover:bg-[#FAF9F6] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#27AE60]" />
              <span>GI Seal</span>
            </button>
          </div>

          {/* Narrative Text */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif text-justify bg-[#FAF9F6]/60 p-5 rounded-2xl border border-amber-900/10">
              {activeLangTab === 'regional'
                ? activeStoryCraft.regionalStory
                : activeLangTab === 'hindi'
                ? activeStoryCraft.hindiStory
                : activeStoryCraft.heritageStory}
            </p>

            {/* Natural Ingredients & Lineage Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeStoryCraft.materialsDetected.map((m, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80 font-sans">
                  🌿 {m}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div>
              <p className="text-[11px] text-stone-500 font-sans uppercase tracking-wider font-semibold">{t.stories_fair_price}</p>
              <p className="text-2xl font-extrabold text-[#A84A2C] font-serif">
                ₹{activeStoryCraft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedCraftForStory(activeStoryCraft)}
                className="px-4 py-2.5 rounded-xl bg-[#FAF9F6] text-[#0F1E2E] text-xs font-bold border border-amber-900/20 hover:bg-[#F3ECE0] shadow-2xs cursor-pointer uppercase tracking-wider font-sans"
              >
                {t.stories_view_details}
              </button>

              <a
                href={generateWhatsAppLink(activeStoryCraft, currentLanguage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#27AE60] hover:bg-[#219653] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer uppercase tracking-wider font-sans"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.stories_buy_whatsapp}</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
