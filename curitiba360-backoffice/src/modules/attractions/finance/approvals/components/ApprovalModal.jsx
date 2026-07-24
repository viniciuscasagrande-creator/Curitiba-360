import { useState } from 'react';
import { Mail, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { formatCurrency } from '../../reports/utils/reportUtils';

export default function ApprovalModal({ approval, onClose, onConfirm }) {
  const [observation, setObservation] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(false);

  if (!approval) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      id: approval.id,
      observation,
      sendEmail,
      sendWhatsApp,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-600" />
            Aprovar Solicitação de Repasse
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 space-y-1">
          <span className="text-[10px] font-black uppercase text-emerald-800">
            {approval.id} &bull; {approval.producer}
          </span>
          <strong className="block text-2xl font-black text-emerald-950">
            {formatCurrency(approval.netAmount)}
          </strong>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Observação interna de aprovação (Opcional)
            </label>
            <textarea
              rows={3}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex.: Documentação conferida. Liberado para pagamento."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600"
              />
              <Mail size={14} className="text-slate-400" />
              Notificar produtor por E-mail
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={sendWhatsApp}
                onChange={(e) => setSendWhatsApp(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600"
              />
              <MessageSquare size={14} className="text-slate-400" />
              Enviar alerta via WhatsApp
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
              className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
            >
              Confirmar Aprovação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
