import React from 'react';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function SaasPlansGrid({ planos = [], activePlanName = 'Enterprise', onUpgrade }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Planos SaaS Comerciais (Billing & Subscrições)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Faturamento Recorrente</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {planos.map((p) => {
          const isCurrent = activePlanName === p.nome;

          return (
            <div
              key={p.id}
              className={`p-4 rounded-xl border space-y-3 flex flex-col justify-between transition-all ${
                isCurrent ? 'bg-purple-50/80 border-purple-400 ring-2 ring-purple-500/20' : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-extrabold text-slate-900 text-sm">
                  <span>{p.nome}</span>
                  {p.recomendado && (
                    <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[9px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Mais Popular
                    </span>
                  )}
                </div>

                <div className="text-xl font-black text-slate-900 font-mono">
                  R$ {p.precoMensal.toFixed(2)} <span className="text-xs font-normal text-slate-500">/mês</span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  {p.recursos.map((rec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-700 font-medium">
                      <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60">
                <button
                  onClick={() => onUpgrade && onUpgrade(p.id)}
                  disabled={isCurrent}
                  className={`w-full py-2 rounded-lg font-bold text-[10px] shadow-xs transition-all ${
                    isCurrent ? 'bg-purple-900 text-white cursor-default' : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isCurrent ? 'Plano Atual ✓' : 'Fazer Upgrade'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
