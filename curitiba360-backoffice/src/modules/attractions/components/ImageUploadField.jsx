import React from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

export function ImageUploadField({ label, helper, value, onChange, dimensions = '1080 × 1080' }) {
  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      onChange(fakeUrl);
    }
  }

  return (
    <div className="block text-left">
      <span className="block text-xs font-bold text-slate-700 mb-1">{label}</span>
      {helper && <span className="block text-[11px] text-slate-400 font-medium mb-2">{helper}</span>}

      {value ? (
        <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 h-32 w-full flex items-center justify-center">
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950/60 text-white hover:bg-rose-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition">
          <ImageIcon size={24} className="text-slate-400 mb-2" />
          <span className="text-xs font-bold text-emerald-700">Clique para enviar imagem</span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5">Dimensão recomendada: {dimensions}</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  );
}

export default ImageUploadField;
