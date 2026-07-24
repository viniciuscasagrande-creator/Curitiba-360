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

export default function CartAbandonmentReportPage() {
  const [period, setPeriod] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-01',
  });

  const [allPeriod, setAllPeriod] = useState(true);

  const [category, setCategory] = useState('all');

  const [agent, setAgent] = useState('all');

  const [ticketType, setTicketType] = useState('all');

  const rows = useMemo(() => {
    return salesReportMock.map((item) => ({
      ...item,

      quantity: 2,

      total: item.unitPrice * 2,
    }));
  }, []);

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

      render: (row) => formatCurrency(row.unitPrice),
    },

    {
      key: 'total',

      label: 'Total',

      render: (row) => formatCurrency(row.total),
    },
  ];

  function exportExcel() {
    exportCsv('abandono-carrinho.csv', [
      ['Categoria', 'Quantidade', 'Unitário', 'Total'],

      ...rows.map((r) => [
        r.category,

        r.quantity,

        r.unitPrice,

        r.total,
      ]),
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-6 py-8">
        <ReportHeader
          title="Relatório de Abandono de Carrinho"
          description="Ingressos adicionados ao carrinho e não finalizados."
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
            `Quantidade: ${rows.length}`,

            sumBy(rows, 'quantity'),

            '',

            formatCurrency(sumBy(rows, 'total')),
          ]}
        />
      </main>
    </div>
  );
}
