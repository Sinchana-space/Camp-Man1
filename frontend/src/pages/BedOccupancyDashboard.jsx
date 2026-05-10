import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import OccupancyStatsBar from "@/components/occupancy/OccupancyStatsBar";
import CampOccupancyCard from "@/components/occupancy/CampOccupancyCard";
import GenderOccupancyChart from "@/components/occupancy/GenderOccupancyChart";
import MaintenanceLockoutPanel from "@/components/occupancy/MaintenanceLockoutPanel";
import { RefreshCw, Activity } from "lucide-react";

const INITIAL_CAMPS = [
  {
    name: "Ad-Dilam Camp", location: "Ad-Dilam, Saudi Arabia",
    blocks: [
      { name: "Block A", male: { total: 40, occupied: 34 }, female: { total: 10, occupied: 7 }, maintenance: 4 },
      { name: "Block B", male: { total: 30, occupied: 22 }, female: { total: 10, occupied: 6 }, maintenance: 0 },
      { name: "Block C", male: { total: 20, occupied: 18 }, female: { total: 0, occupied: 0 }, maintenance: 2 },
    ],
  },
  {
    name: "Al Bahah Camp", location: "Al Bahah, Saudi Arabia",
    blocks: [
      { name: "Block A", male: { total: 50, occupied: 31 }, female: { total: 20, occupied: 12 }, maintenance: 0 },
      { name: "Block B", male: { total: 40, occupied: 28 }, female: { total: 15, occupied: 9 }, maintenance: 6 },
    ],
  },
  {
    name: "Riyadh Industrial", location: "Riyadh, Saudi Arabia",
    blocks: [
      { name: "Block A", male: { total: 60, occupied: 55 }, female: { total: 0, occupied: 0 }, maintenance: 3 },
      { name: "Block B", male: { total: 40, occupied: 38 }, female: { total: 0, occupied: 0 }, maintenance: 0 },
      { name: "Block C", male: { total: 20, occupied: 12 }, female: { total: 10, occupied: 4 }, maintenance: 0 },
    ],
  },
  {
    name: "New Camp", location: "Jubail, Saudi Arabia",
    blocks: [
      { name: "Block A", male: { total: 30, occupied: 8 }, female: { total: 10, occupied: 2 }, maintenance: 0 },
      { name: "Block B", male: { total: 20, occupied: 5 }, female: { total: 0, occupied: 0 }, maintenance: 0 },
      { name: "Block C", male: { total: 20, occupied: 3 }, female: { total: 10, occupied: 1 }, maintenance: 0 },
      { name: "Block D", male: { total: 30, occupied: 0 }, female: { total: 0, occupied: 0 }, maintenance: 8 },
    ],
  },
];

function jitter(val, max, min = 0) {
  return Math.max(min, Math.min(max, val + Math.floor(Math.random() * 3) - 1));
}

function simulateLive(camps) {
  return camps.map((camp) => ({
    ...camp,
    blocks: camp.blocks.map((block) => ({
      ...block,
      male: { ...block.male, occupied: jitter(block.male.occupied, block.male.total) },
      female: { ...block.female, occupied: jitter(block.female.occupied, block.female.total) },
    })),
  }));
}

export default function BedOccupancyDashboard() {
  const [camps, setCamps] = useState(INITIAL_CAMPS);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [pulse, setPulse] = useState(false);
  const [campFilter, setCampFilter] = useState("All Camps");

  useEffect(() => {
    const interval = setInterval(() => {
      setCamps((prev) => simulateLive(prev));
      setLastUpdated(new Date());
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setCamps((prev) => simulateLive(prev));
    setLastUpdated(new Date());
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  const filteredCamps = campFilter === "All Camps" ? camps : camps.filter((c) => c.name === campFilter);

  const totalBeds = camps.reduce((s, c) => s + c.blocks.reduce((bs, b) => bs + b.male.total + b.female.total, 0), 0);
  const totalOccupied = camps.reduce((s, c) => s + c.blocks.reduce((bs, b) => bs + b.male.occupied + b.female.occupied, 0), 0);
  const totalMaint = camps.reduce((s, c) => s + c.blocks.reduce((bs, b) => bs + b.maintenance, 0), 0);

  const stats = {
    total: totalBeds,
    occupied: totalOccupied,
    available: totalBeds - totalOccupied - totalMaint,
    maintenance: totalMaint,
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bed Occupancy Dashboard</h1>
              <p className="text-gray-500 text-sm mt-0.5">Real-time bed availability, maintenance lockouts &amp; gender-segregated occupancy</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${pulse ? "bg-green-100 border-green-300 text-green-700" : "bg-white border-gray-200 text-gray-500"} transition-all`}>
                <Activity className={`w-3 h-3 ${pulse ? "text-green-500" : "text-gray-400"}`} />
                {pulse ? "Updating…" : `Updated ${lastUpdated.toLocaleTimeString()}`}
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 border border-gray-200 bg-white text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              {/* Camp filter */}
              <select
                value={campFilter}
                onChange={(e) => setCampFilter(e.target.value)}
                className="border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none"
              >
                <option>All Camps</option>
                {camps.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Stats bar (always shows all-camp totals) */}
          <OccupancyStatsBar stats={stats} />

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GenderOccupancyChart camps={camps} />
            <MaintenanceLockoutPanel />
          </div>

          {/* Per-camp block breakdown */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Block-Level Occupancy</h2>
            {filteredCamps.map((camp) => (
              <CampOccupancyCard key={camp.name} camp={camp} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}