import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Own", value: 26, pct: "51%", color: "#3b82f6" },
  { name: "Suhana Manpower Ag...", value: 10, pct: "20%", color: "#22c55e" },
  { name: "XYZ Manpower", value: 10, pct: "20%", color: "#eab308" },
  { name: "Delta Manpower", value: 3, pct: "6%", color: "#6366f1" },
  { name: "Gulf Star Services", value: 2, pct: "4%", color: "#a855f7" },
];

export default function SupplierDistribution() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Supplier-wise Employee Distribution</h3>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
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
        <div className="w-full space-y-2 mt-2">
          {data.map(d => (
            <div key={d.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: d.color }}></span>
                <span className="text-gray-600">{d.name}</span>
              </span>
              <span className="flex gap-4">
                <strong className="text-gray-800">{d.value}</strong>
                <span className="text-gray-400 w-8 text-right">{d.pct}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}