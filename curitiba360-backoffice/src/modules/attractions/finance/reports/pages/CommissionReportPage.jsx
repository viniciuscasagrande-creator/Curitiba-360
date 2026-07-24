import { useMemo, useState } from 'react';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';

import {
  agentOptions,
  categoryOptions,
  commissionReportMock,
  ticketTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function CommissionReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-31',
  });

  const [allPeriod, setAllPeriod] = useState(true);
  const [category, setCategory] = useState('all');
  const [agent, setAgent] = useState('all');
  const [ticketType, setTicketType] = useState('all');

  const rows = useMemo(() => {
    return commissionReportMock.filter((row) => {
      const matchesCategory =
        category === 'all' || row.category === category;
      return matchesCategory;
    });
  }, [category]);

  const columns = [
    {
      key: 'date',
      label: 'Data',
      render: (r) => formatDateTime(r.date),
    },
    {
      key: 'seller',
      label: 'Vendedor',
    },
    {
      key: 'agency',
      label: 'Agência',
    },
    {
      key: 'channel',
      label: 'Canal',
    },
    {
      key: 'category',
      label: 'Categoria',
    },
    {
      key: 'payment',
      label: 'Pagamento',
    },
    {
      key: 'gross',
      label: 'Valor Bruto',
      render: (r) => formatCurrency(r.gross),
    },
    {
      key: 'commissionPercent',
      label: '%',
      render: (r) => `${r.commissionPercent}%`,
    },
    {
      key: 'commission',
      label: 'Comissão',
      render: (r) => formatCurrency(r.commission),
    },
    {
      key: 'net',
      label: 'Líquido',
      render: (r) => formatCurrency(r.net),
    },
  ];

  const totalGross = sumBy(rows, 'gross');
  const totalCommission = sumBy(rows, 'commission');
  const totalNet = sumBy(rows, 'net');
  const totalQuantity = sumBy(rows, 'quantity');
  const averagePercent =
    rows.length > 0
      ? (sumBy(rows, 'commissionPercent') / rows.length).toFixed(1)
      : '0';

  function handleExportXlsx() {
    exportCsv('comissoes.csv', [
      [
        'Data',
        'Vendedor',
        'Agência',
        'Canal',
        'Categoria',
        'Pagamento',
        'Valor Bruto',
        '%',
        'Comissão',
        'Líquido',
      ],
      ...rows.map((r) => [
        r.date,
        r.seller,
        r.agency,
        r.channel,
        r.category,
        r.payment,
        r.gross,
        r.commissionPercent,
        r.commission,
        r.net,
      ]),
      [
        `Vendas ${rows.length}`,
        '',
        '',
        '',
        '',
        '',
        totalGross,
        `${averagePercent}%`,
        totalCommission,
        totalNet,
      ],
    ]);
  }

  function openPrintPage() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Comissões"
          description="Fechamento financeiro de repasses por vendedor, agência, canal e percentuais aplicados."
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

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard label="Valor Bruto" value={formatCurrency(totalGross)} />
          <SummaryCard label="Comissões" value={formatCurrency(totalCommission)} />
          <SummaryCard label="Valor Líquido" value={formatCurrency(totalNet)} />
          <SummaryCard label="Quantidade de Vendas" value={totalQuantity} />
          <SummaryCard label="Percentual Médio" value={`${averagePercent}%`} />
        </section>

        <ReportTable
          columns={columns}
          rows={rows}
          footer={[
            `Vendas ${rows.length}`,
            '',
            '',
            '',
            '',
            '',
            formatCurrency(totalGross),
            `${averagePercent}%`,
            formatCurrency(totalCommission),
            formatCurrency(totalNet),
          ]}
        />
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
