import React from "react";
import { Check, X } from "lucide-react";

export default function PasswordStrength({ password = "" }) {
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const metCount = Object.values(criteria).filter(Boolean).length;

  const getStrength = () => {
    if (!password) return { label: "Muito fraca", color: "bg-slate-200", text: "text-slate-400", pct: "w-0" };
    switch (metCount) {
      case 0:
      case 1:
        return { label: "Muito fraca", color: "bg-red-500", text: "text-red-500", pct: "w-[20%]" };
      case 2:
        return { label: "Fraca", color: "bg-amber-500", text: "text-amber-500", pct: "w-[40%]" };
      case 3:
        return { label: "Boa", color: "bg-blue-500", text: "text-blue-500", pct: "w-[80%]" };
      case 4:
        return { label: "Excelente", color: "bg-emerald-600", text: "text-emerald-600", pct: "w-full" };
      default:
        return { label: "Muito fraca", color: "bg-slate-200", text: "text-slate-400", pct: "w-0" };
    }
  };

  const strength = getStrength();

  return (
    <div className="space-y-3 select-none text-left">
      {/* Strength Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>Força da senha</span>
          <span className={strength.text}>{strength.label}</span>
        </div>
        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div className={`h-full ${strength.color} transition-all duration-300 ${strength.pct}`} />
        </div>
      </div>

      {/* Real-time Checklist */}
      <div className="grid gap-2 sm:grid-cols-2 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-1.5">
          {criteria.length ? (
            <Check size={14} className="text-emerald-600 shrink-0" />
          ) : (
            <X size={14} className="text-slate-300 shrink-0" />
          )}
          <span className={criteria.length ? "text-emerald-700" : ""}>Mínimo 8 caracteres</span>
        </div>

        <div className="flex items-center gap-1.5">
          {criteria.uppercase ? (
            <Check size={14} className="text-emerald-600 shrink-0" />
          ) : (
            <X size={14} className="text-slate-300 shrink-0" />
          )}
          <span className={criteria.uppercase ? "text-emerald-700" : ""}>Letra maiúscula</span>
        </div>

        <div className="flex items-center gap-1.5">
          {criteria.number ? (
            <Check size={14} className="text-emerald-600 shrink-0" />
          ) : (
            <X size={14} className="text-slate-300 shrink-0" />
          )}
          <span className={criteria.number ? "text-emerald-700" : ""}>Um número</span>
        </div>

        <div className="flex items-center gap-1.5">
          {criteria.special ? (
            <Check size={14} className="text-emerald-600 shrink-0" />
          ) : (
            <X size={14} className="text-slate-300 shrink-0" />
          )}
          <span className={criteria.special ? "text-emerald-700" : ""}>Um caractere especial</span>
        </div>
      </div>
    </div>
  );
}
