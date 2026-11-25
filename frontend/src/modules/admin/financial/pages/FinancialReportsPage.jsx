import React, { useState } from 'react';
import {
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  QrCode,
  CreditCard,
  Building2,
  Trees,
  TrendingUp,
  Percent,
  RefreshCcw,
  Gift,
  XCircle
} from 'lucide-react';

const mockFinancialBreakdown = {
  consolidatedRevenue: 'R$ 4.284.950,00',
  netProfit360: 'R$ 428.495,00', // 10% avg margin
  totalFeesCollected: 'R$ 235.670,00',
  payoutsAlreadyPaid: 'R$ 3.420.000,00',
  payoutsPending: 'R$ 436.455,00',
  courtesiesValue: 'R$ 102.300,00',
  cancellationVolume: 'R$ 42.100,00',
  refundsVolume: 'R$ 18.500,00'
};

const mockByAttraction = [
  {
    attraction: 'Jardim Botânico de Curitiba',
    partner: 'Jardim Botânico Eireli',
    grossRevenue: 'R$ 1.275.000,00',
    fee360: 'R$ 70.125,00',
    payout: 'R$ 1.204.875,00',
    status: 'Repassado'
  },
  {
    attraction: 'Ópera de Arame & Pedreira',
    partner: 'Ópera de Arame S.A.',
    grossRevenue: 'R$ 1.136.000,00',
    fee360: 'R$ 90.880,00',
    payout: 'R$ 1.045.120,00',
    status: 'Repassado'
  },
  {
    attraction: 'Museu Oscar Niemeyer (MON)',
    partner: 'Associação MON',
    grossRevenue: 'R$ 1.023.000,00',
    fee360: 'R$ 40.920,00',
    payout: 'R$ 982.080,00',
    status: 'Pendente D+1'
  }
];

export function FinancialReportsPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6 text-left">
      {/* Title */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Ledger, Extratos & DRE Operacional
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Relatórios Financeiros
          </h1>
        </div>

        {/* Export Options */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Exportando arquivo CSV com todas as transações')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <FileSpreadsheet size={16} />
            Exportar CSV
          </button>

          <button
            type="button"
            onClick={() => alert('Gerando relatório DRE em PDF para exportação')}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm"
          >
            <FileText size={16} />
            Exportar PDF (DRE)
          </button>
        </div>
      </div>

      {/* Top Consolidado Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Receita Bruta Consolidada</span>
          <p className="mt-2 text-2xl font-black text-slate-950">{mockFinancialBreakdown.consolidatedRevenue}</p>
          <span className="mt-1 block text-xs font-bold text-emerald-600">+22.5% vs mês anterior</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Margem Líquida Curitiba 360</span>
          <p className="mt-2 text-2xl font-black text-emerald-700">{mockFinancialBreakdown.netProfit360}</p>
          <span className="mt-1 block text-xs font-medium text-slate-500">Lucro operacional retido</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Valores Já Pagos (Repasses)</span>
          <p className="mt-2 text-2xl font-black text-indigo-700">{mockFinancialBreakdown.payoutsAlreadyPaid}</p>
          <span className="mt-1 block text-xs font-medium text-slate-500">Transferidos via PIX/TED</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Valores a Repassar (Pendente)</span>
          <p className="mt-2 text-2xl font-black text-amber-700">{mockFinancialBreakdown.payoutsPending}</p>
          <span className="mt-1 block text-xs font-bold text-amber-600">Agendados para envio</span>
        </div>
      </div>

      {/* Deductions & Operation Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Gift size={20} />
          </span>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Cortesias Emitidas</span>
            <p className="text-sm font-black text-slate-900">{mockFinancialBreakdown.courtesiesValue}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
            <XCircle size={20} />
          </span>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Cancelamentos</span>
            <p className="text-sm font-black text-rose-700">{mockFinancialBreakdown.cancellationVolume}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
            <RefreshCcw size={20} />
          </span>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-400">Reembolsos Processados</span>
            <p className="text-sm font-black text-violet-800">{mockFinancialBreakdown.refundsVolume}</p>
          </div>
        </div>
      </div>

      {/* Financial Table by Attraction */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4">
          <h3 className="font-black text-slate-900">Demonstrativo por Atração & Parceiro Comercial</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Atração</th>
                <th className="px-6 py-3.5">Parceiro Comercial</th>
                <th className="px-6 py-3.5">Receita Bruta</th>
                <th className="px-6 py-3.5">Retenção 360</th>
                <th className="px-6 py-3.5">Valor Líquido Parceiro</th>
                <th className="px-6 py-3.5">Status Repasse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockByAttraction.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.attraction}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{item.partner}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{item.grossRevenue}</td>
                  <td className="px-6 py-4 font-bold text-rose-600">{item.fee360}</td>
                  <td className="px-6 py-4 font-black text-emerald-700">{item.payout}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      item.status === 'Repassado' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinancialReportsPage;
