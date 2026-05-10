import React from "react";
import { Building2, LogIn, Users, Wrench, Package, BarChart2 } from "lucide-react";

const actions = [
  { label: "Manage Camps", icon: Building2, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Check In/Out", icon: LogIn, color: "text-green-500", bg: "bg-green-50" },
  { label: "Employees", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Maintenance", icon: Wrench, color: "text-orange-400", bg: "bg-orange-50" },
  { label: "Inventory", icon: Package, color: "text-teal-500", bg: "bg-teal-50" },
  { label: "Reports", icon: BarChart2, color: "text-red-400", bg: "bg-red-50" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, icon: Icon, color, bg }) => (
          <button
            key={label}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className={`${bg} p-2.5 rounded-lg`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <span className="text-xs text-gray-600 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}