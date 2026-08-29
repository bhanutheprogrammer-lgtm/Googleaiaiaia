import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { INDIAN_LANGUAGES } from '../data/mockCrafts';
import { LanguageModal } from './LanguageModal';

interface LanguageSelectorProps {
  id?: string;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  showPulse?: boolean;
}

export function LanguageSelector({
  id = 'language-selector',
  className = '',
  buttonClassName = '',
  showPulse = true,
}: LanguageSelectorProps) {
  const { currentLanguage } = useArtisan();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentLangMeta =
    INDIAN_LANGUAGES.find((l) => l.code === currentLanguage) || INDIAN_LANGUAGES[0];

  return (
    <div className={`relative inline-block text-left ${className}`} id={id}>
      {/* Language Trigger Button */}
      <button
        id={`${id}-btn`}
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-haspopup="dialog"
        aria-label="Select Language (17 Indian Languages)"
        className={
          buttonClassName ||
          'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-amber-500/40 bg-[#A0522D] text-white hover:border-amber-400 hover:bg-[#8B4513] transition shadow-md cursor-pointer shrink-0'
        }
      >
        {showPulse ? (
          <span className="w-1.5 h-1.5 bg-[#27AE60] rounded-full inline-block animate-pulse shrink-0" />
        ) : (
          <Globe className="w-3 h-3 text-amber-300 shrink-0" />
        )}
        <span className="truncate max-w-[38px] xxs:max-w-[50px] xs:max-w-[68px] sm:max-w-[95px] font-semibold text-[11px] sm:text-xs">
          {currentLangMeta.nativeName}
        </span>
        <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-stone-400 shrink-0" />
      </button>

      {/* Multilingual Selection Dialog Modal */}
      <LanguageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default LanguageSelector;
