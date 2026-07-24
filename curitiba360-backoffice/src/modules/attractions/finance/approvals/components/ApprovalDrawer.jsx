import { useState } from 'react';
import {
  Ban,
  Building,
  CheckCircle2,
  FileCheck2,
  FileText,
  Landmark,
  Mail,
  MessageSquare,
  QrCode,
  ShieldCheck,
  Upload,
  User,
  X,
  XCircle,
} from 'lucide-react';

import ApprovalStatusBadge from './ApprovalStatusBadge';
import ApprovalTimeline from './ApprovalTimeline';
import ApprovalHistory from './ApprovalHistory';
import { formatCurrency, formatDateTime } from '../../reports/utils/reportUtils';

export default function ApprovalDrawer({
  approval,
  onClose,
  onApprove,
  onReject,
  onMarkPaid,
}) {
  const [activeTab, setActiveTab] = useState('resumo');

  if (!approval) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full text-left overflow-hidden border-l border-slate-200">
        {/* Header Drawer */}
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-50/80">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-black text-slate-900">
                {approval.id}
              </h2>
              <ApprovalStatusBadge status={approval.status} />
            </div>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              {approval.producer} &bull; {approval.event}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </header>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto gap-2">
          <TabButton
            active={activeTab === 'resumo'}
            onClick={() => setActiveTab('resumo')}
            label="Resumo"
          />
          <TabButton
            active={activeTab === 'timeline'}
            onClick={() => setActiveTab('timeline')}
            label="Timeline"
          />
          <TabButton
            active={activeTab === 'banco'}
            onClick={() => setActiveTab('banco')}
            label="Conta Bancária & PIX"
          />
          <TabButton
            active={activeTab === 'auditoria'}
            onClick={() => setActiveTab('auditoria')}
            label="Auditoria"
          />
        </div>

        {/* Conteúdo Aba */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'resumo' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200 p-5 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                  Valor Total do Repasse
                </span>
                <strong className="block text-3xl font-black text-emerald-950">
                  {formatCurrency(approval.netAmount)}
                </strong>
                {approval.observation && (
                  <p className="text-xs font-semibold text-emerald-900 border-t border-emerald-200/80 pt-2 mt-2">
                    Obs: {approval.observation}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <DetailBox label="Solicitado em" value={formatDateTime(approval.requestDate)} />
                <DetailBox label="Solicitante" value={approval.requestedBy} />
                <DetailBox label="Produtor / Concessionário" value={approval.producer} />
                <DetailBox label="CNPJ Produtor" value={approval.producerDocument} />
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <ApprovalTimeline timeline={approval.timeline} />
          )}

          {activeTab === 'banco' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <h4 className="font-black text-slate-800 flex items-center gap-2 text-xs">
                  <Landmark size={16} className="text-emerald-600" />
                  Dados da Conta
                </h4>
                <p><strong>Banco:</strong> {approval.bank} ({approval.bankCode})</p>
                <p><strong>Agência / Conta:</strong> Ag: {approval.agency} · CC: {approval.account}</p>
                <p><strong>Titular:</strong> {approval.holder}</p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
                <h4 className="font-black text-emerald-900 flex items-center gap-2 text-xs">
                  <QrCode size={16} className="text-emerald-600" />
                  Chave PIX ({approval.pixType})
                </h4>
                <strong className="font-mono text-sm block font-black text-emerald-950">
                  {approval.pixKey}
                </strong>
              </div>
            </div>
          )}

          {activeTab === 'auditoria' && (
            <ApprovalHistory logs={approval.auditLogs} />
          )}
        </div>

        {/* Rodapé Ações */}
        <footer className="border-t border-slate-200 p-4 bg-slate-50 flex flex-wrap gap-2 justify-end">
          {approval.status === 'Pendente' || approval.status === 'Em análise' ? (
            <>
              <button
                type="button"
                onClick={() => onReject(approval)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700 hover:bg-rose-50"
              >
                <XCircle size={15} />
                Rejeitar
              </button>

              <button
                type="button"
                onClick={() => onApprove(approval)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
              >
                <ShieldCheck size={15} />
                Aprovar Repasse
              </button>
            </>
          ) : approval.status === 'Aprovado' ? (
            <button
              type="button"
              onClick={() => onMarkPaid(approval)}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
            >
              <CheckCircle2 size={15} />
              Marcar como Pago (Anexar Comprovante)
            </button>
          ) : (
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              ✓ Processamento Finalizado
            </span>
          )}
        </footer>
      </div>
    </div>
  );
}

function TabButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3 px-3 text-xs font-black border-b-2 transition whitespace-nowrap ${
        active
          ? 'border-emerald-600 text-emerald-700'
          : 'border-transparent text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <span className="block text-[10px] font-black uppercase text-slate-400">
        {label}
      </span>
      <strong className="mt-1 block text-slate-800 font-bold">{value}</strong>
    </div>
  );
}
