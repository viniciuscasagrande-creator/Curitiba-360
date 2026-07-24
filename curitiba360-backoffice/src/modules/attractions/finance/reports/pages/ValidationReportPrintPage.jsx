import {
  attractionMock,
  validationReportMock,
} from '../data/financeReportsMock';

import ValidationStatusBadge from '../components/ValidationStatusBadge';

import {
  formatDate,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function ValidationReportPrintPage() {
  const validatedCount = countByStatus(
    'Validado',
  );

  const rejectedCount = countByStatus(
    'Rejeitado',
  );

  const canceledCount = countByStatus(
    'Cancelado',
  );

  const expiredCount = countByStatus(
    'Expirado',
  );

  const totalAttempts = sumBy(
    validationReportMock,
    'attempts',
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
            label="Status"
            value="Todos"
          />

          <FilterBadge
            label="Categoria"
            value="Todas"
          />

          <FilterBadge
            label="Portaria"
            value="Todas"
          />

          <FilterBadge
            label="Validador"
            value="Todos"
          />

          <FilterBadge
            label="Operador"
            value="Todos"
          />
        </div>
      </section>

      <section className="mt-7 grid grid-cols-5 gap-3">
        <PrintSummary
          label="Leituras"
          value={validationReportMock.length}
        />

        <PrintSummary
          label="Validados"
          value={validatedCount}
        />

        <PrintSummary
          label="Rejeitados"
          value={rejectedCount}
        />

        <PrintSummary
          label="Cancelados"
          value={canceledCount}
        />

        <PrintSummary
          label="Expirados"
          value={expiredCount}
        />
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <PrintHeading label="Data/hora" />
              <PrintHeading label="Ingresso" />
              <PrintHeading label="Pedido" />
              <PrintHeading label="Cliente" />
              <PrintHeading label="Categoria" />
              <PrintHeading label="Portaria" />
              <PrintHeading label="Validador" />
              <PrintHeading label="Operador" />
              <PrintHeading label="Tent." />
              <PrintHeading label="Status" />
            </tr>
          </thead>

          <tbody>
            {validationReportMock.map(
              (row) => (
                <tr
                  key={row.id}
                  className="break-inside-avoid border-t border-slate-200"
                >
                  <PrintCell>
                    {formatDateTime(
                      row.validationDate,
                    )}
                  </PrintCell>

                  <PrintCell mono>
                    {row.ticketCode}
                  </PrintCell>

                  <PrintCell strong>
                    {row.orderNumber}
                  </PrintCell>

                  <PrintCell>
                    {row.customer}
                  </PrintCell>

                  <PrintCell>
                    {row.category}
                  </PrintCell>

                  <PrintCell>
                    {row.gate}
                  </PrintCell>

                  <PrintCell>
                    {row.validator}
                  </PrintCell>

                  <PrintCell>
                    {row.operator}
                  </PrintCell>

                  <PrintCell strong>
                    {row.attempts}
                  </PrintCell>

                  <PrintCell>
                    <ValidationStatusBadge
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
                {validationReportMock.length}
              </PrintCell>

              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />
              <PrintCell />

              <PrintCell strong>
                {totalAttempts}
              </PrintCell>

              <PrintCell />
            </tr>
          </tfoot>
        </table>
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

function countByStatus(status) {
  return validationReportMock.filter(
    (row) => row.status === status,
  ).length;
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
            Relatório de Validações
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
    <th className="px-2 py-3 text-left text-[8px] font-black uppercase tracking-[0.05em] text-slate-500">
      {label}
    </th>
  );
}

function PrintCell({
  children,
  strong = false,
  mono = false,
}) {
  return (
    <td
      className={[
        'px-2 py-3 text-[9px]',
        strong
          ? 'font-black text-slate-700'
          : 'font-semibold text-slate-600',
        mono ? 'font-mono' : '',
      ].join(' ')}
    >
      {children}
    </td>
  );
}
