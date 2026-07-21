import React from 'react';
import { Zap, Power } from 'lucide-react';

export default function AutomationRuleEnginePanel({ regras = [], onToggleRule }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-purple-600" /> Motor de Regras & Automações Inteligentes (IF / THEN)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{regras.length} regras ativas</span>
      </div>

      <div className="space-y-2">
        {regras.map((r) => (
          <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="text-purple-900 font-bold">{r.gatilho}</span>
              <button
                onClick={() => onToggleRule && onToggleRule(r.id)}
                className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  r.status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {r.status}
              </button>
            </div>

            <div className="text-[10px] text-slate-600 font-mono font-medium">{r.acao}</div>
            <div className="text-[9px] text-slate-400 font-mono">Disparos executados automaticamente: {r.disparosExecutados}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
