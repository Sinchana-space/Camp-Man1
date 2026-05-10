import React, { useState, useEffect } from "react";
import { X, ShieldCheck, ShieldX, AlertTriangle, CheckCircle2, Clock, Bell } from "lucide-react";

export default function AccessCheckPanel({ worker, onContinue, onClose }) {
  const [checking, setChecking] = useState(true);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChecking(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const isRestricted = worker.accessStatus === "restricted";
  const expiredCerts = worker.certifications.filter(c => c.status === "expired");
  const validCerts = worker.certifications.filter(c => c.status === "valid");

  const handleNotify = () => setNotified(true);

  return (
    <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden border-t-4 ${isRestricted ? "border-red-500" : "border-green-500"}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {isRestricted
            ? <ShieldX className="w-5 h-5 text-red-500" />
            : <ShieldCheck className="w-5 h-5 text-green-500" />}
          <h3 className="font-semibold text-gray-800">Access Check</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Worker identity */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${isRestricted ? "bg-red-500" : "bg-green-500"}`}>
            {worker.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{worker.name}</p>
            <p className="text-xs text-gray-500">{worker.role} · {worker.id}</p>
          </div>
          <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${isRestricted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {isRestricted ? "⛔ RESTRICTED" : "✅ GRANTED"}
          </div>
        </div>

        {checking ? (
          <div className="text-center py-4">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Checking certifications & access rights...</p>
          </div>
        ) : (
          <>
            {/* Certifications */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Certifications</p>
              <div className="space-y-2">
                {worker.certifications.map((cert, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${cert.status === "expired" ? "bg-red-50 border border-red-200" : "bg-gray-50 border border-gray-100"}`}>
                    <div className="flex items-center gap-2">
                      {cert.status === "expired"
                        ? <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                        : <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                      <span className={cert.status === "expired" ? "text-red-700 font-medium" : "text-gray-700"}>{cert.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className={cert.status === "expired" ? "text-red-600 font-semibold" : "text-gray-400"}>
                        {cert.expiry}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restricted zones */}
            {isRestricted && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Restricted Zones</p>
                {worker.restrictedZones.map((z, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-red-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {z}
                  </div>
                ))}
                <div className="border-t border-red-200 pt-2 text-xs text-red-500 flex items-center gap-1">
                  <Bell className="w-3 h-3" /> Notify: {worker.alertTo}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              {isRestricted ? (
                <>
                  <button
                    onClick={handleNotify}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${notified ? "bg-gray-100 text-gray-400 cursor-default" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
                    disabled={notified}
                  >
                    <Bell className="w-4 h-4" />
                    {notified ? "Lead Notified ✓" : "Notify Site Lead"}
                  </button>
                  <button onClick={onClose} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
                    Deny Entry
                  </button>
                </>
              ) : (
                <button onClick={onContinue} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Continue to PPE Check →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}