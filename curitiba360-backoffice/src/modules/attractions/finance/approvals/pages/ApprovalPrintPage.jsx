import ApprovalStatusBadge from '../components/ApprovalStatusBadge';
import { approvalsMock } from '../data/approvalsMock';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function ApprovalPrintPage() {
  const total = approvalsMock.reduce(
    (sum, item) => sum + item.netAmount,
    0,
  );

  return (
    <div className="min-h-screen bg-white p-8 text-slate-700 print:p-0 text-left">
      <header className="border border-slate-300 p-6">
        <h1 className="text-3xl font-black text-slate-900">
          Aprovação de Repasses
        </h1>

        <p className="mt-2 text-sm font-bold text-slate-500">
          Curitiba 360 · Financeiro
          Operacional
        </p>
      </header>

      <div className="mt-7 overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {[
                'Data',
                'Referência',
                'Produtor',
                'Evento',
                'Banco',
                'Valor líquido',
                'Status',
              ].map((label) => (
                <th
                  key={label}
                  className="px-3 py-3 text-left text-[9px] font-black uppercase text-slate-500"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {approvalsMock.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-200"
              >
                <Cell>
                  {formatDateTime(
                    row.requestDate,
                  )}
                </Cell>

                <Cell strong>
                  {row.reference}
                </Cell>

                <Cell>
                  {row.producerName}
                </Cell>

                <Cell>{row.eventName}</Cell>

                <Cell>{row.bank}</Cell>

                <Cell strong>
                  {formatCurrency(
                    row.netAmount,
                  )}
                </Cell>

                <Cell>
                  <ApprovalStatusBadge
                    status={row.status}
                  />
                </Cell>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t-2 border-slate-300 bg-slate-100">
            <tr>
              <Cell strong>TOTAL</Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell strong>
                {formatCurrency(total)}
              </Cell>
              <Cell />
            </tr>
          </tfoot>
        </table>
      </div>

      <footer className="mt-12 border-t border-slate-200 pt-4 text-xs font-bold text-slate-500">
        Emitido em{' '}
        {new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'full',
          timeStyle: 'medium',
        }).format(new Date())}
      </footer>
    </div>
  );
}

function Cell({
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
