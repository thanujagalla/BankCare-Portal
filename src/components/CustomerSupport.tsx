import React, { useState } from 'react';
import { TRANSLATIONS, BANKS } from '../data';
import { Language } from '../types';
import { Phone, Mail, Clock, Send, Bot, Shield, User, Sparkles, MessageCircle, FileText, CheckCircle } from 'lucide-react';

interface CustomerSupportProps {
  lang: Language;
}

interface SupportChatMessage {
  id: string;
  sender: 'citizen' | 'deskAgent';
  text: string;
  time: string;
}

export default function CustomerSupport({ lang }: CustomerSupportProps) {
  const t = TRANSLATIONS[lang];

  // Selected desk area
  const [selectedDesk, setSelectedDesk] = useState<'general' | 'pan' | 'aadhaar' | 'atm' | 'upi'>('general');

  // Support chat states
  const [chatLog, setChatLog] = useState<SupportChatMessage[]>([
    { id: '1', sender: 'deskAgent', text: lang === 'en' ? "Welcome to UBS Central Support Desk under General Banking. How can we guide your branch queries?" : "యూనిఫైడ్ జనరల్ బ్యాంకింగ్ హెల్ప్‌డెస్క్‌కు స్వాగతం. మీ సమస్యను ఇక్కడ నివృత్తి చేసుకోండి.", time: "10:30 AM" }
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const [sendingSupport, setSendingSupport] = useState(false);

  const handleDeskChange = (desk: 'general' | 'pan' | 'aadhaar' | 'atm' | 'upi') => {
    setSelectedDesk(desk);
    let initialText = '';

    if (lang === 'en') {
      switch (desk) {
        case 'pan': initialText = "You are now connected with the Central PAN Services Desk (NSDL integration). Ask about card corrections, allotments or address synchronizations."; break;
        case 'aadhaar': initialText = "Connected with Aadhaar UIDAI Coordination Desk. Ask about biometric updates, child enrollments or mobile integration."; break;
        case 'atm': initialText = "Connected with Debit Card & Green PIN Security Desk. Ask about card trapping, blocks, or limits."; break;
        case 'upi': initialText = "UPI & Peer-to-Peer Transfer Support. Ask about transaction lapses, blockades, or PhonePe configurations."; break;
        default: initialText = "Welcome to General Banking Support. Ask about working hours, savings accounts, or branch IFC identifiers.";
      }
    } else {
      switch (desk) {
        case 'pan': initialText = "మీరు ఇప్పుడు పాన్ (PAN) దరఖాస్తు సవరణల సహాయ కేంద్రానికి కనెక్ట్ అయ్యారు. కార్డు సవరణల వివరాలు అడగండి."; break;
        case 'aadhaar': initialText = "ఆధార్ (UIDAI) సహాయ కేంద్రానికి కనెక్ట్ అయ్యారు. వేలిముద్రల మార్పు, పిల్లల ఎన్‌రోల్‌మెంట్ పద్ధతులు అడగండి."; break;
        case 'atm': initialText = "డెబిట్ కార్డ్ & ఏటీఎం పిన్ (ATM PIN) సహాయ కేంద్రం. కార్డ్ బ్లాకింగ్స్ లేదా పిన్ సృష్టి గురించి అడగండి."; break;
        case 'upi': initialText = "UPI & ఫోన్‌పే ఆన్‌లైన్ పేమెంట్ సహాయ కేంద్రం. నిలిచిపోయిన లావాదేవీల గురించి ఇక్కడ అడగండి."; break;
        default: initialText = "సాధారణ బ్యాంకింగ్ సహాయ కేంద్రం. బ్యాంకు పనివేళలు, మరియు కస్టమర్ వివరాలు అడగండి.";
      }
    }

    setChatLog([
      { id: Date.now().toString(), sender: 'deskAgent', text: initialText, time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }
    ]);
  };

  const handleSupportMessageSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userText = typedMessage;
    const nowStr = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    setChatLog((prev) => [
      ...prev,
      { id: Math.random().toString(), sender: 'citizen', text: userText, time: nowStr }
    ]);
    setTypedMessage('');
    setSendingSupport(true);

    setTimeout(() => {
      let responseText = '';
      const query = userText.toLowerCase();

      if (lang === 'en') {
        switch (selectedDesk) {
          case 'pan':
            responseText = query.includes('status') || query.includes('track') 
              ? "To track your PAN dispatch status, visit official Protean (NSDL) tracks with your 15-digit Ack numbers."
              : "For immediate name changes: provide official Gazette notifications or post-marriage marriage certificates along with matching Aadhaar configs.";
            break;
          case 'aadhaar':
            responseText = query.includes('mobile') || query.includes('phone')
              ? "Mobile link changes cannot be serviced fully online. Please visit nearest verified UIDAI Seva Kendras for bio-metric validation."
              : "For address corrections: upload valid utility statements, bank passbooks or official residence proofs inside myGov portals.";
            break;
          case 'atm':
            responseText = query.includes('block') || query.includes('lost')
              ? "EMERGENCY: To block trapped or lost debit cards, please call respective helpline nodes (e.g., SBI: 1800-11-2211) immediately or dial 1930 for online fraud."
              : "To generate a Green ATM PIN, locate any bank automated kiosk. Key in accounts data and confirm with OTP routed to your registered mobile sim.";
            break;
          case 'upi':
            responseText = query.includes('fail') || query.includes('money')
              ? "If money was debited but transaction failed: cash is held securely in transit. National banking settlements normally credit it back inside 48 hours."
              : "To link UPI apps successfully: ensure the registered mobile SIM card is placed in the primary slot of your smart mobile device.";
            break;
          default:
            responseText = "All public banks operate from 10:00 AM to 04:00 PM on working week days. Ensure to book virtual tickets beforehand inside our portal.";
        }
      } else {
        // Telugu responsive fallback dialog
        switch (selectedDesk) {
          case 'pan':
            responseText = "పాన్ కార్డు లభ్యతను శోధించడానికి మీ 15 అంకెల అక్నాలెడ్జ్ నంబర్‌ను ఎన్‌ఎస్‌డీఎల్ వెబ్‌సైట్‌లో సమర్పించవలసి ఉంటుంది.";
            break;
          case 'aadhaar':
            responseText = "మొబైల్ నంబర్ లింకింగ్ కోసం ఖచ్చితంగా స్థానిక ఆధార్ సేవా కేంద్రాన్ని సందర్శించండి; వేలిముద్రల స్కాన్ లేకుండా మొబైల్ మార్పు సాధ్యపడదు.";
            break;
          case 'atm':
            responseText = "ఏటీఎం కార్డు పోయినట్లయితే వెంటనే 1800-11-2211 కి కాల్ చేసి బ్లాక్ చేయించండి. లేదా బ్యాంకు మొబైల్ యాప్ ద్వారా బ్లాక్ చేసుకోండి.";
            break;
          case 'upi':
            responseText = "యూపీఐ లావాదేవీ విఫలమై ఖాతా నుండి నగదు కట్ అయితే భయపడవద్దు. ఆ నగదు గరిష్టంగా 48 గంటల్లో మీ ఖాతాకు తిరిగి రిఫండ్ అవుతుంది.";
            break;
          default:
            responseText = "బ్యాంకు బ్రాంచ్ పనివేళలు ఎల్లప్పుడూ ఉదయం 10:00 నుండి సాయంత్రం 4:00 వరకు ఉంటుంది. క్యూలో లైన్లు నివారించడానికి టోకెన్ బుక్ చేసుకోండి.";
        }
      }

      setChatLog((prev) => [
        ...prev,
        { id: Math.random().toString(), sender: 'deskAgent', text: responseText, time: nowStr }
      ]);
      setSendingSupport(false);
    }, 900);
  };

  const supportHelplines = [
    { name: "SBI Helpline Hub", phone: "1800-425-3800", email: "customercare@sbi.co.in", hours: "24/7 Support Desk" },
    { name: "APGVB Rural Support", phone: "1800-425-2045", email: "apgvb@apgbank.co.in", hours: "10 AM - 5 PM Weekdays" },
    { name: "Union Bank Desk", phone: "1800-22-2244", email: "customercare@unionbank.co.in", hours: "24/7 Helpline" },
    { name: "HDFC Premium Helpline", phone: "1800-202-6161", email: "support@hdfcbank.com", hours: "24/7 Care Support" },
    { name: "ICICI Helpdesk", phone: "1800-1080", email: "care@icici.com", hours: "24/7 Core Services" },
    { name: "Kotak Mahindra Care", phone: "1860-266-2666", email: "service.bank@kotak.com", hours: "09:30 AM - 04:30 PM" }
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {lang === 'en' ? 'Central Citizen Support Hub' : 'రాష్ట్ర పోర్టల్ కస్టమర్ కేర్ సపోర్ట్'}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {lang === 'en' 
            ? 'Access comprehensive contact points for Indian banking systems and direct support desks for critical applications.'
            : 'భారతీయ బ్యాంకులకు సంబంధించిన కస్టమర్ కేర్ నంబర్లు మరియు నిపుణుల సలహా కొరకు మా డెస్క్ సేవల విభాగం ఉపయోగించండి.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* HELP LINE DIRECTORY - LEFT 5 CELLS */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-sans font-bold text-slate-800 text-base">
            📞 {lang === 'en' ? 'Official Emergency Helplines' : 'అధికారిక అత్యవసర హెల్ప్‌లైన్లు'}
          </h3>

          <div className="grid grid-cols-1 gap-3.5">
            {supportHelplines.map((hl, idx) => (
              <div
                key={idx}
                id={`support-card-${idx}`}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-900 font-sans">
                    {hl.name}
                  </h4>
                  <span className="text-4xs font-semibold uppercase text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {hl.hours}
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-t border-slate-50 pt-2 text-2xs">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-slate-400" />
                    <a href={`tel:${hl.phone}`} className="font-extrabold text-blue-800 text-xs hover:underline">{hl.phone}</a>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <Mail className="h-3 w-3 text-slate-400" />
                    <span className="line-clamp-1">{hl.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE SUPPORT DESK & CHAT BOX - RIGHT 7 CELLS */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
          
          {/* Upper Nav selectors */}
          <div className="bg-slate-900 text-white p-3.5 px-4 flex flex-wrap gap-2 items-center bg-radial from-slate-900 to-slate-950">
            <span className="text-xs font-extrabold uppercase text-blue-400 tracking-wider flex items-center gap-1 py-1 mr-2 border-r border-slate-800 pr-3.5 shrink-0">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse shrink-0" />
              {lang === 'en' ? 'Support Desks' : 'సహాయ డెస్క్‌లు'}
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'general', label: lang === 'en' ? 'Banking' : 'సాధారణం' },
                { id: 'pan', label: lang === 'en' ? 'PAN' : 'పాన్' },
                { id: 'aadhaar', label: lang === 'en' ? 'Aadhaar' : 'ఆధార్' },
                { id: 'atm', label: lang === 'en' ? 'ATM' : 'ఏటీఎం' },
                { id: 'upi', label: lang === 'en' ? 'UPI' : 'యుపిఐ' }
              ].map((desk) => (
                <button
                  key={desk.id}
                  id={`support-desk-btn-${desk.id}`}
                  onClick={() => handleDeskChange(desk.id as any)}
                  className={`text-4xs font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider cursor-pointer ${
                    selectedDesk === desk.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-350 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {desk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat transcript list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 flex flex-col">
            {chatLog.map((msg) => {
              const isAgent = msg.sender === 'deskAgent';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isAgent ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-7- h-7 w-7 h-7 rounded-full shrink-0 border flex items-center justify-center text-xs ${
                    isAgent ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-200 border-slate-355 border-slate-300 text-slate-700'
                  }`}>
                    {isAgent ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>

                  <div className={`p-3 rounded-xl text-xs sm:text-xs leading-relaxed shadow-3xs ${
                    isAgent 
                      ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-none font-sans' 
                      : 'bg-blue-600 text-white rounded-tr-none font-sans font-medium'
                  }`}>
                    <span>{msg.text}</span>
                    <div className={`text-[9px] mt-1.5 text-right ${isAgent ? 'text-slate-400' : 'text-blue-200'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {sendingSupport && (
              <div className="text-3xs font-bold text-slate-400 animate-pulse pl-10">
                Desk specialist is typing...
              </div>
            )}
          </div>

          {/* Form input messaging */}
          <form onSubmit={handleSupportMessageSend} className="p-3 border-t border-slate-200 flex gap-2">
            <input
              id="live-chat-input"
              type="text"
              placeholder={lang === 'en' ? "State your card problem or document inquiry..." : "మీ సమస్యను ఇక్కడ టైప్ చేయండి..."}
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-xs"
            />
            <button
              id="live-chat-submit"
              type="submit"
              disabled={sendingSupport || !typedMessage.trim()}
              className="px-4 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 font-semibold text-xs rounded-lg transition-all flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5 mr-1" />
              {lang === 'en' ? 'Send' : 'పంపండి'}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
