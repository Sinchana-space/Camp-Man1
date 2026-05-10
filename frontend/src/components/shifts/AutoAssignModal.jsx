import React, { useState } from "react";
import { X, Zap, CheckCircle2, ChevronRight } from "lucide-react";

const PRIORITIES = ["Coverage Gaps First", "Balance Workload", "Respect Rest Rules", "Minimize Overtime"];

const MOCK_RESULT = [
  { worker: "Bilal Farooq", change: "Wed shift changed Night → Evening (rest conflict fixed)", type: "fix" },
  { worker: "John Smith", change: "Sunday marked Off (7-day consecutive resolved)", type: "fix" },
  { worker: "New assignment", change: "Sat 10: Bilal Farooq assigned Morning (Supervisor gap covered)", type: "add" },
  { worker: "Sanjay Patel", change: "Thu–Fri: Morning shift added (Heavy Machinery understaffed)", type: "add" },
  { worker: "Li Wei", change: "Mon: Morning assigned (coverage gap at Al Bahah)", type: "add" },
];

export default function AutoAssignModal({ camp, role, week, onClose, onAssigned }) {
  const [phase, setPhase] = useState("config"); // config | running | done
  const [priorities, setPriorities] = useState(PRIORITIES.slice(0, 3));
  const [result, setResult] = useState(null);

  const togglePriority = (p) => {
    setPriorities(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleRun = async () => {
    setPhase("running");
    // Simulate AI processing delay, then show results
    await new Promise(r => setTimeout(r, 2200));
    setResult(MOCK_RESULT);
    setPhase("done");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Auto-Assign Shifts</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-5 py-4">
          {/* Config phase */}
          {phase === "config" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700">
                Auto-assign will analyze <strong>{camp}</strong> workers and fill the week of <strong>{week}</strong> based on role needs and site coverage rules.
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Assignment Priorities</p>
                <div className="space-y-2">
                  {PRIORITIES.map(p => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={priorities.includes(p)}
                        onChange={() => togglePriority(p)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm text-gray-700">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-gray-400 mb-1">Shift windows</p>
                  <p className="font-semibold text-gray-700">Morning · Evening · Night</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-gray-400 mb-1">Min rest between shifts</p>
                  <p className="font-semibold text-gray-700">8 hours</p>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={handleRun} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> Run Auto-Assign
                </button>
              </div>
            </div>
          )}

          {/* Running phase */}
          {phase === "running" && (
            <div className="py-10 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
                <Zap className="w-6 h-6 text-blue-500 absolute inset-0 m-auto" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800 mb-1">Analyzing & Assigning...</p>
                <p className="text-xs text-gray-400">Checking roles, gaps, conflicts and rest rules</p>
              </div>
            </div>
          )}

          {/* Done phase */}
          {phase === "done" && result && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <p className="font-semibold text-green-700 text-sm">Schedule optimized!</p>
                  <p className="text-xs text-green-600">{result.length} changes applied to fix conflicts & gaps</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Changes Made</p>
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {result.map((r, i) => (
                    <div key={i} className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${r.type === "fix" ? "bg-blue-50 border-blue-100 text-blue-700" : "bg-green-50 border-green-100 text-green-700"}`}>
                      <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold">{r.worker}: </span>{r.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={onAssigned} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium">
                Apply to Schedule
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}