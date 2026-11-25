import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Download,
  FileSpreadsheet,
  FileText,
  QrCode,
  CreditCard,
  Building2,
  ArrowRightLeft,
  PieChart,
  Calendar
} from 'lucide-react';

const mockFinancialSummary = {
  totalRevenue: 'R$ 1.284.950,00',
  netRevenue: 'R$ 1.156.455,00',
  payoutsDone: 'R$ 980.000,00',
  pendingPayouts: 'R$ 176.455,00',
  pixVolume: 'R$ 642.475,00',
  cardVolume: 'R$ 513.980,00',
  boletoVolume: 'R$ 128.495,00'
};

const mockLedgerItems = [
  {
    id: 'TRX-9901',
    date: '23/07/2026 13:05',
    partner: 'Jardim Botânico Curitiba',
    description: 'Ingressos Exposição Flora 360 (120 un)',
    method: 'PIX Instantâneo',
    amount: 'R$ 1.800,00',
    fee: 'R$ 99,00',
    net: 'R$ 1.701,00',
    status: 'Conciliado'
  },
  {
    id: 'TRX-9902',
    date: '23/07/2026 12:48',
    partner: 'Ópera de Arame S.A.',
    description: 'Venda de Ingressos Festival de Inverno',
    method: 'Cartão de Crédito (3x)',
    amount: 'R$ 4.500,00',
    fee: 'R$ 360,00',
    net: 'R$ 4.140,00',
    status: 'Conciliado'
  },
  {
    id: 'TRX-9903',
    date: '23/07/2026 11:20',
    partner: 'Museu Oscar Niemeyer',
    description: 'Lote de Entradas Exposição Niemeyer',
    method: 'PIX Instantâneo',
    amount: 'R$ 2.100,00',
    fee: 'R$ 84,00',
    net: 'R$ 2.016,00',
    status: 'Conciliado'
  }
];

export function FinancialReportsPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Ledger & Conciliação Bancária
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Relatórios Financeiros
          </h1>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Exportando planilha Excel (.xlsx)')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition"
          >
            <FileSpreadsheet size={16} />
            Exportar Excel
          </button>

          <button
            type="button"
            onClick={() => alert('Exportando relatório DRE em PDF')}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            <FileText size={16} />
            Exportar PDF (DRE)
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Receita Bruta Total</span>
          <p className="mt-2 text-2xl font-black text-slate-950">{mockFinancialSummary.totalRevenue}</p>
          <span className="mt-1 block text-xs font-bold text-emerald-600">+22.5% em relação ao mês anterior</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Receita Líquida (Margem 360)</span>
          <p className="mt-2 text-2xl font-black text-emerald-700">{mockFinancialSummary.netRevenue}</p>
          <span className="mt-1 block text-xs font-medium text-slate-500">Após deduções e gateways</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Repasses Realizados</span>
          <p className="mt-2 text-2xl font-black text-indigo-700">{mockFinancialSummary.payoutsDone}</p>
          <span className="mt-1 block text-xs font-medium text-slate-500">Enviados aos parceiros</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase text-slate-400">Repasses Pendentes</span>
          <p className="mt-2 text-2xl font-black text-amber-700">{mockFinancialSummary.pendingPayouts}</p>
          <span className="mt-1 block text-xs font-bold text-amber-600">Agendados para D+1/D+2</span>
        </div>
      </div>

      {/* Payment Method Distribution */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <QrCode size={24} />
          </span>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Volume PIX (50%)</span>
            <p className="text-lg font-black text-slate-900">{mockFinancialSummary.pixVolume}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <CreditCard size={24} />
          </span>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Volume Cartão (40%)</span>
            <p className="text-lg font-black text-slate-900">{mockFinancialSummary.cardVolume}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <DollarSign size={24} />
          </span>
          <div>
            <span className="block text-xs font-bold uppercase text-slate-400">Volume Boleto (10%)</span>
            <p className="text-lg font-black text-slate-900">{mockFinancialSummary.boletoVolume}</p>
          </div>
        </div>
      </div>

      {/* Extrato Detalhado */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4">
          <h3 className="font-black text-slate-900">Extrato & Razão Financeiro</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3.5">ID Transação</th>
                <th className="px-6 py-3.5">Data / Hora</th>
                <th className="px-6 py-3.5">Parque / Atração</th>
                <th className="px-6 py-3.5">Método</th>
                <th className="px-6 py-3.5">Valor Bruto</th>
                <th className="px-6 py-3.5">Taxa 360</th>
                <th className="px-6 py-3.5">Valor Líquido</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLedgerItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{item.partner}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{item.method}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{item.amount}</td>
                  <td className="px-6 py-4 font-bold text-rose-600">{item.fee}</td>
                  <td className="px-6 py-4 font-black text-emerald-700">{item.net}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
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
