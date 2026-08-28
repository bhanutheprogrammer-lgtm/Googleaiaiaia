import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Compass, 
  ExternalLink,
  Flame
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';

interface StateCluster {
  id: string;
  stateName: string;
  regionalName: string;
  famousCrafts: string[];
  giTagCount: number;
  activeArtisansCount: string;
  featuredStory: string;
  imageUrl: string;
  coordinates: { x: number; y: number }; // Relative map positioning percent
}

const INDIAN_CRAFT_CLUSTERS: StateCluster[] = [
  {
    id: 'telangana',
    stateName: 'Telangana',
    regionalName: 'తెలంగాణ (Telangana)',
    famousCrafts: ['Pochampally Ikat', 'Gadwal Sarees', 'Nirmal Paintings', 'Silver Filigree Karimnagar'],
    giTagCount: 16,
    activeArtisansCount: '180,000+',
    featuredStory: 'Home to the 200-year-old hereditary Pagdu Bandhu double-ikat weaving tradition in Bhoodan Pochampally.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 48, y: 62 }
  },
  {
    id: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    regionalName: 'தமிழ்நாடு (Tamil Nadu)',
    famousCrafts: ['Thanjavur Paintings', 'Kanchipuram Silk', 'Swamimalai Bronze Icons', 'Toda Embroidery'],
    giTagCount: 58,
    activeArtisansCount: '340,000+',
    featuredStory: 'Master Sthapatis and Chola lost-wax temple iconographers preserving sacred bronze and 22ct gold leaf art.',
    imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 44, y: 82 }
  },
  {
    id: 'odisha',
    stateName: 'Odisha / Chhattisgarh',
    regionalName: 'ଓଡ଼ିଶା / ଛତିଶଗଡ଼',
    famousCrafts: ['Bastar Dhokra', 'Pattachitra Painting', 'Kotpad Handlooms', 'Sambalpuri Ikat'],
    giTagCount: 25,
    activeArtisansCount: '120,000+',
    featuredStory: 'Tribal Ghadwa bell metal casting using 4000-year-old non-ferrous lost-wax methods in the deep sal forests.',
    imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 68, y: 52 }
  },
  {
    id: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    regionalName: 'उत्तर प्रदेश (Uttar Pradesh)',
    famousCrafts: ['Gorakhpur Terracotta', 'Banarasi Silk', 'Chikan Embroidery', 'Bhadohi Carpets'],
    giTagCount: 69,
    activeArtisansCount: '520,000+',
    featuredStory: 'Prajapati master potters hand-crafting ceremonial terracotta elephants with natural wood-fired smoke glazes.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 50, y: 34 }
  },
  {
    id: 'rajasthan',
    stateName: 'Rajasthan',
    regionalName: 'राजस्थान (Rajasthan)',
    famousCrafts: ['Jaipur Blue Pottery', 'Kathputli Dolls', 'Sanganeri Print', 'Molela Clay Art'],
    giTagCount: 21,
    activeArtisansCount: '290,000+',
    featuredStory: 'Maharaja Sawai Ram Singh II royal quartz non-clay pottery and vibrant block print guilds.',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 28, y: 38 }
  },
  {
    id: 'kashmir',
    stateName: 'Kashmir',
    regionalName: 'جموں و کشمیر (Kashmir)',
    famousCrafts: ['Kashmir Pashmina', 'Kani Shawls', 'Papier Mache', 'Walnut Wood Carving'],
    giTagCount: 10,
    activeArtisansCount: '95,000+',
    featuredStory: 'High-altitude Changthangi goat pashm spun on charkha and embroidered with microscopic sozni needlework.',
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 38, y: 15 }
  },
  {
    id: 'west-bengal',
    stateName: 'West Bengal',
    regionalName: 'পশ্চিমবঙ্গ (West Bengal)',
    famousCrafts: ['Kantha Embroidery', 'Bankura Terracotta Horses', 'Shantiniketan Leather', 'Baluchari Silk'],
    giTagCount: 27,
    activeArtisansCount: '210,000+',
    featuredStory: 'Artisan mothers repurposing vintage silks with rhythmic running kantha stitches depicting pastoral folklore.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 76, y: 44 }
  },
  {
    id: 'gujarat',
    stateName: 'Gujarat',
    regionalName: 'ગુજરાત (Gujarat)',
    famousCrafts: ['Kutch Rogan Art', 'Patan Patola', 'Tangaliya Shawls', 'Mata Ni Pachedi'],
    giTagCount: 17,
    activeArtisansCount: '165,000+',
    featuredStory: 'Rare castor oil and natural stone pigment Rogan paintings created with an iron stylus without stencil.',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80',
    coordinates: { x: 18, y: 48 }
  }
];

