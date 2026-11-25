import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function CancelOrderDialog({ isOpen, onClose, onConfirm, saving }) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const reasons = [
    "Mudança de planos",
    "Comprei por engano",
    "Não poderei comparecer",
    "Problema com o pagamento",
    "Outro",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalReason = reason === "Outro" ? customReason : reason;

    if (!finalReason || finalReason.trim().length < 5) {
      setError("Por favor, descreva ou selecione o motivo do cancelamento (mínimo 5 caracteres).");
      return;
    }

    if (!acceptedPolicy) {
      setError("Você precisa aceitar a política de cancelamento.");
      return;
    }

    try {
      await onConfirm(finalReason);
      onClose();
    } catch (err) {
      setError(err?.message || "Ocorreu um erro ao cancelar o pedido.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 select-none">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl border border-slate-100 text-left animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-950 my-0">
              Solicitar Cancelamento
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 my-0">
              Esta ação cancelará o pedido e todos os ingressos relacionados.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Motivo do Cancelamento
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-emerald-500"
              required
            >
              <option value="">Selecione um motivo...</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {reason === "Outro" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Descreva o motivo
              </label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Explique o motivo do cancelamento"
                rows={3}
                className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
                required
              />
            </div>
          )}

          {/* Policy Check */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-xs leading-5 text-slate-500">
              Estou ciente de que o reembolso será processado de acordo com a política de cancelamento do Curitiba 360.
            </span>
          </label>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-10 px-4 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-700 transition cursor-pointer border-none flex items-center justify-center gap-1.5"
            >
              {saving ? "Processando..." : "Confirmar Cancelamento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
