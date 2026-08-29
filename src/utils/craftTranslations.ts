import { CraftCategory, CraftItem, LanguageCode } from '../types';

export interface MultilingualCraftData {
  title: Partial<Record<LanguageCode, string>>;
  craftLineage: Partial<Record<LanguageCode, string>>;
  category: Partial<Record<LanguageCode, string>>;
  story: Partial<Record<LanguageCode, string>>;
  materials: Partial<Record<LanguageCode, string[]>>;
}

export const CATEGORY_TRANSLATIONS: Record<string, Partial<Record<LanguageCode, string>>> = {
  'Handloom': {
    en: 'Handloom Weaving',
    te: 'చేనేత వస్త్రాలు',
    hi: 'हथकरघा बुनाई',
    ta: 'கைத்தறி நெசவு',
    kn: 'ಕೈಮಗ್ಗ ನೇಯ್ಗೆ',
    ml: 'കൈത്തറി നെയ്ത്ത്',
    mr: 'हातमाग कापड',
    gu: 'હાથવણાટ',
    bn: 'হস্তচালিত তাঁত',
    or: 'ହସ୍ତତନ୍ତ',
    pa: 'ਹੱਥ ਖੱਡੀ',
    as: 'হস্ততাঁত',
    kok: 'हातमाग',
    ne: 'हातले बुनेको',
    mni: 'খুৎনা শাবা',
    kha: 'Jain Thain',
    lus: 'Puan Thawn',
    ur: 'دستکاری / ہتھ کرگھا'
  },
  'Clay/Pottery': {
    en: 'Clay & Pottery',
    te: 'మట్టి పాత్రలు & శిల్పాలు',
    hi: 'मिट्टी शिल्प व बर्तन',
    ta: 'மண்பாண்டக் கலை',
    kn: 'ಮಣ್ಣಿನ ಪಾತ್ರೆ & ಕಲೆ',
    ml: 'മൺപാത്ര നിർമ്മാണം',
    mr: 'मातीची भांडी व शिल्पे',
    gu: 'માટીકામ અને વાસણો',
    bn: 'মৃৎশিল্প ও মৃৎপাত্র',
    or: 'ମାଟିପାତ୍ର ଓ କଳା',
    pa: 'ਮਿੱਟੀ ਦੇ ਭਾਂਡੇ',
    as: 'মৃৎশিল্প',
    kok: 'मातयेच्यो वस्तू',
    ne: 'माटोका भाँडाकुँडा',
    mni: 'লৈবাক্কী চফু',
    kha: 'Khyndew Khiew',
    lus: 'Hlum Beltawng',
    ur: 'مٹی کے برتن و دستکاری'
  },
  'Metalcraft': {
    en: 'Metalcraft',
    te: 'లోహ శిల్పకళ',
    hi: 'धातु शिल्प',
    ta: 'உலோகக் கைவினை',
    kn: 'ಲೋಹ ಕರಕುಶಲ',
    ml: 'ലോഹ ശിൽപകല',
    mr: 'धातू काम',
    gu: 'ધાતુ હસ્તકળા',
    bn: 'ধাতু শিল্প',
    or: 'ଧାତୁ ଶିଳ୍ପ',
    pa: 'ਧਾਤੂ ਸ਼ਿਲਪ',
    as: 'ধাতু শিল্প',
    kok: 'धातू काम',
    ne: 'धातु शिल्पकला',
    mni: 'য়োৎকী খুৎশৈ',
    kha: 'Rnong Kti',
    lus: 'Thir Kutthem',
    ur: 'دھاتی دستکاری'
  },
  'Folk Art': {
    en: 'Folk Art',
    te: 'జానపద చిత్రకళ',
    hi: 'पारंपरिक लोककला',
    ta: 'நாட்டுப்புறக் கலை',
    kn: 'ಜಾನಪದ ಕಲೆ',
    ml: 'നാടോടി കല',
    mr: 'लोककला',
    gu: 'લોક ચિત્રકળા',
    bn: 'লোকশিল্প',
    or: 'ଲୋକକଳା',
    pa: 'ਲੋਕ ਕਲਾ',
    as: 'লোককলা',
    kok: 'लोककला',
    ne: 'लोक कला',
    mni: 'নাৎকী লাই চিত্র',
    kha: 'Ka Jingthoh Dur Tynrai',
    lus: 'Hnam Nunphung Lemziak',
    ur: 'روایتی لوک فن'
  },
  'Woodcraft': {
    en: 'Woodcraft',
    te: 'కొయ్య బొమ్మలు & చెక్కడాలు',
    hi: 'काष्ठ शिल्प व खिलौने',
    ta: 'மர வேலைப்பாடு',
    kn: 'ಮರದ ಕರಕುಶಲ',
    ml: 'മരപ്പണി ശിൽപം',
    mr: 'लाकूड काम',
    gu: 'લાકડાની હસ્તકળા',
    bn: 'দারুশিল্প ও কাঠের পুতুল',
    or: 'କାଠ ଶିଳ୍ପ',
    pa: 'ਲੱਕੜ ਸ਼ਿਲਪ',
    as: 'কাঠৰ শিল্প',
    kok: 'લાકડી કામ',
    ne: 'काठको शिल्पकला',
    mni: 'উগী খুৎশৈ',
    kha: 'Dieng Kti',
    lus: 'Thing Kutthem',
    ur: 'لکڑی کی دستکاری'
  },
  'Stone Craft': {
    en: 'Stone Craft',
    te: 'రాతి శిల్పకళ',
    hi: 'प्रस्तर शिल्प',
    ta: 'கற்சிற்பக் கலை',
    kn: 'ಕಲ್ಲು ಕೆತ್ತನೆ',
    ml: 'ശിലാ ശിൽപകല',
    mr: 'दगडी शिल्प',
    gu: 'પથ્થર હસ્તકળા',
    bn: 'প্রস্তর ভাস্কর্য',
    or: 'ପଥର ଶିଳ୍ପ',
    pa: 'ਪੱਥਰ ਸ਼ਿਲਪ',
    as: 'শিলৰ ভাস্কৰ্য',
    kok: 'फातर काम',
    ne: 'ढुङ्गाको शिल्प',
    mni: 'নুংগী খুৎশৈ',
    kha: 'Maw Kti',
    lus: 'Lung Kutthem',
    ur: 'سنگ تراشی'
  },
  'Jewelry/Terracotta': {
    en: 'Jewelry / Terracotta',
    te: 'ఆభరణాలు & టెర్రకోట',
    hi: 'पारंपरिक आभूषण व टेराकोटा',
    ta: 'நகைகள் மற்றும் சுடுமண்',
    kn: 'ಆಭರಣ ಮತ್ತು ಜೇಡಿಮಣ್ಣು',
    ml: 'ആഭരണങ്ങളും ടെറാക്കോട്ടയും',
    mr: 'दागिने आणि मातीकाम',
    gu: 'ઘરેણાં અને ટેરાકોટા',
    bn: 'গহনা ও টেরাকোটা',
    or: 'ଅଳଙ୍କାର ଓ ଟେରାକୋଟା',
    pa: 'ਗਹਿਣੇ ਅਤੇ ਮਿੱਟੀ',
    as: 'অলংকাৰ আৰু পোৰামাটি',
    kok: 'अलंकार आनी मातीकाम',
    ne: 'गहना र टेराकोटा',
    mni: 'লুহোংগী পোৎলম অমসুং টেরাকোটা',
    kha: 'Ki Jingdeng & Khiew',
    lus: 'Thil Inbel & Terracotta',
    ur: 'زیورات اور ٹیراکوٹا'
  }
};

