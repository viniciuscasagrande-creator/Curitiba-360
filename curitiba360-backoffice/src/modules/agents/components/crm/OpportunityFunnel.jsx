import React from 'react';
import { Target, DollarSign, Percent, Calendar } from 'lucide-react';

export default function OpportunityFunnel({ opportunities = [], onMoveOpportunity }) {
  const stages = [
    { key: 'lead', title: 'Novos Leads 🎯', bg: 'bg-blue-50/70', border: 'border-blue-200' },
    { key: 'contato', title: 'Em Contato 📞', bg: 'bg-purple-50/70', border: 'border-purple-200' },
    { key: 'negociacao', title: 'Em Negociação 💬', bg: 'bg-amber-50/70', border: 'border-amber-200' },
    { key: 'fechado_ganho', title: 'Fechado / Ganho 🎉', bg: 'bg-emerald-50/70', border: 'border-emerald-200' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" /> Funil Comercial de Oportunidades
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Gestão de propostas corporativas e grupos em negociação.</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold rounded-full text-[11px]">
          Total Estimado: R$ {opportunities.reduce((acc, o) => acc + (o.valorEstimado || 0), 0).toLocaleString('pt-BR')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stg) => {
          const colOpps = opportunities.filter((o) => o.etapa === stg.key);

          return (
            <div key={stg.key} className={`p-3 rounded-xl border ${stg.bg} ${stg.border} space-y-2`}>
              <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                <span>{stg.title}</span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-extrabold shadow-2xs text-[10px]">
                  {colOpps.length}
                </span>
              </div>

              <div className="space-y-2">
                {colOpps.map((opp) => (
                  <div key={opp.id} className="p-3 bg-white rounded-lg shadow-2xs border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 leading-tight">{opp.clienteNome}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{opp.eventoInteresse}</div>

                    <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-700">
                      <span>R$ {opp.valorEstimado?.toLocaleString('pt-BR')}</span>
                      <span className="text-[10px] text-purple-600 font-bold">{opp.probabilidade}% prob.</span>
                    </div>

                    {stg.key !== 'fechado_ganho' && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                        <button
                          onClick={() => onMoveOpportunity && onMoveOpportunity(opp.id, stg.key === 'lead' ? 'contato' : stg.key === 'contato' ? 'negociacao' : 'fechado_ganho')}
                          className="text-[10px] text-purple-600 font-bold hover:underline"
                        >
                          Avançar Etapa →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
