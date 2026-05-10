import React, { useRef, useEffect, useState } from "react";
import { RotateCcw, Check } from "lucide-react";

export default function SignaturePad({ onSave, onClear }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => setDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onClear?.();
  };

  const save = () => {
    if (!hasSignature) return;
    onSave?.(canvasRef.current.toDataURL("image/png"));
  };

  return (
    <div className="space-y-2">
      <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-xs text-gray-400">Sign here</p>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Clear
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!hasSignature}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          <Check className="w-3 h-3" /> Confirm Signature
        </button>
      </div>
    </div>
  );
}