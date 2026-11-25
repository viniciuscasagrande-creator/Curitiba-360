import React from 'react';
import { Target, DollarSign, Calendar, MessageSquare, ArrowRight, Zap, CheckCircle2, XCircle } from 'lucide-react';

export default function OpportunityKanban({ opportunities = [], onMoveStage, onSendFollowup }) {
  const stages = [
    { key: 'lead', title: 'Novos Leads 🎯', bg: 'bg-blue-50/70', border: 'border-blue-200' },
    { key: 'contato', title: 'Primeiro Contato 📞', bg: 'bg-purple-50/70', border: 'border-purple-200' },
    { key: 'proposta', title: 'Proposta Enviada 📄', bg: 'bg-indigo-50/70', border: 'border-indigo-200' },
    { key: 'negociacao', title: 'Em Negociação 💬', bg: 'bg-amber-50/70', border: 'border-amber-200' },
    { key: 'fechado_ganho', title: 'Fechado / Ganho 🎉', bg: 'bg-emerald-50/70', border: 'border-emerald-200' }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" /> Pipeline de Vendas & Etapas Personalizadas
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Gestão em tempo real de grupos, agendamentos e propostas comerciais.</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold rounded-full text-[11px]">
          {opportunities.length} Oportunidades no Funil
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((stg) => {
          const colOpps = opportunities.filter((o) => (o.etapa || 'lead') === stg.key);
          const valTotal = colOpps.reduce((acc, o) => acc + (o.valorEstimado || 0), 0);

          return (
            <div key={stg.key} className={`p-3 rounded-xl border ${stg.bg} ${stg.border} space-y-2`}>
              <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between border-b border-slate-200/50 pb-2">
                <span>{stg.title}</span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-extrabold shadow-2xs text-[10px]">
                  {colOpps.length}
                </span>
              </div>

              <div className="text-[10px] font-extrabold text-slate-600 text-right">
                R$ {valTotal.toLocaleString('pt-BR')}
              </div>

              <div className="space-y-2">
                {colOpps.map((opp) => (
                  <div key={opp.id} className="p-3 bg-white rounded-lg shadow-2xs border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 leading-tight">{opp.clienteNome}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{opp.eventoInteresse}</div>

                    <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-700 pt-1 border-t border-slate-100">
                      <span>R$ {opp.valorEstimado?.toLocaleString('pt-BR')}</span>
                      <span className="text-[10px] text-purple-600 font-bold">{opp.probabilidade}% prob.</span>
                    </div>

                    {opp.dataPrevisaoFechamento && (
                      <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Prev: {opp.dataPrevisaoFechamento}
                      </div>
                    )}

                    {stg.key !== 'fechado_ganho' && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => onSendFollowup && onSendFollowup(opp)}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded font-bold text-[10px] flex items-center gap-1"
                          title="Enviar Follow-up WhatsApp"
                        >
                          <Zap className="w-3 h-3" /> WhatsApp
                        </button>
                        <button
                          onClick={() => onMoveStage && onMoveStage(opp.id, stg.key === 'lead' ? 'contato' : stg.key === 'contato' ? 'proposta' : stg.key === 'proposta' ? 'negociacao' : 'fechado_ganho')}
                          className="text-[10px] text-purple-600 font-bold hover:underline"
                        >
                          Avançar →
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
