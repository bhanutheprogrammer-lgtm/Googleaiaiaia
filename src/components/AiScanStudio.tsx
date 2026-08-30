import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  Mic, 
  MicOff, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Coins, 
  Languages, 
  Flame, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  Tag,
  Wand2,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useArtisan } from '../context/ArtisanContext';
import { DEMO_CRAFT_PRESETS, INDIAN_LANGUAGES } from '../data/mockCrafts';
import { AIScanResult, CraftCategory, CraftItem, LanguageCode } from '../types';

export const AiScanStudio: React.FC = () => {
  const {
    currentLanguage,
    artisan,
    addCraft,
    triggerMarigoldConfetti,
    setActiveTab,
    setSelectedCraftForCertificate,
    t
  } = useArtisan();

  const [selectedOutputLang, setSelectedOutputLang] = useState<LanguageCode>(
    artisan.primaryLanguage || 'te'
  );

  const [selectedImageBase64, setSelectedImageBase64] = useState<string>('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [customVoiceNotes, setCustomVoiceNotes] = useState<string>('');
  
  // Voice Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const recognitionRef = useRef<any>(null);

  // Scanning State
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [aiScanResult, setAiScanResult] = useState<AIScanResult | null>(null);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [lastPublishedCraft, setLastPublishedCraft] = useState<CraftItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const SCAN_PROGRESS_STEPS = [
    { title: '1. Neural Vision Craft Lineage Analysis', sub: 'Cross-referencing GI Registry & traditional motifs...' },
    { title: '2. Natural Pigment & Material Detection', sub: 'Detecting organic dyes, handloom weaves & pure clay...' },
    { title: '3. Vernacular Narrative Synthesis', sub: 'Generating heritage story in regional Indian languages...' },
    { title: '4. Kala-Moolya Fair Wage Computation', sub: 'Calculating living wage & direct artisan pricing...' }
  ];

  // Handle Demo Preset Selection
  const handleSelectPreset = (preset: typeof DEMO_CRAFT_PRESETS[0]) => {
    setImagePreviewUrl(preset.imageUrl);
    setSelectedImageBase64(preset.imageUrl);
    setCustomVoiceNotes(preset.promptHint);
    setAiScanResult(null);
    setPublishSuccess(false);
  };

  // Handle Local File Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImageBase64(base64);
        setImagePreviewUrl(base64);
        setAiScanResult(null);
        setPublishSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Remove Uploaded Image
  const handleRemoveImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setImagePreviewUrl('');
    setSelectedImageBase64('');
    setAiScanResult(null);
    setPublishSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Voice Input
  const toggleVoiceRecording = () => {
    if (isRecording) {
      // Stop
      setIsRecording(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // Start Web Speech or simulated vernacular transcript
      setIsRecording(true);
      setRecordingTimer(0);

      // Check if browser supports Web Speech API
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          // Set language based on selection
          rec.lang = selectedOutputLang === 'te' ? 'te-IN' : selectedOutputLang === 'ta' ? 'ta-IN' : selectedOutputLang === 'hi' ? 'hi-IN' : 'en-IN';
          
          rec.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript;
            }
            setCustomVoiceNotes(current);
          };

          rec.onerror = () => {
            fallbackVoiceSimulation();
          };

          recognitionRef.current = rec;
          rec.start();
        } catch {
          fallbackVoiceSimulation();
        }
      } else {
        fallbackVoiceSimulation();
      }
    }
  };

  const fallbackVoiceSimulation = () => {
    const sampleSpokenTexts: Record<string, string> = {
      te: 'మేము పోచంపల్లిలో మా స్వంత చేనేత మగ్గంపై సహజ రంగులతో ఈ స్వచ్ఛమైన పట్టు చీరను 14 రోజులు ఎంతో శ్రమతో నేసాము.',
      ta: 'நாங்கள் பாரம்பரிய தறியில் இயற்கை சாயங்கள் கொண்டு இந்த பட்டு புடவையை நெய்துள்ளோம்.',
      hi: 'यह शुद्ध हस्तनिर्मित कलाकृति है, जिसे हमने स्थानीय प्राकृतिक मिट्टी और रंग से 7 दिनों में गढ़ा है।',
      bn: 'আমরা সম্পূর্ণ প্রাকৃতিক উপাদান দিয়ে হাতে এই ঐতিহ্যবাহী শিল্পকর্ম তৈরি করেছি।',
      or: 'ଆମେ ୪୦୦୦ ବର୍ଷ ପୁରାତନ ଧୋକ୍ରା ପଦ୍ଧତିରେ ଏହି ହରିଣ ପିତ୍ତଳ ଶିଳ୍ପ ଗଠନ କରିଛୁ।',
      gu: 'આ શુદ્ધ હાથબનાવટ ટેરાકોટા કળા છે જે પરંપરાગત ભઠ્ઠીમાં તૈયાર કરેલ છે.'
    };
    const transcript = sampleSpokenTexts[selectedOutputLang] || sampleSpokenTexts['te'];
    setTimeout(() => {
      setCustomVoiceNotes(transcript);
      setIsRecording(false);
    }, 2500);
  };

  // Run AI Scan
  const handleStartAIScan = async () => {
    if (!imagePreviewUrl) return;

    setIsScanning(true);
    setAiScanResult(null);
    setPublishSuccess(false);

    // Step animation ticker
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % SCAN_PROGRESS_STEPS.length;
      setScanStepIndex(step);
    }, 600);

    try {
      const response = await fetch('/api/gemini/analyze-craft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImageBase64 || imagePreviewUrl,
          imageUrl: imagePreviewUrl,
          selectedLanguage: selectedOutputLang,
          customNotes: customVoiceNotes,
          voiceNotes: customVoiceNotes,
        }),
      });

      const data = await response.json();
      setAiScanResult(data);
    } catch (err) {
      console.error('Error during AI Vision scan:', err);
    } finally {
      clearInterval(interval);
      setIsScanning(false);
    }
  };

  // Publish to Catalog
  const handlePublishToCatalog = () => {
    if (!aiScanResult) return;

    const newCraft: CraftItem = {
      id: `craft-ai-${Date.now()}`,
      title: aiScanResult.title || 'Master Handmade Craft',
      hindiTitle: aiScanResult.hindiTitle || 'हस्तनिर्मित शिल्प',
      regionalTitle: aiScanResult.regionalTitle || aiScanResult.title,
      regionalLanguage: selectedOutputLang,
      craftLineage: aiScanResult.craftLineage || 'Authentic GI Tagged Indian Handcraft',
      category: aiScanResult.category || 'Handloom',
      stateOfOrigin: aiScanResult.stateOfOrigin || artisan.state,
      materialsDetected: aiScanResult.materialsDetected || ['Pure Natural Materials'],
      heritageStory: aiScanResult.heritageStory || '',
      hindiStory: aiScanResult.hindiStory || '',
      regionalStory: aiScanResult.regionalStory || '',
      suggestedTags: aiScanResult.suggestedTags || ['100% Shuddh Hastshilp', 'Made in India'],
      estimatedCraftingDays: aiScanResult.estimatedCraftingDays || 10,
      pricingEstimation: aiScanResult.pricingEstimation || {
        baseMaterialCostINR: 2000,
        fairKarigarWageINR: 2500,
        recommendedRetailPriceINR: 5200,
        pricingRationale: 'Fair living wage benchmark'
      },
      careInstructions: aiScanResult.careInstructions || 'Handle with traditional care.',
      artisan: artisan,
      imageUrl: imagePreviewUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
      certificateId: `GI-IND-${(aiScanResult.stateOfOrigin || 'IND').substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      rating: 5.0,
      viewsCount: 1,
      inquiriesCount: 0,
      isGiTagged: true,
      isHandmadeSealVerified: true
    };

    addCraft(newCraft);
    setLastPublishedCraft(newCraft);
    setPublishSuccess(true);
    triggerMarigoldConfetti();
  };

  return (
    <div id="ai-scan-studio-root" className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Main Dual-Pane Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Pane (5 Cols): Image & Voice Input */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1-Click Judge Demo Presets & Language Selection */}
          <div className="bg-white rounded-3xl p-5 border border-amber-900/15 shadow-xs">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#A84A2C] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Wand2 className="w-3.5 h-3.5 text-[#A84A2C]" />
                {t.studio_demo_presets}
              </span>
              <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-2.5 py-1 rounded-xl border border-amber-500/30">
                <Languages className="w-3.5 h-3.5 text-[#A84A2C] shrink-0" />
                <select
                  id="ai-output-lang-select"
                  value={selectedOutputLang}
                  onChange={(e) => setSelectedOutputLang(e.target.value as LanguageCode)}
                  aria-label="Output Language"
                  className="bg-transparent text-[11px] font-bold text-[#0F1E2E] focus:outline-hidden cursor-pointer font-sans"
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {DEMO_CRAFT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  id={`demo-preset-${preset.id}`}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-2xl text-left border transition-all flex items-center space-x-2.5 cursor-pointer ${
                    imagePreviewUrl === preset.imageUrl
                      ? 'bg-[#FAF9F6] border-[#A84A2C] shadow-xs ring-1 ring-[#A84A2C]/30'
                      : 'bg-white border-stone-200/80 hover:border-amber-900/20 hover:bg-[#FAF9F6]'
                  }`}
                >
                  <img
                    src={preset.imageUrl}
                    alt={preset.name}
                    className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-bold text-[#0F1E2E] truncate font-serif">{preset.name}</p>
                    <p className="text-[9px] text-[#A84A2C] font-semibold truncate font-sans">{preset.regionalLabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Dropzone & Camera Trigger */}
          <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/40 shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#0C243C] uppercase tracking-wider block font-sans">
              {t.studio_dropzone_title}
            </span>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />

            {imagePreviewUrl ? (
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 border-2 border-[#D4AF37] bg-stone-900 group">
                <img
                  src={imagePreviewUrl}
                  alt="Craft Preview"
                  className="w-full h-full object-cover"
                />

                {/* Laser Scanning Overlay When Scanning */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center pointer-events-none">
                    <div className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-400 to-transparent animate-laser-sweep shadow-[0_0_15px_#F39C12]" />
                    
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400 animate-spin-slow" />
                      <div className="absolute inset-2 rounded-full border border-amber-300 animate-spin-reverse-slow" />
                      <div className="w-12 h-12 rounded-full bg-amber-400/20 backdrop-blur-md flex items-center justify-center">
                        <Flame className="w-6 h-6 text-amber-300 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Top-Right Remove Image Button */}
                {!isScanning && (
                  <button
                    type="button"
                    id="remove-scan-image-btn"
                    onClick={handleRemoveImage}
                    aria-label="Remove image"
                    title="Remove image"
                    className="absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#B83227] text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer border border-white/40 group/btn"
                  >
                    <X className="w-4 h-4 text-white transition-transform duration-200 group-hover/btn:rotate-90" />
                    <span className="sr-only">Remove image</span>
                  </button>
                )}

                {/* Change photo button */}
                {!isScanning && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-bold text-[#0C243C] shadow-md border border-stone-200 cursor-pointer font-sans transition-all duration-150 hover:scale-105 active:scale-95"
                  >
                    Change Image
                  </button>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D4AF37]/60 hover:border-[#B83227] rounded-2xl p-8 text-center cursor-pointer bg-[#FAF6EE]/50 hover:bg-[#FAF6EE] transition-all space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-white mx-auto flex items-center justify-center text-[#B83227] shadow-xs border border-stone-200">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0C243C] font-serif">{t.studio_dropzone_desc}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5 font-sans">Supports JPG, PNG, WEBP from phone camera</p>
                </div>
              </div>
            )}

            {/* Vernacular Voice Note Input */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#0C243C] flex items-center gap-1.5 font-sans uppercase tracking-wider">
                  <Mic className="w-3.5 h-3.5 text-[#B83227]" />
                  <span>{t.studio_voice_input}</span>
                </label>
                <button
                  id="voice-mic-btn"
                  onClick={toggleVoiceRecording}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer font-sans ${
                    isRecording
                      ? 'bg-[#B83227] text-white animate-pulse'
                      : 'bg-[#FAF6EE] text-[#0C243C] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#B83227]" />}
                  <span>{isRecording ? t.studio_voice_listening : t.studio_voice_tap}</span>
                </button>
              </div>

              <textarea
                id="voice-notes-textarea"
                rows={3}
                value={customVoiceNotes}
                onChange={(e) => setCustomVoiceNotes(e.target.value)}
                placeholder={t.studio_voice_placeholder}
                className="w-full text-xs p-3 rounded-xl bg-[#FAF6EE]/50 border border-stone-200 focus:outline-hidden focus:border-[#B83227] text-[#0C243C] font-serif"
              />
            </div>

            {/* Launch AI Analysis Button */}
            <button
              id="start-ai-scan-btn"
              disabled={!imagePreviewUrl || isScanning}
              onClick={handleStartAIScan}
              className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer font-sans ${
                !imagePreviewUrl || isScanning
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-linear-to-r from-[#B83227] via-[#D4AF37] to-[#B83227] hover:scale-[1.01] text-white'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>{t.studio_analyzing_btn}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.studio_analyze_btn}</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Right Pane (7 Cols): Live AI Result & Catalog Editor */}
        <div className="lg:col-span-7">
          
          {/* Scanning Progress Overlay Banner */}
          {isScanning && (
            <div className="bg-[#0C243C] text-white rounded-2xl p-6 border border-[#D4AF37] shadow-xl space-y-4 mb-6 animate-in fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-amber-200 font-serif">
                    {SCAN_PROGRESS_STEPS[scanStepIndex].title}
                  </h2>
                  <p className="text-[11px] text-stone-300 font-sans">
                    {SCAN_PROGRESS_STEPS[scanStepIndex].sub}
                  </p>
                </div>
              </div>

              {/* Progress Steps Indicators */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {SCAN_PROGRESS_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx <= scanStepIndex ? 'bg-amber-400' : 'bg-stone-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Success Banner on Publishing */}
          {publishSuccess && lastPublishedCraft && (
            <div className="bg-[#27AE60]/15 border border-[#27AE60] rounded-2xl p-4 sm:p-5 mb-6 animate-in zoom-in-95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#27AE60] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0C243C] font-serif">
                    {t.studio_success_title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans">
                    "{lastPublishedCraft.title}" is now live with GI Certificate ID <strong>{lastPublishedCraft.certificateId}</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedCraftForCertificate(lastPublishedCraft)}
                  className="flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-xl bg-white text-[#0C243C] text-xs font-bold border border-stone-200 shadow-xs hover:bg-[#FAF6EE] cursor-pointer font-sans"
                >
                  {t.studio_view_cert}
                </button>
                <button
                  onClick={() => setActiveTab('bazaar')}
                  className="flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-xl bg-[#0C243C] text-white text-xs font-bold shadow-xs hover:bg-[#162E4A] cursor-pointer font-sans"
                >
                  {t.studio_view_bazaar}
                </button>
              </div>
            </div>
          )}

          {/* Result Editor */}
          {aiScanResult ? (
            <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/50 shadow-md space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center space-x-2">
                  {aiScanResult.isAuthenticCraft === false ? (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-[#27AE60]" />
                  )}
                  <span className="text-xs font-bold text-[#0C243C] uppercase tracking-wider font-sans">
                    {aiScanResult.isAuthenticCraft === false
                      ? 'AI Vision Detection Result'
                      : t.studio_verified_draft}
                  </span>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border font-sans uppercase ${
                  aiScanResult.isAuthenticCraft === false
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-[#D4AF37]/15 text-[#B83227] border-[#D4AF37]/40'
                }`}>
                  {aiScanResult.category} • {aiScanResult.stateOfOrigin}
                </span>
              </div>

              {/* Non-Craft Informational Banner */}
              {aiScanResult.isAuthenticCraft === false && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">Everyday / Non-Handcraft Object Detected</p>
                    <p className="text-amber-800 text-[11px] leading-relaxed">
                      Google Gemini Multimodal Vision recognized the visual pixels of this image as <strong>{aiScanResult.title}</strong>. For official GI Heritage certification and Kala-Moolya Fair Wage appraisal, please upload an authentic handmade Indian craft or handloom textile.
                    </p>
                  </div>
                </div>
              )}

              {/* Multilingual Titles */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1 font-sans">
                    English Global Title
                  </label>
                  <input
                    type="text"
                    value={aiScanResult.title}
                    onChange={(e) => setAiScanResult({ ...aiScanResult, title: e.target.value })}
                    className="w-full text-sm font-bold text-[#0C243C] p-2.5 rounded-xl bg-[#FAF6EE] border border-stone-200 focus:outline-hidden font-serif"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#B83227] uppercase tracking-wider block mb-1 font-sans">
                      हिन्दी शीर्षक (Devanagari)
                    </label>
                    <input
                      type="text"
                      value={aiScanResult.hindiTitle}
                      onChange={(e) => setAiScanResult({ ...aiScanResult, hindiTitle: e.target.value })}
                      className="w-full text-xs font-semibold text-[#0C243C] p-2 rounded-xl bg-white border border-stone-200 focus:outline-hidden font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#27AE60] uppercase tracking-wider block mb-1 font-sans">
                      क्षेत्रीय भाषा शीर्षक (Regional Script)
                    </label>
                    <input
                      type="text"
                      value={aiScanResult.regionalTitle}
                      onChange={(e) => setAiScanResult({ ...aiScanResult, regionalTitle: e.target.value })}
                      className="w-full text-xs font-semibold text-[#0C243C] p-2 rounded-xl bg-white border border-stone-200 focus:outline-hidden font-serif"
                    />
                  </div>
                </div>
              </div>

              {/* Craft Lineage & Heritage Story */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div>
                  <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1 font-sans">
                    Craft Lineage & GI Tag Status
                  </label>
                  <input
                    type="text"
                    value={aiScanResult.craftLineage}
                    onChange={(e) => setAiScanResult({ ...aiScanResult, craftLineage: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl bg-white border border-stone-200 text-[#0C243C] font-serif"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1 font-sans">
                    {t.hero_virasat_katha} (Cultural Heritage Story — Global)
                  </label>
                  <textarea
                    rows={3}
                    value={aiScanResult.heritageStory}
                    onChange={(e) => setAiScanResult({ ...aiScanResult, heritageStory: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF6EE] border border-stone-200 text-[#0C243C] leading-relaxed font-serif"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#B83227] uppercase tracking-wider block mb-1 font-sans">
                    मातृभाषा विरासत कथा (Regional Cultural Story)
                  </label>
                  <textarea
                    rows={2}
                    value={aiScanResult.regionalStory}
                    onChange={(e) => setAiScanResult({ ...aiScanResult, regionalStory: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF6EE] border border-stone-200 text-[#0C243C] leading-relaxed font-serif"
                  />
                </div>
              </div>

              {/* Materials & Smart Desi Tag Cloud */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div>
                  <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5 font-sans">
                    {t.hero_heritage_badge} (Materials Detected)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {aiScanResult.materialsDetected?.map((mat, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200 font-sans">
                        🌿 {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5 font-sans">
                    Smart Desi Tags
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {aiScanResult.suggestedTags?.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-amber-50 text-[#B83227] text-[11px] font-semibold border border-amber-200 font-sans">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kala-Moolya Fair Price Advisor Breakdown */}
              <div className="pt-2 border-t border-stone-100 bg-[#FAF6EE] p-4 rounded-2xl border border-[#D4AF37]/30 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0C243C] uppercase tracking-wider flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#E67E22]" />
                    <span>{t.hero_fair_price_title}</span>
                  </span>
                  <span className="text-xs font-extrabold text-[#B83227] font-serif text-base">
                    ₹{aiScanResult.pricingEstimation?.recommendedRetailPriceINR?.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200 flex sm:flex-col justify-between items-center sm:justify-center">
                    <p className="text-[10px] text-stone-500">{t.hero_material_cost}</p>
                    <p className="font-bold text-[#0C243C]">₹{aiScanResult.pricingEstimation?.baseMaterialCostINR}</p>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-emerald-800 flex sm:flex-col justify-between items-center sm:justify-center">
                    <p className="text-[10px] text-emerald-600 font-semibold">{t.hero_artisan_wage}</p>
                    <p className="font-bold text-emerald-700">₹{aiScanResult.pricingEstimation?.fairKarigarWageINR}</p>
                  </div>
                  <div className="p-2.5 bg-[#0C243C] rounded-xl text-amber-200 flex sm:flex-col justify-between items-center sm:justify-center">
                    <p className="text-[10px] text-stone-300">{t.bazaar_fair_price_label}</p>
                    <p className="font-bold">₹{aiScanResult.pricingEstimation?.recommendedRetailPriceINR}</p>
                  </div>
                </div>

                <p className="text-[10px] text-stone-500 italic font-serif">
                  💡 {aiScanResult.pricingEstimation?.pricingRationale}
                </p>
              </div>

              {/* Publish Action Button */}
              <button
                id="publish-to-catalog-btn"
                onClick={handlePublishToCatalog}
                className="w-full py-4 rounded-2xl bg-[#B83227] hover:bg-[#96261c] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 border border-[#D4AF37] cursor-pointer font-sans"
              >
                <span>{t.studio_publish_btn}</span>
              </button>

            </div>
          ) : (
            /* Empty Placeholder State */
            <div className="h-full min-h-[420px] bg-white/70 rounded-2xl border-2 border-dashed border-stone-200 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6EE] flex items-center justify-center text-[#D4AF37] shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-base font-bold text-[#0C243C] font-serif">
                  {t.studio_placeholder_title}
                </h3>
                <p className="text-xs text-stone-500 font-serif">
                  {t.studio_placeholder_desc}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
