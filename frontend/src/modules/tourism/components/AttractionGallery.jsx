import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

export function AttractionGallery({ gallery = [], coverImage }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const images = gallery.length > 0 ? gallery : (coverImage ? [coverImage] : []);

  if (images.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
        <ImageIcon size={18} className="text-amber-400" />
        Galeria de Fotos
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImg(img)}
            className="group relative h-28 rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-amber-500/50 transition-all"
          >
            <img
              src={img}
              alt={`Foto ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-800 text-white"
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
export default AttractionGallery;
