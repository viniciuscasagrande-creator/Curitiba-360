import React from 'react';
import { Send, BarChart2, CheckCircle2, Mail, MessageSquare } from 'lucide-react';

export default function OmnichannelCampaignGrid({ campaigns = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Send className="w-4 h-4 text-purple-600" /> Disparos de Campanhas Omnichannel
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Métricas de campanhas em massa no WhatsApp e E-mail.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {campaigns.length} campanhas ativas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((cmp) => (
          <div key={cmp.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-xs">{cmp.nome}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                {cmp.canal}
              </span>
            </div>

            <p className="text-[10px] text-slate-500 font-medium">Público: <b>{cmp.publicoAlvo}</b></p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-center font-bold">
              <div className="p-2 bg-white rounded border border-slate-100">
                <span className="text-[9px] text-slate-400 block">Enviadas</span>
                <span className="text-slate-900 text-xs">{cmp.mensagensEnviadas}</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-100">
                <span className="text-[9px] text-slate-400 block">Abertura</span>
                <span className="text-purple-700 text-xs">{cmp.taxaAbertura}</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-100">
                <span className="text-[9px] text-slate-400 block">Vendas</span>
                <span className="text-emerald-700 text-xs">{cmp.conversoesVendas}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
