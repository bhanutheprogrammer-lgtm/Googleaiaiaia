import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  Eye,
  Clock,
  Coins,
  X,
  Check
} from 'lucide-react';
import gsap from 'gsap';
import { useArtisan } from '../../context/ArtisanContext';
import { CraftItem } from '../../types';

export const ArtisanCatalogManager: React.FC = () => {
  const {
    crafts,
    artisan,
    deleteCraft,
    updateCraft,
    toggleCraftInStock,
    setSelectedCraftForCertificate,
    setSelectedCraftForStory,
    setActiveTab,
    generateWhatsAppLink,
    triggerMarigoldConfetti,
    t
  } = useArtisan();

  // Filter ONLY this artisan's crafts
  const myCrafts = crafts.filter(
    (c) => c.artisan.id === artisan.id || c.artisan.name === artisan.name
  );

  // Edit Modal State
  const [editingCraft, setEditingCraft] = useState<CraftItem | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editWage, setEditWage] = useState<number>(0);
  const [editDays, setEditDays] = useState<number>(0);
  const [editTitle, setEditTitle] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const editOverlayRef = useRef<HTMLDivElement>(null);
  const editCardRef = useRef<HTMLDivElement>(null);

  // Scroll lock & GSAP for Edit Modal
  useEffect(() => {
    if (editingCraft) {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      if (editCardRef.current && editOverlayRef.current) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            editOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.28, ease: 'power2.out' }
          );

          gsap.fromTo(
            editCardRef.current,
            { scale: 0.8, y: 35, opacity: 0, rotationX: 8, transformPerspective: 1000 },
            { scale: 1, y: 0, opacity: 1, rotationX: 0, duration: 0.4, ease: 'back.out(1.5)' }
          );
        });

        return () => ctx.revert();
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.remove('overflow-hidden');
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [editingCraft]);

  const handleCloseEdit = () => {
    if (editCardRef.current && editOverlayRef.current) {
      gsap.to(editCardRef.current, {
        scale: 0.85,
        y: 20,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
      });
      gsap.to(editOverlayRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => setEditingCraft(null),
      });
    } else {
      setEditingCraft(null);
    }
  };

  const handleOpenEdit = (craft: CraftItem) => {
    setEditingCraft(craft);
    setEditPrice(craft.pricingEstimation.recommendedRetailPriceINR);
    setEditWage(craft.pricingEstimation.fairKarigarWageINR);
    setEditDays(craft.estimatedCraftingDays);
    setEditTitle(craft.title);
  };

  const handleSaveEdit = () => {
    if (!editingCraft) return;
    updateCraft(editingCraft.id, {
      title: editTitle,
      estimatedCraftingDays: editDays,
      pricingEstimation: {
        ...editingCraft.pricingEstimation,
        recommendedRetailPriceINR: editPrice,
        fairKarigarWageINR: editWage
      }
    });
    setEditingCraft(null);
    triggerMarigoldConfetti();
  };

  const handleCopyLink = (craft: CraftItem) => {
    const link = generateWhatsAppLink(craft);
    navigator.clipboard.writeText(link);
    setCopiedId(craft.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="artisan-catalog-manager-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EE] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B83227]/10 text-[#B83227] text-xs font-bold font-sans uppercase tracking-wider mb-1.5">
            <Package className="w-3.5 h-3.5" />
            <span>{t.ledger_title || 'Artisan Inventory Karkhana'}</span>
          </div>
          <h2 className="text-2xl font-black font-serif text-[#0C243C]">
            {t.ledger_title || 'My Listed Craft Masterpieces'} ({myCrafts.length})
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-sans mt-0.5">
            {t.ledger_desc || 'Directly manage and price your authentic handmade creations. Only your items are displayed here.'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('scan_studio')}
          className="px-5 py-3 rounded-2xl bg-linear-to-r from-[#B83227] to-[#E67E22] text-white text-xs font-bold font-sans uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md cursor-pointer border border-[#D4AF37]"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>+ {t.dash_new_scan || 'Add New Craft via AI Scan'}</span>
        </button>
      </div>

      {/* Empty State */}
      {myCrafts.length === 0 ? (
        <div className="bg-[#FAF6EE] border-2 border-dashed border-[#D4AF37] rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-[#B83227]/10 text-[#B83227] rounded-2xl flex items-center justify-center mx-auto text-3xl">
            🪔
          </div>
          <h3 className="font-serif font-bold text-xl text-[#0C243C]">
            {t.ledger_empty_title || 'No Crafts Listed in Your Studio Yet'}
          </h3>
          <p className="text-stone-600 text-xs max-w-md mx-auto font-sans">
            {t.ledger_empty_desc || 'Use our AI Vision & Voice studio to scan any handcrafted item in 30 seconds and publish it with authentic GI credentials.'}
          </p>
          <button
            onClick={() => setActiveTab('scan_studio')}
            className="px-5 py-2.5 rounded-xl bg-[#0C243C] text-amber-200 text-xs font-bold font-sans uppercase tracking-wider hover:bg-[#162E4A] cursor-pointer"
          >
            {t.dash_new_scan || 'Launch AI Scanner Now'}
          </button>
        </div>
      ) : (
        /* Craft Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCrafts.map((craft) => {
            const isInStock = craft.inStock !== false;
            return (
              <div
                key={craft.id}
                className="bg-[#FAF6EE] border-2 border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-[#D4AF37] transition-all hover:shadow-xl group"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Stock Status Badge */}
                  <div className="absolute top-3 left-3">
                    <button
                      onClick={() => toggleCraftInStock(craft.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold font-sans uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
                        isInStock
                          ? 'bg-[#27AE60] text-white border border-emerald-300/50'
                          : 'bg-red-800 text-white border border-red-400'
                      }`}
                    >
                      {isInStock ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t.craft_in_stock || 'In Stock'}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>{t.craft_out_of_stock || 'Out of Stock'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* GI Tag Badge */}
                  {craft.isGiTagged && (
                    <div className="absolute top-3 right-3 bg-[#0C243C]/90 backdrop-blur-xs border border-[#D4AF37] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Award className="w-3 h-3 text-[#D4AF37]" />
                      <span>{t.craft_gi_tagged || 'GI Tagged'}</span>
                    </div>
                  )}

                  {/* Price Chip Overlay */}
                  <div className="absolute bottom-3 right-3 bg-[#0C243C]/95 border border-[#D4AF37] text-white px-3 py-1.5 rounded-xl shadow-lg">
                    <p className="text-[9px] text-amber-200/80 uppercase font-sans font-bold">{t.craft_fair_price || 'Fair Price'}</p>
                    <p className="text-base font-serif font-black text-amber-300">
                      ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-[#B83227] uppercase tracking-wider">
                      <span>{craft.category}</span>
                      <span>•</span>
                      <span>{craft.stateOfOrigin}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#0C243C] mt-1 leading-snug line-clamp-2">
                      {craft.title}
                    </h3>
                    
                    {craft.regionalTitle && (
                      <p className="text-xs text-stone-600 font-sans mt-0.5 truncate">
                        {craft.regionalTitle}
                      </p>
                    )}

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-200 text-xs font-sans text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{craft.estimatedCraftingDays} {t.craft_days || 'Days'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#27AE60]" />
                        <span>{t.craft_wage || 'Wage'}: ₹{craft.pricingEstimation.fairKarigarWageINR.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="pt-3 border-t border-stone-200 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenEdit(craft)}
                        className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#D4AF37] text-stone-800 text-xs font-bold font-sans flex items-center justify-center gap-1.5 hover:bg-amber-50/50 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#B83227]" />
                        <span>{t.btn_edit || 'Edit Details'}</span>
                      </button>

                      <button
                        onClick={() => setSelectedCraftForCertificate(craft)}
                        className="px-3 py-2 rounded-xl bg-[#0C243C] text-amber-200 hover:bg-[#162E4A] text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#D4AF37]/50"
                      >
                        <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{t.nav_certificates || 'GI Certificate'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={generateWhatsAppLink(craft)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-sans font-bold text-[#27AE60] hover:text-emerald-700 flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t.craft_whatsapp_inquire || 'Test WhatsApp Lead'}</span>
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove "${craft.title}" from your catalog?`)) {
                            deleteCraft(craft.id);
                          }
                        }}
                        className="text-[11px] font-sans font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer p-1 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.btn_delete || 'Delete'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Details Modal */}
      {editingCraft && (
        <div 
          ref={editOverlayRef}
          id="artisan-catalog-edit-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseEdit();
          }}
        >
          <div 
            ref={editCardRef}
            id="artisan-catalog-edit-card"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0C243C] text-white rounded-2xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 overscroll-contain space-y-5"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-amber-200">Edit Craft Listing Details</h3>
              </div>
              <button
                onClick={handleCloseEdit}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-amber-200">Craft Title (English / Global)</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white font-medium focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1 text-amber-200">Retail Price (₹ INR)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] font-bold text-amber-400 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1 text-amber-200">Karigar Wage (₹ INR)</label>
                  <input
                    type="number"
                    value={editWage}
                    onChange={(e) => setEditWage(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] font-bold text-emerald-400 focus:outline-hidden focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-amber-200">Estimated Crafting Days</label>
                <input
                  type="number"
                  value={editDays}
                  onChange={(e) => setEditDays(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-[#0A1A2D] text-white font-medium focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/15">
              <button
                onClick={handleCloseEdit}
                className="px-4 py-2 rounded-xl text-stone-300 font-bold hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-linear-to-r from-[#B83227] to-[#E67E22] text-white font-bold font-sans shadow-md hover:scale-105 transition-transform cursor-pointer border border-amber-500/40"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
