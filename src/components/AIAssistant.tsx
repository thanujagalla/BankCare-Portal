import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Bot, Send, Mic, Volume2, Globe, Sparkles, RefreshCw, AlertTriangle, User } from 'lucide-react';

interface AIAssistantProps {
  lang: Language;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function AIAssistant({ lang }: AIAssistantProps) {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  // Web Speech API Voice States
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load custom onboarding messages
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        content: lang === 'en' 
          ? "Hello! I am your BankCare AI Clerk. You can ask me anything about PAN cards, Aadhaar updates, HDFC or SBI branch timings, loan schemes, or ATM registrations in Telugu or English. How can I help you today?"
          : "నమస్కారం! నేను మీ బ్యాంక్‌కేర్ AI అసిస్టెంట్‌ను. మీరు నన్ను పాన్ కార్డ్, ఆధార్ వివరాల అప్‌డేట్, ఎస్‌బీఐ బ్యాంక్ పనివేళలు లేదా లోన్ పథకాల గురించి తెలుగు లేదా ఇంగ్లీషులో అడగవచ్చు. మీకు ఏ సమాచారం కావాలి?",
        timestamp: new Date()
      }
    ]);
  }, [lang]);

  // Handle scrolling of chatbot
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      // Build history payload for server-side state
      const history = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          language: lang,
          history: history
        })
      });

      if (!res.ok) {
        throw new Error("Server communication node timed out.");
      }

      const backendData = await res.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'bot',
        content: backendData.response || "I am processing. Please hold on.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error("Chat error:", err);
      // Fallback local response directly to maintain flawless user journey
      const fallbackText = lang === 'en'
        ? "I apologize. I currently encountered a minor server-side connection lapse. However, you can read detailed procedural files on required identity certificates directly in our **Documents Center** above."
        : "క్షమించండి, సర్వర్ కనెక్షన్‌లో చిన్న అంతరాయం ఏర్పడింది. దయచేసి వివరాల కోసం పైన ఉన్న 'పత్రాల సమాచారం' విభాగంలో పూర్తి సమాచారాన్ని సరిచూసుకోండి.";

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'bot',
          content: fallbackText,
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Web Speech Recognition handler (Safe boundary checks)
  const toggleSpeechListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechError(true);
      setTimeout(() => setSpeechError(false), 4050);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onerror = (e: any) => {
      console.warn("Speech recognition error:", e);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onresult = (event: any) => {
      const parsedText = event.results[0][0].transcript;
      setInputVal(parsedText);
    };

    if (isListening) {
      rec.stop();
      setIsListening(false);
    } else {
      rec.start();
    }
  };

  const handleSuggestClick = (q: string) => {
    handleSendMessage(q);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* HEADER */}
      <div className="space-y-1.5 text-center">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans flex items-center justify-center gap-2">
          <Bot className="h-8 w-8 text-blue-600 animate-bounce" />
          {t.aiHeading}
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          {t.aiSub}
        </p>
      </div>

      {/* CHAT WINDOW BOX - GLASS DESIGN */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[520px]">
        
        {/* UPPER STATUS STRIP */}
        <div className="bg-slate-900 text-white p-4 px-6 flex justify-between items-center bg-radial from-slate-900 to-slate-950">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
              UBS Secure Assistant (Gemini Flash Model)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-2xs font-semibold">
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span>Mode: {lang === 'te' ? 'తెలుగు' : 'English'}</span>
          </div>
        </div>

        {/* MESSAGES LIST PANEL */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((m) => {
            const isBot = m.role === 'bot';
            return (
              <div
                key={m.id}
                className={`flex gap-3.5 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Visual Icon nodes */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  isBot ? 'bg-blue-600 border-blue-500 text-white font-bold' : 'bg-slate-200 border-slate-300 text-slate-700'
                }`}>
                  {isBot ? <Bot className="h-4.5 w-4.5 text-white" /> : <User className="h-4.5 w-4.5" />}
                </div>

                {/* Message bubble core */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isBot 
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none font-sans' 
                    : 'bg-blue-600 text-white rounded-tr-none font-sans font-medium'
                }`}>
                  {/* Handle newline conversions properly */}
                  {m.content.split('\n').map((line, lid) => {
                    // Primitive markup checker for bullet formatting
                    const isBullet = line.startsWith('•') || line.startsWith('*') || line.startsWith('-');
                    const cleanedLine = isBullet ? line.replace(/^[•\*\-]\s+/, '') : line;
                    
                    return (
                      <p key={lid} className={`${isBullet ? 'pl-4 relative before:content-["•"] before:absolute before:left-1 before:text-blue-500' : ''} ${lid > 0 ? 'mt-1.5' : ''}`}>
                        {cleanedLine}
                      </p>
                    );
                  })}
                  <div className={`text-[10px] mt-2 text-right ${isBot ? 'text-slate-400' : 'text-blue-200'}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center animate-spin">
                <RefreshCw className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-2xs font-extrabold text-blue-600 tracking-wider uppercase animate-pulse">
                Scribing guidelines...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT & VOICE PANEL ACTIONS */}
        <div className="bg-white border-t border-slate-200 p-4 space-y-3">
          
          {/* Speech notifications warnings */}
          {speechError && (
            <div className="p-2 bg-amber-50 border border-amber-200 text-amber-800 text-3xs font-semibold rounded-lg flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0" />
              <span>{t.micNotSupported}</span>
            </div>
          )}

          {isListening && (
            <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-800 text-3xs font-semibold rounded-lg flex items-center gap-2 animate-pulse justify-center">
              <span className="h-2 w-2 rounded-full bg-red-600 inline-block animate-ping mr-1" />
              <span>{t.micListening}</span>
            </div>
          )}

          <div className="flex gap-2 relative">
            
            {/* Speech mic toggle */}
            <button
              id="chatbot-mic-toggle-btn"
              onClick={toggleSpeechListen}
              title={t.micIdle}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isListening 
                  ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500'
              }`}
            >
              <Mic className="h-5 w-5" />
            </button>

            <input
              id="chatbot-text-input"
              type="text"
              placeholder={lang === 'en' ? "Ask about PAN documents, timing, ATM..." : "పాన్, ఏటీఎం, లేదా సెలవుల గురించి అడగండి..."}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputVal.trim()) {
                  handleSendMessage(inputVal);
                }
              }}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm"
            />

            <button
              id="chatbot-submit-btn"
              onClick={() => handleSendMessage(inputVal)}
              disabled={!inputVal.trim() || loading}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Suggested Queries row */}
          <div className="pt-1.5 flex flex-wrap items-center gap-2">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">
              💡 {lang === 'en' ? 'Quick suggestions:' : 'సూచనలు:'}
            </span>
            {[
              { text: t.suggestedQ1, label: lang === 'en' ? 'PAN checks' : 'పాన్ పత్రాలు' },
              { text: t.suggestedQ2, label: lang === 'en' ? 'Aadhaar update' : 'ఆధార్ సవరణ' },
              { text: t.suggestedQ3, label: lang === 'en' ? 'Mobile change' : 'మొబైల్ మార్పు' },
              { text: t.suggestedQ4, label: lang === 'en' ? 'SBI details' : 'ఎస్‌బీఐ వివరాలు' }
            ].map((sug, i) => (
              <button
                key={i}
                id={`sug-query-${i}`}
                onClick={() => handleSuggestClick(sug.text)}
                className="text-3xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-slate-600 font-semibold px-2.5 py-1 rounded-md transition-all cursor-pointer"
              >
                {sug.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
