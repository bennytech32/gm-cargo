"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// --- KAMUSI YA LUGHA (DICTIONARY) ---
const dict: any = {
  en: {
    sbDash: "Dashboard", sbReg: "Register Cargo", sbUsers: "Users (Runners)",
    sbAgents: "Regional Agents", sbManifest: "Dispatch Manifest", sbSettings: "Settings & Receipt",
    sbFinance: "Finance & Reports", // MPYA
    loggedIn: "Logged in as", logout: "Logout from System",
    dTitle: "Office Overview", dSub: "Track and manage all shipments in real-time.",
    dSearch: "Search Tracking / Phone...", dRev: "Total Revenue", dVal: "Stored Cargo Value", 
    dTot: "Total Packages", dOnline: "Runners Online",
    thTrack: "Tracking & Runner", thNames: "Sender & Receiver", thDest: "Destination & Assignment", thCost: "Cost / Value", thStatus: "Status & Action",
    btnPrint: "Print", btnDel: "Delete", confirmDel: "Are you sure you want to delete this package?", regBy: "By:", dAssignMan: "Assign Manifest", dAssignAgt: "Assign Agent",
    rTitle: "Register New Cargo", rSub: "Enter details for the new package received at the office.",
    rSendN: "Sender Name", rSendP: "Sender Phone", rRecN: "Receiver Name", rRecP: "Receiver Phone",
    rDest: "Destination Region", rDesc: "Package Description", rCost: "Shipping Cost (TZS)", rVal: "Cargo Value (TZS)",
    rPayStat: "Payment Status", rPayMeth: "Payment Method", rSms: "Send SMS to Receiver", // MPYA
    payPaid: "PAID", payPod: "PAY ON DELIVERY", payCredit: "CREDIT", // MPYA
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
    sPhones: "Company Phone Numbers", sTin: "TIN Number", sWeb: "Website", 
    btnSave: "Save Settings",
    fTitle: "Finance & Daily Reports", fSub: "Manage petty cash, daily earnings, and EOD reports.", // MPYA
    fExpTitle: "Record Office Expense", fExpDesc: "Expense Description", fExpAmt: "Amount (TZS)", btnExp: "Save Expense", // MPYA
    fRepTitle: "End of Day Summary", fRepCash: "Total Cash", fRepMomo: "Mobile Money", fRepBank: "Bank Transfers", fRepDebt: "Total Debt / Unpaid", fRepExp: "Total Expenses", fRepNet: "Net Cash in Office", // MPYA
    thExpDesc: "Description", thExpAmt: "Amount", thExpDate: "Date" // MPYA
  },
  sw: {
    sbDash: "Dashibodi Kuu", sbReg: "Sajili Mzigo", sbUsers: "Watumiaji (Runners)",
    sbAgents: "Mawakala Mikoani", sbManifest: "Manifest ya Safari", sbSettings: "Mipangilio & Risiti",
    sbFinance: "Fedha na Ripoti", // MPYA
    loggedIn: "Umeingia kama", logout: "Toka Kwenye Mfumo",
    dTitle: "Muhtasari wa Ofisi", dSub: "Fuatilia na dhibiti mizigo yote inayosafirishwa.",
    dSearch: "Tafuta Tracking / Simu...", dRev: "Mapato (Nauli)", dVal: "Thamani ya Mizigo", 
    dTot: "Jumla ya Mizigo", dOnline: "Runners Online",
    thTrack: "Tracking & Runner", thNames: "Mtumaji & Mpokeaji", thDest: "Mkoa na Upangaji", thCost: "Nauli / Thamani", thStatus: "Hali na Risiti",
    btnPrint: "Printi", btnDel: "Futa", confirmDel: "Je, una uhakika unataka kufuta mzigo huu moja kwa moja?", regBy: "Na:", dAssignMan: "Pangia Manifest", dAssignAgt: "Pangia Wakala",
    rTitle: "Sajili Mzigo Mpya", rSub: "Ingiza taarifa za mzigo unaopokelewa ofisini.",
    rSendN: "Jina la Mtumaji", rSendP: "Simu ya Mtumaji", rRecN: "Jina la Mpokeaji", rRecP: "Simu ya Mpokeaji",
    rDest: "Mkoa Unapoenda", rDesc: "Maelezo ya Mzigo", rCost: "Nauli (TZS)", rVal: "Thamani (TZS)",
    rPayStat: "Hali ya Malipo", rPayMeth: "Njia ya Malipo", rSms: "Tuma SMS kwa Mpokeaji", // MPYA
    payPaid: "IMELIPIWA", payPod: "LIPA IKIFIKA", payCredit: "DENI", // MPYA
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
    sPhones: "Namba za Simu za Ofisi", sTin: "Namba ya TIN", sWeb: "Tovuti (Website)", 
    btnSave: "Hifadhi Mipangilio",
    fTitle: "Fedha na Ripoti za Siku", fSub: "Dhibiti mapato, matumizi ya ofisi, na ripoti za mwisho wa siku.", // MPYA
    fExpTitle: "Sajili Matumizi (Petty Cash)", fExpDesc: "Maelezo ya Matumizi", fExpAmt: "Kiasi (TZS)", btnExp: "Hifadhi Matumizi", // MPYA
    fRepTitle: "Ripoti ya Hesabu za Leo (Z-Report)", fRepCash: "Jumla ya Cash", fRepMomo: "Mitandao ya Simu", fRepBank: "Benki", fRepDebt: "Jumla ya Madeni", fRepExp: "Jumla ya Matumizi", fRepNet: "Cash Iliyobaki Ofisini", // MPYA
    thExpDesc: "Maelezo ya Matumizi", thExpAmt: "Kiasi", thExpDate: "Tarehe" // MPYA
  }
};

