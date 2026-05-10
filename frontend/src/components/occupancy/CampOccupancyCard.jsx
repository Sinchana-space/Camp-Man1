import React, { useState } from "react";
import { ChevronDown, ChevronRight, Wrench, Users, BedDouble } from "lucide-react";

function BlockRow({ block }) {
  const total = block.male.total + block.female.total;
  const occupied = block.male.occupied + block.female.occupied;
  const available = total - occupied - block.maintenance;
  const pct = Math.round((occupied / total) * 100);

  const barColor =
    pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-400" : "bg-green-500";

  return (
    <div className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-medium text-gray-700 w-24 shrink-0">{block.name}</span>
        <div className="flex-1 bg-gray-100 rounded-full h-2 relative overflow-hidden">
          <div className={`h-2 rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-semibold text-gray-600 w-10 text-right">{pct}%</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500 pl-24">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
          ♂ {block.male.occupied}/{block.male.total}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
          ♀ {block.female.occupied}/{block.female.total}
        </span>
        <span className="flex items-center gap-1 text-emerald-600">
          <BedDouble className="w-3 h-3" /> {available} avail.
        </span>
        {block.maintenance > 0 && (
          <span className="flex items-center gap-1 text-red-500">
            <Wrench className="w-3 h-3" /> {block.maintenance} locked
          </span>
        )}
      </div>
    </div>
  );
}

export default function CampOccupancyCard({ camp }) {
  const [expanded, setExpanded] = useState(true);

  const total = camp.blocks.reduce((s, b) => s + b.male.total + b.female.total, 0);
  const occupied = camp.blocks.reduce((s, b) => s + b.male.occupied + b.female.occupied, 0);
  const maintenance = camp.blocks.reduce((s, b) => s + b.maintenance, 0);
  const available = total - occupied - maintenance;
  const pct = Math.round((occupied / total) * 100);

  const statusColor =
    pct > 90 ? "text-red-600 bg-red-50 border-red-200" :
    pct > 70 ? "text-amber-600 bg-amber-50 border-amber-200" :
    "text-green-600 bg-green-50 border-green-200";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 flex-1">
          {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          <h3 className="font-semibold text-gray-800 text-sm">{camp.name}</h3>
          <span className="text-xs text-gray-400">{camp.location}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-500"><Users className="w-3 h-3 inline mr-1" />{occupied}/{total}</span>
          <span className="text-gray-500"><Wrench className="w-3 h-3 inline mr-1 text-red-400" />{maintenance}</span>
          <span className="text-emerald-600 font-medium"><BedDouble className="w-3 h-3 inline mr-1" />{available} free</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColor}`}>{pct}%</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100">
          {camp.blocks.map((block) => (
            <BlockRow key={block.name} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}