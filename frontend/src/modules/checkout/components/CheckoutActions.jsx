import React from "react";

export default function CheckoutActions({ onBack, onForward, forwardLabel = "Avançar", disableForward, saving }) {
  return (
    <div className="flex justify-between items-center pt-4 border-t border-slate-100 select-none">
      <button
        type="button"
        onClick={onBack}
        className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-semibold text-slate-700 transition cursor-pointer"
      >
        Voltar
      </button>
      <button
        type="button"
        disabled={disableForward || saving}
        onClick={onForward}
        className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 px-6 text-sm font-bold text-white transition border-none cursor-pointer"
      >
        {saving ? "Processando..." : forwardLabel}
      </button>
    </div>
  );
}
