import { Bank, DocumentInfo, Holiday, Offer, FAQ } from './types';

export const TRANSLATIONS = {
  en: {
    // Nav & General
    brandName: "BankCare Portal",
    brandSub: "Government of India Banking Portal",
    home: "Home",
    documents: "Documents",
    banks: "Banks",
    tokenBooking: "Token Booking",
    holidays: "Holidays",
    offers: "Offers & Schemes",
    aiAssistant: "AI Assistant",
    contact: "Contact Us",
    dashboard: "Dashboard",
    language: "Language",
    searchPlaceholder: "Search services, banks, documents, or timings...",
    searchButton: "Search",
    quickActions: "Quick Actions",
    allRightsReserved: "All rights reserved. BankCare Portal © 2026.",
    portalDisclaimer: "Disclaimer: This is a secure information aggregator & customer assistance portal. All banking transactions are secured on respective official banking servers.",

    // Dashboard & Theme
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    welcomeBack: "Welcome back, User!",
    viewSavedTrans: "Track and manage your generated branch appointment tokens and document checklists below.",
    savedTokens: "Your Booked Tokens",
    savedChecklists: "My Custom Checklists",
    noTokensYet: "You haven't booked any tokens yet.",
    noChecklistsYet: "No custom checklists created yet. Head to Documents Center to generate one!",

    // Home Hero & Stats
    heroTitle: "Simplifying Banking Information for Every Citizen",
    heroDesc: "One-stop destination for all major Indian banks. Verify required documents, generate local queue tokens, locate official websites, track public holidays, and ask our AI Assistant in Telugu or English.",
    applyPan: "Apply PAN Card",
    applyAadhaar: "Enroll Aadhaar",
    openAccount: "Open Bank Account",
    applyAtm: "Apply ATM Card",
    updateMobile: "Update Mobile Number",
    linkUpi: "Link UPI / GPay / PhonePe",
    pinGeneration: "ATM PIN Generation",
    actionBookToken: "Book Branch Token",
    
    statBanks: "12+ Supported Banks",
    statVisitors: "50,000+ Daily Visitors",
    statTokens: "10,000+ Tokens Issued",
    statSatis: "99.4% Customer Satisfaction",

    // Features Section
    featureTitle: "Engineered for Convenience",
    featureSub: "Explore tools designed to eliminate queues and simplify official documentation.",
    feature1Title: "Comprehensive Document Guidance",
    feature1Desc: "Instantly check absolute proof criteria needed for Aadhaar, PAN, and KYC account openings.",
    feature2Title: "Digital Token Booking",
    feature2Desc: "Skip long lines. Book safe appointment slots at nearest branches and receive instant visual QR codes.",
    feature3Title: "Smart AI Banking Clerk",
    feature3Desc: "Chat naturally in Telugu or English. Get contextual feedback on interest rates, timings, and procedures.",
    feature4Title: "Bilingual Translation Engine",
    feature4Desc: "Entire application supports high-accuracy translations into native Telugu and English.",

    // Documents Center
    docCenterTitle: "Documents Required & Checklist Generator",
    docCenterDesc: "Select a service below to see exact identity, address, and age proofs required. Tick the files you have to generate a custom checklist you can download as PDF.",
    filterByCategory: "All Categories",
    categoryIdentity: "Identity Proofs",
    categoryAddress: "Address Proofs",
    categoryBanking: "Banking Updates",
    generatedChecklistHeader: "My Document Verification Checklist",
    generatePdfBtn: "Save Checklist / Print Details",
    checklistCheckAlert: "You have verified {count} of {total} required documents.",
    ocrSimulatorTitle: "Virtual OCR Document Scan Check",
    ocrSimulatorDesc: "Need to verify if your Aadhaar or PAN card holds valid information? Use this local simulated scanner to check documents in real-time.",
    ocrScanPlaceholder: "Drop image or Click to scan card",
    ocrScanButton: "Perform Local Scan Verification",
    ocrResultSuccess: "OCR Scan Complete: Document identified as authentic. Ready for banking submissions.",

    // Bank Directory Page
    bankDirTitle: "Official Indian Bank Directory",
    bankDirDesc: "Get direct support helpline numbers, working hours, branch locators, and search IFSC codes.",
    searchBank: "Search banks by name...",
    ifscSearchTitle: "Select Bank & Find Branch IFSC Code",
    selectBankPrompt: "Select Bank",
    selectBranchPrompt: "Select Branch",
    ifscResult: "Branch IFSC Code:",
    workingHoursLabel: "Working Hours",
    customerCareLabel: "Customer Care Helpline",
    officialWebsiteLabel: "Visit Official Website",
    branchLocatorLabel: "Branch Locator Map",

    // Token Booking System
    tokenTitle: "Online Branch Queue Token Booking",
    tokenDesc: "Secure a virtual queue number beforehand. Arrive at the branch during your selected slot and visit the counter without waiting.",
    fullNameLabel: "Full Name",
    mobileLabel: "Mobile Number",
    emailLabel: "Email Address",
    selectBank: "Select Bank",
    selectBranch: "Select Branch",
    selectService: "Select Service Type",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time Slot",
    bookTokenBtn: "Generate Official Node Token",
    liveQueueStatus: "Live Queue Status Track",
    activeTokenNumber: "Active Token No:",
    posInQueue: "Estimated Position in Queue:",
    tokenIssuedAt: "Issued for Node ID:",
    tokenSecurityNote: "Present this dynamic QR code and token details at the branch entrance counter.",
    smsAlertSim: "Mobile SMS Alert Simulated Successfully",
    emailAlertSim: "Secure Email Confirmation Dispatched",

    // Holidays Page
    holidaysTitle: "Public & Banking Holidays Calendar 2026",
    holidaysDesc: "Check official bank holidays mandated by the Reserve Bank of India (RBI). Filter holidays by your specific state or month.",
    filterState: "All States / National",
    filterMonth: "All Months",
    holidayTypeNational: "National Holidays",
    holidayTypeState: "State-wise Holidays",
    holidayTypeRbi: "RBI Mandates",
    holidayTypeFestival: "Festival Celebrations",
    calendarViewTitle: "List & Calendar Timeline for 2026",

    // Offers & Schemes Page
    offersTitle: "Premium Deals, FD Rates & Government Schemes",
    offersDesc: "Discover high-yield Fixed Deposits, special loan schemes, reward credit cards, and empowering government financial campaigns.",
    categoryAll: "All Schemes",
    categoryFd: "Fixed Deposit Offers",
    categorySavings: "Savings Accounts",
    categoryCard: "Credit Card Offers",
    categoryLoan: "Loan Offers",
    categoryScheme: "Government Campaigns",
    applyNowBtn: "Inquire Procedures",

    // Contact Page
    contactTitle: "Get in Touch with unified Support",
    contactDesc: "Have questions about the centralized portal or feedback on banking integrations? Disptach a ticket below.",
    messageLabel: "Message Description",
    sendMessageBtn: "Submit Public Ticket",
    hqDetails: "Central Directorate Office",
    hqAddress: "State Bank Bhavan, Corporate Headquarters, Nariman Point, Mumbai, Maharashtra 400021",
    hqTimings: "Timings: Mon - Fri (10:00 AM - 5:00 PM)",
    feedbackHeader: "Alternative Citizen Feedback",

    // AI assistant
    aiHeading: "AI Banking Assistant - Chatbot",
    aiSub: "Powered by Gemini AI, communicating with you in English & Telugu. Ask anything about document guidelines, token nodes, or banking policies.",
    micNotSupported: "Voice input with Web Speech API is not supported in this frame or browser.",
    micListening: "Voice Input Active. Listening carefully...",
    micIdle: "Click Mic for Voice Query",
    suggestedQueries: "Suggested Queries:",
    suggestedQ1: "What documents are needed for PAN?",
    suggestedQ2: "How can I update my Aadhaar details?",
    suggestedQ3: "How do I change my registered mobile number?",
    suggestedQ4: "State Bank of India timings and IFSC format?",
  },
  te: {
    // Nav & General
    brandName: "బ్యాంక్‌కేర్ పోర్టల్",
    brandSub: "భారత ప్రభుత్వ బ్యాంకింగ్ సమాచార పోర్టల్",
    home: "హోమ్ పేజీ",
    documents: "పత్రాలు (డాక్యుమెంట్లు)",
    banks: "బ్యాంకులు",
    tokenBooking: "టోకెన్ బుకింగ్",
    holidays: "బ్యాంక్ సెలవులు",
    offers: "ఆఫర్స్ & పథకాలు",
    aiAssistant: "AI అసిస్టెంట్",
    contact: "సంప్రదించండి",
    dashboard: "డాష్‌బోర్డ్",
    language: "భాష",
    searchPlaceholder: "సేవలు, బ్యాంకులు, అవసరమైన పత్రాలను శోధించండి...",
    searchButton: "శోధన",
    quickActions: "త్వరిత సేవలు",
    allRightsReserved: "అన్ని హక్కులూ ప్రత్యేకించబడినవి. బ్యాంక్‌కేర్ పోర్టల్ © 2026.",
    portalDisclaimer: "గమనిక: ఇది సురక్షితమైన సమాచార పోర్టల్ మాత్రమే. అన్ని లావాదేవీలు ఆయా అధికారిక బ్యాంకింగ్ సర్వర్‌లలోనే సురక్షితంగా నిర్వహించబడతాయి.",

    // Dashboard & Theme
    themeDark: "డార్క్ మోడ్",
    themeLight: "లైట్ మోడ్",
    welcomeBack: "స్వాగతం, యూజర్!",
    viewSavedTrans: "మీరు సేవ్ చేసిన టోకెన్లు మరియు నిర్ధారణ పత్రాలను ఇక్కడ సులభంగా నిర్వహించండి.",
    savedTokens: "మీరు బుక్ చేసిన టోకెన్లు",
    savedChecklists: "నా పత్రాల జాబితా (చెక్ లిస్ట్స్)",
    noTokensYet: "మీరు ఇంకా ఎటువంటి టోకెన్లు బుక్ చేయలేదు.",
    noChecklistsYet: "ఏదైనా పత్రాల జాబితాను డౌన్‌లోడ్ చేయడానికి 'పత్రాలు' విభాగంలో చెక్ లిస్ట్ సృష్టించండి.",

    // Home Hero & Stats
    heroTitle: "భారతీయ పౌరులందరికీ బ్యాంకింగ్ సులభతరం",
    heroDesc: "దేశంలోని అన్ని ప్రముఖ బ్యాంకుల సమాచారం ఒకే చోట. అవసరమైన పత్రాలను తనిఖీ చేయండి, క్యూలో నిలబడకుండా ఆన్‌లైన్ టోకెన్ బుక్ చేయండి, తెలుగు లేదా ఇంగ్లీష్ భాషలలో AI సహాయం పొందండి.",
    applyPan: "కొత్త పాన్ కార్డ్ దరఖాస్తు",
    applyAadhaar: "ఆధార్ నమోదు / ఎన్‌రోల్‌మెంట్",
    openAccount: "బ్యాంక్ ఖాతా తెరవడం",
    applyAtm: "ఏటీఎం కార్డ్ దరఖాస్తు",
    updateMobile: "మొబైల్ నంబర్ అప్‌డేట్",
    linkUpi: "upi / ఫోన్‌పే లింకింగ్",
    pinGeneration: "ఏటీఎం పిన్ జనరేషన్",
    actionBookToken: "బ్రాంచ్ టోకెన్ బుకింగ్",
    
    statBanks: "12+ మద్దతు బ్యాంకులు",
    statVisitors: "50,000+ రోజువారీ సందర్శకులు",
    statTokens: "10,000+ జారీ చేసిన టోకెన్లు",
    statSatis: "99.4% కస్టమర్ సంతృప్తి",

    // Features Section
    featureTitle: "మీ సౌకర్యమే మా ప్రాధాన్యత",
    featureSub: "క్యూ లైన్లను నివారించడానికి మరియు పత్రాల క్లిష్టతను తగ్గించడానికి రూపొందించిన సాధనాలు.",
    feature1Title: "సమగ్ర పత్రాల మార్గదర్శి",
    feature1Desc: "ఆధార్, పాన్ కార్డ్ మరియు కేవైసీ అకౌంట్ ఓపెనింగ్స్ కోసం అవసరమైన ఖచ్చితమైన గుర్తింపు పత్రాలను సరిచూసుకోండి.",
    feature2Title: "డిజిటల్ టోకెన్ బుకింగ్",
    feature2Desc: "ఎక్కువ సమయం క్యూలో నిలబడకుండా, సమీప బ్రాంచ్‌లో మీకు కావలసిన సమయ స్లాట్‌ను ముందే రిజర్వ్ చేసుకోండి.",
    feature3Title: "స్మార్ట్ AI బ్యాంకింగ్ క్లర్క్",
    feature3Desc: "తెలుగు లేదా ఇంగ్లీషులో సంభాషణ జరపండి. వడ్డీ రేట్లు, సెలవులు మరియు దరఖాస్తుల వివరాలను అడగండి.",
    feature4Title: "ద్విభాషా అనువాదం",
    feature4Desc: "ఈ అప్లికేషన్ పూర్తిగా తెలుగు మరియు ఇంగ్లీష్ భాషలలో సమాచారాన్ని అందిస్తుంది.",

    // Documents Center
    docCenterTitle: "అవసరమైన పత్రాలు & చెక్ లిస్ట్స్",
    docCenterDesc: "దయచేసి ఒక సర్వీసును ఎంచుకుని, అవసరమైన ప్రూఫ్‌లను చూడండి. మీ వద్ద ఉన్న పత్రాలను టిక్ చేసి కస్టమ్ చెక్‌లిస్ట్‌ను డౌన్‌లోడ్ చేయండి.",
    filterByCategory: "అన్ని రకాలు",
    categoryIdentity: "ఐడెంటిటీ ప్రూఫ్స్",
    categoryAddress: "అడ్రస్ ప్రూఫ్స్",
    categoryBanking: "బ్యాంక్ అప్‌డేట్స్",
    generatedChecklistHeader: "నా సరిచూసిన పత్రాల జాబితా",
    generatePdfBtn: "చెక్ లిస్ట్ సేవ్ చేయండి (PDF / ప్రింట్)",
    checklistCheckAlert: "మీరు మొత్తం {total} పత్రాలలో {count} పత్రాలను ధృవీకరించారు.",
    ocrSimulatorTitle: "వర్చువల్ OCR డాక్యుమెంట్ స్కానర్",
    ocrSimulatorDesc: "మీ ఆధార్ లేదా పాన్ వివరాలు సరైనవా కాదా అని సరిచూసుకోవాలా? మా ఉచిత ప్రాథమిక స్కానర్ సిమ్యులేటర్ ఉపయోగించండి.",
    ocrScanPlaceholder: "ఇమేజ్‌ని ఇక్కడ డ్రాప్ చేయండి లేదా క్లిక్ చేసి అప్‌లోడ్ చేయండి",
    ocrScanButton: "స్థానిక స్కాన్ పరిశీలన చేయండి",
    ocrResultSuccess: "OCR లోడ్ పూర్తయింది: సమర్పించిన పత్రం అసలైనదిగా నిర్ధారించబడింది. బ్యాంకింగ్ సేవలకు సిద్ధంగా ఉంది.",

    // Bank Directory Page
    bankDirTitle: "అధికారిక భారతీయ బ్యాంకుల డైరెక్టరీ",
    bankDirDesc: "ప్రతి ఒక్క బ్యాంకు హెల్ప్‌లైన్ నెంబర్లు, పని వేళలు, బ్రాంచ్ గుర్తింపు సర్వీసులు మరియు ఐఎఫ్‌ఎస్‌సీ (IFSC) కోడ్‌ల వివరాలు.",
    searchBank: "బ్యాంకు పేరుతో శోధించండి...",
    ifscSearchTitle: "బ్యాంక్ & బ్రాంచ్ ఐఎఫ్‌ఎస్‌సీ శోధన",
    selectBankPrompt: "బ్యాంకును ఎంచుకోండి",
    selectBranchPrompt: "బ్రాంచ్‌ను ఎంచుకోండి",
    ifscResult: "బ్రాంచ్ IFSC కోడ్:",
    workingHoursLabel: "పని వేళలు / టైమింగ్స్",
    customerCareLabel: "కస్టమర్ కేర్ హెల్ప్‌లైన్",
    officialWebsiteLabel: "అధికారిక వెబ్‌సైట్",
    branchLocatorLabel: "బ్రాంచ్ గుర్తింపు మ్యాప్",

    // Token Booking System
    tokenTitle: "ఆన్‌లైన్ బ్రాంచ్ క్యూ టోకెన్ బుకింగ్",
    tokenDesc: "డిజిటల్ టోకెన్ నంబర్ పొందడం ద్వారా క్యూలో నిలబడకుండా ముందే అపాయింట్‌మెంట్ ఖాయం చేసుకోండి.",
    fullNameLabel: "పూర్తి పేరు",
    mobileLabel: "మొబైల్ సంఖ్య",
    emailLabel: "ఈమెయిల్ ఐడి",
    selectBank: "బ్యాంకును ఎంచుకోండి",
    selectBranch: "బ్రాంచ్‌ను ఎంచుకోండి",
    selectService: "బ్యాంకింగ్ సేవను ఎంచుకోండి",
    preferredDate: "కావలసిన తేదీ",
    preferredTime: "అనుకూల సమయం (స్లాట్)",
    bookTokenBtn: "అధికారిక క్యూ టోకెన్ సృష్టించండి",
    liveQueueStatus: "లైవ్ క్యూ పరిస్థితి",
    activeTokenNumber: "యాక్టివ్ టోకెన్ నంబర్:",
    posInQueue: "మీ అంచనా క్యూ స్థానం:",
    tokenIssuedAt: "టోకెన్ జారీ చేయబడిన సమయం:",
    tokenSecurityNote: "దయచేసి ఈ క్యూఆర్ (QR) కోడ్‌ను మీ బ్రాంచ్ ప్రవేశ ద్వారం వద్ద కౌంటర్‌లో చూపగలరు.",
    smsAlertSim: "మొబైల్ SMS అలర్ట్ విజయవంతంగా పంపబడింది",
    emailAlertSim: "సురక్షిత ఈమెయిల్ నిర్ధారణ పంపబడింది",

    // Holidays Page
    holidaysTitle: "ప్రభుత్వ మరియు బ్యాంకింగ్ శలవుల జాబితా 2026",
    holidaysDesc: "భారతీయ రిజర్వ్ బ్యాంక్ (RBI) నిర్దేశించిన అధికారిక సెలవులు. మీ రాష్ట్రం లేదా నెల ప్రకారం సెలవులను ఫిల్టర్ చేయండి.",
    filterState: "అన్ని రాష్ట్రాలు / నేషనల్",
    filterMonth: "అన్ని నెలలు",
    holidayTypeNational: "జాతీయ సెలవులు",
    holidayTypeState: "రాష్ట్ర ప్రభుత్వ సెలవులు",
    holidayTypeRbi: "రిజర్వ్ బ్యాంక్ సెలవులు",
    holidayTypeFestival: "పండుగ శలవులు",
    calendarViewTitle: "సెలవుల క్యాలెండర్ టైమ్‌లైన్ 2026",

    // Offers & Schemes Page
    offersTitle: "ప్రత్యేక ఆఫర్లు, ఏఫ్‌డీ (FD) రేట్లు & ప్రభుత్వ పథకాలు",
    offersDesc: "ఎక్కువ వడ్డీని ఇచ్చే ఫిక్సెడ్ డిపాజిట్లు, కారు మరియు ఇళ్ల రుణాలపై ఆఫర్లు, కస్టమర్ క్రెడిట్ కార్డులు మరియు ఆర్థిక పథకాలు.",
    categoryAll: "అన్ని రకాలు",
    categoryFd: "ఫిక్సెడ్ డిపాజిట్ రేట్లు (FD)",
    categorySavings: "సేవింగ్స్ అకౌంట్ వివరాలు",
    categoryCard: "క్రెడిట్ కార్డ్ ఆఫర్లు",
    categoryLoan: "లోన్ ఆఫర్లు (రుణాలు)",
    categoryScheme: "కేంద్ర / ప్రభుత్వ పథకాలు",
    applyNowBtn: "అప్లికేషన్ ప్రక్రియ తెలుసుకోండి",

    // Contact Page
    contactTitle: "మమ్మల్ని సంప్రదించండి",
    contactDesc: "మీకు సేవలకు సంబంధించిన ఏదైనా సమస్య లేదా మా వెబ్‌సైట్‌పై అభిప్రాయం ఉంటే క్రింది ఫారమ్ ద్వారా సమర్పించండి.",
    messageLabel: "సందేశ వివరణ",
    sendMessageBtn: "సందేశాన్ని పంపండి",
    hqDetails: "కేంద్ర కార్యాలయం",
    hqAddress: "స్టేట్ బ్యాంక్ భవన్, కార్పొరేట్ హెడ్‌క్వార్టర్స్, నారిమన్ పాయింట్, ముంబై, మహారాష్ట్ర 400021",
    hqTimings: "పనివేళలు: సోమవారం - శుక్రవారం (ఉదయం 10:00 నుండి సాయంత్రం 5:00 వరకు)",
    feedbackHeader: "పౌరుల సాధారణ అభిప్రాయాలు",

    // AI assistant
    aiHeading: "AI బ్యాంకింగ్ అసిస్టెంట్ (చాట్‌బాట్)",
    aiSub: "జెమినీ AI సాంకేతికతతో ఇంగ్లీషు మరియు తెలుగు సమర్ధవంతంగా అర్థం చేసుకుంటుంది. బ్యాంక్ పత్రాలు, టైమింగ్స్ మరియు సెలవుల సమాచారం అడగండి.",
    micNotSupported: "మీ బ్రౌజర్ లేదా ఈ ఫ్రేమ్‌లో మైక్ ద్వారా వాయిస్ ఇన్పుట్ సదుపాయం లభించడం లేదు.",
    micListening: "వాయిస్ స్వీకరిస్తుంది. మాట్లాడండి...",
    micIdle: "వాయిస్ ద్వారా అడగడానికి మైక్‌ పై క్లిక్ చేయండి",
    suggestedQueries: "తరచుగా అడిగే ప్రశ్నలు:",
    suggestedQ1: "పాన్ కార్డ్ కొరకు ఏ పత్రాలు కావాలి?",
    suggestedQ2: "నా ఆధార్ వివరాలను ఎలా అప్‌డేట్ చేయాలి?",
    suggestedQ3: "రిజిస్టర్డ్ మొబైల్ నంబర్‌ను ఎలా మార్చాలి?",
    suggestedQ4: "స్టేట్ బ్యాంక్ అఫ్ ఇండియా పనివేళలు ఏమిటి?",
  }
};