export const CRAFT_TRANSLATIONS: Record<string, MultilingualCraftData> = {
  'craft-pochampally-ikat': {
    title: {
      en: 'Handwoven Pochampally Double Ikat Pure Silk Saree',
      te: 'చేనేత పోచంపల్లి డబుల్ ఇక్కత్ స్వచ్ఛమైన పట్టు చీర',
      hi: 'हस्तनिर्मित पोचमपल्ली डबल इकत शुद्ध रेशम साड़ी',
      ta: 'கைத்தறி போச்சம்பள்ளி இரட்டை இக்கத் பட்டு சேலை',
      kn: 'ಕೈಮಗ್ಗದ ಪೋಚಂಪಲ್ಲಿ ಡಬಲ್ ಇಕ್ಕತ್ ರೇಷ್ಮೆ ಸೀರೆ',
      ml: 'കൈത്തറി പോച്ചമ്പള്ളി ഡബിൾ ഇക്കത് പട്ട് സാരി',
      mr: 'हातमागावर विणलेली पोचमपल्ली डबल इकत रेशमी साडी',
      gu: 'હાથવણાટ પોચમપલ્લી ડબલ ઇકત રેશમ સાડી',
      bn: 'হস্তচালিত তাঁতের পোচমপল্লী ডাবল ইক্বাত রেশম শাড়ি',
      or: 'ହାତବୁଣା ପୋଚମପଲ୍ଲୀ ଡବଲ ଇକତ ପାଟ ଶାଢ଼ୀ',
      pa: 'ਹੱਥ ਨਾਲ ਬੁਣੀ ਪੋਚਮਪੱਲੀ ਡਬਲ ਇਕਤ ਰੇਸ਼ਮੀ ਸਾੜ੍ਹੀ',
      as: 'হাতে বোৱা পচমপল্লী ডাবল ইকট পাটৰ শাৰী',
      kok: 'हातमागाचेर विणिल्ली पोचमपल्ली डबल इकत रेशमी साडी',
      ne: 'हातले बुनेको पोचमपल्ली डबल इकत रेशमी सारी',
      mni: 'খুৎনা শাবা পোচমপল্লী দবল ইকৎ সিল্ক শাড়ী',
      kha: 'Ka Jain Sem Silk Pochampally ba la thain da kti',
      lus: 'Kutthem Pochampally Double Ikat Silk Puanchei',
      ur: 'دست سے بنی پوچم پلی ڈبل ایکت خالص ریشمی ساڑھی'
    },
    craftLineage: {
      en: 'Pochampally Ikat GI (Geographical Indication No. 4) — 200-year-old hereditary Pagdu Bandhu tie-and-dye weaving tradition.',
      te: 'పోచంపల్లి ఇక్కత్ జిఐ (నెం. 4) — 200 ఏళ్ల పురాతన పగ్డు బంధు టై-అండ్-డై చేనేత వారసత్వం.',
      hi: 'पोचमपल्ली इकत जीआई (सं. 4) — 200 वर्ष पुरानी पारंपरिक पगडु बंधु टाई-एंड-डाई बुनाई विरासत।'
    },
    category: CATEGORY_TRANSLATIONS['Handloom'],
    story: {
      en: 'Woven with mathematical precision using the ancient Pagdu Bandhu tie-and-dye technique where warp and weft yarns are dyed before weaving. Each geometric diamond pattern signifies cosmic balance and prosperity in traditional Telugu bridal ceremonies. Master weavers align thousands of microscopic colored silk threads manually across an antique pit loom.',
      te: 'సాంప్రదాయ పగ్డు బంధు టై-అండ్-డై పద్ధతిలో రంగులద్ది నేసిన స్వచ్ఛమైన చేనేత పట్టు చీర. ప్రతి జ్యామితీయ విన్యాసం శుభానికి మరియు సమతుల్యతకు చిహ్నం. పోచంపల్లి గ్రామీణ నేతన్నల అద్భుత సృష్టి ఇది.',
      hi: 'प्राचीन पगडु बंधु तकनीक द्वारा ताना और बाना को रंगकर इस साड़ी को बुना गया है। प्रत्येक ज्यामितीय प्रतिरूप ब्रह्मांडीय संतुलन और समृद्धि का प्रतीक है।'
    },
    materials: {
      en: ['100% Pure Mulberry Silk', 'Natural Madder Root Dye', 'Organic Indigo Extract', 'Zari Border'],
      te: ['100% స్వచ్ఛమైన మల్బరీ పట్టు', 'సహజ వేర్ల రంగులు', 'సేంద్రీయ నీలిమందు రంగు', 'స్వచ్ఛమైన జరీ అంచు'],
      hi: ['100% शुद्ध मलबरी रेशम', 'प्राकृतिक मजीठ जड़ रंग', 'जैविक नील अर्क', 'जरी बॉर्डर']
    }
  },
  'craft-bastar-dhokra': {
    title: {
      en: 'Bastar Dhokra Lost-Wax Bell Metal Tribal Deer',
      te: 'బస్తర్ ధోక్రా పోత ఇత్తడి గిరిజన జింక శిల్పం',
      hi: 'बस्तर ढोकरा लुप्त-मोम आदिवासी पीतल हिरण',
      ta: 'பஸ்தர் தோக்ரா மெழுகு வார்ப்பு பித்தளை மான் சிற்பம்',
      kn: 'ಬಸ್ತಾರ್ ಧೋಕ್ರಾ ಸಾಂಪ್ರದಾಯಿಕ ಹಿತ್ತಾಳೆ ಜಿಂಕೆ ಶಿಲ್ಪ',
      ml: 'ബസ്തർ ധോക്ര പരമ്പരാഗത വെങ്കല മാൻ ശിൽപം',
      mr: 'बस्तर ढोकरा पारंपारिक पितळी हरणाचे शिल्प',
      gu: 'બસ્તર ઢોકરા પરંપરાગત પિત્તળ હરણ શિલ્પ',
      bn: 'বস্তার ঢোকরা প্রাচীন ব্রোঞ্জের উপজাতীয় হরিণ ভাস্কর্য',
      or: 'ହାତତିଆରି ବସ୍ତର ଢୋକ୍ରା ପିତ୍ତଳ ହରିଣ ମୂର୍ତ୍ତି',
      pa: 'ਬਸਤਰ ਢੋਕਰਾ ਪਰੰਪਰਾਗਤ ਪਿੱਤਲ ਹਿਰਨ ਮੂਰਤੀ',
      as: 'বস্তাৰ ঢোক্ৰা পিতলৰ জনজাতীয় হৰিণাৰ ভাস্কৰ্য',
      kok: 'बस्तर ढोकरा पितळेचें हरणाचें शिल्प',
      ne: 'बस्तर ढोकरा परम्परागत पित्तलको मृग मूर्ति',
      mni: 'বস্তার ধোক্ৰা ট্রাইবাল পিতলগী শজিব ভাস্কর্য্য',
      kha: 'U Sier Rnong Tribal Bastar Dhokra',
      lus: 'Bastar Dhokra Thir Sih Sazuk Milem',
      ur: 'بستر ڈھوکرا قبائلی پیتل ہرن کا شاہکار مجسمہ'
    },
    craftLineage: {
      en: 'Bastar Dhokra GI (Geographical Indication No. 83) — 4,000-year-old Indus Valley Lost-Wax (Cire Perdue) metal casting.',
      te: 'బస్తర్ ధోక్రా జిఐ (నెం. 83) — 4,000 ఏళ్ల సింధు లోయ నాగరికత లాస్ట్-వ్యాక్స్ లోహ శిల్పకళ.',
      hi: 'बस्तर ढोकरा जीआई (सं. 83) — 4,000 वर्ष पुरानी सिंधु घाटी लुप्त-मोम ढलाई परंपरा।'
    },
    category: CATEGORY_TRANSLATIONS['Metalcraft'],
    story: {
      en: 'Hand-sculpted using the unbroken 4,000-year-old non-ferrous lost-wax process practiced since the Mohenjo-daro Dancing Girl era. Every single piece begins with a hand-modeled clay core wrapped in pure beeswax threads, encased in river silt, and fired in an open pit kiln.',
      te: '4000 ఏళ్ల పురాతన లాస్ట్-వ్యాక్స్ పద్ధతిలో చేతులతో తీర్చిదిద్దిన బస్తర్ ధోక్రా కంచు జింక శిల్పం. బంకమట్టి, తేనెటీగల మైనం తీగలతో నమూనా చేసి అగ్నిలో కాల్చి తయారుచేస్తారు. ప్రతి శిల్పం ప్రపంచంలో ఏకైకం.',
      hi: 'मोहनजोदड़ो की कांस्य मूर्तियों के समय से चली आ रही 4000 वर्ष पुरानी लुप्त-मोम ढलाई विधि से यह हिरण निर्मित है।'
    },
    materials: {
      en: ['Bell Metal (Kansa Bronze)', 'Pure Beeswax', 'Termite Hill River Clay', 'Mustard Oil Smelt'],
      te: ['కంచు మరియు ఇత్తడి మిశ్రమం', 'స్వచ్ఛమైన తేనెటీగల మైనం', 'పుట్టమట్టి మరియు నది ఒండ్రు', 'ఆవనూనె పోత'],
      hi: ['कांसा धातु (कांसा ब्रॉन्ज)', 'शुद्ध मधुमक्खी मोम', 'नदी की चिकनी मिट्टी', 'सरसों तेल प्रगलन']
    }
  },
  'craft-gorakhpur-terracotta': {
    title: {
      en: 'Gorakhpur Ornate Terracotta Ceremonial Elephant (Gajraj)',
      te: 'గోరఖ్‌పూర్ సంప్రదాయ నగిషీ టెర్రకోట గజరాజు (ఏనుగు)',
      hi: 'गोरखपुर पारंपरिक नक्काशीदार टेराकोटा गजराज (हाथी)',
      ta: 'கோரக்பூர் பாரம்பரிய சுடுமண் வேலைப்பாடு யானை சிலை',
      kn: 'ಗೋರಖ್‌ಪುರ ಸಾಂಪ್ರದಾಯಿಕ ಜೇಡಿಮಣ್ಣಿನ ಕೆತ್ತನೆಯ ಆನೆ',
      ml: 'ഗോരഖ്പൂർ പരമ്പരാഗത ടെറാക്കോട്ട ഗജരാജ ശിൽപം',
      mr: 'गोरखपूर पारंपारिक मातीचे कोरीव हत्ती शिल्प',
      gu: 'ગોરખપુર પરંપરાગત ટેરાકોટા હાથી શિલ્પ',
      bn: 'গোরখপুর ঐতিহ্যবাহী পোড়ামাটির সুসজ্জিত হাতি',
      or: 'ଗୋରଖପୁର ପାରମ୍ପରିକ ଟେରାକୋଟା ହାତୀ ମୂର୍ତ୍ତି',
      pa: 'ਗੋਰਖਪੁਰ ਪਰੰਪਰਾਗਤ ਮਿੱਟੀ ਦਾ ਹਾਥੀ ਬੁੱਤ',
      as: 'গোৰখপুৰ পোৰামাটিৰ অলংকৃত হাতীৰ মূৰ্তি',
      kok: 'गोरखपूर मातीचें कोरीव हतयाचें शिल्प',
      ne: 'गोरखपुर परम्परागत माटोको बुट्टेदार हात्ती',
      mni: 'গোরাখপুর টেরাকোটা সমুদ্র শৈরেংগী সামু',
      kha: 'Ka Hati Khyndew Terracotta Gorakhpur',
      lus: 'Gorakhpur Hlawhchham Sai Terracotta Milem',
      ur: 'گورکھپور روایتی ٹیراکوٹا شاہی ہاتھی'
    },
    craftLineage: {
      en: 'Gorakhpur Terracotta GI (Geographical Indication No. 637) — Centuries-old Aurangabad village natural clay pottery.',
      te: 'గోరఖ్‌పూర్ టెర్రకోట జిఐ (నెం. 637) — ఔరంగాబాద్ గ్రామీణ కుమ్మరుల సహజ మట్టి శిల్ప సంప్రదాయం.',
      hi: 'गोरखपुर टेराकोटा जीआई (सं. 637) — औरंगाबाद गांव की पारंपरिक प्राकृतिक मृदा कला।'
    },
    category: CATEGORY_TRANSLATIONS['Clay/Pottery'],
    story: {
      en: 'Created by the Prajapati pottery community using nutrient-rich silt dug from local ponds of Aurangabad village in Gorakhpur. The artisan hand-shapes the hollow body without synthetic molds and hand-embroiders intricate bells and chains.',
      te: 'గోరఖ్‌పూర్ ఔరంగాబాద్ చెరువుల సహజ నల్లమట్టితో రూపొందించిన పవిత్ర గజరాజు శిల్పం. ఎటువంటి అచ్చులూ లేకుండా చేతితోనే గంటలు, గొలుసుల నగిషీలు చెక్కబడతాయి.',
      hi: 'गोरखपुर के औरंगाबाद गांव की समृद्ध तालाब मिट्टी से प्रजापति समुदाय द्वारा यह खोखला गजराज हस्तनिर्मित किया गया है।'
    },
    materials: {
      en: ['Ami River Pond Silt', 'Natural Soda Glaze', 'Wood-Fired Terracotta', 'Mustard Straw Ash'],
      te: ['ఆమీ నది ఒండ్రు మట్టి', 'సహజ మట్టి రంగు', 'కలప మంటల్లో కాల్చిన టెర్రకోట', 'వరి గడ్డి బూడిద'],
      hi: ['आमी नदी की तालाब मिट्टी', 'प्राकृतिक सोडा चमक', 'लकड़ी की भट्टी में पका टेराकोटा', 'सरसों पुआल राख']
    }
  },
  'craft-tanjore-painting': {
    title: {
      en: 'Thanjavur 22K Gold Foil Saraswati Devata Painting',
      te: 'తంజావూరు 22 క్యారెట్ల స్వర్ణ రేకు సరస్వతీ దేవి చిత్రం',
      hi: 'तंजावूर 22 कैरेट स्वर्ण पत्र सरस्वती देवकला चित्र',
      ta: 'பாரம்பரிய தஞ்சாவூர் 22ct தங்கத் தகடு சரஸ்வதி ஓவியம்',
      kn: 'ತಂಜಾವೂರು 22 ಕ್ಯಾರೆಟ್ ಚಿನ್ನದ ಎಲೆಯ ಸರಸ್ವತಿ ಚಿತ್ರಕಲೆ',
      ml: 'തഞ്ചാവൂർ 22 കാരറ്റ് സ്വർണ്ണത്തകിട് സരസ്വതി ചിത്രകല',
      mr: 'तंजावर २२ कॅरेट सुवर्ण पत्र सरस्वती चित्रकला',
      gu: 'તંજાવુર 22 કેરેટ સોનાના વરખવાળી સરસ્વતી ચિત્રકળા',
      bn: 'তাঞ্জোর ২২ ক্যারেট সোনার পাত বসানো সরস্বতী চিত্রকর্ম',
      or: 'ତଞ୍ଜାଭୁର ୨୨ କ୍ୟାରେଟ ସୁନା ପାତ ସରସ୍ୱତୀ ଚିତ୍ରକଳା',
      pa: 'ਤੰਜਾਵੁਰ 22 ਕੈਰੇਟ ਸੋਨੇ ਦੇ ਵਰਕ ਵਾਲੀ ਸਰਸਵਤੀ ਪੇਂਟਿੰਗ',
      as: 'তাঞ্জাভুৰ ২২ কেৰেট সোণালী পাতৰ সৰস্বতী চিত্ৰকলা',
      kok: 'तंजावूर २२ कॅरेट भांगरा पानाची सरस्वती देवीची चित्राकृती',
      ne: 'तन्जाभुर २२ क्यारेट सुनको जलप भएको सरस्वती चित्रकला',
      mni: 'থাঞ্জাভুর ২২ কেরেট সনাগী সনাপাত সরস্বতী লাই চিত্র',
      kha: 'Ka Dur Saraswati ba la thoh da ka Ksiar Tanjore',
      lus: 'Thanjavur Rangkachak 22K Saraswati Lemziak',
      ur: 'تنجاور 22 قیراط سونے کا ورق والی سرسوتی پینٹنگ'
    },
    craftLineage: {
      en: 'Thanjavur Paintings GI (Geographical Indication No. 1) — Chola-Maratha 16th century classical gold leaf temple art.',
      te: 'తంజావూరు పెయింటింగ్స్ జిఐ (నెం. 1) — చోళ-మరాఠా 16వ శతాబ్దపు ఆలయ స్వర్ణ చిత్రకళా సంప్రదాయం.',
      hi: 'तंजावूर पेंटिंग्स जीआई (सं. 1) — 16वीं शताब्दी की चोल-मराठा स्वर्ण पत्र मंदिर कला।'
    },
    category: CATEGORY_TRANSLATIONS['Folk Art'],
    story: {
      en: 'Originating in the royal court of the Maratha rulers of Thanjavur, this sacred painting is rendered on seasoned teakwood clad in unbleached cotton with pure 22-carat gold foil relief and semi-precious Jaipur cabochons.',
      te: 'టేకు చెక్క మరియు నూలు వస్త్రంపై సున్నం జిగురుతో త్రిమితీయ ఆకృతులు చేసి, స్వచ్ఛమైన 22 క్యారెట్ల బంగారు రేకులతో జైపూర్ రత్నాలతో అలంకరించిన తంజావూరు కళాఖండం.',
      hi: 'तंजावूर के मराठा राजदरबार से जन्मी यह दिव्य चित्रकला सागौन की लकड़ी और 22 कैरेट के खरे सोने के वर्क से सुसज्जित है।'
    },
    materials: {
      en: ['22-Carat Pure Gold Leaf (Varak)', 'Seasoned Burma Teak Wood', 'Limestone Gesso Relief', 'Jaipur Semi-Precious Gems'],
      te: ['22 క్యారెట్ల స్వచ్ఛమైన బంగారు రేకులు', 'టేకు కలప', 'సహజ సున్నం మరియు బంక', 'జైపూర్ జాతి రత్నాలు'],
      hi: ['22 कैरेट शुद्ध स्वर्ण वर्क', 'सागौन की मजबूत लकड़ी', 'चूना पत्थर गेसो लेप', 'जयपुर के अर्ध-कीमती रत्न']
    }
  },
  'craft-jaipur-blue-pottery': {
    title: {
      en: 'Jaipur Persian Royal Blue Glazed Quartz Pottery Vase',
      te: 'జైపూర్ రాజరిక రాయల్ బ్లూ క్వార్ట్జ్ కుండీల జాడీ',
      hi: 'जयपुर पारंपरिक शाही ब्लू पॉटरी क्वार्ट्ज फूलदान',
      ta: 'ஜெய்ப்பூர் நீல பீங்கான் குவார்ட்ஸ் பூச்சாடி',
      kn: 'ಜೈಪುರ ಸಾಂಪ್ರದಾಯಿಕ ರಾಯಲ್ ಬ್ಲೂ ಪಾಟರಿ ಹೂದಾನಿ',
      ml: 'ജയ്പൂർ രാജകീയ നീല ക്വാർട്സ് സെറാമിക് പൂപ്പാത്രം',
      mr: 'जयपूर पारंपारिक रॉयल ब्लू पॉटरी क्वार्ट्झ फुलदाणी',
      gu: 'જયપુર પારંપરિક રોયલ બ્લુ પોટરી ક્વાર્ટ્ઝ વાઝ',
      bn: 'জয়পুর রয়েল ব্লু গ্লেজড কোয়ার্টজ মাটির ফুলদানি',
      or: 'ଜୟପୁର ଶାହୀ ନୀଳ କ୍ୱାର୍ଟଜ୍ ମାଟି ଫୁଲଦାନୀ',
      pa: 'ਜੈਪੁਰ ਰਾਇਲ ਬਲੂ ਪੋਟਰੀ ਕੁਆਰਟਜ਼ ਗੁਲਦਸਤਾ',
      as: 'জয়পুৰ ৰাজকীয় নীলা কোৱাৰ্টজ মাটিৰ ফুলদানী',
      kok: 'जयपूर निळें पॉटरी क्वार्ट्झ फूलदाणी',
      ne: 'जयपुर रोयल ब्लू पोटरी क्वार्ट्ज फूलदानी',
      mni: 'জয়পুর রোয়াল ব্লু পোটারী কোয়ার্টজ ফূলদানী',
      kha: 'U Khiew Blue Pottery ba shna ha Jaipur',
      lus: 'Jaipur Lung Hring Dum Khawvel Vase',
      ur: 'جے پور شاہی نیلی مٹی کا کوارٹز گلدان'
    },
    craftLineage: {
      en: 'Jaipur Blue Pottery GI (Geographical Indication No. 54) — Non-clay quartz and glass craftsmanship from Jaipur.',
      te: 'జైపూర్ బ్లూ పాటరీ జిఐ (నెం. 54) — సాధారణ మట్టి లేకుండా క్వార్ట్జ్ రాయి మరియు గాజుతో చేసే రాజరిక కళ.',
      hi: 'जयपुर ब्लू पॉटरी जीआई (सं. 54) — बिना सामान्य मिट्टी के क्वार्ट्ज पत्थर और कांच से निर्मित हस्तशिल्प।'
    },
    category: CATEGORY_TRANSLATIONS['Clay/Pottery'],
    story: {
      en: 'Unique among world ceramics because it utilizes zero clay — instead formulated from powdered quartz, raw glass, and natural resins with Persian arabesque motifs.',
      te: 'సాధారణ మట్టి వాడకుండా కేవలం క్వార్ట్జ్ రాతి పొడి, గాజు మిశ్రమంతో చేతితో పూల డిజైన్లు వేసి తయారుచేసిన జైపూర్ నీలి పింగాణీ జాడీ.',
      hi: 'विश्व भर में अद्वितीय क्योंकि इसमें मिट्टी का प्रयोग नहीं होता; यह क्वार्ट्ज पत्थर, कांच और मुल्तानी मिट्टी से बनती है।'
    },
    materials: {
      en: ['Crushed Quartz Stone Powder', 'Recycled Glass Cullet', 'Natural Fuller’s Earth (Multani Mitti)', 'Cobalt & Copper Oxide Blue Dyes'],
      te: ['క్వార్ట్జ్ రాతి పొడి', 'స్వచ్ఛమైన గాజు రవ్వ', 'ముల్తానీ మట్టి', 'కోబాల్ట్ నీలి రంగులు'],
      hi: ['पिसा हुआ क्वार्ट्ज पत्थर', 'कांच का बारीक चूर्ण', 'मुल्तानी मिट्टी', 'कोबाल्ट और कॉपर ऑक्साइड प्राकृतिक रंग']
    }
  },
  'craft-kashmir-pashmina': {
    title: {
      en: 'Kashmir Hand-Spun Pashmina Sozni Needle Embroidered Shawl',
      te: 'కాశ్మీర్ చేతితో వడికిన పష్మీనా సోజ్నీ ఎంబ్రాయిడరీ శాలువా',
      hi: 'कश्मीरी हाथ से काता गया पश्मीना सोज़नी सुई कशीदाकारी शॉल',
      ta: 'காஷ்மீர் கைநூல் பஷ்மினா சோஸ்னி வேலைப்பாடு சால்வை',
      kn: 'ಕಾಶ್ಮೀರ ಕೈನೂಲಿನ ಪಶ್ಮಿನಾ ಸೋಜ್ನಿ ಕಸೂತಿ ಶಾಲು',
      ml: 'കശ്മീർ കൈത്തറി പശ്മിന സോസ്നി എംബ്രോയ്ഡറി ഷാൾ',
      mr: 'काश्मीर हातमाग पश्मीना सोजनी भरतकाम शाल',
      gu: 'કાશ્મીર હાથથી કાંતેલી પશ્મીના સોઝની ભરતકામ શાલ',
      bn: 'কাশ্মীরি হাতে কাটা পশমিনা সোজনি সূঁচিশিল্প শাল',
      or: 'କାଶ୍ମୀର ହାତକଟା ପଶ୍ମିନା ସୋଜନୀ କାରୁକାର୍ଯ୍ୟ ଶାଲ',
      pa: 'ਕਸ਼ਮੀਰੀ ਹੱਥ ਨਾਲ ਕੱਤੀ ਪਸ਼ਮੀਨਾ ਸੋਜ਼ਨੀ ਕਢਾਈ ਸ਼ਾਲ',
      as: 'কাশ্মীৰী হাতে কটা পশ্মিনা চোজনী এম্ব্ৰয়ডাৰী শাল',
      kok: 'काश्मीर हातमाग पश्मीना सोजनी कशीदाकारी शाल',
      ne: 'काश्मीरी हातले कातेको पश्मिना सोज्नी कढाई शाल',
      mni: 'কাশ্মীর পশমীনা সোউজনি খুৎসাম্বা শোল',
      kha: 'Ka Jainkup Pashmina Kashmir ba thain da kti',
      lus: 'Kashmir Pashmina Sozni Thuin Puanlum',
      ur: 'کشمیر ہاتھ سے کاتا گیا پشمینہ سوزنی کڑھائی شال'
    },
    craftLineage: {
      en: 'Kashmir Pashmina GI (Geographical Indication No. 46) — Changthangi Changra goat fleece spun on traditional Charkha.',
      te: 'కాశ్మీర్ పష్మీనా జిఐ (నెం. 46) — హిమాలయ చాంగ్‌థాంగీ మేకల అరుదైన ఉన్నితో రాట్నంపై వడికిన శాలువా.',
      hi: 'कश्मीर पश्मीना जीआई (सं. 46) — 14,000 फीट की ऊंचाई पर पाई जाने वाली चांगथांगी बकरियों की प्राकृतिक ऊन।'
    },
    category: CATEGORY_TRANSLATIONS['Handloom'],
    story: {
      en: 'Spun by women artisans on wooden spinning wheels using cloud-soft underfleece of Himalayan Changra mountain goats and embroidered with microscopic single-needle Sozni stitches.',
      te: 'హిమాలయ చాంగ్‌థాంగీ మేకల మెత్తని ఉన్నితో రాట్నంపై నూలు వడికి, సూదితో ఎంతో సున్నితమైన సోజ్నీ పూల నగిషీలు చెక్కిన రాజరిక కాశ్మీరీ శాలువా.',
      hi: 'लद्दाख की पहाड़ियों पर चरने वाली चांगथांगी बकरियों के कोमल रोएं से कता शुद्ध पश्मीना शॉल, जिस पर महीनों सुई से कशीदाकारी की जाती है।'
    },
    materials: {
      en: ['Grade-A Changthangi Pashm Underfleece', 'Natural Saffron & Walnut Husk Dyes', 'Fine Silk Thread'],
      te: ['గ్రేడ్-ఎ చాంగ్‌థాంగీ పష్మ్ ఉన్ని', 'కుంకుమపువ్వు & అక్రోట్ తొక్కల సహజ రంగులు', 'నాణ్యమైన పట్టు దారం'],
      hi: ['ग्रेड-ए चांगथांगी पश्म ऊन', 'केसर और अखरोट के छिलकों का प्राकृतिक रंग', 'महीन रेशम धागा']
    }
  },
  'craft-kanchipuram-silk': {
    title: {
      en: 'Kanchipuram Heritage Temple Border Pure Mulberry Silk Saree',
      te: 'కాంచీపురం ఆలయ గోపురం సరిహద్దు స్వచ్ఛమైన పట్టు చీర',
      hi: 'कांचीपुरम मंदिर बॉर्डर शुद्ध रेशमी जरी साड़ी',
      ta: 'காஞ்சிபுரம் தூய பட்டு கோபுரம் பார்டர் சேலை',
      kn: 'ಕಾಂಚಿಪುರಂ ದೇವಾಲಯ ಬಾರ್ಡರ್ ಶುದ್ಧ ರೇಷ್ಮೆ ಸೀರೆ',
      ml: 'കാഞ്ചീപുരം ക്ഷേത്ര ബോർഡർ ശുദ്ധ പട്ട് സാരി',
      mr: 'कांजीवरम मंदिर काठ शुद्ध रेशमी जरी साडी',
      gu: 'કાંચીપુરમ મંદિર બોર્ડર શુદ્ધ સિલ્ક ઝરી સાડી',
      bn: 'কাঞ্চিপুরম মন্দির নকশা খাঁটি তুঁত রেশম শাড়ি',
      or: 'କାଞ୍ଚିପୁରମ ମନ୍ଦିର ବର୍ଡର ଖାଣ୍ଟି ପାଟ ଶାଢ଼ୀ',
      pa: 'ਕਾਂਚੀਪੁਰਮ ਮੰਦਰ ਬਾਰਡਰ ਸ਼ੁੱਧ ਰੇਸ਼ਮੀ ਸਾੜ੍ਹੀ',
      as: 'কাঞ্চীপুৰম মন্দিৰ পাৰীৰ খাঁটি পাটৰ শাৰী',
      kok: 'कांजीवरम देऊळ काठाची शुद्ध रेशमी साडी',
      ne: 'कान्छीपुरम मन्दिर किनारा शुद्ध रेशमी सारी',
      mni: 'কাঞ্চিপুরম লাইশঙ পরিং শৈরেংগী সিল্ক শাড়ী',
      kha: 'Ka Jain Sem Silk Kanchipuram Temple Border',
      lus: 'Kanchipuram Temple Border Silk Puanchei',
      ur: 'کانچی پورم مندر بارڈر خالص ریشمی زری ساڑھی'
    },
    craftLineage: {
      en: 'Kanchipuram Silk GI (Geographical Indication No. 2) — 400-year-old hereditary Korvai interlock temple weaving.',
      te: 'కాంచీపురం పట్టు జిఐ (నెం. 2) — 400 ఏళ్ల సంప్రదాయ కోర్వాయ్ ఆలయ గోపురాల నేత శైలి.',
      hi: 'कांचीपुरम सिल्क जीआई (सं. 2) — 400 वर्ष पुरानी पारंपरिक कोरवई मंदिर बुनाई शैली।'
    },
    category: CATEGORY_TRANSLATIONS['Handloom'],
    story: {
      en: 'Woven in the ancient city of a thousand temples by master weavers using heavy 3-ply twisted mulberry silk threads joined seamlessly using the ancient Korvai double-shuttle technique.',
      te: 'వేయి దేవాలయాల నగరమైన కాంచీపురంలో ముడిపట్టు మరియు అసలైన వెండి జరీతో కోర్వాయ్ పద్ధతిలో నేసిన పవిత్ర పట్టు చీర.',
      hi: 'कांचीपुरम के मंदिर नगर में तीन परतों वाले शुद्ध रेशम और असली चांदी-सोने की जरी से बुनी गई यह साड़ी अपनी अटूट कोरवई बुनाई के लिए प्रसिद्ध है।'
    },
    materials: {
      en: ['100% 3-Ply Pure Mulberry Silk', 'Certified Tested Silver & Gold Zari', 'Korvai Interlocking Weft'],
      te: ['100% మూడు పొరల మల్బరీ పట్టు', 'వెండి-బంగారు జరీ', 'కోర్వాయ్ లాకింగ్ దారాలు'],
      hi: ['100% तीन परतों वाला शुद्ध मलबरी रेशम', 'परीक्षित चांदी व सोने की जरी', 'कोरवई इंटरलॉकिंग बाना']
    }
  },
  'craft-channapatna-toys': {
    title: {
      en: 'Channapatna Eco-Friendly Ivory Wood King & Queen Royal Stacking Dolls',
      te: 'చన్నపట్న సహజ రంగుల కొయ్య రాజు-రాణి సాంప్రదాయ బొమ్మలు',
      hi: 'चन्नापटना प्राकृतिक लकड़ी राजा-रानी खिलौना सेट',
      ta: 'சென்னப்பட்னா மரத்தாலான ராஜா-ராணி பாரம்பரிய பொம்மைகள்',
      kn: 'ಚನ್ನಪಟ್ಟಣದ ನೈಸರ್ಗಿಕ ಬಣ್ಣದ ರಾಜ-ರಾಣಿ ಕೊಯ್ಯ ಗೊಂಬೆಗಳು',
      ml: 'ചന്നപട്ടണ പ്രകൃതിദത്ത മര രാജ-റാണി പാവകൾ',
      mr: 'चन्नपट्टण नैसर्गिक लाकडी राजा-राणी खेळणी संच',
      gu: 'ચન્નાપટણા કુદરતી લાકડાના રાજા-રાણી રમકડાં',
      bn: 'চন্নাপাটনা পরিবেশবান্ধব কাঠের রাজা-রানী পুতুল',
      or: 'ଚନ୍ନପାଟଣା ପ୍ରାକୃତିକ କାଠ ରାଜା-ରାଣୀ ଖେଳଣା',
      pa: 'ਚੰਨਾਪਟਨਾ ਕੁਦਰਤੀ ਲੱਕੜ ਦੇ ਰਾਜਾ-ਰਾਣੀ ਖਿਡੌਣੇ',
      as: 'চন্নাপাটনা প্ৰাকৃতিক কাঠৰ ৰজা-ৰাণীৰ পুতলা',
      kok: 'चन्नपट्टण लाकडाच्यो राजा-राणीच्यो खेळणी',
      ne: 'चन्नापटना प्राकृतिक काठको राजा-रानी खेलौना',
      mni: 'চন্নপত্না উগী নিংথৌ-মহারানী শান্নপোৎ',
      kha: 'Ki Mawbynna Dieng Channapatna Syiem & Syiem Kynthei',
      lus: 'Channapatna Thing Lal leh Lalnu Milem',
      ur: 'چناپٹنہ قدرتی لکڑی کا راجہ رانی روایتی کھلونا سیٹ'
    },
    craftLineage: {
      en: 'Channapatna Toys GI (Geographical Indication No. 23) — Non-toxic organic lacquer wood turning.',
      te: 'చన్నపట్న బొమ్మలు జిఐ (నెం. 23) — పసుపు-కుంకుమ సహజ రంగులతో చెక్కిన పర్యావరణ అనుకూల కొయ్య బొమ్మలు.',
      hi: 'चन्नापटना खिलौने जीआई (सं. 23) — बिना किसी कील या रासायनिक रंग के लकड़ी व लाख से बने सुरक्षित खिलौने।'
    },
    category: CATEGORY_TRANSLATIONS['Woodcraft'],
    story: {
      en: 'Turned on traditional hand-driven wood lathes from sustainably harvested Ivory softwood with organic vegetable dyes. 100% baby-safe and chemical-free.',
      te: 'ఆలె చెక్కతో లేత్ మిషన్లపై చెక్కి, పసుపు, కుంకుమ, ఇండిగో వంటి సహజ కూరగాయల రంగులు మరియు లక్కతో మెరిపించిన చిన్నారులకు ఎంతో సురక్షితమైన బొమ్మలు.',
      hi: 'टीपू सुल्तान द्वारा शुरू की गई 200 वर्ष पुरानी चन्नापटना काष्ठ कला, जो बच्चों के लिए पूरी तरह सुरक्षित और पर्यावरण अनुकूल है।'
    },
    materials: {
      en: ['Aale Mara (Ivory Softwood)', 'Natural Organic Shellac', 'Vegetable Colors (Turmeric, Kumkum, Indigo)', 'Screw-Pine Leaves Polish'],
      te: ['ఆలె చెక్క (ఐవరీ వుడ్)', 'సహజ లక్క జిగురు', 'పసుపు, కుంకుమ, నీలి సహజ రంగులు', 'మొగలి ఆకుల మెరుగు'],
      hi: ['आले मारा (सॉफ्टवुड)', 'प्राकृतिक लाख', 'हल्दी, कुमकुम व नील प्राकृतिक रंग', 'केवड़ा पत्ती पॉलिश']
    }
  },
  'craft-banarasi-brocade': {
    title: {
      en: 'Banaras Royal Katan Silk Brocade Saree with Real Gold Zari Kalga Booti',
      te: 'కాశీ బనారసీ రాయల్ కతాన్ సిల్క్ జరీ బ్రొకేడ్ చీర',
      hi: 'बनारसी शाही कतान सिल्क ब्रोकेड साड़ी स्वर्ण कलगा बूटी',
      ta: 'வாரணாசி பனாரசி அரச கத்தான் பட்டு புடவை',
      kn: 'ವಾರಣಾಸಿ ಬನಾರಸಿ ಕತಾನ್ ಸಿಲ್ಕ್ ಜರಿ ಬ್ರೊಕೇಡ್ ಸೀರೆ',
      ml: 'ബനാറസ് രാജകീയ കത്താൻ സിൽക്ക് ബ്രോക്കേഡ് സാരി',
      mr: 'बनारसी शाही कतान सिल्क ब्रोकेड जरी साडी',
      gu: 'બનારસી શાહી કતાન સિલ્ક બ્રોકેડ સાડી',
      bn: 'বেনারসি রাজকীয় কাতান সিল্ক ব্রোকেড শাড়ি',
      or: 'ବନାରସୀ ଶାହୀ କତାନ ସିଲ୍କ ବ୍ରୋକେଡ ଶାଢ଼ୀ',
      pa: 'ਬਨਾਰਸੀ ਸ਼ਾਹੀ ਕਤਾਨ ਸਿਲਕ ਬ੍ਰੋਕੇਡ ਸਾੜ੍ਹੀ',
      as: 'বাৰাণসী বনৰসী কাতান ছিল্ক ব্ৰকেড শাৰী',
      kok: 'बनारसी कतान सिल्क ब्रोकेड साडी',
      ne: 'बनारसी शाही कतान सिल्क ब्रोकेड सारी',
      mni: 'বেনারসী রয়েল কতান সিল্ক শাড়ী',
      kha: 'Ka Jain Sem Silk Banaras Brocade',
      lus: 'Banaras Katan Silk Brocade Puan',
      ur: 'بنارسی شاہی کتان سلک بروکیڈ زری ساڑھی'
    },
    craftLineage: {
      en: 'Banaras Brocades and Sarees GI (Geographical Indication No. 99) — Extra-weft Kadwa brocade weaving.',
      te: 'కాశీ బనారసీ బ్రొకేడ్ జిఐ (నెం. 99) — శతాబ్దాల పురాతన కడ్వా చేనేత కళా సంప్రదాయం.',
      hi: 'बनारस ब्रोकेड जीआई (सं. 99) — पारंपरिक कड़वा तकनीक से बुनी गई शुद्ध कतान रेशमी जरी साड़ी।'
    },
    category: CATEGORY_TRANSLATIONS['Handloom'],
    story: {
      en: 'Woven on traditional pit-looms in Kashi featuring Kalga floral paisleys in extra-weft Kadwa technique with separate gold thread spools.',
      te: 'కాశీ నేతన్నలు కతాన్ పట్టు మరియు బంగారు జరీతో కడ్వా పద్ధతిలో ఒక్కొక్క బూటీని విడివిడిగా అల్లిన వైభవమైన బనారసీ చీర.',
      hi: 'काशी के बुनकरों द्वारा शुद्ध कतान रेशम और महीन सोने की जरी से बुनी गई यह बनारसी साड़ी अपनी कड़वा तकनीक के लिए अद्वितीय है।'
    },
    materials: {
      en: ['Pure Katan Silk', 'Tested Gold & Silver Electroplated Zari', 'Hand-punched Naksha Pattern Cards'],
      te: ['స్వచ్ఛమైన కతాన్ పట్టు', 'వెండి-బంగారు జరీ దారాలు', 'చేతితో వేసిన నక్షా డిజైన్ కార్డ్స్'],
      hi: ['शुद्ध कतान रेशम', 'सोने-चांदी की जरी', 'नक्शा पैटर्न कार्ड']
    }
  },
  'craft-madhubani-painting': {
    title: {
      en: 'Madhubani Sacred Tree of Life (Kohbar & Matsya) Folk Art',
      te: 'మధుబని పవిత్ర జీవన-వృక్షం జానపద చిత్రకళ',
      hi: 'मधुबनी पवित्र जीवन-वृक्ष (कोहबर एवं मत्स्य) लोक चित्रकला',
      ta: 'மதுபானி புனித வாழ்வின் மரம் பாரம்பரிய ஓவியம்',
      kn: 'ಮಧುಬನಿ ಪವಿತ್ರ ಜೀವನ-ವೃಕ್ಷ ಜಾನಪದ ಚಿತ್ರಕಲೆ',
      ml: 'മധുബനി പവിത്ര ജീവവൃക്ഷ നാടോടി ചിത്രകല',
      mr: 'मधुबनी पवित्र जीवन-वृक्ष पारंपारिक लोककला चित्र',
      gu: 'મધુબની પવિત્ર જીવન-વૃક્ષ લોક ચિત્રકળા',
      bn: 'মধুবনী পবিত্র জীবন-বৃক্ষ লোকচিত্রশিল্প',
      or: 'ମଧୁବନୀ ପବିତ୍ର ଜୀବନ-ବୃକ୍ଷ ଲୋକ କଳା',
      pa: 'ਮਧੂਬਨੀ ਪਵਿੱਤਰ ਜੀਵਨ-ਰੁੱਖ ਲੋਕ ਚਿੱਤਰਕਾਰੀ',
      as: 'মধুবনী পৱিত্ৰ জীৱন-বৃক্ষ লোক চিত্ৰকলা',
      kok: 'मधुबनी पवित्र जीवन-रूख लोकचित्रकला',
      ne: 'मधुबनी पवित्र जीवन-वृक्ष लोक चित्रकला',
      mni: 'মধুবনী লাইনিংথৌ পুন্সি উপাল লাই চিত্র',
      kha: 'Ka Dur Madhubani Dieng Ka Jingim',
      lus: 'Madhubani Nunna Thing Folk Art',
      ur: 'مدھوبنی مقدس درختِ حیات روایتی لوک پینٹنگ'
    },
    craftLineage: {
      en: 'Madhubani Paintings GI (Geographical Indication No. 105) — Ancient Mithila ritual folk art.',
      te: 'మధుబని చిత్రకళ జిఐ (నెం. 105) — ప్రాచీన మిథిలా సాంప్రదాయ సహజ రంగుల జానపద కళ.',
      hi: 'मधुबनी पेंटिंग्स जीआई (सं. 105) — प्राचीन मिथिला लोक चित्रकला परंपरा।'
    },
    category: CATEGORY_TRANSLATIONS['Folk Art'],
    story: {
      en: 'Drawn entirely by hand without sketches using natural bamboo twigs and cotton styluses on cow dung washed handmade paper.',
      te: 'చేతితో చేసిన కాగితంపై వెదురు పుల్లలతో, పసుపు, కాటుక, నీలి వంటి సహజ రంగులతో వేసిన మిథిలా జీవన వృక్షం మరియు చేపల పవిత్ర చిత్రం.',
      hi: 'मिथिला की महिला कलाकारों द्वारा हस्तनिर्मित कागज पर बांस की तीली और प्राकृतिक रंगों से बनाया गया पवित्र कोहबर चित्र।'
    },
    materials: {
      en: ['Cow Dung Treated Handmade Paper', 'Bamboo Nibs (Kalam)', 'Lampblack (Kajal)', 'Natural Indigo & Turmeric Extracts'],
      te: ['చేతితో తయారుచేసిన సహజ కాగితం', 'వెదురు పుల్లల కలం', 'సహజ కాటుక మరియు పసుపు రంగులు'],
      hi: ['हस्तनिर्मित कागज', 'बांस की कलम', 'प्राकृतिक काजल और हल्दी अर्क']
    }
  },
  'craft-aranmula-mirror': {
    title: {
      en: 'Aranmula Front-Reflecting Sacred Metal Mirror in Ornate Brass Frame',
      te: 'ఆరన్ముళ పవిత్ర లోహ దర్పణం (కేరళ విగ్రహ అద్దం)',
      hi: 'आरनमुला कन्नाडी अग्र-परावर्तक पवित्र धातु दर्पण',
      ta: 'ஆரன்முளா புனித உலோகக் கண்ணாடி (கேரளா)',
      kn: 'ಆರನ್ಮುಳ ಪವಿತ್ರ ಲೋಹದ ಕನ್ನಡಿ (ಕೇರಳ)',
      ml: 'ആറന്മുള പവിത്ര ലോഹ കണ്ണാടി (കേരളം)',
      mr: 'आरनमुला पवित्र धातूचा आरसा (केरळ)',
      gu: 'આરનમુલા પવિત્ર ધાતુ અરીસો (કેરળ)',
      bn: 'আরনমুলা পবিত্র ধাতু নির্মিত দর্পণ (কেরালা)',
      or: 'ଆରନମୁଲା ପବିତ୍ର ଧାତୁ ଦର୍ପଣ (କେରଳ)',
      pa: 'ਆਰਨਮੁਲਾ ਪਵਿੱਤਰ ਧਾਤੂ ਦਾ ਸ਼ੀਸ਼ਾ (ਕੇਰਲ)',
      as: 'আৰনমুলা পৱিত্ৰ ধাতুৰ দাপোণ (কেৰেলা)',
      kok: 'आरनमुला पवित्र धातूचो आरसो (केरळ)',
      ne: 'आरनमुला पवित्र धातुको ऐना (केरला)',
      mni: 'আরনমুলা য়াম্না শেংলবা য়োৎকী মীতম্না শাবা য়ারিশাং',
      kha: 'Ka It Rnong Aranmula Kerala',
      lus: 'Aranmula Thir Darlawn (Kerala)',
      ur: 'آرنمولا کنّادی مقدس دھاتی آئینہ (کیرالہ)'
    },
    craftLineage: {
      en: 'Aranmula Kannadi GI (Geographical Indication No. 8) — 500-year-old secret alloy speculum casting without glass.',
      te: 'ఆరన్ముళ కన్నాడి జిఐ (నెం. 8) — గాజు లేకుండా రాగి-తగరం లోహాల మిశ్రమంతో చేసే 500 ఏళ్ల అరుదైన అద్దం.',
      hi: 'आरनमुला कन्नाडी जीआई (सं. 8) — 500 वर्ष पुराना बिना कांच का धातु दर्पण।'
    },
    category: CATEGORY_TRANSLATIONS['Metalcraft'],
    story: {
      en: 'A metallurgical marvel of Kerala cast from a proprietary copper-tin alloy without any glass coating, reflecting directly from the front surface with 100% distortion-free clarity.',
      te: 'కేరళ సంప్రదాయ లోహ విజ్ఞాన అద్భుతం. గాజు ఉపయోగించకుండా రాగి, తగరం మిశ్రమాన్ని వారాలపాటు పాలిష్ చేసి నేరుగా ప్రతిబింబించేలా చేసే పవిత్ర అద్దం.',
      hi: 'केरल का 500 वर्ष पुराना धातु विज्ञान का चमत्कार जिसमें कांच का उपयोग नहीं होता।'
    },
    materials: {
      en: ['Secret Copper & Tin Speculum Alloy', 'Paddy Husk Ash Buffing Compound', 'Cast Brass Ornate Frame'],
      te: ['రాగి మరియు తగరం లోహ మిశ్రమం', 'వరి ఊక బూడిద మెరుగు', 'ఇత్తడి అలంకార ఫ్రేమ్'],
      hi: ['तांबा और रांगा मिश्र धातु', 'धान की भूसी का राख पॉलिश', 'पीतल का अलंकृत फ्रेम']
    }
  }
};

