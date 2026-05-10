import React, { useState } from "react";
import { AlertTriangle, Plus, X } from "lucide-react";

const DAYS = ["Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9", "Sat 10", "Sun 11"];

const SHIFT_COLORS = {
  Morning: "bg-blue-100 text-blue-700 border-blue-200",
  Evening: "bg-amber-100 text-amber-700 border-amber-200",
  Night: "bg-purple-100 text-purple-700 border-purple-200",
  Off: "bg-gray-100 text-gray-400 border-gray-200",
};

const INITIAL_SCHEDULE = [
  { id: 1, name: "Ahmed Al-Rashid", role: "Electrician", camp: "Ad-Dilam Camp", shifts: ["Morning", "Morning", "Morning", "Morning", "Off", "Off", "Morning"] },
  { id: 2, name: "Khalid Mansour", role: "Plumber", camp: "Al Bahah Camp", shifts: ["Evening", "Evening", "Evening", "Evening", "Evening", "Off", "Off"] },
  { id: 3, name: "Bilal Farooq", role: "Supervisor", camp: "New Camp", shifts: ["Morning", "Morning", "Night", "Morning", "Morning", "Off", "Off"] },
  { id: 4, name: "Ravi Kumar", role: "Cook", camp: "Riyadh Industrial Camp", shifts: ["Morning", "Morning", "Morning", "Morning", "Morning", "Morning", "Off"] },
  { id: 5, name: "John Smith", role: "Guard", camp: "Ad-Dilam Camp", shifts: ["Night", "Night", "Night", "Night", "Night", "Night", "Night"] },
  { id: 6, name: "Omar Farhan", role: "Electrician", camp: "Ad-Dilam Camp", shifts: ["Evening", "Evening", "Evening", "Evening", "Off", "Evening", "Evening"] },
  { id: 7, name: "Sanjay Patel", role: "Heavy Machinery Operator", camp: "Riyadh Industrial Camp", shifts: ["Morning", "Morning", "Off", "Off", "Morning", "Morning", "Off"] },
  { id: 8, name: "Li Wei", role: "Cook", camp: "Al Bahah Camp", shifts: ["Off", "Morning", "Morning", "Morning", "Morning", "Off", "Off"] },
];

function detectConflicts(schedule) {
  const conflicts = new Set();
  // Flag: same worker Night → Morning consecutive days
  schedule.forEach(worker => {
    worker.shifts.forEach((shift, i) => {
      if (shift === "Night" && worker.shifts[i + 1] === "Morning") {
        conflicts.add(`${worker.id}-${i + 1}`); // next day morning is conflict
      }
    });
  });
  return conflicts;
}

function detectGaps(schedule) {
  // Coverage gaps: if fewer than 1 supervisor or cook on any day
  const gaps = {};
  DAYS.forEach((day, i) => {
    const activeWorkers = schedule.filter(w => w.shifts[i] !== "Off").length;
    if (activeWorkers < 3) gaps[i] = "Under-staffed";
    // Check supervisor coverage
    const hasSupervisor = schedule.some(w => w.role === "Supervisor" && w.shifts[i] !== "Off");
    if (!hasSupervisor) gaps[i] = gaps[i] ? gaps[i] + " · No Supervisor" : "No Supervisor Coverage";
  });
  return gaps;
}

export default function ShiftCalendarGrid({ camp, role }) {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [editing, setEditing] = useState(null); // {workerId, dayIndex}

  const filtered = schedule.filter(w =>
    (camp === "All Camps" || w.camp === camp) &&
    (role === "All Roles" || w.role === role)
  );

  const conflicts = detectConflicts(schedule);
  const gaps = detectGaps(filtered);

  const handleShiftChange = (workerId, dayIndex, newShift) => {
    setSchedule(prev => prev.map(w =>
      w.id === workerId
        ? { ...w, shifts: w.shifts.map((s, i) => i === dayIndex ? newShift : s) }
        : w
    ));
    setEditing(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Gap alerts */}
      {Object.keys(gaps).length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2 flex flex-wrap gap-3">
          {Object.entries(gaps).map(([dayIdx, msg]) => (
            <span key={dayIdx} className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> {DAYS[dayIdx]}: {msg}
            </span>
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-44">Worker</th>
              {DAYS.map((day, i) => (
                <th key={day} className={`px-2 py-3 text-xs font-semibold text-center ${gaps[i] ? "text-amber-600 bg-amber-50" : "text-gray-500"}`}>
                  {day}
                  {gaps[i] && <AlertTriangle className="w-3 h-3 inline ml-1 text-amber-400" />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(worker => (
              <tr key={worker.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800 text-xs leading-tight">{worker.name}</p>
                  <p className="text-gray-400 text-xs">{worker.role}</p>
                  <p className="text-gray-300 text-xs">{worker.camp}</p>
                </td>
                {worker.shifts.map((shift, dayIndex) => {
                  const isConflict = conflicts.has(`${worker.id}-${dayIndex}`);
                  const isEditing = editing?.workerId === worker.id && editing?.dayIndex === dayIndex;
                  return (
                    <td key={dayIndex} className="px-2 py-2 text-center">
                      {isEditing ? (
                        <div className="flex flex-col gap-1 items-center">
                          {["Morning", "Evening", "Night", "Off"].map(s => (
                            <button
                              key={s}
                              onClick={() => handleShiftChange(worker.id, dayIndex, s)}
                              className={`w-full px-2 py-0.5 rounded text-xs font-medium border ${SHIFT_COLORS[s]}`}
                            >{s}</button>
                          ))}
                          <button onClick={() => setEditing(null)} className="text-gray-400 mt-0.5"><X className="w-3 h-3" /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditing({ workerId: worker.id, dayIndex })}
                          className={`px-2 py-1 rounded-lg text-xs font-medium border w-full transition-all ${SHIFT_COLORS[shift]} ${isConflict ? "ring-2 ring-red-400 ring-offset-1" : ""}`}
                          title={isConflict ? "⚠️ Conflict: Night → Morning shift" : `Click to change shift`}
                        >
                          {shift}
                          {isConflict && <span className="ml-1">⚠️</span>}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm">No workers match the selected filters</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-4 flex-wrap text-xs text-gray-500">
        <span className="font-medium">Shifts:</span>
        {Object.entries(SHIFT_COLORS).map(([name, cls]) => (
          <span key={name} className={`px-2 py-0.5 rounded border ${cls}`}>{name}</span>
        ))}
        <span className="flex items-center gap-1 ml-2"><span className="w-3 h-3 rounded ring-2 ring-red-400 bg-gray-100 inline-block" /> Conflict</span>
        <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-400" /> Coverage Gap</span>
      </div>
    </div>
  );
}