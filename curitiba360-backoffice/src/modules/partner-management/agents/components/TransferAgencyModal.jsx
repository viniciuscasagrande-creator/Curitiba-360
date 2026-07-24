import { useState } from 'react';
import { ArrowRightLeft, X } from 'lucide-react';

export default function TransferAgencyModal({ agent, agencies, onClose, onConfirm }) {
  const [targetAgencyId, setTargetAgencyId] = useState('');
  const [reason, setReason] = useState('');

  if (!agent) return null;

  const availableAgencies = agencies.filter((a) => a.id !== agent.agencyId);

  function handleSubmit(e) {
    e.preventDefault();
    if (!targetAgencyId || !reason.trim()) return;
    const selectedAgency = agencies.find((a) => a.id === targetAgencyId);
    onConfirm(agent.id, targetAgencyId, selectedAgency?.tradeName, reason.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <ArrowRightLeft size={18} className="text-emerald-600" />
            Transferir Agente de Agência
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-1 text-xs">
          <span className="text-[10px] font-black uppercase text-slate-400">Agente</span>
          <strong className="block text-sm font-black text-slate-800">{agent.name}</strong>
          <span className="text-slate-500 block">Agência Atual: <strong>{agent.agencyName}</strong></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Nova Agência de Destino *
            </label>
            <select
              required
              value={targetAgencyId}
              onChange={(e) => setTargetAgencyId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="">Selecione a agência...</option>
              {availableAgencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.tradeName} ({a.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Motivo da Transferência *
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex.: Mudança de vínculo contratual..."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
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
              className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
            >
              Confirmar Transferência
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
