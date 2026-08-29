import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../types';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { useArtisan } from '../context/ArtisanContext';
import { ArtLynkLogo } from './ArtLynkLogo';

interface LanguageGatewayScreenProps {
  onComplete: () => void;
}

export const LanguageGatewayScreen: React.FC<LanguageGatewayScreenProps> = ({ onComplete }) => {
  const { currentLanguage, setLanguage } = useArtisan();
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLanguage || 'te');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  // Filter languages by search query across label, native name, and region
  const filteredLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return INDIAN_LANGUAGES;
    return INDIAN_LANGUAGES.filter(
      (lang) =>
        lang.label.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.region.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectLanguage = (code: LanguageCode, immediateTransition = false) => {
    setSelectedLang(code);
    setLanguage(code);

    if (immediateTransition) {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 400);
    }
  };

  const handleConfirm = () => {
    setLanguage(selectedLang);
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const activeLangMeta = INDIAN_LANGUAGES.find((l) => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="language-selection-gateway"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] min-h-screen bg-[#071422] text-white flex flex-col items-center justify-between p-4 sm:p-8 md:p-10 relative overflow-hidden select-none"
        >
          {/* Ambient Heritage Aura Backgrounds */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-32 w-96 h-96 bg-terracotta-600/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />

            {/* Subtle Indian Jaali Geometric Lattice Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.04] bg-repeat"
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, #FFD166 2px, transparent 0), radial-gradient(circle at 75px 75px, #FFD166 2px, transparent 0)`,
                backgroundSize: '100px 100px'
              }}
            />
          </div>

          {/* Top Header Section */}
          <header className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full mt-2 sm:mt-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-2 mb-3 cursor-pointer group"
              onClick={() => handleSelectLanguage(selectedLang, true)}
            >
              <ArtLynkLogo size={42} glow color="gradient" />
              <div className="flex flex-col items-start">
                <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  ArtLynk
                  <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-sans font-semibold border border-amber-500/30">
                    Bharat Gateway
                  </span>
                </span>
                <span className="text-[10px] text-amber-200/70 tracking-wider uppercase font-medium">
                  Direct Artisan Marketplace
                </span>
              </div>
            </motion.div>

            {/* Multilingual Headline */}
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-amber-300 font-bold text-center tracking-tight leading-snug sm:leading-tight mb-2"
            >
              Choose Your Language
              <span className="block text-lg sm:text-2xl text-amber-100/90 font-normal mt-1">
                अपनी भाषा चुनें • మీ భాషను ఎంచుకోండి
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto flex items-center justify-center gap-1.5 font-sans"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Connecting you directly to 70 lakh artisans in your mother tongue (17 Indian Languages)
            </motion.p>

            {/* Quick Search Bar */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-4 w-full max-w-md relative"
            >
              <Search className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="language-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language or state (e.g., Telugu, Hindi, Assam)..."
                className="w-full bg-white/10 text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 border border-white/15 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/10"
                >
                  Clear
                </button>
              )}
            </motion.div>
          </header>

          {/* Center: Interactive 17-Language Grid */}
          <main className="relative z-10 w-full max-w-5xl my-4 flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-h-[52vh] sm:max-h-[55vh] overflow-y-auto pr-1 pl-1 py-1 custom-scrollbar">
              {filteredLanguages.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Globe2 className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-60" />
                  <p className="text-sm">No matching languages found for "{searchQuery}"</p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs text-amber-300 underline underline-offset-4 hover:text-amber-200"
                  >
                    View all 17 languages
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 w-full">
                  {filteredLanguages.map((lang, index) => {
                    const isSelected = selectedLang === lang.code;
                    return (
                      <motion.button
                        key={lang.code}
                        id={`language-gateway-btn-${lang.code}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.02, duration: 0.3 }}
                        onClick={() => handleSelectLanguage(lang.code, false)}
                        onDoubleClick={() => handleSelectLanguage(lang.code, true)}
                        className={`group relative p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center active:scale-95 border text-left ${
                          isSelected
                            ? 'bg-gradient-to-b from-amber-500/25 to-amber-900/40 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/40'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-amber-400/40 hover:shadow-lg'
                        }`}
                      >
                        {/* Selected Indicator Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 text-[#071422] flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}

                        {/* Language Code Tag */}
                        <span className="text-[10px] tracking-widest font-mono uppercase text-slate-400 group-hover:text-amber-200/80 mb-1">
                          {lang.code.toUpperCase()}
                        </span>

                        {/* Native Script Large Display */}
                        <div
                          className={`text-lg sm:text-xl font-bold tracking-normal transition-colors duration-200 ${
                            isSelected
                              ? 'text-amber-300'
                              : 'text-white group-hover:text-amber-200'
                          } ${lang.scriptFont || ''}`}
                        >
                          {lang.nativeName}
                        </div>

                        {/* English Label */}
                        <div className="text-xs text-slate-300 font-medium mt-0.5">
                          {lang.label}
                        </div>

                        {/* Region / Native State */}
                        <div className="text-[10px] text-slate-400 group-hover:text-slate-300 mt-1 line-clamp-1 w-full text-center px-1">
                          {lang.region}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </main>

          {/* Bottom Action Bar */}
          <footer className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-3">
            {/* Dynamic Greeting in Selected Language */}
            <motion.div
              key={selectedLang}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-amber-200 font-medium text-center bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{activeLangMeta.greeting}</span>
            </motion.div>

            {/* Enter Button & Direct Skip */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <button
                id="language-gateway-confirm-btn"
                type="button"
                onClick={handleConfirm}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-terracotta-500 text-[#071422] font-semibold text-sm sm:text-base hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.35)] cursor-pointer"
              >
                <span>Enter in {activeLangMeta.nativeName} ({activeLangMeta.label})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="language-gateway-skip-btn"
                type="button"
                onClick={() => {
                  setLanguage('en');
                  handleConfirm();
                }}
                className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Continue in English
              </button>
            </div>

            {/* Zero Commission / Direct Link Guarantee */}
            <p className="text-[10px] text-slate-400 text-center tracking-wide">
              🇮🇳 100% Direct Artisan Link • 0% Commission • Verified GI Certificates
            </p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
