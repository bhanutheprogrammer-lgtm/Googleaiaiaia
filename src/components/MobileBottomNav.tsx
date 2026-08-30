import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Package, 
  MessageSquare, 
  Calculator, 
  QrCode, 
  Map, 
  Heart, 
  Award, 
  BookOpen,
  LogIn
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { useAuth } from '../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadInquiriesCount,
    t
  } = useArtisan();

  const {
    userRole,
    wishlistIds,
    setIsPitaraDrawerOpen,
    openAuthModal
  } = useAuth();

  return (
    <nav 
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 m-0 border-t border-amber-500/30 bg-[#5C2A12]/95 backdrop-blur-lg text-white shadow-2xl pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="flex items-center justify-around px-1 py-1 max-w-lg mx-auto w-full">
        
        {/* ================= GUEST ROLE ================= */}
        {userRole === 'guest' && (
          <>
            <button
              id="mobile-nav-guest-bazaar"
              onClick={() => setActiveTab('bazaar')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[48px] ${
                activeTab === 'bazaar'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'bazaar' ? 'bg-[#B83227] text-white shadow-xs' : ''}`}>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans">
                {t.nav_crafts || 'Crafts'}
              </span>
            </button>

            <button
              id="mobile-nav-guest-stories"
              onClick={() => setActiveTab('stories')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[48px] ${
                activeTab === 'stories'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'stories' ? 'bg-[#B83227] text-white shadow-xs' : ''}`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans">
                {t.nav_stories || 'Stories'}
              </span>
            </button>

            <button
              id="mobile-nav-guest-map"
              onClick={() => setActiveTab('craft_map')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[48px] ${
                activeTab === 'craft_map'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'craft_map' ? 'bg-[#D4AF37] text-[#0C243C] shadow-xs' : ''}`}>
                <Map className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans">
                {t.nav_map || 'GI Map'}
              </span>
            </button>

            <button
              id="mobile-nav-guest-wishlist"
              onClick={() => openAuthModal('buyer', 'login')}
              className="flex flex-col items-center justify-center py-1 px-1.5 rounded-xl text-stone-400 hover:text-stone-200 transition-all cursor-pointer min-h-[44px] min-w-[48px]"
            >
              <div className="p-1 rounded-lg">
                <Heart className="w-4 h-4 text-rose-400" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans">
                {t.nav_pitara || 'Wishlist'}
              </span>
            </button>

            <button
              id="mobile-nav-guest-login"
              onClick={() => openAuthModal('buyer', 'login')}
              className="flex flex-col items-center justify-center py-1 px-1.5 rounded-xl text-amber-400 hover:text-amber-300 transition-all cursor-pointer min-h-[44px] min-w-[48px]"
            >
              <div className="p-1 rounded-lg bg-linear-to-r from-[#B83227] to-[#E67E22] text-white shadow-xs">
                <LogIn className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans font-bold">
                {t.nav_login || 'Join'}
              </span>
            </button>
          </>
        )}

        {/* ================= ARTISAN ROLE ================= */}
        {userRole === 'artisan' && (
          <>
            <button
              id="mobile-nav-artisan-scan"
              onClick={() => setActiveTab('scan_studio')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'scan_studio'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'scan_studio' ? 'bg-linear-to-r from-[#B83227] to-[#E67E22] text-white shadow-xs' : ''}`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_scan || 'AI Scan'}
              </span>
            </button>

            <button
              id="mobile-nav-artisan-ledger"
              onClick={() => setActiveTab('ledger')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'ledger'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'ledger' ? 'bg-[#D4AF37] text-[#0C243C] shadow-xs' : ''}`}>
                <Package className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_catalog || 'Catalog'}
              </span>
            </button>

            <button
              id="mobile-nav-artisan-inquiries"
              onClick={() => setActiveTab('inquiries')}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'inquiries'
                  ? 'text-emerald-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg relative ${activeTab === 'inquiries' ? 'bg-[#27AE60] text-white shadow-xs' : ''}`}>
                <MessageSquare className="w-4 h-4" />
                {unreadInquiriesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#B83227] border border-white" />
                )}
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_inquiries || 'Leads'}
              </span>
            </button>

            <button
              id="mobile-nav-artisan-pricing"
              onClick={() => setActiveTab('fair_pricing')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'fair_pricing'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'fair_pricing' ? 'bg-amber-600 text-white shadow-xs' : ''}`}>
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_pricing || 'Pricing'}
              </span>
            </button>

            <button
              id="mobile-nav-artisan-qr"
              onClick={() => setActiveTab('store_qr')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'store_qr'
                  ? 'text-purple-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'store_qr' ? 'bg-purple-800 text-white shadow-xs' : ''}`}>
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_qr || 'Store QR'}
              </span>
            </button>
          </>
        )}

        {/* ================= BUYER ROLE ================= */}
        {userRole === 'buyer' && (
          <>
            <button
              id="mobile-nav-buyer-bazaar"
              onClick={() => setActiveTab('bazaar')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'bazaar'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'bazaar' ? 'bg-linear-to-r from-[#B83227] to-[#E67E22] text-white shadow-xs' : ''}`}>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_bazaar || t.nav_crafts || 'Bazaar'}
              </span>
            </button>

            <button
              id="mobile-nav-buyer-map"
              onClick={() => setActiveTab('craft_map')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'craft_map'
                  ? 'text-emerald-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'craft_map' ? 'bg-[#117A65] text-white shadow-xs' : ''}`}>
                <Map className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_map || 'GI Map'}
              </span>
            </button>

            <button
              id="mobile-nav-buyer-pitara"
              onClick={() => setIsPitaraDrawerOpen(true)}
              className="relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] text-stone-400 hover:text-stone-200"
            >
              <div className="p-1 rounded-lg relative">
                <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'text-red-400 fill-red-400' : ''}`} />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-[#B83227] text-white text-[8px] font-bold">
                    {wishlistIds.length}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_pitara || 'Wishlist'}
              </span>
            </button>

            <button
              id="mobile-nav-buyer-certificates"
              onClick={() => setActiveTab('certificates')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'certificates'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'certificates' ? 'bg-[#D4AF37] text-[#0C243C] shadow-xs' : ''}`}>
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_certificates || 'Certificates'}
              </span>
            </button>

            <button
              id="mobile-nav-buyer-stories"
              onClick={() => setActiveTab('stories')}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer min-h-[44px] min-w-[50px] ${
                activeTab === 'stories'
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === 'stories' ? 'bg-amber-600 text-white shadow-xs' : ''}`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[65px]">
                {t.nav_stories || 'Stories'}
              </span>
            </button>
          </>
        )}

      </div>
    </nav>
  );
};
