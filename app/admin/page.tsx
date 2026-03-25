"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PackageSearch, Globe, Lock, User, ArrowRight } from "lucide-react";

// --- KAMUSI YA LUGHA (DICTIONARY) ---
const dict: any = {
  en: {
    title: "GM Cargo Portal",
    subTitle: "Enter your credentials to access the secure office.",
    phoneLabel: "Phone / Username",
    phonePlace: "e.g., 0700000000 or admin",
    passLabel: "Password",
    passPlace: "••••••••",
    btnLogin: "Login to Office",
    btnLoading: "Authenticating...",
    errorNet: "Network Error. Please check your connection.",
  },
  sw: {
    title: "Ofisi ya GM Cargo",
    subTitle: "Weka taarifa zako za siri kuingia ofisini.",
    phoneLabel: "Simu / Username",
    phonePlace: "Mf. 0700000000 au admin",
    passLabel: "Nenosiri (Password)",
    passPlace: "••••••••",
    btnLogin: "Ingia Ofisini",
    btnLoading: "Inahakiki...",
    errorNet: "Kosa la kimtandao. Jaribu tena.",
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState("sw"); // Default lugha ni Kiswahili
  const t = dict[lang];

  // Logic za kawaida za Login (Hazijabadilishwa)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Hifadhi taarifa za Admin
        localStorage.setItem("admin_id", data.user.id);
        localStorage.setItem("admin_name", data.user.name || data.user.username || "Bosi Mkuu");
        
        // Mpeleke kwenye Dashboard
        router.push("/dashboard");
      } else {
        setError(data.error || "Taarifa sio sahihi.");
      }
    } catch (err) {
      setError(t.errorNet);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      
      {/* MAPAMBO YA NYUMA (Background Design Elements) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      {/* KITUFE CHA KUBADILI LUGHA (Top Right) */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-slate-200">
        <Globe size={16} className="text-slate-500" />
        <div className="flex gap-1">
          <button 
            onClick={() => setLang('en')} 
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('sw')} 
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'sw' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            SW
          </button>
        </div>
      </div>

      {/* KADI YA LOGIN (Login Card) */}
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
          
          {/* LOGO & TITLE */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 transform rotate-3 hover:rotate-0 transition-transform">
              <PackageSearch size={32} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {t.subTitle}
            </p>
          </div>

          {/* UJUMBE WA ERROR */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-xl mb-6 flex items-center gap-2 border border-red-100">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
              {error}
            </div>
          )}

          {/* FOMU YA LOGIN */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.phoneLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.phonePlace}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.passLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passPlace}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.btnLoading}
                </>
              ) : (
                <>
                  {t.btnLogin} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

        </div>
        
        {/* FOOTER YA LOGIN */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} GM Cargo. Powered by B-Tech Group.
          </p>
        </div>
      </div>
    </div>
  );
}