"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Package,
  Users,
  MapPin,
  FileText,
  Settings,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Register Cargo", href: "/dashboard/cargo", icon: Package },
    { name: "Users (Runners)", href: "/dashboard/runners", icon: Users },
    { name: "Regional Agents", href: "/dashboard/agents", icon: MapPin },
    { name: "Dispatch Manifest", href: "/dashboard/manifest", icon: FileText },
    { name: "Settings & Receipt", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
      
      {/* Kioo cheusi (Overlay) cha kuficha menu kwenye simu */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Menu ya Pembeni) - Imenyooshwa Mobile & Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A1128] text-gray-300 transition-transform duration-300 ease-in-out flex flex-col md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Sehemu ya Logo na Jina */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded text-white font-bold text-xl shadow-lg shadow-blue-600/20">
              GM
            </div>
            <span className="text-white font-bold text-xl tracking-wider">
              ADMIN
            </span>
          </div>

          {/* Kitufe cha Kufunga Menu (Simu pekee) */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Link za Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
              >
                <link.icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Taarifa za Admin na Kitufe cha Logout */}
        <div className="p-4 border-t border-gray-800 bg-[#070C1D] shrink-0">
          <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700/50">
            <p className="text-xs text-gray-400 mb-1">Logged in as</p>
            <p className="text-white font-semibold truncate">Bosi Mkuu</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 font-medium shadow-sm">
            Logout from System
          </button>
        </div>
      </aside>

      {/* Sehemu ya Ofisi (Main Content) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header ya Juu (Inaonekana kwenye simu tu) */}
        <header className="flex items-center justify-between px-4 py-4 bg-white border-b md:hidden shadow-sm shrink-0 z-30">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded text-white font-bold text-sm">
              GM
            </div>
            <span className="font-bold text-gray-900 tracking-wide">ADMIN</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Hapa ndipo zile kurasa zako zinapotokea */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}