import WithdrawalStatusBadge from '../components/WithdrawalStatusBadge';

import {
  withdrawalBalanceMock,
  withdrawalBankAccountMock,
  withdrawalRequestsMock,
} from '../data/withdrawalRequestsMock';

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../../reports/utils/reportUtils';

export default function WithdrawalRequestPrintPage() {
  const totalRequested = sumBy(
    withdrawalRequestsMock,
    'amount',
  );

  const totalNet = sumBy(
    withdrawalRequestsMock,
    'netAmount',
  );

  const totalPaid = sumBy(
    withdrawalRequestsMock.filter(
      (row) => row.status === 'Pago',
    ),
    'netAmount',
  );

  return (
    <div className="min-h-screen bg-white px-7 py-8 text-slate-700 print:p-0 text-left">
      <PrintHeader />

      <section className="mt-7 grid grid-cols-4 gap-3">
        <PrintSummary
          label="Saldo disponível"
          value={formatCurrency(
            withdrawalBalanceMock.availableBalance,
          )}
        />

        <PrintSummary
          label="Saldo bloqueado"
          value={formatCurrency(
            withdrawalBalanceMock.blockedBalance,
          )}
        />

        <PrintSummary
          label="Total solicitado"
          value={formatCurrency(
            totalRequested,
          )}
        />

        <PrintSummary
          label="Total pago"
          value={formatCurrency(totalPaid)}
        />
      </section>

      <section className="mt-7 rounded-xl border border-slate-300 p-5">
        <h2 className="text-sm font-black text-slate-800">
          Conta para recebimento
        </h2>

        <div className="mt-4 grid grid-cols-5 gap-4">
          <AccountField
            label="Banco"
            value={
              withdrawalBankAccountMock.bank
            }
          />

          <AccountField
            label="Agência"
            value={
              withdrawalBankAccountMock.agency
            }
          />

          <AccountField
            label="Conta"
            value={
              withdrawalBankAccountMock.account
            }
          />

          <AccountField
            label="Titular"
            value={
              withdrawalBankAccountMock.holder
            }
          />

          <AccountField
            label="Chave Pix"
            value={
              withdrawalBankAccountMock.pixKey
            }
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-black text-slate-800">
          Histórico de solicitações
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-300">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <PrintHeading label="Solicitado em" />
                <PrintHeading label="Referência" />
                <PrintHeading label="Banco" />
                <PrintHeading label="Valor" />
                <PrintHeading label="Valor líquido" />
                <PrintHeading label="Pagamento" />
                <PrintHeading label="Status" />
              </tr>
            </thead>

            <tbody>
              {withdrawalRequestsMock.map(
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

                    <PrintCell strong>
                      {row.reference}
                    </PrintCell>

                    <PrintCell>
                      {row.bank}
                    </PrintCell>

                    <PrintCell>
                      {formatCurrency(
                        row.amount,
                      )}
                    </PrintCell>

                    <PrintCell strong>
                      {formatCurrency(
                        row.netAmount,
                      )}
                    </PrintCell>

                    <PrintCell>
                      {row.paymentDate
                        ? formatDateTime(
                            row.paymentDate,
                          )
                        : '—'}
                    </PrintCell>

                    <PrintCell>
                      <WithdrawalStatusBadge
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

                <PrintCell strong>
                  {formatCurrency(
                    totalRequested,
                  )}
                </PrintCell>

                <PrintCell strong>
                  {formatCurrency(totalNet)}
                </PrintCell>

                <PrintCell />
                <PrintCell />
              </tr>
            </tfoot>
          </table>
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

        <span>
          Próximo repasse:{' '}
          {formatDate(
            withdrawalBalanceMock.nextPaymentDate,
          )}
        </span>
      </footer>
    </div>
  );
}

function PrintHeader() {
  return (
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
            Solicitações de Repasse
          </h1>

          <p className="mt-2 text-xl font-black text-slate-600">
            Financeiro Operacional
          </p>
        </div>
      </div>
    </header>
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

function AccountField({ label, value }) {
  return (
    <div>
      <span className="block text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
        {label}
      </span>

      <strong className="mt-1 block break-words text-xs font-black text-slate-700">
        {value}
      </strong>
    </div>
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