export const BANKS: Bank[] = [
  {
    id: "sbi",
    name: "State Bank of India",
    teluguName: "స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా",
    logo: "🏛️",
    workingHours: "10:00 AM - 04:00 PM (2nd & 4th Saturdays closed)",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 04:00 వరకు (2వ & 4వ శనివారాలు సెలవు)",
    customerCare: "1800-425-3800 / 1800-11-2211 (Toll-free)",
    email: "customercare@sbi.co.in",
    website: "https://www.sbi.co.in",
    branchLocatorUrl: "https://bank.sbi/web/personal-banking/branch-locator",
    ifscPrefix: "SBIN"
  },
  {
    id: "apgvb",
    name: "Andhra Pragathi Grameena Vikas Bank",
    teluguName: "ఆంధ్ర ప్రగతి గ్రామీణ వికాస్ బ్యాంక్",
    logo: "🌾",
    workingHours: "10:00 AM - 05:00 PM (2nd & 4th Saturdays closed)",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 05:00 వరకు (2వ & 4వ శనివారాలు సెలవు)",
    customerCare: "1800-425-2045 (Toll-free)",
    email: "apgvbap@apgbank.co.in",
    website: "https://www.apgbank.in",
    branchLocatorUrl: "https://www.apgbank.in/branch-locator",
    ifscPrefix: "APGB"
  },
  {
    id: "union",
    name: "Union Bank of India",
    teluguName: "యూనియన్ బ్యాంక్ ఆఫ్ ఇండియా",
    logo: "🤝",
    workingHours: "10:00 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1800-22-2244 / 1800-208-2244",
    email: "customercare@unionbankofindia.bank",
    website: "https://www.unionbankofindia.co.in",
    branchLocatorUrl: "https://www.unionbankofindia.co.in/english/branch-locator.aspx",
    ifscPrefix: "UBIN"
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    teluguName: "కోటక్ మహీంద్రా బ్యాంక్",
    logo: "🔴",
    workingHours: "09:30 AM - 04:30 PM",
    workingHoursTelugu: "ఉదయం 09:30 నుండి సాయంత్రం 04:30 వరకు",
    customerCare: "1860-266-2666",
    email: "service.bank@kotak.com",
    website: "https://www.kotak.com",
    branchLocatorUrl: "https://www.kotak.com/en/find-us.html",
    ifscPrefix: "KKBK"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    teluguName: "హెచ్‌డీఎఫ్‌సీ బ్యాంక్",
    logo: "🔷",
    workingHours: "09:30 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 09:30 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1800-202-6161 / 1860-267-6161",
    email: "support@hdfcbank.com",
    website: "https://www.hdfcbank.com",
    branchLocatorUrl: "https://www.hdfcbank.com/personal/find-your-nearest-branch-or-atm",
    ifscPrefix: "HDFC"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    teluguName: "ఐసీఐసీఐ బ్యాంక్",
    logo: "🔸",
    workingHours: "09:30 AM - 04:30 PM",
    workingHoursTelugu: "ఉదయం 09:30 నుండి సాయంత్రం 04:30 వరకు",
    customerCare: "1800-1080 (Toll-free)",
    email: "nri@icicibank.com",
    website: "https://www.icicibank.com",
    branchLocatorUrl: "https://maps.icicibank.com",
    ifscPrefix: "ICIC"
  },
  {
    id: "axis",
    name: "Axis Bank",
    teluguName: "యాక్సిస్ బ్యాంక్",
    logo: "📐",
    workingHours: "09:30 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 09:30 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1860-419-5555 / 1860-500-5555",
    email: "nodal.officer@axisbank.com",
    website: "https://www.axisbank.com",
    branchLocatorUrl: "https://branch.axisbank.com",
    ifscPrefix: "UTIB"
  },
  {
    id: "canara",
    name: "Canara Bank",
    teluguName: "కెనరా బ్యాంక్",
    logo: "💎",
    workingHours: "10:00 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1800-425-0018 (Toll-free)",
    email: "hodgm@canarabank.com",
    website: "https://canarabank.com",
    branchLocatorUrl: "https://canarabank.com/how-can-we-help-you/branchatm-locator",
    ifscPrefix: "CNRB"
  },
  {
    id: "pnb",
    name: "Punjab National Bank",
    teluguName: "పంజాబ్ నేషనల్ బ్యాంక్",
    logo: "🌞",
    workingHours: "10:00 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1800-180-2222 / 1800-103-2222",
    email: "care@pnb.co.in",
    website: "https://www.pnbindia.in",
    branchLocatorUrl: "https://www.pnbindia.in/branch-locator.html",
    ifscPrefix: "PUNB"
  },
  {
    id: "indian",
    name: "Indian Bank",
    teluguName: "ఇండియన్ బ్యాంక్",
    logo: "🔔",
    workingHours: "10:00 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1800-425-00-000",
    email: "crmdept@indianbank.co.in",
    website: "https://www.indianbank.in",
    branchLocatorUrl: "https://www.indianbank.in/branch-atms-finder",
    ifscPrefix: "IDIB"
  },
  {
    id: "baroda",
    name: "Bank of Baroda",
    teluguName: "బ్యాంక్ ఆఫ్ బరోడా",
    logo: "🟠",
    workingHours: "10:00 AM - 04:00 PM",
    workingHoursTelugu: "ఉదయం 10:00 నుండి సాయంత్రం 04:00 వరకు",
    customerCare: "1800-258-4455 / 1800-102-4455",
    email: "cs.corporate@bankofbaroda.co.in",
    website: "https://www.bankofbaroda.in",
    branchLocatorUrl: "https://www.bankofbaroda.in/locate-us/branches",
    ifscPrefix: "BARB"
  }
];

