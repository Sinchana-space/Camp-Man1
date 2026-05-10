import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Wrench, CheckCircle2, Clock, AlertTriangle, Activity, Download, Plus, Search, ChevronDown, Pencil, Trash2, ChevronLeft, ChevronRight, Printer } from "lucide-react";

const tabs = ["Dashboard", "Equipment", "Tasks", "Calendar", "Logs", "Reports"];

const equipment = [
  { id: "RM-1001", name: "Coffee Machine", frequency: "Daily (1d)", lastMaint: "2026-05-02", nextDue: "2026-05-03", status: "Active" },
  { id: "RM-1001", name: "Coffee Machine", frequency: "Daily (1d)", lastMaint: "2026-04-30", nextDue: "2026-05-01", status: "Active" },
  { id: "RM-1001", name: "Coffee Machine", frequency: "Daily (1d)", lastMaint: "–", nextDue: "2026-04-25", status: "Active" },
  { id: "RM-1002", name: "Refrigerator", frequency: "Weekly (7d)", lastMaint: "2026-05-02", nextDue: "2026-05-09", status: "Active" },
  { id: "RM-1003", name: "Deep Fryer", frequency: "Daily (1d)", lastMaint: "2026-05-07", nextDue: "2026-05-08", status: "Active" },
];

const tasks = [
  { machine: "Coffee Machine", code: "RM-1001", dueDate: "2026-04-25", assignedTo: "–", status: "Completed" },
  { machine: "Coffee Machine", code: "RM-1001", dueDate: "2026-04-25", assignedTo: "–", status: "Completed" },
  { machine: "Coffee Machine", code: "RM-1001", dueDate: "2026-04-25", assignedTo: "–", status: "Completed" },
  { machine: "Coffee Machine", code: "RM-1001", dueDate: "2026-04-25", assignedTo: "–", status: "Overdue" },
  { machine: "Coffee Machine", code: "RM-1001", dueDate: "2026-04-25", assignedTo: "–", status: "Overdue" },
  { machine: "Coffee Machine", code: "RM-1001", dueDate: "2026-04-25", assignedTo: "–", status: "Pending" },
  { machine: "Refrigerator", code: "RM-1002", dueDate: "2026-05-01", assignedTo: "Ahmed Al-Rashid", status: "Completed" },
  { machine: "Deep Fryer", code: "RM-1003", dueDate: "2026-05-08", assignedTo: "–", status: "Pending" },
];

const logs = [
  { date: "2026-05-03", machine: "Coffee Machine", machineCode: "RM-1001", performedBy: "Ahmed Al-Rashid", issues: "Some minor issues", actionTaken: "–", nextDue: "2026-05-04" },
  { date: "2026-05-02", machine: "Coffee Machine", machineCode: "RM-1001", performedBy: "admin@camp.com", issues: "–", actionTaken: "–", nextDue: "2026-05-03" },
  { date: "2026-05-02", machine: "Coffee Machine", machineCode: "RM-1001", performedBy: "admin@camp.com", issues: "–", actionTaken: "–", nextDue: "2026-05-03" },
  { date: "2026-05-02", machine: "Refrigerator", machineCode: "RM-1002", performedBy: "admin@camp.com", issues: "–", actionTaken: "–", nextDue: "2026-05-09" },
  { date: "2026-04-30", machine: "Coffee Machine", machineCode: "RM-1001", performedBy: "admin@camp.com", issues: "–", actionTaken: "–", nextDue: "2026-05-01" },
  { date: "2026-04-24", machine: "Coffee Machine", machineCode: "RM-1001", performedBy: "admin@camp.com", issues: "Nothing", actionTaken: "–", nextDue: "2026-04-25" },
];

