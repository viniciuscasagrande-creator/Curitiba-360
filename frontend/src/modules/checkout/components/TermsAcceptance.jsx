import React from "react";

export default function TermsAcceptance({ checked, onChange }) {
  return (
    <div className="space-y-3 rounded-2xl bg-slate-50 border border-slate-100 p-4 select-none text-left">
      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider my-0">
        Termos e Políticas
      </h4>
      <div className="space-y-2">
        <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
          />
          <span>
            Li e aceito os <a href="/termos" className="text-emerald-750 font-bold hover:underline">Termos de Uso</a> e concordo com a <a href="/privacidade" className="text-emerald-750 font-bold hover:underline">Política de Privacidade</a> do Curitiba 360.
          </span>
        </label>
      </div>
    </div>
  );
}
