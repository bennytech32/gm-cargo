"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// --- KAMUSI YA LUGHA (DICTIONARY) ---
const dict: any = {
  en: {
    sbDash: "Dashboard", sbReg: "Register Cargo", sbUsers: "Users (Runners)",
    sbAgents: "Regional Agents", sbManifest: "Dispatch Manifest", sbSettings: "Settings & Receipt",
    loggedIn: "Logged in as", logout: "Logout from System",
    dTitle: "Office Overview", dSub: "Track and manage all shipments in real-time.",
    dSearch: "Search Tracking / Phone...", dRev: "Total Revenue", dVal: "Stored Cargo Value", 
    dTot: "Total Packages", dOnline: "Runners Online",
    thTrack: "Tracking & Runner", thNames: "Sender & Receiver", thDest: "Destination & Assignment", thCost: "Cost / Value", thStatus: "Status & Action",
    btnPrint: "Print", btnDel: "Delete", confirmDel: "Are you sure you want to delete this package?", regBy: "By:", dAssignMan: "Assign Manifest", dAssignAgt: "Assign Agent",
    rTitle: "Register New Cargo", rSub: "Enter details for the new package received at the office.",
    rSendN: "Sender Name", rSendP: "Sender Phone", rRecN: "Receiver Name", rRecP: "Receiver Phone",
    rDest: "Destination Region", rDesc: "Package Description", rCost: "Shipping Cost (TZS)", rVal: "Cargo Value (TZS)",
    btnReg: "REGISTER CARGO", btnRegLoad: "Registering...",
    uTitle: "System Users", uSub: "Manage Admins and Runners using the system.",
    uAdd: "Add Employee", uName: "Full Name", uPhone: "Phone (Username)", uPass: "Password", uRole: "Role",
    btnUser: "+ Add Employee", thURole: "Role", thUStat: "Status",
    aTitle: "Regional Agents", aSub: "Manage your branches and agents across different regions.",
    aAdd: "Add New Agent", aRegion: "Region / City", aAddress: "Office Address",
    btnAgent: "+ Save Agent", thAReg: "Region", thAName: "Agent Name", thAAddr: "Address",
    mTitle: "Dispatch Manifests", mSub: "Create and manage trip manifests for vehicles leaving the station.",
    mAdd: "Create Manifest", mDriver: "Driver Name", mPlate: "Vehicle Plate No.", mRoute: "Route (e.g., Dar - Mwanza)",
    btnMan: "+ Create Manifest", thMID: "Manifest ID", thMDriver: "Driver & Vehicle", thMRoute: "Route", thMAction: "Action",
    btnPrintMan: "Print Manifest",
    sTitle: "System Settings", sSub: "Modify receipt terms and other configurations.",
    sTerms: "Receipt Terms & Conditions", sTermsDesc: "These terms will appear at the bottom of printed and WhatsApp receipts.",
    btnSave: "Save Settings"
  },
  sw: {
    sbDash: "Dashibodi Kuu", sbReg: "Sajili Mzigo", sbUsers: "Watumiaji (Runners)",
    sbAgents: "Mawakala Mikoani", sbManifest: "Manifest ya Safari", sbSettings: "Mipangilio & Risiti",
    loggedIn: "Umeingia kama", logout: "Toka Kwenye Mfumo",
    dTitle: "Muhtasari wa Ofisi", dSub: "Fuatilia na dhibiti mizigo yote inayosafirishwa.",
    dSearch: "Tafuta Tracking / Simu...", dRev: "Mapato (Nauli)", dVal: "Thamani ya Mizigo", 
    dTot: "Jumla ya Mizigo", dOnline: "Runners Online",
    thTrack: "Tracking & Runner", thNames: "Mtumaji & Mpokeaji", thDest: "Mkoa na Upangaji", thCost: "Nauli / Thamani", thStatus: "Hali na Risiti",
    btnPrint: "Printi", btnDel: "Futa", confirmDel: "Je, una uhakika unataka kufuta mzigo huu moja kwa moja?", regBy: "Na:", dAssignMan: "Pangia Manifest", dAssignAgt: "Pangia Wakala",
    rTitle: "Sajili Mzigo Mpya", rSub: "Ingiza taarifa za mzigo unaopokelewa ofisini.",
    rSendN: "Jina la Mtumaji", rSendP: "Simu ya Mtumaji", rRecN: "Jina la Mpokeaji", rRecP: "Simu ya Mpokeaji",
    rDest: "Mkoa Unapoenda", rDesc: "Maelezo ya Mzigo", rCost: "Nauli (TZS)", rVal: "Thamani (TZS)",
    btnReg: "SAJILI MZIGO", btnRegLoad: "Inasajili...",
    uTitle: "Watumiaji na Wafanyakazi", uSub: "Dhibiti Admins na Runners wanaotumia mfumo.",
    uAdd: "Ongeza Mfanyakazi", uName: "Jina Kamili", uPhone: "Simu (Username)", uPass: "Password", uRole: "Cheo",
    btnUser: "+ Ongeza Mfanyakazi", thURole: "Cheo", thUStat: "Hali",
    aTitle: "Mawakala Mikoani", aSub: "Dhibiti matawi na mawakala wako mikoani.",
    aAdd: "Sajili Wakala Mpya", aRegion: "Mkoa / Mji", aAddress: "Anwani ya Ofisi",
    btnAgent: "+ Hifadhi Wakala", thAReg: "Mkoa", thAName: "Jina la Wakala", thAAddr: "Anwani",
    mTitle: "Manifest za Safari", mSub: "Tengeneza na dhibiti orodha za safari za magari yanayoondoka.",
    mAdd: "Tengeneza Manifest", mDriver: "Jina la Dereva", mPlate: "Namba ya Gari", mRoute: "Njia (Mf. Dar - Mwanza)",
    btnMan: "+ Tengeneza Manifest", thMID: "Namba ya Manifest", thMDriver: "Dereva & Gari", thMRoute: "Njia", thMAction: "Vitendo",
    btnPrintMan: "Printi Manifest",
    sTitle: "Mipangilio ya Mfumo", sSub: "Badilisha masharti yanayotokea chini ya risiti za wateja.",
    sTerms: "Masharti ya Risiti", sTermsDesc: "Maneno haya yataonekana mwishoni mwa kila risiti.",
    btnSave: "Hifadhi Mipangilio"
  }
};

