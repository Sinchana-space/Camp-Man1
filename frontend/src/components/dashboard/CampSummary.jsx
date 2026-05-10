import React from "react";

const camps = [
  { name: "Ad-Dilam Camp", occupancy: 30 },
  { name: "Al Baha Camp", occupancy: 15 },
  { name: "New Camp", occupancy: 55 },
  { name: "Riyadh Camp", occupancy: 25 },
];

export default function CampSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Camp Summary</h3>
        <button className="text-xs text-blue-500 hover:underline flex items-center gap-1">
          View all <span>›</span>
        </button>
      </div>
      <div className="space-y-3">
        {camps.map((c, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-700 font-medium">{c.name}</span>
              <span className="text-xs text-gray-500">{c.occupancy}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${c.occupancy}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}