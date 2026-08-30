import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  Heart, 
  ShieldCheck, 
  ShoppingBag, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  TrendingUp, 
  FileText,
  User,
  SlidersHorizontal,
  Lock,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useArtisan } from '../context/ArtisanContext';
import { CraftCategory, CraftItem } from '../types';

export const BuyerDashboard: React.FC = () => {
  const { 
    buyerUser, 
    wishlistIds, 
    toggleWishlist, 
    purchasedCertificates, 
    acquireCraftCertificate,
    openAuthModal,
    userRole
  } = useAuth();

  const { 
    crafts, 
    setSelectedCraftForStory, 
    setSelectedCraftForCertificate, 
    generateWhatsAppLink,
    setActiveTab,
    triggerMarigoldConfetti
  } = useArtisan();

  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'pitara' | 'vault' | 'impact'>('feed');

  const buyer = buyerUser;

  // Filter crafts for personalized Virasat Feed based on favorite mediums
  const personalizedCrafts = crafts.filter((craft) => {
    if (!buyer?.favoriteMediums?.length) return true;
    return buyer.favoriteMediums.includes(craft.category);
  });

  const wishlistedCrafts = crafts.filter((craft) => wishlistIds.includes(craft.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Patron Royal Header & Impact Badge */}
      <div className="bg-[#0C243C] rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        {/* Subtle Ambient Aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar & Patron Level Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={buyer?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={buyer?.name || 'Heritage Patron'}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#27AE60] text-white rounded-full flex items-center justify-center border-2 border-[#0C243C]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-[#B83227] to-[#E67E22] text-white text-xs font-bold font-sans border border-[#D4AF37]/50 shadow-xs">
                  👑 {buyer?.patronLevel || 'Guardian of Indian Handloom — Level 2'}
                </span>
                <span className="text-[11px] text-amber-300 font-mono font-bold bg-white/10 px-2 py-0.5 rounded-md">
                  {buyer?.patronPoints || 1850} Patron Karma Pts
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FAF6EE] mt-1.5">
                {buyer?.name || 'Ananya Sharma'}
              </h1>
              <p className="text-xs text-stone-300 font-sans flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{buyer?.location || 'Bengaluru, Karnataka'}</span>
                <span>•</span>
                <span>Direct Patron since 2026</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('bazaar')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-sans flex items-center gap-2 transition-all border border-white/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Explore Bazaar</span>
            </button>

            <button
              onClick={() => setActiveSubTab('vault')}
              className="px-4 py-2.5 rounded-xl bg-linear-to-r from-[#B83227] to-[#8C231A] text-white text-xs font-bold font-sans flex items-center gap-2 transition-all border border-[#D4AF37] shadow-md cursor-pointer hover:scale-105"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Certificate Vault ({purchasedCertificates.length})</span>
            </button>
          </div>

        </div>

        {/* 4 Impact Metric Highlights */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase tracking-widest font-sans font-bold">
              Direct Wages Supported
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-amber-300 mt-1">
              ₹{(buyer?.directWagesSupportedINR || 45000).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-emerald-400 font-sans font-semibold mt-0.5">
              100% Fair Pay directly to Karigars
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase tracking-widest font-sans font-bold">
              Karigar Families Empowered
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
              {buyer?.familiesEmpowered || 2} Guilds
            </div>
            <p className="text-[10px] text-stone-300 font-sans mt-0.5">
              Telangana & Rajasthan heritage
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase tracking-widest font-sans font-bold">
              Wishlist (Saved)
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
              {wishlistIds.length} Masterpieces
            </div>
            <p className="text-[10px] text-amber-300 font-sans mt-0.5">
              In your personal collection
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase tracking-widest font-sans font-bold">
              GI Authenticity Vault
            </span>
            <div className="text-xl sm:text-2xl font-serif font-black text-amber-300 mt-1">
              {purchasedCertificates.length} Certified
            </div>
            <p className="text-[10px] text-emerald-400 font-sans font-semibold mt-0.5">
              Encrypted provenance
            </p>
          </div>
        </div>

      </div>

      {/* Patron Portal Navigation Tabs */}
      <div className="flex border-b border-[#D4AF37]/40 space-x-2 sm:space-x-4 overflow-x-auto pb-1">
        <button
          id="patron-tab-feed"
          onClick={() => setActiveSubTab('feed')}
          className={`px-4 py-2.5 rounded-t-xl font-serif text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'feed'
              ? 'bg-[#0C243C] text-amber-300 border-t-2 border-l-2 border-r-2 border-[#D4AF37]'
              : 'text-stone-600 hover:text-[#0C243C] bg-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Virasat Feed (Heritage Feed)</span>
        </button>

        <button
          id="patron-tab-pitara"
          onClick={() => setActiveSubTab('pitara')}
          className={`px-4 py-2.5 rounded-t-xl font-serif text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'pitara'
              ? 'bg-[#0C243C] text-amber-300 border-t-2 border-l-2 border-r-2 border-[#D4AF37]'
              : 'text-stone-600 hover:text-[#0C243C] bg-white/50'
          }`}
        >
          <Heart className="w-4 h-4 text-[#B83227]" />
          <span>Wishlist ({wishlistIds.length})</span>
        </button>

        <button
          id="patron-tab-vault"
          onClick={() => setActiveSubTab('vault')}
          className={`px-4 py-2.5 rounded-t-xl font-serif text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'vault'
              ? 'bg-[#0C243C] text-amber-300 border-t-2 border-l-2 border-r-2 border-[#D4AF37]'
              : 'text-stone-600 hover:text-[#0C243C] bg-white/50'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Digital Certificate Vault ({purchasedCertificates.length})</span>
        </button>

        <button
          id="patron-tab-impact"
          onClick={() => setActiveSubTab('impact')}
          className={`px-4 py-2.5 rounded-t-xl font-serif text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'impact'
              ? 'bg-[#0C243C] text-amber-300 border-t-2 border-l-2 border-r-2 border-[#D4AF37]'
              : 'text-stone-600 hover:text-[#0C243C] bg-white/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>Patron Karma & Impact Meter</span>
        </button>
      </div>

      {/* SUB-VIEW 1: VIRASAT FEED (Personalized Recommendations) */}
      {activeSubTab === 'feed' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF6EE] p-4 rounded-2xl border border-[#D4AF37]/50">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#0C243C]">
                Curated Virasat Recommendations
              </h3>
              <p className="text-xs text-stone-600 font-sans">
                Tailored for your interest in <strong>{buyer?.favoriteMediums?.join(', ') || 'Handloom, Pottery, Metalcraft'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#B83227]">
              <span>🏛️ 100% Shuddh Hastshilp Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedCrafts.map((craft) => {
              const waLink = generateWhatsAppLink(craft);
              const isSaved = wishlistIds.includes(craft.id);

              return (
                <div
                  key={craft.id}
                  className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={craft.imageUrl}
                      alt={craft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0C243C]/80 text-amber-300 text-[10px] font-sans font-bold backdrop-blur-xs border border-[#D4AF37]/40">
                      {craft.category} • {craft.stateOfOrigin}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(craft.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer ${
                        isSaved ? 'bg-[#B83227] text-white shadow-md' : 'bg-white/80 text-stone-700 hover:text-[#B83227]'
                      }`}
                      title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[10px] text-amber-700 font-sans font-bold uppercase tracking-wider">
                        GI Certificate #{craft.certificateId}
                      </div>
                      <h4 className="text-base font-bold font-serif text-[#0C243C] line-clamp-1 mt-0.5">
                        {craft.title}
                      </h4>
                      <p className="text-xs text-stone-600 font-serif line-clamp-2 mt-1">
                        {craft.heritageStory}
                      </p>
                    </div>

                    {/* Artisan Signature */}
                    <div className="pt-2 border-t border-stone-100 flex items-center gap-2.5">
                      <img
                        src={craft.artisan.photo}
                        alt={craft.artisan.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
                      />
                      <div className="text-xs">
                        <p className="font-bold font-serif text-[#0C243C]">{craft.artisan.name}</p>
                        <p className="text-[10px] text-stone-500 font-sans">{craft.artisan.village}, {craft.artisan.state}</p>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Fair Price</span>
                        <span className="text-lg font-black font-serif text-[#B83227]">
                          ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedCraftForStory(craft)}
                          className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold font-sans transition-colors cursor-pointer"
                        >
                          Story
                        </button>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Buy Direct</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: WISHLIST (Saved Wishlist Items) */}
      {activeSubTab === 'pitara' && (
        <div className="space-y-6">
          <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#D4AF37]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#0C243C]">
                Wishlist (Saved Masterpieces) — Heritage Collection
              </h3>
              <p className="text-xs text-stone-600 font-sans">
                Direct handmade treasures earmarked for your home or gifting. Zero platform cut.
              </p>
            </div>

            <span className="text-xs font-bold font-sans text-[#27AE60] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              ✓ Direct 100% Artisan Payouts
            </span>
          </div>

          {wishlistedCrafts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-3xl font-serif">
                🎁
              </div>
              <h4 className="text-base font-bold font-serif text-[#0C243C]">
                Your Wishlist has no saved items yet
              </h4>
              <p className="text-xs text-stone-600 font-sans max-w-sm mx-auto">
                Explore the verified Indian craft bazaar and tap the heart icon on any masterpiece to save it to your Wishlist.
              </p>
              <button
                onClick={() => setActiveTab('bazaar')}
                className="mt-3 px-5 py-2.5 rounded-xl bg-[#0C243C] text-white text-xs font-bold uppercase tracking-wider font-sans hover:bg-[#B83227] transition-colors cursor-pointer"
              >
                Browse Craft Bazaar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistedCrafts.map((craft) => {
                const waLink = generateWhatsAppLink(craft);
                return (
                  <div
                    key={craft.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row gap-4"
                  >
                    <img
                      src={craft.imageUrl}
                      alt={craft.title}
                      className="w-full sm:w-36 h-36 rounded-2xl object-cover border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] text-amber-700 font-bold font-sans">
                            {craft.category} • {craft.stateOfOrigin}
                          </span>
                          <button
                            onClick={() => toggleWishlist(craft.id)}
                            className="text-stone-400 hover:text-red-600 text-xs font-sans font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <h4 className="text-sm font-bold font-serif text-[#0C243C] mt-0.5">
                          {craft.title}
                        </h4>
                        <p className="text-[11px] text-stone-600 font-serif line-clamp-1 mt-0.5">
                          Master: {craft.artisan.name} ({craft.artisan.village})
                        </p>

                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-base font-black font-serif text-[#B83227]">
                            ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-[#27AE60] font-sans font-bold">
                            ₹{craft.pricingEstimation.fairKarigarWageINR.toLocaleString('en-IN')} Direct Wage
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-stone-100">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Karigar</span>
                        </a>

                        <button
                          onClick={() => {
                            acquireCraftCertificate(craft);
                            setActiveSubTab('vault');
                          }}
                          className="py-2 px-3 bg-[#0C243C] hover:bg-[#B83227] text-amber-300 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#D4AF37]/50"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-300" />
                          <span>Acquire & Vault</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW 3: DIGITAL CERTIFICATE VAULT */}
      {activeSubTab === 'vault' && (
        <div className="space-y-6">
          <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#D4AF37]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-serif text-[#0C243C]">
                Digital Certificate Vault (Authenticity Heritage Certificates)
              </h3>
              <p className="text-xs text-stone-600 font-sans">
                Official encrypted provenance certificates and GI verification for your acquired masterpieces.
              </p>
            </div>

            <span className="text-xs font-bold font-mono text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300">
              🔐 Encrypted Registry Vault
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchasedCertificates.map((cert) => {
              // Find matching craft item if available for full certificate modal
              const matchingCraft = crafts.find((c) => c.id === cert.craftId) || crafts[0];

              return (
                <div
                  key={cert.certificateId}
                  className="bg-white rounded-3xl border-2 border-[#D4AF37] p-6 shadow-md relative overflow-hidden flex flex-col justify-between space-y-4"
                >
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#B83227]">
                          Government of India GI Registered
                        </span>
                        <h4 className="text-base font-bold font-serif text-[#0C243C]">
                          {cert.craftTitle}
                        </h4>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                        VERIFIED
                      </span>
                    </div>

                    <div className="flex gap-3 items-center bg-[#FAF6EE] p-3 rounded-2xl border border-[#D4AF37]/30">
                      <img
                        src={cert.imageUrl}
                        alt={cert.craftTitle}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="text-xs font-sans space-y-0.5">
                        <p className="font-bold text-[#0C243C]">Artisan: {cert.artisanName}</p>
                        <p className="text-stone-600">Origin: {cert.artisanVillage}, {cert.artisanState}</p>
                        <p className="text-stone-500 text-[10px]">Certified on: {cert.issueDate}</p>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-stone-500 break-all bg-stone-100 p-2 rounded-xl">
                      <strong>SHA-256 GI Hash:</strong> {cert.qrHash}
                    </div>
                  </div>

                  {/* Certificate Action Footer */}
                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-xs font-bold font-serif text-[#B83227]">
                      Cert #{cert.certificateId}
                    </span>

                    <button
                      onClick={() => setSelectedCraftForCertificate(matchingCraft)}
                      className="px-4 py-2 rounded-xl bg-[#0C243C] hover:bg-[#B83227] text-amber-300 text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Royal Certificate</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: PATRON KARMA & IMPACT METER */}
      {activeSubTab === 'impact' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#0C243C]">
              Patron Heritage Impact & Progression
            </h3>
            <p className="text-xs text-stone-600 font-sans">
              Your direct economic contribution to preserving dying Indian craft legacies.
            </p>
          </div>

          {/* Level Progress Bar */}
          <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#D4AF37]/50 space-y-3">
            <div className="flex items-center justify-between text-xs font-sans font-bold">
              <span className="text-[#0C243C]">
                Current Rank: <strong>{buyer?.patronLevel || 'Guardian of Indian Handloom — Level 2'}</strong>
              </span>
              <span className="text-[#B83227]">
                {buyer?.patronPoints || 1850} / 2500 Points to Level 3 (Master Patron)
              </span>
            </div>

            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#27AE60] h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, ((buyer?.patronPoints || 1850) / 2500) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-stone-600 font-sans">
              Acquiring verified crafts or connecting directly on WhatsApp earns Karma points, unlocking physical invitations to royal artisan guilds in Pochampally & Jaipur.
            </p>
          </div>

          {/* Heritage Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl border-2 border-[#27AE60] bg-emerald-50/50 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#27AE60] text-white flex items-center justify-center text-lg">
                🛡️
              </div>
              <h4 className="text-sm font-bold font-serif text-[#0C243C]">
                Handloom Protector
              </h4>
              <p className="text-[11px] text-stone-600 font-sans">
                Supported over ₹35,000 in direct wages to pit-loom silk weavers in Telangana.
              </p>
              <span className="inline-block text-[10px] font-bold text-[#27AE60] bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                UNLOCKED
              </span>
            </div>

            <div className="p-4 rounded-2xl border-2 border-[#D4AF37] bg-amber-50/50 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-white flex items-center justify-center text-lg">
                🏺
              </div>
              <h4 className="text-sm font-bold font-serif text-[#0C243C]">
                Terracotta & Clay Guardian
              </h4>
              <p className="text-[11px] text-stone-600 font-sans">
                Directly patronized Gorakhpur and Jaipur blue pottery studios.
              </p>
              <span className="inline-block text-[10px] font-bold text-amber-700 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                UNLOCKED
              </span>
            </div>

            <div className="p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 space-y-2 opacity-75">
              <div className="w-10 h-10 rounded-xl bg-stone-300 text-stone-600 flex items-center justify-center text-lg">
                👑
              </div>
              <h4 className="text-sm font-bold font-serif text-[#0C243C]">
                Bastar Bell Metal Benefactor
              </h4>
              <p className="text-[11px] text-stone-600 font-sans">
                Support 1 more lost-wax casting artisan from Chhattisgarh to unlock.
              </p>
              <span className="inline-block text-[10px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-300">
                PROGRESS: 1/2 CRAFTS
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
