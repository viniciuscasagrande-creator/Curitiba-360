import { useState } from 'react';
import { Mail, MessageSquare, X, XCircle } from 'lucide-react';

const REJECTION_REASONS = [
  'Divergência de Nota Fiscal / Documento Comprovatório',
  'Conta bancária não homologada ou com titularidade incorreta',
  'Saldo insuficiente para o valor solicitado',
  'Pendência de relatórios ou conciliação do evento',
  'Solicitação duplicada',
  'Outros motivos operacionais',
];

export default function ApprovalRejectModal({ approval, onClose, onConfirm }) {
  const [reason, setReason] = useState(REJECTION_REASONS[0]);
  const [observation, setObservation] = useState('');
  const [sendEmail, setSendEmail] = useState(true);

  if (!approval) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      id: approval.id,
      reason,
      observation,
      sendEmail,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-[24px] border border-rose-200 bg-white p-6 shadow-2xl text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-rose-700 flex items-center gap-2">
            <XCircle size={20} className="text-rose-600" />
            Rejeitar Solicitação de Repasse
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          A solicitação <strong className="text-slate-900">{approval.id}</strong> do produtor <strong className="text-slate-900">{approval.producer}</strong> será alterada para status <span className="text-rose-600 font-black">Rejeitado</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Motivo Principal da Rejeição
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-rose-500"
            >
              {REJECTION_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Detalhamento / Instruções para o Produtor
            </label>
            <textarea
              rows={3}
              required
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Descreva com clareza o motivo para orientar o produtor."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium text-slate-700 outline-none focus:border-rose-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-rose-600"
              />
              <Mail size={14} className="text-slate-400" />
              Notificar produtor imediatamente por E-mail
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-black text-white hover:bg-rose-700 shadow-xs"
            >
              Confirmar Rejeição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
