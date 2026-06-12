import React, { useState } from 'react';
import { TRANSLATIONS, BANKS } from '../data';
import { Language, TokenBooking as BookingType } from '../types';
import { User, QrCode, ClipboardList, CheckCircle, Clock, Trash2, ArrowUpRight, Award } from 'lucide-react';

interface DashboardProps {
  lang: Language;
  activeTokens: BookingType[];
  savedChecklists: { [key: string]: string[] };
  onCancelToken: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ lang, activeTokens, savedChecklists, onCancelToken, onNavigate }: DashboardProps) {
  const t = TRANSLATIONS[lang];

  // Manual simulation step to advance queue counters globally
  const [positionDecrementor, setPositionDecrementor] = useState<{ [key: string]: number }>({});

  const handleSimulateQueueAdvance = (id: string, currentPos: number) => {
    const currentAdjusted = positionDecrementor[id] !== undefined ? positionDecrementor[id] : currentPos;
    if (currentAdjusted <= 1) {
      alert(lang === 'en' ? "Your Token is already being called at Counter 2!" : "మీ టోకెన్ ప్రస్తుతం కౌంటర్ 2 లో పిలువబడుతోంది!");
      return;
    }
    setPositionDecrementor((prev) => ({
      ...prev,
      [id]: Math.max(1, currentAdjusted - 1)
    }));
  };

  // Compile checklist entries count
  const checklistEntries = Object.entries(savedChecklists).filter(([_, items]) => items.length > 0);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2 border-b border-slate-150 pb-4">
        <h1 className="text-3.5xl font-extrabold text-slate-900 tracking-tight font-sans">
          {t.welcomeBack}
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          {t.viewSavedTrans}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ACTIVE APPOINTMENT TOKENS - LEFT 7 CELLS */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-600" />
            {t.savedTokens}
            <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
              {activeTokens.length}
            </span>
          </h3>

          {activeTokens.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/60 text-slate-500 space-y-3">
              <p className="text-sm font-semibold">{t.noTokensYet}</p>
              <button
                id="dash-nav-booking-btn"
                onClick={() => onNavigate('token')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer"
              >
                {t.actionBookToken}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTokens.map((token) => {
                const matchedBank = BANKS.find(b => b.id === token.bankId);
                const bankLabel = lang === 'en' ? matchedBank?.name : matchedBank?.teluguName;
                const currentPos = positionDecrementor[token.id] !== undefined ? positionDecrementor[token.id] : token.positionInQueue;

                return (
                  <div
                    key={token.id}
                    id={`dash-token-card-${token.id}`}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row gap-5 hover:shadow-md transition-all justify-between"
                  >
                    <div className="space-y-3.5 flex-1">
                      {/* Ticket top row */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg bg-slate-50 p-1.5 rounded-lg border border-slate-100 shrink-0">
                          {matchedBank?.logo || '🏛️'}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-none">
                            {bankLabel}
                          </h4>
                          <span className="text-4xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                            {token.branchName}
                          </span>
                        </div>
                      </div>

                      {/* Details specs */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-slate-650 text-slate-600 font-sans border-t border-slate-50 pt-3">
                        <div>
                          <span className="text-4xs font-bold text-slate-400 uppercase tracking-widest block">Node Token</span>
                          <strong className="text-slate-800 font-mono text-xs">{token.tokenNumber}</strong>
                        </div>
                        <div>
                          <span className="text-4xs font-bold text-slate-400 uppercase tracking-widest block">Service Type</span>
                          <strong className="text-slate-800 line-clamp-1">{token.serviceType}</strong>
                        </div>
                        <div>
                          <span className="text-4xs font-bold text-slate-400 uppercase tracking-widest block">Date & Time</span>
                          <strong className="text-slate-800">{token.date} @ {token.timeSlot}</strong>
                        </div>
                        <div>
                          <span className="text-4xs font-bold text-slate-400 uppercase tracking-widest block">Queue Position</span>
                          {currentPos === 1 ? (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 text-3xs font-extrabold px-1.5 py-0.5 rounded">
                              {lang === 'en' ? 'Calling Now' : 'కౌంటర్‌కు వెళ్ళండి'}
                            </span>
                          ) : (
                            <strong className="text-blue-600 font-extrabold text-sm">{currentPos}</strong>
                          )}
                        </div>
                      </div>

                      {/* Interactive simulator queue step */}
                      {currentPos > 1 && (
                        <button
                          id={`adv-queue-${token.id}`}
                          onClick={() => handleSimulateQueueAdvance(token.id, token.positionInQueue)}
                          className="text-[10px] bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-600 font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          ⚡ {lang === 'en' ? 'Simulate Queue Position Advance' : 'క్యూ పొజిషన్ ముందుకు జరుపు సిమ్యులేషన్'}
                        </button>
                      )}
                    </div>

                    {/* QR Code and cancellation */}
                    <div className="flex flex-col justify-between items-center sm:items-end sm:border-l border-slate-150 sm:pl-5 shrink-0 gap-3">
                      <div className="text-center sm:text-right space-y-1">
                        <img
                          src={token.qrCodeUrl}
                          alt="Ticket QR Code"
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 bg-slate-50 p-1 border border-slate-100 rounded-lg shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = document.getElementById(`qr-fallback-${token.id}`);
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div
                          id={`qr-fallback-${token.id}`}
                          style={{ display: 'none' }}
                          className="w-20 h-20 border border-slate-200 bg-slate-100 flex-col items-center justify-center gap-0.5 rounded-lg"
                        >
                          <QrCode className="h-6 w-6 text-slate-500 animate-pulse" />
                          <span className="text-[9px] font-bold text-slate-500">QR READY</span>
                        </div>
                      </div>

                      <button
                        id={`cancel-token-${token.id}`}
                        onClick={() => {
                          if (confirm(lang === 'en' ? "Cancel this booked appoinment?" : "ఈ టోకెన్‌ను రద్దు చేయాలనుకుంటున్నారా?")) {
                            onCancelToken(token.id);
                          }
                        }}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {lang === 'en' ? 'Cancel Slot' : 'స్లాట్ రద్దు చేసుకోండి'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SAVED DOCUMENT CHECKLISTS - RIGHT 5 CELLS */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            {t.savedChecklists}
            <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-full">
              {checklistEntries.length}
            </span>
          </h3>

          {checklistEntries.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/60 text-slate-500 space-y-3">
              <p className="text-sm font-semibold">{t.noChecklistsYet}</p>
              <button
                id="dash-nav-doc-btn"
                onClick={() => onNavigate('documents')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer"
              >
                {lang === 'en' ? 'Explore Documents' : 'పత్రాల సమాచారం'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {checklistEntries.map(([docId, items]) => {
                // Find matching document name
                const docObj = lang === 'en' 
                  ? docId.toUpperCase().replace('-', ' ') 
                  : (docId.includes('pan') ? 'పాన్ వివరాలు' : 'ఆధార్ పత్రాలు');

                return (
                  <div
                    key={docId}
                    id={`saved-checklist-card-${docId}`}
                    className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight font-sans">
                        📂 {docObj}
                      </h4>
                      <span className="text-3xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full">
                        {items.length} {lang === 'en' ? 'Verified' : 'ధృవీకరించబడినవి'}
                      </span>
                    </div>

                    <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-2xs text-slate-600">
                          <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{it}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      id={`checklist-view-btn-${docId}`}
                      onClick={() => onNavigate('documents')}
                      className="text-3xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                    >
                      {lang === 'en' ? 'Add or Edit Checklist' : 'మార్చండి లేదా సవరించండి'}
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* CITIZEN SUPPORT DIRECT ACTION WINDOW */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-4 shadow-xl select-none">
            <h4 className="text-xs font-extrabold uppercase text-blue-400 tracking-wide">
              🌟 Citizen Service Assurance
            </h4>
            <p className="text-3xs text-slate-400 leading-relaxed font-sans">
              All appointments and document checks created on this node are stored locally inside the sandbox. No credentials metadata list can leak into physical registries.
            </p>
            <div className="flex gap-2 justify-between items-center border-t border-slate-800 pt-3 text-xs">
              <span>Security Level</span>
              <span className="font-extrabold text-emerald-400 font-mono">SECURE AES-256</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
