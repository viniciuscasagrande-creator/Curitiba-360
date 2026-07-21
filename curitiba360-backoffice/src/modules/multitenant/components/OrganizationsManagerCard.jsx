import React from 'react';
import { Building2, Plus, Users, ShieldCheck } from 'lucide-react';

export default function OrganizationsManagerCard({ organizacoes = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-purple-600" /> Gestão de Organizações Multi-tenant & Filiais
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{organizacoes.length} empresas cadastradas</span>
      </div>

      <div className="space-y-2">
        {organizacoes.map((org) => (
          <div key={org.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="text-purple-900 font-bold">{org.nome}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase">
                {org.plano}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">CNPJ: {org.cnpj} • Produtoras ativas: {org.produtorasVinculadas}</div>
            <div className="text-[10px] font-mono text-purple-800 font-bold">Faturamento Mensal: R$ {org.faturamentoMensal.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
