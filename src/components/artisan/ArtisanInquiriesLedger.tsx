import React, { useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Languages, 
  Phone, 
  ChevronRight,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';
import { useArtisan } from '../../context/ArtisanContext';
import { InquiryMessage } from '../../types';

export const ArtisanInquiriesLedger: React.FC = () => {
  const {
    inquiries,
    updateInquiryStatus,
    markInquiryReplied,
    artisan,
    currentLanguage,
    t
  } = useArtisan();

  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'in_discussion' | 'converted'>('all');
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [customReplies, setCustomReplies] = useState<{ [id: string]: string }>({});

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return inq.status === 'new';
    if (activeFilter === 'in_discussion') return inq.status === 'in_discussion' || inq.status === 'replied';
    if (activeFilter === 'converted') return inq.status === 'converted' || inq.status === 'completed';
    return true;
  });

  const handleTranslateVernacular = (inq: InquiryMessage) => {
    setTranslatingId(inq.id);
    setTimeout(() => {
      setTranslatingId(null);
    }, 400);
  };

  const getStatusBadge = (status: InquiryMessage['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-300 text-[10px] font-bold font-sans uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            <span>{t.inq_new || 'New Lead'}</span>
          </span>
        );
      case 'in_discussion':
      case 'replied':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold font-sans uppercase tracking-wider flex items-center gap-1">
            <span>{t.inq_in_discussion || 'In Discussion'}</span>
          </span>
        );
      case 'converted':
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold font-sans uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{t.inq_converted || 'Completed'}</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div id="artisan-inquiries-ledger-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27AE60]/10 text-[#27AE60] text-xs font-bold font-sans uppercase tracking-wider mb-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.inquiries_title || 'Direct WhatsApp Buyer Leads'}</span>
          </div>
          <h2 className="text-2xl font-black font-serif text-[#0C243C]">
            {t.inquiries_title || 'Buyer Inquiries & Leads Ledger'} ({inquiries.length})
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-sans mt-0.5">
            {t.inquiries_desc || 'Direct high-intent inquiries from art collectors and boutiques across India and abroad. Connect with 1 click via WhatsApp.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center bg-stone-200/80 p-1.5 rounded-2xl gap-1 text-xs font-sans font-bold">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'all' ? 'bg-[#0C243C] text-white shadow-xs' : 'text-stone-700 hover:text-black'
            }`}
          >
            {t.filter_all || 'All'} ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'new' ? 'bg-[#B83227] text-white shadow-xs' : 'text-stone-700 hover:text-black'
            }`}
          >
            {t.inq_new || 'New'} ({inquiries.filter((i) => i.status === 'new').length})
          </button>
          <button
            onClick={() => setActiveFilter('in_discussion')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'in_discussion' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-700 hover:text-black'
            }`}
          >
            {t.inq_in_discussion || 'In Discussion'}
          </button>
          <button
            onClick={() => setActiveFilter('converted')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeFilter === 'converted' ? 'bg-[#27AE60] text-white shadow-xs' : 'text-stone-700 hover:text-black'
            }`}
          >
            {t.inq_converted || 'Completed'}
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-[#FAF6EE] border-2 border-dashed border-stone-300 rounded-3xl p-12 text-center text-stone-500 font-sans text-xs">
            No inquiries match this filter.
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const replyDraft =
              customReplies[inq.id] ||
              `Namaste ${inq.buyerName} ji! Thank you for inquiring about ${inq.craftTitle}. This authentic GI piece is available in stock. I can dispatch it safely to ${inq.buyerLocation} within 2 business days.`;

            return (
              <div
                key={inq.id}
                className="bg-[#FAF6EE] border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] rounded-3xl p-6 shadow-md hover:shadow-lg transition-all space-y-4"
              >
                {/* Top Row: Buyer Info & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0C243C] text-amber-300 font-serif font-bold text-base flex items-center justify-center border border-[#D4AF37]">
                      {inq.buyerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-[#0C243C] text-base">
                          {inq.buyerName}
                        </h4>
                        <span className="text-xs text-stone-500 font-sans flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#B83227]" />
                          <span>{inq.buyerLocation}</span>
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-sans mt-0.5">
                        Interested in: <span className="font-bold text-[#B83227]">{inq.craftTitle}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(inq.status)}
                    <span className="text-[11px] font-sans text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{inq.timestamp}</span>
                    </span>
                  </div>
                </div>

                {/* Buyer Message Bubble */}
                <div className="bg-stone-100/90 border border-stone-300/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 uppercase tracking-wider font-sans">
                    <span>Buyer Message:</span>
                    {inq.translatedMessage && (
                      <span className="text-amber-800 font-semibold flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5" />
                        <span>Artisan Mother Tongue Translation</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed">
                    "{inq.message}"
                  </p>

                  {/* Vernacular Auto-translation */}
                  {inq.translatedMessage && (
                    <div className="pt-2 border-t border-stone-200/80">
                      <p className="text-xs text-amber-900 font-sans font-medium italic bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                        "{inq.translatedMessage}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Reply Actions & Status Dropdown */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  
                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 text-xs font-sans">
                    <span className="text-[11px] text-stone-500 font-bold mr-1">Status:</span>
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'new')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        inq.status === 'new' ? 'bg-red-700 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'in_discussion')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        inq.status === 'in_discussion' || inq.status === 'replied'
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      In Discussion
                    </button>
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'converted')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                        inq.status === 'converted' || inq.status === 'completed'
                          ? 'bg-[#27AE60] text-white'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      Completed
                    </button>
                  </div>

                  {/* Direct WhatsApp Response Button */}
                  <div className="flex items-center gap-2">
                    <a
                      href={inq.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => markInquiryReplied(inq.id)}
                      className="px-4 py-2.5 rounded-xl bg-[#27AE60] hover:bg-emerald-700 text-white text-xs font-bold font-sans uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>💬 Reply on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
