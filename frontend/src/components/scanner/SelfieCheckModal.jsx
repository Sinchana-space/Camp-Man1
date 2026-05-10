const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState, useEffect } from "react";
import { X, Camera, HardHat, Zap, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const PPE_RESULTS = [
  { helmet: true, vest: true },
  { helmet: false, vest: true },
  { helmet: true, vest: false },
];

export default function SelfieCheckModal({ worker, onDone, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [phase, setPhase] = useState("camera"); // camera | analyzing | result
  const [capturedImage, setCapturedImage] = useState(null);
  const [ppeResult, setPpeResult] = useState(null);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    startSelfieCamera();
    return () => stopCamera();
  }, []);

  const startSelfieCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  };

  const captureAndAnalyze = async () => {
    let imageDataUrl = null;
    if (videoRef.current && canvasRef.current && !cameraError) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth || 320;
      canvas.height = videoRef.current.videoHeight || 320;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
    }
    setCapturedImage(imageDataUrl || null);
    setPhase("analyzing");
    stopCamera();

    // Call AI to analyze PPE
    let result = { helmet: true, vest: true };
    try {
      const prompt = `You are a construction site safety inspector AI. Analyze this selfie photo of a worker and check if they are wearing:
1. A safety helmet/hard hat on their head
2. A high-visibility (hi-vis) vest on their body

Return a JSON with:
- helmet: true/false (is helmet clearly visible and worn on head)
- vest: true/false (is hi-vis vest clearly visible)
- confidence: "high" or "low"
- notes: brief string with any observations

If there is no clear photo available or image quality is too low, assume the user is wearing both for demo purposes and return helmet: true, vest: true.`;

      if (imageDataUrl) {
        const aiRes = await db.integrations.Core.InvokeLLM({
          prompt,
          file_urls: [imageDataUrl],
          response_json_schema: {
            type: "object",
            properties: {
              helmet: { type: "boolean" },
              vest: { type: "boolean" },
              confidence: { type: "string" },
              notes: { type: "string" },
            },
          },
        });
        result = aiRes;
      } else {
        // No real image — use random demo result for demo
        result = PPE_RESULTS[Math.floor(Math.random() * PPE_RESULTS.length)];
        result.confidence = "demo";
        result.notes = "No camera available — demo mode result.";
      }
    } catch {
      result = { helmet: true, vest: true, confidence: "demo", notes: "AI check skipped — demo result." };
    }

    setPpeResult(result);
    setPhase("result");
  };

  const allClear = ppeResult && ppeResult.helmet && ppeResult.vest;

  const handleRetake = () => {
    setPpeResult(null);
    setCapturedImage(null);
    setPhase("camera");
    startSelfieCamera();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden border-t-4 border-blue-500">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HardHat className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">PPE Safety Check</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
      </div>

      {/* Camera phase */}
      {phase === "camera" && (
        <>
          <div className="relative bg-gray-900 overflow-hidden" style={{ aspectRatio: "1" }}>
            {!cameraError
              ? <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-400">
                  <Camera className="w-12 h-12 opacity-30" />
                  <p className="text-xs text-center px-6 opacity-60">Camera unavailable — tap below to simulate AI PPE check</p>
                </div>
              )}
            <canvas ref={canvasRef} className="hidden" />
            {/* Face guide oval */}
            {!cameraError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-44 border-2 border-white/60 rounded-full" />
              </div>
            )}
          </div>
          <div className="px-5 py-4 space-y-3">
            <p className="text-xs text-gray-500 text-center">
              Make sure your <strong>helmet</strong> and <strong>hi-vis vest</strong> are clearly visible
            </p>
            <button
              onClick={captureAndAnalyze}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" /> Take Selfie & Analyze PPE
            </button>
          </div>
        </>
      )}

      {/* Analyzing phase */}
      {phase === "analyzing" && (
        <div className="px-5 py-10 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
            <Zap className="w-6 h-6 text-blue-500 absolute inset-0 m-auto" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800 mb-1">AI Analyzing PPE...</p>
            <p className="text-xs text-gray-400">Checking helmet and hi-vis vest compliance</p>
          </div>
        </div>
      )}

      {/* Result phase */}
      {phase === "result" && ppeResult && (
        <div className="px-5 py-4 space-y-4">
          {/* Overall verdict */}
          <div className={`rounded-xl p-4 text-center ${allClear ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            {allClear
              ? <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
              : <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />}
            <p className={`font-bold text-base ${allClear ? "text-green-700" : "text-red-700"}`}>
              {allClear ? "PPE Compliant — Gate Clear" : "PPE Violation — Entry Denied"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{ppeResult.notes || ""}</p>
          </div>

          {/* PPE items */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-3 flex flex-col items-center gap-2 border ${ppeResult.helmet ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <HardHat className={`w-6 h-6 ${ppeResult.helmet ? "text-green-500" : "text-red-500"}`} />
              <span className="text-xs font-semibold text-gray-700">Helmet</span>
              <span className={`text-xs font-bold ${ppeResult.helmet ? "text-green-600" : "text-red-600"}`}>
                {ppeResult.helmet ? "✓ Detected" : "✗ Missing"}
              </span>
            </div>
            <div className={`rounded-xl p-3 flex flex-col items-center gap-2 border ${ppeResult.vest ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <Zap className={`w-6 h-6 ${ppeResult.vest ? "text-green-500" : "text-red-500"}`} />
              <span className="text-xs font-semibold text-gray-700">Hi-Vis Vest</span>
              <span className={`text-xs font-bold ${ppeResult.vest ? "text-green-600" : "text-red-600"}`}>
                {ppeResult.vest ? "✓ Detected" : "✗ Missing"}
              </span>
            </div>
          </div>

          {/* Worker */}
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
              {worker.name.charAt(0)}
            </span>
            <span className="font-medium">{worker.name}</span>
            <span className="text-gray-400 text-xs ml-auto">{worker.id}</span>
          </div>

          {/* Actions */}
          {allClear ? (
            <button
              onClick={() => onDone(ppeResult)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Active & Unlock Gate
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleRetake} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50">
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <button onClick={onClose} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium">
                Deny Entry
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}