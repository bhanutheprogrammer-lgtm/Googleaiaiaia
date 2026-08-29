import React from 'react';
import { 
  Sparkles, 
  Package, 
  MessageSquare, 
  Calculator, 
  QrCode
} from 'lucide-react';
import { useArtisan } from '../../context/ArtisanContext';
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

  return (
    <div id="artisan-studio-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Sleek Workspace Sub-Navigation Tab Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
          <button
            id="artisan-tab-scan-studio"
            onClick={() => setActiveTab('scan_studio')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
              activeTab === 'scan_studio'
                ? 'bg-linear-to-r from-[#A84A2C] to-amber-600 text-white border border-amber-400/60 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeTab === 'scan_studio' ? 'text-amber-300' : 'text-[#A84A2C]'}`} />
            <span>{t.dash_new_scan || 'AI Scan Studio'}</span>
          </button>

          <button
            id="artisan-tab-catalog"
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
              activeTab === 'ledger'
                ? 'bg-[#0F1E2E] text-amber-300 border border-amber-500/50 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Package className={`w-4 h-4 ${activeTab === 'ledger' ? 'text-amber-400' : 'text-stone-600'}`} />
            <span>{t.nav_catalog || 'My Catalog'} ({myCrafts.length})</span>
          </button>

          <button
            id="artisan-tab-inquiries"
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm relative ${
              activeTab === 'inquiries'
                ? 'bg-[#1e4d38] text-white border border-emerald-400/50 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <MessageSquare className={`w-4 h-4 ${activeTab === 'inquiries' ? 'text-emerald-300' : 'text-emerald-600'}`} />
            <span>{t.nav_inquiries || 'Direct Leads'} ({inquiries.length})</span>
            {unreadInquiriesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black">
                {unreadInquiriesCount}
              </span>
            )}
          </button>

          <button
            id="artisan-tab-pricing"
            onClick={() => setActiveTab('fair_pricing')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
              activeTab === 'fair_pricing'
                ? 'bg-[#B88E28] text-stone-950 font-black border border-amber-300 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Calculator className={`w-4 h-4 ${activeTab === 'fair_pricing' ? 'text-stone-950' : 'text-amber-600'}`} />
            <span>{t.nav_pricing || 'Fair Pricing'}</span>
          </button>

          <button
            id="artisan-tab-store-qr"
            onClick={() => setActiveTab('store_qr')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
              activeTab === 'store_qr'
                ? 'bg-purple-900 text-white border border-purple-400/50 shadow-md ring-2 ring-purple-500/20'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <QrCode className={`w-4 h-4 ${activeTab === 'store_qr' ? 'text-purple-300' : 'text-purple-700'}`} />
            <span>{t.nav_qr || 'Store QR'}</span>
          </button>
        </div>
      </div>

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

