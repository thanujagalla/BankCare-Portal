import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Search, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Zap, Laptop, Globe } from 'lucide-react';

interface HomeHeroProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onSearchQuery: (query: string) => void;
  onSelectActionService: (serviceId: string) => void;
}

export default function HomeHero({ lang, onNavigate, onSearchQuery, onSelectActionService }: HomeHeroProps) {
  const t = TRANSLATIONS[lang];
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onSearchQuery(localSearch);
      onNavigate('documents');
    }
  };

  const actions = [
    { id: 'pan-apply', title: t.applyPan, color: 'border-blue-100 hover:border-blue-300 bg-blue-50/40 text-blue-900', icon: '💳' },
    { id: 'aadhaar-enroll', title: t.applyAadhaar, color: 'border-emerald-100 hover:border-emerald-300 bg-emerald-50/40 text-emerald-900', icon: '📝' },
    { id: 'bank-open', title: t.openAccount, color: 'border-sky-100 hover:border-sky-300 bg-sky-50/40 text-sky-900', icon: '🏛️' },
    { id: 'atm-apply', title: t.applyAtm, color: 'border-amber-100 hover:border-amber-300 bg-amber-50/40 text-amber-900', icon: '🏧' },
    { id: 'bank-update', title: t.updateMobile, color: 'border-purple-100 hover:border-purple-300 bg-purple-50/40 text-purple-900', icon: '📱' },
    { id: 'upi-link', title: t.linkUpi, color: 'border-rose-100 hover:border-rose-300 bg-rose-50/40 text-rose-900', icon: '⚡' },
    { id: 'atm-pin', title: t.pinGeneration, color: 'border-indigo-100 hover:border-indigo-300 bg-indigo-50/40 text-indigo-900', icon: '🔒' },
    { id: 'token-booking', title: t.actionBookToken, color: 'border-cyan-100 hover:border-cyan-300 bg-cyan-50/40 text-cyan-900', icon: '🎟️' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-slate-50 to-slate-100 border border-slate-200/60 p-8 sm:p-12 lg:p-16">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-blue-50/80 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-cyan-50 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            {t.brandSub}
          </div>

          <h1 className="text-3.5xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-sans leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {t.heroDesc}
          </p>

          {/* Core Search Node */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative mt-4">
            <div className="relative">
              <input
                id="doc-search"
                type="text"
                placeholder={t.searchPlaceholder}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-5 pr-32 py-4 rounded-2xl bg-white border border-slate-300 shadow-lg shadow-slate-200/50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-slate-800 transition-all text-sm sm:text-base"
              />
              <button
                id="submit-search-btn"
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 rounded-xl transition-all flex items-center gap-1 text-xs sm:text-sm shadow-md"
              >
                <Search className="h-4 w-4" />
                {t.searchButton}
              </button>
            </div>
          </form>

          {/* Quick Action Bento Layout */}
          <div className="pt-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-4">
              ✨ {t.quickActions}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {actions.map((act) => (
                <button
                  key={act.id}
                  id={`action-${act.id}`}
                  onClick={() => {
                    if (act.id === 'token-booking') {
                      onNavigate('token');
                    } else {
                      onSelectActionService(act.id);
                      onNavigate('documents');
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center font-sans font-semibold text-xs sm:text-sm shadow-xs transition-all hover:translate-y-[-2px] hover:shadow-md cursor-pointer ${act.color}`}
                >
                  <span className="text-2xl mb-1">{act.icon}</span>
                  <span className="line-clamp-2 leading-tight">{act.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { key: 'stat1', val: '12+', text: t.statBanks, bg: 'bg-blue-500', icon: <Laptop className="h-5 w-5 text-blue-600" /> },
          { key: 'stat2', val: '50,000+', text: t.statVisitors, bg: 'bg-emerald-500', icon: <Globe className="h-5 w-5 text-emerald-600" /> },
          { key: 'stat3', val: '10,000+', text: t.statTokens, bg: 'bg-cyan-500', icon: <Zap className="h-5 w-5 text-cyan-600" /> },
          { key: 'stat4', val: '99.4%', text: t.statSatis, bg: 'bg-amber-500', icon: <ShieldCheck className="h-5 w-5 text-amber-600" /> },
        ].map((stat, i) => (
          <div
            key={stat.key}
            id={`stat-card-${i}`}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all"
          >
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                {stat.val}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                {stat.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. LATEST UPDATES NOTIFICATION TICKER */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <strong className="font-semibold text-blue-900 tracking-wide uppercase mr-2">
            📢 {lang === 'en' ? 'RBI Guideline Notice:' : 'ఆర్బీఐ అధికారిక నోటీసు:'}
          </strong>
          {lang === 'en' 
            ? 'All public and private sector bank branches must accept valid bio-metric details via authorized Aadhaar Seva Kendras for prompt KYC update requests under Section 45-B.'
            : 'సెక్షన్ 45-బి కింద పొదుపు ఖాతాల కేవైసీ (KYC) పునఃప్రమాణీకరణ కోసం అన్ని ప్రభుత్వ మరియు ప్రైవేటు బ్యాంకులు ఆధార్ వేలిముద్రలను ధృవీకరించుకోవాలి.'}
        </div>
      </div>

      {/* 4. KEY FEATURES INFO GRID */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
            {t.featureTitle}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            {t.featureSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'f_docs', title: t.feature1Title, desc: t.feature1Desc, icon: '📂', link: 'documents' },
            { id: 'f_tokens', title: t.feature2Title, desc: t.feature2Desc, icon: '🎫', link: 'token' },
            { id: 'f_ai', title: t.feature3Title, desc: t.feature3Desc, icon: '🤖', link: 'ai' },
            { id: 'f_multi', title: t.feature4Title, desc: t.feature4Desc, icon: '🗣️', link: 'home' },
          ].map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-lg hover:shadow-slate-100 transition-all group"
            >
              <div>
                <div className="text-3xl mb-4 bg-slate-50 border border-slate-100 w-12 h-12 flex items-center justify-center rounded-xl">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {item.link !== 'home' && (
                <button
                  id={`btn-${item.id}`}
                  onClick={() => onNavigate(item.link)}
                  className="mt-6 font-sans font-semibold text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  {lang === 'en' ? 'Explore Tool' : 'సాధనాన్ని శోధించండి'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. TESTIMONIALS */}
      <div className="border-t border-slate-200/80 pt-12 space-y-6">
        <h3 className="text-center font-sans text-xl font-bold text-slate-800">
          ⭐ {lang === 'en' ? 'Trusted by Indian Citizens' : 'వినియోగదారుల అభిప్రాయం'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              id: 't1',
              name: "Srinivas Rao (Anantapur)",
              text: lang === 'en' 
                ? "This portal helped me verify everything I needed to link PhonePe with my APGVB rural bank account. Saved me three trips to the town branch!"
                : "నా ఏపీజీవీబీ (APGVB) గ్రామీణ ఖాతాకు ఫోన్‌పే లింక్ చేయడానికి ఏ డాక్యుమెంట్లు కావాలో తెలుసుకోవడానికి ఈ పోర్టల్ చాలా ఉపయోగపడింది. చాలా సమయం ఆదా అయింది!",
              role: "Farmer / Self Employed"
            },
            {
              id: 't2',
              name: "Devaki Nair (Hyderabad)",
              text: lang === 'en' 
                ? "Generating the ATM PIN and booking the State Bank token online was completely seamless. Outstanding, clean design in both Telugu and English."
                : "స్టేట్ బ్యాంక్ అపాయింట్మెంట్ టోకెన్ మరియు ఏటీఎం పిన్ జనరేషన్ వివరాలు ఇక్కడ చాలా స్పష్టంగా ఉన్నాయి. తెలుగులో సమాచారం ఉండడం అద్భుతం.",
              role: "Retired School Teacher"
            }
          ].map((tItem) => (
            <div key={tItem.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 italic font-sans text-slate-600 text-sm leading-relaxed relative">
              <span className="text-4xl text-blue-200 font-serif absolute -top-2 left-3">“</span>
              <p className="relative z-10 pl-4">{tItem.text}</p>
              <div className="mt-4 not-italic font-sans pl-4">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">{tItem.name}</h5>
                <span className="text-xs text-slate-400 font-medium">{tItem.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
