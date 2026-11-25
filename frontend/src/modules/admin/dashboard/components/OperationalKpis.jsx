import React from 'react';
import {
  Trees,
  Ticket,
  Gift,
  DollarSign,
  ArrowUpRight,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const iconMap = {
  'kpi-1': Trees,
  'kpi-2': Ticket,
  'kpi-3': Gift,
  'kpi-4': DollarSign,
  'kpi-5': ArrowUpRight,
  'kpi-6': AlertCircle
};

export function OperationalKpis({ kpis }) {
  return (
    <div className="grid grid-cols-2 gap-4.5 sm:grid-cols-3 lg:grid-cols-6">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.id] || TrendingUp;
        return (
          <div
            key={kpi.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {kpi.label}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Icon size={15} />
              </span>
            </div>

            <div className="mt-3">
              <p className="text-lg font-black text-slate-950 truncate">{kpi.value}</p>
              <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{kpi.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OperationalKpis;
