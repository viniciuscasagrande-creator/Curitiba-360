import { useMemo, useState } from 'react';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';

import {
  agentOptions,
  categoryOptions,
  courtesyReportMock,
  ticketTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function CourtesyReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-01',
  });

  const [allPeriod, setAllPeriod] = useState(true);
  const [category, setCategory] = useState('all');
  const [agent, setAgent] = useState('all');
  const [ticketType, setTicketType] = useState('all');

  const rows = useMemo(() => {
    return courtesyReportMock.filter((r) => {
      const matchesCategory = category === 'all' || r.category === category;
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
      key: 'category',
      label: 'Categoria',
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
      key: 'customer',
      label: 'Recebedor',
    },
    {
      key: 'reason',
      label: 'Motivo',
    },
    {
      key: 'quantity',
      label: 'Qtd',
    },
    {
      key: 'value',
      label: 'Valor',
      render: (r) => formatCurrency(r.value),
    },
    {
      key: 'total',
      label: 'Total',
      render: (r) => formatCurrency(r.total),
    },
  ];

  function handleExportXlsx() {
    exportCsv('cortesias.csv', [
      [
        'Data',
        'Categoria',
        'Vendedor',
        'Agência',
        'Recebedor',
        'Motivo',
        'Quantidade',
        'Valor',
        'Total',
      ],
      ...rows.map((r) => [
        r.date,
        r.category,
        r.seller,
        r.agency,
        r.customer,
        r.reason,
        r.quantity,
        r.value,
        r.total,
      ]),
      [
        'TOTAL',
        '',
        '',
        '',
        '',
        '',
        sumBy(rows, 'quantity'),
        '',
        sumBy(rows, 'total'),
      ],
    ]);
  }

  function openPrintPage() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Cortesias Emitidas"
          description="Detalhamento de cortesias concedidas por patrocinador, ação social e cortesias comerciais."
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

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Cortesias Emitidas" value={rows.length} />
          <SummaryCard label="Quantidade Total" value={sumBy(rows, 'quantity')} />
          <SummaryCard
            label="Valor Total"
            value={formatCurrency(sumBy(rows, 'total'))}
          />
        </section>

        <ReportTable
          columns={columns}
          rows={rows}
          footer={[
            `Registros ${rows.length}`,
            '',
            '',
            '',
            '',
            '',
            sumBy(rows, 'quantity'),
            '',
            formatCurrency(sumBy(rows, 'total')),
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
