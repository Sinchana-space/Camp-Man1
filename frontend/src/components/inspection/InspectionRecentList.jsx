import React from "react";
import { CheckCircle2, AlertTriangle, Clock } from "lucide-react";

const RECENT = [
  { room: "A-101", camp: "Ad-Dilam Camp", type: "Check-In", by: "Ahmed Al-Rashid", date: "2026-05-10 08:14", status: "clean" },
  { room: "B-205", camp: "Al Bahah Camp", type: "Check-Out", by: "Khalid Mansour", date: "2026-05-10 07:55", status: "damaged" },
  { room: "C-301", camp: "New Camp", type: "Check-In", by: "Bilal Farooq", date: "2026-05-09 19:30", status: "issue" },
  { room: "A-103", camp: "Ad-Dilam Camp", type: "Check-Out", by: "Ravi Kumar", date: "2026-05-09 18:00", status: "clean" },
  { room: "D-410", camp: "Riyadh Industrial", type: "Check-In", by: "John Smith", date: "2026-05-09 16:45", status: "clean" },
];

const statusCfg = {
  clean: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", label: "Clean" },
  issue: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50", label: "Issue" },
  damaged: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50", label: "Damaged" },
};

export default function InspectionRecentList() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-800">Recent Inspections</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {RECENT.map((r, i) => {
          const cfg = statusCfg[r.status];
          const Icon = cfg.icon;
          return (
            <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
              <div className={`${cfg.bg} p-1.5 rounded-lg shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">Room {r.room}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  <span className="text-xs text-gray-400 ml-auto">{r.type}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{r.camp} · {r.by} · {r.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}