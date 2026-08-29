import React, { useId } from 'react';

export interface ArtLynkLogoProps {
  /** Size in pixels (applies to width & height) or CSS string */
  size?: number | string;
  /** Extra Tailwind / CSS classes */
  className?: string;
  /**
   * Color mode:
   * - 'terracotta' / 'gradient' (default): Rich artisan burnt orange & terracotta gradient (#E06B26 -> #B84718)
   * - 'gold': Heritage royal brass & ochre gradient (#E5B842 -> #B88E28)
   * - 'white': Crisp monochrome white for dark surfaces
   * - Custom hex string (e.g. '#E06B26')
   */
  color?: 'terracotta' | 'gradient' | 'gold' | 'white' | 'dark' | string;
  /** Whether to render the subtle drop glow/shadow behind the arch */
  glow?: boolean;
  /** Optional title for accessibility */
  title?: string;
}

/**
 * ArtLynkLogo — Stylized Organic 'A' Arch Emblem
 * 
 * Inspired by:
 * 1. Traditional Indian Handloom Arches & Loom Healds
 * 2. Hand-thrown Terracotta Pottery Vessel contours
 * 3. Ancient Indian Jaali / Temple Archways symbolizing the direct link between Karigar & World
 */
export const ArtLynkLogo: React.FC<ArtLynkLogoProps> = ({
  size = 32,
  className = '',
  color = 'terracotta',
  glow = false,
  title = 'ArtLynk Artisan Arch Emblem',
}) => {
  const uniqueId = useId().replace(/:/g, '_');
  const gradientId = `artlynk_arch_grad_${uniqueId}`;
  const innerGradId = `artlynk_inner_grad_${uniqueId}`;
  const filterId = `artlynk_glow_${uniqueId}`;

  // Dimensions
  const dimension = typeof size === 'number' ? `${size}px` : size;

  // Determine fill colors based on color prop
  const isTerracotta = color === 'terracotta' || color === 'gradient';
  const isGold = color === 'gold';
  const isWhite = color === 'white';
  const isDark = color === 'dark';
  const isCustom = !isTerracotta && !isGold && !isWhite && !isDark;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={dimension}
      height={dimension}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={`shrink-0 select-none ${glow ? 'drop-shadow-[0_4px_14px_rgba(224,107,38,0.45)]' : ''} ${className}`}
      style={{
        width: dimension,
        height: dimension,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        {/* Primary Terracotta / Burnt Orange Gradient (#E06B26 -> #B44517) */}
        <linearGradient id={gradientId} x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#F27A35" />
          <stop offset="35%" stopColor="#E06B26" />
          <stop offset="75%" stopColor="#C8521C" />
          <stop offset="100%" stopColor="#A43D12" />
        </linearGradient>

        {/* Secondary Inner Arch Accent Gradient */}
        <linearGradient id={innerGradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FF9B5E" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#E06B26" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8C2C07" stopOpacity="0.95" />
        </linearGradient>

        {/* Heritage Gold Gradient */}
        <linearGradient id={`${gradientId}_gold`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>

        {/* Subtle Ambient Glow Filter */}
        {glow && (
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Group with optional Glow Filter */}
      <g filter={glow ? `url(#${filterId})` : undefined}>
        
        {/* =================================================================== */}
        {/* 1. OUTER LAYERED 'A' ARCH (Monumental Terracotta Archway Silhouette) */}
        {/* =================================================================== */}
        <path
          d="
            M 18,88 
            C 16.5,88 15,86.8 15,85.2 
            C 15.2,80 18.5,56 28.5,37 
            C 35.5,23.5 42.5,12 50,12 
            C 57.5,12 64.5,23.5 71.5,37 
            C 81.5,56 84.8,80 85,85.2 
            C 85,86.8 83.5,88 82,88 
            L 71,88 
            C 69.5,88 68.2,86.8 68,85.2 
            C 66.5,73 63.5,57 58,47 
            C 55.2,42 52.8,37.5 50,37.5 
            C 47.2,37.5 44.8,42 42,47 
            C 36.5,57 33.5,73 32,85.2 
            C 31.8,86.8 30.5,88 29,88 
            Z
          "
          fill={
            isTerracotta
              ? `url(#${gradientId})`
              : isGold
              ? `url(#${gradientId}_gold)`
              : isWhite
              ? '#FFFFFF'
              : isDark
              ? '#1E2838'
              : color
          }
        />

        {/* =================================================================== */}
        {/* 2. INNER ORGANIC TIER ARCH (Handloom Warp/Weft & Pottery Arch)       */}
        {/* =================================================================== */}
        <path
          d="
            M 34.5,78
            C 35.8,68 38.5,57 43.2,50
            C 46,45.8 48,43 50,43
            C 52,43 54,45.8 56.8,50
            C 61.5,57 64.2,68 65.5,78
            C 65.7,79.5 64.5,80.5 63,80.5
            L 59,80.5
            C 57.8,80.5 56.8,79.5 56.5,78.2
            C 55.5,71.5 53.5,63 50,63
            C 46.5,63 44.5,71.5 43.5,78.2
            C 43.2,79.5 42.2,80.5 41,80.5
            L 37,80.5
            C 35.5,80.5 34.3,79.5 34.5,78
            Z
          "
          fill={
            isTerracotta
              ? `url(#${innerGradId})`
              : isGold
              ? '#FDE68A'
              : isWhite
              ? 'rgba(255,255,255,0.85)'
              : isDark
              ? '#334155'
              : color
          }
          opacity={isCustom ? 0.9 : 1}
        />

        {/* =================================================================== */}
        {/* 3. ARTISAN CONNECTION CROSSBAR (The Loom Ligature & Bridge of 'A')  */}
        {/* =================================================================== */}
        <path
          d="
            M 27,62
            C 25.5,62 24.5,60.8 24.7,59.3
            C 25.5,53.5 28,49 32,49
            L 68,49
            C 72,49 74.5,53.5 75.3,59.3
            C 75.5,60.8 74.5,62 73,62
            L 63.5,62
            C 62.2,62 61.2,61 61,59.8
            C 60.5,57 58.5,55 50,55
            C 41.5,55 39.5,57 39,59.8
            C 38.8,61 37.8,62 36.5,62
            Z
          "
          fill={
            isTerracotta
              ? `url(#${gradientId})`
              : isGold
              ? `url(#${gradientId}_gold)`
              : isWhite
              ? '#FFFFFF'
              : isDark
              ? '#1E2838'
              : color
          }
        />

        {/* =================================================================== */}
        {/* 4. CENTRAL BHARAT FLAME / SEED APEX PINNACLE (The Karigar Spark)    */}
        {/* =================================================================== */}
        <circle
          cx="50"
          cy="26"
          r="4.2"
          fill={
            isTerracotta
              ? '#FFD166'
              : isGold
              ? '#FFFFFF'
              : isWhite
              ? '#FFFFFF'
              : isDark
              ? '#F59E0B'
              : color
          }
        />
        {/* Micro radiant halo around pinnacle */}
        <circle
          cx="50"
          cy="26"
          r="6.5"
          stroke={
            isTerracotta
              ? '#FFD166'
              : isGold
              ? '#FFFFFF'
              : isWhite
              ? '#FFFFFF'
              : '#F59E0B'
          }
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity="0.65"
        />

        {/* =================================================================== */}
        {/* 5. BASE FOUNDATION WEAVER PEDESTAL (Grounding the craft lineage)    */}
        {/* =================================================================== */}
        <path
          d="
            M 14,92
            C 14,90.8 15,90 16.2,90
            L 83.8,90
            C 85,90 86,90.8 86,92
            C 86,93.2 85,94 83.8,94
            L 16.2,94
            C 15,94 14,93.2 14,92
            Z
          "
          fill={
            isTerracotta
              ? '#A43D12'
              : isGold
              ? '#996515'
              : isWhite
              ? 'rgba(255,255,255,0.6)'
              : isDark
              ? '#0F172A'
              : color
          }
        />
      </g>
    </svg>
  );
};

export default ArtLynkLogo;
