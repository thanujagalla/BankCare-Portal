import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API:", error);
  }
} else {
  console.log("No custom GEMINI_API_KEY found, server will operate in intelligent localized assist mode.");
}

// Local helper for fallback answers
function getLocalFallbackAnswer(message: string, lang: 'en' | 'te'): string {
  const query = message.toLowerCase();
  
  if (lang === 'te') {
    if (query.includes('పాన్') || query.includes('pan')) {
      return `**యూనిఫైడ్ బ్యాంకింగ్ అసిస్టెంట్ సమాచారం:**\n\n**కొత్త పాన్ కార్డ్ (PAN) దరఖాస్తుకు అవసరమైన పత్రాలు:**\n• గుర్తింపు, నివాసం మరియు పుట్టిన తేదీకి తగినట్లుగా **ఆధార్ కార్డ్** అత్యుత్తమ సమాధానం.\n• రెండు రంగుల పాస్‌పోర్ట్ సైజు ఫోటోలు.\n• ఓటిపి కొరకు చురుకైన మొబైల్ నంబర్.\n\nమీరు 'పత్రాలు' విభాగంలో ఈ పత్రాల జాబితాను సరిచూసుకోవచ్చు మరియు డౌన్‌లోడ్ చేసుకోవచ్చు.`;
    }
    if (query.includes('ఆధార్') || query.includes('aadhaar') || query.includes('ఆదార్')) {
      return `**యూనిఫైడ్ బ్యాంకింగ్ అసిస్టెంట్ సమాచారం:**\n\n**ఆధార్ నమోదు / మార్పుల కొరకు:**\n• గుర్తింపు పత్రం (ఓటర్ కార్డ్, పాన్ కార్డ్, పాస్‌పోర్ట్).\n• చిరునామా ప్రూఫ్ (కరెంట్ బిల్, రెంట్ అగ్రిమెంట్).\n• పుట్టిన తేదీ ప్రూఫ్ (బర్త్ సర్టిఫికేట్ లేదా ఎస్ఎస్‌సీ మార్కుల జాబితా).\n\nవీటిని తీసుకుని స్థానిక ఆధార్ సేవా కేంద్రానికి వెళ్ళగలరు.`;
    }
    if (query.includes('మొబైల్') || query.includes('mobile') || query.includes('నంబర్')) {
      return `**యూనిఫైడ్ బ్యాంకింగ్ అసిస్టెంట్ సమాచారం:**\n\n**బ్యాంక్ ఖాతాకు మొబైల్ మార్పు కొరకు దరఖాస్తు:**\n• మీ బ్రాంచ్ లో మొబైల్ నంబర్ అప్‌డేట్ ఫారమ్ నింపండి.\n• గుర్తింపు కొరకు ఆధార్ కార్డ్ కాపీ జతచేయండి.\n• పాత మరియు కొత్త నంబర్లతో కూడిన ధృవీకరణ లేఖ సమర్పించండి. సాధారణంగా 24 నుండి 48 గంటల్లో అప్‌డేట్ అవుతుంది.`;
    }
    if (query.includes('పిన్') || query.includes('pin') || query.includes('ఏటీఎం')) {
      return `**యూనిఫైడ్ బ్యాంకింగ్ అసిస్టెంట్ సమాచారం:**\n\n**కొత్త ఏటీఎం పిన్ (ATM PIN) సృష్టి:**\n• మీ డెబిట్ కార్డ్‌తో సమీప ఏటీఎం మెషిన్‌ను సందర్శించండి.\n• 'PIN Generation' ఆప్షన్‌ను ఎంచుకుని ఖాతా నంబర్ ఎంటర్ చేయండి.\n• బ్యాంకులో రిజిస్టర్ అయిన మొబైల్‌కు వచ్చే ఒటిపి (OTP) తో కొత్త పిన్‌ను కాన్ఫిగర్ చేసుకోండి.`;
    }
    if (query.includes('సెలవులు') || query.includes('సెలవు') || query.includes('holiday') || query.includes('holidays')) {
      return `**యూనిఫైడ్ బ్యాంకింగ్ అసిస్టెంట్ సమాచారం:**\n\nకార్యాలయం మరియు బ్యాంక్ సెలవుల కోసం 'బ్యాంక్ సెలవులు' పేజీ ని తనిఖీ చేయండి. అందులో జాతీయ సెలవులు, ఆర్బీఐ సెలవులు మరియు మీ రాష్ట్రాల వారీగా పూర్తి వివరాలు క్యాలెండర్ రూపంలో కలవు.`;
    }
    if (query.includes('ఎస్‌బీఐ') || query.includes('sbi') || query.includes('స్టేట్ బ్యాంక్')) {
      return `**స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI) వివరాలు:**\n• **పని వేళలు:** ఉదయం 10:00 నుండి సాయంత్రం 4:00 వరకు.\n• **హెల్ప్‌లైన్:** 1800-425-3800 (ఉచితం).\n• **IFSC కోడ్ ప్రారంభం:** SBIN...\nమీరు 'టోకెన్ బుకింగ్' సిద్ధం చేయడం ద్వారా ఎస్‌బీఐ బ్రాంచ్‌లో మీ సమయం ఆదా చేసుకోవచ్చు.`;
    }
    if (query.includes('హెచ్‌డీఎఫ్‌సీ') || query.includes('hdfc')) {
      return `**హెచ్‌డీఎఫ్‌సీ బ్యాంక్ (HDFC Bank) వివరాలు:**\n• **పని వేళలు:** ఉదయం 09:30 నుండి సాయంత్రం 04:00 వరకు.\n• **హెల్ప్‌లైన్:** 1800-202-6161.\n• **IFSC కోడ్ ప్రారంభం:** HDFC...`;
    }
    return `**బ్యాంక్‌కేర్ సహాయ కేంద్రాన్ని సంప్రదించినందుకు ధన్యవాదాలు!**\n\nనేను మీ బ్యాంకింగ్ సంబంధిత సందేహాలను తెలుగు మరియు ఇంగ్లీషులో నివృత్తి చేయగలను. దయచేసి వీటికి సంబంధించిన ప్రశ్నలు అడగండి:\n1. పాన్ కార్డ్ / ఆధార్ దరఖాస్తుకు ఏ డాక్యుమెంట్లు కావాలి?\n2. బ్యాంక్ ఖాతాలలో మొబైల్ మార్పు ఎలా చేయాలి?\n3. బ్రాంచ్ అపాయింట్‌మెంట్ టోకెన్స్ బుకింగ్ ఎలా చేయాలి?\n4. ఏ బ్యాంకు శలవులు ఎప్పుడు ఉన్నాయి?`;
  } else {
    // English responses
    if (query.includes('pan') || query.includes('tax')) {
      return `**BankCare Assistant Guidance:**\n\nTo apply for a **New PAN Card**, you must gather:\n• **Aadhaar Card** (Acts as primary Identity, Age & Address verification).\n• Two recent color passport-size photos with a solid background.\n• An active mobile number to catch OTP confirmations.\n\nYou can click on any checklist criteria inside the **Documents Center** to download this data directly.`;
    }
    if (query.includes('aadhaar') || query.includes('adhaar') || query.includes('uid')) {
      return `**BankCare Assistant Guidance:**\n\nFor **Aadhaar Primary Enrollment & Updates**:\n• Identity Proof (Voter Card, PAN, Passport).\n• Address Proof (Rent Agreement, Electricity or Utility bills).\n• Age Proof (SSC Certificate, Birth Certificate).\n• Visit your nearest verified Aadhaar Seva Kendra for biometric scanning. Update takes 5 to 7 working days.`;
    }
    if (query.includes('mobile') || query.includes('phone') || query.includes('number')) {
      return `**BankCare Assistant Information:**\n\nTo update your **Registered Mobile Number** at any bank:\n• Visit your home branch and ask for the 'Mobile Number Update Form'.\n• Attatch a self-attested Aadhaar Card copy.\n• Hand it to the verification clerk. Updates typically take 24 to 48 hours. A secure confirmation SMS is dispatched to your new number.`;
    }
    if (query.includes('pin') || query.includes('atm') || query.includes('debit')) {
      return `**BankCare Assistant Information:**\n\nTo perform physical **ATM PIN Generation**:\n• Insert your physical Debit Card at any banking ATM kiosk.\n• Choose the 'PIN Generation' or 'Green PIN' menu category.\n• Key in your absolute Bank Account Number.\n• Verify with the temporary OTP sent to your registered mobile SIM. Enter your new secret 4-digit code.`;
    }
    if (query.includes('sbi') || query.includes('state bank')) {
      return `**State Bank of India (SBI) Overview:**\n• **Branch Hours:** 10:00 AM to 04:00 PM (2nd & 4th Saturdays closed).\n• **Toll-Free Helpline:** 1800-425-3800.\n• **IFSC Format:** Starts with 'SBIN' followed by 7 numerals corresponding to the branch code.`;
    }
    if (query.includes('hdfc')) {
      return `**HDFC Bank Overview:**\n• **Branch Hours:** 09:30 AM to 04:00 PM.\n• **Toll-Free Helpline:** 1800-202-6161.\n• **IFSC Format:** Starts with 'HDFC' followed by branch numbers.`;
    }
    if (query.includes('holiday') || query.includes('calendar')) {
      return `**BankCare Assistant Information:**\n\nBank holidays vary by state. Please visit our dedicated **Holidays Page** to check National, RBI and State-specific banking holidays for 2026.`;
    }
    return `**Hello and Welcome to BankCare Assistant!**\n\nI am your smart assistant designed to help with Indian banking requirements. I can assist you with:\n• Identity documents required for PAN, Aadhaar, and Account Opening.\n• Guide you on updating mobile numbers or generating ATM PINs.\n• Check bank specific working hours, locator services, and IFSC codes.\n• Walk you through booking virtual appointment tokens.\n\nFeel free to ask a question!`;
  }
}

