import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, ShieldCheck } from 'lucide-react';

export default function EventFinancialKpiGrid({ kpis = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Receita Operacional Bruta */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Receita Bruta Total</span>
          <DollarSign className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          R$ {(kpis.receitaTotalBruta || 136125).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Ingressos + Taxa de Conveniência</p>
      </div>

      {/* 2. Custos Operacionais */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Custos Operacionais</span>
          <TrendingDown className="w-4 h-4 text-red-500" />
        </div>
        <div className="text-2xl font-extrabold text-red-700">
          R$ {(kpis.custosOperacionaisTotal || 81500).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-red-600 font-medium">Locação, Catering e Produção</p>
      </div>

      {/* 3. Repasses & Comissões */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Repasses & Comissões</span>
          <PieChart className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          R$ {(kpis.repassesComissoesTotal || 11137.5).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Agências e Agentes parceiros</p>
      </div>

      {/* 4. Lucro Líquido & Margem */}
      <div className="p-4 bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-xl shadow-lg border border-purple-800 space-y-1">
        <div className="flex items-center justify-between text-purple-300 font-semibold">
          <span>Lucro Líquido do Evento</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-400">
          R$ {(kpis.lucroLiquidoEvento || 35320).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-300 font-medium">Margem Líquida: {kpis.margemLiquidaPct || 25.9}%</p>
      </div>
    </div>
  );
}
