"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Kichwa cha Habari cha Ofisi */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Office Overview</h1>
          <p className="text-gray-500 mt-1">Track and manage all shipments in real-time.</p>
        </div>
        
        {/* Kitufe cha Haraka (Kama unataka) */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          + New Waybill
        </button>
      </div>

      {/* Viboksi vya Taarifa (Stat Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Waybills</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Active Runners</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Revenue</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">TZS 0</p>
        </div>
      </div>

      {/* Sehemu ya Kutafuta Mizigo (Search) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Search</h3>
        <input 
          type="text" 
          placeholder="Search Tracking / Phone..." 
          className="w-full md:w-1/2 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        />
      </div>
    </div>
  );
}