import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, DollarSign, Target, Users } from 'lucide-react';

export default function PerformanceAlerts({ alerts = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-purple-600 animate-pulse" /> Alertas Executivos de Performance & Ações Rápidas
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {alerts.length} ações pendentes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {alerts.map((alt) => (
          <div key={alt.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-extrabold text-slate-900 text-xs block">{alt.titulo}</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">{alt.descricao}</p>
            </div>

            <button
              onClick={() => navigate(alt.rota)}
              className="mt-2 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              <span>{alt.acao}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
