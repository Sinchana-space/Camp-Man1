import React from "react";
import { BedDouble, CheckCircle2, Wrench, Users } from "lucide-react";

export default function OccupancyStatsBar({ stats }) {
  const cards = [
    { label: "Total Beds", value: stats.total, icon: BedDouble, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Occupied", value: stats.occupied, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Available", value: stats.available, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Maintenance Lockout", value: stats.maintenance, icon: Wrench, color: "text-red-500", bg: "bg-red-50" },
    {
      label: "Occupancy Rate",
      value: `${Math.round((stats.occupied / stats.total) * 100)}%`,
      icon: null,
      isRate: true,
      rate: Math.round((stats.occupied / stats.total) * 100),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {cards.map((c) => {
        const IconComponent = c.icon;
        return (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">{c.label}</span>
              {IconComponent && <IconComponent className={`w-4 h-4 ${c.color}`} />}
            </div>
            <div className="text-2xl font-bold text-gray-900">{c.value}</div>
            {c.isRate && (
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${c.rate}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}