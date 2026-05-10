import React, { useEffect, useRef, useState } from "react";
import { X, QrCode, Camera } from "lucide-react";
import AccessCheckPanel from "./scanner/AccessCheckPanel";
import SelfieCheckModal from "./scanner/SelfieCheckModal";

// Mock worker database with certifications
const MOCK_WORKERS = {
  "PASS": {
    id: "EMP-20431", name: "Ahmed Al-Rashid", role: "Electrician",
    camp: "Ad-Dilam Camp", nationality: "Saudi",
    certifications: [
      { name: "Electrical Safety", expiry: "2027-01-15", status: "valid" },
      { name: "First Aid", expiry: "2026-08-20", status: "valid" },
    ],
    accessStatus: "granted",
  },
  "EXPIRED": {
    id: "EMP-10872", name: "Ravi Kumar", role: "Heavy Machinery Operator",
    camp: "Riyadh Industrial Camp", nationality: "Indian",
    certifications: [
      { name: "Heavy Machinery License", expiry: "2026-05-08", status: "expired" },
      { name: "Confined Space Entry", expiry: "2026-12-01", status: "valid" },
    ],
    accessStatus: "restricted",
    restrictedZones: ["Zone A – Heavy Equipment", "Zone C – Crane Operations"],
    alertTo: "Site Lead – Khalid Mansour",
  },
};

export default function QRScannerModal({ onClose, onScan }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [phase, setPhase] = useState("scanning"); // scanning | access_check | selfie_check
  const [scanStatus, setScanStatus] = useState("scanning"); // scanning | found | error
  const [worker, setWorker] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  // Cycle between PASS and EXPIRED for demo
  const [demoToggle] = useState(() => Math.random() > 0.5 ? "PASS" : "EXPIRED");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraError(true);
    }
    // Simulate QR detection after 2s
    setTimeout(() => {
      const found = MOCK_WORKERS[demoToggle];
      setWorker(found);
      setScanStatus("found");
      stopCamera();
      setTimeout(() => setPhase("access_check"), 600);
    }, 2000);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
  };

  const handleAccessContinue = () => setPhase("selfie_check");

  const handleSelfieDone = (ppeResult) => {
    if (onScan) onScan({ ...worker, ppeResult });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {phase === "scanning" && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Scan Worker QR ID</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>

          <div className="relative bg-gray-900" style={{ aspectRatio: "1" }}>
            {!cameraError && <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative w-52 h-52">
                {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-7 h-7 border-blue-400 ${cls}`} />
                ))}
                {scanStatus === "scanning" && (
                  <div className="absolute left-0 right-0 h-0.5 bg-blue-400/90"
                    style={{ animation: "scanLine 1.5s ease-in-out infinite" }} />
                )}
                {cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Camera className="w-10 h-10 text-gray-400" />
                    <p className="text-xs text-gray-400 text-center px-4">Camera unavailable — simulating scan</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-5 py-4 text-center">
            <p className="text-sm text-gray-500 animate-pulse">
              {scanStatus === "scanning" ? "Point camera at worker's QR badge..." : "QR detected — loading profile..."}
            </p>
          </div>
        </div>
      )}

      {phase === "access_check" && worker && (
        <AccessCheckPanel worker={worker} onContinue={handleAccessContinue} onClose={onClose} />
      )}

      {phase === "selfie_check" && worker && (
        <SelfieCheckModal worker={worker} onDone={handleSelfieDone} onClose={onClose} />
      )}

      <style>{`
        @keyframes scanLine {
          0% { top: 0; } 50% { top: calc(100% - 2px); } 100% { top: 0; }
        }
      `}</style>
    </div>
  );
}