import React, { useState } from "react";

export default function RoomAvailability() {
  const [selectedCamp, setSelectedCamp] = useState("All Camps");
  const total = 236;
  const assigned = 17;
  const available = 219;
  const reserved = 0;
  const maintenance = 0;

  const assignedPct = (assigned / total) * 100;
  const availablePct = (available / total) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Room Availability</h3>
        <select
          value={selectedCamp}
          onChange={e => setSelectedCamp(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white outline-none"
        >
          <option>All Camps</option>
          <option>Ad-Dilam Camp</option>
          <option>Al Baha Camp</option>
        </select>
      </div>

      {/* Bar */}
      <div className="w-full h-6 rounded-full overflow-hidden flex mb-5 bg-gray-100">
        <div className="bg-blue-500 h-full transition-all" style={{ width: `${assignedPct}%` }} />
        <div className="bg-green-500 h-full transition-all" style={{ width: `${availablePct}%` }} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
          Assigned <strong className="ml-1">{assigned}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          Available <strong className="ml-1">{available}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
          Reserved <strong className="ml-1">{reserved}</strong>
        </span>
      </div>
      <div className="mt-2 flex gap-5 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
          Under Maintenance <strong className="ml-1">{maintenance}</strong>
        </span>
      </div>
    </div>
  );
}