import React from "react";
import { Wrench, AlertTriangle } from "lucide-react";

const lockouts = [
  { camp: "Ad-Dilam Camp", block: "Block A", beds: 4, reason: "Electrical rewiring", since: "2026-05-07", eta: "2026-05-12" },
  { camp: "Ad-Dilam Camp", block: "Block C", beds: 2, reason: "AC unit replacement", since: "2026-05-08", eta: "2026-05-11" },
  { camp: "Al Bahah Camp", block: "Block B", beds: 6, reason: "Water damage repair", since: "2026-05-05", eta: "2026-05-14" },
  { camp: "Riyadh Industrial", block: "Block A", beds: 3, reason: "Pest control treatment", since: "2026-05-09", eta: "2026-05-10" },
  { camp: "New Camp", block: "Block D", beds: 8, reason: "Structural inspection", since: "2026-05-01", eta: "2026-05-15" },
];

export default function MaintenanceLockoutPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <Wrench className="w-4 h-4 text-red-500" />
        <h3 className="font-semibold text-gray-800 text-sm">Maintenance Lockouts</h3>
        <span className="ml-auto text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
          {lockouts.reduce((s, l) => s + l.beds, 0)} beds locked
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {lockouts.map((l, i) => (
          <div key={i} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
            <div className="mt-0.5 p-1.5 bg-red-50 rounded-lg shrink-0">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-gray-800">{l.camp}</span>
                <span className="text-xs text-gray-400">— {l.block}</span>
                <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{l.beds} beds</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{l.reason}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span>Since: <span className="text-gray-600">{l.since}</span></span>
                <span>ETA: <span className="text-amber-600 font-medium">{l.eta}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}