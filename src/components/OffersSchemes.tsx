import React, { useState } from 'react';
import { OFFERS, TRANSLATIONS, BANKS } from '../data';
import { Language, Offer } from '../types';
import { TrendingUp, Percent, Award, Shield, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface OffersSchemesProps {
  lang: Language;
}

export default function OffersSchemes({ lang }: OffersSchemesProps) {
  const t = TRANSLATIONS[lang];
  const [selectedOfferCategory, setSelectedOfferCategory] = useState<string>('all');
  const [selectedInquiryOffer, setSelectedInquiryOffer] = useState<Offer | null>(null);
  
  const filteredOffers = OFFERS.filter((off) => {
    return selectedOfferCategory === 'all' || off.category === selectedOfferCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fd': return <Percent className="h-4.5 w-4.5 text-emerald-600" />;
      case 'card': return <Award className="h-4.5 w-4.5 text-blue-600" />;
      case 'loan': return <TrendingUp className="h-4.5 w-4.5 text-amber-600" />;
      default: return <Shield className="h-4.5 w-4.5 text-purple-600" />;
    }
  };

  const categories = [
    { id: 'all', title: t.categoryAll },
    { id: 'fd', title: t.categoryFd },
    { id: 'card', title: t.categoryCard },
    { id: 'loan', title: t.categoryLoan },
    { id: 'scheme', title: t.categoryScheme }
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {t.offersTitle}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {t.offersDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* CATEGORIES NAVIGATION BAR SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {lang === 'en' ? 'Offer Verticals' : 'పథకాల రకాలు'}
            </h3>
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`offer-cat-${cat.id}`}
                onClick={() => setSelectedOfferCategory(cat.id)}
                className={`w-full text-left font-sans font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                  selectedOfferCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* OFFERS PRESENTATION CARDS */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((off) => {
              const matchedBankName = BANKS.find(b => b.id === off.bankId)?.name || 'Multi-Bank authorized';
              const matchedBankLogo = BANKS.find(b => b.id === off.bankId)?.logo || '🏛️';
              const title = lang === 'en' ? off.title : off.titleTelugu;
              const desc = lang === 'en' ? off.description : off.descriptionTelugu;

              return (
                <div
                  key={off.id}
                  id={`offer-card-${off.id}`}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
                >
                  <div className="space-y-4">
                    {/* Upper layout tags */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{matchedBankLogo}</span>
                        <span className="text-xs font-bold text-slate-500 line-clamp-1">{matchedBankName}</span>
                      </div>
                      {off.tag && (
                        <span className="bg-blue-50 border border-blue-100 text-blue-700 text-4xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {off.tag}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-slate-950 text-base leading-snug group-hover:text-blue-600 transition-colors">
                        {title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Pricing terms bar helper */}
                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                    <div>
                      {off.rate && (
                        <>
                          <span className="text-4xs font-bold text-slate-400 uppercase tracking-widest block">
                            {lang === 'en' ? 'Interest Benefit' : 'ప్రధాన వడ్డీ ప్రయోజనం'}
                          </span>
                          <span className="text-sm font-extrabold text-slate-900 font-mono">{off.rate}</span>
                        </>
                      )}
                    </div>
                    <button
                      id={`inq-btn-${off.id}`}
                      onClick={() => setSelectedInquiryOffer(off)}
                      className="p-2 px-3.5 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-blue-600 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {t.applyNowBtn}
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DYNAMIC INQUIRY CONSOLE PANEL MODAL SIMULATION */}
      {selectedInquiryOffer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-250 p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-scale-up">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-800 text-2xs font-extrabold px-3 py-1 rounded-full uppercase">
                {getCategoryIcon(selectedInquiryOffer.category)}
                {selectedInquiryOffer.category.toUpperCase()} OFFER MODEL
              </div>
              <h3 className="font-sans font-extrabold text-slate-950 text-xl leading-snug">
                {lang === 'en' ? selectedInquiryOffer.title : selectedInquiryOffer.titleTelugu}
              </h3>
            </div>

            <p className="text-slate-655 text-slate-650 text-sm leading-relaxed border-l-4 border-blue-600 bg-slate-50 p-4 rounded-r-xl">
              {lang === 'en' ? selectedInquiryOffer.description : selectedInquiryOffer.descriptionTelugu}
            </p>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
              <h5 className="font-bold text-slate-800 uppercase tracking-wide">
                📌 {lang === 'en' ? 'Instructions for Accessing this scheme:' : 'ఈ పథకాన్ని పొందడానికి కావలసినవి:'}
              </h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {selectedInquiryOffer.category === 'fd' ? (
                  <>
                    <li>{lang === 'en' ? 'Aadhaar Card copy & physical original verification' : 'ఆధార్ కార్డ్ కాపీ & ఒరిజినల్ వెరిఫికేషన్'}</li>
                    <li>{lang === 'en' ? 'PAN Card representation certificate' : 'పాన్ కార్డ్ ధృవీకరణ పత్రం'}</li>
                    <li>{lang === 'en' ? 'Minimum FD deposit checks starting at 10,000 INR' : 'కనిష్ట డిపాజిట్ రూ. 10,000 నుండి ప్రారంభం'}</li>
                  </>
                ) : (
                  <>
                    <li>{lang === 'en' ? 'Active branch savings account linked with mobile' : 'మొబైల్ నంబర్ లింక్ అయిన సేవింగ్స్ ఖాతా'}</li>
                    <li>{lang === 'en' ? 'Official residential authorization proofs' : 'నివాస ధృవీకరణ పత్రాలు'}</li>
                    <li>{lang === 'en' ? 'Fill official scheme form at nearest branch counters' : 'దగ్గరిలోని బ్రాంచ్‌లో దరఖాస్తు ఫారమ్ నింపాలి'}</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                id="close-inq-btn"
                onClick={() => setSelectedInquiryOffer(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                {lang === 'en' ? 'Close Window' : 'విండో మూసివేయి'}
              </button>
              <button
                id="modal-apply-btn"
                onClick={() => {
                  alert(lang === 'en' ? "Please book a branch appointment token under standard Account Opening service to enable this scheme prompt." : "దయచేసి ఈ పథకాన్ని ఎన్రోల్ చేయడానికి 'కొత్త బ్యాంక్ ఖాతా' లేదా సంప్రదింపుల టోకెన్ బుక్ చేయండి.");
                  setSelectedInquiryOffer(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                {lang === 'en' ? 'Proceed at Branch' : 'బ్రాంచ్‌లో దరఖాస్తు చేయండి'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
