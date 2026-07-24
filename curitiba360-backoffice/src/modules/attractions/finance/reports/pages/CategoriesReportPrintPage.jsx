import {
  attractionMock,
  categoriesReportMock,
} from '../data/financeReportsMock';

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function CategoriesReportPrintPage() {
  const filters = {
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    ticketType: 'Todos',
    paymentType: 'Todos',
  };

  const totalPrice = sumBy(categoriesReportMock, 'price');

  const totalFee = sumBy(categoriesReportMock, 'fee');

  const totalValue = totalPrice + totalFee;

  return (
    <div className="min-h-screen bg-white px-10 py-8 text-slate-700 print:p-0 text-left">
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
              Relatório de Categorias
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
            value={`${formatDate(filters.startDate)} - ${formatDate(filters.endDate)}`}
          />

          <FilterBadge
            label="Tipo de ingresso"
            value={filters.ticketType}
          />

          <FilterBadge
            label="Tipo de pagamento"
            value={filters.paymentType}
          />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-4 gap-4">
        <PrintSummary
          label="Registros"
          value={categoriesReportMock.length}
        />

        <PrintSummary
          label="Preço"
          value={formatCurrency(totalPrice)}
        />

        <PrintSummary
          label="Taxas"
          value={formatCurrency(totalFee)}
        />

        <PrintSummary
          label="Total"
          value={formatCurrency(totalValue)}
        />
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <PrintHeading label="Categoria" />
              <PrintHeading label="Data" />
              <PrintHeading label="Vendedor" />
              <PrintHeading label="Pagamento" />
              <PrintHeading label="Preço" />
              <PrintHeading label="Taxa" />
            </tr>
          </thead>

          <tbody>
            {categoriesReportMock.map((row) => (
              <tr key={row.id} className="border-t border-slate-200">
                <PrintCell strong>{row.category}</PrintCell>

                <PrintCell>{formatDateTime(row.date)}</PrintCell>

                <PrintCell>{row.seller}</PrintCell>

                <PrintCell>{row.paymentType}</PrintCell>

                <PrintCell strong>{formatCurrency(row.price)}</PrintCell>

                <PrintCell>{formatCurrency(row.fee)}</PrintCell>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t border-slate-300 bg-slate-100">
            <tr>
              <PrintCell strong>
                Quantidade: {categoriesReportMock.length}
              </PrintCell>

              <PrintCell />
              <PrintCell />
              <PrintCell />

              <PrintCell strong>
                Preço: {formatCurrency(totalPrice)}
              </PrintCell>

              <PrintCell strong>
                Taxas: {formatCurrency(totalFee)}
              </PrintCell>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="mt-6 flex justify-end">
        <div className="w-72 rounded-xl border border-slate-300 p-5">
          <span className="text-xs font-black uppercase text-slate-500">
            Total geral
          </span>

          <strong className="mt-2 block text-2xl font-black text-slate-900">
            {formatCurrency(totalValue)}
          </strong>
        </div>
      </section>

      <footer className="mt-16 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-black text-slate-600">
        <span>
          Emitido em{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }).format(new Date())}
        </span>

        <span>Página 1/1</span>
      </footer>
    </div>
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
      <span className="text-xs font-bold text-slate-500">{label}</span>

      <strong className="mt-2 block text-lg font-black text-slate-900">
        {value}
      </strong>
    </article>
  );
}

function PrintHeading({ label }) {
  return (
    <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
      {label}
    </th>
  );
}

function PrintCell({ children, strong = false }) {
  return (
    <td
      className={[
        'px-3 py-3 text-xs',
        strong
          ? 'font-black text-slate-700'
          : 'font-semibold text-slate-600',
      ].join(' ')}
    >
      {children}
    </td>
  );
}
