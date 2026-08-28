import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Info,
  Clock,
  Printer
} from 'lucide-react';
import { useArtisan } from '../../context/ArtisanContext';

export const ArtisanFairPriceCalculator: React.FC = () => {
  const { artisan, triggerMarigoldConfetti, t } = useArtisan();

  // Calculator State
  const [materialCost, setMaterialCost] = useState<number>(4200);
  const [craftingDays, setCraftingDays] = useState<number>(14);
  const [dailyWageRate, setDailyWageRate] = useState<number>(350); // Fair master wage per day
  const [logisticsPackaging, setLogisticsPackaging] = useState<number>(600);
  const [guildReservePercent, setGuildReservePercent] = useState<number>(10); // 10% artisan emergency buffer

  // Calculations
  const rawLaborCost = craftingDays * dailyWageRate;
  const subtotal = materialCost + rawLaborCost + logisticsPackaging;
  const reserveBuffer = Math.round((subtotal * guildReservePercent) / 100);
  const totalFairRetailPrice = subtotal + reserveBuffer;

  // Commercial Middleman Markup Comparison
  const commercialRetailMarkup = Math.round(totalFairRetailPrice * 2.8);
  const artisanSharePercent = Math.round(((rawLaborCost + reserveBuffer) / totalFairRetailPrice) * 100);

  const handleApplyPreset = (preset: 'silk' | 'dhokra' | 'terracotta' | 'pottery') => {
    if (preset === 'silk') {
      setMaterialCost(4200);
      setCraftingDays(14);
      setDailyWageRate(350);
      setLogisticsPackaging(600);
    } else if (preset === 'dhokra') {
      setMaterialCost(1600);
      setCraftingDays(8);
      setDailyWageRate(380);
      setLogisticsPackaging(450);
    } else if (preset === 'terracotta') {
      setMaterialCost(450);
      setCraftingDays(5);
      setDailyWageRate(320);
      setLogisticsPackaging(350);
    } else if (preset === 'pottery') {
      setMaterialCost(900);
      setCraftingDays(7);
      setDailyWageRate(340);
      setLogisticsPackaging(500);
    }
    triggerMarigoldConfetti();
  };

  return (
    <div id="fair-price-calculator-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#0C243C] via-[#162E4A] to-[#0C243C] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-amber-300 text-xs font-bold font-sans uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.calc_title || 'Kala-Moolya Fair Pricing Engine'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#FAF6EE]">
              {t.calc_title || 'Kala-Moolya Fair Price & Margin Calculator'}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              {t.calc_desc || 'Never undersell your hereditary labor. This formula calculates a 100% fair living wage based on material purity, painstaking days of craftsmanship, and sustainable packaging.'}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-amber-200 uppercase tracking-wider block sm:hidden">{t.filter_all || 'Presets'}:</span>
            <button
              onClick={() => handleApplyPreset('silk')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#B83227] text-white text-xs font-semibold transition-all border border-white/20 hover:border-amber-400 cursor-pointer"
            >
              🧵 Silk Saree
            </button>
            <button
              onClick={() => handleApplyPreset('dhokra')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#B83227] text-white text-xs font-semibold transition-all border border-white/20 hover:border-amber-400 cursor-pointer"
            >
              🦌 Dhokra Metal
            </button>
            <button
              onClick={() => handleApplyPreset('pottery')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#B83227] text-white text-xs font-semibold transition-all border border-white/20 hover:border-amber-400 cursor-pointer"
            >
              🏺 Blue Pottery
            </button>
            <button
              onClick={() => handleApplyPreset('terracotta')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#B83227] text-white text-xs font-semibold transition-all border border-white/20 hover:border-amber-400 cursor-pointer"
            >
              🐘 Terracotta
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF6EE] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <h3 className="font-serif font-bold text-[#0C243C] text-lg flex items-center gap-2">
              <span>📝</span>
              <span>{t.calc_cost_variables || 'Karigar Cost Variables'}</span>
            </h3>
            <span className="text-[11px] font-sans text-stone-500 font-semibold">
              Live Real-Time Formula
            </span>
          </div>

          <div className="space-y-5 font-sans">
            {/* 1. Raw Material Cost */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0C243C] uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. {t.calc_materials || 'Raw Materials & Pure Extracts'}</span>
                  <span title="Pure mulberry silk, natural madder root, bell metal, quartz powder, etc." className="text-stone-400 cursor-help">ℹ️</span>
                </label>
                <span className="font-serif font-bold text-[#B83227] text-sm">
                  ₹{materialCost.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={25000}
                step={100}
                value={materialCost}
                onChange={(e) => setMaterialCost(Number(e.target.value))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#B83227]"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>Min: ₹200</span>
                <span>Max: ₹25,000</span>
              </div>
            </div>

            {/* 2. Crafting Days / Time */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0C243C] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>2. {t.calc_days || 'Crafting Days on Loom / Wheel'}</span>
                </label>
                <span className="font-serif font-bold text-[#0C243C] text-sm">
                  {craftingDays} {t.craft_days || 'Days'} ({craftingDays * 8} Hours of Labor)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={90}
                step={1}
                value={craftingDays}
                onChange={(e) => setCraftingDays(Number(e.target.value))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>1 Day</span>
                <span>30 Days</span>
                <span>90 Days (Royal Sozni/Pashmina)</span>
              </div>
            </div>

            {/* 3. Daily Living Artisan Wage */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0C243C] uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#27AE60]" />
                  <span>3. {t.calc_daily_wage || 'Fair Daily Master Wage Rate'}</span>
                </label>
                <span className="font-serif font-bold text-[#27AE60] text-sm">
                  ₹{dailyWageRate}/day
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={1200}
                step={25}
                value={dailyWageRate}
                onChange={(e) => setDailyWageRate(Number(e.target.value))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#27AE60]"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>₹200 (Grassroots apprentice)</span>
                <span>₹350 (State standard)</span>
                <span>₹1,200 (National GI Master)</span>
              </div>
            </div>

            {/* 4. Eco Packaging & Logistics */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0C243C] uppercase tracking-wider flex items-center gap-1.5">
                  <span>4. {t.calc_packaging || 'Packaging & Transport'}</span>
                </label>
                <span className="font-serif font-bold text-[#0C243C] text-sm">
                  ₹{logisticsPackaging.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={2500}
                step={50}
                value={logisticsPackaging}
                onChange={(e) => setLogisticsPackaging(Number(e.target.value))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-[#0C243C]"
              />
            </div>

            {/* 5. Guild Heritage Buffer % */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0C243C] uppercase tracking-wider flex items-center gap-1.5">
                  <span>5. {t.calc_guild_buffer || 'Guild Welfare & Buffer'}</span>
                </label>
                <span className="font-serif font-bold text-amber-700 text-sm">
                  {guildReservePercent}% (₹{reserveBuffer.toLocaleString('en-IN')})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={guildReservePercent}
                onChange={(e) => setGuildReservePercent(Number(e.target.value))}
                className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Transparent Rate Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Main Price Card */}
          <div className="bg-[#0C243C] text-white border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold font-sans">
                  Kala-Moolya Certified
                </span>
                <h4 className="text-xl font-bold font-serif text-[#FAF6EE]">
                  {t.calc_recommended_price || 'Recommended Fair Price'}
                </h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-amber-300 font-bold">
                ₹
              </div>
            </div>

            {/* Big Fair Price Number */}
            <div className="my-5 text-center bg-white/5 border border-[#D4AF37]/30 rounded-2xl py-4">
              <span className="text-3xl sm:text-4xl font-black font-serif text-amber-300 tracking-tight">
                ₹{totalFairRetailPrice.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-stone-300 font-sans mt-1">
                {t.dash_zero_middleman || '100% Direct Karigar Pay • Zero Middleman Deduction'}
              </p>
            </div>

            {/* Cost Breakdown Progress Bar */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B83227]"></span>
                  <span>{t.calc_materials || 'Raw Materials'}:</span>
                </span>
                <span className="font-bold text-white font-serif">₹{materialCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27AE60]"></span>
                  <span>{t.craft_wage || 'Artisan Direct Labor'} ({craftingDays}d):</span>
                </span>
                <span className="font-bold text-emerald-300 font-serif">₹{rawLaborCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3498DB]"></span>
                  <span>{t.calc_packaging || 'Packaging'}:</span>
                </span>
                <span className="font-bold text-white font-serif">₹{logisticsPackaging.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F39C12]"></span>
                  <span>{t.calc_guild_buffer || 'Guild Buffer'} ({guildReservePercent}%):</span>
                </span>
                <span className="font-bold text-amber-300 font-serif">₹{reserveBuffer.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Fair Pay Impact Metric */}
            <div className="mt-5 p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-[11px] text-emerald-100 font-sans leading-tight">
                <span className="font-bold text-emerald-300">{artisanSharePercent}% of every Rupee</span> goes directly to the Karigar family, compared to just 15-20% in traditional commercial showrooms.
              </div>
            </div>
          </div>

          {/* Middleman Markup Comparison */}
          <div className="bg-[#FAF6EE] border-2 border-stone-300 rounded-3xl p-5 shadow-md">
            <h5 className="font-serif font-bold text-[#0C243C] text-sm flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#B83227]" />
              <span>Showroom Markup Comparison</span>
            </h5>
            <p className="text-[11px] text-stone-600 font-sans">
              Commercial luxury boutiques typically price this exact item at:
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold font-serif text-stone-400 line-through">
                ₹{commercialRetailMarkup.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-[#27AE60] bg-emerald-100 px-2 py-0.5 rounded-md">
                You save buyers ₹{(commercialRetailMarkup - totalFairRetailPrice).toLocaleString('en-IN')} while earning 3x higher wages
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
