import React, { useState } from 'react';
import { HOLIDAYS, TRANSLATIONS } from '../data';
import { Language, Holiday } from '../types';
import { Calendar, Filter, Clock, MapPin, SlidersHorizontal, Info } from 'lucide-react';

interface HolidaysCalendarProps {
  lang: Language;
}

export default function HolidaysCalendar({ lang }: HolidaysCalendarProps) {
  const t = TRANSLATIONS[lang];
  const [filterState, setFilterState] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const indianStates = [
    "Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra"
  ];

  const monthsList = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const filteredHolidays = HOLIDAYS.filter((h) => {
    const stateMatch = filterState === 'all' || h.states.includes('All') || h.states.includes(filterState);
    const monthMatch = filterMonth === 'all' || h.month === filterMonth;
    const typeMatch = filterType === 'all' || h.type === filterType;
    return stateMatch && monthMatch && typeMatch;
  });

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'national': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'state': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'rbi': return 'bg-rose-50 border-rose-200 text-rose-800';
      default: return 'bg-emerald-50 border-emerald-200 text-emerald-800';
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'national': return t.holidayTypeNational;
      case 'state': return t.holidayTypeState;
      case 'rbi': return t.holidayTypeRbi;
      default: return t.holidayTypeFestival;
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {t.holidaysTitle}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {t.holidaysDesc}
        </p>
      </div>

      {/* FILTER PANEL SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest text-slate-450 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
          <SlidersHorizontal className="h-4 w-4" />
          {lang === 'en' ? 'Limit Holidays View Criteria' : 'కరెక్ట్ సెలవుల ఫిల్టర్లు'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* State select filter */}
          <div className="space-y-1.5">
            <label className="text-2xs font-bold text-slate-550 text-slate-500 uppercase tracking-wider block">
              🏢 {lang === 'en' ? 'Select State:' : 'రాష్ట్రం:'}
            </label>
            <select
              id="holiday-state-select"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.filterState}</option>
              {indianStates.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Month select filter */}
          <div className="space-y-1.5">
            <label className="text-2xs font-bold text-slate-550 text-slate-500 uppercase tracking-wider block">
              📅 {lang === 'en' ? 'Select Month:' : 'నెల:'}
            </label>
            <select
              id="holiday-month-select"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.filterMonth}</option>
              {monthsList.map((m, i) => (
                <option key={i} value={m}>{lang === 'en' ? m : m}</option>
              ))}
            </select>
          </div>

          {/* Type filter */}
          <div className="space-y-1.5">
            <label className="text-2xs font-bold text-slate-550 text-slate-500 uppercase tracking-wider block">
              🏷️ {lang === 'en' ? 'Holiday Mandate Type:' : 'సెలవు వర్గం:'}
            </label>
            <select
              id="holiday-type-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{lang === 'en' ? 'All Classes' : 'అన్ని సెలవులు'}</option>
              <option value="national">{t.holidayTypeNational}</option>
              <option value="state">{t.holidayTypeState}</option>
              <option value="rbi">{t.holidayTypeRbi}</option>
              <option value="festival">{t.holidayTypeFestival}</option>
            </select>
          </div>

        </div>
      </div>

      {/* TIMELINE LIST VIEW */}
      <div className="space-y-6">
        <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600 animate-pulse" />
          {t.calendarViewTitle}
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
            {filteredHolidays.length} {lang === 'en' ? 'Holidays Listed' : 'సెలవులు ఉన్నాయి'}
          </span>
        </h3>

        {filteredHolidays.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500">
            <p className="text-base font-semibold">{lang === 'en' ? 'No holidays configured for selected options.' : 'సెలవుల వివరాలు ఏవీ లేవు.'}</p>
            <button
               id="holiday-reset-filter-btn"
               onClick={() => { setFilterMonth('all'); setFilterState('all'); setFilterType('all'); }}
               className="mt-4 bg-blue-100 hover:bg-slate-200 hover:bg-blue-200 text-blue-800 font-bold px-4 py-2 rounded-lg text-sm transition-all"
            >
              {lang === 'en' ? 'Show All Holidays' : 'అన్ని సెలవులు చూపించు'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHolidays.map((h, i) => {
              // Format date cleanly
              const dateObj = new Date(h.date);
              const day = dateObj.getDate();
              const dateString = dateObj.toLocaleDateString(lang === 'en' ? 'en-US' : 'te-IN', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <div
                  key={h.id}
                  id={`holiday-timeline-${h.id}`}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between hover:shadow-md transition-all border-t-4 border-t-slate-350 hover:border-t-blue-600"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <span className="p-2.5 rounded-xl bg-slate-50 text-slate-600 text-xl font-bold font-mono">
                        {day}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-4xs font-extrabold uppercase tracking-wider border ${getBadgeStyle(h.type)}`}>
                        {getLabel(h.type)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                        {lang === 'en' ? h.name : h.nameTelugu}
                      </h4>
                      <div className="text-xs text-slate-500 font-medium">
                        {dateString}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 mt-4 text-3xs text-slate-400 font-sans leading-relaxed">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>
                        {h.states.includes('All') 
                          ? (lang === 'en' ? 'All India National Mandate' : 'భారతదేశం అంతటా వర్తిస్తుంది') 
                          : `${lang === 'en' ? 'Applicable in' : 'వర్తించే ప్రాంతాలు:'}: ${h.states.join(', ')}`}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER INFO MESSAGE ACCORDING TO RBI PROTOCOL */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex gap-3 text-xs text-slate-500 leading-relaxed font-sans">
        <Info className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
        <p>
          {lang === 'en' 
            ? 'According to Reserve Bank of India Negotiable Instruments Act regulations: Banks are collectively closed on all Sundays, 2nd and 4th Saturdays of every Calendar Month. Real-time online portal nodes (IMPS, UPI, NEFT) remain 100% active.'
            : 'భారతీయ రిజర్వ్ బ్యాంక్ నెగోషియబుల్ ఇన్‌స్ట్రుమెంట్స్ చట్టం నిబంధనల ప్రకారం: ప్రతి ఆదివారం, మరియు ప్రతి నెలా 2వ & 4వ శనివారాలలో అన్ని ప్రభుత్వ/ప్రైవేటు బ్యాంకుల బ్రాంచ్‌లు పనిచేయవు. ఆన్‌లైన్ సేవలు (UPI, IMPS, RTGS) 24 గంటలూ అందుబాటులో ఉంటాయి.'}
        </p>
      </div>

    </div>
  );
}