// --- ICONS (SVG) ---
const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const IconBox = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const IconAgents = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const IconManifest = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const IconWallet = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>; // MPYA
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
  
  // FORM YA MZIGO IMEONGEZEWA MALIPO NA SMS
  const [cargoForm, setCargoForm] = useState({ 
    senderName: "", senderPhone: "", receiverName: "", receiverPhone: "", destination: "", description: "", shippingCost: "", cargoValue: "",
    paymentStatus: "PAID", paymentMethod: "CASH", sendSms: true
  });
  
  const [userForm, setUserForm] = useState({ name: "", phone: "", password: "", role: "RUNNER" });
  const [agentForm, setAgentForm] = useState({ name: "", region: "", phone: "", address: "" });
  const [manifestForm, setManifestForm] = useState({ driver: "", vehicle: "", route: "" });
  
  // STATE ZA FINANCE (PETTY CASH)
  const [expenses, setExpenses] = useState([{ id: 1, desc: "Chai ya wabeba mizigo", amount: 5000, date: new Date().toISOString() }]);
  const [expenseForm, setExpenseForm] = useState({ desc: "", amount: "" });

  const [receiptTerms, setReceiptTerms] = useState("- Collect within 4 days\n- No liability without declared value");
  const [companyPhones, setCompanyPhones] = useState("+255 767 359 115 | +255 624 329 115");
  const [companyTin, setCompanyTin] = useState("152-356-013");
  const [companyWebsite, setCompanyWebsite] = useState("www.gm-cargo.co.tz");

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
      const savedPhones = localStorage.getItem("company_phones");
      if (savedPhones) setCompanyPhones(savedPhones);
      const savedTin = localStorage.getItem("company_tin");
      if (savedTin) setCompanyTin(savedTin);
      const savedWeb = localStorage.getItem("company_website");
      if (savedWeb) setCompanyWebsite(savedWeb);
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

  const handleDeleteWaybill = async (id: string) => {
    if (!window.confirm(t.confirmDel)) return;
    try {
      const res = await fetch(`/api/waybills/${id}`, { method: 'DELETE' });
      if (res.ok) fetchWaybills();
      else alert("Failed to delete the package.");
    } catch (error) { alert("Network Error."); }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/admin");
  };

  const handleAssignLocal = (waybillId: string, field: string, value: string) => {
    setWaybills(prev => prev.map(w => w.id === waybillId ? { ...w, [field]: value } : w));
  };

  // --- PRINT FUNCTIONS ---
  const handlePrintReceipt = (mzigo: any) => {
    const runnerName = getRunnerName(mzigo.registeredById);
    const agent = agents.find((a: any) => a.id.toString() === mzigo.agentId);
    const agentHtml = agent ? `<br>------------------------<br>AGENT (${agent.region.toUpperCase()}):<br>${agent.phone}<br>${agent.name}<br>` : "";
    
    // Ufuatiliaji wa Hali ya malipo
    const payStatusLabel = mzigo.paymentStatus === "PAID" ? "PAID" : mzigo.paymentStatus === "PAY_ON_DELIVERY" ? "PAY ON DELIVERY" : mzigo.paymentStatus === "CREDIT" ? "CREDIT" : "PAID";
    const payMethodLabel = mzigo.paymentMethod || "CASH";

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `<html><head><title>Risiti - ${mzigo.trackingNumber}</title><style>
      @page { margin: 0; size: 58mm auto; }
      body { font-family: 'Courier New', monospace; width: 58mm; margin: 0; padding: 2mm; color: #000; font-size: 11px; line-height: 1.3; box-sizing: border-box; }
      .center { text-align: center; } .left { text-align: left; } .bold { font-weight: bold; }
      .qr-code { display: block; margin: 10px auto; width: 80px; height: 80px; }
    </style></head><body>
      
      <div class="center">
        ========================<br>
        <span style="font-size: 12px; font-weight: bold;">GM CARGO COMPANY LIMITED</span><br>
        Reliable • Fast • Secure Logistics<br>
        ${companyPhones}<br>
        ${companyWebsite}<br>
        TIN: ${companyTin}<br>
        ========================
      </div>

      <div class="left">
        <br>
        RECEIPT NO: ${mzigo.trackingNumber}<br>
        DATE: ${new Date(mzigo.createdAt).toLocaleDateString()}<br>
        FROM: DAR ES SALAAM<br>
        TO: ${mzigo.destination.toUpperCase()}<br>
        
        <br>------------------------<br>
        SENDER:<br>
        ${mzigo.senderName}<br>
        ${mzigo.senderPhone}<br>
        
        <br>------------------------<br>
        RECEIVER:<br>
        ${mzigo.receiverName}<br>
        ${mzigo.receiverPhone}<br>
        
        <br>------------------------<br>
        CARGO DETAILS:<br>
        Item: ${mzigo.description || 'Mizigo'}<br>
        Amount: Tsh ${mzigo.shippingCost?.toLocaleString() || 0}<br>
        Payment: <span class="bold">${payStatusLabel} (${payMethodLabel})</span><br>
        
        ${agentHtml}
        
        <br>------------------------<br>
        TERMS:<br>
        ${receiptTerms.replace(/\n/g, '<br>')}<br>
        
        <br>------------------------<br>
      </div>

      <div class="center">
        <img class="qr-code" src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${mzigo.trackingNumber}" alt="QR Code" />
        Served by: ${runnerName}<br>
        Thank you for choosing GM Cargo<br>
        ========================
      </div>

      <script>
        setTimeout(() => { window.print(); window.close(); }, 800);
      </script>
    </body></html>`;
    printWindow.document.write(htmlContent); printWindow.document.close();
  };

  const handlePrintManifest = (manifest: any) => {
    const manifestCargo = waybills.filter(w => w.manifestId === manifest.id);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const htmlContent = `<html><head><title>Manifest - ${manifest.id}</title><style>body{font-family:Arial,sans-serif;padding:30px;color:#000}.header{text-align:center;margin-bottom:20px;border-bottom:2px solid #000;padding-bottom:15px}.header h1{margin:0 0 5px 0;font-size:28px;text-transform:uppercase}.details{display:flex;justify-content:space-between;margin-bottom:20px;font-weight:bold;background:#f9f9f9;padding:15px;border:1px solid #ddd}table{width:100%;border-collapse:collapse;margin-bottom:30px;font-size:12px}th,td{border:1px solid #000;padding:10px;text-align:left}th{background-color:#f2f2f2;text-transform:uppercase}.footer{display:flex;justify-content:space-between;margin-top:50px;font-weight:bold}.sig-line{border-top:1px solid #000;width:200px;padding-top:5px;text-align:center}</style></head><body><div class="header"><h1>GM CARGO - DISPATCH MANIFEST</h1><p style="margin:0;font-size:18px;">Manifest No: <b>${manifest.id}</b></p></div><div class="details"><div>Route: ${manifest.route}</div><div>Driver: ${manifest.driver}</div><div>Vehicle: ${manifest.vehicle}</div><div>Date: ${new Date().toLocaleDateString()}</div></div><table><thead><tr><th>No.</th><th>Tracking</th><th>Sender Details</th><th>Receiver Details</th><th>Destination</th><th>Payment</th><th>Sign</th></tr></thead><tbody>${manifestCargo.length>0?manifestCargo.map((w:any,i:number)=>{return `<tr><td>${i+1}</td><td><b>${w.trackingNumber}</b></td><td>${w.senderName}<br/>${w.senderPhone}</td><td>${w.receiverName}<br/>${w.receiverPhone}</td><td>${w.destination}</td><td>${w.paymentStatus || 'PAID'}</td><td></td></tr>`}).join(''):'<tr><td colspan="7" style="text-align:center;padding:20px;">Hakuna mizigo kwenye Manifest hii.</td></tr>'}</tbody></table><div class="footer"><div><div class="sig-line">Driver Signature</div></div><div><div class="sig-line">Manager Signature</div></div></div><script>window.onload=function(){window.print();window.close();}</script></body></html>`;
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
      
      // Ikiwa ni SMS, tutapiga API (Kwa sasa tuna-log tu kuonyesha inafanya kazi)
      if (cargoForm.sendSms) {
        console.log(`[SMS SYSTEM] Sending SMS to ${cargoForm.receiverPhone}: "Mzigo wako umesajiliwa. Tracking: ${trackingNumber}"`);
      }

      const payload = {
        ...cargoForm, trackingNumber, status: "RECEIVED", registeredById: adminId,
        shippingCost: Number(cargoForm.shippingCost) || 0, cargoValue: Number(cargoForm.cargoValue) || 0,
        paymentStatus: cargoForm.paymentStatus, paymentMethod: cargoForm.paymentMethod
      };

      const res = await fetch("/api/waybills", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Safi! Mzigo umesajiliwa kikamilifu. ✅"); 
        setCargoForm({ senderName: "", senderPhone: "", receiverName: "", receiverPhone: "", destination: "", description: "", shippingCost: "", cargoValue: "", paymentStatus: "PAID", paymentMethod: "CASH", sendSms: true });
        fetchWaybills(); setActiveTab("dashboard");
      } else {
        const err = await res.json();
        alert("Imeshindwa kusajili: " + (err.error || "Tafadhali hakikisha umeupdate Prisma Schema (Tazama maelekezo niliyokupa)."));
      }
    } catch (error) { alert("Kosa la kimtandao. API haipatikani!"); } finally { setActionLoading(false); }
  };

  const handleAddExpense = (e: any) => {
    e.preventDefault();
    setExpenses([{ id: Date.now(), desc: expenseForm.desc, amount: Number(expenseForm.amount), date: new Date().toISOString() }, ...expenses]);
    setExpenseForm({ desc: "", amount: "" });
    alert("Expense Recorded!");
  };

  const handleAddUser = async (e: any) => {
    e.preventDefault(); setActionLoading(true);
    try {
      const res = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userForm) });
      if (res.ok) { alert("User Added!"); setUserForm({ name: "", phone: "", password: "", role: "RUNNER" }); fetchUsers(); }
    } catch (error) { alert("Network Error"); } finally { setActionLoading(false); }
  };

  const handleAddAgent = (e: any) => {
    e.preventDefault(); setAgents([{ id: Date.now(), ...agentForm }, ...agents]); setAgentForm({ name: "", region: "", phone: "", address: "" }); alert("Agent Added (Local State)");
  };

  const handleAddManifest = (e: any) => {
    e.preventDefault(); setManifests([{ id: `MNF-${Math.floor(Math.random() * 10000)}`, ...manifestForm, status: "PENDING" }, ...manifests]); setManifestForm({ driver: "", vehicle: "", route: "" }); alert("Manifest Created (Local State)");
  };

  const handleSaveSettings = (e: any) => {
    e.preventDefault(); 
    localStorage.setItem("receipt_terms", receiptTerms);
    localStorage.setItem("company_phones", companyPhones);
    localStorage.setItem("company_tin", companyTin);
    localStorage.setItem("company_website", companyWebsite);
    alert("Settings Saved!");
  };

  // --- ANALYTICS & FINANCE CALCULATIONS ---
  const totalRevenue = waybills.reduce((sum: any, item: any) => sum + (item.shippingCost || 0), 0);
  const totalCargoValue = waybills.reduce((sum: any, item: any) => sum + (item.cargoValue || 0), 0);
  const onlineRunnersCount = users.filter((u: any) => u.role === "RUNNER" && u.isActive).length;
  const filteredWaybills = waybills.filter((w: any) => w.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || w.senderPhone?.includes(searchTerm) || w.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Hesabu za Kifedha (EOD)
  const totalCash = waybills.filter(w => w.paymentMethod === 'CASH' || !w.paymentMethod).reduce((sum, w) => sum + (w.shippingCost || 0), 0);
  const totalMomo = waybills.filter(w => w.paymentMethod === 'M-PESA' || w.paymentMethod === 'TIGO_PESA').reduce((sum, w) => sum + (w.shippingCost || 0), 0);
  const totalBank = waybills.filter(w => w.paymentMethod === 'BANK').reduce((sum, w) => sum + (w.shippingCost || 0), 0);
  const totalDebt = waybills.filter(w => w.paymentStatus === 'CREDIT' || w.paymentStatus === 'PAY_ON_DELIVERY').reduce((sum, w) => sum + (w.shippingCost || 0), 0);
  const totalExpensesAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const netCash = totalCash - totalExpensesAmount;

  if (loading && waybills.length === 0) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading system...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full font-sans selection:bg-blue-200">
      
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)} />
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
          
          {/* TAB MPYA YA FEDHA NA RIPOTI */}
          <button onClick={() => { setActiveTab("finance"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'finance' ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><IconWallet /> {t.sbFinance}</button>
          
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
                          {/* Inaonyesha Status ya Malipo */}
                          <div className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-1 ${mzigo.paymentStatus === 'CREDIT' ? 'bg-red-100 text-red-600' : mzigo.paymentStatus === 'PAY_ON_DELIVERY' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                            {mzigo.paymentStatus || 'PAID'}
                          </div>
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
                              <button onClick={() => handlePrintReceipt(mzigo)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 p-2 rounded-lg transition-colors flex items-center justify-center" title={t.btnPrint}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                              </button>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rCost}</label>
                    <input type="number" required value={cargoForm.shippingCost} onChange={(e)=>setCargoForm({...cargoForm, shippingCost: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500 font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rVal}</label>
                    <input type="number" required value={cargoForm.cargoValue} onChange={(e)=>setCargoForm({...cargoForm, cargoValue: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 outline-none focus:border-blue-500 font-bold" />
                  </div>
                </div>

                {/* SEHEMU MPYA YA MALIPO NA SMS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rPayStat}</label>
                    <select value={cargoForm.paymentStatus} onChange={(e)=>setCargoForm({...cargoForm, paymentStatus: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:border-blue-500 font-bold">
                      <option value="PAID">{t.payPaid}</option>
                      <option value="PAY_ON_DELIVERY">{t.payPod}</option>
                      <option value="CREDIT">{t.payCredit}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.rPayMeth}</label>
                    <select value={cargoForm.paymentMethod} onChange={(e)=>setCargoForm({...cargoForm, paymentMethod: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-slate-900 outline-none focus:border-blue-500 font-bold" disabled={cargoForm.paymentStatus !== "PAID"}>
                      <option value="CASH">Cash</option>
                      <option value="M-PESA">M-Pesa</option>
                      <option value="TIGO_PESA">Tigo Pesa</option>
                      <option value="BANK">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer mt-0 md:mt-6">
                      <input type="checkbox" checked={cargoForm.sendSms} onChange={(e)=>setCargoForm({...cargoForm, sendSms: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-bold text-slate-700">{t.rSms}</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={actionLoading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-black hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {actionLoading ? t.btnRegLoad : t.btnReg}
                </button>
              </form>
            </div>
          )}

          {/* TAB MPYA YA FEDHA NA RIPOTI (FINANCE & EOD) */}
          {activeTab === "finance" && (
            <div className="animate-fade-in-up max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.fTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.fSub}</p>

              {/* RIPOTI YA SIKU (Z-REPORT) */}
              <h3 className="text-lg font-black text-slate-800 mb-4">{t.fRepTitle}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.fRepCash}</p>
                  <p className="text-lg font-black text-green-600">TZS {totalCash.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.fRepMomo}</p>
                  <p className="text-lg font-black text-blue-600">TZS {totalMomo.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.fRepBank}</p>
                  <p className="text-lg font-black text-slate-700">TZS {totalBank.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 bg-red-50/50">
                  <p className="text-[10px] font-bold text-red-400 uppercase mb-1">{t.fRepDebt}</p>
                  <p className="text-lg font-black text-red-600">TZS {totalDebt.toLocaleString()}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800 col-span-2 md:col-span-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.fRepNet}</p>
                  <p className="text-xl font-black text-white">TZS {netCash.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* FOMU YA KUINGIZA MATUMIZI YA OFISI (PETTY CASH) */}
                <div className="lg:col-span-1">
                  <form onSubmit={handleAddExpense} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-6">
                    <h3 className="text-lg font-black text-slate-800 mb-4">{t.fExpTitle}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fExpDesc}</label>
                        <input type="text" required value={expenseForm.desc} onChange={(e)=>setExpenseForm({...expenseForm, desc: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm" placeholder="Mf. Chai, Umeme..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fExpAmt}</label>
                        <input type="number" required value={expenseForm.amount} onChange={(e)=>setExpenseForm({...expenseForm, amount: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl text-sm font-bold" placeholder="Mf. 5000" />
                      </div>
                      <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded-xl font-bold hover:bg-slate-800 mt-2">
                        {t.btnExp}
                      </button>
                    </div>
                  </form>
                </div>

                {/* LISTI YA MATUMIZI */}
                <div className="lg:col-span-2 overflow-x-auto">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-w-[600px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thExpDate}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase">{t.thExpDesc}</th>
                          <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">{t.thExpAmt}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {expenses.map((exp: any) => (
                          <tr key={exp.id} className="hover:bg-slate-50">
                            <td className="p-4 text-xs text-slate-500 font-bold">{new Date(exp.date).toLocaleDateString()}</td>
                            <td className="p-4 text-sm font-bold text-slate-800">{exp.desc}</td>
                            <td className="p-4 font-black text-red-500 text-right">- TZS {exp.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                        {/* Jumla Chini */}
                        <tr className="bg-slate-50">
                          <td colSpan={2} className="p-4 text-right font-black text-slate-700 uppercase">{t.fRepExp}:</td>
                          <td className="p-4 font-black text-red-600 text-right">TZS {totalExpensesAmount.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{t.sTitle}</h1>
              <p className="text-sm md:text-base text-slate-500 mb-8">{t.sSub}</p>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Taarifa za Kichwa cha Risiti (Receipt Header)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.sPhones}</label>
                    <input type="text" value={companyPhones} onChange={(e) => setCompanyPhones(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none focus:border-blue-500" placeholder="Mf. 0700 000 000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.sTin}</label>
                    <input type="text" value={companyTin} onChange={(e) => setCompanyTin(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none focus:border-blue-500" placeholder="Mf. 123-456-789" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.sWeb}</label>
                    <input type="text" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none focus:border-blue-500" placeholder="Mf. www.gm-cargo.co.tz" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Masharti ya Chini (Receipt Footer)</h3>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {t.sTerms}
                </label>
                <textarea 
                  rows={4}
                  value={receiptTerms}
                  onChange={(e) => setReceiptTerms(e.target.value)}
                  className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
                <p className="text-xs text-slate-400 mt-2 mb-8">{t.sTermsDesc}</p>
                
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-10 py-3.5 rounded-xl font-black hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
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