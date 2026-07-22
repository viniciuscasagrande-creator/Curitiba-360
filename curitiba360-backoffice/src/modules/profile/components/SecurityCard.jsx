import React from "react";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SecurityCard({ state = {} }) {
  const score = state.score || 0;
  const daysSinceUpdate = state.passwordUpdatedAt
    ? Math.floor((new Date() - new Date(state.passwordUpdatedAt)) / (1000 * 60 * 60 * 24))
    : 420; // default to old if not present

  const isOldPassword = daysSinceUpdate >= 90; // Recommend update if >= 90 days

  const getScoreColor = (score) => {
    if (score < 50) return "text-red-600 bg-red-50 border-red-100";
    if (score < 80) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-emerald-700 bg-emerald-50 border-emerald-100";
  };

  const getScoreBarColor = (score) => {
    if (score < 50) return "bg-red-500";
    if (score < 80) return "bg-amber-500";
    return "bg-emerald-600";
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-955 my-0">
              Score de Segurança
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 my-0">
              Nível geral de proteção da sua conta.
            </p>
          </div>
        </div>

        <div className={`text-2xl font-black rounded-2xl border px-3 py-1.5 ${getScoreColor(score)}`}>
          {score}%
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full ${getScoreBarColor(score)} transition-all duration-500`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Summary Badges Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-600">
        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/30">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold my-0">Senha</p>
          <p className="mt-1 text-sm font-bold text-slate-900 my-0">Forte</p>
        </div>

        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/30">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold my-0">2FA</p>
          <p className={`mt-1 text-sm font-bold my-0 ${state.twoFactor ? "text-emerald-700" : "text-red-600"}`}>
            {state.twoFactor ? "Ativado" : "Desativado"}
          </p>
        </div>

        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/30">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold my-0">Sessões</p>
          <p className="mt-1 text-sm font-bold text-slate-900 my-0">
            {state.sessions?.length || 0} ativa{state.sessions?.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="p-3 rounded-2xl border border-slate-100 bg-slate-50/30">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold my-0">Dispositivos</p>
          <p className="mt-1 text-sm font-bold text-slate-900 my-0">
            {state.devices?.length || 0} autorizado{state.devices?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Password age Warning */}
      {isOldPassword ? (
        <div className="flex gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-bold my-0 text-amber-900">Sua senha é antiga</p>
            <p className="mt-0.5 my-0">
              A última alteração foi há {daysSinceUpdate} dias. Recomendamos atualizar sua senha periodicamente.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-bold my-0 text-emerald-900">Senha Recente</p>
            <p className="mt-0.5 my-0">Sua senha foi alterada recentemente ({daysSinceUpdate} dias atrás).</p>
          </div>
        </div>
      )}
    </section>
  );
}
