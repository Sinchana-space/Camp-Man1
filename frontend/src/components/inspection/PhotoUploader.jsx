const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef, useState } from "react";
import { Camera, X, ImagePlus } from "lucide-react";

export default function PhotoUploader({ photos, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of Array.from(files)) {
      const { file_url } = await db.integrations.Core.UploadFile({ file });
      uploaded.push({ url: file_url, name: file.name });
    }
    onChange([...photos, ...uploaded]);
    setUploading(false);
  };

  const remove = (idx) => onChange(photos.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {photos.map((p, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
            <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add photo tile */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ImagePlus className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-400">Add photo</span>
            </>
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl py-3 text-sm font-medium transition-colors disabled:opacity-50"
      >
        <Camera className="w-4 h-4" />
        {uploading ? "Uploading…" : "Take / Upload Photo"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}