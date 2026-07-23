import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

export function EventGallery({ images = [] }) {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <ImageIcon size={20} className="text-amber-400" />
        Galeria de Fotos do Evento
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(img)}
            className="group relative h-32 rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-amber-500/50 transition-all"
          >
            <img
              src={img}
              alt={`Foto ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImg}
            alt="Ampliada"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-slate-700"
          />
        </div>
      )}
    </div>
  );
}
export default EventGallery;
