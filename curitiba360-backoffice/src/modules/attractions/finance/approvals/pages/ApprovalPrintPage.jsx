import ApprovalStatusBadge from '../components/ApprovalStatusBadge';
import { approvalDashboardMock, approvalListMock } from '../data/approvalMock';
import { formatCurrency, formatDateTime, sumBy } from '../../reports/utils/reportUtils';

export default function ApprovalPrintPage() {
  const stats = approvalDashboardMock;
  const approvals = approvalListMock;
  const totalNet = sumBy(approvals, 'netAmount');

  return (
    <div className="min-h-screen bg-white p-8 text-slate-800 font-sans text-left text-xs leading-relaxed space-y-6 print:p-0">
      {/* Header Impressão Oficial */}
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
              Relatório Geral de Aprovação de Repasses
            </h1>
            <p className="text-sm font-bold text-slate-600">
              Módulo Financeiro Operacional &bull; Diretoria de Finanças
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-black uppercase text-slate-400 block">
            Emissão Auditada
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

      {/* Resumo Gerencial */}
      <section className="grid grid-cols-4 gap-3 text-center">
        <div className="rounded-xl border border-slate-300 p-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Pendentes / Análise</span>
          <strong className="text-base font-black text-amber-700">{stats.pendingRequests + stats.inAnalysis} solicitações</strong>
        </div>
        <div className="rounded-xl border border-slate-300 p-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Aprovado</span>
          <strong className="text-base font-black text-indigo-700">{stats.approved} solicitações</strong>
        </div>
        <div className="rounded-xl border border-slate-300 p-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Aguardando Pagamento</span>
          <strong className="text-base font-black text-amber-900">{formatCurrency(stats.awaitingPaymentAmount)}</strong>
        </div>
        <div className="rounded-xl border border-slate-300 p-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Pago no Mês</span>
          <strong className="text-base font-black text-emerald-800">{formatCurrency(stats.paidMonthAmount)}</strong>
        </div>
      </section>

      {/* Tabela de Aprovações */}
      <section className="space-y-2">
        <h3 className="font-black text-slate-900 uppercase text-xs border-b border-slate-300 pb-1">
          Listagem de Solicitações Auditadas
        </h3>
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 text-[10px] font-black text-slate-700 uppercase border-b border-slate-300">
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Produtor</th>
              <th className="p-2 text-left">Evento</th>
              <th className="p-2 text-left">Banco / PIX</th>
              <th className="p-2 text-right">Valor Líquido</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {approvals.map((row) => (
              <tr key={row.id}>
                <td className="p-2 font-mono font-bold">{row.id}</td>
                <td className="p-2">{formatDateTime(row.requestDate)}</td>
                <td className="p-2 font-bold">{row.producer}</td>
                <td className="p-2 font-semibold">{row.event}</td>
                <td className="p-2 font-mono">{row.bank} ({row.pixKey})</td>
                <td className="p-2 text-right font-black">{formatCurrency(row.netAmount)}</td>
                <td className="p-2 text-center font-bold">{row.status}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t-2 border-slate-300 bg-slate-100 font-black">
            <tr>
              <td className="p-2">TOTAL</td>
              <td className="p-2" colSpan={4}></td>
              <td className="p-2 text-right text-emerald-800">{formatCurrency(totalNet)}</td>
              <td className="p-2"></td>
            </tr>
          </tfoot>
        </table>
      </section>

      <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] text-slate-500">
        <span>Relatório de Aprovação emitido via Backoffice Curitiba 360</span>
        <span>Página 1/1</span>
      </footer>
    </div>
  );
}
