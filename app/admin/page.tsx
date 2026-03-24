"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.role !== "ADMIN") {
          setError("Akaunti hii haina uwezo wa kuingia ofisini (Admin).");
        } else {
          // Hifadhi kwenye kompyuta na uende Dashboard
          localStorage.setItem("admin_id", data.id);
          localStorage.setItem("admin_name", data.name);
          router.push("/dashboard");
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Tatizo la mtandao.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-black text-center text-gray-800 mb-2">Ofisi ya GM Cargo</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Weka taarifa za Admin kuingia</p>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm mb-4 font-bold">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700">Username / Simu</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border rounded-lg mt-1 text-black bg-gray-50" required />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg mt-1 text-black bg-gray-50" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-black text-white p-4 rounded-lg font-bold mt-4 hover:bg-gray-800">
            {loading ? "Inahakiki..." : "INGIA OFISINI"}
          </button>
        </form>
        <button onClick={() => router.push('/')} className="w-full text-center text-blue-600 text-sm font-bold mt-6">
          ⬅ Rudi kwa Wateja
        </button>
      </div>
    </div>
  );
}