import React, { useState } from 'react';
import { BANKS, SERVICES_LIST, TRANSLATIONS, BRANCHES } from '../data';
import { Language, TokenBooking as BookingType } from '../types';
import { Calendar, Clock, User, Phone, Mail, ChevronRight, CheckCircle, QrCode } from 'lucide-react';

interface TokenBookingProps {
  lang: Language;
  onBookToken: (token: BookingType) => void;
  activeTokens: BookingType[];
}

export default function TokenBooking({ lang, onBookToken, activeTokens }: TokenBookingProps) {
  const t = TRANSLATIONS[lang];

  // Forms states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedService, setSelectedService] = useState('ac_open');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('10:30 AM');

  // Booking results
  const [justBookedToken, setJustBookedToken] = useState<BookingType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [bannerAlert, setBannerAlert] = useState<string | null>(null);

  const timeSlots = [
    "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !mobile || !email || !selectedBranch || !preferredDate || !preferredTimeSlot) {
      alert(lang === 'en' ? "Please fill in all requested fields." : "దయచేసి అన్ని ఖాళీలను పూర్తి చేయండి.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      // Create random token identity
      const nodeCode = BANKS.find(b => b.id === selectedBank)?.ifscPrefix || "UBS";
      const number = Math.floor(100 + Math.random() * 900);
      const tokenNo = `UBS-${nodeCode}-${number}`;
      
      // Simulated dynamic QR payload
      const qrPayloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(tokenNo + "|" + name + "|" + selectedBranch)}`;

      const newBooking: BookingType = {
        id: Math.random().toString(),
        tokenNumber: tokenNo,
        name,
        mobile,
        email,
        bankId: selectedBank,
        branchName: selectedBranch,
        serviceType: SERVICES_LIST.find(s => s.id === selectedService)?.name || "Banking Service",
        date: preferredDate,
        timeSlot: preferredTimeSlot,
        qrCodeUrl: qrPayloadUrl,
        status: 'waiting',
        positionInQueue: Math.floor(4 + Math.random() * 8)
      };

      onBookToken(newBooking);
      setJustBookedToken(newBooking);
      setSubmitting(false);

      // Trigger structural banner alerts simulating API SMS trigger
      setBannerAlert(t.smsAlertSim);
      setTimeout(() => {
        setBannerAlert(t.emailAlertSim);
        setTimeout(() => setBannerAlert(null), 4000);
      }, 4000);

    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {t.tokenTitle}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {t.tokenDesc}
        </p>
      </div>

      {/* DISPATCH PROGRESS FEEDBACKS OVERLAY */}
      {bannerAlert && (
        <div className="bg-emerald-600 text-white font-semibold text-center py-3.5 px-4 rounded-xl shadow-lg border border-emerald-500 flex items-center justify-center gap-2.5 animate-bounce text-xs sm:text-sm">
          <CheckCircle className="h-4.5 w-4.5 text-white shrink-0" />
          <span>{bannerAlert}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORM GRID SECTION - LEFT 7 UNITS */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <form id="token-booking-form" onSubmit={handleBookSubmit} className="space-y-6">
            
            <h3 className="font-sans font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">
              📋 {lang === 'en' ? 'Submit Appointment Information' : 'సంప్రదింపుల దరఖాస్తు ఫారమ్'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {t.fullNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="token-fullname"
                  type="text"
                  required
                  placeholder="e.g. Srinivas Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-sans"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {t.mobileLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="token-mobile"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10 digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5 col-span-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {t.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  id="token-email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-sans"
                />
              </div>

              {/* Service list drop */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  {t.selectService} <span className="text-red-500">*</span>
                </label>
                <select
                  id="token-service-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {lang === 'en' ? srv.name : srv.nameTelugu}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              {/* Bank Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  {t.selectBank} <span className="text-red-500">*</span>
                </label>
                <select
                  id="token-bank-select"
                  value={selectedBank}
                  onChange={(e) => {
                    setSelectedBank(e.target.value);
                    setSelectedBranch('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {BANKS.filter(b => b.id !== 'all').map((b) => (
                    <option key={b.id} value={b.id}>
                      {lang === 'en' ? b.name : b.teluguName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Selection based on bank */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  {t.selectBranch} <span className="text-red-500">*</span>
                </label>
                <select
                  id="token-branch-select"
                  required
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-semibold"
                >
                  <option value="">-- {lang === 'en' ? 'Select Nearest Branch' : 'సమీప బ్రాంచ్‌ని ఎంచుకోండి'} --</option>
                  {(BRANCHES[selectedBank] || ["SBI Andhra Circle, Hyd", "SBI Anantapur HQ", "SBI Vizag Rural"]).map((br, i) => (
                    <option key={i} value={br}>{br}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {t.preferredDate} <span className="text-red-500">*</span>
                </label>
                <input
                  id="token-date"
                  type="date"
                  required
                  min="2026-06-12"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-sans"
                />
              </div>

              {/* Time slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {t.preferredTime} <span className="text-red-500">*</span>
                </label>
                <select
                  id="token-time-select"
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Book trigger button */}
            <button
              id="book-token-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="h-4.5 w-4.5" />
              {submitting ? (lang === 'en' ? 'Scribing token...' : 'టోకెన్ వివరాలు నమోదు చేస్తున్నాము...') : t.bookTokenBtn}
            </button>

          </form>
        </div>

        {/* BOOKED ACTIVE SUMMARY - RIGHT 5 UNITS */}
        <div className="lg:col-span-5 space-y-6">
          
          {justBookedToken ? (
            /* ACTIVE GENERATED TICKET MODULE */
            <div className="bg-white rounded-3xl border border-blue-100 shadow-xl overflow-hidden animate-fade-in relative">
              <div className="bg-slate-900 text-white p-6 text-center space-y-2">
                <div className="text-xs uppercase font-extrabold tracking-widest text-blue-400">
                  {t.liveQueueStatus}
                </div>
                <h4 className="text-4xl font-black font-sans tracking-tight text-white select-all">
                  {justBookedToken.tokenNumber}
                </h4>
                <p className="text-2xs text-slate-400 font-medium">
                  {justBookedToken.serviceType}
                </p>
              </div>

              {/* Dynamic QR block simulation */}
              <div className="p-6 text-center space-y-6">
                
                <div className="inline-block p-4 bg-slate-50 border border-slate-100 rounded-2xl relative group">
                  <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    <span className="text-3xs font-extrabold text-slate-800 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-xs">
                      {lang === 'en' ? 'Active Node QR' : 'యాక్టివ్ క్యూఆర్ కోడ్'}
                    </span>
                  </div>
                  {/* Robust SVG / image block or dynamic loader */}
                  <img
                    src={justBookedToken.qrCodeUrl}
                    alt="Booking QR Code"
                    referrerPolicy="no-referrer"
                    className="w-36 h-36 mx-auto"
                    onError={(e) => {
                      // Fallback internally if external API fails
                      e.currentTarget.style.display = 'none';
                      const el = document.getElementById('qr-fallback-node');
                      if (el) el.style.display = 'flex';
                    }}
                  />
                  <div
                    id="qr-fallback-node"
                    style={{ display: 'none' }}
                    className="w-36 h-36 border border-slate-205 bg-slate-100 flex-col items-center justify-center gap-1 mx-auto rounded-xl"
                  >
                    <QrCode className="h-10 w-10 text-slate-600 animate-pulse" />
                    <span className="text-3xs text-slate-503 text-slate-500 font-extrabold font-sans">QR READY</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left text-xs text-slate-600 font-sans border-t border-b border-slate-100 py-4">
                  <div>
                    <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest block">{t.fullNameLabel}</span>
                    <strong className="text-slate-800">{justBookedToken.name}</strong>
                  </div>
                  <div>
                    <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest block">{lang === 'en' ? 'Reserved Branch' : 'సేవ్ చేయబడిన బ్రాంచ్'}</span>
                    <strong className="text-slate-800 line-clamp-1">{justBookedToken.branchName}</strong>
                  </div>
                  <div>
                    <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest block">{lang === 'en' ? 'Date & Time' : 'తేదీ మరియు సమయం'}</span>
                    <strong className="text-slate-800">{justBookedToken.date} @ {justBookedToken.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest block">{t.posInQueue}</span>
                    <strong className="text-blue-600 font-extrabold text-sm">{justBookedToken.positionInQueue}</strong>
                  </div>
                </div>

                <p className="text-3xs text-slate-400 leading-normal text-left font-sans flex items-start gap-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span>ℹ️</span>
                  <span>{t.tokenSecurityNote}</span>
                </p>

                <button
                  id="reset-booking-view-btn"
                  onClick={() => setJustBookedToken(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline tracking-wide cursor-pointer"
                >
                  {lang === 'en' ? 'Book another appointment' : 'మరొక అపాయింట్‌మెంట్ బుక్ చేయి'}
                </button>
              </div>
            </div>
          ) : (
            /* PREVIEW OF LAST OR GENERIC QUEUE MODULE */
            <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-6 flex flex-col justify-between min-h-12 text-slate-500">
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider">
                  🎫 {lang === 'en' ? 'Recent Active Queue Status' : 'ఇటీవలి లైవ్ క్యూ స్థితిగతులు'}
                </h4>
                
                <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">State Bank - Hyderabad Main</span>
                    <span className="py-0.5 px-2 bg-emerald-50 border border-emerald-100 rounded text-3xs font-extrabold text-emerald-700 uppercase tracking-wide">
                      {lang === 'en' ? 'Normal Wait' : 'తక్కువ రద్దీ'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-50 pt-3">
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block uppercase">No. Active Counter</span>
                      <strong className="text-slate-700 text-sm">4</strong>
                    </div>
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block uppercase">Called token</span>
                      <strong className="text-blue-600 text-sm font-mono">UBS-SBIN-214</strong>
                    </div>
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block uppercase">Avg wait mins</span>
                      <strong className="text-slate-700 text-sm">12m</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">HDFC Gachibowli Area</span>
                    <span className="py-0.5 px-2 bg-amber-50 border border-amber-100 rounded text-3xs font-extrabold text-amber-700 uppercase tracking-wide">
                      {lang === 'en' ? 'Moderate Line' : 'సాధారణ రద్దీ'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-50 pt-3">
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block uppercase">No. Active Counter</span>
                      <strong className="text-slate-700 text-sm">5</strong>
                    </div>
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block uppercase">Called token</span>
                      <strong className="text-blue-600 text-sm font-mono">UBS-HDFC-318</strong>
                    </div>
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block uppercase">Avg wait mins</span>
                      <strong className="text-slate-700 text-sm">22m</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200/60 pt-4 mt-6 text-xs leading-relaxed text-slate-400 font-sans italic">
                *Booking virtual slots is completely free and regulated under secure public banking frameworks. No transaction values are associated.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
