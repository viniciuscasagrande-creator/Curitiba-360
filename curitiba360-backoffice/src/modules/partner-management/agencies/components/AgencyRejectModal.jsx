import { useState } from 'react';
import { XCircle, X } from 'lucide-react';

export default function AgencyRejectModal({ agency, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  if (!agency) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(agency.id, reason.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-[24px] border border-rose-200 bg-white p-6 shadow-2xl text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-rose-700 flex items-center gap-2">
            <XCircle size={18} />
            Rejeitar Credenciamento de Agência
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <p className="text-xs font-medium text-slate-600">
          Você está rejeitando a agência <strong className="text-slate-900">{agency.tradeName}</strong>. Esta ação não poderá ser desfeita e notificará o responsável.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Motivo da Rejeição *
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex.: Documentação inválida ou divergência de CNPJ..."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium text-slate-700 outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
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
