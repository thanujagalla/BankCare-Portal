import React, { useState, useEffect } from 'react';
import { DOCUMENTS, TRANSLATIONS, BANKS } from '../data';
import { Language, DocumentInfo } from '../types';
import { CheckSquare, Square, Download, Search, Sparkles, SlidersHorizontal, RefreshCw, Upload, CheckCircle, FileCheck } from 'lucide-react';

interface DocCenterProps {
  lang: Language;
  searchQuery: string;
  selectedActionService: string;
  onChecklistUpdate: (id: string, checkedItems: string[]) => void;
  savedChecklists: { [key: string]: string[] };
}

export default function DocCenter({ lang, searchQuery, selectedActionService, onChecklistUpdate, savedChecklists }: DocCenterProps) {
  const t = TRANSLATIONS[lang];
  const [filterQuery, setFilterQuery] = useState(searchQuery || '');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  
  // OCR Simulator States
  const [ocrFile, setOcrFile] = useState<File | null>(null);
  const [ocrFileName, setOcrFileName] = useState('');
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [ocrProgress, setOcrProgress] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      setFilterQuery(searchQuery);
    }
  }, [searchQuery]);

  // Handle selected fast-action service from home
  useEffect(() => {
    if (selectedActionService) {
      const matchedDoc = DOCUMENTS.find(d => d.id === selectedActionService);
      if (matchedDoc) {
        setFilterQuery(lang === 'en' ? matchedDoc.title : matchedDoc.titleTelugu);
      }
    }
  }, [selectedActionService, lang]);

  const toggleChecklistItem = (docId: string, requirement: string) => {
    const currentList = savedChecklists[docId] || [];
    let updatedList: string[];
    if (currentList.includes(requirement)) {
      updatedList = currentList.filter(item => item !== requirement);
    } else {
      updatedList = [...currentList, requirement];
    }
    onChecklistUpdate(docId, updatedList);
  };

  const filteredDocuments = DOCUMENTS.filter((doc) => {
    const titleMatch = lang === 'en' 
      ? doc.title.toLowerCase().includes(filterQuery.toLowerCase()) || doc.description.toLowerCase().includes(filterQuery.toLowerCase())
      : doc.titleTelugu.includes(filterQuery) || doc.descriptionTelugu.includes(filterQuery);
    
    const categoryMatch = activeCategory === 'all' || doc.category === activeCategory;
    
    // Bank specific filters - PAN and Aadhaar are central (all), bank changes filter based on selected bank
    const bankMatch = selectedBank === 'all' || doc.id.includes('bank') || doc.id.includes('atm') || doc.id.includes('upi');

    return titleMatch && categoryMatch && bankMatch;
  });

  const triggerPDFDownload = (doc: DocumentInfo) => {
    // Generate a beautiful, clean printable layout overlay
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to save/print your document checklist.");
      return;
    }

    const checked = savedChecklists[doc.id] || [];
    const reqs = lang === 'en' ? doc.requirements : doc.requirementsTelugu;
    const title = lang === 'en' ? doc.title : doc.titleTelugu;
    const desc = lang === 'en' ? doc.description : doc.descriptionTelugu;

    printWindow.document.write(`
      <html>
        <head>
          <title>${title} - ${t.brandName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; max-width: 650px; margin: 0 auto; line-height: 1.6; }
            .header { border-bottom: 2px solid #004aad; pb: 20px; text-align: center; margin-bottom: 30px; }
            .brand { font-size: 24px; font-weight: bold; color: #004aad; margin-bottom: 5px; }
            .sub { font-size: 12px; color: #64748b; letter-spacing: 1px; text-transform: uppercase; }
            h1 { font-size: 22px; color: #0f172a; margin-top: 20px; }
            .desc { font-size: 14px; color: #475569; margin-bottom: 30px; background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #004aad; }
            .list-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
            .checkbox { border: 2px solid #004aad; width: 16px; height: 16px; border-radius: 3px; margin-right: 12px; flex-shrink: 0; display: inline-block; vertical-align: middle; text-align: center; line-height: 14px; font-size: 12px; font-weight: bold; color: #004aad; }
            .checked .checkbox { background-color: #004aad; color: white; }
            .checked .text { text-decoration: line-through; color: #94a3b8; }
            .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #94a3b8; border-t: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand">${t.brandName}</div>
            <div class="sub">${t.brandSub}</div>
          </div>
          <h1>${title} - Verify Checklist</h1>
          <div class="desc">${desc}</div>
          <div style="margin-top:20px;">
            ${reqs.map((req) => {
              const checkedState = checked.includes(req) ? 'checked' : '';
              const mark = checked.includes(req) ? '✓' : '';
              return `
                <div class="list-item ${checkedState}">
                  <span class="checkbox">${mark}</span>
                  <span class="text">${req}</span>
                </div>
              `;
            }).join('')}
          </div>
          <div class="footer">
            Generated on ${new Date().toLocaleDateString()} - BankCare Portal.<br/>
            Present this custom verified checklists along with original documents at branch counters.
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const startOcrScanning = () => {
    if (!ocrFileName) {
      alert(lang === 'en' ? "Please drop or select a document first." : "దయచేసి ముందుగా ఒక ఫైల్‌ను ఎంచుకోండి.");
      return;
    }
    setOcrStatus('scanning');
    setOcrProgress(10);
    
    const interval = setInterval(() => {
      setOcrProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOcrStatus('success');
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* HEADER TITLE */}
      <div className="space-y-2">
        <h1 className="text-3.5xl font-bold tracking-tight text-slate-900 font-sans">
          {t.docCenterTitle}
        </h1>
        <p className="text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
          {t.docCenterDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FILTERS & SEARCH LEFT GRID */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-5">
            <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              {lang === 'en' ? 'Filters & Search' : 'ఫిల్టర్లు & శోధన'}
            </h3>

            {/* Keyword search input */}
            <div className="relative">
              <input
                id="doc-filter-input"
                type="text"
                placeholder={lang === 'en' ? "Filter procedures..." : "ప్రక్రియ పేరు శోధించండి..."}
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm text-slate-800"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>

            {/* Document Category buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                {lang === 'en' ? 'Document Category:' : 'డాక్యుమెంట్ రకం:'}
              </label>
              <div className="flex flex-col gap-1">
                {[
                  { id: 'all', title: t.filterByCategory },
                  { id: 'identity', title: t.categoryIdentity },
                  { id: 'banking', title: t.categoryAddress }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-left text-sm px-3 py-2 rounded-lg font-medium cursor-pointer transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by specifically selected bank */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                {lang === 'en' ? 'Service Bank Context:' : 'బ్యాంక్ సర్వీసెస్ контекст:'}
              </label>
              <select
                id="filter-bank-select"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              >
                <option value="all">{lang === 'en' ? 'Central & All Banks' : 'కేంద్ర మరియు అన్ని బ్యాంకులు'}</option>
                {BANKS.map((b) => (
                  <option key={b.id} value={b.id}>{lang === 'en' ? b.name : b.teluguName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* OCR Document authenticity validation scanner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
            <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              {t.ocrSimulatorTitle}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.ocrSimulatorDesc}
            </p>

            <div className="relative border-2 border-dashed border-slate-250 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-50/50 group">
              <input
                id="ocr-file-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setOcrFile(e.target.files[0]);
                    setOcrFileName(e.target.files[0].name);
                    setOcrStatus('idle');
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2">
                <div className="p-2.5 bg-white border border-slate-200 w-11 h-11 rounded-lg inline-flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-105 transition-all">
                  <Upload className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  {ocrFileName ? ocrFileName : t.ocrScanPlaceholder}
                </div>
                <div className="text-2xs text-slate-400">
                  PNG, JPG or PDF upto 4MB
                </div>
              </div>
            </div>

            {ocrStatus === 'scanning' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-2xs font-bold text-slate-500">
                  <span>{lang === 'en' ? 'Scanning OCR nodes...' : 'OCR వివరాలు పరిశీలిస్తుంది...'}</span>
                  <span>{ocrProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${ocrProgress}%` }} />
                </div>
              </div>
            )}

            {ocrStatus === 'success' && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-2.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-2xs text-emerald-800 leading-normal font-semibold">
                  {t.ocrResultSuccess}
                </p>
              </div>
            )}

            <button
              id="ocr-scan-start-btn"
              onClick={startOcrScanning}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-xl text-xs sm:text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {t.ocrScanButton}
            </button>
          </div>
        </div>

        {/* DOCUMENTS LIST ITEMS - 2/3 COLUMN RIGHT SCENE */}
        <div className="lg:col-span-2 space-y-6">
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500">
              <p className="text-base font-semibold">{lang === 'en' ? 'No matching banking procedures found.' : 'ఎలాంటి ఫలితాలు లభించలేదు.'}</p>
              <button
                id="reset-filters-btn"
                onClick={() => { setFilterQuery(''); setActiveCategory('all'); setSelectedBank('all'); }}
                className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-4 py-2 rounded-lg text-sm transition-all"
              >
                {lang === 'en' ? 'Reset Filters' : 'ఫిల్టర్లు రీసెట్ చేయండి'}
              </button>
            </div>
          ) : (
            filteredDocuments.map((doc) => {
              const reqs = lang === 'en' ? doc.requirements : doc.requirementsTelugu;
              const title = lang === 'en' ? doc.title : doc.titleTelugu;
              const desc = lang === 'en' ? doc.description : doc.descriptionTelugu;
              const checked = savedChecklists[doc.id] || [];

              return (
                <div
                  key={doc.id}
                  id={`doc-requirement-${doc.id}`}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all gap-5"
                >
                  <div className="space-y-4">
                    {/* Header tags */}
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="space-y-1.5">
                        <div className="inline-flex px-2 py-0.5 rounded-md bg-slate-150 border border-slate-200 text-2xs font-semibold text-slate-600 uppercase tracking-wide">
                          {doc.category === 'identity' ? t.categoryIdentity : t.categoryAddress}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                          {title}
                        </h2>
                      </div>
                      <button
                        id={`dl-pdf-${doc.id}`}
                        onClick={() => triggerPDFDownload(doc)}
                        className="p-2 bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-blue-600 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">{lang === 'en' ? 'Print / Download' : 'ప్రింట్ / డౌన్‌లోడ్'}</span>
                      </button>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed border-l-3 border-blue-600 bg-slate-50 p-3 rounded-r-xl">
                      {desc}
                    </p>

                    {/* Checkbox Checklist Node */}
                    <div className="pt-2 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>📋 {lang === 'en' ? 'Required Verification List:' : 'అవసరమైన ధృవీకరణ పత్రాలు:'}</span>
                        <span className="text-blue-600 font-extrabold">{checked.length} / {reqs.length}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {reqs.map((req, rid) => {
                          const isChecked = checked.includes(req);
                          return (
                            <button
                              key={rid}
                              id={`item-${doc.id}-${rid}`}
                              onClick={() => toggleChecklistItem(doc.id, req)}
                              className={`flex items-start text-left p-3 rounded-xl border border-slate-100 transition-all text-xs sm:text-sm cursor-pointer ${
                                isChecked 
                                  ? 'bg-blue-50/70 border-blue-200 text-slate-800 font-medium' 
                                  : 'bg-white hover:bg-slate-50 text-slate-600'
                              }`}
                            >
                              <div className="shrink-0 mt-0.5 mr-3">
                                {isChecked ? (
                                  <CheckSquare className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <Square className="h-4 w-4 text-slate-400" />
                                )}
                              </div>
                              <span className={isChecked ? 'line-through text-slate-450 text-slate-500' : ''}>{req}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Checklist indicator strip */}
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <span className="text-2xs text-slate-400 font-serif flex items-center gap-1">
                      <FileCheck className="h-3.5 w-3.5" />
                      {lang === 'en' ? 'Applet Local Saved Mode' : 'అప్లికేషన్ స్థానిక రక్షణ మోడ్'}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      {checked.length === reqs.length 
                        ? (lang === 'en' ? '✓ All Prepared' : '✓ అన్ని సిద్ధంగా ఉన్నాయి') 
                        : (lang === 'en' ? 'Pending verification' : 'ధృవీకరణ పెండింగ్‌లో ఉంది')}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
