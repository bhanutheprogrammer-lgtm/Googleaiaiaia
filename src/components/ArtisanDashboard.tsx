import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Layers, 
  TrendingUp, 
  QrCode, 
  ShieldCheck, 
  Award, 
  Trash2, 
  ExternalLink, 
  Languages, 
  Send, 
  CheckCircle2, 
  Coins, 
  Eye, 
  PhoneCall,
  Clock,
  Plus
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { CraftItem, InquiryMessage } from '../types';

export const ArtisanDashboard: React.FC = () => {
  const {
    artisan,
    crafts,
    deleteCraft,
    inquiries,
    markInquiryReplied,
    setActiveTab,
    setSelectedCraftForCertificate,
    triggerMarigoldConfetti,
    currentLanguage,
    t
  } = useArtisan();

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryMessage>(inquiries[0]);
  const [translatedInquiry, setTranslatedInquiry] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [customReplyText, setCustomReplyText] = useState('');
  const [replySentNotice, setReplySentNotice] = useState(false);

  // Stats calculation
  const totalCrafts = crafts.length;
  const totalViews = crafts.reduce((acc, c) => acc + c.viewsCount, 0);
  const totalInquiries = inquiries.length;
  const estimatedCatalogValue = crafts.reduce((acc, c) => acc + c.pricingEstimation.recommendedRetailPriceINR, 0);

  // AI Translation of Inquiry to Telugu / Selected regional language
  const handleTranslateInquiry = async (inq: InquiryMessage) => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/gemini/translate-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryText: inq.buyerMessage || inq.message,
          targetLanguage: artisan.primaryLanguage || currentLanguage || 'te',
          craftTitle: inq.craftTitle,
        }),
      });
      const data = await response.json();
      setTranslatedInquiry(data.translatedText);
      setCustomReplyText(data.suggestedArtisanReplyInBuyerLang || `Namaste! Yes, this authentic handmade ${inq.craftTitle} is available with 100% GI certification.`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSendReply = () => {
    if (selectedInquiry) {
      markInquiryReplied(selectedInquiry.id);
      setReplySentNotice(true);
      triggerMarigoldConfetti();
      setTimeout(() => setReplySentNotice(false), 3000);
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Master Karigar Header Card */}
      <div className="bg-[#0C243C] text-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="relative">
              <img
                src={artisan.photo}
                alt={artisan.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 p-1 bg-[#27AE60] text-white rounded-full">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-amber-200">
                  {artisan.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-amber-300 text-[10px] font-bold border border-amber-400/40 font-sans">
                  GI Guild Custodian
                </span>
              </div>

              <p className="text-sm font-semibold text-[#FAF6EE]">
                {artisan.regionalName}
              </p>

              <p className="text-xs text-stone-300 font-sans">
                📍 {artisan.village}, {artisan.district}, {artisan.state} • {artisan.craftsExperienceYears} {t.stories_years_exp}
              </p>
            </div>
          </div>

          {/* Quick Studio Actions */}
          <div className="flex items-center space-x-3">
            <button
              id="dashboard-new-scan-btn"
              onClick={() => setActiveTab('scan_studio')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-linear-to-r from-[#B83227] to-[#E67E22] text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all border border-[#D4AF37] cursor-pointer font-sans uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>{t.dashboard_new_scan}</span>
            </button>
          </div>

        </div>

        {/* Real-Time Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 font-sans">
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 text-center">
            <p className="text-[11px] text-stone-300 font-semibold">{t.dashboard_crafts_count}</p>
            <p className="text-2xl font-extrabold text-amber-300 font-serif">{totalCrafts}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 text-center">
            <p className="text-[11px] text-stone-300 font-semibold">{t.dashboard_views_count}</p>
            <p className="text-2xl font-extrabold text-[#FAF6EE] font-serif">{totalViews}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 text-center">
            <p className="text-[11px] text-stone-300 font-semibold">{t.dashboard_inquiries_count}</p>
            <p className="text-2xl font-extrabold text-emerald-400 font-serif">{totalInquiries}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 text-center">
            <p className="text-[11px] text-stone-300 font-semibold">{t.dashboard_fair_value}</p>
            <p className="text-2xl font-extrabold text-amber-200 font-serif">₹{estimatedCatalogValue.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Main Studio Dual Sections: Live Catalog Ledger & Vernacular WhatsApp Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (7 Cols): Published Crafts Ledger */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0C243C] font-serif">
                {t.dashboard_ledger_title}
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                {t.dashboard_ledger_subtitle}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('scan_studio')}
              className="text-xs font-bold text-[#B83227] hover:underline flex items-center gap-1 cursor-pointer font-sans"
            >
              + {t.dashboard_add_craft}
            </button>
          </div>

          {/* Crafts List */}
          <div className="space-y-3">
            {crafts.map((craft) => (
              <div
                key={craft.id}
                className="bg-white rounded-2xl p-4 border border-[#D4AF37]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#B83227] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-wider font-sans">
                      {craft.category} • {craft.estimatedCraftingDays} {t.bazaar_days_crafting}
                    </span>
                    <h3 className="text-sm font-bold text-[#0C243C] font-serif line-clamp-1">
                      {craft.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#B83227] line-clamp-1">
                      {craft.regionalTitle}
                    </p>
                    <p className="text-[10px] text-stone-400 font-mono">
                      GI: {craft.certificateId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 font-sans">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-stone-500">{t.bazaar_fair_price_label}</p>
                    <p className="text-sm font-extrabold text-[#B83227] font-serif">
                      ₹{craft.pricingEstimation.recommendedRetailPriceINR.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setSelectedCraftForCertificate(craft)}
                      className="p-2 rounded-xl bg-[#FAF6EE] text-[#0C243C] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/50 transition-colors cursor-pointer"
                      title="View GI Certificate"
                    >
                      <QrCode className="w-4 h-4 text-[#B83227]" />
                    </button>

                    <button
                      onClick={() => deleteCraft(craft.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete Craft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 Cols): Vernacular Multilingual Buyer Inbox */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0C243C] font-serif flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#27AE60]" />
                <span>{t.dashboard_inbox_title}</span>
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                {t.dashboard_inbox_desc}
              </p>
            </div>
          </div>

          {/* Inquiries Thread */}
          <div className="bg-white rounded-3xl border border-[#D4AF37]/40 p-5 shadow-md space-y-4">
            
            {/* Inquiry Selector Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-stone-100 font-sans">
              {inquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => {
                    setSelectedInquiry(inq);
                    setTranslatedInquiry('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                    selectedInquiry.id === inq.id
                      ? 'bg-[#0C243C] text-amber-300 shadow-xs'
                      : 'bg-[#FAF6EE] text-stone-600 hover:bg-[#D4AF37]/15'
                  }`}
                >
                  <span>{inq.buyerName}</span>
                  {inq.status === 'new' && (
                    <span className="w-2 h-2 rounded-full bg-[#B83227]" />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Inquiry Detail */}
            {selectedInquiry && (
              <div className="space-y-4">
                
                {/* Buyer Info */}
                <div className="flex items-center justify-between bg-[#FAF6EE] p-3 rounded-2xl border border-stone-200 font-sans">
                  <div>
                    <p className="text-xs font-bold text-[#0C243C]">
                      {selectedInquiry.buyerName} ({selectedInquiry.buyerLocation})
                    </p>
                    <p className="text-[10px] text-stone-500">
                      Craft: {selectedInquiry.craftTitle}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {selectedInquiry.status === 'new' ? 'New Inquiry' : 'Replied'}
                  </span>
                </div>

                {/* Original Buyer Message (in English / Foreign) */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider font-sans">
                    Original Buyer Message:
                  </span>
                  <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200 italic font-serif">
                    "{selectedInquiry.buyerMessage || selectedInquiry.message}"
                  </p>
                </div>

                {/* AI Translate Trigger */}
                <div>
                  {!translatedInquiry ? (
                    <button
                      id="translate-inquiry-btn"
                      onClick={() => handleTranslateInquiry(selectedInquiry)}
                      disabled={isTranslating}
                      className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#E67E22] text-[#0C243C] text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs hover:scale-[1.01] transition-all cursor-pointer font-sans"
                    >
                      <Languages className="w-4 h-4 text-[#B83227]" />
                      <span>{isTranslating ? 'Translating with AI...' : t.dashboard_translate_inquiry}</span>
                    </button>
                  ) : (
                    /* Translated Message */
                    <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#B83227] flex items-center gap-1 font-sans">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Vernacular Translation:</span>
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#0C243C] leading-relaxed font-serif">
                        {translatedInquiry}
                      </p>
                    </div>
                  )}
                </div>

                {/* Suggested Reply Box */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block font-sans">
                    Auto-Drafted WhatsApp Reply in English:
                  </label>
                  <textarea
                    rows={3}
                    value={customReplyText}
                    onChange={(e) => setCustomReplyText(e.target.value)}
                    placeholder="Type or approve suggested reply..."
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF6EE] border border-stone-200 text-[#0C243C] focus:outline-hidden font-serif"
                  />

                  <button
                    id="send-reply-btn"
                    onClick={handleSendReply}
                    className="w-full py-2.5 rounded-xl bg-[#27AE60] hover:bg-[#219653] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs transition-all cursor-pointer font-sans uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.dashboard_send_reply}</span>
                  </button>
                </div>

                {replySentNotice && (
                  <p className="text-xs font-bold text-[#27AE60] text-center flex items-center justify-center gap-1 font-sans">
                    <CheckCircle2 className="w-4 h-4" /> Reply sent successfully!
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
