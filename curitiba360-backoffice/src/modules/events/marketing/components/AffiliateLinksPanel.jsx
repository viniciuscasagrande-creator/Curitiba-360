import React from 'react';
import { Share2, ExternalLink, Users } from 'lucide-react';

export default function AffiliateLinksPanel({ afiliados = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Share2 className="w-4 h-4 text-purple-600" /> Rede de Afiliados & Links Rastreáveis
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {afiliados.length} afiliados
        </span>
      </div>

      <div className="space-y-3">
        {afiliados.map((afl) => (
          <div key={afl.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-xs">{afl.nome}</span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-bold rounded text-[9px]">
                Comissão: {afl.comissaoPct}%
              </span>
            </div>

            <div className="font-mono text-[10px] text-slate-500 bg-white p-1.5 rounded border border-slate-200 truncate">
              {afl.link}
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 pt-1 border-t border-slate-200/60">
              <span>{afl.cliques} cliques • {afl.vendas} vendas</span>
              <span className="text-emerald-700">R$ {afl.receitaGerada?.toFixed(2)} gerados</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
