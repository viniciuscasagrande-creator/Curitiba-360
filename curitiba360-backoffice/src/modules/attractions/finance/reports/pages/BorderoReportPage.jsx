import React from 'react';
import {
  Banknote,
  Building,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Percent,
  Printer,
  ReceiptText,
  ShieldCheck,
  TrendingDown,
  Wallet,
  XCircle,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import {
  borderoMock,
  transferHistoryMock,
} from '../data/financeReportsMock';
import {
  exportCsv,
  formatCurrency,
  formatDate,
} from '../utils/reportUtils';

export default function BorderoReportPage() {
  function handlePrint() {
    const currentPath = window.location.pathname.replace(/\/$/, '');
    window.open(`${currentPath}/impressao`, '_blank', 'noopener,noreferrer');
  }

  function handleExportXlsx() {
    exportCsv('bordero-financeiro.csv', [
      ['BORDERÔ FINANCEIRO OFICIAL'],
      ['Atração', 'Parque Jaime Lerner'],
      ['Status', borderoMock.status],
      [''],
      ['RESUMO FINANCEIRO', 'VALOR'],
      ['Receita Bruta', borderoMock.grossRevenue],
      ['(-) Taxa Plataforma', borderoMock.platformFee],
      ['(-) Taxa Gateway', borderoMock.gatewayFee],
      ['(-) Antecipação', borderoMock.anticipationFee],
      ['(-) Comissões', borderoMock.commissions],
      ['(-) Impostos', borderoMock.taxes],
      ['(-) Descontos', borderoMock.discounts],
      ['(-) Estornos', borderoMock.refunds],
      ['(-) Cortesias', borderoMock.courtesy],
      ['Receita Líquida', borderoMock.netRevenue],
      ['Valor de Repasse', borderoMock.transferValue],
      [''],
      ['HISTÓRICO DE REPASSES'],
      ['Data', 'Banco', 'Valor', 'Status'],
      ...transferHistoryMock.map((t) => [
        t.date,
        t.bank,
        t.value,
        t.status,
      ]),
    ]);
  }

  const deductions = [
    { label: 'Receita Bruta', value: borderoMock.grossRevenue, isTotal: true },
    { label: '(-) Taxa Plataforma', value: borderoMock.platformFee, isDeduction: true },
    { label: '(-) Taxa Gateway', value: borderoMock.gatewayFee, isDeduction: true },
    { label: '(-) Antecipação', value: borderoMock.anticipationFee, isDeduction: true },
    { label: '(-) Comissões', value: borderoMock.commissions, isDeduction: true },
    { label: '(-) Impostos', value: borderoMock.taxes, isDeduction: true },
    { label: '(-) Descontos', value: borderoMock.discounts, isDeduction: true },
    { label: '(-) Estornos', value: borderoMock.refunds, isDeduction: true },
    { label: '(-) Cortesias', value: borderoMock.courtesy, isDeduction: true },
    { label: 'Receita Líquida', value: borderoMock.netRevenue, isTotal: true, isHighlight: true },
    { label: 'Valor de Repasse', value: borderoMock.transferValue, isTotal: true, isRepasse: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8 space-y-6">
        <ReportHeader
          title="Borderô Financeiro"
          description="Documento oficial consolidado de conciliação financeira, receitas, encargos e repasse da atração."
          onPrint={handlePrint}
          onExportXlsx={handleExportXlsx}
          onExportPdf={handlePrint}
        />

        {/* Status Badge Top Bar */}
        <section className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-black">
              ✓
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                Situação do Fechamento
              </span>
              <h2 className="text-lg font-black text-emerald-950">
                {borderoMock.status}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Valor Total do Repasse
            </span>
            <strong className="text-xl font-black text-emerald-700">
              {formatCurrency(borderoMock.transferValue)}
            </strong>
          </div>
        </section>

        {/* Cards Superiores */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <SummaryCard
            icon={ReceiptText}
            label="Receita Bruta"
            value={formatCurrency(borderoMock.grossRevenue)}
            tone="blue"
          />
          <SummaryCard
            icon={Percent}
            label="Taxa Plataforma"
            value={`- ${formatCurrency(borderoMock.platformFee)}`}
            tone="amber"
          />
          <SummaryCard
            icon={CreditCard}
            label="Gateway"
            value={`- ${formatCurrency(borderoMock.gatewayFee)}`}
            tone="amber"
          />
          <SummaryCard
            icon={TrendingDown}
            label="Antecipação"
            value={`- ${formatCurrency(borderoMock.anticipationFee)}`}
            tone="amber"
          />
          <SummaryCard
            icon={Wallet}
            label="Comissões"
            value={`- ${formatCurrency(borderoMock.commissions)}`}
            tone="amber"
          />
          <SummaryCard
            icon={DollarSign}
            label="Impostos"
            value={`- ${formatCurrency(borderoMock.taxes)}`}
            tone="amber"
          />
          <SummaryCard
            icon={Banknote}
            label="Receita Líquida"
            value={formatCurrency(borderoMock.netRevenue)}
            tone="emerald"
          />
          <SummaryCard
            icon={Building}
            label="Repasse Final"
            value={formatCurrency(borderoMock.transferValue)}
            tone="emerald"
            highlight
          />
        </section>

        {/* Resumo Financeiro & Histórico de Repasses */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tabela de Resumo Financeiro */}
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Resumo Financeiro Consolidado
            </h2>

            <div className="space-y-2">
              {deductions.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl transition ${
                    item.isRepasse
                      ? 'bg-emerald-600 text-white font-black'
                      : item.isHighlight
                      ? 'bg-emerald-50 text-emerald-950 font-black border border-emerald-200'
                      : item.isTotal
                      ? 'bg-slate-100 text-slate-900 font-black'
                      : 'bg-slate-50/70 text-slate-700 hover:bg-slate-100/70'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <strong className={`text-xs ${item.isDeduction ? 'text-rose-600 font-semibold' : ''}`}>
                    {item.isDeduction ? `- ${formatCurrency(item.value)}` : formatCurrency(item.value)}
                  </strong>
                </div>
              ))}
            </div>
          </section>

          {/* Histórico de Repasses */}
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black text-slate-900">
                Histórico de Repasses Bancários
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Total: {transferHistoryMock.length} lançamentos
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                  <tr>
                    <th className="p-3">Data</th>
                    <th className="p-3">Banco</th>
                    <th className="p-3 text-right">Valor</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transferHistoryMock.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-600">
                        {formatDate(t.date)}
                      </td>
                      <td className="p-3 font-bold text-slate-800">{t.bank}</td>
                      <td className="p-3 text-right font-black text-slate-900">
                        {formatCurrency(t.value)}
                      </td>
                      <td className="p-3 text-center">
                        <StatusBadge status={t.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-600">
              <span className="font-black text-slate-800">Observação:</span> Os repasses são processados via PIX/TED diretamente na conta bancária homologada da atração.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Pago: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Pendente: 'bg-amber-100 text-amber-800 border-amber-200',
    Cancelado: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-black ${
        colors[status] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {status}
    </span>
  );
}

const TONE_CLASSES = {
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
};

function SummaryCard({ icon: Icon, label, value, tone, highlight }) {
  return (
    <article
      className={`rounded-[22px] border p-5 shadow-sm transition ${
        highlight
          ? 'border-emerald-500 bg-emerald-600 text-white'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`text-xs font-bold ${
              highlight ? 'text-emerald-100' : 'text-slate-500'
            }`}
          >
            {label}
          </span>
          <strong
            className={`mt-2 block text-xl font-black tracking-tight ${
              highlight ? 'text-white' : 'text-slate-950'
            }`}
          >
            {value}
          </strong>
        </div>

        <span
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
            highlight ? 'bg-emerald-500 text-white' : TONE_CLASSES[tone]
          }`}
        >
          <Icon size={18} />
        </span>
      </div>
    </article>
  );
}
