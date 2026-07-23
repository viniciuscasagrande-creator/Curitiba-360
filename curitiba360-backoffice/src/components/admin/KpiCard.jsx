import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function KpiCard({ title, value, subtext, change, type = 'neutral', icon: Icon }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm transition hover:border-slate-300 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Icon size={16} />
          </span>
        )}
      </div>

      <div className="mt-3">
        <p className="text-xl font-black text-slate-950 truncate tracking-tight">{value}</p>
        <div className="mt-1 flex items-center justify-between gap-1">
          {subtext && (
            <p className="text-[10px] text-slate-500 font-medium truncate">{subtext}</p>
          )}
          {change && (
            <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold rounded-md px-1.5 py-0.5 ${
              type === 'positive' ? 'bg-emerald-50 text-emerald-700' :
              type === 'negative' ? 'bg-rose-50 text-rose-700' :
              type === 'warning' ? 'bg-amber-50 text-amber-700' :
              'bg-slate-100 text-slate-600'
            }`}>
              {type === 'positive' && <TrendingUp size={11} />}
              {type === 'negative' && <TrendingDown size={11} />}
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default KpiCard;
