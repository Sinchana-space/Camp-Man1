import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GenderOccupancyChart({ camps }) {
  const data = camps.map((camp) => {
    const maleOccupied = camp.blocks.reduce((s, b) => s + b.male.occupied, 0);
    const maleTotal = camp.blocks.reduce((s, b) => s + b.male.total, 0);
    const femaleOccupied = camp.blocks.reduce((s, b) => s + b.female.occupied, 0);
    const femaleTotal = camp.blocks.reduce((s, b) => s + b.female.total, 0);
    return {
      name: camp.name.split(" ")[0],
      "Male Occupied": maleOccupied,
      "Male Available": maleTotal - maleOccupied,
      "Female Occupied": femaleOccupied,
      "Female Available": femaleTotal - femaleOccupied,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Gender-Segregated Occupancy per Camp</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="Male Occupied" stackId="male" fill="#3b82f6" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Male Available" stackId="male" fill="#bfdbfe" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Female Occupied" stackId="female" fill="#ec4899" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Female Available" stackId="female" fill="#fbcfe8" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}