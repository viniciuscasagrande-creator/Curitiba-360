import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';
import { ArrowLeft, MapPin, Compass, Star, Calendar } from 'lucide-react';

export function TourismMapPage() {
  const navigate = useNavigate();
  const { attractions, loading } = useAttractions();
  const [selectedAttr, setSelectedAttr] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/turismo')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para Lista de Atrativos
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Mapa Interativo</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Mapa de Atrativos Turísticos de Curitiba</h1>
        </div>
      </div>

      {/* Grid com Mapa e Lista */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        {/* Container Simulado do Mapa */}
        <div className="lg:col-span-2 relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40" />

          {/* Marcadores dos Atrativos no Mapa */}
          <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-around p-8">
            {attractions.map((attr, idx) => (
              <button
                key={attr.id}
                onClick={() => setSelectedAttr(attr)}
                className={`p-3 rounded-2xl border flex items-center gap-2 transition-all cursor-pointer shadow-xl ${
                  selectedAttr?.id === attr.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold scale-110 shadow-amber-500/20'
                    : 'bg-slate-950/90 border-slate-700 text-amber-400 hover:border-amber-400 hover:scale-105'
                }`}
              >
                <MapPin size={18} className={selectedAttr?.id === attr.id ? 'text-slate-950' : 'text-amber-400'} />
                <span className="text-xs font-bold">{attr.name}</span>
              </button>
            ))}
          </div>

          {selectedAttr && (
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 border border-amber-500/40 p-4 rounded-2xl shadow-2xl flex items-center justify-between z-20 backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400">{selectedAttr.categoryName}</span>
                <h4 className="text-base font-bold text-white">{selectedAttr.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-1">{selectedAttr.shortDescription}</p>
              </div>

              <button
                onClick={() => navigate(`/turismo/${selectedAttr.id}`)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shrink-0 ml-4"
              >
                Ver Atrativo
              </button>
            </div>
          )}
        </div>

        {/* Lista Lateral */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 overflow-y-auto space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">
            Pontos de Interesse ({attractions.length})
          </h3>

          {attractions.map((attr) => (
            <div
              key={attr.id}
              onClick={() => setSelectedAttr(attr)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedAttr?.id === attr.id
                  ? 'bg-slate-950 border-amber-500/80 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{attr.name}</h4>
                <span className="text-[10px] text-amber-400 font-semibold">{attr.rating ? attr.rating.toFixed(1) : '4.9'} ★</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{attr.address?.neighborhood}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TourismMapPage;