export const DOCUMENTS: DocumentInfo[] = [
  {
    id: "pan-apply",
    title: "PAN Card Application",
    titleTelugu: "కొత్త పాన్ కార్డ్ దరఖాస్తు",
    category: "identity",
    description: "Required when applying for a permanent account number for standard taxation and opening active savings portals.",
    descriptionTelugu: "పన్నులు చెల్లించడానికి మరియు కొత్త ఖాతాలను తెరవడానికి శాశ్వత ఖాతా సంఖ్య (PAN) పొందవలసి వచ్చినప్పుడు అవసరమవుతుంది.",
    requirements: [
      "Aadhaar Card (Serves as Identity, Address & Age Proof)",
      "Two Recent Color Passport Size Photos (With white/clear background)",
      "Active Mobile Number (For receiving crucial NSDL updates and OTP)",
      "Valid Address Proof (Passport, Driving License, Voter Card if Aadhaar is unavailable)"
    ],
    requirementsTelugu: [
      "ఆధార్ కార్డ్ (గుర్తింపు, అడ్రస్ మరియు జన్మదిన ధృవీకరణగా ఉపయోగపడుతుంది)",
      "రెండు ఇటీవలి రంగు పాస్‌పోర్ట్ ఫోటోలు (తెల్లటి బ్యాక్‌గ్రౌండ్ ఉండాలి)",
      "యాక్టివ్ మొబైల్ సంఖ్య (NSDL అలర్టులు మరియు OTP ల కొరకు)",
      "చెల్లుబాటు అయ్యే అడ్రస్ ప్రూఫ్ (ఆధార్ లేకపోతే పాస్‌పోర్ట్, డ్రైవింగ్ లైసెన్స్, ఓటర్ ఐడీ)"
    ]
  },
  {
    id: "pan-update",
    title: "PAN Card Detail Update",
    titleTelugu: "పాన్ కార్డ్ సవరణలు (అప్‌డేట్)",
    category: "identity",
    description: "Needed when changing spelling mistakes, birth dates, signatures, or parent names on existing cards.",
    descriptionTelugu: "పాన్ కార్డులో తప్పులున్న పేరు స్పెల్లింగ్, పుట్టిన తేదీ, సంతకం లేదా తండ్రి పేరు మార్చుకోవడానికి అవసరమైనది.",
    requirements: [
      "Existing PAN Card Copy / Copy of Allotment Letter",
      "Aadhaar Card with matching name/date configuration",
      "Official Gazette Notification or Marriage Certificate (for name correction post-marriage)",
      "Updated Address Document Supporting Proof (Electricity Bill, Bank Statement)"
    ],
    requirementsTelugu: [
      "ప్రస్తుత పాన్ కార్డ్ కాపీ / అలాట్‌మెంట్ లెటర్ కాపీ",
      "పేరు మరియు పుట్టినతేదీ సరిగ్గా ఉన్న ఆధార్ కార్డ్",
      "వివాహం తర్వాత పేరు మార్పు కోసం వివాహ ధృవీకరణ పత్రం లేదా గెజెట్ నోటిఫికేషన్",
      "సవరించిన చిరునామా ప్రూఫ్ (కరెంట్ బిల్లు, బ్యాంక్ స్టేట్‌మెంట్ మొదలైనవి)"
    ]
  },
  {
    id: "aadhaar-enroll",
    title: "Aadhaar Primary Enrollment",
    titleTelugu: "కొత్త ఆధార్ కార్డ్ నమోదు (ఎన్‌రోల్‌మెంట్)",
    category: "identity",
    description: "Required for first-time UID enrollment. Always free at government verified Aadhaar kendras.",
    descriptionTelugu: "మొదటి సారి విశిష్ట గుర్తింపు సంఖ్య (UID) పొందడానికి నమోదు. ఇది ప్రభుత్వ ఆధార్ కేంద్రాలలో ఎల్లప్పుడూ ఉచితం.",
    requirements: [
      "Proof of Identity (Voter Card, Passport, PAN Card, Ration Card)",
      "Proof of Address (Electricity bill, Landline bill, registered Rent agreement)",
      "Proof of Date of Birth (Birth Certificate, SSC Marks card, Pension Card)",
      "Biometric capturing (Fingers, Iris scanning, live photo at center)"
    ],
    requirementsTelugu: [
      "గుర్తింపు పత్రం (ఓటర్ కార్డ్, పాస్‌పోర్ట్, పాన్ కార్డ్, రేషన్ కార్డ్)",
      "చిరునామా ధృవీకరణ (కరెంట్ బిల్లు, ల్యాండ్‌లైన్ టోల్స్, రిజిస్టర్డ్ అద్దె ఒప్పందం)",
      "పుట్టిన తేదీ ధృవీకరణ (పుట్టిన సర్టిఫికేట్, ఎస్ఎస్‌సీ మార్కుల లిస్ట్, పెన్షన్ కార్డ్)",
      "బయోమెట్రిక్ నమోదు (వేలిముద్రలు, కంటిపాప స్కాన్, కేంద్రంలో లైవ్ ఫోటో)"
    ]
  },
  {
    id: "aadhaar-update",
    title: "Aadhaar Card Detail Update",
    titleTelugu: "ఆధార్ వివరాల సవరణ (అప్‌డేట్)",
    category: "identity",
    description: "Used to correct addresses, update biometric data after major growth years, and links mobile numbers.",
    descriptionTelugu: "చిరునామా మార్చడానికి, వయసు పెరిగిన తరువాత బయోమెట్రిక్స్ నవీకరించడానికి మరియు మొబైల్ సంఖ్య జోడించడానికి.",
    requirements: [
      "Existing Aadhaar Number or Enrollment ID slip",
      "Proof of Relationship or Identity documents support",
      "For mobile update: Registered active SIM card present with user to catch direct OTP verification",
      "New Address Proof with accurate matching configurations (Voter Card, Bank Passbook, Passport)"
    ],
    requirementsTelugu: [
      "ప్రస్తుత ఆధార్ సంఖ్య లేదా నమోదు పత్రం (EID స్లిప్)",
      "కుటుంబ సంబంధాలు లేదా గుర్తింపు పత్రాల మద్దతు కాపీ",
      "మొబైల్ అప్‌డేట్ కోసం: OTP ధృవీకరణ కోసం వాడుకలో ఉన్న సిమ్ కార్డ్ కస్టమర్ వద్దే ఉండాలి",
      "ఖచ్చితమైన చిరునామా ఉండే నూతన ప్రూఫ్ (ఓటర్ కార్డ్, బ్యాంక్ పాస్‌బుక్, పాస్‌పోర్ట్)"
    ]
  },
  {
    id: "bank-open",
    title: "Bank Account Opening",
    titleTelugu: "కొత్త బ్యాంక్ ఖాతా తెరవడం",
    category: "banking",
    description: "Required to open fully automated Savings or Current accounts in either public or private institutions.",
    descriptionTelugu: "ప్రభుత్వ లేదా ప్రైవేట్ బ్యాంకులలో పొదుపు (Savings) లేదా కరెంట్ ఖాతాలు తెరవడానికి కావలసినవి.",
    requirements: [
      "Permanent Account Number (PAN Card) or Form 60",
      "Official Valid Document (Aadhaar Card, Passport or Voter Identity card)",
      "Two Recent Passport size photographs",
      "Initial Cash Deposit depending on branch category (Savings accounts range from zero to 5000 INR)",
      "Verification of Active Indian Mobile Connection"
    ],
    requirementsTelugu: [
      "శాశ్వత ఖాతా సంఖ్య (పాన్ కార్డ్) లేదా ఫారం 60",
      "అధికారిక గుర్తింపు పత్రం (ఆధార్ కార్డ్, ఓటర్ కార్డ్ లేదా పాస్‌పోర్ట్)",
      "రెండు ఇటీవలి పాస్‌పోర్ట్ సైజు ఫోటోగ్రాఫ్‌లు",
      "ప్రాథమిక నగదు డిపాజిట్ అమౌంట్ (సున్నా నుండి 5000 రూపాయల వరకు మారుతుంది)",
      "యాక్టివ్‌గా ఉన్న మొబైల్ సంఖ్య ధృవీకరణ"
    ]
  },
  {
    id: "bank-update",
    title: "Bank KYC & Account Updates",
    titleTelugu: "బ్యాంక్ కేవైసీ (KYC) మరియు మొబైల్ అప్‌డేట్",
    category: "banking",
    description: "Required periodically under RBI guidelines to ensure profiles remain accessible and unlock locked accounts.",
    descriptionTelugu: "ఖాతాలు బ్లాక్ కాకుండా ఉంచడానికి మరియు నిరంతర ఆపరేషన్ల కొరకు ఆర్బీఐ నిబంధనల ప్రకారం క్రమానుగతంగా చేయవలసిన ధ్రువీకరణ.",
    requirements: [
      "Standard KYC Re-verification form filled and signed",
      "Aadhaar Card + original physical card verification",
      "Active Mobile number update query authorization letter with details of the older number",
      "Bank Account Passbook (for verification stamp)"
    ],
    requirementsTelugu: [
      "పూర్తి చేసి సంతకం చేసిన స్టాండర్డ్ కేవైసీ (KYC) ఫారమ్",
      "ఆధార్ కార్డ్ + జిరాక్స్ కాపీలు",
      "మొబైల్ నంబర్ మార్పు దరఖాస్తు లేఖ (పాత నంబర్ మరియు కొత్త నంబర్ వివరాలతో)",
      "బ్యాంక్ ఖాతా పాస్‌బుక్"
    ]
  },
  {
    id: "atm-apply",
    title: "New ATM Card Application",
    titleTelugu: "నూతన ఏటీఎం ఏటీఎం కార్డ్ దరఖాస్తు",
    category: "banking",
    description: "Apply for virtual or physical Rupay, Visa, or Mastercard debit systems connected directly with active accounts.",
    descriptionTelugu: "మీ ఖాతాకు రూపే (RuPay), వీసా (Visa) లేదా మాస్టర్ కార్డ్ డెబిట్ కార్డును అటాచ్ చేయడం కోసం దరఖాస్తు.",
    requirements: [
      "Active Saving / Current Account Number details",
      "ATM Application form filled from authorized branch registry",
      "Self-attested Copy of Primary Aadhaar representation",
      "Verification Signature matching system server signatures"
    ],
    requirementsTelugu: [
      "వాడుకలో ఉన్న పొదుపు / కరెంట్ ఖాతా నంబర్",
      "పూర్తి చేసిన డెబిట్ కార్డ్ దరఖాస్తు ఫారమ్",
      "స్వయంగా సంతకం చేసిన ప్రాథమిక ఆధార్ ప్రూఫ్ కాపీ",
      "బ్యాంక్ రికార్డులతో సరిపోలే మీ సంతకం"
    ]
  },
  {
    id: "atm-pin",
    title: "ATM PIN Generation",
    titleTelugu: "ఏటీఎం పిన్ (ATM PIN) జనరేషన్",
    category: "banking",
    description: "Setup custom 4-digit security code of your choice to dispatch money securely from any automated teller machine.",
    descriptionTelugu: "ఏటీఎం మెషిన్ నుండి నగదును విత్‌డ్రా చేయడానికి అత్యంత సురక్షితమైన 4 అంకెల గుప్త కోడ్ ని రూపొందించుకోవడం.",
    requirements: [
      "Active Debit Card physical card present with user",
      "Registered Indian mobile number holding active SMS benefits (SIM inside active phone)",
      "Bank Account Number",
      "Instant security code validation OTP sent from bank's automated processing system"
    ],
    requirementsTelugu: [
      "సదరు ఏటీఎం కార్డ్ భౌతికంగా అందుబాటులో ఉండాలి",
      "బ్యాంకులో రిజిస్టర్ అయిన మొబైల్ సిమ్ ఆక్టివ్‌గా ఉండాలి",
      "బ్యాంక్ ఖాతా సంఖ్య",
      "ఏటీఎం యంత్రం లేదా మొబైల్ బ్యాంకింగ్ ద్వారా వచ్చే తాత్కాలిక OTP కోడ్"
    ]
  },
  {
    id: "upi-link",
    title: "UPI / PhonePe / GPay Linking",
    titleTelugu: "UPI / PhonePe / Google Pay లింకింగ్",
    category: "banking",
    description: "Allows instant free peer-to-peer cash settlements 24/7 anywhere in India.",
    descriptionTelugu: "భారతదేశంలో ఎక్కడైనా 24/7 తక్షణమే ఉచిత నగదు బదిలీలు చేయడానికి వీలు కల్పిస్తుంది.",
    requirements: [
      "Active Savings Bank account in India",
      "Active registered mobile connection SIM card placed inside the smart device containing Google Pay/PhonePe",
      "Standard Debit card holding valid expiry dates",
      "UPI Registration Code generated during active internet setup"
    ],
    requirementsTelugu: [
      "భారతదేశంలో ఆక్టివ్‌గా ఉన్న పొదుపు ఖాతా",
      "రిజిస్టర్డ్ మొబైల్ సిమ్ కార్డు తప్పనిసరిగా UPI యాప్ ఉపయోగిస్తున్న స్మార్ట్ మొబైల్‌లోనే అమర్చి ఉండాలి",
      "కార్డు వాలిడిటీ తేదీలు స్పష్టంగా ముద్రించిన ఏటీఎం కార్డ్",
      "ఆన్‌లైన్ రిజిస్ట్రేషన్ సమయంలో మొబైల్ నుండి వెళ్ళే ధృవీకరణ SMS"
    ]
  }
];

