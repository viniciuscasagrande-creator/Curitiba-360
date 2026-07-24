import { useMemo, useState } from 'react';

import ReportHeader from '../components/ReportHeader';
import ReportFilters from '../components/ReportFilters';
import ReportTable from '../components/ReportTable';

import {
  agentOptions,
  categoryOptions,
  salesReportMock,
  ticketTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  sumBy,
} from '../utils/reportUtils';

export default function SalesReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-01',
  });

  const [allPeriod, setAllPeriod] =
    useState(true);

  const [category, setCategory] =
    useState('all');

  const [agent, setAgent] =
    useState('all');

  const [ticketType, setTicketType] =
    useState('all');

  const filteredRows = useMemo(() => {
    return salesReportMock.filter((row) => {
      const matchesCategory =
        category === 'all' ||
        row.category === category;

      return matchesCategory;
    });
  }, [category]);

  const columns = [
    {
      key: 'category',
      label: 'Categoria',
    },
    {
      key: 'quantity',
      label: 'Quantidade',
    },
    {
      key: 'unitPrice',
      label: 'Unitário',
      render: (row) =>
        formatCurrency(row.unitPrice),
    },
    {
      key: 'total',
      label: 'Total',
      render: (row) =>
        formatCurrency(row.total),
    },
  ];

  const totalQuantity = sumBy(
    filteredRows,
    'quantity',
  );

  const totalValue = sumBy(
    filteredRows,
    'total',
  );

  function handleExport() {
    exportCsv(
      'relatorio-vendas-curitiba360.csv',
      [
        [
          'Categoria',
          'Quantidade',
          'Unitário',
          'Total',
        ],
        ...filteredRows.map((row) => [
          row.category,
          row.quantity,
          row.unitPrice,
          row.total,
        ]),
        [
          'TOTAL',
          totalQuantity,
          '',
          totalValue,
        ],
      ],
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white text-left">
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 print:max-w-none print:p-0">
        <ReportHeader
          title="Relatório de Vendas"
          description="Relatório de vendas por categoria da atração Parque Jaime Lerner."
          onPrint={() => window.print()}
          onExportXlsx={handleExport}
          onExportPdf={() => window.print()}
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
          rows={filteredRows}
          footer={[
            `Quantidade: ${filteredRows.length}`,
            totalQuantity,
            '',
            `Total: ${formatCurrency(
              totalValue,
            )}`,
          ]}
        />

        <div className="mt-5 flex justify-center print:hidden">
          <span className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-600">
            1 a {filteredRows.length} de{' '}
            {filteredRows.length}
          </span>
        </div>
      </main>
    </div>
  );
}
