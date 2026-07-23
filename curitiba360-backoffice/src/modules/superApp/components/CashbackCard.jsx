import React from "react";
import { Coins, Sparkles } from "lucide-react";

export default function CashbackCard({ amount = 0, pendingAmount = 0 }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs flex items-center justify-between font-sans animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
          <Coins size={20} />
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Meu Cashback</span>
          <strong className="text-lg font-extrabold text-slate-800 font-mono">
            R$ {amount.toFixed(2)}
          </strong>
        </div>
      </div>
      {pendingAmount > 0 && (
        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-100 flex items-center gap-1 font-mono">
          <Sparkles size={9} className="animate-pulse" /> R$ {pendingAmount.toFixed(2)} Pendente
        </span>
      )}
    </div>
  );
}
