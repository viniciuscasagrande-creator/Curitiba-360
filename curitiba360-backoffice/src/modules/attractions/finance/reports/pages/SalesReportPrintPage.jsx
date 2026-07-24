import {
  attractionMock,
  salesReportMock,
} from '../data/financeReportsMock';

import {
  formatCurrency,
  formatDate,
  sumBy,
} from '../utils/reportUtils';

export default function SalesReportPrintPage() {
  const filters = {
    period: {
      startDate: '2026-01-01',
      endDate: '2026-01-01',
    },
    category: 'Todos',
    agent: 'Todos',
    ticketType: 'Todos',
  };

  const totalQuantity = sumBy(
    salesReportMock,
    'quantity',
  );

  const totalValue = sumBy(
    salesReportMock,
    'total',
  );

  return (
    <div className="min-h-screen bg-white px-10 py-8 text-slate-700 print:p-0 text-left">
      <header className="border border-slate-300 p-6">
        <div className="flex items-center gap-8">
          <div className="flex h-24 w-32 items-center justify-center rounded-2xl bg-slate-50">
            <span className="text-center text-lg font-black text-emerald-600">
              CURITIBA
              <br />
              360
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Relatório de Vendas
            </h1>

            <p className="mt-2 text-xl font-black text-slate-600">
              {attractionMock.name}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-7">
        <h2 className="text-xl font-black text-slate-800">
          Filtros aplicados
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <FilterBadge
            label="Período"
            value={`${formatDate(
              filters.period.startDate,
            )} - ${formatDate(
              filters.period.endDate,
            )}`}
          />

          <FilterBadge
            label="Categoria"
            value={filters.category}
          />

          <FilterBadge
            label="Agente"
            value={filters.agent}
          />

          <FilterBadge
            label="Tipo de ingresso"
            value={filters.ticketType}
          />
        </div>
      </section>

      <section className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <PrintHeading label="Categoria" />
              <PrintHeading label="Quantidade" />
              <PrintHeading label="Unitário" />
              <PrintHeading label="Total" />
            </tr>
          </thead>

          <tbody>
            {salesReportMock.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-200"
              >
                <PrintCell strong>
                  {row.category}
                </PrintCell>

                <PrintCell>
                  {row.quantity}
                </PrintCell>

                <PrintCell strong>
                  {formatCurrency(
                    row.unitPrice,
                  )}
                </PrintCell>

                <PrintCell strong>
                  {formatCurrency(row.total)}
                </PrintCell>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t border-slate-300 bg-slate-100">
            <tr>
              <PrintCell strong>
                Quantidade:{' '}
                {salesReportMock.length}
              </PrintCell>

              <PrintCell strong>
                {totalQuantity}
              </PrintCell>

              <PrintCell />

              <PrintCell strong>
                Total:{' '}
                {formatCurrency(totalValue)}
              </PrintCell>
            </tr>
          </tfoot>
        </table>
      </section>

      <footer className="mt-20 border-t border-slate-200 pt-4 text-xs font-black text-slate-600">
        Emitido em{' '}
        {new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'full',
          timeStyle: 'medium',
        }).format(new Date())}{' '}
        — Página 1/5
      </footer>
    </div>
  );
}

function FilterBadge({ label, value }) {
  return (
    <div>
      <span className="block text-[10px] font-black uppercase text-slate-500">
        {label}
      </span>

      <span className="mt-2 inline-flex rounded-xl border border-slate-300 px-4 py-3 text-xs font-black">
        {value}
      </span>
    </div>
  );
}

function PrintHeading({ label }) {
  return (
    <th className="px-4 py-4 text-left text-xs font-black text-slate-600">
      {label}
    </th>
  );
}

function PrintCell({
  children,
  strong = false,
}) {
  return (
    <td
      className={[
        'px-4 py-4 text-xs',
        strong
          ? 'font-black text-slate-700'
          : 'font-semibold text-slate-600',
      ].join(' ')}
    >
      {children}
    </td>
  );
}
