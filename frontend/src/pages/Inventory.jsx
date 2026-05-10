import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Download, Plus, Search, Package, TrendingUp, AlertTriangle, XCircle, MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const inventoryItems = [
  { camp: "—", name: "Bathroom Bucket", category: "Sanitary", qty: 220, status: "In Stock", vendor: "CleanPro Supplies", updated: "14 Mar 2026" },
  { camp: "—", name: "Bed Sheets (Single)", category: "Bedding", qty: 440, status: "In Stock", vendor: "Al Rajhi Textiles", updated: "17 Mar 2026" },
  { camp: "—", name: "Bed Sheets (Single)", category: "Bedding", qty: 555, status: "In Stock", vendor: "Al Rajhi Textiles", updated: "17 Mar 2026" },
  { camp: "—", name: "Bed Sheets (Single)", category: "Bedding", qty: 280, status: "In Stock", vendor: "Al Rajhi Textiles", updated: "17 Mar 2026" },
  { camp: "—", name: "Bed Sheets (Single)", category: "Bedding", qty: 340, status: "In Stock", vendor: "Al Rajhi Textiles", updated: "17 Mar 2026" },
  { camp: "—", name: "Blanket", category: "Bedding", qty: 320, status: "In Stock", vendor: "Riyadh Textiles", updated: "14 Mar 2026" },
  { camp: "—", name: "Blanket", category: "Bedding", qty: 400, status: "In Stock", vendor: "Riyadh Textiles", updated: "14 Mar 2026" },
  { camp: "—", name: "Broom", category: "Cleaning", qty: 85, status: "In Stock", vendor: "CleanPro Supplies", updated: "20 Mar 2026" },
  { camp: "—", name: "Cleaning Cloth", category: "Cleaning", qty: 200, status: "In Stock", vendor: "CleanPro Supplies", updated: "20 Mar 2026" },
  { camp: "—", name: "Detergent (5L)", category: "Cleaning", qty: 150, status: "In Stock", vendor: "Gulf Cleaning Co.", updated: "22 Mar 2026" },
  { camp: "—", name: "Disinfectant Spray", category: "Cleaning", qty: 120, status: "In Stock", vendor: "Gulf Cleaning Co.", updated: "22 Mar 2026" },
  { camp: "—", name: "Extension Cord", category: "Electrical", qty: 60, status: "In Stock", vendor: "Power Solutions", updated: "10 Mar 2026" },
  { camp: "—", name: "Fire Extinguisher", category: "Safety", qty: 45, status: "In Stock", vendor: "Safety First Co.", updated: "05 Mar 2026" },
  { camp: "—", name: "First Aid Kit", category: "Safety", qty: 30, status: "In Stock", vendor: "MedSupply Arabia", updated: "08 Mar 2026" },
  { camp: "—", name: "Mattress", category: "Bedding", qty: 200, status: "In Stock", vendor: "Comfort Beds LLC", updated: "15 Mar 2026" },
  { camp: "—", name: "Mop", category: "Cleaning", qty: 75, status: "In Stock", vendor: "CleanPro Supplies", updated: "20 Mar 2026" },
  { camp: "—", name: "Pillow", category: "Bedding", qty: 600, status: "In Stock", vendor: "Al Rajhi Textiles", updated: "17 Mar 2026" },
  { camp: "—", name: "Safety Helmet", category: "Safety", qty: 80, status: "In Stock", vendor: "Safety First Co.", updated: "05 Mar 2026" },
  { camp: "—", name: "Toilet Paper Roll", category: "Sanitary", qty: 1500, status: "In Stock", vendor: "CleanPro Supplies", updated: "14 Mar 2026" },
  { camp: "—", name: "Towel", category: "Bedding", qty: 350, status: "In Stock", vendor: "Al Rajhi Textiles", updated: "17 Mar 2026" },
];

const categoryBreakdown = [
  { name: "Bedding", items: 22, units: 7265, color: "#22c55e" },
  { name: "Cleaning", items: 9, units: 823, color: "#3b82f6" },
  { name: "Sanitary", items: 8, units: 1934, color: "#f59e0b" },
  { name: "Safety", items: 7, units: 155, color: "#ef4444" },
  { name: "Electrical", items: 6, units: 960, color: "#8b5cf6" },
  { name: "Others", items: 8, units: 3000, color: "#6b7280" },
];

const TABS = ["Overview", "All Items", "Low Stock"];

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [campFilter, setCampFilter] = useState("All Camps");

  const totalItems = 60;
  const totalStock = 14137;
  const lowStock = 0;
  const outOfStock = 0;

  const filteredItems = inventoryItems.filter(item =>
    !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-400">Home / <span className="text-gray-600">Inventory</span></div>

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                <Download className="w-4 h-4" /> Export
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                <Plus className="w-4 h-4" /> New Stock
              </button>
            </div>
          </div>

          {/* Tabs + Search + Filter */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 gap-1">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === t ? "bg-gray-100 text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  className="text-sm outline-none placeholder-gray-400 w-40"
                  placeholder="Search for Items"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-gray-400 text-sm">⚙️</span>
                <select value={campFilter} onChange={e => setCampFilter(e.target.value)} className="text-sm text-gray-700 outline-none bg-transparent">
                  {["All Camps", "Ad-Dilam Camp", "Al Bahah Camp", "New Camp", "Riyadh Camp"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "Overview" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Items", value: totalItems, icon: <Package className="w-6 h-6 text-blue-500" />, bg: "bg-blue-50", color: "text-blue-500" },
                  { label: "Total Stock", value: totalStock.toLocaleString(), icon: <TrendingUp className="w-6 h-6 text-green-500" />, bg: "bg-green-50", color: "text-green-600" },
                  { label: "Low Stock", value: lowStock, icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />, bg: "bg-yellow-50", color: "text-orange-500" },
                  { label: "Out of Stock", value: outOfStock, icon: <XCircle className="w-6 h-6 text-red-400" />, bg: "bg-red-50", color: "text-red-500" },
                ].map(({ label, value, icon, bg, color }) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-3xl font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Stock Distribution Pie */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">Stock Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={categoryBreakdown} cx="50%" cy="50%" outerRadius={80} dataKey="units">
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v, n) => [v.toLocaleString() + " units", n]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {categoryBreakdown.map(c => (
                      <div key={c.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                          <span className="text-gray-700 font-medium">{c.name}</span>
                          <span className="text-gray-400 text-xs">{c.items} items</span>
                        </span>
                        <span className="text-gray-600 font-medium">{c.units.toLocaleString()} units</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ALL ITEMS TAB */}
          {activeTab === "All Items" && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs">
                    <th className="text-left px-4 py-3 font-medium">Camp Name</th>
                    <th className="text-left px-4 py-3 font-medium">Item Name</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Quantity Available</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Vendor</th>
                    <th className="text-left px-4 py-3 font-medium">Last Updated</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">{item.camp}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.category}</td>
                      <td className="px-4 py-3 font-bold text-gray-800">{item.qty}</td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{item.status}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{item.vendor}</td>
                      <td className="px-4 py-3 text-gray-500">{item.updated}</td>
                      <td className="px-4 py-3">
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* LOW STOCK TAB */}
          {activeTab === "Low Stock" && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">All items are sufficiently stocked ✓</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}