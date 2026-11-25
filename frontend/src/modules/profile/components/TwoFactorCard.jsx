import React from "react";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";

export default function TwoFactorCard({ enabled = false, onToggle, saving = false }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${enabled ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
            {enabled ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-955 my-0">
              Autenticação de Duas Etapas (2FA)
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
              Adicione uma camada extra de proteção na sua conta.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl ${enabled ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
            {enabled ? "Ativado (ON)" : "Desativado (OFF)"}
          </span>
          <button
            type="button"
            disabled={saving}
            onClick={onToggle}
            className={`h-10 px-4 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 border-none ${enabled ? "bg-red-50 text-red-700 hover:bg-red-100" : "bg-emerald-700 text-white hover:bg-emerald-800"}`}
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            {enabled ? "Desativar" : "Ativar 2FA"}
          </button>
        </div>
      </div>
    </section>
  );
}
