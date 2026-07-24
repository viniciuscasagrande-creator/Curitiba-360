import {
  attractionMock,
  courtesyReportMock,
} from '../data/financeReportsMock';

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function CourtesyReportPrintPage() {
  const rows = courtesyReportMock.map(
    (row) => ({
      ...row,
      total:
        Number(row.quantity || 0) *
        Number(row.unitValue || 0),
    }),
  );

  const totalQuantity = sumBy(
    rows,
    'quantity',
  );

  const totalValue = sumBy(rows, 'total');

  const averageValue =
    totalQuantity > 0
      ? totalValue / totalQuantity
      : 0;

  return (
    <div className="min-h-screen bg-white px-8 py-8 text-slate-700 print:p-0 text-left">
      <PrintHeader />

      <section className="mt-7">
        <h2 className="text-lg font-black text-slate-800">
          Filtros aplicados
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <FilterBadge
            label="Período"
            value={`${formatDate(
              '2026-01-01',
            )} até ${formatDate(
              '2026-01-31',
            )}`}
          />

          <FilterBadge
            label="Categoria"
            value="Todas"
          />

          <FilterBadge
            label="Agência"
            value="Todas"
          />

          <FilterBadge
            label="Vendedor"
            value="Todos"
          />

          <FilterBadge
            label="Motivo"
            value="Todos"
          />
        </div>
      </section>

      <section className="mt-7 grid grid-cols-4 gap-4">
        <PrintSummary
          label="Registros"
          value={rows.length}
        />

        <PrintSummary
          label="Cortesias"
          value={totalQuantity}
        />

        <PrintSummary
          label="Valor médio"
          value={formatCurrency(averageValue)}
        />

        <PrintSummary
          label="Valor total"
          value={formatCurrency(totalValue)}
        />
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <PrintHeading label="Data" />
              <PrintHeading label="Categoria" />
              <PrintHeading label="Vendedor" />
              <PrintHeading label="Agência" />
              <PrintHeading label="Recebedor" />
              <PrintHeading label="Motivo" />
              <PrintHeading label="Qtd." />
              <PrintHeading label="Unitário" />
              <PrintHeading label="Total" />
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="break-inside-avoid border-t border-slate-200"
              >
                <PrintCell>
                  {formatDateTime(row.date)}
                </PrintCell>

                <PrintCell strong>
                  {row.category}
                </PrintCell>

                <PrintCell>
                  {row.seller}
                </PrintCell>

                <PrintCell>
                  {row.agency}
                </PrintCell>

                <PrintCell strong>
                  {row.customer}
                </PrintCell>

                <PrintCell>
                  {row.reason}
                </PrintCell>

                <PrintCell strong>
                  {row.quantity}
                </PrintCell>

                <PrintCell>
                  {formatCurrency(
                    row.unitValue,
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
                Registros: {rows.length}
              </PrintCell>

              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />

              <PrintCell strong>
                Qtd.: {totalQuantity}
              </PrintCell>

              <PrintCell />

              <PrintCell strong>
                {formatCurrency(totalValue)}
              </PrintCell>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="mt-6 flex justify-end">
        <div className="w-80 rounded-xl border border-slate-300 p-5">
          <span className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
            Valor total das cortesias
          </span>

          <strong className="mt-2 block text-2xl font-black text-slate-900">
            {formatCurrency(totalValue)}
          </strong>
        </div>
      </section>

      <footer className="mt-14 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-black text-slate-600">
        <span>
          Emitido em{' '}
          {new Intl.DateTimeFormat(
            'pt-BR',
            {
              dateStyle: 'full',
              timeStyle: 'medium',
            },
          ).format(new Date())}
        </span>

        <span>Página 1/1</span>
      </footer>
    </div>
  );
}

function PrintHeader() {
  return (
    <header className="border border-slate-300 p-6">
      <div className="flex items-center gap-8">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
          <span className="text-center text-lg font-black text-emerald-600">
            CURITIBA
            <br />
            360
          </span>
        </div>

        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Relatório de Cortesias
          </h1>

          <p className="mt-2 text-xl font-black text-slate-600">
            {attractionMock.name}
          </p>
        </div>
      </div>
    </header>
  );
}

function FilterBadge({ label, value }) {
  return (
    <div>
      <span className="block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
        {label}
      </span>

      <span className="mt-2 inline-flex rounded-xl border border-slate-300 px-4 py-3 text-xs font-black text-slate-700">
        {value}
      </span>
    </div>
  );
}

function PrintSummary({ label, value }) {
  return (
    <article className="rounded-xl border border-slate-300 p-4">
      <span className="text-xs font-bold text-slate-500">
        {label}
      </span>

      <strong className="mt-2 block text-lg font-black text-slate-900">
        {value}
      </strong>
    </article>
  );
}

function PrintHeading({ label }) {
  return (
    <th className="px-2 py-3 text-left text-[9px] font-black uppercase tracking-[0.06em] text-slate-500">
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
        'px-2 py-3 text-[10px]',
        strong
          ? 'font-black text-slate-700'
          : 'font-semibold text-slate-600',
      ].join(' ')}
    >
      {children}
    </td>
  );
}