// RESTful API Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history, language } = req.body;
  const lang: 'en' | 'te' = language === 'te' ? 'te' : 'en';

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message content cannot be empty." });
  }

  // If Gemini client is running:
  if (ai) {
    try {
      const chatHistory = (history || []).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      }));

      // Append instruction
      const systemInstruction = lang === 'te' 
        ? "యు ఆర్ ది అఫీషియల్ సెంట్రల్ బ్యాంకింగ్ అసిస్టెంట్ ఫర్ 'బ్యాంక్‌కేర్ పోర్టల్' (BankCare Portal). మీ సమాధానం ఎల్లప్పుడూ అత్యంత గౌరవప్రదంగా, సహాయకరంగా మరియు సులభంగా అర్థమయ్యేలా తెలుగులో లేదా ఇంగ్లీషులో ఉండాలి. ప్రజల బ్యాంకింగ్ సేవలు (పాన్ దరఖాస్తు, ఆధార్ కార్డ్, ఏటీఎం పిన్, అపాయింట్మెంట్స్, కేవైసీ) మరియు ప్రొసీజర్స్ గురించి ఖచ్చితమైన విశ్లేషణ ఇవ్వండి. నిరాధారమైన లేదా ఊహించిన సమాచారాన్ని ఇవ్వవద్దు. బ్యాంక్ గంటల వివరాలను సరిగ్గా చెప్పండి (ఎస్‌బీఐ: 10:00 AM - 4:00 PM, హెచ్‌డీఎఫ్‌సీ: 9:30 AM - 4:00 PM)."
        : "You are the official Central AI Banking Clerk for 'BankCare Portal', a digital information aggregator for Indian public & private banks. Be polite, patient, and extremely clear. Address required documents (Aadhaar, PAN card, address proofs, photos), customer care hotlines (SBI: 1800-425-3800, APGVB: 1800-425-2045, Union: 1800-22-2244, etc), bank procedures, holidays, and loan offers. Give structured answers using markdown bullet points. If language corresponds to English, talk in English. If the user prompts in Telugu, reply in polished professional Telugu.";

      const contents = [...chatHistory, { role: 'user', parts: [{ text: message }] }];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || getLocalFallbackAnswer(message, lang);
      return res.json({ response: responseText });

    } catch (error) {
      console.error("Gemini API stream failure:", error);
      // Seamlessly fall back to local rule-based match on failure
      const text = getLocalFallbackAnswer(message, lang);
      return res.json({ response: text, note: "Local Assist Engine Activated" });
    }
  } else {
    // Use local assistant matching engine
    const text = getLocalFallbackAnswer(message, lang);
    return res.json({ response: text, note: "Offline Local Backup Mode" });
  }
});

