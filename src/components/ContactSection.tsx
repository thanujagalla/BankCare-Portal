import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { MapPin, Phone, Mail, Clock, Send, Share2, Globe, ShieldAlert } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = TRANSLATIONS[lang];

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Map canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !email || !msg) {
      alert(lang === 'en' ? "Please complete all fields first." : "దయచేసి అన్ని ఖాళీలను పూరించండి.");
      return;
    }
    setSubmittedMessage(true);
    setName('');
    setMobile('');
    setEmail('');
    setMsg('');
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  // Draw simulated premium map on Canvas element
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI retina display bounds
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.parentElement?.clientWidth ? canvas.parentElement.clientWidth * dpr : 500 * dpr;
    canvas.height = 280 * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    // Draw background grid lines (mimics topographic surveyor mapping coordinates)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw stylized vector road paths
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Road 1
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(w - 35, 120);
    ctx.lineTo(w - 80, h - 30);
    ctx.stroke();

    // Road 2 crossing
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(w / 3, h - 20);
    ctx.lineTo(w / 2, 30);
    ctx.lineTo(w - 20, 50);
    ctx.stroke();

    // Draw river elements (aesthetic accent)
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.bezierCurveTo(w * 0.3, h * 0.6, w * 0.6, h * 0.85, w, h * 0.4);
    ctx.stroke();

    // Headquarter map marker pin point
    const pinX = w * 0.65;
    const pinY = h * 0.38;

    // Pulsing mapping coordinate ripple
    ctx.fillStyle = 'rgba(0, 74, 173, 0.15)';
    ctx.beginPath();
    ctx.arc(pinX, pinY, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(0, 74, 173, 0.35)';
    ctx.beginPath();
    ctx.arc(pinX, pinY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Core Navy Pin
    ctx.fillStyle = '#004AAD';
    ctx.beginPath();
    ctx.arc(pinX, pinY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Pin bubble marker banner tags
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(pinX - 70, pinY - 45, 140, 22, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("UBS Central Headquarters", pinX, pinY - 31);

  }, [lang]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {t.contactTitle}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {t.contactDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* TICKET DISPATCH CONTACT FORM - LEFT 7 SCENES */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submittedMessage ? (
            /* CONGRATS ALERT WINDOW */
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="h-16 w-16 bg-blue-100 border border-blue-200 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                <Send className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-sans font-extrabold text-slate-900 text-xl">
                {lang === 'en' ? 'Support Ticket Dispatched' : 'సందేశం పంపబడింది'}
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                {lang === 'en' 
                  ? 'Thank you for your citizen feedback. Support officials will review your ticket and communicate directly within 12 working hours.'
                  : 'మీ విలువైన సమాచారం మా కార్యాలయానికి చేరింది. మా బృందం దీనిపై త్వరలోనే స్పందిస్తుంది.'}
              </p>
              <button
                id="reset-contact-btn"
                onClick={() => setSubmittedMessage(false)}
                className="mt-6 text-xs text-blue-600 font-bold underline"
              >
                {lang === 'en' ? 'Submit another query' : 'మరొక సందేశం పంపండి'}
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmitContact} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">{t.fullNameLabel}:</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">{t.mobileLabel}:</label>
                  <input
                    id="contact-mobile"
                    type="tel"
                    required
                    placeholder="e.g. mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">{t.emailLabel}:</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. names@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Desc Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">{t.messageLabel}:</label>
                <textarea
                  id="contact-desc"
                  rows={4}
                  required
                  placeholder={lang === 'en' ? "Describe your banking inquiry or technical issue..." : "మీ బ్యాంకింగ్ సమస్య లేదా ప్రశ్నలను ఇక్కడ క్లుప్తంగా సమర్పించండి..."}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <button
                id="contact-form-submit-btn"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="h-4.5 w-4.5" />
                {t.sendMessageBtn}
              </button>

            </form>
          )}

          {/* CITIZENS FEEDBACK SECTION */}
          <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider">
              📝 {t.feedbackHeader}
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 text-slate-600 leading-relaxed font-sans border border-slate-150">
              <p>
                {lang === 'en' 
                  ? 'We continuously analyze banking portal metadata interfaces to enhance convenience across central nodes. Have ideas on supporting more regional grameena banks?'
                  : 'గ్రామీణ ప్రాంతాల ప్రజలకు బ్యాంకింగ్ సమాచారాన్ని మరింత సులభతరం చేయడానికి మీ సలహాలు ఆహ్వానిస్తున్నాము.'}
              </p>
              <div className="flex gap-4 text-3xs font-extrabold text-blue-700 tracking-wider">
                <span>📧 support@unifiedbanking.gov.in</span>
                <span>📞 1800-112-244 (Citizen Helpdesk)</span>
              </div>
            </div>
          </div>
        </div>

        {/* OFFICE DIRECTORIES & MAP CANVAS - RIGHT 5 SCENES */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* MOCK MAP CANVAS WITH PIN */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative">
            <div className="p-4 bg-slate-900 border-b border-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span>📍 Central Directorate Locator</span>
              <span className="p-1.5 rounded-md bg-slate-800 text-3xs text-slate-450 text-slate-400 font-mono">DPR Scale Adjusted</span>
            </div>
            
            <div className="relative">
              <canvas ref={canvasRef} className="w-full block" />
            </div>

            <div className="p-4 bg-slate-50 text-3xs text-center font-sans text-slate-400 border-t border-slate-100">
              {lang === 'en' ? 'Interactive Mock vector layout, utilizing canvas coordinates.' : 'రియల్ టైమ్ లొకేషన్ వెక్టర్ లేఅవుట్ (కెన్వాస్ ఆర్కిటెక్చర్).'}
            </div>
          </div>

          {/* PHYSICAL ADRESS CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs font-sans">
            
            <div className="flex items-start gap-3.5 text-xs text-slate-700 leading-relaxed">
              <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <strong className="text-slate-900 text-sm block font-sans font-bold pb-1">{t.hqDetails}</strong>
                <span>{t.hqAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-xs text-slate-700">
              <Clock className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <strong className="text-slate-900 text-sm block font-sans font-bold pb-1">{lang === 'en' ? 'Support Timings' : 'పనివేళలు'}</strong>
                <span>{t.hqTimings}</span>
              </div>
            </div>

            {/* Emergency Support Desk area details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-2xs leading-snug">
              <h5 className="font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert className="h-4 w-4 text-blue-600" />
                RBI Customer Redressal Ombudsman Office
              </h5>
              <p className="text-slate-500">
                To launch physical complaints regarding bank services delays, contact the state Integrated Grievance Redressal system directly:
              </p>
              <span className="font-extrabold text-blue-700 block">📞 RBI HelpLine Code: 14448</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
