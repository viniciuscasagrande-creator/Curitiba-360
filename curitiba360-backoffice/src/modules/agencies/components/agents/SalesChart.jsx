import React from 'react';
import { TrendingUp, DollarSign, Award, Calendar, BarChart3, AlertCircle } from 'lucide-react';

export default function SalesChart({ agent = {} }) {
  const kpis = [
    { period: 'Hoje', sales: 1200.0, commission: 60.0, tickets: 3 },
    { period: 'Ontem', sales: 2400.0, commission: 120.0, tickets: 6 },
    { period: 'Este Mês', sales: agent.vendasMesAtual || 38400.0, commission: (agent.vendasMesAtual || 38400.0) * 0.05, tickets: agent.qtdVendasMes || 48 },
    { period: 'Este Ano', sales: (agent.vendasMesAtual || 38400.0) * 6, commission: ((agent.vendasMesAtual || 38400.0) * 6) * 0.05, tickets: (agent.qtdVendasMes || 48) * 6 }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" /> Desempenho Visual & Histórico de Vendas
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Breakdown por período (Hoje, Ontem, Mês, Ano).</p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[11px]">
          Ranking Agência: #1 Top Seller
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">{kpi.period}</span>
            <div className="text-base font-extrabold text-slate-900">
              R$ {kpi.sales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>{kpi.tickets} bilhetes</span>
              <span className="font-bold text-emerald-600">+R$ {kpi.commission.toFixed(0)} comissão</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
