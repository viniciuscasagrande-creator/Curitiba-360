import React from 'react';

export default function SeatLegend() {
  const legendItems = [
    { label: 'Disponível', color: 'bg-emerald-500 border-emerald-600' },
    { label: 'Reservado (Cortesia)', color: 'bg-amber-500 border-amber-600' },
    { label: 'Vendido', color: 'bg-purple-600 border-purple-700' },
    { label: 'Bloqueado Técnico', color: 'bg-red-500 border-red-600' },
    { label: 'Área PCD ♿', color: 'bg-teal-500 border-teal-600' }
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap text-[11px] font-bold text-slate-700">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <div className={`w-3.5 h-3.5 rounded-full border ${item.color}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
