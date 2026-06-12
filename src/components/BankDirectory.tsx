import React, { useState } from 'react';
import { BANKS, TRANSLATIONS, BRANCHES } from '../data';
import { Language, Bank } from '../types';
import { Search, MapPin, Phone, Globe, ExternalLink, SlidersHorizontal, Sparkles } from 'lucide-react';

interface BankDirectoryProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export default function BankDirectory({ lang, onNavigate }: BankDirectoryProps) {
  const t = TRANSLATIONS[lang];
  const [searchBankQuery, setSearchBankQuery] = useState('');

  // IFSC search states
  const [selectedIfscBank, setSelectedIfscBank] = useState('sbi');
  const [selectedIfscBranch, setSelectedIfscBranch] = useState('');
  const [computedIfsc, setComputedIfsc] = useState('');

  const filteredBanks = BANKS.filter((bank) => {
    return lang === 'en'
      ? bank.name.toLowerCase().includes(searchBankQuery.toLowerCase())
      : bank.teluguName.includes(searchBankQuery) || bank.name.toLowerCase().includes(searchBankQuery.toLowerCase());
  });

  const handleBranchSelect = (branch: string) => {
    setSelectedIfscBranch(branch);
    if (!branch) {
      setComputedIfsc('');
      return;
    }
    // Compute simple deterministic IFSC for simulated experience
    const bankObj = BANKS.find(b => b.id === selectedIfscBank);
    if (bankObj) {
      const code = Math.abs(branch.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 99999);
      const paddedCode = String(code).padStart(5, '0');
      setComputedIfsc(`${bankObj.ifscPrefix}0${paddedCode}`);
    }
  };

  const handleBankChangeForIfsc = (bankId: string) => {
    setSelectedIfscBank(bankId);
    setSelectedIfscBranch('');
    setComputedIfsc('');
  };

  return (
    <div className="space-y-8">
      {/* HEADER TITLE */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {t.bankDirTitle}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {t.bankDirDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COMPONENT COLUMN - IFSC FINDER */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-5 shadow-xs">
            <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              {t.ifscSearchTitle}
            </h3>

            {/* Select Bank */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                {t.selectBankPrompt}:
              </label>
              <select
                id="ifsc-bank-select"
                value={selectedIfscBank}
                onChange={(e) => handleBankChangeForIfsc(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              >
                {BANKS.map((b) => (
                  <option key={b.id} value={b.id}>{lang === 'en' ? b.name : b.teluguName}</option>
                ))}
              </select>
            </div>

            {/* Select Branch */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                {t.selectBranchPrompt}:
              </label>
              <select
                id="ifsc-branch-select"
                value={selectedIfscBranch}
                onChange={(e) => handleBranchSelect(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              >
                <option value="">-- {lang === 'en' ? 'Select Branch Location' : 'బ్రాంచ్‌ని ఎంచుకోండి'} --</option>
                {(BRANCHES[selectedIfscBank] || ["Main Branch Center", "Southern Circle Extension", "City Zone hub"]).map((branch, idx) => (
                  <option key={idx} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Compiled IFSC results */}
            {computedIfsc && (
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1.5 text-center">
                <div className="text-2xs font-bold text-blue-800 uppercase tracking-wider">
                  {t.ifscResult}
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono tracking-widest">
                  {computedIfsc}
                </div>
                <p className="text-3xs text-slate-405 text-slate-400 font-medium italic">
                  *Official standard Indian Financial System Code for NEFT, IMPS or RTGS.
                </p>
              </div>
            )}
          </div>

          {/* QUICK TELEPHONE COMPACT BOX */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
            <h4 className="font-sans font-extrabold text-sm uppercase tracking-wider text-blue-400">
              ⚡ {lang === 'en' ? 'Emergency Card Block' : 'ఏటీఎం కార్డుల బ్లాకింగ్'}
            </h4>
            <p className="text-xs text-slate-350 text-slate-300 leading-normal">
              {lang === 'en' 
                ? 'Lost your ATM card? Prevent digital fraud instantly. Trigger emergency banking block by routing toll-free dials.'
                : 'మీ ఏటీఎం కార్డు పోయిందా? అక్రమ లావాదేవీలను అరికట్టడానికి వెంటనే క్రింది నంబర్‌లో కాల్ చేసి బ్లాక్ చేయించండి.'}
            </p>
            <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-2xs text-slate-400 uppercase font-bold tracking-wide">National block line</div>
                <a href="tel:1800112211" className="text-base font-extrabold hover:text-blue-300 transition-colors">1800-11-2211</a>
              </div>
              <Phone className="h-5 w-5 text-blue-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - BANKS CARDS LAYOUT */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SEARCH BAR FOR DIRECTORY */}
          <div className="relative">
            <input
              id="directory-search-input"
              type="text"
              placeholder={t.searchBank}
              value={searchBankQuery}
              onChange={(e) => setSearchBankQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm text-slate-800"
            />
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBanks.map((bank) => {
              const hours = lang === 'en' ? bank.workingHours : bank.workingHoursTelugu;
              const name = lang === 'en' ? bank.name : bank.teluguName;

              return (
                <div
                  key={bank.id}
                  id={`bank-dir-card-${bank.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all border-l-4 hover:border-l-blue-600 hover:translate-y-[-1px]"
                >
                  <div className="space-y-4">
                    {/* Head row */}
                    <div className="flex gap-3.5 items-start">
                      <span className="text-3xl bg-slate-50 border border-slate-100 p-2 rounded-xl flex items-center justify-center">
                        {bank.logo}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-sans tracking-tight leading-tight">
                          {name}
                        </h4>
                        <span className="text-3xs font-semibold text-slate-405 text-slate-400 uppercase tracking-widest font-sans">
                          IFSC Node Prefix: {bank.ifscPrefix}
                        </span>
                      </div>
                    </div>

                    {/* Meta info details */}
                    <div className="space-y-2 pt-2 text-xs text-slate-600 font-sans border-t border-slate-50">
                      
                      {/* Hours */}
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-slate-400 mt-0.5 shrink-0 uppercase text-3xs tracking-widest w-20">
                          {t.workingHoursLabel}
                        </span>
                        <span className="leading-relaxed text-slate-705 font-medium">{hours}</span>
                      </div>

                      {/* Customer Dials */}
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-slate-400 mt-0.5 shrink-0 uppercase text-3xs tracking-widest w-20">
                          {lang === 'en' ? 'Helpline' : 'హెల్ప్‌లైన్'}
                        </span>
                        <span className="font-semibold text-slate-900">{bank.customerCare}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer row */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap gap-2.5 justify-between">
                    
                    {/* Official branch locator Map link */}
                    <a
                      href={bank.branchLocatorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-2xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      <MapPin className="h-3 w-3" />
                      {t.branchLocatorLabel}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>

                    {/* Official home address */}
                    <a
                      href={bank.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-2xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Globe className="h-3 w-3" />
                      {t.officialWebsiteLabel}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
