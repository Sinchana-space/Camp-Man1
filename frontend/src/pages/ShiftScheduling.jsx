import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import ShiftCalendarGrid from "@/components/shifts/ShiftCalendarGrid";
import ShiftConflictPanel from "@/components/shifts/ShiftConflictPanel";
import AutoAssignModal from "@/components/shifts/AutoAssignModal";
import { CalendarDays, AlertTriangle, Zap, Download } from "lucide-react";

const CAMPS = ["All Camps", "Ad-Dilam Camp", "Al Bahah Camp", "New Camp", "Riyadh Industrial Camp"];
const ROLES = ["All Roles", "Electrician", "Plumber", "Supervisor", "Cook", "Guard", "Heavy Machinery Operator"];
const WEEKS = ["May 5–11, 2026", "May 12–18, 2026", "May 19–25, 2026"];

export default function ShiftScheduling() {
  const [camp, setCamp] = useState("All Camps");
  const [role, setRole] = useState("All Roles");
  const [week, setWeek] = useState(WEEKS[0]);
  const [showAutoAssign, setShowAutoAssign] = useState(false);
  const [scheduleKey, setScheduleKey] = useState(0); // force re-render after auto-assign

  const handleAutoAssigned = () => {
    setScheduleKey(k => k + 1);
    setShowAutoAssign(false);
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
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-blue-600" /> Shift Scheduling
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">Auto-assign workers to shifts by role, camp & site needs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAutoAssign(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Zap className="w-4 h-4" /> Auto-Assign Shifts
              </button>
              <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-4 flex-wrap text-sm">
            <span className="text-gray-500 font-medium text-xs uppercase tracking-wide">Filters</span>
            <select value={week} onChange={e => setWeek(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none">
              {WEEKS.map(w => <option key={w}>{w}</option>)}
            </select>
            <select value={camp} onChange={e => setCamp(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none">
              {CAMPS.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={role} onChange={e => setRole(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none">
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Main layout: grid + conflict panel */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
            <div className="xl:col-span-3">
              <ShiftCalendarGrid key={scheduleKey} camp={camp} role={role} week={week} />
            </div>
            <div className="xl:col-span-1">
              <ShiftConflictPanel camp={camp} role={role} />
            </div>
          </div>
        </main>
      </div>

      {showAutoAssign && (
        <AutoAssignModal
          camp={camp}
          role={role}
          week={week}
          onClose={() => setShowAutoAssign(false)}
          onAssigned={handleAutoAssigned}
        />
      )}
    </div>
  );
}