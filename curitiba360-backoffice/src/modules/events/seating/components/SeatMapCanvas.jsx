import React from 'react';
import SeatLegend from './SeatLegend';
import { Eye, Edit3, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function SeatMapCanvas({ assentos = [], onSeatClick }) {
  const getSeatColor = (status, setorId) => {
    if (setorId === 'SEC-PCD') return 'bg-teal-500 hover:bg-teal-600 text-white';

    switch (status) {
      case 'disponivel': return 'bg-emerald-500 hover:bg-emerald-600 text-white';
      case 'reservado': return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'vendido': return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'bloqueado': return 'bg-red-500 hover:bg-red-600 text-white';
      default: return 'bg-slate-300 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm">Canvas Visual de Assentos & Setores</h3>
          <p className="text-[11px] text-slate-500 font-medium">Clique sobre um assento para alterar status ou consultar reservas.</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button title="Zoom In" className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-700 hover:bg-slate-200">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button title="Zoom Out" className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-700 hover:bg-slate-200">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <SeatLegend />

      {/* PALCO / VAGÃO HEADER */}
      <div className="w-full bg-slate-900 text-white py-2.5 text-center font-extrabold rounded-lg tracking-widest text-[11px] shadow-sm">
        PALCO PRINCIPAL / FRENTE DO VAGÃO MORRETES
      </div>

      {/* GRID DE ASSENTOS */}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/60 overflow-x-auto flex justify-center">
        <div className="grid grid-cols-10 gap-2.5 max-w-xl">
          {assentos.map((seat) => (
            <button
              key={seat.id}
              onClick={() => onSeatClick && onSeatClick(seat.id)}
              title={`Fila ${seat.fila} - Assento ${seat.numero} | Status: ${seat.status.toUpperCase()} (R$ ${seat.preco})`}
              className={`w-9 h-9 rounded-lg font-mono font-extrabold text-[11px] transition-all shadow-2xs flex flex-col items-center justify-center ${getSeatColor(seat.status, seat.setorId)}`}
            >
              <span>{seat.fila}{seat.numero}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
