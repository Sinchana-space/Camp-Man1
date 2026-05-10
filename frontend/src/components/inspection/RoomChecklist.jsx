import React from "react";

const CHECKLIST_ITEMS = [
  { id: "beds", label: "Beds & Mattresses" },
  { id: "ac", label: "AC / Ventilation" },
  { id: "lighting", label: "Lighting / Electrical" },
  { id: "bathroom", label: "Bathroom / Plumbing" },
  { id: "windows", label: "Windows & Doors" },
  { id: "furniture", label: "Furniture Condition" },
  { id: "cleanliness", label: "Cleanliness" },
  { id: "fire", label: "Fire Safety Equipment" },
];

const STATUS_OPTIONS = [
  { value: "ok", label: "OK", color: "bg-green-100 text-green-700 border-green-300" },
  { value: "issue", label: "Issue", color: "bg-amber-100 text-amber-700 border-amber-300" },
  { value: "damaged", label: "Damaged", color: "bg-red-100 text-red-700 border-red-300" },
];

export default function RoomChecklist({ values, onChange }) {
  const set = (id, status) => onChange({ ...values, [id]: status });

  return (
    <div className="space-y-2">
      {CHECKLIST_ITEMS.map((item) => {
        const current = values[item.id] || null;
        return (
          <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-700 flex-1">{item.label}</span>
            <div className="flex gap-1.5 shrink-0">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set(item.id, opt.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    current === opt.value
                      ? opt.color
                      : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}