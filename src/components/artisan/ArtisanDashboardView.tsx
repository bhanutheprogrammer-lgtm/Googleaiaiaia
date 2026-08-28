import React from 'react';
import { 
  Sparkles, 
  Package, 
  MessageSquare, 
  Calculator, 
  QrCode, 
  Award, 
  TrendingUp, 
  Users, 
  Coins, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useArtisan } from '../../context/ArtisanContext';
import { useAuth } from '../../context/AuthContext';
import { ArtisanProfile } from '../../types';
import { AiScanStudio } from '../AiScanStudio';
import { ArtisanCatalogManager } from './ArtisanCatalogManager';
import { ArtisanInquiriesLedger } from './ArtisanInquiriesLedger';
import { ArtisanFairPriceCalculator } from './ArtisanFairPriceCalculator';
import { ArtisanStoreQRFlyer } from './ArtisanStoreQRFlyer';

interface ArtisanDashboardViewProps {
  artisan?: ArtisanProfile;
}

export const ArtisanDashboardView: React.FC<ArtisanDashboardViewProps> = ({ artisan: propArtisan }) => {
  const { 
    activeTab, 
    setActiveTab, 
    crafts, 
    inquiries, 
    unreadInquiriesCount,
    artisan: contextArtisan,
    t
  } = useArtisan();

  const currentArtisan = propArtisan || contextArtisan;

  const myCrafts = crafts.filter(
    (c) => c.artisan.id === currentArtisan.id || c.artisan.name === currentArtisan.name
  );

  const totalFairValue = myCrafts.reduce(
    (acc, c) => acc + (c.pricingEstimation.recommendedRetailPriceINR || 0), 
    0
  );

  const totalViews = myCrafts.reduce((acc, c) => acc + (c.viewsCount || 420), 0);

  return (
    <div id="artisan-studio-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Studio Overview & Live Stats Banner */}
      <section id="artisan-overview-banner" className="bg-[#0F1E2E] text-white border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Mandala Glow */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Artisan Greeting & Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={currentArtisan.photo}
              alt={currentArtisan.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#B88E28] shadow-lg shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full bg-[#A84A2C] text-white text-[10px] font-sans font-bold uppercase tracking-wider shadow-xs">
                  {t.dash_karkhana_badge || 'Artisan Karkhana Studio'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] font-sans font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>{t.dash_gi_certified_guild || 'GI Certified Guild'}</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#FAF9F6] tracking-tight">
                {t.dash_artisan_greeting || 'Namaste'} {currentArtisan.name}
              </h1>
              <p className="text-stone-300 text-xs sm:text-sm font-sans mt-0.5">
                {currentArtisan.masterTitle} • 📍 {currentArtisan.village}, {currentArtisan.state}
              </p>
            </div>
          </div>

          {/* Quick Tab Action Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('scan_studio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                activeTab === 'scan_studio'
                  ? 'bg-linear-to-r from-[#A84A2C] to-amber-600 text-white border border-amber-400/50'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>✨ {t.dash_new_scan || 'AI Scan'}</span>
            </button>

            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                activeTab === 'ledger'
                  ? 'bg-amber-400 text-[#0F1E2E] font-extrabold'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>📦 {t.nav_catalog || 'Catalog'} ({myCrafts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                activeTab === 'inquiries'
                  ? 'bg-[#27AE60] text-white'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>💬 {t.nav_inquiries || 'Leads'} ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('fair_pricing')}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                activeTab === 'fair_pricing'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>🏷️ {t.nav_pricing || 'Pricing'}</span>
            </button>

            <button
              onClick={() => setActiveTab('store_qr')}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                activeTab === 'store_qr'
                  ? 'bg-purple-800 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>📱 {t.nav_qr || 'QR'}</span>
            </button>
          </div>
        </div>

        {/* 4 Core Quick Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          
          {/* Metric 1: Active Listed Crafts */}
          <div 
            onClick={() => setActiveTab('ledger')}
            className="bg-white/5 hover:bg-white/10 border border-amber-500/20 rounded-2xl p-4 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-300">
                {t.dash_crafts_count || 'Active Crafts Listed'}
              </span>
              <Package className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-black text-amber-300 mt-1">
              {myCrafts.length}
            </p>
            <span className="text-[10px] text-emerald-400 font-sans">
              ✓ 100% GI Verified
            </span>
          </div>

          {/* Metric 2: WhatsApp Leads */}
          <div 
            onClick={() => setActiveTab('inquiries')}
            className="bg-white/5 hover:bg-white/10 border border-amber-500/20 rounded-2xl p-4 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-300">
                {t.dash_inquiries_count || 'Direct WhatsApp Leads'}
              </span>
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-black text-emerald-400 mt-1">
              {inquiries.length}
            </p>
            <span className="text-[10px] text-stone-300 font-sans">
              {unreadInquiriesCount} {t.dash_new_inquiry || 'new leads'}
            </span>
          </div>

          {/* Metric 3: Heritage Views */}
          <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-300">
                {t.dash_views_count || 'Heritage Views'}
              </span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-black text-[#FAF9F6] mt-1">
              {totalViews.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-blue-300 font-sans">
              Pan-India & Global
            </span>
          </div>

          {/* Metric 4: Total Catalog Value */}
          <div 
            onClick={() => setActiveTab('fair_pricing')}
            className="bg-white/5 hover:bg-white/10 border border-amber-500/20 rounded-2xl p-4 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-300">
                {t.dash_catalog_val || 'Fair Catalog Value'}
              </span>
              <Coins className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif font-black text-amber-300 mt-1">
              ₹{totalFairValue.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-stone-300 font-sans">
              {t.dash_zero_middleman || 'Zero middleman cut'}
            </span>
          </div>

        </div>
      </section>

      {/* 2. Isolated Tab Workspace Views */}
      <section id="artisan-active-tab-container">
        {activeTab === 'scan_studio' && (
          <div className="animate-in fade-in duration-200">
            <AiScanStudio />
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="animate-in fade-in duration-200">
            <ArtisanCatalogManager />
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="animate-in fade-in duration-200">
            <ArtisanInquiriesLedger />
          </div>
        )}

        {activeTab === 'fair_pricing' && (
          <div className="animate-in fade-in duration-200">
            <ArtisanFairPriceCalculator />
          </div>
        )}

        {activeTab === 'store_qr' && (
          <div className="animate-in fade-in duration-200">
            <ArtisanStoreQRFlyer />
          </div>
        )}
      </section>

    </div>
  );
};
