import React, { useState, useEffect } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";

export default function CheckInOut() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const year = now.getFullYear();
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center gap-4">
      <Clock className="w-8 h-8 text-blue-400" />

      <div className="flex items-end gap-6">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-0.5">Time</p>
          <p className="text-2xl font-bold text-gray-800">{timeStr}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-0.5">{year}</p>
          <p className="text-2xl font-bold text-gray-800">{dateStr}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400">Check In / Check Out</p>

      <div className="flex gap-3 w-full">
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <LogIn className="w-3.5 h-3.5" /> Check In
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <LogOut className="w-3.5 h-3.5" /> Check Out
        </button>
      </div>
    </div>
  );
}