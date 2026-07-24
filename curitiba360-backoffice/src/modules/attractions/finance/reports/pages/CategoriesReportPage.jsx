import { useMemo, useState } from 'react';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';

import {
  agentOptions,
  categoryOptions,
  categoriesReportMock,
  ticketTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function CategoriesReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-01',
  });

  const [allPeriod, setAllPeriod] = useState(true);

  const [category, setCategory] = useState('all');

  const [agent, setAgent] = useState('all');

  const [ticketType, setTicketType] = useState('all');

  const rows = useMemo(() => {
    return categoriesReportMock.filter((row) => {
      const matchesCategory = category === 'all' || row.category === category;
      const matchesTicketType = ticketType === 'all' || row.ticketType === ticketType;
      return matchesCategory && matchesTicketType;
    });
  }, [category, ticketType]);

  const columns = [
    {
      key: 'category',
      label: 'Categoria',
    },
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
      key: 'payment',
      label: 'Pagamento',
    },
    {
      key: 'quantity',
      label: 'Quantidade',
    },
    {
      key: 'price',
      label: 'Valor',
      render: (r) => formatCurrency(r.price),
    },
    {
      key: 'fee',
      label: 'Taxa',
      render: (r) => formatCurrency(r.fee),
    },
    {
      key: 'total',
      label: 'Total',
      render: (r) => formatCurrency(r.total),
    },
  ];

  function exportExcel() {
    exportCsv('categorias.csv', [
      ['Categoria', 'Data', 'Vendedor', 'Pagamento', 'Quantidade', 'Valor', 'Taxa', 'Total'],
      ...rows.map((r) => [
        r.category,
        r.date,
        r.seller,
        r.payment,
        r.quantity,
        r.price,
        r.fee,
        r.total,
      ]),
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-6 py-8">
        <ReportHeader
          title="Relatório de Categorias"
          description="Detalhamento analítico de vendas e valores consolidados por categoria de ingresso."
          onPrint={() => window.print()}
          onExportPdf={() => window.print()}
          onExportXlsx={exportExcel}
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

        <ReportTable
          columns={columns}
          rows={rows}
          footer={[
            `Categorias ${rows.length}`,
            '',
            '',
            '',
            sumBy(rows, 'quantity'),
            '',
            '',
            formatCurrency(sumBy(rows, 'total')),
          ]}
        />
      </main>
    </div>
  );
}
