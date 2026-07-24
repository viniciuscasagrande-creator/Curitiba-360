import BorderoStatusBadge from '../components/BorderoStatusBadge';

import {
  attractionMock,
  borderoReportMock,
  borderoTransferHistoryMock,
} from '../data/financeReportsMock';

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

export default function BorderoReportPrintPage() {
  const bordero = borderoReportMock;

  const totalTransfers = sumBy(
    borderoTransferHistoryMock,
    'value',
  );

  const financialLines = [
    {
      label: 'Receita bruta',
      value: bordero.grossRevenue,
      subtraction: false,
    },
    {
      label: 'Taxa da plataforma',
      value: bordero.platformFee,
      subtraction: true,
    },
    {
      label: 'Taxa do gateway',
      value: bordero.gatewayFee,
      subtraction: true,
    },
    {
      label: 'Taxa de antecipação',
      value: bordero.anticipationFee,
      subtraction: true,
    },
    {
      label: 'Comissões',
      value: bordero.commissions,
      subtraction: true,
    },
    {
      label: 'Impostos',
      value: bordero.taxes,
      subtraction: true,
    },
    {
      label: 'Descontos',
      value: bordero.discounts,
      subtraction: true,
    },
    {
      label: 'Estornos',
      value: bordero.refunds,
      subtraction: true,
    },
    {
      label: 'Cortesias',
      value: bordero.courtesyValue,
      subtraction: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white px-7 py-8 text-slate-700 print:p-0 text-left">
      <PrintHeader />

      <section className="mt-7 grid grid-cols-4 gap-3">
        <PrintSummary
          label="Referência"
          value={bordero.reference}
        />

        <PrintSummary
          label="Período"
          value={`${formatDate(
            bordero.startDate,
          )} até ${formatDate(
            bordero.endDate,
          )}`}
        />

        <PrintSummary
          label="Pedidos"
          value={bordero.orders}
        />

        <PrintSummary
          label="Ingressos"
          value={bordero.ticketsSold}
        />
      </section>

      <section className="mt-7 grid grid-cols-4 gap-3">
        <PrintSummary
          label="Receita bruta"
          value={formatCurrency(
            bordero.grossRevenue,
          )}
        />

        <PrintSummary
          label="Receita líquida"
          value={formatCurrency(
            bordero.netRevenue,
          )}
        />

        <PrintSummary
          label="Valor do repasse"
          value={formatCurrency(
            bordero.transferValue,
          )}
        />

        <article className="rounded-xl border border-slate-300 p-4">
          <span className="text-xs font-bold text-slate-500">
            Situação
          </span>

          <div className="mt-2">
            <BorderoStatusBadge
              status={bordero.status}
            />
          </div>
        </article>
      </section>

      <section className="mt-8 grid grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="overflow-hidden rounded-xl border border-slate-300">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <PrintHeading label="Composição financeira" />
                <PrintHeading label="Valor" />
              </tr>
            </thead>

            <tbody>
              {financialLines.map(
                (line) => (
                  <tr
                    key={line.label}
                    className="border-t border-slate-200"
                  >
                    <PrintCell strong>
                      {line.subtraction
                        ? '(-) '
                        : ''}
                      {line.label}
                    </PrintCell>

                    <PrintCell strong>
                      {line.subtraction
                        ? '- '
                        : ''}
                      {formatCurrency(
                        line.value,
                      )}
                    </PrintCell>
                  </tr>
                ),
              )}
            </tbody>

            <tfoot className="border-t-2 border-slate-300 bg-slate-100">
              <tr>
                <PrintCell strong>
                  Receita líquida
                </PrintCell>

                <PrintCell strong>
                  {formatCurrency(
                    bordero.netRevenue,
                  )}
                </PrintCell>
              </tr>

              <tr className="border-t border-slate-300">
                <PrintCell strong>
                  Valor do repasse
                </PrintCell>

                <PrintCell strong>
                  {formatCurrency(
                    bordero.transferValue,
                  )}
                </PrintCell>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="rounded-xl border border-slate-300 p-5">
          <h2 className="text-sm font-black text-slate-800">
            Conta para repasse
          </h2>

          <div className="mt-4 space-y-4">
            <AccountField
              label="Banco"
              value={
                bordero.bankAccount.bank
              }
            />

            <AccountField
              label="Agência"
              value={
                bordero.bankAccount.agency
              }
            />

            <AccountField
              label="Conta"
              value={`${bordero.bankAccount.account} · ${bordero.bankAccount.accountType}`}
            />

            <AccountField
              label="Titular"
              value={
                bordero.bankAccount.holder
              }
            />

            <AccountField
              label="Documento"
              value={
                bordero.bankAccount.document
              }
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-black text-slate-800">
          Histórico de repasses
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-300">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <PrintHeading label="Solicitado em" />
                <PrintHeading label="Pago em" />
                <PrintHeading label="Referência" />
                <PrintHeading label="Banco" />
                <PrintHeading label="Valor" />
                <PrintHeading label="Status" />
              </tr>
            </thead>

            <tbody>
              {borderoTransferHistoryMock.map(
                (row) => (
                  <tr
                    key={row.id}
                    className="break-inside-avoid border-t border-slate-200"
                  >
                    <PrintCell>
                      {formatDateTime(
                        row.requestDate,
                      )}
                    </PrintCell>

                    <PrintCell>
                      {row.paymentDate
                        ? formatDateTime(
                            row.paymentDate,
                          )
                        : '—'}
                    </PrintCell>

                    <PrintCell strong>
                      {row.reference}
                    </PrintCell>

                    <PrintCell>
                      {row.bank}
                    </PrintCell>

                    <PrintCell strong>
                      {formatCurrency(
                        row.value,
                      )}
                    </PrintCell>

                    <PrintCell>
                      <BorderoStatusBadge
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
                  TOTAL
                </PrintCell>

                <PrintCell />
                <PrintCell />
                <PrintCell />

                <PrintCell strong>
                  {formatCurrency(
                    totalTransfers,
                  )}
                </PrintCell>

                <PrintCell />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="mt-7 grid grid-cols-3 gap-4">
        <TotalBox
          label="Receita bruta"
          value={formatCurrency(
            bordero.grossRevenue,
          )}
        />

        <TotalBox
          label="Receita líquida"
          value={formatCurrency(
            bordero.netRevenue,
          )}
        />

        <TotalBox
          label="Repasse"
          value={formatCurrency(
            bordero.transferValue,
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

        <span>
          Borderô {bordero.reference}
        </span>
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
            Borderô Financeiro
          </h1>

          <p className="mt-2 text-xl font-black text-slate-600">
            {attractionMock.name}
          </p>
        </div>
      </div>
    </header>
  );
}

function AccountField({
  label,
  value,
}) {
  return (
    <div>
      <span className="block text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
        {label}
      </span>

      <strong className="mt-1 block text-xs font-black text-slate-700">
        {value}
      </strong>
    </div>
  );
}

function PrintSummary({
  label,
  value,
}) {
  return (
    <article className="rounded-xl border border-slate-300 p-4">
      <span className="text-xs font-bold text-slate-500">
        {label}
      </span>

      <strong className="mt-2 block text-base font-black text-slate-900">
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
