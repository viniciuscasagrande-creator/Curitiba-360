import React from 'react';
import { FileText, Send } from 'lucide-react';

export default function RfqRequestWorkflow({ solicitacoes = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-purple-600" /> Solicitações de Orçamento (RFQ B2B Workflow)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Cotações Abertas</span>
      </div>

      <div className="space-y-2">
        {solicitacoes.map((rfq) => (
          <div key={rfq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{rfq.servico} ({rfq.id})</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                {rfq.status}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Orçamento estimado: <b className="text-slate-800">R$ {rfq.orcamentoMax.toFixed(2)}</b></div>
            <div className="text-[9px] text-slate-400 font-mono">Propostas recebidas: {rfq.propostasRecebidas} fornecedores</div>
          </div>
        ))}
      </div>
    </div>
  );
}
