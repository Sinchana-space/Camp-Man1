import React from "react";
import { AlertTriangle, AlertCircle, Users, Clock } from "lucide-react";

const CONFLICTS = [
  { type: "conflict", worker: "Bilal Farooq", day: "Wed 7", msg: "Night shift → Morning shift next day (insufficient rest)", color: "bg-red-50 border-red-200 text-red-700" },
  { type: "conflict", worker: "John Smith", day: "All week", msg: "7 consecutive night shifts — mandatory rest day required", color: "bg-red-50 border-red-200 text-red-700" },
  { type: "gap", worker: "Sat 10 & Sun 11", day: "Weekend", msg: "No Supervisor scheduled — coverage gap", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { type: "gap", worker: "Ad-Dilam Camp", day: "Fri 9", msg: "Only 2 workers active — below minimum (3 required)", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { type: "info", worker: "Ravi Kumar", day: "Sat 10", msg: "6 consecutive working days — overtime threshold reached", color: "bg-blue-50 border-blue-200 text-blue-700" },
];

const COVERAGE = [
  { role: "Electrician", required: 2, assigned: 2, ok: true },
  { role: "Supervisor", required: 1, assigned: 1, ok: true },
  { role: "Cook", required: 2, assigned: 2, ok: true },
  { role: "Guard", required: 1, assigned: 1, ok: true },
  { role: "Heavy Machinery", required: 2, assigned: 1, ok: false },
];

export default function ShiftConflictPanel() {
  const conflicts = CONFLICTS.filter(c => c.type === "conflict").length;
  const gaps = CONFLICTS.filter(c => c.type === "gap").length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" /> Issues This Week
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
            <p className="text-2xl font-bold text-red-600">{conflicts}</p>
            <p className="text-xs text-red-500 mt-0.5">Conflicts</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
            <p className="text-2xl font-bold text-amber-600">{gaps}</p>
            <p className="text-xs text-amber-500 mt-0.5">Coverage Gaps</p>
          </div>
        </div>
      </div>

      {/* Alerts list */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">Alerts & Warnings</h3>
        <div className="space-y-2">
          {CONFLICTS.map((item, i) => (
            <div key={i} className={`rounded-lg border px-3 py-2.5 ${item.color}`}>
              <div className="flex items-start gap-2">
                {item.type === "conflict" && <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                {item.type === "gap" && <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                {item.type === "info" && <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />}
                <div>
                  <p className="text-xs font-semibold">{item.worker} · {item.day}</p>
                  <p className="text-xs opacity-80 mt-0.5 leading-tight">{item.msg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role coverage */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" /> Role Coverage
        </h3>
        <div className="space-y-2">
          {COVERAGE.map((c, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{c.role}</span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${c.ok ? "text-green-600" : "text-red-500"}`}>
                  {c.assigned}/{c.required}
                </span>
                <span className={`w-2 h-2 rounded-full ${c.ok ? "bg-green-400" : "bg-red-400"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}