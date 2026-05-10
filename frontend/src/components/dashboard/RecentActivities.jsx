import React from "react";
import { Wrench } from "lucide-react";

const activities = [
  { title: "bulb issue", camp: "Ad-Dilam Camp", category: "Electrical", date: "5/3/2026", dot: "blue" },
  { title: "table broken", camp: "Ad-Dilam Camp", category: "Furniture", date: "5/3/2026", dot: "blue" },
  { title: "bulb issue", camp: "Ad-Dilam Camp", category: "Electrical", date: "5/2/2026", dot: "blue" },
  { title: "water leakage at sink", camp: "Ad-Dilam Camp", category: "Plumbing", date: "4/30/2026", dot: "blue" },
  { title: "light not working", camp: "Ad-Dilam Camp", category: "Electrical", date: "4/22/2026", dot: "yellow" },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Recent Activities</h3>
        <button className="text-xs text-blue-500 hover:underline flex items-center gap-1">
          View all <span>›</span>
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
              <Wrench className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">{a.title}</p>
              <p className="text-xs text-gray-400">{a.camp} • {a.category} • {a.date}</p>
            </div>
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.dot === "blue" ? "bg-blue-500" : "bg-yellow-400"}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
}