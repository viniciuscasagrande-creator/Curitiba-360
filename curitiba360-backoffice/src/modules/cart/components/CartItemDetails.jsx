import React from "react";

export default function CartItemDetails({ ticketType, lotName, sector }) {
  return (
    <div className="text-xs text-slate-500 space-y-1 select-none text-left">
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[10px]">
          Tipo:
        </span>
        <span className="text-slate-700 font-medium">{ticketType}</span>
      </div>
      {lotName && (
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[10px]">
            Lote:
          </span>
          <span className="text-slate-700 font-medium">{lotName}</span>
        </div>
      )}
      {sector && (
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[10px]">
            Setor:
          </span>
          <span className="text-slate-700 font-medium">{sector}</span>
        </div>
      )}
    </div>
  );
}
