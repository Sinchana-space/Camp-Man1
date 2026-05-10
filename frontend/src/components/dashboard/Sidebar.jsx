import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Home, Users, Building2, LogIn, Wrench, Shield, HelpCircle, Settings, ChevronDown, ChevronRight, CalendarDays, BedDouble, ClipboardList } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Employee Master", path: "/employees" },
  { icon: Building2, label: "Camp Management", path: "/camps" },
  { icon: LogIn, label: "Check-In / Out", path: "/check-in-out" },
  { icon: Wrench, label: "Repair & Maintenance", path: "/repair-maintenance" },
  { icon: Shield, label: "Preventive Maintenance", path: "/preventive-maintenance" },
  { icon: Users, label: "Staff KPI Monitoring", path: "/staff-kpi" },
  { icon: Wrench, label: "Inventory", path: "/inventory" },
  { icon: CalendarDays, label: "Shift Scheduling", path: "/shift-scheduling" },
  { icon: BedDouble, label: "Bed Occupancy", path: "/bed-occupancy" },
  { icon: ClipboardList, label: "Room Inspection", path: "/room-inspection" },
  { icon: HelpCircle, label: "Support", path: "/support" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar({ activePage }) {
  const [expanded, setExpanded] = useState({});
  const location = useLocation();

  const toggle = (label) => setExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  const isActive = (item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside className="w-52 bg-black flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: "#c6ef4e", color: "#000" }}>
          X
        </div>
        <span className="font-bold text-white text-base">CAMPMAN</span>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-lg px-3 py-1.5">
          <Search className="w-3.5 h-3.5 text-white/40" />
          <input className="bg-transparent text-xs text-white/60 outline-none w-full placeholder-white/30" placeholder="Search" />
          <span className="text-xs text-white/20 ml-auto">⌘K</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {navItems.map(({ icon: Icon, label, path, hasChildren }) => {
          const active = isActive({ path, label });
          return (
            <div key={label}>
              {hasChildren ? (
                <button
                  onClick={() => toggle(label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
                    active ? "text-black" : "text-white/60 hover:bg-white/8 hover:text-white"
                  }`}
                  style={active ? { backgroundColor: "#c6ef4e" } : {}}
                >
                  <Icon className={`w-4 h-4 shrink-0`} />
                  <span className="text-xs font-medium leading-tight">{label}</span>
                  <span className="ml-auto">
                    {expanded[label] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </span>
                </button>
              ) : (
                <Link
                  to={path}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                    active ? "text-black font-semibold" : "text-white/60 hover:bg-white/8 hover:text-white"
                  }`}
                  style={active ? { backgroundColor: "#c6ef4e" } : {}}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-medium leading-tight">{label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-xs text-white/25">© Sinchana S Naik. 2024. All Rights Reserved.</p>
      </div>
    </aside>
  );
}