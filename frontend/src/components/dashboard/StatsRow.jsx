import React from "react";
import { Building2, DoorOpen, Users, BedDouble, Wrench } from "lucide-react";

const stats = [
  { label: "Total Camps", value: "5", icon: Building2, iconColor: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "Rooms", value: "61", icon: DoorOpen, iconColor: "text-pink-500", bg: "bg-pink-50", border: "border-pink-100" },
  { label: "Total Occupants", value: "17", icon: Users, iconColor: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
  { label: "Vacant Rooms", value: "50", icon: BedDouble, iconColor: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-100" },
  { label: "Under Mainten...", value: "0", icon: Wrench, iconColor: "text-red-400", bg: "bg-red-50", border: "border-red-100" },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(({ label, value, icon: Icon, iconColor, bg, border }) => (
        <div key={label} className={`bg-white rounded-xl border ${border} p-4 flex items-center justify-between`}>
          <div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div className={`${bg} p-2.5 rounded-lg`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
}