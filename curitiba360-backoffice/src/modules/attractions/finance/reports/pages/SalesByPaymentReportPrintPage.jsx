import {
  attractionMock,
  salesByPaymentReportMock,
} from '../data/financeReportsMock';

import {
  formatCurrency,
  formatDate,
  sumBy,
} from '../utils/reportUtils';

export default function SalesByPaymentReportPrintPage() {
  const totalGrossValue = sumBy(
    salesByPaymentReportMock,
    'grossValue',
  );

  const rows = salesByPaymentReportMock.map(
    (row) => ({
      ...row,
      participation:
        totalGrossValue > 0
          ? (row.grossValue /
              totalGrossValue) *
            100
          : 0,
    }),
  );

  const totalSales = sumBy(
    rows,
    'salesQuantity',
  );

  const totalTickets = sumBy(
    rows,
    'ticketsQuantity',
  );

  const totalFees = sumBy(
    rows,
    'fees',
  );

  const totalNetValue = sumBy(
    rows,
    'netValue',
  );

  return (
    <div className="min-h-screen bg-white px-7 py-8 text-slate-700 print:p-0 text-left">
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
            label="Forma de pagamento"
            value="Todas"
          />
        </div>
      </section>

      <section className="mt-7 grid grid-cols-5 gap-3">
        <PrintSummary
          label="Vendas"
          value={totalSales}
        />

        <PrintSummary
          label="Ingressos"
          value={totalTickets}
        />

        <PrintSummary
          label="Valor bruto"
          value={formatCurrency(
            totalGrossValue,
          )}
        />

        <PrintSummary
          label="Taxas"
          value={formatCurrency(
            totalFees,
          )}
        />

        <PrintSummary
          label="Valor líquido"
          value={formatCurrency(
            totalNetValue,
          )}
        />
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <PrintHeading label="Forma de pagamento" />
              <PrintHeading label="Vendas" />
              <PrintHeading label="Ingressos" />
              <PrintHeading label="Valor bruto" />
              <PrintHeading label="Taxas" />
              <PrintHeading label="Valor líquido" />
              <PrintHeading label="Participação" />
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="break-inside-avoid border-t border-slate-200"
              >
                <PrintCell strong>
                  {row.paymentType}
                </PrintCell>

                <PrintCell>
                  {row.salesQuantity}
                </PrintCell>

                <PrintCell>
                  {row.ticketsQuantity}
                </PrintCell>

                <PrintCell>
                  {formatCurrency(
                    row.grossValue,
                  )}
                </PrintCell>

                <PrintCell>
                  {formatCurrency(
                    row.fees,
                  )}
                </PrintCell>

                <PrintCell strong>
                  {formatCurrency(
                    row.netValue,
                  )}
                </PrintCell>

                <PrintCell>
                  {formatPercent(
                    row.participation,
                  )}
                </PrintCell>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t border-slate-300 bg-slate-100">
            <tr>
              <PrintCell strong>
                TOTAL
              </PrintCell>

              <PrintCell strong>
                {totalSales}
              </PrintCell>

              <PrintCell strong>
                {totalTickets}
              </PrintCell>

              <PrintCell strong>
                {formatCurrency(
                  totalGrossValue,
                )}
              </PrintCell>

              <PrintCell strong>
                {formatCurrency(
                  totalFees,
                )}
              </PrintCell>

              <PrintCell strong>
                {formatCurrency(
                  totalNetValue,
                )}
              </PrintCell>

              <PrintCell strong>
                100,00%
              </PrintCell>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="mt-7 grid grid-cols-3 gap-4">
        <TotalBox
          label="Receita bruta"
          value={formatCurrency(
            totalGrossValue,
          )}
        />

        <TotalBox
          label="Taxas financeiras"
          value={`- ${formatCurrency(
            totalFees,
          )}`}
        />

        <TotalBox
          label="Receita líquida"
          value={formatCurrency(
            totalNetValue,
          )}
        />
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
            Vendas por Forma de Pagamento
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

function TotalBox({ label, value }) {
  return (
    <article className="rounded-xl border border-slate-300 p-5">
      <span className="text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
        {label}
      </span>

      <strong className="mt-2 block text-xl font-black text-slate-900">
        {value}
      </strong>
    </article>
  );
}

function PrintHeading({ label }) {
  return (
    <th className="px-3 py-3 text-left text-[9px] font-black uppercase tracking-[0.04em] text-slate-500">
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
        'px-3 py-3 text-[10px]',
        strong
          ? 'font-black text-slate-700'
          : 'font-semibold text-slate-600',
      ].join(' ')}
    >
      {children}
    </td>
  );
}

function formatPercent(value) {
  return `${new Intl.NumberFormat(
    'pt-BR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(Number(value) || 0)}%`;
}
