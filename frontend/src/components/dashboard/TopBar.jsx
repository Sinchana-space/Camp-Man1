import React from "react";
import { MapPin, Globe, Bell } from "lucide-react";

export default function TopBar() {
  return (
    <header className="bg-white border-b border-[#e8e6dc] px-6 py-3 flex items-center gap-4 shrink-0">
      {/* Company */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">EC</div>
        <span className="text-sm font-medium text-gray-700">CAMPMAN by Sinchana S Naik</span>
      </div>

      {/* Camp Management button */}
      <button className="border border-blue-500 text-blue-600 rounded-full px-4 py-1 text-xs font-medium hover:bg-blue-50 transition-colors">
        Camp Management
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>Al Jubail</span>
        </div>
        <Globe className="w-4 h-4 text-gray-500 cursor-pointer" />
        <Bell className="w-4 h-4 text-gray-500 cursor-pointer" />
        <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">A</div>
      </div>
    </header>
  );
}