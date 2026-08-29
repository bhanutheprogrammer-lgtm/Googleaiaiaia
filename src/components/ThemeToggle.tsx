import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  id?: string;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id = 'theme-toggle-btn',
  className = '',
  showLabel = false,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme (Jaali Dark)'}
      aria-label={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme (Jaali Dark)'}
      className={`relative inline-flex items-center justify-center transition-all duration-300 cursor-pointer select-none group shrink-0 ${
        showLabel
          ? 'px-3.5 py-2 rounded-xl text-xs font-semibold gap-2 border border-amber-500/30 bg-[#A0522D] text-white hover:border-amber-400'
          : className || 'p-1.5 sm:p-2 rounded-full border border-amber-500/40 bg-[#A0522D] text-amber-300 hover:text-white hover:border-amber-400 hover:bg-[#8B4513] shadow-xs'
      } ${className && showLabel ? className : ''}`}
    >
      <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center overflow-hidden shrink-0">
        {isDarkMode ? (
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
        ) : (
          <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300 group-hover:text-amber-300 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>

      {showLabel && (
        <span className="font-sans text-xs uppercase tracking-wider">
          {isDarkMode ? 'Light Mode' : 'Dark Mode (Jaali)'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