/**
 * Universal Craft Title Translation Helper
 * Invariant: If selected language translation exists, return it.
 * Fallback: Uniformly to English or Hindi — NEVER random unrelated scripts.
 */
export function getCraftTitle(craft: CraftItem, lang: string): string {
  const code = (lang || 'en') as LanguageCode;

  // 1. Direct titleTranslations on craft object
  if (craft.titleTranslations?.[code]) {
    return craft.titleTranslations[code]!;
  }

  // 2. Global verified dictionary
  const entry = CRAFT_TRANSLATIONS[craft.id];
  if (entry?.title?.[code]) {
    return entry.title[code]!;
  }

  // 3. Fallbacks according to target language
  if (code === 'hi') {
    return craft.hindiTitle || entry?.title?.['hi'] || craft.title;
  }
  if (code === 'te' && entry?.title?.['te']) {
    return entry.title['te']!;
  }

  // 4. Uniform fallback to English title
  return entry?.title?.['en'] || craft.title || 'Handmade Craft';
}

/**
 * Universal Craft Category Translation Helper
 */
export function getCraftCategoryLabel(category: string, lang: string): string {
  const code = (lang || 'en') as LanguageCode;
  const entry = CATEGORY_TRANSLATIONS[category];
  if (entry?.[code]) {
    return entry[code]!;
  }
  if (entry?.['en']) {
    return entry['en']!;
  }
  return category;
}

