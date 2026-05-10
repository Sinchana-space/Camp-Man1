import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { LogIn, LogOut, ArrowLeftRight, Building2, Search, ChevronDown, QrCode } from "lucide-react";
import QRScannerModal from "@/components/QRScannerModal";

const camps = [
  { id: 1, name: "Ad-Dilam Camp", location: "Ad-Dilam, Saudi Arabia" },
  { id: 2, name: "Al Bahah Camp", location: "Al Bahah, Saudi Arabia" },
  { id: 3, name: "New Camp", location: "Jubail" },
  { id: 4, name: "Riyadh Industrial Camp", location: "Riyadh, Saudi Arabia" },
];

const roomTypes = [
  { label: "EXEC-S", color: "bg-purple-500" },
  { label: "EXEC-T", color: "bg-blue-500" },
  { label: "SUPV", color: "bg-teal-500" },
  { label: "STAFF", color: "bg-green-500" },
  { label: "SKILL", color: "bg-yellow-500" },
  { label: "GEN", color: "bg-orange-400" },
  { label: "GUEST", color: "bg-pink-500" },
  { label: "TRNST", color: "bg-red-500" },
];

export default function CheckInOut() {
  const [activeTab, setActiveTab] = useState("Check In");
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [type, setType] = useState("Own");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [showQRScanner, setShowQRScanner] = useState(false);

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2,'0')}-${String(now.getMonth()+1).padStart(2,'0')}-${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar activePage="Check-In / Out" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Tab bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2">
            {[
              { label: "Check In", icon: LogIn },
              { label: "Check Out", icon: LogOut },
              { label: "Transfer Requests", icon: ArrowLeftRight },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === label
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">📅 {dateStr}</span>
              <span className="flex items-center gap-1.5">🕐 {timeStr}</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex">
            {/* Left: Camp selector */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Room type legend */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-3 flex-wrap text-xs mb-2">
                  <span className="text-gray-500 font-medium">Types:</span>
                  {roomTypes.map(rt => (
                    <span key={rt.label} className={`${rt.color} text-white px-2 py-0.5 rounded text-xs font-bold`}>{rt.label}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="font-medium text-gray-500">Status:</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gray-200 inline-block"></span> Occupied</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-white border border-gray-300 inline-block"></span> Available</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block"></span> Maintenance</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block"></span> Reserved</span>
                </div>
              </div>

              {selectedCamp ? (
                <div className="text-center py-16 text-gray-400">
                  <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Room map for <strong>{selectedCamp.name}</strong> would appear here</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center py-8 text-gray-400">
                    <div className="text-center">
                      <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Select a camp to view rooms</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {camps.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCamp(c)}
                        className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:border-blue-400 hover:shadow-sm transition-all text-center"
                      >
                        <div className="bg-blue-50 p-3 rounded-xl">
                          <Building2 className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.location}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Form panel */}
            <div className="w-72 bg-white border-l border-gray-200 p-5 flex flex-col gap-4 overflow-y-auto">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Camp</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-pointer hover:border-gray-400 transition-colors">
                  <span className="flex-1">Choose a camp...</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Type</label>
                <div className="flex gap-2 mb-2">
                  {["Own", "Supplier"].map(t => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        type === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Project</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
                    <span className="flex-1">All Projects</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Room Number</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-400 bg-gray-50">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Click a room on the map or it will be auto-fi</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">Select Employee</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 mb-2">
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <input
                    className="text-sm outline-none w-full placeholder-gray-400"
                    placeholder="Search by name or ID..."
                    value={employeeSearch}
                    onChange={e => setEmployeeSearch(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowQRScanner(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  Scan Worker ID Card
                </button>
              </div>

              <div className="mt-auto flex gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Confirm Check-In
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      {showQRScanner && (
        <QRScannerModal
          onClose={() => setShowQRScanner(false)}
          onScan={(worker) => setEmployeeSearch(worker.name)}
        />
      )}
    </div>
  );
}