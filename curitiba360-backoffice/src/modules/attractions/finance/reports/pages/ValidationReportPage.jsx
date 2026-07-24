import { useMemo, useState } from 'react';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';

import {
  agentOptions,
  categoryOptions,
  ticketTypeOptions,
  validationReportMock,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatDateTime,
} from '../utils/reportUtils';

function StatusBadge({ status }) {
  const colors = {
    Validado: 'bg-green-100 text-green-700',
    Rejeitado: 'bg-red-100 text-red-700',
    Cancelado: 'bg-yellow-100 text-yellow-700',
    Expirado: 'bg-gray-100 text-gray-700',
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
        colors[status] || 'bg-slate-100 text-slate-700'
      }`}
    >
      {status}
    </span>
  );
}

export default function ValidationReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-31',
  });

  const [allPeriod, setAllPeriod] = useState(true);
  const [category, setCategory] = useState('all');
  const [agent, setAgent] = useState('all');
  const [ticketType, setTicketType] = useState('all');

  const rows = useMemo(() => {
    return validationReportMock.filter((row) => {
      const matchesCategory =
        category === 'all' || row.category === category;
      return matchesCategory;
    });
  }, [category]);

  const columns = [
    {
      key: 'validationDate',
      label: 'Data',
      render: (r) => formatDateTime(r.validationDate),
    },
    {
      key: 'ticketCode',
      label: 'Ingresso',
    },
    {
      key: 'orderNumber',
      label: 'Pedido',
    },
    {
      key: 'customer',
      label: 'Cliente',
    },
    {
      key: 'category',
      label: 'Categoria',
    },
    {
      key: 'gate',
      label: 'Portaria',
    },
    {
      key: 'validator',
      label: 'Validador',
    },
    {
      key: 'operator',
      label: 'Operador',
    },
    {
      key: 'status',
      label: 'Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  function handleExportXlsx() {
    exportCsv('validacoes.csv', [
      [
        'Data',
        'Ingresso',
        'Pedido',
        'Cliente',
        'Categoria',
        'Portaria',
        'Validador',
        'Operador',
        'Status',
      ],
      ...rows.map((r) => [
        r.validationDate,
        r.ticketCode,
        r.orderNumber,
        r.customer,
        r.category,
        r.gate,
        r.validator,
        r.operator,
        r.status,
      ]),
    ]);
  }

  function openPrintPage() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Validações"
          description="Conferência de todas as leituras de ingressos, catracas e portarias da atração."
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

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Validados"
            value={rows.filter((x) => x.status === 'Validado').length}
            badgeColor="bg-emerald-50 text-emerald-700"
          />

          <SummaryCard
            label="Rejeitados"
            value={rows.filter((x) => x.status === 'Rejeitado').length}
            badgeColor="bg-rose-50 text-rose-700"
          />

          <SummaryCard
            label="Cancelados"
            value={rows.filter((x) => x.status === 'Cancelado').length}
            badgeColor="bg-amber-50 text-amber-700"
          />

          <SummaryCard
            label="Expirados"
            value={rows.filter((x) => x.status === 'Expirado').length}
            badgeColor="bg-slate-100 text-slate-700"
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
            '',
            '',
            '',
          ]}
        />
      </main>
    </div>
  );
}

function SummaryCard({ label, value, badgeColor }) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <strong className={`mt-3 block text-2xl font-black tracking-tight ${badgeColor.split(' ')[1]}`}>
        {value}
      </strong>
    </article>
  );
}
