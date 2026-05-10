import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { TrendingUp, Wrench, AlertTriangle, Clock, CheckCircle2, Activity, Eye } from "lucide-react";

const staffData = [
  { name: "Ahmed Al-Rashid", role: "Electrician", camp: "Ad-Dilam Camp", total: 2, open: 0, inProgress: 2, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Mohammed Farooq", role: "Plumber", camp: "Ad-Dilam Camp", total: 2, open: 0, inProgress: 2, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Khalid Mansour", role: "General Maintenance", camp: "Ad-Dilam Camp", total: 1, open: 0, inProgress: 1, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Hassan Ali", role: "HVAC Technician", camp: "Ad-Dilam Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Omar Siddique", role: "Electrician", camp: "Al Bahah Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Tariq Aziz", role: "Plumber", camp: "Al Bahah Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Sami Al-Ghamdi", role: "General Maintenance", camp: "Al Bahah Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Faisal Nasser", role: "HVAC Technician", camp: "Al Bahah Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Yusuf Rahman", role: "Electrician", camp: "New Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
  { name: "Ibrahim Saleh", role: "Plumber", camp: "New Camp", total: 0, open: 0, inProgress: 0, completed: 0, avgResolution: "—", rate: 0 },
];

export default function StaffKPIMonitoring() {
  const [fromDate, setFromDate] = useState("2026-04-08");
  const [toDate, setToDate] = useState("2026-05-08");
  const [category, setCategory] = useState("All Categories");
  const [camp, setCamp] = useState("All Camps");
  const [search, setSearch] = useState("");

  const totalTasks = staffData.reduce((s, r) => s + r.total, 0);
  const openTasks = staffData.reduce((s, r) => s + r.open, 0);
  const inProgressTasks = staffData.reduce((s, r) => s + r.inProgress, 0);
  const completedTasks = staffData.reduce((s, r) => s + r.completed, 0);
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filtered = staffData.filter(s => {
    const matchCamp = camp === "All Camps" || s.camp === camp;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase());
    return matchCamp && matchSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-500" /> Staff KPI Monitoring
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Maintenance task performance for camp staff</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600">
              ⚙️ Filters
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">From</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                  <span className="text-gray-400">📅</span>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="outline-none text-gray-700 text-sm w-full" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">To</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                  <span className="text-gray-400">📅</span>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="outline-none text-gray-700 text-sm w-full" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none">
                  {["All Categories", "Electrical", "Plumbing", "General Maintenance", "HVAC"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Camp</label>
                <select value={camp} onChange={e => setCamp(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none">
                  {["All Camps", "Ad-Dilam Camp", "Al Bahah Camp", "New Camp", "Riyadh Camp"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Search staff</label>
                <input
                  type="text"
                  placeholder="Name or role..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Total Tasks", value: totalTasks, icon: <Wrench className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50" },
              { label: "Open", value: openTasks, icon: <AlertTriangle className="w-5 h-5 text-orange-400" />, bg: "bg-orange-50" },
              { label: "In Progress", value: inProgressTasks, icon: <Clock className="w-5 h-5 text-blue-400" />, bg: "bg-blue-50" },
              { label: "Completed", value: completedTasks, icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, bg: "bg-green-50" },
              { label: "Completion %", value: `${completionPct}%`, icon: <Activity className="w-5 h-5 text-pink-500" />, bg: "bg-pink-50" },
            ].map(({ label, value, icon, bg }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{label}</span>
                  <div className={`${bg} p-1.5 rounded-lg`}>{icon}</div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Staff Performance Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                👥 Staff Performance ({filtered.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs">
                    <th className="text-left px-5 py-3 font-medium">STAFF</th>
                    <th className="text-left px-4 py-3 font-medium">ROLE</th>
                    <th className="text-left px-4 py-3 font-medium">CAMP</th>
                    <th className="text-center px-4 py-3 font-medium">TOTAL</th>
                    <th className="text-center px-4 py-3 font-medium">OPEN</th>
                    <th className="text-center px-4 py-3 font-medium">IN PROGRESS</th>
                    <th className="text-center px-4 py-3 font-medium">COMPLETED</th>
                    <th className="text-center px-4 py-3 font-medium">AVG RESOLUTION</th>
                    <th className="text-right px-5 py-3 font-medium">COMPLETION RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="px-5 py-3 font-semibold text-gray-800">{s.name}</td>
                      <td className="px-4 py-3 text-gray-600">{s.role}</td>
                      <td className="px-4 py-3 text-blue-500 text-xs">{s.camp}</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-800">{s.total}</td>
                      <td className="px-4 py-3 text-center text-orange-500 font-medium">{s.open}</td>
                      <td className="px-4 py-3 text-center text-blue-500 font-medium">{s.inProgress}</td>
                      <td className="px-4 py-3 text-center text-green-500 font-medium">{s.completed}</td>
                      <td className="px-4 py-3 text-center text-gray-400">{s.avgResolution}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-300 rounded-full" style={{ width: `${s.rate}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-6 text-right">{s.rate}%</span>
                          <button className="text-gray-400 hover:text-blue-500 ml-1"><Eye className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}