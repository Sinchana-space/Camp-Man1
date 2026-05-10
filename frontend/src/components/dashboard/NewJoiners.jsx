import React from "react";
import { User } from "lucide-react";

const joiners = [
  { name: "Sanath Abdul Kareem", status: "Assigned" },
  { name: "Imran Khan", status: "Not Assigned" },
  { name: "Rahul Sharma", status: "Not Assigned" },
  { name: "Ahmed Raza", status: "Not Assigned" },
  { name: "Sandeep Singh", status: "Not Assigned" },
  { name: "Hasan Mahmud", status: "Not Assigned" },
];

export default function NewJoiners() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">New Joiners</h3>
        <button className="text-xs text-blue-500 hover:underline flex items-center gap-1">
          Allocate Room <span>›</span>
        </button>
      </div>
      <div className="space-y-2.5">
        {joiners.map((j, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <span className="text-xs text-gray-700 font-medium">{j.name}</span>
            </div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0 ${
              j.status === "Assigned"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-500"
            }`}>
              {j.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}