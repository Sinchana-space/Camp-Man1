import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Occupied", value: 17, color: "#3b82f6" },
  { name: "Available", value: 219, color: "#22c55e" },
];

export default function OccupancyOverview() {
  const total = 236;
  const rate = Math.round((17 / total) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Occupancy Overview</h3>
      <div className="flex justify-center">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v, n) => [v, n]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2 text-xs text-gray-600">
        {data.map(d => (
          <span key={d.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: d.color }}></span>
            {d.name}: <strong>{d.value}</strong>
          </span>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-1">{rate}% occupancy rate</p>
    </div>
  );
}