import WithdrawalStatusBadge from '../components/WithdrawalStatusBadge';

import {
  bankAccountMock,
  withdrawalRequestsMock,
  withdrawalSummaryMock,
} from '../data/withdrawalMock';

import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../reports/utils/reportUtils';

export default function WithdrawalRequestPrintPage() {
  const summary = withdrawalSummaryMock;
  const bank = bankAccountMock;
  const requests = withdrawalRequestsMock;
  const totalAmount = sumBy(requests, 'amount');

  return (
    <div className="min-h-screen bg-white p-8 text-slate-800 font-sans text-left text-xs leading-relaxed space-y-6 print:p-0">
      {/* Header Impressão */}
      <header className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-300">
            <span className="text-center text-xs font-black text-emerald-600">
              CURITIBA
              <br />
              360
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              Relatório de Solicitações de Repasse
            </h1>
            <p className="text-sm font-bold text-slate-600">
              Parque Jaime Lerner — Financeiro Operacional
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-black uppercase text-slate-400 block">
            Emissão
          </span>
          <strong className="text-xs font-mono font-bold text-slate-800 block">
            {new Date().toLocaleDateString('pt-BR')} às{' '}
            {new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </strong>
        </div>
      </header>

      {/* Resumo de Saldos & Conta Bancária */}
      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-300 p-4 space-y-2">
          <h3 className="font-black text-slate-900 uppercase text-[10px] border-b border-slate-200 pb-1">
            Resumo de Saldos da Atração
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block">Saldo Disponível:</span>
              <strong className="text-emerald-700 text-sm">{formatCurrency(summary.availableBalance)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block">Saldo Bloqueado:</span>
              <strong className="text-amber-700">{formatCurrency(summary.blockedBalance)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block">Total Solicitado:</span>
              <strong className="text-slate-900">{formatCurrency(summary.requestedAmount)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block">Total Já Pago:</span>
              <strong className="text-slate-900">{formatCurrency(summary.paidAmount)}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-300 p-4 space-y-2">
          <h3 className="font-black text-slate-900 uppercase text-[10px] border-b border-slate-200 pb-1">
            Conta Bancária Homologada
          </h3>
          <div className="text-xs space-y-1">
            <p><strong>Banco:</strong> {bank.bank} ({bank.bankCode})</p>
            <p><strong>Agência / Conta:</strong> {bank.agency} / {bank.account}</p>
            <p><strong>Titular:</strong> {bank.holder}</p>
            <p><strong>Chave PIX:</strong> {bank.pixKey}</p>
          </div>
        </div>
      </section>

      {/* Tabela do Histórico */}
      <section className="space-y-2">
        <h3 className="font-black text-slate-900 uppercase text-xs border-b border-slate-300 pb-1">
          Histórico das Solicitações Registradas
        </h3>
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 text-[10px] font-black text-slate-700 uppercase border-b border-slate-300">
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Data Solicitação</th>
              <th className="p-2 text-right">Valor (R$)</th>
              <th className="p-2 text-left">Banco / Conta</th>
              <th className="p-2 text-left">Chave PIX</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {requests.map((r) => (
              <tr key={r.id}>
                <td className="p-2 font-mono font-bold">{r.id}</td>
                <td className="p-2">{formatDateTime(r.requestDate)}</td>
                <td className="p-2 text-right font-black">{formatCurrency(r.amount)}</td>
                <td className="p-2 font-semibold">
                  {r.bank} (Ag: {r.agency} · CC: {r.account})
                </td>
                <td className="p-2 font-mono">{r.pixKey}</td>
                <td className="p-2 text-center font-bold">{r.status}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-slate-300 bg-slate-100 font-black">
            <tr>
              <td className="p-2">TOTAL</td>
              <td className="p-2"></td>
              <td className="p-2 text-right text-emerald-800">{formatCurrency(totalAmount)}</td>
              <td className="p-2" colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </section>

      <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] text-slate-500">
        <span>Relatório emitido digitalmente via Backoffice Curitiba 360</span>
        <span>Página 1/1</span>
      </footer>
    </div>
  );
}