// --- ICONS (SVG) KWA AJILI YA SIDEBAR ---
const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const IconBox = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const IconAgents = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const IconManifest = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const IconMenu = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;
const IconClose = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;

export default function Dashboard() {
  const router = useRouter();
  const [lang, setLang] = useState("en"); 
  const t = dict[lang];
  
  // --- STATES ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [waybills, setWaybills] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminId, setAdminId] = useState("");
  
  const [agents, setAgents] = useState([{ id: 1, name: "Juma Wakala", region: "Mwanza", phone: "0755123456", address: "Nyegezi Stand" }]);
  const [manifests, setManifests] = useState([{ id: "MNF-1001", driver: "Ally Juma", vehicle: "T 123 ABC", route: "Dar - Mwanza", status: "PENDING" }]);
  
  const [actionLoading, setActionLoading] = useState(false);
  const [cargoForm, setCargoForm] = useState({ senderName: "", senderPhone: "", receiverName: "", receiverPhone: "", destination: "", description: "", shippingCost: "", cargoValue: "" });
  const [userForm, setUserForm] = useState({ name: "", phone: "", password: "", role: "RUNNER" });
  const [agentForm, setAgentForm] = useState({ name: "", region: "", phone: "", address: "" });
  const [manifestForm, setManifestForm] = useState({ driver: "", vehicle: "", route: "" });
  const [receiptTerms, setReceiptTerms] = useState("1. Goods lost will be compensated according to declared value.\n2. Collect within 7 days.\n3. Keep this receipt.");

  // --- INITIAL LOAD ---
  useEffect(() => {
    const id = localStorage.getItem("admin_id");
    if (!id) {
      router.push("/admin");
    } else {
      setAdminId(id);
      setAdminName(localStorage.getItem("admin_name") || "Admin");
      fetchWaybills();
      fetchUsers();
      const savedTerms = localStorage.getItem("receipt_terms");
      if (savedTerms) setReceiptTerms(savedTerms);
    }
  }, []);

  // --- API CALLS ---
  async function fetchWaybills() {
    try {
      const res = await fetch("/api/waybills");
      if (res.ok) setWaybills(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (res.ok) setUsers(await res.json());
    } catch (e) { console.error(e); }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/waybills/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchWaybills();
  };

  // Njia mpya ya kufuta Mzigo (Delete Waybill)
  const handleDeleteWaybill = async (id: string) => {
    if (!window.confirm(t.confirmDel)) return;
    try {
      const res = await fetch(`/api/waybills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchWaybills(); // Refresh the list
      } else {
        alert("Failed to delete the package.");
      }
    } catch (error) {
      alert("Network Error.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/admin");
  };

  const handleAssignLocal = (waybillId: string, field: string, value: string) => {
    setWaybills(prev => prev.map(w => w.id === waybillId ? { ...w, [field]: value } : w));
  };

  // --- PRINT FUNCTIONS ---
  // HAPA TUMEBADILISHA CSS IENDANE NA THERMAL PRINTER ZA 58MM NA 80MM
  const handlePrintReceipt = (mzigo: any) => {
    const runnerName = getRunnerName(mzigo.registeredById);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const htmlContent = `<html><head><title>Risiti - ${mzigo.trackingNumber}</title><style>
      @page { margin: 0; size: 58mm auto; }
      body { font-family: 'Courier New', monospace; width: 58mm; margin: 0; padding: 2mm; color: #000; font-size: 12px; line-height: 1.2; box-sizing: border-box; }
      h2 { text-align: center; margin: 0 0 5px 0; font-size: 16px; }
      .center { text-align: center; }
      .line { border-top: 1px dashed #000; margin: 5px 0; }
      .row { display: flex; justify-content: space-between; margin-bottom: 3px; }
      .bold { font-weight: bold; }
      .terms { font-size: 9px; margin-top: 10px; text-align: center; color: #000; }
    </style></head><body><h2>GM CARGO</h2><div class="center bold">Mzigo Traking Risiti</div><div class="line"></div><div class="row"><span>Tracking:</span> <span class="bold">${mzigo.trackingNumber}</span></div><div class="row"><span>Tarehe:</span> <span>${new Date(mzigo.createdAt).toLocaleDateString()}</span></div><div class="line"></div><div class="row"><span>Mtumaji:</span> <span class="bold">${mzigo.senderName}</span></div><div class="row"><span>Simu:</span> <span>${mzigo.senderPhone}</span></div><div class="line"></div><div class="row"><span>Mpokeaji:</span> <span class="bold">${mzigo.receiverName}</span></div><div class="row"><span>Simu:</span> <span>${mzigo.receiverPhone}</span></div><div class="row"><span>Mkoa:</span> <span class="bold">${mzigo.destination}</span></div><div class="line"></div><div class="row"><span>Nauli:</span> <span class="bold">TZS ${mzigo.shippingCost?.toLocaleString() || 0}</span></div><div class="row"><span>Thamani:</span> <span>TZS ${mzigo.cargoValue?.toLocaleString() || 0}</span></div><div class="line"></div><div class="center" style="font-size:10px;margin-top:5px;">Imehudumiwa na: ${runnerName}</div><div class="terms">${receiptTerms.replace(/\n/g, '<br/>')}</div><div class="center bold" style="margin-top:10px;">Asante kwa kuchagua GM Cargo</div><script>window.onload=function(){window.print();window.close();}</script></body></html>`;
    printWindow.document.write(htmlContent); printWindow.document.close();
  };

  const handlePrintManifest = (manifest: any) => {
    const manifestCargo = waybills.filter(w => w.manifestId === manifest.id);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const htmlContent = `<html><head><title>Manifest - ${manifest.id}</title><style>body{font-family:Arial,sans-serif;padding:30px;color:#000}.header{text-align:center;margin-bottom:20px;border-bottom:2px solid #000;padding-bottom:15px}.header h1{margin:0 0 5px 0;font-size:28px;text-transform:uppercase}.details{display:flex;justify-content:space-between;margin-bottom:20px;font-weight:bold;background:#f9f9f9;padding:15px;border:1px solid #ddd}table{width:100%;border-collapse:collapse;margin-bottom:30px;font-size:12px}th,td{border:1px solid #000;padding:10px;text-align:left}th{background-color:#f2f2f2;text-transform:uppercase}.footer{display:flex;justify-content:space-between;margin-top:50px;font-weight:bold}.sig-line{border-top:1px solid #000;width:200px;padding-top:5px;text-align:center}</style></head><body><div class="header"><h1>GM CARGO - DISPATCH MANIFEST</h1><p style="margin:0;font-size:18px;">Manifest No: <b>${manifest.id}</b></p></div><div class="details"><div>Route: ${manifest.route}</div><div>Driver: ${manifest.driver}</div><div>Vehicle: ${manifest.vehicle}</div><div>Date: ${new Date().toLocaleDateString()}</div></div><table><thead><tr><th>No.</th><th>Tracking</th><th>Sender Details</th><th>Receiver Details</th><th>Destination</th><th>Receiving Agent</th><th>Sign</th></tr></thead><tbody>${manifestCargo.length>0?manifestCargo.map((w:any,i:number)=>{const agent=agents.find(a=>a.id.toString()===w.agentId);return `<tr><td>${i+1}</td><td><b>${w.trackingNumber}</b></td><td>${w.senderName}<br/>${w.senderPhone}</td><td>${w.receiverName}<br/>${w.receiverPhone}</td><td>${w.destination}</td><td>${agent?agent.name:'N/A'}</td><td></td></tr>`}).join(''):'<tr><td colspan="7" style="text-align:center;padding:20px;">Hakuna mizigo kwenye Manifest hii.</td></tr>'}</tbody></table><div class="footer"><div><div class="sig-line">Driver Signature</div></div><div><div class="sig-line">Manager Signature</div></div></div><script>window.onload=function(){window.print();window.close();}</script></body></html>`;
    printWindow.document.write(htmlContent); printWindow.document.close();
  };

  const getRunnerName = (id: string) => {
    const user = users.find(u => u.id === id);
    return user ? user.name : "Ofisini / Admin";
  };

  // --- FORM HANDLERS ---
  const handleRegisterCargo = async (e: any) => {
    e.preventDefault(); 
    setActionLoading(true);
    try {
      const trackingNumber = "GM-" + Math.floor(100000 + Math.random() * 900000);
      const payload = {
        ...cargoForm,
        trackingNumber: trackingNumber,
        status: "RECEIVED", 
        registeredById: adminId,
        shippingCost: Number(cargoForm.shippingCost) || 0,
        cargoValue: Number(cargoForm.cargoValue) || 0
      };

      const res = await fetch("/api/waybills", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Safi! Mzigo umesajiliwa kikamilifu. ✅"); 
        setCargoForm({ senderName: "", senderPhone: "", receiverName: "", receiverPhone: "", destination: "", description: "", shippingCost: "", cargoValue: "" });
        fetchWaybills(); 
        setActiveTab("dashboard");
      } else {
        const err = await res.json();
        alert("Imeshindwa kusajili: " + (err.error || "Angalia kama umeweka taarifa zote."));
      }
    } catch (error) { 
      alert("Kosa la kimtandao. API haipatikani!"); 
    } finally { 
      setActionLoading(false); 
    }
  };

  const handleAddUser = async (e: any) => {
    e.preventDefault(); setActionLoading(true);
    try {
      const res = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userForm) });
      if (res.ok) {
        alert("User Added!"); setUserForm({ name: "", phone: "", password: "", role: "RUNNER" }); fetchUsers();
      }
    } catch (error) { alert("Network Error"); } finally { setActionLoading(false); }
  };

  const handleAddAgent = (e: any) => {
    e.preventDefault(); setAgents([{ id: Date.now(), ...agentForm }, ...agents]); setAgentForm({ name: "", region: "", phone: "", address: "" }); alert("Agent Added (Local State)");
  };

  const handleAddManifest = (e: any) => {
    e.preventDefault(); setManifests([{ id: `MNF-${Math.floor(Math.random() * 10000)}`, ...manifestForm, status: "PENDING" }, ...manifests]); setManifestForm({ driver: "", vehicle: "", route: "" }); alert("Manifest Created (Local State)");
  };

  const handleSaveSettings = (e: any) => {
    e.preventDefault(); localStorage.setItem("receipt_terms", receiptTerms); alert("Settings Saved!");
  };

  // --- ANALYTICS & FILTERS ---
  const totalRevenue = waybills.reduce((sum: any, item: any) => sum + (item.shippingCost || 0), 0);
  const totalCargoValue = waybills.reduce((sum: any, item: any) => sum + (item.cargoValue || 0), 0);
  const onlineRunnersCount = users.filter((u: any) => u.role === "RUNNER" && u.isActive).length;
  const filteredWaybills = waybills.filter((w: any) => w.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || w.senderPhone?.includes(searchTerm) || w.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading && waybills.length === 0) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading system...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full font-sans selection:bg-blue-200">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black">GM</div>
            <h2 className="text-xl font-black tracking-tight">ADMIN</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <button onClick={() => setLang('en')} className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('sw')} className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${lang === 'sw' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>SW</button>
            </div>
            <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <IconClose />
            </button>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconHome /> {t.sbDash}</button>
          <button onClick={() => { setActiveTab("register"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'register' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconBox /> {t.sbReg}</button>
          <button onClick={() => { setActiveTab("users"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconUsers /> {t.sbUsers}</button>
          <button onClick={() => { setActiveTab("agents"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'agents' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconAgents /> {t.sbAgents}</button>
          <button onClick={() => { setActiveTab("manifest"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'manifest' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconManifest /> {t.sbManifest}</button>
          <div className="my-4 border-t border-slate-800/50"></div>
          <button onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconSettings /> {t.sbSettings}</button>
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <div className="bg-slate-800 p-4 rounded-xl mb-4">
            <p className="text-xs text-slate-400">{t.loggedIn}</p>
            <p className="font-bold text-sm truncate">{adminName}</p>
          </div>
          <button onClick={handleLogout} className="w-full bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2.5 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors text-sm">{t.logout}</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        <header className="flex items-center justify-between px-4 py-4 bg-white border-b md:hidden shadow-sm shrink-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-white text-sm">GM</div>
            <span className="font-bold text-slate-900 tracking-wide">ADMIN</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <IconMenu />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="animate-fade-in-up max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900">{t.dTitle}</h1>
                  <p className="text-sm md:text-base text-slate-500">{t.dSub}</p>
                </div>
                <input 
                  type="text" placeholder={t.dSearch} 
                  className="w-full md:w-80 p-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-600 text-black outline-none transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* KADI ZA MUHTASARI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-2 -mt-2"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t.dRev}</p>
                  <p className="text-xl md:text-2xl font-black text-blue-600 relative z-10">TZS {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -mr-2 -mt-2"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t.dVal}</p>
                  <p className="text-xl md:text-2xl font-black text-green-600 relative z-10">TZS {totalCargoValue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -mr-2 -mt-2"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t.dTot}</p>
                  <p className="text-xl md:text-2xl font-black text-slate-800 relative z-10">{waybills.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-2 -mt-2"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">{t.dOnline}</p>
                  <p className="text-xl md:text-2xl font-black text-purple-600 relative z-10">{onlineRunnersCount}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                <table className="w-full text-left min-w-[950px]">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t.thTrack}</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t.thNames}</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t.thDest}</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t.thCost}</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{t.thStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredWaybills.map((mzigo: any) => (
                      <tr key={mzigo.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="font-black text-blue-600">{mzigo.trackingNumber}</div>
                          <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase bg-slate-100 inline-block px-2 py-0.5 rounded-full">
                            {t.regBy} <span className="text-slate-600">{getRunnerName(mzigo.registeredById)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900">{mzigo.senderName} ➡️ {mzigo.receiverName}</div>
                          <div className="text-xs text-slate-500">{mzigo.receiverPhone}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-700 mb-2">{mzigo.destination}</div>
                          <div className="flex flex-col gap-1">
                            <select value={mzigo.manifestId || ""} onChange={(e) => handleAssignLocal(mzigo.id, 'manifestId', e.target.value)} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 rounded p-1 outline-none focus:border-blue-400 w-full">
                              <option value="">-- {t.dAssignMan} --</option>
                              {manifests.map((m: any) => <option key={m.id} value={m.id}>{m.id} ({m.route})</option>)}
                            </select>
                            <select value={mzigo.agentId || ""} onChange={(e) => handleAssignLocal(mzigo.id, 'agentId', e.target.value)} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 rounded p-1 outline-none focus:border-blue-400 w-full">
                              <option value="">-- {t.dAssignAgt} --</option>
                              {agents.map((a: any) => <option key={a.id} value={a.id}>{a.name} ({a.region})</option>)}
                            </select>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-black text-slate-900">TZS {mzigo.shippingCost?.toLocaleString()}</div>
                          <div className="text-xs font-bold text-green-600">Val: TZS {mzigo.cargoValue?.toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <select value={mzigo.status} onChange={(e) => updateStatus(mzigo.id, e.target.value)} className="text-xs font-bold bg-white border border-slate-200 rounded-lg p-2 text-slate-700 outline-none cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                              <option value="RECEIVED">📦 RECEIVED</option>
                              <option value="IN_TRANSIT">🚚 IN_TRANSIT</option>
                              <option value="DELIVERED">✅ DELIVERED</option>
                              <option value="CANCELLED">❌ CANCELLED</option>
                            </select>
                            <div className="flex gap-2">
                              {/* KITUFE CHA PRINT */}
                              <button onClick={() => handlePrintReceipt(mzigo)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 p-2 rounded-lg transition-colors flex items-center justify-center" title={t.btnPrint}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                              </button>
                              {/* KITUFE KIPYA CHA DELETE */}
                              <button onClick={() => handleDeleteWaybill(mzigo.id)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg transition-colors flex items-center justify-center" title={t.btnDel}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SAJILI MZIGO */}
          {activeTab === "register" && (
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.rTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.rSub}</p>
              
              <form onSubmit={handleRegisterCargo} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rSendN}</label>
                    <input type="text" required value={cargoForm.senderName} onChange={(e)=>setCargoForm({...cargoForm, senderName: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rSendP}</label>
                    <input type="text" required value={cargoForm.senderPhone} onChange={(e)=>setCargoForm({...cargoForm, senderPhone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rRecN}</label>
                    <input type="text" required value={cargoForm.receiverName} onChange={(e)=>setCargoForm({...cargoForm, receiverName: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rRecP}</label>
                    <input type="text" required value={cargoForm.receiverPhone} onChange={(e)=>setCargoForm({...cargoForm, receiverPhone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rDest}</label>
                  <input type="text" required value={cargoForm.destination} onChange={(e)=>setCargoForm({...cargoForm, destination: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500" />
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rDesc}</label>
                  <input type="text" value={cargoForm.description} onChange={(e)=>setCargoForm({...cargoForm, description: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rCost}</label>
                    <input type="number" required value={cargoForm.shippingCost} onChange={(e)=>setCargoForm({...cargoForm, shippingCost: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500 font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rVal}</label>
                    <input type="number" required value={cargoForm.cargoValue} onChange={(e)=>setCargoForm({...cargoForm, cargoValue: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500 font-bold" />
                  </div>
                </div>

                <button type="submit" disabled={actionLoading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-black hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {actionLoading ? t.btnRegLoad : t.btnReg}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: WATUMIAJI (Users) */}
          {activeTab === "users" && (
            <div className="animate-fade-in-up max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.uTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.uSub}</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-1">
                  <form onSubmit={handleAddUser} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-6">
                    <h3 className="text-lg font-black text-slate-800 mb-4">{t.uAdd}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.uName}</label>
                        <input type="text" required value={userForm.name} onChange={(e)=>setUserForm({...userForm, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.uPhone}</label>
                        <input type="text" required value={userForm.phone} onChange={(e)=>setUserForm({...userForm, phone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.uPass}</label>
                        <input type="password" required value={userForm.password} onChange={(e)=>setUserForm({...userForm, password: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.uRole}</label>
                        <select value={userForm.role} onChange={(e)=>setUserForm({...userForm, role: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm font-bold bg-white">
                          <option value="RUNNER">Runner</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                      <button type="submit" disabled={actionLoading} className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold hover:bg-slate-800 mt-2">
                        {actionLoading ? "..." : t.btnUser}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-2 overflow-x-auto">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-w-[600px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.uName}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.uPhone}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thURole}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thUStat}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {users.map((user: any) => (
                          <tr key={user.id} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-800">{user.name}</td>
                            <td className="p-4 text-sm text-slate-600">{user.phone}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {user.isActive ? "ACTIVE" : "INACTIVE"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MAWAKALA (Regional Agents) */}
          {activeTab === "agents" && (
            <div className="animate-fade-in-up max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.aTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.aSub}</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-1">
                  <form onSubmit={handleAddAgent} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-6">
                    <h3 className="text-lg font-black text-slate-800 mb-4">{t.aAdd}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.thAName}</label>
                        <input type="text" required value={agentForm.name} onChange={(e)=>setAgentForm({...agentForm, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.aRegion}</label>
                        <input type="text" required value={agentForm.region} onChange={(e)=>setAgentForm({...agentForm, region: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.uPhone}</label>
                        <input type="text" required value={agentForm.phone} onChange={(e)=>setAgentForm({...agentForm, phone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.aAddress}</label>
                        <input type="text" required value={agentForm.address} onChange={(e)=>setAgentForm({...agentForm, address: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 mt-2">
                        {t.btnAgent}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-2 overflow-x-auto">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-w-[600px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thAReg}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thAName}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.uPhone}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thAAddr}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {agents.map((agent: any) => (
                          <tr key={agent.id} className="hover:bg-slate-50">
                            <td className="p-4 font-black text-blue-600">{agent.region}</td>
                            <td className="p-4 font-bold text-slate-800">{agent.name}</td>
                            <td className="p-4 text-sm text-slate-600">{agent.phone}</td>
                            <td className="p-4 text-sm text-slate-600">{agent.address}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MANIFEST (Dispatch) */}
          {activeTab === "manifest" && (
            <div className="animate-fade-in-up max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.mTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.mSub}</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-1">
                  <form onSubmit={handleAddManifest} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-6">
                    <h3 className="text-lg font-black text-slate-800 mb-4">{t.mAdd}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.mDriver}</label>
                        <input type="text" required value={manifestForm.driver} onChange={(e)=>setManifestForm({...manifestForm, driver: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.mPlate}</label>
                        <input type="text" required value={manifestForm.vehicle} onChange={(e)=>setManifestForm({...manifestForm, vehicle: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm font-bold uppercase" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.mRoute}</label>
                        <input type="text" required value={manifestForm.route} onChange={(e)=>setManifestForm({...manifestForm, route: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold hover:bg-slate-800 mt-2">
                        {t.btnMan}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-2 overflow-x-auto">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-w-[600px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thMID}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thMDriver}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thMRoute}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thMAction}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {manifests.map((man: any) => (
                          <tr key={man.id} className="hover:bg-slate-50">
                            <td className="p-4 font-black text-blue-600">{man.id}</td>
                            <td className="p-4">
                              <div className="font-bold text-slate-800">{man.driver}</div>
                              <div className="text-xs text-slate-500 uppercase bg-slate-200 inline-block px-2 py-0.5 rounded mt-1">{man.vehicle}</div>
                            </td>
                            <td className="p-4 text-sm font-bold text-slate-700">{man.route}</td>
                            <td className="p-4">
                              <button 
                                onClick={() => handlePrintManifest(man)} 
                                className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 flex items-center gap-2 border border-blue-200 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                {t.btnPrintMan}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MIPANGILIO (Settings) */}
          {activeTab === "settings" && (
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.sTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.sSub}</p>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-4">
                  {t.sTerms}
                </label>
                <textarea 
                  rows={6}
                  value={receiptTerms}
                  onChange={(e) => setReceiptTerms(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
                <p className="text-xs text-slate-400 mt-2 mb-6">{t.sTermsDesc}</p>
                
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  {t.btnSave}
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}