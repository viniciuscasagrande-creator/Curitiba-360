import { useMemo, useState } from 'react';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';
import PaymentChart from '../components/PaymentChart';

import {
  agentOptions,
  categoryOptions,
  salesByPaymentReportMock,
  ticketTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  sumBy,
} from '../utils/reportUtils';

export default function SalesByPaymentReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-31',
  });

  const [allPeriod, setAllPeriod] = useState(true);
  const [category, setCategory] = useState('all');
  const [agent, setAgent] = useState('all');
  const [ticketType, setTicketType] = useState('all');

  const rows = useMemo(() => {
    return salesByPaymentReportMock;
  }, []);

  const columns = [
    {
      key: 'paymentType',
      label: 'Forma de pagamento',
    },
    {
      key: 'quantity',
      label: 'Quantidade',
    },
    {
      key: 'grossValue',
      label: 'Valor Bruto',
      render: (r) => formatCurrency(r.grossValue),
    },
    {
      key: 'fees',
      label: 'Taxas',
      render: (r) => formatCurrency(r.fees),
    },
    {
      key: 'netValue',
      label: 'Valor Líquido',
      render: (r) => formatCurrency(r.netValue),
    },
    {
      key: 'percent',
      label: 'Participação',
      render: (r) => `${r.percent}%`,
    },
  ];

  const totalQuantity = sumBy(rows, 'quantity');
  const totalGross = sumBy(rows, 'grossValue');
  const totalFees = sumBy(rows, 'fees');
  const totalNet = sumBy(rows, 'netValue');

  function handleExportXlsx() {
    exportCsv('vendas-forma-pagamento.csv', [
      ['Forma', 'Quantidade', 'Bruto', 'Taxas', 'Líquido', '%'],
      ...rows.map((r) => [
        r.paymentType,
        r.quantity,
        r.grossValue,
        r.fees,
        r.netValue,
        r.percent,
      ]),
      [
        'TOTAL',
        totalQuantity,
        totalGross,
        totalFees,
        totalNet,
        '100%',
      ],
    ]);
  }

  function openPrintPage() {
    const currentPath = window.location.pathname.replace(/\/$/, '');
    window.open(`${currentPath}/impressao`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Vendas por Forma de Pagamento"
          description="Consolidação de receitas agrupadas por método de pagamento, taxas e participação."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        <ReportFilters
          period={period}
          allPeriod={allPeriod}
          category={category}
          agent={agent}
          ticketType={ticketType}
          categoryOptions={categoryOptions}
          agentOptions={agentOptions}
          ticketTypeOptions={ticketTypeOptions}
          onPeriodChange={setPeriod}
          onAllPeriodChange={setAllPeriod}
          onCategoryChange={setCategory}
          onAgentChange={setAgent}
          onTicketTypeChange={setTicketType}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Quantidade" value={totalQuantity} />
          <SummaryCard label="Valor Bruto" value={formatCurrency(totalGross)} />
          <SummaryCard label="Taxas" value={formatCurrency(totalFees)} />
          <SummaryCard label="Valor Líquido" value={formatCurrency(totalNet)} />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <PaymentChart data={rows} />
          </div>

          <div className="lg:col-span-2">
            <ReportTable
              columns={columns}
              rows={rows}
              footer={[
                'Total',
                totalQuantity,
                formatCurrency(totalGross),
                formatCurrency(totalFees),
                formatCurrency(totalNet),
                '100%',
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <strong className="mt-3 block text-2xl font-black tracking-tight text-slate-950">
        {value}
      </strong>
    </article>
  );
}