export const CraftMapSection: React.FC = () => {
  const { setSelectedState, setActiveTab, currentLanguage, t } = useArtisan();
  const [selectedCluster, setSelectedCluster] = useState<StateCluster>(INDIAN_CRAFT_CLUSTERS[0]);

  const handleSelectCluster = (cluster: StateCluster) => {
    setSelectedCluster(cluster);
  };

  const handleFilterToState = (stateName: string) => {
    setSelectedState(stateName);
    setActiveTab('bazaar');
    const bazaarElem = document.getElementById('marketplace-section');
    bazaarElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="craft-map-section" 
      data-scroll-section 
      data-scroll 
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8"
    >
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#A84A2C] bg-[#FAF9F6] px-4 py-1.5 rounded-full border border-amber-900/15">
          <Compass className="w-3.5 h-3.5 text-[#A84A2C]" />
          <span>{t.map_badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F1E2E] font-serif tracking-tight leading-tight">
          {t.map_title}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-serif max-w-2xl mx-auto leading-relaxed">
          {t.map_subtitle}
        </p>
      </div>

      {/* Main Map & Interactive Region Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left: Region Cards Grid (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INDIAN_CRAFT_CLUSTERS.map((cluster) => (
            <div
              key={cluster.id}
              onClick={() => handleSelectCluster(cluster)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3.5 ${
                selectedCluster.id === cluster.id
                  ? 'bg-linear-to-br from-[#0F1E2E] to-[#1A344D] text-white border-amber-500/40 shadow-lg ring-2 ring-[#0F1E2E]/10 scale-[1.02]'
                  : 'bg-white hover:bg-[#FAF9F6] border-stone-200/80 hover:border-amber-900/20 text-[#0F1E2E] shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`text-base font-bold font-serif ${selectedCluster.id === cluster.id ? 'text-amber-200' : 'text-[#0F1E2E]'}`}>
                    {cluster.stateName}
                  </h3>
                  {currentLanguage !== 'en' && (
                    <p className={`text-xs font-semibold ${selectedCluster.id === cluster.id ? 'text-stone-300' : 'text-[#A84A2C]'}`}>
                      {cluster.regionalName}
                    </p>
                  )}
                </div>

                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                  selectedCluster.id === cluster.id
                    ? 'bg-amber-400 text-[#0F1E2E]'
                    : 'bg-[#FAF9F6] text-[#A84A2C] border border-amber-900/15'
                }`}>
                  {cluster.giTagCount} {t.map_gi_tags}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cluster.famousCrafts.slice(0, 2).map((c, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-2 py-0.5 rounded-md ${
                      selectedCluster.id === cluster.id
                        ? 'bg-white/10 text-stone-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    • {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Cluster Spotlight (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-amber-900/15 p-5 sm:p-6 shadow-lg space-y-4 sm:space-y-5 lg:sticky lg:top-24">
          
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-xs">
            <img
              src={selectedCluster.imageUrl}
              alt={selectedCluster.stateName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#27AE60] text-white text-[10px] font-bold uppercase tracking-wider">
                  {selectedCluster.activeArtisansCount} {t.map_verified_karigars}
                </span>
                <h3 className="text-xl font-extrabold text-white font-serif mt-1">
                  {selectedCluster.stateName}
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-600 pb-2 border-b border-stone-100 font-sans">
              <span className="font-semibold">{t.map_key_crafts}</span>
              <span className="font-bold text-[#A84A2C]">{selectedCluster.giTagCount} {t.map_registered_lineages}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedCluster.famousCrafts.map((craft, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#FAF9F6] text-[#0F1E2E] text-xs font-semibold border border-amber-900/10 font-sans">
                  🪔 {craft}
                </span>
              ))}
            </div>

            <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF9F6] p-4 rounded-2xl border border-amber-900/10 text-justify font-serif">
              {selectedCluster.featuredStory}
            </p>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => handleFilterToState(selectedCluster.stateName)}
            className="w-full py-3.5 rounded-xl bg-[#0F1E2E] hover:bg-[#1A344D] text-amber-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer uppercase tracking-wider font-sans border border-amber-500/30"
          >
            <span>{t.map_explore_state} ({selectedCluster.stateName})</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </section>
  );
};
