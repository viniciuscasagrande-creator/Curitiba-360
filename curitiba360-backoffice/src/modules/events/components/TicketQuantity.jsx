import React from 'react';
import { Minus, Plus } from 'lucide-react';

export function TicketQuantity({ quantity = 0, onAdd, onRemove, disabledAdd = false }) {
  return (
    <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-1">
      <button
        type="button"
        onClick={onRemove}
        disabled={quantity === 0}
        className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-900 transition-colors"
      >
        <Minus size={14} />
      </button>

      <span className="w-8 text-center text-sm font-bold text-slate-100">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onAdd}
        disabled={disabledAdd}
        className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 transition-colors font-bold"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export default TicketQuantity;
