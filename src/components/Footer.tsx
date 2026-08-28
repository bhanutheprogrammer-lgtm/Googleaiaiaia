import React from 'react';
import { 
  Flame, 
  ShieldCheck, 
  Award, 
  Heart, 
  Sparkles, 
  MapPin, 
  Languages, 
  ExternalLink 
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { ArtisanLinkLogo } from './ArtisanLinkLogo';

export const Footer: React.FC = () => {
  const { setLanguage, setActiveTab, t, currentLanguage } = useArtisan();

  return (
    <footer className="bg-[#0C243C] text-[#FAF6EE] border-t-2 border-[#D4AF37] relative overflow-hidden pt-12 sm:pt-16 pb-20 md:pb-12 m-0">
      {/* Background Mandala Watermark */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-radial from-amber-500/10 to-transparent pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Tier: Brand & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <ArtisanLinkLogo size={48} />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight font-serif text-[#FAF6EE]">
                  {t.app_name || 'ArtLynk'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans opacity-70 text-stone-300">
                  {t.footer_tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 max-w-sm leading-relaxed font-serif">
              {t.footer_mission}
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-white/10 text-amber-300 text-xs font-sans uppercase tracking-wider font-semibold border border-amber-300/30">
              <ShieldCheck className="w-4 h-4 text-[#27AE60]" />
              <span>{t.footer_seal}</span>
            </div>
          </div>

          {/* Center Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">
              {t.footer_nav_title}
            </h3>
            <ul className="space-y-2 text-xs text-stone-300 font-sans uppercase tracking-wider">
              <li>
                <button onClick={() => setActiveTab('bazaar')} className="hover:text-amber-200 transition-colors cursor-pointer">
                  • {t.nav_crafts}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stories')} className="hover:text-amber-200 transition-colors cursor-pointer">
                  • {t.nav_stories}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('craft_map')} className="hover:text-amber-200 transition-colors cursor-pointer">
                  • {t.nav_map}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('scan_studio')} className="hover:text-amber-200 transition-colors cursor-pointer">
                  • {t.nav_scan}
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Script Quick Switcher */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              <span>{t.footer_lang_title}</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {INDIAN_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-sm text-[11px] font-medium border transition-colors cursor-pointer font-sans ${
                    currentLanguage === lang.code
                      ? 'bg-[#B83227] text-white border-[#B83227]'
                      : 'bg-white/5 hover:bg-white/15 text-stone-300 hover:text-amber-200 border-white/10'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Tier: Editorial Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-[0.2em] font-sans text-stone-400 gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {t.footer_rights}
          </div>
          <div className="flex flex-wrap gap-6 text-stone-400">
            <span>{t.footer_10_lang}</span>
            <span>{t.footer_seal}</span>
            <span>{t.footer_verified_gi}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
