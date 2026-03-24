// admin-portal/app/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// --- KAMUSI YA LUGHA YENYE MANENO YA KIPROMOSHINI ---
const dict: any = {
  sw: {
    navHome: "Mwanzo", navTrack: "Fuatilia", navServices: "Huduma Zetu", navHow: "Jinsi Inavyofanya Kazi",
    heroBadge: "🚀 Usafirishaji wa Haraka na Salama Tanzania",
    heroTitle: "Suluhisho Lako la Uhakika kwa",
    heroTitleHighlight: "Usafirishaji wa Mizigo",
    heroSub: "Sisi ni zaidi ya wasafirishaji; sisi ni wabia wa biashara yako. Tunahakikisha mzigo wako unafika kwa wakati, ukiwa salama 100%, na unaweza kuufuatilia kiganjani mwako.",
    btnHeroTrack: "Fuatilia Mzigo Sasa", btnHeroContact: "Wasiliana Nasi",
    trackTitle: "Mzigo Wako Upo Wapi?", trackSub: "Weka namba yako ya Tracking (Mf. GMC-123456) kujua hali ya mzigo wako Live.",
    placeholder: "Weka Namba ya Tracking Hapa...", btnTrack: "TAFUTA MZIGO 🔍", btnLoading: "Inatafuta...",
    statusRec: "📦 Umepokelewa", statusTrans: "🚚 Upo Njiani", statusDel: "✅ Umekabidhiwa", statusCan: "❌ Umesitishwa",
    lblTrack: "Namba ya Tracking", lblStatus: "Hali ya Sasa",
    lblSender: "Kutoka Kwa", lblReceiver: "Kwenda Kwa", lblDest: "Kituo cha Mwisho", lblDate: "Taarifa ya Mwisho",
    errorNet: "Samahani, mzigo haujapatikana au kuna shida ya mtandao. Hakikisha namba ipo sahihi.",
    stat1: "99.8%", stat1Sub: "Mizigo Imefika Salama",
    stat2: "24/7", stat2Sub: "Ufuatiliaji wa Kidigitali",
    stat3: "100%", stat3Sub: "Uhuru na Wateja",
    howTitle: "Inafanyaje Kazi?", howSub: "Hatua 3 rahisi za kusafirisha na GM Cargo",
    hw1T: "1. Sajili Mzigo", hw1D: "Leta mzigo wako ofisini au kwa mawakala wetu na upate namba yako ya Tracking papo hapo.",
    hw2T: "2. Fuatilia Live", hw2D: "Tumia namba uliyopewa kufuatilia mzigo wako kwenye website yetu ukijua upo hatua gani.",
    hw3T: "3. Pokea Mzigo", hw3D: "Mzigo wako utakabidhiwa salama kwa mpokeaji mhusika kwa wakati uliopangwa.",
    srvTitle: "Huduma Zetu za Viwango", srvSub: "Iwe ni mzigo mdogo au mkubwa, tunakuhudumia kwa weledi.",
    s1T: "Usafirishaji wa Haraka", s1D: "Mizigo inasafirishwa kwa mwendo kasi kuhakikisha inawafikia wateja ndani ya muda mfupi zaidi.",
    s2T: "Usalama wa Juu", s2D: "Tunatumia mifumo ya kisasa kuhifadhi na kufuatilia mizigo ili kuepusha uharibifu au upotevu.",
    s3T: "Gharama Nafuu", s3D: "Tunatoa huduma zenye ubora wa kimataifa kwa bei zinazoendana na soko la ndani.",
    footDesc: "Tunabadilisha tasnia ya usafirishaji kwa kuleta uwazi, usalama, na kasi kupitia teknolojia.",
    footQuick: "Viungo Muhimu", footLegal: "Sera na Sheria", footContact: "Wasiliana Nasi",
    address: "Kariakoo, Dar es Salaam",
    rights: "Haki zote zimehifadhiwa.", adminLink: "Portal ya Ofisi"
  },
  en: {
    navHome: "Home", navTrack: "Track", navServices: "Services", navHow: "How It Works",
    heroBadge: "🚀 Fast & Secure Logistics in Tanzania",
    heroTitle: "Your Trusted Partner for",
    heroTitleHighlight: "Cargo Delivery",
    heroSub: "We are more than just transporters; we are your business partners. We ensure your cargo arrives on time, 100% safe, and trackable right from your fingertips.",
    btnHeroTrack: "Track Package Now", btnHeroContact: "Contact Us",
    trackTitle: "Where is your package?", trackSub: "Enter your Tracking number (e.g., GMC-123456) to get live status updates.",
    placeholder: "Enter Tracking Number Here...", btnTrack: "TRACK PACKAGE 🔍", btnLoading: "Searching...",
    statusRec: "📦 Received", statusTrans: "🚚 In Transit", statusDel: "✅ Delivered", statusCan: "❌ Cancelled",
    lblTrack: "Tracking Number", lblStatus: "Current Status",
    lblSender: "From", lblReceiver: "To", lblDest: "Final Destination", lblDate: "Last Update",
    errorNet: "Sorry, package not found or network error. Please check the number.",
    stat1: "99.8%", stat1Sub: "Safe Deliveries",
    stat2: "24/7", stat2Sub: "Digital Tracking",
    stat3: "100%", stat3Sub: "Customer Satisfaction",
    howTitle: "How It Works?", howSub: "3 simple steps to ship with GM Cargo",
    hw1T: "1. Register Cargo", hw1D: "Bring your cargo to our office or agents and get your Tracking number instantly.",
    hw2T: "2. Track Live", hw2D: "Use the provided number to track your package on our website in real-time.",
    hw3T: "3. Receive Cargo", hw3D: "Your cargo will be safely handed over to the designated receiver on time.",
    srvTitle: "Our Premium Services", srvSub: "Whether small or large, we handle your cargo with extreme professionalism.",
    s1T: "Express Delivery", s1D: "Packages are transported swiftly to ensure they reach customers in the shortest possible time.",
    s2T: "Maximum Security", s2D: "We use modern systems to store and track packages to prevent damage or loss.",
    s3T: "Affordable Rates", s3D: "We provide world-class quality services at competitive local market prices.",
    footDesc: "Revolutionizing the logistics industry by bringing transparency, security, and speed through technology.",
    footQuick: "Quick Links", footLegal: "Legal Policy", footContact: "Contact Us",
    address: "Kariakoo, Dar es Salaam",
    rights: "All Rights Reserved.", adminLink: "Office Portal"
  }
};

