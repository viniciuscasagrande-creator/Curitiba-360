import React from 'react';
import { Target, TrendingUp, Clock, MessageSquare, Sparkles } from 'lucide-react';

export default function LeadScoringCard({ scoredLeads = [], onGenerateCopy }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> Scoring Preditivo de Leads (IA)
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Oportunidades com maior probabilidade estimada de conversão.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {scoredLeads.length} leads priorizados
        </span>
      </div>

      <div className="space-y-3">
        {scoredLeads.map((lead) => (
          <div key={lead.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-xs">{lead.clienteNome}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                🎯 {lead.probabilidadeConversao}% Probabilidade ({lead.scoreNivel})
              </span>
            </div>

            <p className="text-[11px] text-slate-600 font-medium leading-normal">{lead.motivoScore}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="text-[10px] text-slate-500 font-semibold space-x-3">
                <span>💰 Valor: <b className="text-emerald-700">R$ {lead.valorPotencial?.toLocaleString('pt-BR')}</b></span>
                <span>🕒 Melhor horário: <b>{lead.melhorHorarioContato}</b></span>
              </div>

              <button
                onClick={() => onGenerateCopy && onGenerateCopy(lead)}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all shadow-xs flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" /> Gerar Copy WhatsApp (IA)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
