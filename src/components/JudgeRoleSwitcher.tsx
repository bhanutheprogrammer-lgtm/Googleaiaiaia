import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';
import { Sparkles } from 'lucide-react';

export const JudgeRoleSwitcher: React.FC = () => {
  const { userRole, currentUser, openAuthModal, logout } = useAuth();
  const { setActiveTab, triggerMarigoldConfetti, t } = useArtisan();

  const handleSwitchView = (targetRole: 'artisan' | 'buyer' | 'guest') => {
    if (targetRole === 'guest') {
      logout();
      setActiveTab('bazaar');
      return;
    }

    // If the user is currently a guest / not logged in, trigger role-specific Auth Modal:
    if (userRole === 'guest' || !currentUser) {
      openAuthModal(targetRole);
      return;
    }

    // If already logged in with a different role, trigger role-specific Auth Modal:
    if (userRole !== targetRole) {
      openAuthModal(targetRole);
      return;
    }

    // If already in that role, ensure default tab
    if (targetRole === 'artisan') {
      setActiveTab('scan_studio');
    } else {
      setActiveTab('bazaar');
    }
    triggerMarigoldConfetti();
  };

  return (
    <aside 
      aria-label="Judge Demo Quick View Switcher"
      className="fixed bottom-20 sm:bottom-24 md:bottom-6 right-3 sm:right-6 z-40 bg-[#0C243C]/95 backdrop-blur-md rounded-full border border-amber-500/40 shadow-lg sm:shadow-2xl p-1 sm:p-1.5 flex items-center gap-1 text-white animate-in slide-in-from-bottom-5 duration-300 font-sans max-w-[calc(100vw-24px)]"
    >
      {/* Label */}
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-amber-300 border-r border-[#D4AF37]/40 uppercase tracking-wider select-none">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span>⚡ {t.switch_view_label || 'Role:'}</span>
      </div>

      {/* 1. Artisan Studio Button */}
      <button
        id="judge-switch-artisan-btn"
        onClick={() => handleSwitchView('artisan')}
        className={`px-2 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer select-none ${
          userRole === 'artisan'
            ? 'bg-linear-to-r from-[#B83227] to-[#E67E22] text-white shadow-md border border-[#D4AF37]'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
      >
        <span>🪔</span>
        <span className="hidden xs:inline">Artisan</span>
        <span className="hidden sm:inline">Studio</span>
      </button>

      {/* 2. Buyer Marketplace Button */}
      <button
        id="judge-switch-buyer-btn"
        onClick={() => handleSwitchView('buyer')}
        className={`px-2 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer select-none ${
          userRole === 'buyer'
            ? 'bg-[#117A65] text-white shadow-md border border-emerald-400/60'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
      >
        <span>🛍️</span>
        <span className="hidden xs:inline">Buyer</span>
        <span className="hidden sm:inline">Market</span>
      </button>

      {/* 3. Guest View Button */}
      <button
        id="judge-switch-guest-btn"
        onClick={() => handleSwitchView('guest')}
        className={`px-2 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer select-none ${
          userRole === 'guest'
            ? 'bg-stone-200 text-[#0C243C] shadow-md font-extrabold'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
      >
        <span>👁️</span>
        <span>Guest</span>
      </button>
    </aside>
  );
};