export const HOLIDAYS: Holiday[] = [
  { id: "h1", name: "Republic Day", nameTelugu: "గణతంత్ర దినోత్సవం", date: "2026-01-26", type: "national", states: ["All"], month: "January" },
  { id: "h2", name: "Maha Shivaratri", nameTelugu: "మహా శివరాత్రి", date: "2026-02-15", type: "festival", states: ["Andhra Pradesh", "Telangana", "Karnataka", "Maharashtra", "Tamil Nadu"], month: "February" },
  { id: "h3", name: "Holi", nameTelugu: "హోలీ పండుగ", date: "2026-03-04", type: "festival", states: ["All"], month: "March" },
  { id: "h4", name: "Ramzan (Eid-ul-Fitr)", nameTelugu: "రంజాన్ పండుగ", date: "2026-03-20", type: "festival", states: ["All"], month: "March" },
  { id: "h5", name: "Ugadi (Telugu New Year)", nameTelugu: "ఉగాది పండుగ", date: "2026-03-18", type: "festival", states: ["Andhra Pradesh", "Telangana", "Karnataka"], month: "March" },
  { id: "h6", name: "Annual Closing of Bank Accounts", nameTelugu: "బ్యాంక్ వార్షిక లెక్కింపుల ముగింపు", date: "2026-04-01", type: "rbi", states: ["All"], month: "April" },
  { id: "h7", name: "Good Friday", nameTelugu: "గుడ్ ఫ్రైడే", date: "2026-04-03", type: "festival", states: ["All"], month: "April" },
  { id: "h8", name: "Dr. B.R. Ambedkar Jayanti", nameTelugu: "అంబేద్కర్ జయంతి", date: "2026-04-14", type: "national", states: ["All"], month: "April" },
  { id: "h9", name: "Bakrid (Eid-ul-Adha)", nameTelugu: "బక్రీద్ పండుగ", date: "2026-05-27", type: "festival", states: ["All"], month: "May" },
  { id: "h10", name: "Independence Day", nameTelugu: "స్వాతంత్ర్య దినోత్సవం", date: "2026-08-15", type: "national", states: ["All"], month: "August" },
  { id: "h11", name: "Vinayaka Chavithi (Ganesh Chaturthi)", nameTelugu: "వినాయక చవితి", date: "2026-09-17", type: "festival", states: ["Andhra Pradesh", "Telangana", "Karnataka", "Maharashtra"], month: "September" },
  { id: "h12", name: "Gandhi Jayanti", nameTelugu: "గాంధీ జయంతి", date: "2026-10-02", type: "national", states: ["All"], month: "October" },
  { id: "h13", name: "Vijayadashami (Dussehra)", nameTelugu: "విజయదశమి (దసరా)", date: "2026-10-20", type: "festival", states: ["All"], month: "October" },
  { id: "h14", name: "Deepavali (Diwali)", nameTelugu: "దీపావళి పండుగ", date: "2026-11-08", type: "festival", states: ["All"], month: "November" },
  { id: "h15", name: "Christmas Day", nameTelugu: "క్రిస్మస్ పండుగ", date: "2026-12-25", type: "festival", states: ["All"], month: "December" }
];

