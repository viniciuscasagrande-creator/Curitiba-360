import React from "react";
import { Bus, Clock, MapPin } from "lucide-react";

export default function MobilityCard({ line = {} }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 space-y-3 font-sans animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Bus size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 m-0">{line.name}</h4>
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider block">{line.type}</span>
          </div>
        </div>
        <strong className="text-xs text-slate-900 font-mono">R$ {line.price.toFixed(2)}</strong>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono bg-slate-50 p-2 rounded-xl border border-slate-100">
        <span className="flex items-center gap-1"><Clock size={12} className="text-emerald-600" /> {line.frequency}</span>
        <span className="flex items-center gap-1"><MapPin size={12} className="text-emerald-600" /> Tubos Próximos</span>
      </div>
    </div>
  );
}
