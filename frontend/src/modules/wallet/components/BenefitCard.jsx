import React from 'react';
import { Gift, Building2, Calendar, Sparkles } from 'lucide-react';

export function BenefitCard({ benefit, onUse }) {
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {benefit.category || 'Benefício'}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Building2 size={12} className="text-slate-500" />
            {benefit.company}
          </span>
        </div>

        <div>
          <h4 className="text-base font-bold text-white">{benefit.name}</h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{benefit.description}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-slate-500 flex items-center gap-1">
          <Calendar size={12} />
          Válido até {benefit.expiresAt}
        </span>

        <button
          onClick={() => onUse && onUse(benefit)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
        >
          <Sparkles size={14} />
          Utilizar Benefício
        </button>
      </div>
    </div>
  );
}
export default BenefitCard;
