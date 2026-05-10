import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Download, Plus, Search, SlidersHorizontal, MoreHorizontal } from "lucide-react";

const tickets = [
  { camp: "Ad-Dilam Camp", block: "Block A", room: "A-101", category: "Electrical", description: "bulb issue", priority: "Low", status: "In Progress", assigned: "Ahmed Al-Rashid", date: "03 May 2026" },
  { camp: "Ad-Dilam Camp", block: "Block A", room: "A-102", category: "Furniture", description: "table broken", priority: "Low", status: "In Progress", assigned: "Khalid Mansour", date: "03 May 2026" },
  { camp: "Ad-Dilam Camp", block: "Block A", room: "A-101", category: "Electrical", description: "bulb issue", priority: "Medium", status: "In Progress", assigned: "Ahmed Al-Rashid", date: "02 May 2026" },
  { camp: "Al Baha Camp", block: "Block B", room: "B-201", category: "Plumbing", description: "pipe leaking", priority: "High", status: "Open", assigned: "Bilal Farooq", date: "01 May 2026" },
  { camp: "New Camp", block: "Block C", room: "C-301", category: "HVAC", description: "AC not cooling", priority: "High", status: "Open", assigned: "Ravi Kumar", date: "30 Apr 2026" },
  { camp: "Ad-Dilam Camp", block: "Block A", room: "A-103", category: "Electrical", description: "power outlet issue", priority: "Low", status: "Completed", assigned: "Ahmed Al-Rashid", date: "28 Apr 2026" },
];

const statusFilter = ["All Tasks", "Open", "In Progress", "Completed"];

const priorityColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-700",
  "Open": "bg-orange-100 text-orange-700",
  "Completed": "bg-green-100 text-green-700",
};

export default function RepairMaintenance() {
  const [activeTab, setActiveTab] = useState("Tickets");
  const [activeStatus, setActiveStatus] = useState("All Tasks");
  const [search, setSearch] = useState("");

  const filtered = tickets.filter(t => {
    const statusMatch = activeStatus === "All Tasks" || t.status === activeStatus;
    const searchMatch = !search || t.camp.toLowerCase().includes(search.toLowerCase()) || t.assigned.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar activePage="Repair & Maintenance" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <p className="text-xs text-gray-400 mb-2">Home / Repair & Maintenance</p>

          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-gray-800">Repair & Maintenance</h1>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" /> Export
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Add Maintenance
              </button>
            </div>
          </div>

          {/* Main tabs */}
          <div className="flex gap-1 border-b border-gray-200 mb-5">
            {["Tickets", "Staff Workload"].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === t
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sub-filter + Search */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex gap-1">
              {statusFilter.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeStatus === s
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  className="text-sm outline-none w-48 placeholder-gray-400"
                  placeholder="Search tasks or staff..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs">
                  <th className="text-left px-4 py-3 font-medium">Camp Name</th>
                  <th className="text-left px-4 py-3 font-medium">Block</th>
                  <th className="text-left px-4 py-3 font-medium">Room</th>
                  <th className="text-left px-4 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                  <th className="text-left px-4 py-3 font-medium">Priority</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Assigned To</th>
                  <th className="text-left px-4 py-3 font-medium">Date Reported</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">{t.camp}</td>
                    <td className="px-4 py-3 text-gray-600">{t.block}</td>
                    <td className="px-4 py-3 text-gray-600">{t.room}</td>
                    <td className="px-4 py-3 text-gray-600">{t.category}</td>
                    <td className="px-4 py-3 text-gray-500">{t.description}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{t.assigned}</td>
                    <td className="px-4 py-3 text-gray-500">{t.date}</td>
                    <td className="px-4 py-3">
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}