// Calendar helpers
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarEvents = {
  "2026-05-01": ["Refrigerator", "Refrigerator", "Refrigerator", "Deep Fryer", "Deep Fryer", "Deep Fryer"],
  "2026-05-03": ["Coffee Machine", "Coffee Machine"],
  "2026-05-04": ["Coffee Machine"],
  "2026-05-08": ["Deep Fryer", "Deep Fryer", "Deep Fryer", "Coffee Machine", "Coffee Machine"],
  "2026-05-09": ["Refrigerator"],
};

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(2026, 4, 8);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getKey = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const eventColor = (name) => {
    if (name === "Refrigerator") return "bg-red-100 text-red-700";
    if (name === "Coffee Machine") return "bg-green-100 text-green-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{monthName} {year}</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
          <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Today</button>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const key = getKey(day);
          const events = calendarEvents[key] || [];
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
          return (
            <div key={i} className={`min-h-[80px] p-1 border rounded-lg text-xs ${isToday ? "border-blue-400 bg-blue-50" : "border-gray-100"}`}>
              <span className={`inline-block w-5 h-5 flex items-center justify-center rounded-full text-xs mb-1 font-medium ${isToday ? "bg-blue-600 text-white" : "text-gray-600"}`}>{day}</span>
              {events.slice(0, 3).map((e, j) => (
                <div key={j} className={`px-1 py-0.5 rounded text-xs mb-0.5 truncate ${eventColor(e)}`}>{e}</div>
              ))}
              {events.length > 3 && <div className="text-xs text-gray-400">+{events.length - 3} more</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PreventiveMaintenance() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [taskFilter, setTaskFilter] = useState("All statuses");
  const [equipSearch, setEquipSearch] = useState("");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar activePage="Preventive Maintenance" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {/* Tab bar */}
          <div className="bg-white border-b border-gray-200 px-6 flex items-center gap-1">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            {/* DASHBOARD TAB */}
            {activeTab === "Dashboard" && (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Preventive Maintenance Tracker</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Track and manage all preventive maintenance activities</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50">
                      📅 All dates
                    </button>
                    <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>
                </div>

                {/* Live Stats bar */}
                <div className="bg-white rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-6 text-sm flex-wrap">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <Activity className="w-4 h-4 text-blue-500" /> Live Stats
                  </span>
                  <span className="text-gray-600">Active Machines: <strong>45</strong> <span className="text-green-500 text-xs">↑+6</span></span>
                  <span className="text-gray-600">Open Tasks: <strong>45</strong></span>
                  <span className="text-gray-600">Compliance: <strong>12%</strong></span>
                  <span className="ml-auto text-orange-400 text-xs font-medium flex items-center gap-1">⚡ Updated now</span>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { label: "Total Machines", value: "45", sub: "Tracked equipment →", icon: <Wrench className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50" },
                    { label: "Completed", value: "6", sub: "Tasks done →", icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, bg: "bg-green-50" },
                    { label: "Pending", value: "36", sub: "Awaiting action →", icon: <Clock className="w-5 h-5 text-yellow-500" />, bg: "bg-yellow-50" },
                    { label: "Overdue", value: "9", sub: "Past due date →", icon: <AlertTriangle className="w-5 h-5 text-red-400" />, bg: "bg-red-50" },
                    { label: "Compliance", value: "12%", sub: "Completed / scheduled →", icon: <Activity className="w-5 h-5 text-purple-500" />, bg: "bg-purple-50" },
                  ].map(({ label, value, sub, icon, bg }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{label}</span>
                        <div className={`${bg} p-1.5 rounded-lg`}>{icon}</div>
                      </div>
                      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Filters hint */}
                <div className="bg-white rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center gap-2 font-medium text-gray-700">⚙️ Filters</span>
                  {["Frequency: All", "Technician: All", "Status: All", "Camp: All Camps"].map(f => (
                    <span key={f} className="flex items-center gap-1">{f} <ChevronDown className="w-3 h-3" /></span>
                  ))}
                  <span className="ml-auto text-gray-400">Calen...</span>
                </div>
              </>
            )}

            {/* EQUIPMENT TAB */}
            {activeTab === "Equipment" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      className="text-sm outline-none w-full placeholder-gray-400"
                      placeholder="Search equipment..."
                      value={equipSearch}
                      onChange={e => setEquipSearch(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    <Plus className="w-4 h-4" /> Add Equipment
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs">
                        <th className="text-left px-4 py-3 font-medium">Machine ID</th>
                        <th className="text-left px-4 py-3 font-medium">Name</th>
                        <th className="text-left px-4 py-3 font-medium">Frequency</th>
                        <th className="text-left px-4 py-3 font-medium">Last Maintenance</th>
                        <th className="text-left px-4 py-3 font-medium">Next Due</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipment.filter(e => !equipSearch || e.name.toLowerCase().includes(equipSearch.toLowerCase())).map((e, i) => (
                        <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-500 text-xs">{e.id}</td>
                          <td className="px-4 py-3 font-semibold text-gray-800">{e.name}</td>
                          <td className="px-4 py-3 text-gray-600">{e.frequency}</td>
                          <td className="px-4 py-3 text-gray-600">{e.lastMaint}</td>
                          <td className="px-4 py-3 text-gray-600">{e.nextDue}</td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{e.status}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1">
                              <button className="text-gray-400 hover:text-blue-500"><Pencil className="w-3.5 h-3.5" /></button>
                              <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* TASKS TAB */}
            {activeTab === "Tasks" && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <select
                    value={taskFilter}
                    onChange={e => setTaskFilter(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white outline-none"
                  >
                    {["All statuses", "Completed", "Overdue", "Pending"].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs">
                        <th className="text-left px-4 py-3 font-medium">Machine</th>
                        <th className="text-left px-4 py-3 font-medium">Code</th>
                        <th className="text-left px-4 py-3 font-medium">Due Date</th>
                        <th className="text-left px-4 py-3 font-medium">Assigned To</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks
                        .filter(t => taskFilter === "All statuses" || t.status === taskFilter)
                        .map((t, i) => (
                          <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800">{t.machine}</td>
                            <td className="px-4 py-3 text-gray-400 text-xs">{t.code}</td>
                            <td className="px-4 py-3 text-gray-600">{t.dueDate}</td>
                            <td className="px-4 py-3 text-gray-500">{t.assignedTo}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                t.status === "Completed" ? "bg-green-100 text-green-700" :
                                t.status === "Overdue" ? "bg-red-100 text-red-600" :
                                "bg-yellow-100 text-yellow-700"
                              }`}>{t.status}</span>
                            </td>
                            <td className="px-4 py-3">
                              {t.status !== "Completed" && (
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-medium">
                                  Complete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* CALENDAR TAB */}
            {activeTab === "Calendar" && <CalendarView />}

            {/* LOGS TAB */}
            {activeTab === "Logs" && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-xs">
                      <th className="text-left px-4 py-3 font-medium">Date</th>
                      <th className="text-left px-4 py-3 font-medium">Machine</th>
                      <th className="text-left px-4 py-3 font-medium">Performed By</th>
                      <th className="text-left px-4 py-3 font-medium">Issues</th>
                      <th className="text-left px-4 py-3 font-medium">Action Taken</th>
                      <th className="text-left px-4 py-3 font-medium">Next Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((l, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{l.date}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {l.machine} <span className="text-gray-400 text-xs font-normal">({l.machineCode})</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{l.performedBy}</td>
                        <td className="px-4 py-3 text-gray-500">{l.issues}</td>
                        <td className="px-4 py-3 text-gray-500">{l.actionTaken}</td>
                        <td className="px-4 py-3 text-gray-600">{l.nextDue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* REPORTS TAB */}
            {activeTab === "Reports" && (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "Report Type", options: ["Status", "Compliance", "Equipment"], defaultVal: "Status" },
                      { label: "Machine", options: ["All Machines", "Coffee Machine", "Refrigerator", "Deep Fryer"], defaultVal: "All Machines" },
                      { label: "Status", options: ["All", "Completed", "Overdue", "Pending"], defaultVal: "All" },
                    ].map(({ label, options, defaultVal }) => (
                      <div key={label}>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">{label}</label>
                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none">
                          {options.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Technician</label>
                      <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none">
                        <option>All</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">From</label>
                      <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">To</label>
                      <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        📄 Export PDF
                      </button>
                      <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Download className="w-4 h-4" /> Export Excel
                      </button>
                      <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Printer className="w-4 h-4" /> Print
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">51 records</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs">
                        <th className="text-left px-4 py-3 font-medium">Machine ID</th>
                        <th className="text-left px-4 py-3 font-medium">Machine Name</th>
                        <th className="text-left px-4 py-3 font-medium">Maint. Date</th>
                        <th className="text-left px-4 py-3 font-medium">Scheduled Due</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Performed By</th>
                        <th className="text-left px-4 py-3 font-medium">Issues</th>
                        <th className="text-left px-4 py-3 font-medium">Action Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((l, i) => (
                        <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-500 text-xs">{l.machineCode}</td>
                          <td className="px-4 py-3 font-semibold text-gray-800">{l.machine}</td>
                          <td className="px-4 py-3 text-gray-600">{l.date}</td>
                          <td className="px-4 py-3 text-gray-600">{l.nextDue}</td>
                          <td className="px-4 py-3">
                            <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Completed</span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{l.performedBy}</td>
                          <td className="px-4 py-3 text-gray-500">{l.issues}</td>
                          <td className="px-4 py-3 text-gray-500">{l.actionTaken}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}