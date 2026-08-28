import React from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ExternalLink,
  Coins
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useArtisan } from '../../context/ArtisanContext';

export const BuyerCertificateVault: React.FC = () => {
  const { buyerUser } = useAuth();
  const { crafts, setSelectedCraftForCertificate, t } = useArtisan();

  const certificates = buyerUser?.purchasedCertificates || [];

  return (
    <div id="buyer-certificates-vault-section" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#0C243C] text-white border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-amber-300 text-xs font-bold font-sans uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.cert_vault_title || 'Official GI Authenticity Vault'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#FAF6EE]">
              {t.cert_vault_title || 'My Authenticity Certificate Vault'}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              {t.cert_vault_desc || 'Download and verify tamper-proof royal parchment certificates for every GI-certified craft you have acquired or supported.'}
            </p>
          </div>

          <div className="bg-white/10 border border-[#D4AF37]/40 rounded-2xl p-3 text-center sm:text-right">
            <span className="text-[10px] text-amber-200 uppercase font-sans font-bold block">{t.cert_verified_badge || 'Verified Certificates'}</span>
            <span className="text-2xl font-black font-serif text-amber-300">{certificates.length}</span>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => {
          // Find matching craft if available
          const matchingCraft = crafts.find((c) => c.id === cert.craftId) || crafts[0];

          return (
            <div
              key={cert.certificateId}
              className="bg-[#FAF6EE] border-2 border-[#D4AF37] rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#B83227] uppercase tracking-wider font-sans">
                    <ShieldCheck className="w-4 h-4 text-[#27AE60]" />
                    <span>{t.cert_registered_label || 'GI Registered Certificate'}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-stone-500 bg-stone-200 px-2.5 py-0.5 rounded-md">
                    {cert.certificateId}
                  </span>
                </div>

                {/* Craft Title & Artisan Info */}
                <div className="flex gap-4 mt-4">
                  <img
                    src={cert.imageUrl}
                    alt={cert.craftTitle}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D4AF37] shrink-0"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0C243C] leading-snug">
                      {cert.craftTitle}
                    </h3>
                    <p className="text-xs text-stone-600 font-sans mt-1">
                      {t.craft_artisan || 'Master Karigar'}: <span className="font-bold text-[#0C243C]">{cert.artisanName}</span>
                    </p>
                    <p className="text-xs text-stone-500 font-sans flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#B83227]" />
                      <span>{cert.artisanVillage}, {cert.artisanState}</span>
                    </p>
                  </div>
                </div>

                {/* Materials & Provenance */}
                <div className="mt-4 p-3 bg-white/70 border border-stone-200 rounded-2xl space-y-1.5 text-xs font-sans">
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">
                    {t.cert_raw_materials_provenance || 'Raw Material Purity Provenance'}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.materialsUsed.map((mat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[10px] text-stone-700 font-medium">
                        ✓ {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-300">
                <div className="text-xs font-sans text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.cert_issued_on || 'Issued'}: {cert.issueDate}</span>
                </div>

                <button
                  onClick={() => setSelectedCraftForCertificate(matchingCraft)}
                  className="px-4 py-2 rounded-xl bg-[#0C243C] hover:bg-[#162E4A] text-amber-200 text-xs font-bold font-sans flex items-center gap-1.5 transition-colors cursor-pointer border border-[#D4AF37]/60"
                >
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.cert_view_royal || 'View Royal Certificate'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