/**
 * Universal Craft Lineage Translation Helper
 */
export function getCraftLineage(craft: CraftItem, lang: string): string {
  const code = (lang || 'en') as LanguageCode;
  if (craft.craftLineageTranslations?.[code]) {
    return craft.craftLineageTranslations[code]!;
  }
  const entry = CRAFT_TRANSLATIONS[craft.id];
  if (entry?.craftLineage?.[code]) {
    return entry.craftLineage[code]!;
  }
  if (code === 'hi' && entry?.craftLineage?.['hi']) {
    return entry.craftLineage['hi']!;
  }
  if (code === 'te' && entry?.craftLineage?.['te']) {
    return entry.craftLineage['te']!;
  }
  return craft.craftLineage || entry?.craftLineage?.['en'] || 'Handmade Heritage Craft';
}

/**
 * Universal Craft Heritage Story Translation Helper
 */
export function getCraftStory(craft: CraftItem, lang: string): string {
  const code = (lang || 'en') as LanguageCode;
  if (craft.storyTranslations?.[code]) {
    return craft.storyTranslations[code]!;
  }
  const entry = CRAFT_TRANSLATIONS[craft.id];
  if (entry?.story?.[code]) {
    return entry.story[code]!;
  }
  if (code === 'hi') {
    return craft.hindiStory || entry?.story?.['hi'] || craft.heritageStory;
  }
  if (code === 'te') {
    return entry?.story?.['te'] || craft.heritageStory;
  }
  return craft.heritageStory || entry?.story?.['en'] || '';
}

/**
 * Universal Craft Materials Translation Helper
 */
export function getCraftMaterials(craft: CraftItem, lang: string): string[] {
  const code = (lang || 'en') as LanguageCode;
  if (craft.materialsTranslations?.[code]) {
    return craft.materialsTranslations[code]!;
  }
  const entry = CRAFT_TRANSLATIONS[craft.id];
  if (entry?.materials?.[code]) {
    return entry.materials[code]!;
  }
  if (code === 'hi' && entry?.materials?.['hi']) {
    return entry.materials['hi']!;
  }
  if (code === 'te' && entry?.materials?.['te']) {
    return entry.materials['te']!;
  }
  return craft.materialsDetected || entry?.materials?.['en'] || ['Natural Raw Materials'];
}