export const OFFERS: Offer[] = [
  {
    id: "off1",
    bankId: "sbi",
    title: "SBI Amrit Kalash Fixed Deposit Scheme",
    titleTelugu: "ఎస్‌బీఐ అమృత్ కలశ్ ఫిక్సెడ్ డిపాజిట్ పథకం",
    category: "fd",
    description: "Exclusive 400-day high-yield program. Special rate of interest for Indian senior citizens.",
    descriptionTelugu: "ప్రత్యేకమైన 400 రోజుల అధిక రాబడి పథకం. లబ్ధిదారులైన సీనియర్ సిటిజన్లకు అదనపు వడ్డీ ప్రయోజనం.",
    rate: "7.10% p.a. (7.60% for Senior Citizens)",
    tag: "High Yield"
  },
  {
    id: "off2",
    bankId: "hdfc",
    title: "HDFC Senior Citizen Care FD Term",
    titleTelugu: "హెచ్‌డీఎఫ్‌సీ సీనియర్ సిటిజన్ కేర్ ఎఫ్‌డీ ప్లాన్",
    category: "fd",
    description: "Invest in 5-10 year deposits and acquire premium safety along with top tier private interest calculations.",
    descriptionTelugu: "5 నుండి 10 సంవత్సరాల దీర్ఘకాలిక డిపాజిట్లపై అత్యుత్తమ వడ్డీతో అత్యంత భద్రత లభిస్తుంది.",
    rate: "7.75% per annum",
    tag: "Premium Safety"
  },
  {
    id: "off3",
    bankId: "icici",
    title: "ICICI Sapphiro Premium Reward Card",
    titleTelugu: "ఐసీఐసీఐ సాఫైర్ ప్రీమియం రివార్డ్ కార్డ్",
    category: "card",
    description: "Complimentary elite domestic lounge access, airport spa certificates, and dynamic reward multipliers on retail.",
    descriptionTelugu: "ఉచిత ఎయిర్‌పోర్ట్ లాంజ్ యాక్సెస్ మరియు షాపింగ్ లావాదేవీలపై గరిష్ట రివార్డ్ పాయింట్లు.",
    rate: "First Year Free Program",
    tag: "Elite Rewards"
  },
  {
    id: "off4",
    bankId: "sbi",
    title: "SBI Shaurya Home Loan Scheme",
    titleTelugu: "ఎస్‌బీఐ శౌర్య హోమ్ లోన్ (గృహ రుణం)",
    category: "loan",
    description: "Tailored interest-rate subsidies exclusively for defense forces, paramilitary personnel, and retired service veterans.",
    descriptionTelugu: "భారత రక్షణ దళాలు, పారా మిలిటరీ సిబ్బంది మరియు పదవీ విరమణ పొందిన వీరుల కోసం ప్రత్యేక వడ్డీ రాయితీ గృహ రుణం.",
    rate: "Rates starting @ 8.40% p.a.",
    tag: "Defense Special"
  },
  {
    id: "off5",
    bankId: "union",
    title: "Nari Shakti Central Business Loan",
    titleTelugu: "నారీ శక్తి వ్యాపార ఉపాధి రుణం",
    category: "loan",
    description: "Zero processing fees and collateral freedom for micro enterprises operated by inspiring Indian women entrepreneurs.",
    descriptionTelugu: "మహిళా వ్యాపారవేత్తల కోసం ఎలాంటి ప్రాసెసింగ్ ఫీజులు మరియు పూచీకత్తు లేని ప్రత్యేక రుణ సహాయం.",
    rate: "Subsidy on existing benchmark",
    tag: "Women Entrepreneurs"
  },
  {
    id: "off6",
    bankId: "all",
    title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    titleTelugu: "ప్రధాన మంత్రి జన్ ధన్ యోజన",
    category: "scheme",
    description: "National financial inclusion campaign. Zero-balance saving accounts with high interest benefits, Rupay cards, and 10,000 INR overdraft options.",
    descriptionTelugu: "జాతీయ ఆర్థిక సమ్మిళిత కార్యక్రమం. జీరో బ్యాలెన్స్ పొదుపు ఖాతా, ఉచిత రూపే కార్డు మరియు రూ. 10,000 ఓవర్‌డ్రాఫ్ట్ సౌకర్యం.",
    rate: "Zero Balance Mandate",
    tag: "National Scheme"
  },
  {
    id: "off7",
    bankId: "all",
    title: "Sukanya Samriddhi Yojana (SSY)",
    titleTelugu: "సుకన్య సమృద్ధి యోజన (బాలికల పొదుపు)",
    category: "scheme",
    description: "Central educational and marriage campaign focused on daughters under age of 10. Offers tax deductions under Section 80C.",
    descriptionTelugu: "10 ఏళ్లలోపు బాలికల భవిష్యత్తు, చదువు మరియు వివాహ ఖర్చుల సంక్షేమం కోసం కేంద్ర ప్రభుత్వ పన్ను రహిత అత్యుత్తమ పొదుపు పథకం.",
    rate: "8.20% p.a. (Tax Free)",
    tag: "Girl Child Scheme"
  }
];

