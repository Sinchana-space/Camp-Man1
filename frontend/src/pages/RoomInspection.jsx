import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import SignaturePad from "@/components/inspection/SignaturePad";
import PhotoUploader from "@/components/inspection/PhotoUploader";
import RoomChecklist from "@/components/inspection/RoomChecklist";
import InspectionRecentList from "@/components/inspection/InspectionRecentList";
import { ClipboardList, LogIn, LogOut, CheckCircle2 } from "lucide-react";

const CAMPS = ["Ad-Dilam Camp", "Al Bahah Camp", "New Camp", "Riyadh Industrial Camp"];

const EMPTY_FORM = {
  type: "Check-In",
  camp: "",
  block: "",
  room: "",
  employeeId: "",
  employeeName: "",
  notes: "",
};

export default function RoomInspection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [checklist, setChecklist] = useState({});
  const [photos, setPhotos] = useState([]);
  const [signature, setSignature] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: save to entity
    setSubmitted(true);
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setChecklist({});
    setPhotos([]);
    setSignature(null);
    setSubmitted(false);
  };

  const checklistComplete = Object.keys(checklist).length >= 6;
  const canSubmit = form.camp && form.room && form.employeeName && checklistComplete && signature;

  if (submitted) {
    return (
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-sm w-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Inspection Submitted</h2>
              <p className="text-gray-500 text-sm mb-1">
                <strong>{form.type}</strong> for Room <strong>{form.room}</strong>
              </p>
              <p className="text-gray-400 text-xs mb-6">{form.camp} · {new Date().toLocaleString()}</p>
              <button
                onClick={reset}
                className="w-full bg-gray-800 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                New Inspection
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-gray-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Room Inspection</h1>
                <p className="text-gray-500 text-xs">Digital check-in / check-out with damage reporting</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left: Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">

                {/* Inspection type toggle */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Inspection Type</p>
                  <div className="flex gap-3">
                    {["Check-In", "Check-Out"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("type", t)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          form.type === t
                            ? "bg-gray-800 text-white border-gray-800"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {t === "Check-In" ? <LogIn className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Room Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Camp *</label>
                      <select
                        value={form.camp}
                        onChange={(e) => set("camp", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none bg-white"
                      >
                        <option value="">Select camp…</option>
                        {CAMPS.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Block</label>
                      <input
                        value={form.block}
                        onChange={(e) => set("block", e.target.value)}
                        placeholder="e.g. Block A"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Room Number *</label>
                      <input
                        value={form.room}
                        onChange={(e) => set("room", e.target.value)}
                        placeholder="e.g. A-101"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Employee ID</label>
                      <input
                        value={form.employeeId}
                        onChange={(e) => set("employeeId", e.target.value)}
                        placeholder="e.g. CS-001"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Employee Name *</label>
                    <input
                      value={form.employeeName}
                      onChange={(e) => set("employeeName", e.target.value)}
                      placeholder="Full name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Room Condition Checklist
                    <span className="ml-2 text-gray-400 font-normal normal-case">({Object.keys(checklist).length}/8 assessed)</span>
                  </p>
                  <RoomChecklist values={checklist} onChange={setChecklist} />
                </div>

                {/* Photos */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Damage / Condition Photos
                    <span className="ml-2 text-gray-400 font-normal normal-case">({photos.length} uploaded)</span>
                  </p>
                  <PhotoUploader photos={photos} onChange={setPhotos} />
                </div>

                {/* Notes */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Additional Notes</p>
                  <textarea
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    placeholder="Describe any issues, damages, or remarks…"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
                  />
                </div>

                {/* Signature */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employee Signature *</p>
                    {signature && <span className="text-xs text-green-600 font-medium">✓ Captured</span>}
                  </div>
                  <SignaturePad
                    onSave={(data) => setSignature(data)}
                    onClear={() => setSignature(null)}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: canSubmit ? "#c6ef4e" : "#e5e7eb", color: canSubmit ? "#000" : "#9ca3af" }}
                >
                  Submit {form.type} Inspection
                </button>
                {!canSubmit && (
                  <p className="text-xs text-center text-gray-400">
                    Complete camp, room, name, checklist (6+ items) and signature to submit.
                  </p>
                )}
              </form>

              {/* Right: Recent */}
              <div className="space-y-4">
                <InspectionRecentList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}