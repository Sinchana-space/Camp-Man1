import React from "react";

const camps = [
  { name: "Ad-Dil...", location: "Ad-Di...", rooms: 12, status: "Active" },
  { name: "Al Bah...", location: "Al Bah...", rooms: 4, status: "Active" },
  { name: "New C...", location: "Jubail", rooms: 35, status: "Active" },
  { name: "Riyadh...", location: "Riyadh...", rooms: 4, status: "Active" },
  { name: "Stay S...", location: "Jubail", rooms: 6, status: "Active" },
];

export default function RecentAllocatedCamps() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Recent Allocated Camps</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-400 border-b border-gray-100">
            <th className="text-left pb-2 font-medium">Camp Name</th>
            <th className="text-left pb-2 font-medium">Location</th>
            <th className="text-left pb-2 font-medium">Rooms</th>
            <th className="text-left pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {camps.map((c, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 text-gray-700 font-medium">{c.name}</td>
              <td className="py-2.5 text-gray-500">{c.location}</td>
              <td className="py-2.5 text-gray-700">{c.rooms}</td>
              <td className="py-2.5">
                <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{c.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}