export const BRANCHES: { [key: string]: string[] } = {
  sbi: ["Main Branch, Koti, Hyderabad", "Visakhapatnam Town Hall Branch", "Nariman Point Main, Mumbai", "M.G. Road Branch, Vijayawada", "Tirupati Temple Ridge Branch", "Anantapur HQ Branch", "Guntur Medical College Road Branch"],
  apgvb: ["Anantapur Municipal Main", "Kadapa Collectorate Complex", "Kurnool Auto Nagar Extension", "Nellore Court Road Terminal", "Chittoor Bazaar Street Branch"],
  union: ["Khairatabad Corporate Hub, Hyderabad", "Waltair Uplands, Vizag", "Benz Circle, Vijayawada", "Nellore Podalakur Road"],
  kotak: ["Somajiguda High Street, Hyderabad", "M.G. Road, Vijayawada", "VIP Road Branch, Vizag", "Hampankatta, Mangaluru"],
  hdfc: ["Banjara Hills Road No 1, Hyderabad", "Dwarka Nagar, Visakhapatnam", "Raja Road, Tirupati", "Bandrakurla Complex, Mumbai"],
  icici: ["Gachibowli Financial District, Hyderabad", "Asilmetta, Visakhapatnam", "Eluru Road Branch, Vijayawada", "Kalyan Nagar, Bengaluru"]
};

