import CommissionStatusBadge from '../components/CommissionStatusBadge';

import {
  attractionMock,
  commissionReportMock,
} from '../data/financeReportsMock';

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function CommissionReportPrintPage() {
  const totalQuantity = sumBy(
    commissionReportMock,
    'quantity',
  );

  const totalGrossValue = sumBy(
    commissionReportMock,
    'grossValue',
  );

  const totalCommissionValue = sumBy(
    commissionReportMock,
    'commissionValue',
  );

  const totalNetValue = sumBy(
    commissionReportMock,
    'netValue',
  );

  const averageCommissionPercent =
    totalGrossValue > 0
      ? (totalCommissionValue /
          totalGrossValue) *
        100
      : 0;

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
            label="Vendedor"
            value="Todos"
          />

          <FilterBadge
            label="Agência"
            value="Todas"
          />

          <FilterBadge
            label="Canal"
            value="Todos"
          />

          <FilterBadge
            label="Categoria"
            value="Todas"
          />

          <FilterBadge
            label="Pagamento"
            value="Todos"
          />

          <FilterBadge
            label="Status"
            value="Todos"
          />
        </div>
      </section>

      <section className="mt-7 grid grid-cols-5 gap-3">
        <PrintSummary
          label="Quantidade"
          value={totalQuantity}
        />

        <PrintSummary
          label="Valor bruto"
          value={formatCurrency(
            totalGrossValue,
          )}
        />

        <PrintSummary
          label="Comissões"
          value={formatCurrency(
            totalCommissionValue,
          )}
        />

        <PrintSummary
          label="Valor líquido"
          value={formatCurrency(
            totalNetValue,
          )}
        />

        <PrintSummary
          label="Percentual médio"
          value={formatPercent(
            averageCommissionPercent,
          )}
        />
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <PrintHeading label="Data" />
              <PrintHeading label="Vendedor" />
              <PrintHeading label="Agência" />
              <PrintHeading label="Canal" />
              <PrintHeading label="Categoria" />
              <PrintHeading label="Pagamento" />
              <PrintHeading label="Qtd." />
              <PrintHeading label="Bruto" />
              <PrintHeading label="%" />
              <PrintHeading label="Comissão" />
              <PrintHeading label="Líquido" />
              <PrintHeading label="Status" />
            </tr>
          </thead>

          <tbody>
            {commissionReportMock.map(
              (row) => (
                <tr
                  key={row.id}
                  className="break-inside-avoid border-t border-slate-200"
                >
                  <PrintCell>
                    {formatDateTime(row.date)}
                  </PrintCell>

                  <PrintCell strong>
                    {row.seller}
                  </PrintCell>

                  <PrintCell>
                    {row.agency}
                  </PrintCell>

                  <PrintCell>
                    {row.channel}
                  </PrintCell>

                  <PrintCell>
                    {row.category}
                  </PrintCell>

                  <PrintCell>
                    {row.paymentType}
                  </PrintCell>

                  <PrintCell strong>
                    {row.quantity}
                  </PrintCell>

                  <PrintCell>
                    {formatCurrency(
                      row.grossValue,
                    )}
                  </PrintCell>

                  <PrintCell>
                    {formatPercent(
                      row.commissionPercent,
                    )}
                  </PrintCell>

                  <PrintCell strong>
                    {formatCurrency(
                      row.commissionValue,
                    )}
                  </PrintCell>

                  <PrintCell strong>
                    {formatCurrency(
                      row.netValue,
                    )}
                  </PrintCell>

                  <PrintCell>
                    <CommissionStatusBadge
                      status={row.status}
                    />
                  </PrintCell>
                </tr>
              ),
            )}
          </tbody>

          <tfoot className="border-t border-slate-300 bg-slate-100">
            <tr>
              <PrintCell strong>
                Registros:{' '}
                {commissionReportMock.length}
              </PrintCell>

              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />

              <PrintCell strong>
                {totalQuantity}
              </PrintCell>

              <PrintCell strong>
                {formatCurrency(
                  totalGrossValue,
                )}
              </PrintCell>

              <PrintCell strong>
                {formatPercent(
                  averageCommissionPercent,
                )}
              </PrintCell>

              <PrintCell strong>
                {formatCurrency(
                  totalCommissionValue,
                )}
              </PrintCell>

              <PrintCell strong>
                {formatCurrency(
                  totalNetValue,
                )}
              </PrintCell>

              <PrintCell />
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-4">
        <TotalBox
          label="Receita bruta"
          value={formatCurrency(
            totalGrossValue,
          )}
        />

        <TotalBox
          label="Comissão total"
          value={formatCurrency(
            totalCommissionValue,
          )}
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
            Relatório de Comissões
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
    <th className="px-2 py-3 text-left text-[8px] font-black uppercase tracking-[0.04em] text-slate-500">
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
        'px-2 py-3 text-[9px]',
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