// Mock simple branch locator API for map operations
app.get("/api/branches/search", (req, res) => {
  const { bankId } = req.query;
  if (!bankId) {
    return res.status(400).json({ error: "bankId is required" });
  }
  const bankData = {
    sbi: [{ name: "SBI Hyderabad Main, Koti", lat: 17.3828, lng: 78.4816 }, { name: "SBI Visakhapatnam Branch", lat: 17.7042, lng: 83.2982 }],
    apgvb: [{ name: "APGVB Kadapa Main", lat: 14.4716, lng: 78.8236 }, { name: "APGVB Kurnool Main", lat: 15.8281, lng: 78.0373 }],
    hdfc: [{ name: "HDFC Banjara Hills, Hyd", lat: 17.4156, lng: 78.4411 }, { name: "HDFC Kula Complex, Mumbai", lat: 19.0596, lng: 72.8295 }],
    icici: [{ name: "ICICI Financial District, Hyd", lat: 17.4165, lng: 78.3475 }]
  };
  const list = bankData[bankId as keyof typeof bankData] || [{ name: "Central Authorized Branch Node", lat: 17.3850, lng: 78.4867 }];
  res.json({ branches: list });
});

// Configure Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Server static production assets from /dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving compiled production assets from ./dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BankCare Portal Full-Stack Container running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