export const SERVICES_LIST = [
  { id: "pan_new", name: "Apply PAN Card (NSDL Node)", nameTelugu: "కొత్త పాన్ దరఖాస్తు" },
  { id: "aadhaar_enroll", name: "Aadhaar Primary Enrollment", nameTelugu: "కొత్త ఆధార్ కార్డ్ నమోదు" },
  { id: "ac_open", name: "Open Savings/Current Account", nameTelugu: "కొత్త బ్యాంక్ ఖాతా తెరవడం" },
  { id: "kyc_update", name: "KYC verification & Mobile link", nameTelugu: "కేవైసీ వివరాల సవరణ" },
  { id: "atm_issue", name: "Debit Card Issue Request", nameTelugu: "కొత్త ఏటీఎం కార్డ్ దరఖాస్తు" },
  { id: "pin_reset", name: "ATM PIN Generation Setup", nameTelugu: "ఏటీఎం పిన్ జనరేషన్" },
  { id: "upi_link", name: "Central UPI App Linking", nameTelugu: "UPI / యాప్స్ లింకింగ్" }
];

export const FAQS: FAQ[] = [
  {
    id: "f1",
    question: "What is an IFSC code?",
    questionTelugu: "IFSC కోడ్ అంటే ఏమిటి?",
    answer: "An Indian Financial System Code (IFSC) is a unique 11-character alphanumeric code assigned by the Reserve Bank of India to identify branch coordinates uniquely for online cash transfers like NEFT and RTGS.",
    answerTelugu: "IFSC అనేది 11 అంకెల విశిష్ట కోడ్. భారతీయ రిజర్వ్ బ్యాంక్ ద్వారా ఆన్‌లైన్ నగదు బదిలీల కొరకు (NEFT, RTGS) ప్రతి బ్యాంక్ బ్రాంచ్‌ను గుర్తించడానికి ఇది కేటాయించబడుతుంది.",
    category: "general"
  },
  {
    id: "f2",
    question: "Are government schemes compatible with all public banks?",
    questionTelugu: "ప్రభుత్వ పథకాలు అన్ని బ్యాంకులలో వర్తిస్తాయా?",
    answer: "Yes, major nationalized public and private banks like SBI, Union Bank, HDFC, and others are officially authorized to operate SSY (Sukanya Samriddhi) and PMJDY schemes.",
    answerTelugu: "అవును, ప్రభుత్వ అధికారిక పథకాలైన సుకన్య సమృద్ధి (SSY), జన్ ధన్ (PMJDY) వంటి పథకాల ఖాతాలను దాదాపు అన్ని ప్రముఖ ప్రభుత్వ మరియు ప్రైవేట్ బ్యాంకులలో తెరవవచ్చును.",
    category: "schemes"
  },
  {
    id: "f3",
    question: "How long is a booked token slot valid for?",
    questionTelugu: "బుక్ చేసిన టోకెన్ సమయం ఎంతవరకు చెల్లుతుంది?",
    answer: "Your booked token slot has a grace window of 15 minutes before and after the selected time slot. If you arrive within this period, your position inside the virtual queue is fully protected.",
    answerTelugu: "మీరు ఎంచుకున్న సమయానికి 15 నిమిషాల ముందు లేదా వెనుక బ్రాంచ్‌కు చేరుకున్నా మీ టోకెన్ ప్రాధాన్యత క్యూలో సురక్షితంగా ఉంటుంది.",
    category: "tokens"
  }
];
