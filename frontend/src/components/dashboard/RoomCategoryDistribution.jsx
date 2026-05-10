import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Skilled Worker\n6-Bed Room", short: "Skilled 6-Bed", value: 90, rooms: 15, occupied: 3, pct: "3%" },
  { name: "Supervisor Twin Sharing", short: "Supervisor Twin", value: 24, rooms: 12, occupied: 1, pct: "4%" },
  { name: "Executive Single Room", short: "Executive Single", value: 8, rooms: 8, occupied: 1, pct: "13%" },
  { name: "General Worker 8-Bed R...", short: "General 8-Bed", value: 40, rooms: 5, occupied: 2, pct: "5%" },
  { name: "Executive Twin Sharing", short: "Exec Twin", value: 4, rooms: 2, occupied: 1, pct: "25%" },
  { name: "Guest Single Room", short: "Guest Single", value: 2, rooms: 2, occupied: 0, pct: "0%" },
  { name: "Transit 4-Bed Room", short: "Transit 4-Bed", value: 4, rooms: 1, occupied: 2, pct: "50%" },
];

const categories = [
  "Skilled Worker 6-Bed Ro...",
  "Executive Single Room",
  "Executive Twin Sharing",
  "Transit 4-Bed Room",
];

export default function RoomCategoryDistribution() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Room Category Distribution</h3>

      {/* Horizontal Bar Chart */}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data.slice(0, 4)} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 100]} />
          <YAxis type="category" dataKey="short" tick={{ fontSize: 9 }} width={90} />
          <Tooltip formatter={(v) => [v, "Capacity"]} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.slice(0, 4).map((entry, index) => (
              <Cell key={index} fill={index % 2 === 0 ? "#93c5fd" : "#cbd5e1"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Table */}
      <div className="mt-4 space-y-1.5">
        {data.map((row, i) => (
          <div key={i} className="flex items-center justify-between text-xs text-gray-600 border-b border-gray-50 pb-1.5 last:border-0">
            <span className="flex-1 truncate text-gray-700">{row.name}</span>
            <div className="flex gap-4 shrink-0 text-right">
              <span className="text-gray-400 w-16">{row.rooms} rooms</span>
              <span className="text-gray-700 font-medium w-10">{row.occupied}/{row.rooms * 2 || row.rooms}</span>
              <span className="text-gray-500 w-8">{row.pct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}