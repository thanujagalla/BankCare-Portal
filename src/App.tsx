import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './data';
import { Language, TokenBooking as BookingType } from './types';
import HomeHero from './components/HomeHero';
import DocCenter from './components/DocCenter';
import BankDirectory from './components/BankDirectory';
import TokenBooking from './components/TokenBooking';
import HolidaysCalendar from './components/HolidaysCalendar';
import OffersSchemes from './components/OffersSchemes';
import AIAssistant from './components/AIAssistant';
import CustomerSupport from './components/CustomerSupport';
import ContactSection from './components/ContactSection';
import Dashboard from './components/Dashboard';
import { Landmark, Globe, User, Bell, Building2, Calendar, Phone, Shield, Cpu, ChevronRight } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Shared persistable states
  const [activeTokens, setActiveTokens] = useState<BookingType[]>([]);
  const [savedChecklists, setSavedChecklists] = useState<{ [key: string]: string[] }>({});

  // Cross-component filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActionService, setSelectedActionService] = useState('');

  const t = TRANSLATIONS[lang];

  // Load mocks initially
  useEffect(() => {
    // Initial static placeholder or empty state
  }, []);

  const handleBookToken = (newToken: BookingType) => {
    setActiveTokens((prev) => [newToken, ...prev]);
  };

  const handleCancelToken = (id: string) => {
    setActiveTokens((prev) => prev.filter(t => t.id !== id));
  };

  const handleChecklistUpdate = (id: string, list: string[]) => {
    setSavedChecklists((prev) => ({
      ...prev,
      [id]: list
    }));
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  // Navigations dispatcher
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeHero
            lang={lang}
            onNavigate={setCurrentTab}
            onSearchQuery={setSearchQuery}
            onSelectActionService={setSelectedActionService}
          />
        );
      case 'documents':
        return (
          <DocCenter
            lang={lang}
            searchQuery={searchQuery}
            selectedActionService={selectedActionService}
            onChecklistUpdate={handleChecklistUpdate}
            savedChecklists={savedChecklists}
          />
        );
      case 'banks':
        return <BankDirectory lang={lang} onNavigate={setCurrentTab} />;
      case 'token':
        return <TokenBooking lang={lang} onBookToken={handleBookToken} activeTokens={activeTokens} />;
      case 'holidays':
        return <HolidaysCalendar lang={lang} />;
      case 'offers':
        return <OffersSchemes lang={lang} />;
      case 'ai':
        return <AIAssistant lang={lang} />;
      case 'support':
        return <CustomerSupport lang={lang} />;
      case 'contact':
        return <ContactSection lang={lang} />;
      case 'dashboard':
        return (
          <Dashboard
            lang={lang}
            activeTokens={activeTokens}
            savedChecklists={savedChecklists}
            onCancelToken={handleCancelToken}
            onNavigate={setCurrentTab}
          />
        );
      default:
        return (
          <HomeHero
            lang={lang}
            onNavigate={setCurrentTab}
            onSearchQuery={setSearchQuery}
            onSelectActionService={setSelectedActionService}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans Selection:bg-blue-600 Selection:text-white">
      
      {/* SECURITY EMERGENCY TICKER ALERT LINE */}
      <div className="bg-blue-900 text-white py-2 text-[11px] font-semibold text-center select-none overflow-hidden relative border-b border-blue-800 flex items-center justify-center gap-2">
        <span className="bg-red-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase animate-pulse shrink-0">
          {lang === 'en' ? 'TICKER' : 'సమాచారం'}
        </span>
        <div className="line-clamp-1 truncate px-4">
          📢 {lang === 'en' 
            ? 'KYC Deadline extension! Indian post payments and APGVB updates KYC frameworks until end of current cycle. | Security alert: Never disclose OTPs or ATM Pin variables to banks representatives.' 
            : 'కేవైసీ గడువు పెంపుదల! ఏపీజీవీబీ మాతృ సంఘాల కేవైసీ నిబంధనలు సవరించబడ్డాయి. | భద్రతా సూచిక: మీ ఏటీఎం పిన్ లేదా ఓటీపీ ఖాతాల వివరాలు బ్యాంకు ఉద్యోగులతో పంచుకోవద్దు.'}
        </div>
      </div>

      {/* STICKY MAIN HEADER LAYOUT */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* LOGO LINK */}
          <button
            id="brand-logo-btn"
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer transition-transform duration-100 active:scale-98"
          >
            <span className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
              <Landmark className="h-5 w-5" />
            </span>
            <div>
              <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight font-sans block leading-none">
                {t.brandName}
              </span>
              <span className="text-[10px] text-slate-450 text-slate-400 font-semibold tracking-wide uppercase">
                {t.brandSub}
              </span>
            </div>
          </button>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            
            {/* Quick dashboard trigger with badge counter */}
            <button
              id="header-nav-dashboard-btn"
              onClick={() => setCurrentTab('dashboard')}
              className={`p-2 rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <User className="h-4.5 w-4.5 shrink-0" />
              <span className="text-2xs font-extrabold tracking-wide uppercase hidden sm:inline-block">
                {lang === 'en' ? 'My Hub' : 'నా డ్యాష్‌బోర్డ్'}
              </span>
              {activeTokens.length > 0 && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600 shrink-0" />
              )}
            </button>

            {/* Language Selection Toggle */}
            <button
              id="header-lang-toggle-btn"
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-750 text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Globe className="h-4 w-4 text-blue-600 shrink-0" />
              <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

          </div>

        </div>

        {/* BOTTOM HORIZONTAL MAIN TABS RAIL */}
        <div className="bg-slate-50 border-t border-slate-150 py-1 flex overflow-x-auto scrollbar-none justify-start md:justify-center">
          <nav className="flex px-4 gap-1.5 md:gap-3 shrink-0">
            {[
              { id: 'home', label: lang === 'en' ? 'Overview' : 'ప్రధాన పేజీ' },
              { id: 'documents', label: lang === 'en' ? 'Documents Checklist' : 'పత్రాల సమాచారం' },
              { id: 'banks', label: lang === 'en' ? 'Bank Profiles' : 'బ్యాంకులు' },
              { id: 'token', label: lang === 'en' ? 'Book Appointment' : 'టోకెన్ బుకింగ్' },
              { id: 'holidays', label: lang === 'en' ? 'Holidays List' : 'సెలవుల పట్టిక' },
              { id: 'offers', label: lang === 'en' ? 'Incentives & Schemes' : 'పథకాలు' },
              { id: 'ai', label: lang === 'en' ? 'AI Assistant' : 'వ్యక్తిగత సహాయకుడు' },
              { id: 'support', label: lang === 'en' ? 'Support Desk' : 'కస్టమర్ సపోర్ట్' },
              { id: 'contact', label: lang === 'en' ? 'Contact Us' : 'సంప్రదించండి' }
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`bottom-nav-tab-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all uppercase shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-905 hover:bg-slate-150 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* DYNAMIC CARDS LAYOUT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {renderTabContent()}
      </main>

      {/* FOOTER STATS & SECURITY PROTOCOL SIGN OFF */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
              <Landmark className="h-5 w-5 text-blue-400" />
              BankCare Portal
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Providing modern, secure, and hassle-free central directory layouts for 11+ Indian public and private banking nodes. Fully integrated with official UIDAI guidelines and NSDL checklists.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              {lang === 'en' ? 'Citizen Security' : 'పౌర భద్రత'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              All token schedules and simulated file scanner OCR progress remain entirely client-side. We strictly comply with general banking privacy statutes and reserve bank policy indicators.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-400" />
              System Services
            </h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-sans">
              <div>📍 Directorate Center: Hyderabad Rural Hub, India</div>
              <div>⚡ Dynamic Model: Gemini Flash API</div>
              <div>💬 Supported Speech: English (India), Telugu</div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between text-3xs font-semibold uppercase tracking-wider text-slate-500 gap-4">
          <span>© 2026 BankCare Portal. All respective bank brand trademarks belong to statutory owners.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-400">Terms of Use</a>
            <a href="#ombudsman" className="hover:text-blue-400">RBI Ombudsman</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
