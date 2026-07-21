import React from 'react';
import { Share2, Globe, Building2, Users, Store } from 'lucide-react';

export default function SalesChannelPanel({ canais = [], onUpdateQuota }) {
  const getChannelIcon = (tipo) => {
    switch (tipo) {
      case 'online': return <Globe className="w-4 h-4 text-blue-600" />;
      case 'agencias': return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'agentes': return <Users className="w-4 h-4 text-amber-600" />;
      default: return <Store className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-600" /> Distribuição de Cotas por Canais de Venda
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Alocação de estoque entre Web Online, Agências, Agentes e Bilheteria.</p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
          4 Canais Ativos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {canais.map((cnl) => (
          <div key={cnl.canalId} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getChannelIcon(cnl.tipo)}
                <span className="font-extrabold text-slate-900 text-xs">{cnl.nome}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                {cnl.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 font-bold">
              <span className="text-slate-500">Vendas Realizadas:</span>
              <span className="text-purple-700 text-sm">{cnl.qtdVendida} / {cnl.cotaAlocada} ingressos</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold text-slate-500">Ajustar Cota:</label>
              <input
                type="number"
                defaultValue={cnl.cotaAlocada}
                onBlur={(e) => onUpdateQuota && onUpdateQuota(cnl.canalId, e.target.value)}
                className="w-24 p-1.5 bg-white border border-slate-200 rounded font-bold font-mono text-center"
              />
              <span className="text-[10px] text-slate-400 font-mono">unidades</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