// --- ICON COMPONENTS ---
const TruckIcon = () => <svg className="w-8 h-8 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>;
const ShieldIcon = () => <svg className="w-8 h-8 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>;
const WalletIcon = () => <svg className="w-8 h-8 currentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

// --- TRACKING WIDGET YENYE NGUVU ---
function TrackingSection({ lang }: { lang: string }) {
  const t = dict[lang];
  const searchParams = useSearchParams();
  const autoId = searchParams.get("id");
  
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoId) {
      setTrackingNumber(autoId);
      fetchTrackingData(autoId);
    }
  }, [autoId]);

  const fetchTrackingData = async (trackNo: string) => {
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`/api/track/${trackNo}`);
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error);
    } catch (err) {
      setError(t.errorNet);
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (e: any) => {
    e.preventDefault();
    if (trackingNumber) fetchTrackingData(trackingNumber.toUpperCase());
  };

  return (
    <div id="fuatilia" className="w-full max-w-5xl mx-auto -mt-24 relative z-20 px-4">
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 p-8 md:p-14 border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">{t.trackTitle}</h2>
          <p className="text-gray-500 text-lg">{t.trackSub}</p>
        </div>
        
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder={t.placeholder} 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border-2 border-gray-200 rounded-2xl text-xl font-bold focus:outline-none focus:border-blue-600 focus:bg-white text-gray-900 uppercase transition-all"
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? t.btnLoading : t.btnTrack}
          </button>
        </form>

        {error && (
          <div className="mt-8 max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center gap-4">
            <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="font-bold text-lg">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Status Banner */}
            <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10 text-center md:text-left">
                <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">{t.lblTrack}</p>
                <p className="text-4xl font-black text-white tracking-wider">{result.trackingNumber}</p>
              </div>
              <div className="relative z-10 bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl border border-white/20">
                <p className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-1 text-center">{t.lblStatus}</p>
                <h3 className="text-2xl font-black text-white">
                  {result.status === "RECEIVED" && <span className="text-orange-400">{t.statusRec}</span>}
                  {result.status === "IN_TRANSIT" && <span className="text-blue-400">{t.statusTrans}</span>}
                  {result.status === "DELIVERED" && <span className="text-green-400">{t.statusDel}</span>}
                  {result.status === "CANCELLED" && <span className="text-red-400">{t.statusCan}</span>}
                </h3>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t.lblSender}</p>
                  <p className="font-black text-xl text-gray-900">{result.senderName}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl"><svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{t.lblReceiver}</p>
                  <p className="font-black text-xl text-gray-900">{result.receiverName}</p>
                </div>
              </div>
              <div className="md:col-span-2 bg-blue-50/50 p-8 rounded-2xl border border-blue-100 text-center">
                <p className="text-sm text-blue-600 font-bold uppercase tracking-widest mb-2">{t.lblDest}</p>
                <p className="font-black text-4xl text-gray-900">{result.destination}</p>
                <div className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-xs font-bold text-gray-500">{t.lblDate}: {new Date(result.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- MAIN LANDING PAGE COMPONENT ---
export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en"); 
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* PROFESSIONAL NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-600/20">
              GM
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">CARGO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">{t.navHome}</a>
            <a href="#jinsi" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">{t.navHow}</a>
            <a href="#huduma" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">{t.navServices}</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button onClick={() => setLang('en')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${lang === 'en' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
              <button onClick={() => setLang('sw')} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${lang === 'sw' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>SW</button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH PARALLAX */}
      <div className="relative pt-40 pb-48 px-4 overflow-hidden bg-slate-900">
        
        {/* PARALLAX BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed opacity-40" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?q=80&w=2070&auto=format&fit=crop")' }}
          ></div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
        </div>

        {/* Abstract Glows juu ya picha */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-blue-600/30 to-transparent blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-indigo-600/30 to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 font-bold text-sm mb-8 backdrop-blur-md">
            {t.heroBadge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] text-white tracking-tight drop-shadow-lg">
            {t.heroTitle} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              {t.heroTitleHighlight}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {t.heroSub}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#fuatilia" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/40">
              {t.btnHeroTrack}
            </a>
            <a href="#mawasiliano" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-md">
              {t.btnHeroContact}
            </a>
          </div>
        </div>
      </div>

      {/* TRUST STATS SECTION */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-12 mb-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100">
          <div className="text-center pt-4 md:pt-0">
            <h4 className="text-4xl font-black text-blue-600 mb-2">{t.stat1}</h4>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">{t.stat1Sub}</p>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <h4 className="text-4xl font-black text-blue-600 mb-2">{t.stat2}</h4>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">{t.stat2Sub}</p>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <h4 className="text-4xl font-black text-blue-600 mb-2">{t.stat3}</h4>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">{t.stat3Sub}</p>
          </div>
        </div>
      </div>

      {/* TRACKING COMPONENT */}
      <Suspense fallback={<div className="p-20 text-center font-bold text-gray-500">Inapakia mfumo...</div>}>
        <TrackingSection lang={lang} />
      </Suspense>

      {/* HOW IT WORKS */}
      <div id="jinsi" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t.howTitle}</h2>
            <p className="text-slate-500 text-lg">{t.howSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0"></div>
            
            <div className="relative z-10 text-center px-4">
              <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl font-black text-blue-600 mb-6 border border-gray-100">1</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.hw1T}</h3>
              <p className="text-slate-600 leading-relaxed">{t.hw1D}</p>
            </div>
            
            <div className="relative z-10 text-center px-4 mt-8 md:mt-0">
              <div className="w-24 h-24 mx-auto bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center text-3xl font-black text-white mb-6">2</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.hw2T}</h3>
              <p className="text-slate-600 leading-relaxed">{t.hw2D}</p>
            </div>
            
            <div className="relative z-10 text-center px-4 mt-8 md:mt-0">
              <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl font-black text-blue-600 mb-6 border border-gray-100">3</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.hw3T}</h3>
              <p className="text-slate-600 leading-relaxed">{t.hw3D}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM SERVICES WITH PARALLAX & GLASSMORPHISM */}
      <div id="huduma" className="relative py-32 bg-slate-900 overflow-hidden">
        {/* PARALLAX BACKGROUND IMAGE */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop")' }}
        ></div>
        {/* OVERLAY KUFANYA MANENO YASOMEKE */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-900/90 to-slate-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">{t.srvTitle}</h2>
            <p className="text-blue-200 text-lg">{t.srvSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-blue-600/80 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/20 group-hover:bg-white rounded-2xl flex items-center justify-center mb-8 transition-colors">
                <div className="text-blue-400 group-hover:text-blue-600"><TruckIcon /></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 transition-colors">{t.s1T}</h3>
              <p className="text-slate-300 group-hover:text-blue-50 leading-relaxed transition-colors">{t.s1D}</p>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-slate-800/80 group-hover:bg-white rounded-2xl flex items-center justify-center mb-8 transition-colors">
                <div className="text-white group-hover:text-slate-900"><ShieldIcon /></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 transition-colors">{t.s2T}</h3>
              <p className="text-slate-300 group-hover:text-white leading-relaxed transition-colors">{t.s2D}</p>
            </div>
            
            {/* Card 3 */}
            <div className="group bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-blue-600/80 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/20 group-hover:bg-white rounded-2xl flex items-center justify-center mb-8 transition-colors">
                <div className="text-blue-400 group-hover:text-blue-600"><WalletIcon /></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 transition-colors">{t.s3T}</h3>
              <p className="text-slate-300 group-hover:text-blue-50 leading-relaxed transition-colors">{t.s3D}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRO FOOTER */}
      <footer id="mawasiliano" className="bg-slate-950 text-slate-400 py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">GM</div>
              <span className="text-2xl font-black text-white tracking-tight">CARGO</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8">{t.footDesc}</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 cursor-pointer transition-colors flex items-center justify-center text-white">f</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-400 cursor-pointer transition-colors flex items-center justify-center text-white">in</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 cursor-pointer transition-colors flex items-center justify-center text-white">ig</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footQuick}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t.navHome}</a></li>
              <li><a href="#fuatilia" className="hover:text-blue-400 transition-colors">{t.navTrack}</a></li>
              <li><a href="#jinsi" className="hover:text-blue-400 transition-colors">{t.navHow}</a></li>
              <li><a href="#huduma" className="hover:text-blue-400 transition-colors">{t.navServices}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footContact}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3"><span className="text-blue-500 mt-0.5">📍</span> {t.address}</li>
              <li className="flex items-center gap-3"><span className="text-blue-500">📞</span> +255 700 000 000</li>
              <li className="flex items-center gap-3"><span className="text-blue-500">✉️</span> info@gmcargo.co.tz</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} GM Cargo. {t.rights}</p>
          <button onClick={() => router.push('/admin')} className="text-xs text-slate-800 hover:text-slate-500 transition-colors flex items-center gap-1 font-mono">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            {t.adminLink}
          </button>
        </div>
      </footer>
    </div>
  );
}