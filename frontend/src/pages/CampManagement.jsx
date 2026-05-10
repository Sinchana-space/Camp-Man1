import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Building2, LayoutGrid, DoorOpen, Users, BedDouble, Wrench, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const tabs = ["Overview", "Camps", "Reports"];

const weeklyData = [
  { day: "Mon", in: 3, out: 1 },
  { day: "Tue", in: 5, out: 2 },
  { day: "Wed", in: 20, out: 8 },
  { day: "Thu", in: 7, out: 4 },
  { day: "Fri", in: 10, out: 3 },
  { day: "Sat", in: 4, out: 2 },
  { day: "Sun", in: 6, out: 5 },
];

const occupancyData = [
  { name: "Occupied", value: 17, color: "#3b82f6" },
  { name: "Available", value: 219, color: "#e5e7eb" },
];

const amenitiesData = [
  { name: "Housing", value: 60, color: "#1e293b" },
  { name: "Cafeteria", value: 25, color: "#94a3b8" },
  { name: "Gym", value: 15, color: "#cbd5e1" },
];

export default function CampManagement() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar activePage="Camp Management" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Camp Management</h1>
              <p className="text-gray-500 text-sm mt-0.5">Manage camps, blocks, and rooms</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Create Camp
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 mb-6">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === t
                    ? "border-blue-600 text-blue-600 bg-blue-50 rounded-t-lg"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {[
              { label: "Total Camps", value: "5", icon: Building2, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Blocks", value: "14", icon: LayoutGrid, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Rooms", value: "61", icon: DoorOpen, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Total Occupants", value: "17", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Vacant Rooms", value: "219", icon: BedDouble, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Under Maintenance", value: "0", icon: Wrench, color: "text-red-400", bg: "bg-red-50" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2">
                <div className={`${bg} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="text-xs text-gray-500 text-center">{label}</p>
                <p className="text-xl font-bold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-4">Weekly Check-ins / Check-outs</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="in" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="out" fill="#f87171" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center">
              <h3 className="font-semibold text-gray-800 text-sm mb-4 self-start">Room Occupancy</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" startAngle={90} endAngle={-270}>
                    {occupancyData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 text-xs mt-2">
                {occupancyData.map(d => (
                  <span key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                    {d.name}: <strong>{d.value}</strong>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center">
              <h3 className="font-semibold text-gray-800 text-sm mb-4 self-start">Amenities Usage</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={amenitiesData} cx="50%" cy="50%" outerRadius={75} dataKey="value" startAngle={90} endAngle={-270}>
                    {amenitiesData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-1 text-xs mt-2 self-start">
                {amenitiesData.map(d => (
                  <span key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                    {d.name}: <strong>{d.value}%</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}